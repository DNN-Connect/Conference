using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.Sessions;

namespace Connect.Conference.Core.Repositories
{

    public class SessionRepository : ServiceLocator<ISessionRepository, SessionRepository>, ISessionRepository
    {
        protected override Func<ISessionRepository> GetFactory()
        {
            return () => new SessionRepository();
        }
        public IEnumerable<Session> GetSessions(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Session>();
                return rep.Get(conferenceId);
            }
        }
        public IEnumerable<SessionWithVote> GetSessionsWithVote(int conferenceId, int userId, int statusThreshold)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionWithVote>(System.Data.CommandType.Text,
                    "SELECT s.*, ISNULL(sv.UserId, 0) Voted FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Sessions s LEFT JOIN {databaseOwner}{objectQualifier}Connect_Conference_SessionVotes sv ON sv.SessionId = s.SessionId AND sv.UserId=@1 WHERE s.ConferenceId=@0 AND s.Status>=@2",
                    conferenceId, userId, statusThreshold);
            }
        }
        public IEnumerable<Session> GetSessionsBySpeaker(int conferenceId, int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Session>(System.Data.CommandType.Text,
                    "SELECT s.* FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Sessions s INNER JOIN {databaseOwner}{objectQualifier}Connect_Conference_SessionSpeakers ss ON ss.SessionId = s.SessionId WHERE s.ConferenceId=@0 AND ss.SpeakerId=@1",
                    conferenceId, userId);
            }
        }
        public Session GetSession(int conferenceId, int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Session>();
                return rep.GetById(sessionId, conferenceId);
            }
        }
        public IEnumerable<Session> GetSessionsBySlot(int conferenceId, int dayNr, int slotId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Session>(System.Data.CommandType.Text,
                    "SELECT s.* FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Sessions s WHERE s.ConferenceId=@0 AND s.DayNr=@1 AND s.SlotId=@2",
                    conferenceId, dayNr,slotId);
            }
        }
        public int AddSession(ref SessionBase session, int userId)
        {
            Requires.NotNull(session);
            Requires.PropertyNotNegative(session, "ConferenceId");
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
            CommentRepository.Instance.DeleteCommentsBySession(session.SessionId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionBase>();
                rep.Delete(session);
            }
        }
        public void DeleteSession(int conferenceId, int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionBase>();
                rep.Delete("WHERE ConferenceId = @0 AND SessionId = @1", conferenceId, sessionId);
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

    public interface ISessionRepository
    {
        IEnumerable<Session> GetSessions(int conferenceId);
        IEnumerable<SessionWithVote> GetSessionsWithVote(int conferenceId, int userId, int statusThreshold);
        IEnumerable<Session> GetSessionsBySpeaker(int conferenceId, int userId);
        Session GetSession(int conferenceId, int sessionId);
        IEnumerable<Session> GetSessionsBySlot(int conferenceId, int dayNr, int slotId);
        int AddSession(ref SessionBase session, int userId);
        void DeleteSession(SessionBase session);
        void DeleteSession(int conferenceId, int sessionId);
        void UpdateSession(SessionBase session, int userId);
    }
}

