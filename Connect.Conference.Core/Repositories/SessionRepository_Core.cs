using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Sessions;

namespace Connect.Conference.Core.Repositories
{

    public partial class SessionRepository : ServiceLocator<ISessionRepository, SessionRepository>, ISessionRepository
    {
        protected override Func<ISessionRepository> GetFactory()
        {
            return () => new SessionRepository();
        }
        public IEnumerable<Session> GetSessions()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Session>();
                return rep.Get();
            }
        }
        public IEnumerable<Session> GetSessionsByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Session>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Sessions WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public Session GetSession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Session>();
                return rep.GetById(sessionId);
            }
        }
        public int AddSession(ref SessionBase session, int userId)
        {
            Requires.NotNull(session);
            session.CreatedByUserID = userId;
            session.CreatedOnDate = DateTime.Now;
            session.LastModifiedByUserID = userId;
            session.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionBase>();
                rep.Insert(session);
            }
            return session.SessionId;
        }
        public void DeleteSession(SessionBase session)
        {
            Requires.NotNull(session);
            Requires.PropertyNotNegative(session, "SessionId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionBase>();
                rep.Delete(session);
            }
        }
        public void DeleteSession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionBase>();
                rep.Delete("WHERE SessionId = @0", sessionId);
            }
        }
        public void UpdateSession(SessionBase session, int userId)
        {
            Requires.NotNull(session);
            Requires.PropertyNotNegative(session, "SessionId");
            session.LastModifiedByUserID = userId;
            session.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionBase>();
                rep.Update(session);
            }
        }
    }
    public partial interface ISessionRepository
    {
        IEnumerable<Session> GetSessions();
        IEnumerable<Session> GetSessionsByConference(int conferenceId);
        Session GetSession(int sessionId);
        int AddSession(ref SessionBase session, int userId);
        void DeleteSession(SessionBase session);
        void DeleteSession(int sessionId);
        void UpdateSession(SessionBase session, int userId);
    }
}

