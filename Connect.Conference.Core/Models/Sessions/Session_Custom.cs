using DotNetNuke.ComponentModel.DataAnnotations;

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
