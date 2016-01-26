using Connect.Conference.Core.Common;
using Connect.Conference.Core.Repositories;
using DotNetNuke.Entities.Users;

namespace Connect.Conference.Core.Controllers
{
    public class ConferenceController
    {
        public static void AddAttendee(int portalId, int conferenceId, int userId, string email, string firstName, string lastName)
        {
            var user = UserController.Instance.GetUserById(portalId, userId);
            if (user == null)
            {
                user = UserController.GetUserByEmail(portalId, email);
                if (user == null)
                {
                    user = new UserInfo() { PortalID = portalId, Username = email, Email = email, FirstName = firstName, LastName = lastName, DisplayName = string.Format("{0} {1}", firstName, lastName) };
                    UserController.CreateUser(ref user);
                }
            }
            var attendee = AttendeeRepository.Instance.GetAttendee(conferenceId, user.UserID);
            if (attendee == null)
            {
                attendee = new Models.Attendees.Attendee() { ConferenceId = conferenceId, UserId = user.UserID, Status = (int)AttendeeStatus.Confirmed, ReceiveNotifications = true };
                AttendeeRepository.Instance.AddAttendee(attendee, -1);
            }
            else
            {
                attendee.Status = (int)AttendeeStatus.Confirmed;
                AttendeeRepository.Instance.UpdateAttendee(attendee, -1);
            }
        }
    }
}
