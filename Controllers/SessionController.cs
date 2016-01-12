using System.Linq;
using System.Web.Mvc;
using DotNetNuke.Common;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Sessions;
using System.Web.Routing;
using DotNetNuke.Web.Mvc.Routing;
using System.Collections.Generic;
using Connect.Conference.Core.Models.Tags;

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
        [HttpPost]
        [ValidateAntiForgeryToken]
        public new ActionResult View()
        {
            var session = _repository.GetSession(int.Parse(HttpContext.Request.Params["ConferenceId"]), int.Parse(HttpContext.Request.Params["SessionId"]));
            if (HttpContext.Request.Params["workflow"] != null)
            {
                var newStatus = int.Parse(HttpContext.Request.Params["workflow"]);
                if (session.Status == 0 && newStatus == 1 && ConferenceModuleContext.Security.IsPresenter(session.SessionId))
                {
                    session.Status = 1;
                    _repository.UpdateSession(session.GetSessionBase(), User.UserID);
                }
                else if (session.Status > 0 && newStatus == 0 && ConferenceModuleContext.Security.IsPresenter(session.SessionId))
                {
                    session.Status = 0;
                    _repository.UpdateSession(session.GetSessionBase(), User.UserID);
                }

            }
            else if (HttpContext.Request.Params["command"] != null)
            {
                var command = HttpContext.Request.Params["command"];
                switch (command.ToLower())
                {
                    case "delete":
                        if (ConferenceModuleContext.Security.CanManage || ConferenceModuleContext.Security.IsPresenter(session.SessionId))
                        {
                            _repository.DeleteSession(session.GetSessionBase());
                            return RedirectToDefaultRoute();
                        }
                        break;
                }
            }
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
            HandleTags(session);
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
            HandleTags(session);
            return RedirectToDefaultRoute();
        }

        #region " Helper Methods "
        private void HandleTags(SessionBase session)
        {
            if (session.EditTags != null)
            {
                IEnumerable<Tag> tags = Newtonsoft.Json.JsonConvert.DeserializeObject<IEnumerable<Tag>>(session.EditTags);
                var tagsToAdd = new List<TagBase>();
                foreach (Tag tag in tags)
                {
                    var tagToAdd = tag.GetTagBase();
                    if (tag.TagId < 0)
                    {
                        tagToAdd.TagName = tagToAdd.TagName.Substring(0, 1).ToUpper() + tagToAdd.TagName.Substring(1);
                        tagToAdd.ConferenceId = session.ConferenceId;
                        TagRepository.Instance.AddTag(ref tagToAdd, User.UserID);
                    }
                    if (tagsToAdd.SingleOrDefault(t => t.TagId == tagToAdd.TagId) == null)
                    {
                        tagsToAdd.Add(tagToAdd);
                    }
                }
                SessionTagRepository.Instance.SetSessionTags(session.SessionId, tagsToAdd.Select(t => t.TagId).ToList());
            }
        }
        #endregion

    }
}