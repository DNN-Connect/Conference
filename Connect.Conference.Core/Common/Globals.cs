namespace Connect.Conference.Core.Common
{
    public class Globals
    {
        public static string GetResourcesPath(int conferenceId, int sessionId, string slash)
        {
            return string.Format("Connect{0}Conferences{0}{1}{0}{2}{0}", slash, conferenceId, sessionId);
        }
    }
}
