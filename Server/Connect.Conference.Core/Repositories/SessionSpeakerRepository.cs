using DotNetNuke.Framework;

namespace Connect.Conference.Core.Repositories
{

    public partial class SessionSpeakerRepository : ServiceLocator<ISessionSpeakerRepository, SessionSpeakerRepository>, ISessionSpeakerRepository
    {
    }

    public partial interface ISessionSpeakerRepository
    {
    }
}

