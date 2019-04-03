using Connect.Conference.Core.Common;
using Connect.Conference.Core.Models.SessionEvaluations;
using Connect.Conference.Core.Repositories;
using Connect.DNN.Modules.Conference.Common;
using DotNetNuke.Web.Api;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class SessionAttendeesController : ConferenceApiController
    {

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendsConference)]
        public HttpResponseMessage Attendances(int conferenceId)
        {
            Logger.Trace("SessionAttendees.Attendances");
            var res = JsonConvert.SerializeObject(SessionAttendeeRepository.Instance.GetSessionAttendeesByUser(conferenceId, UserInfo.UserID),
                            Formatting.None,
                            new JsonSerializerSettings
                            {
                                ContractResolver = new WebApiJsonContractResolver(WebApiSecurityLevel.Attendee)
                            });
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(res, System.Text.Encoding.UTF8, "application/json");
            return response;
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendsConference)]
        public HttpResponseMessage SessionAttendees(int conferenceId, int id)
        {
            Logger.Trace("SessionAttendees.SessionAttendees");
            return Request.CreateResponse(HttpStatusCode.OK, SessionAttendeeRepository.Instance.GetSessionAttendeesBySession(id));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage Attend(int conferenceId, int id)
        {
            Logger.Trace("SessionAttendees.Attend");
            var conf = ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, conferenceId);
            if (!conf.OnGoing)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, "This conference is not ongoing");
            }
            var confAtt = AttendeeRepository.Instance.GetAttendee(conferenceId, UserInfo.UserID);
            if (confAtt != null)
            {
                var session = SessionRepository.Instance.GetSession(id);
                if (SessionAttendeeRepository.Instance.GetSessionAttendeesByUser(conferenceId, UserInfo.UserID).Where(sa => sa.SessionId != id && sa.SessionDateAndTime == session.SessionDateAndTime).Count() > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.NotAcceptable, "You were in another session");
                }
                SessionAttendeeRepository.Instance.SetSessionAttendee(id, UserInfo.UserID, UserInfo.UserID);
            }
            return Request.CreateResponse(HttpStatusCode.OK, SessionAttendeeRepository.Instance.GetSessionAttendeesByUser(conferenceId, UserInfo.UserID).FirstOrDefault(sa => sa.SessionId == id));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendsConference)]
        public HttpResponseMessage Set(int conferenceId, SessionEvaluationBase data)
        {
            Logger.Trace("SessionAttendees.Set");
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

        public class AttendByCodeDTO
        {
            public int SessionId { get; set; }
            public string Codes { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage AttendByCode(int conferenceId, AttendByCodeDTO data)
        {
            Logger.Trace("SessionAttendees.AttendByCode");
            var lines = GetCodes(data.Codes);
            foreach (var code in lines)
            {
                if (!String.IsNullOrEmpty(code))
                {
                    var attendee = AttendeeRepository.Instance.GetAttendeeByCode(conferenceId, code);
                    if (attendee != null)
                    {
                        SessionAttendeeRepository.Instance.SetSessionAttendee(data.SessionId, attendee.UserId, UserInfo.UserID);
                    }
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, SessionAttendeeRepository.Instance.GetSessionAttendeesBySession(data.SessionId));
        }

        private List<string> GetCodes(string rawstring)
        {
            var res = new List<string>();
            var lines = rawstring.Split('\n').Where(l => !string.IsNullOrEmpty(l)).ToArray();
            var line = 0;
            var m = Regex.Match(lines[line], "Total Counters = (\\d+)");
            if (m.Success)
            {
                var count = int.Parse(m.Groups[1].Value);
                if (lines.Count() != count + 1)
                {
                    throw new Exception("Nr codes does not equal total specified");
                }
                line++;
            }
            while (line < lines.Count())
            {
                var code = lines[line];
                var lm = Regex.Match(code, "No\\.:(\\d+)");
                if (lm.Success)
                {
                    code = lm.Groups[1].Value;
                }
                res.Add(code);
                line++;
            }
            return res;
        }
    }
}

