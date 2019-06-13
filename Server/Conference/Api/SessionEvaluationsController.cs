using Connect.Conference.Core.Models.SessionEvaluations;
using Connect.Conference.Core.Repositories;
using Connect.DNN.Modules.Conference.Common;
using DotNetNuke.Web.Api;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class SessionEvaluationsController : ConferenceApiController
    {

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendsConference)]
        public HttpResponseMessage Get(int conferenceId, int sessionId)
        {
            var res = SessionEvaluationRepository.Instance.GetSessionEvaluation(sessionId, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, res);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendsConference)]
        public HttpResponseMessage Set(int conferenceId, SessionEvaluationBase data)
        {
            var attended = SessionAttendeeRepository.Instance.GetSessionAttendeesByUser(UserInfo.UserID).FirstOrDefault(a => a.SessionId == data.SessionId);
            if (attended == null)
            {
                var conf = ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, conferenceId);
                if (!conf.OnGoing)
                {
                    return Request.CreateResponse(HttpStatusCode.NotAcceptable, "This conference is not ongoing");
                }
                var confAtt = AttendeeRepository.Instance.GetAttendee(conferenceId, UserInfo.UserID);
                if (confAtt != null)
                {
                    var session = SessionRepository.Instance.GetSession(data.SessionId);
                    if (SessionAttendeeRepository.Instance.GetSessionAttendeesByUser(conferenceId, UserInfo.UserID).Where(sa => sa.SessionId != data.SessionId && sa.SessionDateAndTime == session.SessionDateAndTime).Count() > 0)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotAcceptable, "You were in another session");
                    }
                    SessionAttendeeRepository.Instance.SetSessionAttendee(data.SessionId, UserInfo.UserID, UserInfo.UserID);
                }
                attended = SessionAttendeeRepository.Instance.GetSessionAttendeesByUser(UserInfo.UserID).FirstOrDefault(a => a.SessionId == data.SessionId);
            }
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

