using Connect.Conference.Core.Common;
using Connect.Conference.Core.Models.SessionAttendees;
using Connect.Conference.Core.Models.SessionSpeakers;
using Connect.Conference.Core.Models.SessionTags;
using Connect.Conference.Core.Repositories;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Sessions
{
    public partial class Session
    {
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<SessionSpeaker> SessionSpeakers { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<SessionTag> SessionTags { get; private set; }
        [IgnoreColumn]
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Attendee)]
        public IEnumerable<SessionAttendee> Attendees { get; private set; }
        public void LoadComplete()
        {
            SessionSpeakerRepository.Instance.GetSessionSpeakersBySession(SessionId);
            SessionTagRepository.Instance.GetSessionTagsBySession(SessionId);
            SessionAttendeeRepository.Instance.GetSessionAttendeesBySession(SessionId);
        }
    }
}
