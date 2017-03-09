using System;
using System.Collections.Generic;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Attendees;

namespace Connect.Conference.Core.Repositories
{

	public partial class AttendeeRepository : ServiceLocator<IAttendeeRepository, AttendeeRepository>, IAttendeeRepository
 {
        protected override Func<IAttendeeRepository> GetFactory()
        {
            return () => new AttendeeRepository();
        }
        public IEnumerable<Attendee> GetAttendeesByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Attendee>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Attendees WHERE ConferenceId=@0",
                    conferenceId);
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
            Requires.NotNull(attendee.ConferenceId);
            Requires.NotNull(attendee.UserId);
            attendee.CreatedByUserID = userId;
            attendee.CreatedOnDate = DateTime.Now;
            attendee.LastModifiedByUserID = userId;
            attendee.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_Attendees " +
                    "WHERE ConferenceId=@0 AND UserId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_Attendees (ConferenceId, UserId, Status, ReceiveNotifications, CreatedByUserID, CreatedOnDate, LastModifiedByUserID, LastModifiedOnDate, Company, AttCode) " +
                    "SELECT @0, @1, @2, @3, @4, @5, @6, @7, @8, @9", attendee.ConferenceId, attendee.UserId, attendee.Status, attendee.ReceiveNotifications, attendee.CreatedByUserID, attendee.CreatedOnDate, attendee.LastModifiedByUserID, attendee.LastModifiedOnDate, attendee.Company, attendee.AttCode);
            }
        }
        public void DeleteAttendee(AttendeeBase attendee)
        {
            DeleteAttendee(attendee.ConferenceId, attendee.UserId);
        }
        public void DeleteAttendee(int conferenceId, int userId)
        {
             Requires.NotNull(conferenceId);
             Requires.NotNull(userId);
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_Attendees WHERE ConferenceId=@0 AND UserId=@1",
                    conferenceId,userId);
            }
        }
        public void DeleteAttendeesByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_Attendees WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public void DeleteAttendeesByUser(int userId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_Attendees WHERE UserId=@0",
                    userId);
            }
        }
        public void UpdateAttendee(AttendeeBase attendee, int userId)
        {
            Requires.NotNull(attendee);
            Requires.NotNull(attendee.ConferenceId);
            Requires.NotNull(attendee.UserId);
            attendee.LastModifiedByUserID = userId;
            attendee.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<AttendeeBase>();
                rep.Update("SET Status=@0, ReceiveNotifications=@1, CreatedByUserID=@2, CreatedOnDate=@3, LastModifiedByUserID=@4, LastModifiedOnDate=@5, Company=@6, AttCode=@7 WHERE ConferenceId=@8 AND UserId=@9",
                          attendee.Status,attendee.ReceiveNotifications,attendee.CreatedByUserID,attendee.CreatedOnDate,attendee.LastModifiedByUserID,attendee.LastModifiedOnDate,attendee.Company,attendee.AttCode, attendee.ConferenceId,attendee.UserId);
            }
        } 
 }

    public partial interface IAttendeeRepository
    {
        IEnumerable<Attendee> GetAttendeesByConference(int conferenceId);
        IEnumerable<Attendee> GetAttendeesByUser(int userId);
        Attendee GetAttendee(int conferenceId, int userId);
        void AddAttendee(AttendeeBase attendee, int userId);
        void DeleteAttendee(AttendeeBase attendee);
        void DeleteAttendee(int conferenceId, int userId);
        void DeleteAttendeesByConference(int conferenceId);
        void DeleteAttendeesByUser(int userId);
        void UpdateAttendee(AttendeeBase attendee, int userId);
    }
}

