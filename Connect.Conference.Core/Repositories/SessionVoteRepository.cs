using DotNetNuke.Framework;

namespace Connect.Conference.Core.Repositories
{

    public partial class SessionVoteRepository : ServiceLocator<ISessionVoteRepository, SessionVoteRepository>, ISessionVoteRepository
    {
    }

    public partial interface ISessionVoteRepository
    {
    }
}

