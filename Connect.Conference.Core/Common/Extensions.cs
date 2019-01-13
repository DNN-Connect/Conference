using System.Linq;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Common
{
    public static class Extensions
    {
        public static IOrderedEnumerable<Models.SessionSpeakers.SessionSpeaker> GetSpeakers(this Models.Sessions.SessionBase session)
        {
            return SessionSpeakerRepository.Instance.GetSessionSpeakersBySession(session.SessionId).OrderBy(p => p.Sort);
        }

        public static IOrderedEnumerable<Models.SessionTags.SessionTag> GetTags(this Models.Sessions.SessionBase session)
        {
            return SessionTagRepository.Instance.GetSessionTagsBySession(session.SessionId).OrderBy(t => t.TagName);
        }

        public static string GetSessionResourcesPath(this Models.Sessions.SessionBase session, string slash)
        {
            return Globals.GetSessionResourcesPath(session.ConferenceId, session.SessionId, slash);
        }

        public static string SafeReplace(this string input, string oldValue, string newValue)
        {
            if (string.IsNullOrEmpty(input)) return "";
            return input.Replace(oldValue, newValue);
        }

        public static string TrimSafeNull(this string input)
        {
            if (input == null) return null;
            return input.Trim();
        }

        public static string UnNull(this  string input)
        {
            if (input == null) return "";
            return input;
        }
        public static int UnNull(this int? input, int defaultValue)
        {
            if (input == null) return defaultValue;
            return (int)input;
        }
        public static int UnNull(this int? input)
        {
            return input.UnNull(-1);
        }

    }
}
