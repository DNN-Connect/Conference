using System.Linq;
using System.Web.Mvc;
using DotNetNuke.Common;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Tracks;
using System.Web.Routing;
using DotNetNuke.Web.Mvc.Routing;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class TrackController : ConferenceMvcController
    {
        private readonly ITrackRepository _repository;

        public TrackController() : this(TrackRepository.Instance) { }

        public TrackController(ITrackRepository repository)
        {
            Requires.NotNull(repository);
            _repository = repository;
        }

        [HttpGet]
        public ActionResult View(int conferenceId, int trackId)
        {
            var track = _repository.GetTrack(conferenceId, trackId);
            if (track == null) { track = new Track() { ConferenceId = conferenceId }; }
            ConferenceModuleContext.AddBootstrapCss();
            ConferenceModuleContext.AddModuleService();
            return View(track);
        }

        [HttpGet]
        public ActionResult Edit(int conferenceId, int trackId)
        {
            var track = _repository.GetTrack(conferenceId, trackId);
            if (track == null) { track = new Track() { ConferenceId = conferenceId }; }
            ConferenceModuleContext.AddBootstrapCss();
            ConferenceModuleContext.AddModuleService();
            ConferenceModuleContext.AddEditScripts();
            return View(track.GetTrackBase());
        }

        [HttpPost]
        public ActionResult Edit(TrackBase track)
        {
            var previousRecord = _repository.GetTrack(track.ConferenceId, track.TrackId);
            if (previousRecord == null)
            {
                _repository.AddTrack(ref track, User.UserID);
            }
            else
            {
                track.CreatedOnDate = previousRecord.CreatedOnDate;
                track.CreatedByUserID = previousRecord.CreatedByUserID;
                _repository.UpdateTrack(track, User.UserID);
            }
            RouteValueDictionary routeValues = new RouteValueDictionary();
            switch (GetRouteParameter())
            {
                case "c":
                    routeValues["controller"] = "Conference";
                    routeValues["action"] = "View";
                    routeValues.Add("conferenceId", track.ConferenceId);
                    return Redirect(ModuleRoutingProvider.Instance().GenerateUrl(routeValues, ModuleContext));
                default:
                    return View("View", _repository.GetTrack(track.ConferenceId, track.TrackId));
            }
        }

    }
}