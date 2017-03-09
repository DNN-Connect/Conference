using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.TagVotes;

namespace Connect.Conference.Core.Repositories
{

	public partial class TagVoteRepository : ServiceLocator<ITagVoteRepository, TagVoteRepository>, ITagVoteRepository
 {
        protected override Func<ITagVoteRepository> GetFactory()
        {
            return () => new TagVoteRepository();
        }
        public IEnumerable<TagVote> GetTagVotesByTag(int tagId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<TagVote>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_TagVotes WHERE TagId=@0",
                    tagId);
            }
        }
        public IEnumerable<TagVote> GetTagVotesByUser(int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<TagVote>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_TagVotes WHERE UserId=@0",
                    userId);
            }
        }
        public void SetTagVote(int tagId, int userId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_TagVotes " +
                    "WHERE TagId=@0 AND UserId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_TagVotes (TagId, UserId) " +
                    "SELECT @0, @1", tagId, userId);
            }
        }
        public void SetTagVotes(int tagId, List<int> tagVotes)
        {

            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_TagVotes WHERE TagId=@0", tagId);
                context.Execute(System.Data.CommandType.Text,
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_TagVotes (TagId, UserId) " +
                    "SELECT @0, s.RecordID " +
                    "FROM {databaseOwner}{objectQualifier}SplitDelimitedIDs(@1, ',') s", tagId, string.Join(",", tagVotes));
            }
        }
        public void DeleteTagVote(int tagId, int userId)
        {
             Requires.NotNull(tagId);
             Requires.NotNull(userId);
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_TagVotes WHERE TagId=@0 AND UserId=@1",
                    tagId,userId);
            }
        }
        public void DeleteTagVotesByTag(int tagId)
        {
            Requires.NotNull(tagId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TagVote>();
                rep.Delete("WHERE TagId=@0", tagId);
            }
        }
        public void DeleteTagVotesByUser(int userId)
        {
            Requires.NotNull(userId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TagVote>();
                rep.Delete("WHERE UserId=@0", userId);
            }
        }
 }

    public partial interface ITagVoteRepository
    {
        IEnumerable<TagVote> GetTagVotesByTag(int tagId);
        IEnumerable<TagVote> GetTagVotesByUser(int userId);
        void SetTagVote(int tagId, int userId);
        void SetTagVotes(int tagId, List<int> tagVotes);
        void DeleteTagVote(int tagId, int userId);
        void DeleteTagVotesByTag(int tagId);
        void DeleteTagVotesByUser(int userId);
    }
}

