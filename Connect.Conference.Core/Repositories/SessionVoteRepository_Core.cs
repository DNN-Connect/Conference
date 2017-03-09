using System;
using System.Collections.Generic;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.SessionVotes;

namespace Connect.Conference.Core.Repositories
{

    public partial class SessionVoteRepository : ServiceLocator<ISessionVoteRepository, SessionVoteRepository>, ISessionVoteRepository
    {
        protected override Func<ISessionVoteRepository> GetFactory()
        {
            return () => new SessionVoteRepository();
        }
        public IEnumerable<SessionVote> GetSessionVotesBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionVote>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionVotes WHERE SessionId=@0",
                    sessionId);
            }
        }
        public IEnumerable<SessionVote> GetSessionVotesByUser(int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionVote>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionVotes WHERE UserId=@0",
                    userId);
            }
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
            Requires.NotNull(sessionId);
            Requires.NotNull(userId);
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionVotes WHERE SessionId=@0 AND UserId=@1",
                    sessionId, userId);
            }
        }
        public void DeleteSessionVotesBySession(int sessionId)
        {
            Requires.NotNull(sessionId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionVote>();
                rep.Delete("WHERE SessionId=@0", sessionId);
            }
        }
        public void DeleteSessionVotesByUser(int userId)
        {
            Requires.NotNull(userId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionVote>();
                rep.Delete("WHERE UserId=@0", userId);
            }
        }
    }

    public partial interface ISessionVoteRepository
    {
        IEnumerable<SessionVote> GetSessionVotesBySession(int sessionId);
        IEnumerable<SessionVote> GetSessionVotesByUser(int userId);
        void SetSessionVote(int sessionId, int userId);
        void SetSessionVotes(int sessionId, List<int> sessionVotes);
        void DeleteSessionVote(int sessionId, int userId);
        void DeleteSessionVotesBySession(int sessionId);
        void DeleteSessionVotesByUser(int userId);
    }
}

