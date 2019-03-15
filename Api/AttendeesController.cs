using Connect.Conference.Core.Common;
using Connect.Conference.Core.Models.Attendees;
using Connect.Conference.Core.Repositories;
using Connect.DNN.Modules.Conference.Common;
using DotNetNuke.Web.Api;
using Newtonsoft.Json;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class AttendeesController : ConferenceApiController
    {
        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage All(int conferenceId)
        {
            if (!ConferenceModuleContext.Security.CanManage && AttendeeRepository.Instance.GetAttendee(conferenceId, UserInfo.UserID) == null)
            {
                return AccessViolation("You must be logged in and attending to see the list of attendees");
            }
            var resObject = AttendeeRepository.Instance.GetAttendeesByConference(conferenceId).Where(a => a.Status >= (int)AttendeeStatus.Confirmed).OrderBy(a => a.LastName);
            var res = JsonConvert.SerializeObject(resObject,
                            Formatting.None,
                            new JsonSerializerSettings
                            {
                                ContractResolver = new WebApiJsonContractResolver(ConferenceModuleContext.Security.CanManage ? WebApiSecurityLevel.Management : WebApiSecurityLevel.Attendee)
                            });
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(res, System.Text.Encoding.UTF8, "application/json");
            return response;
        }

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
                    SessionAttendeeRepository.Instance.SetSessionAttendee(session.SessionId, attendee.UserId, UserInfo.UserID);
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

        public class UpdateImageDTO
        {
            public string Image { get; set; }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendConference)]
        public HttpResponseMessage UpdateImage(int conferenceId, int id, UpdateImageDTO data)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (id != UserInfo.UserID)
                {
                    ConferenceModuleContext.ThrowAccessViolation();
                }
            }
            var attendee = AttendeeRepository.Instance.GetAttendee(conferenceId, id);
            var file = ImageUtils.SaveUserProfilePic(PortalSettings.PortalId, id, data.Image, UserInfo.UserID);
            if (file != null)
            {
                attendee.PhotoFolder = file.Folder;
                attendee.PhotoFilename = file.FileName;
                attendee.PhotoContentType = file.ContentType;
                attendee.PhotoHeight = file.Height;
                attendee.PhotoWidth = file.Width;
            }
            return Request.CreateResponse(HttpStatusCode.OK, attendee);
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
