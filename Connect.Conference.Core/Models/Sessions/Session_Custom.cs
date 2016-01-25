using System.Linq;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Sessions
{

    public partial class Session : SessionBase
    {

        [IgnoreColumn]
        public string StatusGlyphicon
        {
            get
            {
                switch (Status)
                {
                    case -1:
                        return "remove";
                    case 0:
                        return "floppy-disk";
                    case 1:
                        return "send";
                    case 2:
                        return "repeat";
                    case 4:
                        return "education";
                    case 5:
                        return "lock";
                    default:
                        return "ok";
                }
            }
        }

        [IgnoreColumn]
        [DataMember]
        public List<KeyValuePair<int, string>> Speakers
        {
            get
            {
                return Repositories.SessionSpeakerRepository.Instance.GetSessionSpeakersBySession(SessionId).OrderBy(s => s.Sort).Select(s => new KeyValuePair<int, string>(s.SpeakerId, s.DisplayName)).ToList();
            }
        }

        [IgnoreColumn]
        [DataMember]
        public List<KeyValuePair<int, string>> Tags
        {
            get
            {
                return Repositories.SessionTagRepository.Instance.GetSessionTagsBySession(SessionId).OrderBy(t => t.TagName).Select(t => new KeyValuePair<int, string>(t.TagId, t.TagName)).ToList();
            }
        }

        [IgnoreColumn]
        [DataMember]
        public List<KeyValuePair<int, string>> Tracks
        {
            get
            {
                return Repositories.SessionTrackRepository.Instance.GetSessionTracksBySession(SessionId).OrderBy(t => t.Sort).Select(t => new KeyValuePair<int, string>(t.TrackId, t.TrackTitle)).ToList();
            }
        }

        public bool UserIsAuthor(int userId)
        {
            if (CreatedByUserID == userId) { return true; }
            foreach (var ss in Repositories.SessionSpeakerRepository.Instance.GetSessionSpeakersBySession(SessionId))
            {
                if (ss.SpeakerId == userId)
                {
                    return true;
                }
            }
            return false;
        }

    }
}
