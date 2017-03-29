using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Attendees;
using System.Web;
using System.Linq;
using System.Net.Http.Headers;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class AttendeesController : ConferenceApiController
    {

        public class AttendResponse
        {
            public string Error { get; set; }
            public string DisplayName { get; set; }
            public string SessionTitle { get; set; }
        }

        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage AttendSession(int conferenceId, int roomId, string rfid)
        {
            var res = new AttendResponse();
            var attendee = AttendeeRepository.Instance.GetAttendeeByCode(conferenceId, rfid);
            if (attendee == null)
            {
                res.Error = "Attendee not found";
            }
            else
            {
                res.DisplayName = attendee.DisplayName;
                var session = SessionRepository.Instance.GetSession(conferenceId, roomId, System.DateTime.Now.AddMinutes(15));
                if (session == null)
                {
                    session = SessionRepository.Instance.GetSession(conferenceId, roomId, System.DateTime.Now);
                }
                if (session == null)
                {
                    res.Error = "Session not found";
                }
                else
                {
                    SessionAttendeeRepository.Instance.SetSessionAttendee(session.SessionId, attendee.UserId);
                    res.SessionTitle = session.Title;
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, res);
        }

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
                return Request.CreateResponse(HttpStatusCode.OK, AttendeeRepository.Instance.GetAttendee(conferenceId, a.UserId));
            }
            else if (newStatus.Status == -1)
            {
                AttendeeRepository.Instance.DeleteAttendee(conferenceId, newStatus.UserId);
                Connect.Conference.Core.Controllers.DnnRoleController.RemoveAttendee(PortalSettings.PortalId, conferenceId, newStatus.UserId);
                return Request.CreateResponse(HttpStatusCode.OK, "");
            }
            else
            {
                attendee.Status = newStatus.Status;
                AttendeeRepository.Instance.UpdateAttendee(attendee, UserInfo.UserID);
                Connect.Conference.Core.Controllers.DnnRoleController.CheckAttendee(PortalSettings.PortalId, attendee);
                return Request.CreateResponse(HttpStatusCode.OK, attendee);
            }
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

        public class UserDTO
        {
            public int UserId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string DisplayName { get; set; }
            public string Email { get; set; }
            public string Company { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Add(int conferenceId, [FromBody]UserDTO user)
        {
            var userId = Connect.Conference.Core.Controllers.ConferenceController.AddAttendee(PortalSettings.PortalId, conferenceId, -1, user.Email, user.FirstName, user.LastName, user.DisplayName, user.Company, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, AttendeeRepository.Instance.GetAttendee(conferenceId, userId));
        }

        public class EditAttendeeDTO
        {
            public string Company { get; set; }
            public string AttCode { get; set; }
            public bool ReceiveNotifications { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Edit(int conferenceId, int id, [FromBody]EditAttendeeDTO data)
        {
            var attendee = AttendeeRepository.Instance.GetAttendee(conferenceId, id);
            if (attendee != null)
            {
                attendee.Company = data.Company;
                attendee.AttCode = data.AttCode;
                attendee.ReceiveNotifications = data.ReceiveNotifications;
                AttendeeRepository.Instance.UpdateAttendee(attendee.GetAttendeeBase(), UserInfo.UserID);
            }
            return Request.CreateResponse(HttpStatusCode.OK, AttendeeRepository.Instance.GetAttendee(conferenceId, id));
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Download(int conferenceId)
        {
            var res = new HttpResponseMessage(HttpStatusCode.OK);
            var sb = new System.Text.StringBuilder();
            sb.AppendLine("LastName,FirstName,DisplayName,Email,Company,Status,ReceiveNotifications,Code");
            foreach (var att in AttendeeRepository.Instance.GetAttendeesByConference(conferenceId).OrderBy(a => a.LastName))
            {
                sb.AppendLine(string.Format("\"{0}\",\"{1}\",\"{2}\",{3},\"{4}\",{5},{6},\"{7}\"", att.LastName, att.FirstName, att.DisplayName, att.Email, att.Company, att.Status, att.ReceiveNotifications, att.AttCode));
            }
            res.Content = new StringContent(sb.ToString());
            res.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
            res.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            res.Content.Headers.ContentDisposition.FileName = "Attendees.csv";
            return res;
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference, AllowApiKeyAccess = true)]
        public HttpResponseMessage List(int conferenceId)
        {
            var res = AttendeeRepository.Instance.GetAttendeesByConference(conferenceId)
                .Where(a => !string.IsNullOrEmpty(a.AttCode))
                .Select(a => new { Code = a.AttCode, Name = a.DisplayName });
            return Request.CreateResponse(HttpStatusCode.OK, Newtonsoft.Json.JsonConvert.SerializeObject(res));
        }

    }
}
