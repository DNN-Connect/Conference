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
            RouteValueDictionary routeValues = new RouteValueDictionary();
            switch (GetRouteParameter())
            {
                case "c":
                    routeValues["controller"] = "Conference";
                    routeValues["action"] = "View";
                    routeValues.Add("conferenceId", session.ConferenceId);
                    return Redirect(ModuleRoutingProvider.Instance().GenerateUrl(routeValues, ModuleContext));
                default:
                    return View("View", _repository.GetSession(session.ConferenceId, session.SessionId));
            }
        }

    }
}