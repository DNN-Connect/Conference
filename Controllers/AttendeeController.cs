using System.Web.Mvc;
using DotNetNuke.Common;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Attendees;
using DotNetNuke.Services.FileSystem;
using DotNetNuke.Entities.Users;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class AttendeeController : ConferenceMvcController
    {
        private readonly IAttendeeRepository _repository;

        public AttendeeController() : this(AttendeeRepository.Instance) { }

        public AttendeeController(IAttendeeRepository repository)
        {
            Requires.NotNull(repository);
            _repository = repository;
        }

        [HttpGet]
        public ActionResult View(int conferenceId, int attendeeId)
        {
            var attendee = _repository.GetAttendee(conferenceId, attendeeId);
            return View(attendee);
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult BulkAdd(int conferenceId)
        {
            var conference = ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, conferenceId);
            return View(conference);
        }

        [HttpGet]
        public ActionResult Edit(int conferenceId, int attendeeId)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (User.UserID != attendeeId)
                {
                    ConferenceModuleContext.ThrowAccessViolation();
                }
            }
            var attendee = _repository.GetAttendee(conferenceId, attendeeId);
            var dto = new AttendeeDTO(attendee);
            return View(dto);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int conferenceId, int attendeeId, AttendeeDTO attendee)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (User.UserID != attendeeId)
                {
                    ConferenceModuleContext.ThrowAccessViolation();
                }
            }
            AttendeeBase recordToUpdate = null;
            var existingRecord = _repository.GetAttendee(conferenceId, attendeeId);
            var modeAdd = false;
            if (existingRecord == null)
            {
                recordToUpdate = new AttendeeBase() { ConferenceId = conferenceId, UserId = attendeeId };
                modeAdd = true;
            }
            else
            {
                recordToUpdate = existingRecord.GetAttendeeBase();
            }
            recordToUpdate.ReceiveNotifications = attendee.ReceiveNotifications;
            recordToUpdate.Company = attendee.Company;
            if (modeAdd)
            {
                _repository.AddAttendee(recordToUpdate, User.UserID);
            }
            else
            {
                _repository.UpdateAttendee(recordToUpdate, User.UserID);
            }
            // Now the DNN side of things
            var dnnUser = DotNetNuke.Entities.Users.UserController.GetUserById(PortalSettings.PortalId, attendeeId);
            if (dnnUser == null)
            {
                // create the user
                dnnUser = new UserInfo() { PortalID = PortalSettings.PortalId, Username = attendee.Email, Email = attendee.Email, FirstName = attendee.FirstName, LastName = attendee.LastName, DisplayName = attendee.DisplayName };
                UserController.CreateUser(ref dnnUser);
            }
            dnnUser.FirstName = attendee.FirstName.Trim();
            dnnUser.LastName = attendee.LastName.Trim();
            dnnUser.DisplayName = attendee.DisplayName.Trim();
            dnnUser.Email = attendee.Email.Trim();
            // Handle the picture
            if (attendee.ProfilePic.filename != "")
            {
                IFileInfo file = null;
                var userFolder = FolderManager.Instance.GetUserFolder(dnnUser);
                var folderManager = FolderManager.Instance;
                file = FileManager.Instance.GetFile(userFolder, attendee.ProfilePic.filename);
                dnnUser.Profile.Photo = file.FileId.ToString();
                if (file != null & attendee.ProfilePic.crop.points != null)
                {
                    System.IO.MemoryStream sizedContent = null;
                    using (var content = FileManager.Instance.GetFileContent(file))
                    {
                        sizedContent = ImageUtils.CreateImage(content, attendee.ProfilePic.crop.points, file.Extension);
                    }
                    FileManager.Instance.AddFile(userFolder, file.FileName, sizedContent, true, false, file.ContentType);
                    sizedContent.Dispose();
                    ImageUtils.CreateThumbnails(file.FileId);
                }
            }
            if (!string.IsNullOrEmpty(attendee.Company))
            {
                dnnUser.Profile.SetProfileProperty("Company", attendee.Company);
            }
            UserController.UpdateUser(PortalSettings.PortalId, dnnUser);
            DotNetNuke.Entities.Profile.ProfileController.UpdateUserProfile(dnnUser);
            return ReturnRoute(attendee.ConferenceId, View("View", _repository.GetAttendee(attendee.ConferenceId, attendee.UserId)));
        }

        public class AttendeeDTO : Attendee
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
            public AttendeeDTO() { }
            public AttendeeDTO(Attendee attendee)
            {
                ReadAttendeeBase(attendee);
                DisplayName = attendee.DisplayName;
                FirstName = attendee.FirstName;
                LastName = attendee.LastName;
                Email = attendee.Email;
                Username = attendee.Username;
                PhotoFilename = attendee.PhotoFilename;
                PhotoFolder = attendee.PhotoFolder;
                PhotoWidth = attendee.PhotoWidth;
                PhotoHeight = attendee.PhotoHeight;
                PhotoContentType = attendee.PhotoContentType;
                Biography = attendee.Biography;
                Company = attendee.Company;
                CreatedByUser = attendee.CreatedByUser;
                LastModifiedByUser = attendee.LastModifiedByUser;
                ProfilePic = new ImageDTO();
                if (attendee.PhotoFilename != null)
                {
                    ProfilePic.filename = attendee.PhotoFilename;
                    ProfilePic.width = (int)attendee.PhotoWidth;
                    ProfilePic.height = (int)attendee.PhotoHeight;
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