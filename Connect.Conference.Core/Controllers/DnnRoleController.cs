using Connect.Conference.Core.Common;
using Connect.Conference.Core.Models.Attendees;
using Connect.Conference.Core.Repositories;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Security.Roles;
using System.Linq;

namespace Connect.Conference.Core.Controllers
{
    public class DnnRoleController
    {
        public static void CheckAttendee(int portalId, int conferenceId, int userId)
        {
            var conference = ConferenceRepository.Instance.GetConference(portalId, conferenceId);
            if (conference.AttendeeRole > 0)
            {
                var attendee = AttendeeRepository.Instance.GetAttendee(conferenceId, userId);
                if (attendee != null && attendee.Status >= (int)AttendeeStatus.Confirmed)
                {
                    EnsureUserRole(portalId, attendee.UserId, conference.AttendeeRole);
                }
                else
                {
                    DenyUserRole(portalId, attendee.UserId, conference.AttendeeRole);
                }
            }
        }
        public static void CheckAttendee(int portalId, AttendeeBase attendee)
        {
            var conference = ConferenceRepository.Instance.GetConference(portalId, attendee.ConferenceId);
            if (conference.AttendeeRole > 0)
            {
                if (attendee.Status >= (int)AttendeeStatus.Confirmed)
                {
                    EnsureUserRole(portalId, attendee.UserId, conference.AttendeeRole);
                }
                else
                {
                    DenyUserRole(portalId, attendee.UserId, conference.AttendeeRole);
                }
            }
        }
        public static void RemoveAttendee(int portalId, int conferenceId, int userId)
        {
            var conference = ConferenceRepository.Instance.GetConference(portalId, conferenceId);
            if (conference.AttendeeRole > 0)
            {
                DenyUserRole(portalId, userId, conference.AttendeeRole);
            }
        }
        public static void CheckSpeaker(int portalId, int conferenceId, int userId)
        {
            var conference = ConferenceRepository.Instance.GetConference(portalId, conferenceId);
            if (conference.SpeakerRole > 0)
            {
                if (SessionSpeakerRepository.Instance.GetSessionSpeakersByUser(userId).Count() > 0)
                {
                    EnsureUserRole(portalId, userId, conference.SpeakerRole);
                }
                else
                {
                    DenyUserRole(portalId, userId, conference.SpeakerRole);
                }
            }
        }

        private static void EnsureUserRole(int portalId, int userId, int roleId)
        {
            DotNetNuke.Security.Roles.RoleController.Instance.AddUserRole(portalId, userId, roleId, RoleStatus.Approved, false, Null.NullDate, Null.NullDate);
        }
        private static void DenyUserRole(int portalId, int userId, int roleId)
        {
            DotNetNuke.Security.Roles.RoleController.Instance.UpdateUserRole(portalId, userId, roleId, RoleStatus.Disabled, false, true);

        }
    }
}
