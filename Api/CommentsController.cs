using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Models.Comments;
using Connect.Conference.Core.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class CommentsController : ConferenceApiController
    {

        [HttpGet]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage List(int conferenceId, int sessionId, int visibility, int pageIndex, int pageSize)
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
                return Request.CreateResponse(HttpStatusCode.OK, CommentRepository.Instance.GetCommentsBySession(sessionId, visibility, pageIndex, pageSize));
            }
            catch
            {
                var res = new List<Comment>();
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
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
    }
}

