using DotNetNuke.Framework;

namespace Connect.Conference.Core.Repositories
{

    public partial class TagVoteRepository : ServiceLocator<ITagVoteRepository, TagVoteRepository>, ITagVoteRepository
    {
    }

    public partial interface ITagVoteRepository
    {
    }
}

