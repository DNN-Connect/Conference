using System.Linq;
using System.Web.Mvc;
using DotNetNuke.Common;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Tracks;

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
            AddBootstrap();
            AddModuleScript();
            return View(track);
        }

        [HttpGet]
        public ActionResult Edit(int conferenceId, int trackId)
        {
            var track = _repository.GetTrack(conferenceId, trackId);
            if (track == null) { track = new Track() { ConferenceId = conferenceId }; }
            AddBootstrap();
            AddModuleScript();
            AddEditScripts();
            return View(track.GetTrackBase());
        }

        [HttpPost]
        public ActionResult Edit(TrackBase track)
        {
            var previousRecord = _repository.GetTrack(track.ConferenceId, track.TrackId);
            if (previousRecord == null)
            {
                _repository.AddTrack(track, User.UserID);
            }
            else
            {
                track.CreatedOnDate = previousRecord.CreatedOnDate;
                track.CreatedByUserID = previousRecord.CreatedByUserID;
                _repository.UpdateTrack(track, User.UserID);
            }
            return View("View", _repository.GetTrack(track.ConferenceId, track.TrackId));
        }

    }
}