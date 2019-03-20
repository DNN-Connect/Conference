using Connect.Conference.Core.Models;
using DotNetNuke.Data;
using System.Collections.Generic;

namespace Connect.Conference.Core.Common
{
    public class Globals
    {
        public static string GetSessionResourcesPath(int conferenceId, int sessionId, string slash)
        {
            return string.Format("Connect{0}Conferences{0}{1}{0}{2}{0}", slash, conferenceId, sessionId);
        }

        public static string GetSponsorLogoPath(int conferenceId, int sponsorId, string slash)
        {
            return string.Format("Connect{0}Conferences{0}{1}{0}Sponsor{0}{2}{0}", slash, conferenceId, sponsorId);
        }

        public static string GetConferenceImagePath(int conferenceId, string slash)
        {
            return string.Format("Connect{0}Conferences{0}{1}{0}MainImage{0}", slash, conferenceId);
        }

        public static IEnumerable<SimpleUser> SearchUsers(int portalId, string field, string searchString)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SimpleUser>(System.Data.CommandType.Text, "SELECT * FROM {databaseOwner}{objectQualifier}vw_Users WHERE PortalId=@0 AND " + field + " LIKE @1 + '%'", portalId, searchString);
            }
        }
    }
}
