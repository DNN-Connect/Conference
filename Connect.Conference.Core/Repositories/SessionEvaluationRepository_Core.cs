using System;
using System.Collections.Generic;
using System.Linq;
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
        public IEnumerable<SessionEvaluation> GetSessionEvaluations()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionEvaluation>();
                return rep.Get();
            }
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
        public SessionEvaluation GetSessionEvaluation(int sessionEvaluationId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionEvaluation>();
                return rep.GetById(sessionEvaluationId);
            }
        }
        public int AddSessionEvaluation(ref SessionEvaluationBase sessionEvaluation, int userId)
        {
            Requires.NotNull(sessionEvaluation);
            sessionEvaluation.CreatedByUserID = userId;
            sessionEvaluation.CreatedOnDate = DateTime.Now;
            sessionEvaluation.LastModifiedByUserID = userId;
            sessionEvaluation.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionEvaluationBase>();
                rep.Insert(sessionEvaluation);
            }
            return sessionEvaluation.SessionEvaluationId;
        }
        public void DeleteSessionEvaluation(SessionEvaluationBase sessionEvaluation)
        {
            Requires.NotNull(sessionEvaluation);
            Requires.PropertyNotNegative(sessionEvaluation, "SessionEvaluationId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionEvaluationBase>();
                rep.Delete(sessionEvaluation);
            }
        }
        public void DeleteSessionEvaluation(int sessionEvaluationId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionEvaluationBase>();
                rep.Delete("WHERE SessionEvaluationId = @0", sessionEvaluationId);
            }
        }
        public void UpdateSessionEvaluation(SessionEvaluationBase sessionEvaluation, int userId)
        {
            Requires.NotNull(sessionEvaluation);
            Requires.PropertyNotNegative(sessionEvaluation, "SessionEvaluationId");
            sessionEvaluation.LastModifiedByUserID = userId;
            sessionEvaluation.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionEvaluationBase>();
                rep.Update(sessionEvaluation);
            }
        } 
    }
    public partial interface ISessionEvaluationRepository
    {
        IEnumerable<SessionEvaluation> GetSessionEvaluations();
        IEnumerable<SessionEvaluation> GetSessionEvaluationsBySession(int sessionId);
        SessionEvaluation GetSessionEvaluation(int sessionEvaluationId);
        int AddSessionEvaluation(ref SessionEvaluationBase sessionEvaluation, int userId);
        void DeleteSessionEvaluation(SessionEvaluationBase sessionEvaluation);
        void DeleteSessionEvaluation(int sessionEvaluationId);
        void UpdateSessionEvaluation(SessionEvaluationBase sessionEvaluation, int userId);
    }
}

