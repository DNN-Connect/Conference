using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.SessionAttendees;

namespace Connect.Conference.Core.Repositories
{

	public class SessionAttendeeRepository : ServiceLocator<ISessionAttendeeRepository, SessionAttendeeRepository>, ISessionAttendeeRepository
 {
        protected override Func<ISessionAttendeeRepository> GetFactory()
        {
            return () => new SessionAttendeeRepository();
        }
        public IEnumerable<SessionAttendee> GetSessionAttendeesBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionAttendee>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionAttendees WHERE SessionId=@0",
                    sessionId);
            }
        }
        public IEnumerable<SessionAttendee> GetSessionAttendeesByUser(int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionAttendee>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionAttendees WHERE UserId=@0",
                    userId);
            }
        }
        public void SetSessionAttendee(int sessionId, int userId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionAttendees " +
                    "WHERE SessionId=@0 AND UserId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionAttendees (SessionId, UserId, CreatedByUserID, CreatedOnDate, LastModifiedByUserID, LastModifiedOnDate) " +
                    "SELECT @0, @1, @1, GETDATE(), @1, GETDATE()", sessionId, userId);
            }
        }
        public void SetSessionAttendees(int sessionId, List<int> sessionAttendees)
        {

            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionAttendees WHERE SessionId=@0", sessionId);
                context.Execute(System.Data.CommandType.Text,
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionAttendees (SessionId, UserId) " +
                    "SELECT @0, s.RecordID " +
                    "FROM {databaseOwner}{objectQualifier}SplitDelimitedIDs(@1, ',') s", sessionId, string.Join(",", sessionAttendees));
            }
        }
        public void DeleteSessionAttendee(SessionAttendeeBase sessionAttendee)
        {
            Requires.NotNull(sessionAttendee);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionAttendeeBase>();
                rep.Delete(sessionAttendee);
            }
        }
        public void DeleteSessionAttendeesBySession(int sessionId)
        {
            Requires.NotNull(sessionId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionAttendeeBase>();
                rep.Delete("WHERE SessionId=@0", sessionId);
            }
        }
        public void DeleteSessionAttendeesByUser(int userId)
        {
            Requires.NotNull(userId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionAttendeeBase>();
                rep.Delete("WHERE UserId=@0", userId);
            }
        }
 }

    public interface ISessionAttendeeRepository
    {
        IEnumerable<SessionAttendee> GetSessionAttendeesBySession(int sessionId);
        IEnumerable<SessionAttendee> GetSessionAttendeesByUser(int userId);
        void SetSessionAttendee(int sessionId, int userId);
        void SetSessionAttendees(int sessionId, List<int> sessionAttendees);
        void DeleteSessionAttendee(SessionAttendeeBase sessionAttendee);
        void DeleteSessionAttendeesBySession(int sessionId);
        void DeleteSessionAttendeesByUser(int userId);
    }
}

