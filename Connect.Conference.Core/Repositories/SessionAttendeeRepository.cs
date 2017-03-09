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
                    "SELECT sa.* FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionAttendees sa INNER JOIN {databaseOwner}{objectQualifier}Connect_Conference_Sessions s ON s.SessionId=sa.SessionId WHERE s.ConferenceId=@0",
                    conferenceId);
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
    }
}

