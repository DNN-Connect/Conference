using Connect.Conference.Core.Common;
using Connect.Conference.Core.Models.SessionTags;
using Connect.Conference.Core.Repositories;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Sessions
{
    public partial class Session
    {
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<UserExtract> SessionSpeakers { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<SessionTag> SessionTags { get; private set; }
        [IgnoreColumn]
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Attendee)]
        public IEnumerable<UserExtract> Attendees { get; private set; }
        public Session LoadComplete()
        {
            SessionSpeakers = SessionSpeakerRepository.Instance.GetSessionSpeakersBySession(SessionId)
                .OrderBy(ss => ss.Sort)
                .Select(ss => new UserExtract()
                {
                    UserId = ss.SpeakerId,
                    DisplayName = ss.DisplayName,
                    Company = ss.Company
                });
            SessionTags = SessionTagRepository.Instance.GetSessionTagsBySession(SessionId)
                .OrderBy(st => st.TagName);
            Attendees = SessionAttendeeRepository.Instance.GetSessionAttendeesBySession(SessionId)
                .OrderBy(sa => sa.DisplayName)
                .Select(sa => new UserExtract()
                {
                    UserId = sa.UserId,
                    DisplayName = sa.DisplayName,
                    Company = sa.Company
                });
            return this;
        }

        public class UserExtract
        {
            public int UserId { get; set; }
            public string DisplayName { get; set; }
            public string Company { get; set; }
        }

    }
}
