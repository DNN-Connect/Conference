using Connect.Conference.Core.Common;
using Connect.Conference.Core.Models.Attendees;
using Connect.Conference.Core.Models.Locations;
using Connect.Conference.Core.Models.Sessions;
using Connect.Conference.Core.Models.Speakers;
using Connect.Conference.Core.Models.Sponsors;
using Connect.Conference.Core.Models.Tags;
using Connect.Conference.Core.Models.Tracks;
using Connect.Conference.Core.Repositories;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Conferences
{
    public partial class Conference
    {
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<Location> Locations { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<Session> Sessions { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<Speaker> Speakers { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<Sponsor> Sponsors { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<Track> Tracks { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<Tag> Tags { get; private set; }
        [IgnoreColumn]
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Attendee)]
        public IEnumerable<Attendee> Attendees { get; private set; }
        public void LoadComplete()
        {
            Locations = LocationRepository.Instance.GetLocationsByConference(ConferenceId)
                .OrderBy(l => l.Sort);
            Sessions = SessionRepository.Instance.GetSessionsByConference(ConferenceId)
                .Where(s => s.Status > 2)
                .OrderBy(s => s.Title);
            foreach (var s in Sessions)
            {
                s.LoadComplete();
            }
            Speakers = SpeakerRepository.Instance.GetSpeakersByConference(ConferenceId)
                .Where(s => s.NrSessions > 0)
                .OrderBy(s => s.Sort);
            foreach (var s in Speakers)
            {
                s.LoadComplete();
            }
            Sponsors = SponsorRepository.Instance.GetSponsorsByConference(ConferenceId)
                .OrderBy(s => s.ViewOrder);
            Tracks = TrackRepository.Instance.GetTracksByConference(ConferenceId)
                .OrderBy(t => t.Sort);
            Tags = TagRepository.Instance.GetTagsByConference(ConferenceId)
                .Where(t => t.NrSessions > 0)
                .OrderBy(t => t.TagName);
            Attendees = AttendeeRepository.Instance.GetAttendeesByConference(ConferenceId)
                .OrderBy(a => a.LastName);
        }
    }
}
