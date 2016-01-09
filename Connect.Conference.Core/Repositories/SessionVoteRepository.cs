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

	public class SessionVoteRepository : ServiceLocator<ISessionVoteRepository, SessionVoteRepository>, ISessionVoteRepository
 {
        protected override Func<ISessionVoteRepository> GetFactory()
        {
            return () => new SessionVoteRepository();
        }
        public void SetSessionVote(int sessionId, int userId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionVotes " +
                    "WHERE SessionId=@0 AND UserId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionVotes (SessionId, UserId) " +
                    "SELECT @0, @1", sessionId, userId);
            }
        }
        public void SetSessionVotes(int sessionId, List<int> sessionVotes)
        {

            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionVotes WHERE SessionId=@0", sessionId);
                context.Execute(System.Data.CommandType.Text,
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionVotes (SessionId, UserId) " +
                    "SELECT @0, s.RecordID " +
                    "FROM {databaseOwner}{objectQualifier}SplitDelimitedIDs(@1, ',') s", sessionId, string.Join(",", sessionVotes));
            }
        }
        public void DeleteSessionVote(int sessionId, int userId)
        {

            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionVotes WHERE SessionId=@0 AND UserId=@1", sessionId, userId);
            }
        }
    }

    public interface ISessionVoteRepository
    {
        void SetSessionVote(int sessionId, int userId);
        void SetSessionVotes(int sessionId, List<int> sessionVotes);
        void DeleteSessionVote(int sessionId, int userId);
    }
}

