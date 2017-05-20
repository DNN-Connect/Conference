using System.Collections.Generic;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.SessionAttendees;

namespace Connect.Conference.Core.Repositories
{

    public partial class SessionAttendeeRepository : ServiceLocator<ISessionAttendeeRepository, SessionAttendeeRepository>, ISessionAttendeeRepository
 {
        public IEnumerable<SessionAttendee> GetSessionAttendees(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionAttendee>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionAttendees WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public IEnumerable<SessionAttendee> GetSessionAttendeesByUser(int conferenceId, int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionAttendee>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionAttendees " +
                    "WHERE ConferenceId=@0 AND UserId=@1",
                    conferenceId,
                    userId);
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
 }

    public partial interface ISessionAttendeeRepository
    {
        IEnumerable<SessionAttendee> GetSessionAttendees(int conferenceId);
        IEnumerable<SessionAttendee> GetSessionAttendeesByUser(int conferenceId, int userId);
        void DeleteSessionAttendee(SessionAttendeeBase sessionAttendee);
    }
}

