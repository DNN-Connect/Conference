using System;
using System.Collections.Generic;
using System.Linq;
using Connect.Conference.Core.Repositories;
using Connect.Conference.Core.Common;

namespace Connect.Conference.Core.Models
{
    public class Schedule
    {
        public Conferences.Conference Conference { get; set; }
        public IEnumerable<Locations.Location> Locations { get; set; }
        public IDictionary<int, DaySchedule> Days { get; set; }
        public Schedule(Conferences.Conference conference)
        {
            Conference = conference;
            Days = new Dictionary<int, DaySchedule>();
        }
        public class DaySchedule
        {
            public int DayNr { get; set; }
            public DateTime Day { get; set; }
            public SortedDictionary<int, TimeSlot> Slots { get; set; }
            public int TotalSessions { get; set; }
            public DaySchedule(DateTime day, int dayNr)
            {
                Day = day;
                DayNr = dayNr;
                Slots = new SortedDictionary<int, TimeSlot>();
            }
            public class TimeSlot
            {
                public Slots.Slot Slot { get; set; }
                public IDictionary<int, Sessions.Session> Sessions { get; set; }
                public TimeSlot(Slots.Slot slot)
                {
                    Slot = slot;
                    Sessions = new Dictionary<int, Sessions.Session>();
                }
            }
        }

        public static Schedule Create(int portalId, int conferenceId)
        {
            var conference = ConferenceRepository.Instance.GetConference(portalId, conferenceId);
            return Create(conference);
        }
        public static Schedule Create(Conferences.Conference conference)
        {
            var res = new Schedule(conference);
            var locations = LocationRepository.Instance.GetLocations(conference.ConferenceId).OrderBy(l => l.Sort);
            var sessions = SessionRepository.Instance.GetSessions(conference.ConferenceId).Where(s => s.Status > 2 && s.SlotId > 0 && s.DayNr > 0);
            var locationList = new List<Locations.Location>();
            foreach (var location in locations)
            {
                if (sessions.Where(s => s.LocationId == location.LocationId).Count() > 0)
                {
                    locationList.Add(location);
                }
            }
            res.Locations = locationList;
            var slots = SlotRepository.Instance.GetSlots(conference.ConferenceId).OrderBy(s => s.StartMinutes);
            var nrDays = (conference.EndDate != null ? ((int)((DateTime)conference.EndDate).Subtract((DateTime)conference.StartDate).TotalDays) : 1);
            for (int dayNr = 0; dayNr < nrDays; dayNr++)
            {
                var ds = new DaySchedule(((DateTime)conference.StartDate).AddDays(dayNr).Date, dayNr + 1);
                var nrSessions = 0;
                foreach (var slot in slots.Where(s => s.DayNr == dayNr + 1 | s.DayNr == null))
                {
                    var ts = new DaySchedule.TimeSlot(slot);
                    if (slot.SlotType == (int)SlotType.Session)
                    {
                        foreach (var session in sessions.Where(s => s.DayNr == dayNr + 1 & s.SlotId == slot.SlotId))
                        {
                            if (session.LocationId == null)
                            {
                                ts.Sessions.Add(-1, session);
                            }
                            else
                            {
                                ts.Sessions.Add((int)session.LocationId, session);
                            }
                            nrSessions++;
                        }
                    }
                    ds.Slots.Add(slot.StartMinutes, ts);
                }
                ds.TotalSessions = nrSessions;
                res.Days.Add(dayNr, ds);
            }
            return res;
        }

    }
}
