
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Attendees;
using System.Web;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class AttendeesController : ConferenceApiController
    {

        public class ChangeStatusDTO
        {
            public int UserId { get; set; }
            public int Status { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendConference)]
        public HttpResponseMessage ChangeStatus(int conferenceId, [FromBody]ChangeStatusDTO newStatus)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (newStatus.Status > 1)
                {
                    return AccessViolation("Only management can increase your status this far");
                }
                if (newStatus.UserId != UserInfo.UserID)
                {
                    return AccessViolation("Only management can change status for other users");
                }
            }
            var attendee = AttendeeRepository.Instance.GetAttendee(conferenceId, newStatus.UserId);
            if (attendee == null)
            {
                var a = new AttendeeBase() { ConferenceId = conferenceId, UserId = newStatus.UserId, ReceiveNotifications = true, Status = newStatus.Status };
                AttendeeRepository.Instance.AddAttendee(a, UserInfo.UserID);
                Connect.Conference.Core.Controllers.DnnRoleController.CheckAttendee(PortalSettings.PortalId, a);
            }
            else if (newStatus.Status == -1)
            {
                AttendeeRepository.Instance.DeleteAttendee(conferenceId, newStatus.UserId);
                Connect.Conference.Core.Controllers.DnnRoleController.RemoveAttendee(PortalSettings.PortalId, conferenceId, newStatus.UserId);
            }
            else
            {
                attendee.Status = newStatus.Status;
                AttendeeRepository.Instance.UpdateAttendee(attendee, UserInfo.UserID);
                Connect.Conference.Core.Controllers.DnnRoleController.CheckAttendee(PortalSettings.PortalId, attendee);
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendConference)]
        public HttpResponseMessage UploadPicture(int conferenceId, int id)
        {
            HttpPostedFile postedFile = HttpContext.Current.Request.Files["profilepic"];
            var fileName = System.IO.Path.GetFileName(postedFile.FileName).RemoveIllegalCharacters();
            var extension = System.IO.Path.GetExtension(fileName);
            var contentType = "";
            switch (extension.ToLower())
            {
                case ".jpg":
                    contentType = "image/jpg";
                    break;
                case ".png":
                    contentType = "image/png";
                    break;
                default:
                    return ServiceError("Unsupported File Format");
            }
            if (postedFile.ContentLength > 1000000)
            {
                return ServiceError("File too big");
            }
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (id != UserInfo.UserID)
                {
                    ConferenceModuleContext.ThrowAccessViolation();
                }
            }
            var user = DotNetNuke.Entities.Users.UserController.GetUserById(PortalSettings.PortalId, id);
            var userFolder = DotNetNuke.Services.FileSystem.FolderManager.Instance.GetUserFolder(user);
            var file = DotNetNuke.Services.FileSystem.FileManager.Instance.AddFile(userFolder, fileName, postedFile.InputStream, true, false, contentType, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }
    }
}

