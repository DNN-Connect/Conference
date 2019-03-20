using DotNetNuke.Framework;

namespace Connect.Conference.Core.Repositories
{

    public partial class SessionTagRepository : ServiceLocator<ISessionTagRepository, SessionTagRepository>, ISessionTagRepository
    {
    }

    public partial interface ISessionTagRepository
    {
    }
}

