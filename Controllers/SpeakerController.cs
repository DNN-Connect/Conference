using System.Linq;
using System.Web.Mvc;
using DotNetNuke.Common;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Speakers;
using System.Web.Routing;
using DotNetNuke.Web.Mvc.Routing;
using System;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class SpeakerController : ConferenceMvcController
    {
        private readonly ISpeakerRepository _repository;

        public SpeakerController() : this(SpeakerRepository.Instance) { }

        public SpeakerController(ISpeakerRepository repository)
        {
            Requires.NotNull(repository);
            _repository = repository;
        }

        [HttpGet]
        public ActionResult Edit(int conferenceId, int speakerId)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (User.UserID != speakerId)
                {
                    ConferenceModuleContext.ThrowAccessViolation();
                }
            }
            var speaker = _repository.GetSpeaker(conferenceId, speakerId);
            var dto = new SpeakerDTO(speaker);
            return View(dto);
        }

        [HttpPost]
        public ActionResult Edit(int conferenceId, int speakerId, SpeakerDTO speaker)
        {
            //var previousRecord = _repository.GetTrack(track.ConferenceId, track.TrackId);
            //if (previousRecord == null)
            //{
            //    _repository.AddTrack(ref track, User.UserID);
            //}
            //else
            //{
            //    track.CreatedOnDate = previousRecord.CreatedOnDate;
            //    track.CreatedByUserID = previousRecord.CreatedByUserID;
            //    _repository.UpdateTrack(track, User.UserID);
            //}
            //RouteValueDictionary routeValues = new RouteValueDictionary();
            //switch (GetRouteParameter())
            //{
            //    case "c-tls":
            //        routeValues["controller"] = "Conference";
            //        routeValues["action"] = "TracksLocationsSlots";
            //        routeValues.Add("conferenceId", track.ConferenceId);
            //        return Redirect(ModuleRoutingProvider.Instance().GenerateUrl(routeValues, ModuleContext));
            //    default:
            //        return View("View", _repository.GetTrack(track.ConferenceId, track.TrackId));
            //}
            return RedirectToDefaultRoute();
        }

        public class SpeakerDTO : Speaker
        {
            private ImageDTO ProfilePic { get; set; }
            public string ProfilePicDTO
            {
                get
                {
                    return Newtonsoft.Json.JsonConvert.SerializeObject(ProfilePic);
                }
                set
                {
                    ProfilePic = Newtonsoft.Json.JsonConvert.DeserializeObject<ImageDTO>(value);
                }
            }
            public SpeakerDTO() { }
            public SpeakerDTO(Speaker speaker)
            {
                ReadSpeakerBase(speaker);
                DisplayName = speaker.DisplayName;
                FirstName = speaker.FirstName;
                LastName = speaker.LastName;
                Email = speaker.Email;
                Username = speaker.Username;
                PhotoFilename = speaker.PhotoFilename;
                PhotoFolder = speaker.PhotoFolder;
                PhotoWidth = speaker.PhotoWidth;
                PhotoHeight = speaker.PhotoHeight;
                PhotoContentType = speaker.PhotoContentType;
                Biography = speaker.Biography;
                Company = speaker.Company;
                CreatedByUser = speaker.CreatedByUser;
                LastModifiedByUser = speaker.LastModifiedByUser;
                ProfilePic = new ImageDTO();
                if (speaker.PhotoFilename != "")
                {
                    ProfilePic.filename = speaker.PhotoFilename;
                    ProfilePic.width = (int)speaker.PhotoWidth;
                    ProfilePic.height = (int)speaker.PhotoHeight;
                }
            }
        }
        public class ImageDTO
        {
            public string filename { get; set; } = "";
            public int width { get; set; } = 0;
            public int height { get; set; } = 0;
            public int smallestSide { get; set; } = 0;
            public CropDTO crop { get; set; } = new CropDTO();
        }
        public class CropDTO
        {
            public float[] points { get; set; }
            public float zoom { get; set; } = 0;
        }

    }
}