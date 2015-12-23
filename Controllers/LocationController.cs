using System.Linq;
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
        public ActionResult View(int conferenceId, int LocationId)
        {
            var Location = _repository.GetLocation(conferenceId, LocationId);
            if (Location == null) { Location = new Location() { ConferenceId = conferenceId }; }
            ConferenceModuleContext.AddBootstrapCss();
            ConferenceModuleContext.AddModuleScript();
            return View(Location);
        }

        [HttpGet]
        public ActionResult Edit(int conferenceId, int LocationId)
        {
            var Location = _repository.GetLocation(conferenceId, LocationId);
            if (Location == null) { Location = new Location() { ConferenceId = conferenceId }; }
            ConferenceModuleContext.AddBootstrapCss();
            ConferenceModuleContext.AddModuleScript();
            ConferenceModuleContext.AddEditScripts();
            return View(Location.GetLocationBase());
        }

        [HttpPost]
        public ActionResult Edit(LocationBase Location)
        {
            var previousRecord = _repository.GetLocation(Location.ConferenceId, Location.LocationId);
            if (previousRecord == null)
            {
                _repository.AddLocation(Location, User.UserID);
            }
            else
            {
                Location.CreatedOnDate = previousRecord.CreatedOnDate;
                Location.CreatedByUserID = previousRecord.CreatedByUserID;
                _repository.UpdateLocation(Location, User.UserID);
            }
            return View("View", _repository.GetLocation(Location.ConferenceId, Location.LocationId));
        }

    }
}