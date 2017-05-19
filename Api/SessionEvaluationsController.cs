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
using Connect.Conference.Core.Models.SessionEvaluations;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class SessionEvaluationsController : ConferenceApiController
    {

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendConference)]
        public HttpResponseMessage Get(int conferenceId, int sessionId)
        {
            var res = SessionEvaluationRepository.Instance.GetSessionEvaluation(sessionId, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, res);
        }

        public class SetSessionEvaluationDTO
        {
            public int SessionId { get; set; }
            public int Stars { get; set; }
            public string Review { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendConference)]
        public HttpResponseMessage Set(int conferenceId, SessionEvaluationBase data)
        {
            var attended = SessionAttendeeRepository.Instance.GetSessionAttendeesByUser(UserInfo.UserID).FirstOrDefault(a => a.SessionId == data.SessionId);
            if (attended != null)
            {
                data.UserId = UserInfo.UserID;
                SessionEvaluationRepository.Instance.SetSessionEvaluation(data, UserInfo.UserID);
                return Request.CreateResponse(HttpStatusCode.OK, "");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Attendee did not attend this session");
            }
        }

    }
}

