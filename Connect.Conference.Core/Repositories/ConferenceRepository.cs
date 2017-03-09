using DotNetNuke.Framework;

namespace Connect.Conference.Core.Repositories
{

    public partial class ConferenceRepository : ServiceLocator<IConferenceRepository, ConferenceRepository>, IConferenceRepository
    {
    }

    public partial interface IConferenceRepository
    {
    }

}

