using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using System.Web;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class SessionSpeakersController : ConferenceApiController
    {

        public class SpeakerDTO
        {
            public int UserId { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Add(int conferenceId, int id, [FromBody]SpeakerDTO user)
        {
            if (SpeakerRepository.Instance.GetSpeaker(conferenceId, user.UserId) == null)
            {
                SpeakerRepository.Instance.AddSpeaker(new Connect.Conference.Core.Models.Speakers.SpeakerBase() { ConferenceId = conferenceId, UserId = user.UserId, Sort = 999 }, UserInfo.UserID);
            }
            SessionSpeakerRepository.Instance.AddSessionSpeaker(new Connect.Conference.Core.Models.SessionSpeakers.SessionSpeakerBase() { SessionId = id, SpeakerId = user.UserId, Sort = 0 }, UserInfo.UserID);
            Connect.Conference.Core.Controllers.DnnRoleController.CheckSpeaker(PortalSettings.PortalId, conferenceId, user.UserId);
            return Request.CreateResponse(HttpStatusCode.OK, SessionSpeakerRepository.Instance.GetSessionSpeakersBySession(id).FirstOrDefault(s => s.SpeakerId == user.UserId));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Delete(int conferenceId, int id, [FromBody]SpeakerDTO user)
        {

            if (SessionSpeakerRepository.Instance.GetSessionSpeaker(user.UserId, id) == null)
            {
                return ServiceError("No such speaker for this session");
            }
            SessionSpeakerRepository.Instance.DeleteSessionSpeaker(user.UserId, id);
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.SessionSubmit)]
        public HttpResponseMessage Reorder(int conferenceId, int id)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (!ConferenceModuleContext.Security.IsPresenter(id))
                {
                    return AccessViolation("You're not allowed to reorder speakers from another session");
                }
            }
            var raw = new System.IO.StreamReader(HttpContext.Current.Request.InputStream).ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<Order>>(raw);
            ISessionSpeakerRepository _repository = SessionSpeakerRepository.Instance;
            foreach (Order no in data)
            {
                var speaker = _repository.GetSessionSpeaker(no.id, id);
                if (speaker != null)
                {
                    speaker.Sort = no.order;
                    _repository.UpdateSessionSpeaker(speaker.GetSessionSpeakerBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}

