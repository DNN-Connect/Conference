
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Models.Attendees;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class AttendeesController : ConferenceApiController
    {

        public class ChangeStatusDTO
        {
            public int Status { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendConference)]
        public HttpResponseMessage ChangeStatus(int conferenceId, [FromBody]ChangeStatusDTO newStatus)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (newStatus.Status > 0)
                {
                    return AccessViolation("Only management can increase your status this far");
                }
            }
            var attendee = AttendeeRepository.Instance.GetAttendee(conferenceId, UserInfo.UserID);
            if (attendee == null)
            {
                var a = new AttendeeBase() { ConferenceId = conferenceId, UserId = UserInfo.UserID, ReceiveNotifications = true, Status = newStatus.Status };
                AttendeeRepository.Instance.AddAttendee(a, UserInfo.UserID);
            }
            else if (newStatus.Status == -1)
            {
                AttendeeRepository.Instance.DeleteAttendee(conferenceId, UserInfo.UserID);
            }
            else
            {
                attendee.Status = newStatus.Status;
                AttendeeRepository.Instance.UpdateAttendee(attendee, UserInfo.UserID);
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}

