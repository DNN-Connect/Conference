using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Repositories
{

	public class TagVoteRepository : ServiceLocator<ITagVoteRepository, TagVoteRepository>, ITagVoteRepository
 {
        protected override Func<ITagVoteRepository> GetFactory()
        {
            return () => new TagVoteRepository();
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

            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_TagVotes WHERE TagId=@0 AND UserId=@1", tagId, userId);
            }
        }
    }

    public interface ITagVoteRepository
    {
        void SetTagVote(int tagId, int userId);
        void SetTagVotes(int tagId, List<int> tagVotes);
        void DeleteTagVote(int tagId, int userId);
    }
}

