using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using System.Web;
using Newtonsoft.Json;
using System.Collections.Generic;
using Connect.Conference.Core.Repositories;
using System.Linq;
using System.Net.Http.Headers;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class SpeakersController : ConferenceApiController
    {

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Reorder(int conferenceId)
        {
            var raw = new System.IO.StreamReader(HttpContext.Current.Request.InputStream).ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<Order>>(raw);
            ISpeakerRepository _repository = SpeakerRepository.Instance;
            foreach (Order no in data)
            {
                var speaker = _repository.GetSpeaker(conferenceId, no.id);
                if (speaker != null)
                {
                    speaker.Sort = no.order;
                    _repository.UpdateSpeaker(speaker.GetSpeakerBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.SessionSubmit)]
        public HttpResponseMessage UploadPicture(int conferenceId, int id)
        {
            HttpPostedFile postedFile = HttpContext.Current.Request.Files["profilepic"];
            var fileName = System.IO.Path.GetFileName(postedFile.FileName).RemoveIllegalCharacters();
            var extension = System.IO.Path.GetExtension(fileName);
            var contentType = "";
            switch (extension.ToLower())
            {
                case ".jpg":
                    contentType = "image/jpg";
                    break;
                case ".png":
                    contentType = "image/png";
                    break;
                default:
                    return ServiceError("Unsupported File Format");
            }
            if (postedFile.ContentLength > 1000000)
            {
                return ServiceError("File too big");
            }
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (id != UserInfo.UserID)
                {
                    ConferenceModuleContext.ThrowAccessViolation();
                }
            }
            var user = DotNetNuke.Entities.Users.UserController.GetUserById(PortalSettings.PortalId, id);
            var userFolder = DotNetNuke.Services.FileSystem.FolderManager.Instance.GetUserFolder(user);
            var file = DotNetNuke.Services.FileSystem.FileManager.Instance.AddFile(userFolder, fileName, postedFile.InputStream, true, false, contentType, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage SearchUsers(int conferenceId, string search)
        {
            return Request.CreateResponse(HttpStatusCode.OK, SpeakerRepository.Instance.SearchUsers(ActiveModule.PortalID, search));
        }

        public class UserDTO
        {
            public int UserId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string DisplayName { get; set; }
            public string Email { get; set; }
            public string Company { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Add(int conferenceId, [FromBody]UserDTO user)
        {
            var userId = Connect.Conference.Core.Controllers.ConferenceController.AddSpeaker(PortalSettings.PortalId, conferenceId, -1, user.Email, user.FirstName, user.LastName, user.DisplayName, user.Company, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, SpeakerRepository.Instance.GetSpeaker(conferenceId, userId));
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Download(int conferenceId)
        {
            var res = new HttpResponseMessage(HttpStatusCode.OK);
            var sb = new System.Text.StringBuilder();
            sb.AppendLine("LastName,FirstName,DisplayName,Email,NrSessions,Company,DescriptionShort");
            foreach (var sp in SpeakerRepository.Instance.GetSpeakersByConference(conferenceId).OrderBy(s => s.LastName))
            {
                sb.AppendLine(string.Format("\"{0}\",\"{1}\",\"{2}\",{3},{4},\"{5}\",\"{6}\"", sp.LastName, sp.FirstName, sp.DisplayName, sp.Email, sp.NrSessions, sp.Company, sp.DescriptionShort));
            }
            res.Content = new StringContent(sb.ToString());
            res.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
            res.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            res.Content.Headers.ContentDisposition.FileName = "Speakers.csv";
            return res;
        }

    }
}

