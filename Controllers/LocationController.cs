using System.Web.Mvc;
using DotNetNuke.Common;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Locations;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class LocationController : ConferenceMvcController
    {
        private readonly ILocationRepository _repository;

        public LocationController() : this(LocationRepository.Instance) { }

        public LocationController(ILocationRepository repository)
        {
            Requires.NotNull(repository);
            _repository = repository;
        }

        [HttpGet]
        public ActionResult View(int conferenceId, int locationId)
        {
            var Location = _repository.GetLocation(conferenceId, locationId);
            if (Location == null) { Location = new Location() { ConferenceId = conferenceId }; }
            return View(Location);
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Edit(int conferenceId, int locationId)
        {
            var location = _repository.GetLocation(conferenceId, locationId);
            if (location == null) { location = new Location() { ConferenceId = conferenceId }; }
            return View(location.GetLocationBase());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Edit(LocationBase location)
        {
            var previousRecord = _repository.GetLocation(location.ConferenceId, location.LocationId);
            if (previousRecord == null)
            {
                _repository.AddLocation(ref location, User.UserID);
            }
            else
            {
                location.CreatedOnDate = previousRecord.CreatedOnDate;
                location.CreatedByUserID = previousRecord.CreatedByUserID;
                _repository.UpdateLocation(location, User.UserID);
            }
            return ReturnRoute(location.ConferenceId, View("View", _repository.GetLocation(location.ConferenceId, location.LocationId)));
        }

    }
}