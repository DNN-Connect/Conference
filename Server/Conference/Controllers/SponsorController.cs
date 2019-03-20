using Connect.Conference.Core.Common;
using Connect.Conference.Core.Models.Sponsors;
using Connect.Conference.Core.Repositories;
using Connect.DNN.Modules.Conference.Common;
using DotNetNuke.Common;
using System.Web;
using System.Web.Mvc;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class SponsorController : ConferenceMvcController
    {
        private readonly ISponsorRepository _repository;

        public SponsorController() : this(SponsorRepository.Instance) { }

        public SponsorController(ISponsorRepository repository)
        {
            Requires.NotNull(repository);
            _repository = repository;
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Index(int conferenceId)
        {
            var conference = ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, conferenceId);
            return View(conference);
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Edit(int sponsorId, int conferenceId)
        {
            var sponsor = _repository.GetSponsor(sponsorId);
            if (sponsor == null) { sponsor = new Sponsor() { ConferenceId = conferenceId }; }
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(sponsor.GetSponsorBase());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Edit(SponsorBase sponsor, int conferenceId, HttpPostedFileBase image)
        {
            sponsor.ConferenceId = conferenceId;
            sponsor.Name = sponsor.Name.Trim();
            sponsor.Url = sponsor.Url.TrimSafeNull();
            var previousRecord = _repository.GetSponsor(sponsor.SponsorId);
            if (previousRecord == null)
            {
                _repository.AddSponsor(ref sponsor, User.UserID);
            }
            else
            {
                sponsor.CreatedOnDate = previousRecord.CreatedOnDate;
                sponsor.CreatedByUserID = previousRecord.CreatedByUserID;
                _repository.UpdateSponsor(sponsor, User.UserID);
            }
            if (image != null)
            {
                sponsor.SaveLogo(PortalSettings, image.InputStream, System.IO.Path.GetExtension(image.FileName));
            }
            return ReturnRoute("Sponsor", "Index", "ConferenceId=" + conferenceId.ToString());
        }
    }
}