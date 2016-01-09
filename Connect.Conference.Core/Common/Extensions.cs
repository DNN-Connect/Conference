using System;
using System.Collections.Generic;
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

    }
}
