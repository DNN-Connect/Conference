using System.Linq;
using System.Web.Mvc;
using DotNetNuke.Common;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Sessions;
using System.Web.Routing;
using DotNetNuke.Web.Mvc.Routing;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class SessionController : ConferenceMvcController
    {
        private readonly ISessionRepository _repository;

        public SessionController() : this(SessionRepository.Instance) { }

        public SessionController(ISessionRepository repository)
        {
            Requires.NotNull(repository);
            _repository = repository;
        }

        [HttpGet]
        public ActionResult View(int conferenceId, int sessionId)
        {
            var session = _repository.GetSession(conferenceId, sessionId);
            if (session == null) { session = new Session() { ConferenceId = conferenceId }; }
            return View(session);
        }

        [HttpGet]
        public ActionResult Edit(int conferenceId, int sessionId)
        {
            var session = _repository.GetSession(conferenceId, sessionId);
            if (session == null) { session = new Session() { ConferenceId = conferenceId }; }
            return View(session.GetSessionBase());
        }

        [HttpPost]
        public ActionResult Edit(SessionBase session)
        {
            var previousRecord = _repository.GetSession(session.ConferenceId, session.SessionId);
            if (previousRecord == null)
            {
                _repository.AddSession(ref session, User.UserID);
            }
            else
            {
                session.CreatedOnDate = previousRecord.CreatedOnDate;
                session.CreatedByUserID = previousRecord.CreatedByUserID;
                _repository.UpdateSession(session, User.UserID);
            }
            return ReturnRoute(session.ConferenceId, View("View", _repository.GetSession(session.ConferenceId, session.SessionId)));
        }

        [HttpGet]
        public ActionResult Submit(int conferenceId, int sessionId)
        {
            var session = _repository.GetSession(conferenceId, sessionId);
            if (session == null)
            {
                session = new Session() { ConferenceId = conferenceId };
            }
            else
            {
                if (!session.UserIsAuthor(User.UserID))
                {
                    ConferenceModuleContext.ThrowAccessViolation();
                }
            }
            return View(session.GetSessionBase());
        }

        [HttpPost]
        public ActionResult Submit(SessionBase session)
        {
            var recordToUpdate = (_repository.GetSession(session.ConferenceId, session.SessionId) ?? new Session() { ConferenceId = session.ConferenceId }).GetSessionBase();
            recordToUpdate.Title = session.Title;
            recordToUpdate.SubTitle = session.SubTitle;
            recordToUpdate.Description = session.Description;
            recordToUpdate.Notes = session.Notes;
            recordToUpdate.Level = session.Level;
            recordToUpdate.Capacity = session.Capacity;
            if (recordToUpdate.SessionId == -1)
            {
                _repository.AddSession(ref recordToUpdate, User.UserID);
            }
            else
            {
                _repository.UpdateSession(recordToUpdate, User.UserID);
            }
            if (SessionSpeakerRepository.Instance.GetSessionSpeakersBySession(recordToUpdate.SessionId).Count() == 0)
            {
                if (SpeakerRepository.Instance.GetSpeaker(session.ConferenceId, User.UserID) == null)
                {
                    SpeakerRepository.Instance.AddSpeaker(new Connect.Conference.Core.Models.Speakers.SpeakerBase() { ConferenceId = session.ConferenceId, UserId = User.UserID, Sort = 999 }, User.UserID);
                }
                SessionSpeakerRepository.Instance.AddSessionSpeaker(new Connect.Conference.Core.Models.SessionSpeakers.SessionSpeakerBase() { SessionId = recordToUpdate.SessionId, SpeakerId = User.UserID, Sort = 0 }, User.UserID);
            }
            return RedirectToDefaultRoute();
        }

    }
}