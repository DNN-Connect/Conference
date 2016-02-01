using System.Web.Mvc;
using DotNetNuke.Common;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Conferences;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class ConferenceController : ConferenceMvcController
    {
        private readonly IConferenceRepository _repository;

        public ConferenceController() : this(ConferenceRepository.Instance) { }

        public ConferenceController(IConferenceRepository repository)
        {
            Requires.NotNull(repository);
            _repository = repository;
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult TracksLocationsSlots(int conferenceId)
        {
            var conference = _repository.GetConference(PortalSettings.PortalId, conferenceId);
            if (conference == null) { conference = new Connect.Conference.Core.Models.Conferences.Conference() { PortalId = PortalSettings.PortalId }; }
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(conference);
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult SessionsSpeakers(int conferenceId)
        {
            var conference = _repository.GetConference(PortalSettings.PortalId, conferenceId);
            if (conference == null) { conference = new Connect.Conference.Core.Models.Conferences.Conference() { PortalId = PortalSettings.PortalId }; }
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(conference);
        }

        [HttpGet]
        public ActionResult View(int conferenceId)
        {
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(_repository.GetConference(PortalSettings.PortalId, conferenceId));
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Manage(int conferenceId)
        {
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(_repository.GetConference(PortalSettings.PortalId, conferenceId));
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Schedule(int conferenceId)
        {
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(_repository.GetConference(PortalSettings.PortalId, conferenceId));
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Edit(int conferenceId)
        {
            var conference = _repository.GetConference(PortalSettings.PortalId, conferenceId);
            if (conference == null) { conference = new Connect.Conference.Core.Models.Conferences.Conference() { PortalId = PortalSettings.PortalId }; }
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(conference.GetConferenceBase());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Edit(ConferenceBase conference)
        {
            var previousRecord = _repository.GetConference(PortalSettings.PortalId, conference.ConferenceId);
            if (previousRecord == null)
            {
                _repository.AddConference(ref conference, User.UserID);
            }
            else
            {
                conference.CreatedOnDate = previousRecord.CreatedOnDate;
                conference.CreatedByUserID = previousRecord.CreatedByUserID;
                _repository.UpdateConference(conference, User.UserID);
            }
            return RedirectToDefaultRoute();
        }

    }
}