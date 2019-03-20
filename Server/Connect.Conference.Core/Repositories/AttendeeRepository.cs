using Connect.Conference.Core.Models.Attendees;
using DotNetNuke.Data;
using DotNetNuke.Framework;

namespace Connect.Conference.Core.Repositories
{

    public partial class AttendeeRepository : ServiceLocator<IAttendeeRepository, AttendeeRepository>, IAttendeeRepository
    {
        public Attendee GetAttendeeByCode(int conferenceId, string attCode)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteSingleOrDefault<Attendee>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Attendees WHERE ConferenceId=@0 AND AttCode=@1",
                    conferenceId, attCode);
            }
        }
    }

    public partial interface IAttendeeRepository
    {
        Attendee GetAttendeeByCode(int conferenceId, string attCode);
    }
}

