using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.Attendees;

namespace Connect.Conference.Core.Repositories
{

	public class AttendeeRepository : ServiceLocator<IAttendeeRepository, AttendeeRepository>, IAttendeeRepository
 {
        protected override Func<IAttendeeRepository> GetFactory()
        {
            return () => new AttendeeRepository();
        }
        public IEnumerable<Attendee> GetAttendees(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Attendee>();
                return rep.Get(conferenceId);
            }
        }
        public IEnumerable<Attendee> GetAttendeesByUser(int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Attendee>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Attendees WHERE UserId=@0",
                    userId);
            }
        }
        public Attendee GetAttendee(int conferenceId, int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteSingleOrDefault<Attendee>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Attendees WHERE ConferenceId=@0 AND UserId=@1",
                    conferenceId,userId);
            }
        }
        public void AddAttendee(AttendeeBase attendee, int userId)
        {
            Requires.NotNull(attendee);
            Requires.PropertyNotNegative(attendee, "PortalId");
            attendee.CreatedByUserID = userId;
            attendee.CreatedOnDate = DateTime.Now;
            attendee.LastModifiedByUserID = userId;
            attendee.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<AttendeeBase>();
                rep.Insert(attendee);
            }
        }
        public void DeleteAttendee(AttendeeBase attendee)
        {
            Requires.NotNull(attendee);
            Requires.PropertyNotNegative(attendee, "AttendeeId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<AttendeeBase>();
                rep.Delete(attendee);
            }
        }
        public void UpdateAttendee(AttendeeBase attendee, int userId)
        {
            Requires.NotNull(attendee);
            Requires.PropertyNotNegative(attendee, "AttendeeId");
            attendee.LastModifiedByUserID = userId;
            attendee.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<AttendeeBase>();
                rep.Update(attendee);
            }
        } 
 }

    public interface IAttendeeRepository
    {
        IEnumerable<Attendee> GetAttendees(int conferenceId);
        IEnumerable<Attendee> GetAttendeesByUser(int userId);
        Attendee GetAttendee(int conferenceId, int userId);
        void AddAttendee(AttendeeBase attendee, int userId);
        void DeleteAttendee(AttendeeBase attendee);
        void UpdateAttendee(AttendeeBase attendee, int userId);
    }
}

