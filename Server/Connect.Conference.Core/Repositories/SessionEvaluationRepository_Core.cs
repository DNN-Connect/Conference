using System;
using System.Collections.Generic;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.SessionEvaluations;

namespace Connect.Conference.Core.Repositories
{

	public partial class SessionEvaluationRepository : ServiceLocator<ISessionEvaluationRepository, SessionEvaluationRepository>, ISessionEvaluationRepository
 {
        protected override Func<ISessionEvaluationRepository> GetFactory()
        {
            return () => new SessionEvaluationRepository();
        }
        public IEnumerable<SessionEvaluation> GetSessionEvaluationsBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionEvaluation>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionEvaluations WHERE SessionId=@0",
                    sessionId);
            }
        }
        public SessionEvaluation GetSessionEvaluation(int sessionId, int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteSingleOrDefault<SessionEvaluation>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionEvaluations WHERE SessionId=@0 AND UserId=@1",
                    sessionId,userId);
            }
        }
        public void AddSessionEvaluation(SessionEvaluationBase sessionEvaluation, int userId)
        {
            Requires.NotNull(sessionEvaluation);
            Requires.NotNull(sessionEvaluation.SessionId);
            sessionEvaluation.CreatedByUserID = userId;
            sessionEvaluation.CreatedOnDate = DateTime.Now;
            sessionEvaluation.LastModifiedByUserID = userId;
            sessionEvaluation.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionEvaluations " +
                    "WHERE SessionId=@0 AND UserId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionEvaluations (SessionId, UserId, Stars, Review, CreatedByUserID, CreatedOnDate, LastModifiedByUserID, LastModifiedOnDate) " +
                    "SELECT @0, @1, @2, @3, @4, @5, @6, @7", sessionEvaluation.SessionId, sessionEvaluation.UserId, sessionEvaluation.Stars, sessionEvaluation.Review, sessionEvaluation.CreatedByUserID, sessionEvaluation.CreatedOnDate, sessionEvaluation.LastModifiedByUserID, sessionEvaluation.LastModifiedOnDate);
            }
        }
        public void DeleteSessionEvaluation(SessionEvaluationBase sessionEvaluation)
        {
            DeleteSessionEvaluation(sessionEvaluation.SessionId, sessionEvaluation.UserId);
        }
        public void DeleteSessionEvaluation(int sessionId, int userId)
        {
             Requires.NotNull(sessionId);
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionEvaluations WHERE SessionId=@0 AND UserId=@1",
                    sessionId,userId);
            }
        }
        public void DeleteSessionEvaluationsBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionEvaluations WHERE SessionId=@0",
                    sessionId);
            }
        }
        public void UpdateSessionEvaluation(SessionEvaluationBase sessionEvaluation, int userId)
        {
            Requires.NotNull(sessionEvaluation);
            Requires.NotNull(sessionEvaluation.SessionId);
            sessionEvaluation.LastModifiedByUserID = userId;
            sessionEvaluation.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionEvaluationBase>();
                rep.Update("SET Stars=@0, Review=@1, CreatedByUserID=@2, CreatedOnDate=@3, LastModifiedByUserID=@4, LastModifiedOnDate=@5 WHERE SessionId=@6 AND UserId=@7",
                          sessionEvaluation.Stars,sessionEvaluation.Review,sessionEvaluation.CreatedByUserID,sessionEvaluation.CreatedOnDate,sessionEvaluation.LastModifiedByUserID,sessionEvaluation.LastModifiedOnDate, sessionEvaluation.SessionId,sessionEvaluation.UserId);
            }
        } 
 }

    public partial interface ISessionEvaluationRepository
    {
        IEnumerable<SessionEvaluation> GetSessionEvaluationsBySession(int sessionId);
        SessionEvaluation GetSessionEvaluation(int sessionId, int userId);
        void AddSessionEvaluation(SessionEvaluationBase sessionEvaluation, int userId);
        void DeleteSessionEvaluation(SessionEvaluationBase sessionEvaluation);
        void DeleteSessionEvaluation(int sessionId, int userId);
        void DeleteSessionEvaluationsBySession(int sessionId);
        void UpdateSessionEvaluation(SessionEvaluationBase sessionEvaluation, int userId);
    }
}

