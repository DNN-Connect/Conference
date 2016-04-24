using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using System.Web;
using Newtonsoft.Json;
using System.Collections.Generic;
using Connect.Conference.Core.Repositories;
using DotNetNuke.Entities.Host;
using Connect.Conference.Core.Models.SessionResources;
using System.Net.Http.Headers;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class SessionsController : ConferenceApiController
    {

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Reorder(int conferenceId)
        {
            var raw = new System.IO.StreamReader(HttpContext.Current.Request.InputStream).ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<Order>>(raw);
            ISessionRepository _repository = SessionRepository.Instance;
            foreach (Order no in data)
            {
                var session = _repository.GetSession(conferenceId, no.id);
                if (session != null)
                {
                    session.Sort = no.order;
                    _repository.UpdateSession(session.GetSessionBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        public class voteDTO
        {
            public int vote { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Authenticated)]
        public HttpResponseMessage Vote(int conferenceId, int id, [FromBody]voteDTO vote)
        {
            if (vote.vote == 1)
            {
                SessionVoteRepository.Instance.SetSessionVote(id, UserInfo.UserID);
            }
            else
            {
                SessionVoteRepository.Instance.DeleteSessionVote(id, UserInfo.UserID);
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        public class moveDTO
        {
            public int Day { get; set; }
            public int SlotId { get; set; }
            public int LocationId { get; set; }
            public bool DisplaceOthers { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Move(int conferenceId, int id, [FromBody]moveDTO moveParams)
        {
            var session = SessionRepository.Instance.GetSession(conferenceId, id);
            var speakerIds = session.Speakers.Select(s => s.Key).ToList();
            if (session == null)
            {
                return ServiceError("Can't find session");
            }
            if (session.SlotId == moveParams.SlotId & session.DayNr == moveParams.Day & session.LocationId == moveParams.LocationId)
            {
                return ServiceError("Not moved");
            }
            var parallelSessions = SessionRepository.Instance.GetSessionsBySlot(conferenceId, moveParams.Day, moveParams.SlotId);
            foreach (var s in parallelSessions)
            {
                if (id != s.SessionId)
                {
                    foreach (var sp in s.Speakers.Select(sp => sp.Key))
                    {
                        if (speakerIds.Contains(sp))
                        {
                            return ServiceError("This move would cause a speaker to have to be in 2 places at the same time. Please revise.");
                        }
                    }
                }
            }
            if (moveParams.DisplaceOthers)
            {
                if (session.IsPlenary)
                {
                    foreach (var s in parallelSessions)
                    {
                        s.SlotId = 0;
                        s.LocationId = null;
                        s.DayNr = 0;
                        SessionRepository.Instance.UpdateSession(s.GetSessionBase(), UserInfo.UserID);
                    }
                }
                foreach (var s in parallelSessions)
                {
                    if (s.LocationId == moveParams.LocationId)
                    {
                        s.SlotId = 0;
                        s.LocationId = null;
                        s.DayNr = 0;
                        SessionRepository.Instance.UpdateSession(s.GetSessionBase(), UserInfo.UserID);
                    }
                }
            }
            else
            {
                if (session.IsPlenary & parallelSessions.Count() != 0)
                {
                    return ServiceError("This plenary session would collide with other sessions. Please remove parallel sessions first.");
                }
                foreach (var s in parallelSessions)
                {
                    if (s.LocationId == moveParams.LocationId)
                    {
                        return ServiceError("This plenary session would collide with another sessions. Please remove existing session first.");
                    }
                }
            }
            session.SlotId = moveParams.SlotId;
            if (!session.IsPlenary)
            {
                session.LocationId = moveParams.LocationId;
            }
            session.DayNr = moveParams.Day;
            SessionRepository.Instance.UpdateSession(session.GetSessionBase(), UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, SessionRepository.Instance.GetSessions(conferenceId).Where(s => s.Status > 2).OrderBy(s => s.Sort));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Remove(int conferenceId, int id)
        {
            var session = SessionRepository.Instance.GetSession(conferenceId, id);
            if (session == null)
            {
                return ServiceError("Can't find session");
            }
            session.SlotId = 0;
            session.LocationId = null;
            session.DayNr = 0;
            SessionRepository.Instance.UpdateSession(session.GetSessionBase(), UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, SessionRepository.Instance.GetSessions(conferenceId).Where(s => s.Status > 2).OrderBy(s => s.Sort));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.SessionSubmit)]
        public HttpResponseMessage Delete(int conferenceId, int id)
        {
            var session = SessionRepository.Instance.GetSession(conferenceId, id);
            if (session == null)
            {
                return ServiceError("Can't find session");
            }
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (!ConferenceModuleContext.Security.IsPresenter(id))
                {
                    return AccessViolation("You can't delete this session because you are not a presenter of it");
                }
            }
            SessionRepository.Instance.DeleteSession(session.ConferenceId, session.SessionId);
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        public class StatusDTO
        {
            public int newStatus { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.SessionSubmit)]
        public HttpResponseMessage ChangeStatus(int conferenceId, int id, [FromBody]StatusDTO data)
        {
            var session = SessionRepository.Instance.GetSession(conferenceId, id);
            if (session == null)
            {
                return ServiceError("Can't find session");
            }
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (!ConferenceModuleContext.Security.IsPresenter(id))
                {
                    return AccessViolation("You can't delete this session because you are not a presenter of it");
                }
            }
            session.Status = data.newStatus;
            SessionRepository.Instance.UpdateSession(session.GetSessionBase(), UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, SessionRepository.Instance.GetSession(session.ConferenceId, session.SessionId));
        }

        public class TrackDTO
        {
            public int newTrack { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage ChangeTrack(int conferenceId, int id, [FromBody]TrackDTO data)
        {
            var session = SessionRepository.Instance.GetSession(conferenceId, id);
            if (session == null)
            {
                return ServiceError("Can't find session");
            }
            session.TrackId = data.newTrack;
            SessionRepository.Instance.UpdateSession(session.GetSessionBase(), UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, SessionRepository.Instance.GetSession(session.ConferenceId, session.SessionId));
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Download(int conferenceId)
        {
            var res = new HttpResponseMessage(HttpStatusCode.OK);
            var sb = new System.Text.StringBuilder();
            sb.AppendLine("Title,SubTitle,Speakers,Status,Tags,Level,Track,Location,Votes,Plenary");
            foreach (var session in SessionRepository.Instance.GetSessions(conferenceId).OrderBy(s => s.Title))
            {
                sb.AppendLine(string.Format("\"{0}\",\"{1}\",\"{2}\",{3},\"{4}\",\"{5}\",\"{6}\",\"{7}\",{8},{9}", session.Title, session.SubTitle, string.Join(", ", session.Speakers.Select(sp => sp.Value)), session.Status, string.Join(", ", session.Tags.Select(t => t.Value)), session.Level, session.TrackTitle, session.LocationName, session.NrVotes, session.IsPlenary));
            }
            res.Content = new StringContent(sb.ToString());
            res.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
            res.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            res.Content.Headers.ContentDisposition.FileName = "Sessions.csv";
            return res;
        }

    }
}

