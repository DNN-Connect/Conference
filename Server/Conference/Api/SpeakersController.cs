using Connect.Conference.Core.Common;
using Connect.Conference.Core.Repositories;
using Connect.DNN.Modules.Conference.Common;
using DotNetNuke.Web.Api;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class SpeakersController : ConferenceApiController
    {
        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage List(int conferenceId)
        {
            return Request.CreateResponse(HttpStatusCode.OK, SpeakerRepository.Instance.GetSpeakersByConferenceWithNrSessions(conferenceId, (int)SessionStatus.Accepted).Where(s => s.NrSessions > 0).OrderBy(s => s.LastName));
        }

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

        public class UpdateImageDTO
        {
            public string Image { get; set; }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.SessionSubmit)]
        public HttpResponseMessage UpdateImage(int conferenceId, int id, UpdateImageDTO data)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (id != UserInfo.UserID)
                {
                    ConferenceModuleContext.ThrowAccessViolation();
                }
            }
            var speaker = SpeakerRepository.Instance.GetSpeaker(conferenceId, id);
            var file = ImageUtils.SaveUserProfilePic(PortalSettings.PortalId, id, data.Image, UserInfo.UserID);
            if (file != null)
            {
                speaker.PhotoFolder = file.Folder;
                speaker.PhotoFilename = file.FileName;
                speaker.PhotoContentType = file.ContentType;
                speaker.PhotoHeight = file.Height;
                speaker.PhotoWidth = file.Width;
            }
            return Request.CreateResponse(HttpStatusCode.OK, speaker);
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
            foreach (var sp in SpeakerRepository.Instance.GetSpeakersByConferenceWithNrSessions(conferenceId, (int)SessionStatus.Accepted).OrderBy(s => s.LastName))
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

