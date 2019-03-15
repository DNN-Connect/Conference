using Connect.Conference.Core.Common;
using Connect.Conference.Core.Models.Comments;
using Connect.Conference.Core.Models.Conferences;
using Connect.Conference.Core.Repositories;
using Connect.DNN.Modules.Conference.Common;
using DotNetNuke.Web.Api;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class ConferencesController : ConferenceApiController
    {
        [HttpGet]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage Complete(int id)
        {
            var conf = ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, id);
            conf.LoadComplete();
            var isAttending = false;
            var level = WebApiSecurityLevel.Public;
            var att = AttendeeRepository.Instance.GetAttendee(id, UserInfo.UserID);
            if (att != null)
            {
                if (att.Status >= (int)AttendeeStatus.Confirmed)
                {
                    level = WebApiSecurityLevel.Attendee;
                    isAttending = true;
                }
            }
            if (ConferenceModuleContext.Security.CanManage)
            {
                level = WebApiSecurityLevel.Management;
            }
            var serializerSettings = new JsonSerializerSettings { ContractResolver = new WebApiJsonContractResolver(level) };
            var serializer = JsonSerializer.CreateDefault(serializerSettings);
            var cc = JObject.FromObject(conf, serializer);
            cc.Add("Security", JObject.FromObject(ConferenceModuleContext.Security));
            cc.Add("IsAttending", isAttending);
            cc.Add("Closed", conf.EndDate.IsBefore(System.DateTime.Now));
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(cc.ToString(), System.Text.Encoding.UTF8, "application/json");
            return response;
        }

        [HttpGet]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage Get(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, id));
        }

        [HttpPost]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage Add(int conferenceId, [FromBody]CommentBase comment)
        {
            switch (comment.Visibility)
            {
                case 0: // just the authors
                    if (!ConferenceModuleContext.Security.IsPresenter(comment.SessionId))
                    {
                        return AccessViolation("You need to be a presenter to submit this comment");
                    }
                    break;
                case 1: // between authors and managers
                    if (!(ConferenceModuleContext.Security.IsPresenter(comment.SessionId) | ConferenceModuleContext.Security.CanManage))
                    {
                        return AccessViolation("You need to be a presenter or manager to submit this comment");
                    }
                    break;
                default:
                    if (UserInfo.UserID <= 0)
                    {
                        return AccessViolation("You need to be logged in to submit a comment");
                    }
                    break;
            }
            comment.ConferenceId = conferenceId;
            comment.UserId = UserInfo.UserID;
            comment.Datime = System.DateTime.Now;
            CommentRepository.Instance.AddComment(ref comment);
            return Request.CreateResponse(HttpStatusCode.OK, CommentRepository.Instance.GetComment(conferenceId, comment.CommentId));
        }

        [HttpPost]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage Delete(int conferenceId, int id)
        {
            var comment = CommentRepository.Instance.GetComment(conferenceId, id);
            if (comment != null)
            {
                if (comment.UserId == UserInfo.UserID | ConferenceModuleContext.Security.CanManage)
                {
                    CommentRepository.Instance.DeleteComment(conferenceId, id);
                }
                else
                {
                    return AccessViolation("You're not allowed to delete this comment");
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        public class pollReturnDTO
        {
            public System.DateTime CheckTime { get; set; }
            public IEnumerable<Comment> Comments { get; set; }
            public int NewTotalComments { get; set; } = -1;
        }

        [HttpGet]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage Poll(int conferenceId, int sessionId, int visibility, System.DateTime lastCheck)
        {
            switch (visibility)
            {
                case 0: // just the authors
                    if (!ConferenceModuleContext.Security.IsPresenter(sessionId))
                    {
                        return AccessViolation("You need to be a presenter to see this");
                    }
                    break;
                case 1: // between authors and managers
                    if (!(ConferenceModuleContext.Security.IsPresenter(sessionId) | ConferenceModuleContext.Security.CanManage))
                    {
                        return AccessViolation("You need to be a presenter or manager to see this");
                    }
                    break;
            }
            try
            {
                var retValue = new pollReturnDTO();
                retValue.CheckTime = System.DateTime.Now;
                retValue.Comments = CommentRepository.Instance.GetNewComments(sessionId, visibility, lastCheck);
                if (retValue.Comments.Count() > 0)
                {
                    retValue.NewTotalComments = CommentRepository.Instance.GetTotalComments(sessionId, visibility);
                }
                return Request.CreateResponse(HttpStatusCode.OK, retValue);
            }
            catch (System.Exception ex)
            {
                return ServiceError(ex.Message);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage Image(int conferenceId, int size)
        {
            var conference = ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, conferenceId);
            var imageName = conference.GetLogo(PortalSettings, size);
            if (imageName == "")
            {
                imageName = string.Format("{0}images\\no-content.png", DotNetNuke.Common.Globals.ApplicationMapPath);
            }
            var res = new HttpResponseMessage(HttpStatusCode.OK);
            var mem = new MemoryStream();
            using (var sr = new FileStream(imageName, FileMode.Open, FileAccess.Read))
            {
                sr.CopyTo(mem);
            }
            mem.Seek(0, SeekOrigin.Begin);
            res.Content = new StreamContent(mem);
            res.Content.Headers.ContentType = new MediaTypeHeaderValue("image/" + Path.GetExtension(imageName));
            res.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = Path.GetFileName(imageName)
            };
            return res;
        }
    }
}

