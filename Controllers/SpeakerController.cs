using System.Web.Mvc;
using DotNetNuke.Common;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Speakers;
using DotNetNuke.Services.FileSystem;

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
        public ActionResult View(int conferenceId, int speakerId)
        {
            var speaker = _repository.GetSpeaker(conferenceId, speakerId);
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(speaker);
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult BulkAdd(int conferenceId)
        {
            var conference = ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, conferenceId);
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(conference);
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
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(dto);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int conferenceId, int speakerId, SpeakerDTO speaker)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (User.UserID != speakerId)
                {
                    ConferenceModuleContext.ThrowAccessViolation();
                }
            }
            SpeakerBase recordToUpdate = null;
            var existingRecord = _repository.GetSpeaker(conferenceId, speakerId);
            var modeAdd = false;
            if (existingRecord == null)
            {
                recordToUpdate = new SpeakerBase() { ConferenceId = conferenceId, UserId = speakerId };
                modeAdd = true;
            }
            else
            {
                recordToUpdate = existingRecord.GetSpeakerBase();
            }
            recordToUpdate.Description = speaker.Description;
            recordToUpdate.DescriptionShort = speaker.DescriptionShort;
            recordToUpdate.Url = speaker.Url;
            recordToUpdate.Company = speaker.Company;
            if (modeAdd)
            {
                _repository.AddSpeaker(recordToUpdate, User.UserID);
            }
            else
            {
                _repository.UpdateSpeaker(recordToUpdate, User.UserID);
            }
            // Now the DNN side of things
            var dnnUser = DotNetNuke.Entities.Users.UserController.GetUserById(PortalSettings.PortalId, speakerId);
            if (dnnUser == null)
            {
                // create the user
            }
            dnnUser.FirstName = speaker.FirstName.Trim();
            dnnUser.LastName = speaker.LastName.Trim();
            dnnUser.DisplayName = speaker.DisplayName.Trim();
            dnnUser.Email = speaker.Email.Trim();
            // Handle the picture
            if (speaker.ProfilePic.filename != "")
            {
                IFileInfo file = null;
                var userFolder = FolderManager.Instance.GetUserFolder(dnnUser);
                var folderManager = FolderManager.Instance;
                file = FileManager.Instance.GetFile(userFolder, speaker.ProfilePic.filename);
                dnnUser.Profile.Photo = file.FileId.ToString();
                if (file != null & speaker.ProfilePic.crop.points != null)
                {
                    System.IO.MemoryStream sizedContent = null;
                    using (var content = FileManager.Instance.GetFileContent(file))
                    {
                        sizedContent = ImageUtils.CreateImage(content, speaker.ProfilePic.crop.points, speaker.ProfilePic.crop.zoom, 200, file.Extension);
                    }
                    FileManager.Instance.AddFile(userFolder, file.FileName, sizedContent, true, false, file.ContentType);
                    sizedContent.Dispose();
                    ImageUtils.CreateThumbnails(file.FileId);
                }
            }
            DotNetNuke.Entities.Users.UserController.UpdateUser(PortalSettings.PortalId, dnnUser);
            DotNetNuke.Entities.Profile.ProfileController.UpdateUserProfile(dnnUser);
            return ReturnRoute(speaker.ConferenceId, View("View", _repository.GetSpeaker(speaker.ConferenceId, recordToUpdate.UserId)));
        }

        public class SpeakerDTO : Speaker
        {
            public ImageDTO ProfilePic { get; set; }
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
                if (speaker.PhotoFilename != null)
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