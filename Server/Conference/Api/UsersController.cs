using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Repositories;
using Connect.DNN.Modules.Conference.Common;
using DotNetNuke.Entities.Users;
using DotNetNuke.Web.Api;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Connect.DNN.Modules.Conference.Api
{
    public class UsersController : ConferenceApiController
    {
        public class EditProfileDTO
        {
            public string DisplayName { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Biography { get; set; }
            public string ShortBiography { get; set; }
            public string Company { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.AttendsConference)]
        public HttpResponseMessage Edit(int conferenceId, int id, [FromBody]EditProfileDTO data)
        {
            data.DisplayName = data.DisplayName.UnNull().Trim();
            data.LastName = data.LastName.UnNull().Trim();
            data.FirstName = data.FirstName.UnNull().Trim();
            data.Biography = data.Biography.UnNull().Trim();
            data.ShortBiography = data.ShortBiography.UnNull().Trim();
            data.Company = data.Company.UnNull().Trim();
            var attendee = AttendeeRepository.Instance.GetAttendee(conferenceId, id);
            if (attendee != null)
            {
                attendee.Company = data.Company;
                AttendeeRepository.Instance.UpdateAttendee(attendee.GetAttendeeBase(), UserInfo.UserID);
            }
            var speaker = SpeakerRepository.Instance.GetSpeaker(conferenceId, UserInfo.UserID);
            if (speaker != null)
            {
                speaker.Description = data.Biography;
                speaker.DescriptionShort = data.ShortBiography;
                speaker.Company = data.Company;
                SpeakerRepository.Instance.UpdateSpeaker(speaker, UserInfo.UserID);
            }
            var user = UserController.Instance.GetUserById(PortalSettings.PortalId, id);
            if (user != null)
            {
                user.Profile.Biography = data.Biography;
                user.Profile.FirstName = data.FirstName;
                user.Profile.LastName = data.LastName;
                user.FirstName = data.FirstName;
                user.LastName = data.LastName;
                user.DisplayName = data.DisplayName;
                FixDnnController.SetUserProfileProperty(PortalSettings.PortalId, user.UserID, "Company", data.Company);
                UserController.UpdateUser(PortalSettings.PortalId, user);
            }
            var res = new EditProfileDTO();
            attendee = AttendeeRepository.Instance.GetAttendee(conferenceId, id);
            if (attendee != null)
            {
                res.Company = attendee.Company;
            }
            speaker = SpeakerRepository.Instance.GetSpeaker(conferenceId, UserInfo.UserID);
            if (speaker != null)
            {
                res.Biography = speaker.Description;
                res.ShortBiography = speaker.DescriptionShort;
            }
            user = UserController.Instance.GetUserById(PortalSettings.PortalId, id);
            if (user != null)
            {
                res.DisplayName = user.DisplayName;
                res.LastName = user.Profile.LastName;
                res.FirstName = user.Profile.FirstName;
            }
            return Request.CreateResponse(HttpStatusCode.OK, res);
        }
    }
}