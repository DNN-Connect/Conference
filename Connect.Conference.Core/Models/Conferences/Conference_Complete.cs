using Connect.Conference.Core.Common;
using Connect.Conference.Core.Models.Attendees;
using Connect.Conference.Core.Models.Locations;
using Connect.Conference.Core.Models.Sessions;
using Connect.Conference.Core.Models.Slots;
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
        public List<ConferenceDay> Days { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<Location> Locations { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<Session> Sessions { get; private set; }
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<Slot> Slots { get; private set; }
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
        public Conference LoadComplete()
        {
            Days = new List<ConferenceDay>();
            if (StartDate != null)
            {
                var i = 1;
                var start = (System.DateTime)StartDate;
                if (EndDate != null)
                {
                    while (start <= EndDate)
                    {
                        Days.Add(new ConferenceDay()
                        {
                            DayNr = i,
                            DayDate = start
                        });
                        start = start.AddDays(1);
                        i++;
                    }
                }
            }
            Locations = LocationRepository.Instance.GetLocationsByConference(ConferenceId)
                .OrderBy(l => l.Sort);
            Sessions = SessionRepository.Instance.GetSessionsByConference(ConferenceId)
                .Where(s => s.Status > 2)
                .OrderBy(s => s.Title)
                .Select(s => s.LoadComplete());
            Slots = SlotRepository.Instance.GetSlotsByConference(ConferenceId);
            Speakers = SpeakerRepository.Instance.GetSpeakersByConference(ConferenceId)
                .Where(s => s.NrSessions > 0)
                .OrderBy(s => s.Sort)
                .Select(s => s.LoadComplete());
            Sponsors = SponsorRepository.Instance.GetSponsorsByConference(ConferenceId)
                .OrderBy(s => s.ViewOrder);
            Tracks = TrackRepository.Instance.GetTracksByConference(ConferenceId)
                .OrderBy(t => t.Sort);
            Tags = TagRepository.Instance.GetTagsByConference(ConferenceId)
                .Where(t => t.NrSessions > 0)
                .OrderBy(t => t.TagName);
            Attendees = AttendeeRepository.Instance.GetAttendeesByConference(ConferenceId)
                .OrderBy(a => a.LastName);
            return this;
        }
        public class ConferenceDay
        {
            public int DayNr { get; set; }
            public System.DateTime DayDate { get; set; }
        }
    }
}
