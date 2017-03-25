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
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Sessions(int conferenceId)
        {
            var conference = _repository.GetConference(PortalSettings.PortalId, conferenceId);
            if (conference == null) { conference = new Connect.Conference.Core.Models.Conferences.Conference() { PortalId = PortalSettings.PortalId }; }
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(conference);
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Speakers(int conferenceId)
        {
            var conference = _repository.GetConference(PortalSettings.PortalId, conferenceId);
            if (conference == null) { conference = new Connect.Conference.Core.Models.Conferences.Conference() { PortalId = PortalSettings.PortalId }; }
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(conference);
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Attendees(int conferenceId)
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
        public ActionResult Delete(int conferenceId)
        {
            var conference = _repository.GetConference(PortalSettings.PortalId, conferenceId);
            if (conference != null)
            {
                _repository.DeleteConference(conference.GetConferenceBase());
            }
            return RedirectToDefaultRoute();
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
            conference.Location = conference.Location.Trim();
            conference.MqttBroker = conference.MqttBroker.Trim();
            conference.MqttBrokerPassword = conference.MqttBrokerPassword.Trim();
            conference.MqttBrokerUsername = conference.MqttBrokerUsername.Trim();
            conference.Name = conference.Name.Trim();
            conference.Url = conference.Url.Trim();
            conference.BaseTopicPath = conference.BaseTopicPath.TrimEnd('#').TrimEnd('/');
            var previousRecord = _repository.GetConference(PortalSettings.PortalId, conference.ConferenceId);
            if (previousRecord == null)
            {
                conference.PortalId = PortalSettings.PortalId;
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