using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.SessionSpeakers;

namespace Connect.Conference.Core.Repositories
{

	public class SessionSpeakerRepository : ServiceLocator<ISessionSpeakerRepository, SessionSpeakerRepository>, ISessionSpeakerRepository
 {
        protected override Func<ISessionSpeakerRepository> GetFactory()
        {
            return () => new SessionSpeakerRepository();
        }
        public IEnumerable<SessionSpeaker> GetSessionSpeakers(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionSpeaker>();
                return rep.Get(sessionId);
            }
        }
        public IEnumerable<SessionSpeaker> GetSessionSpeakersByUser(int speakerId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionSpeaker>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionSpeakers WHERE SpeakerId=@0",
                    speakerId);
            }
        }
        public SessionSpeaker GetSessionSpeaker(int speakerId, int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteSingleOrDefault<SessionSpeaker>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionSpeakers WHERE SpeakerId=@0 AND SessionId=@1",
                    speakerId,sessionId);
            }
        }
        public void AddSessionSpeaker(SessionSpeakerBase sessionSpeaker, int userId)
        {
            Requires.NotNull(sessionSpeaker);
            Requires.PropertyNotNegative(sessionSpeaker, "PortalId");
            sessionSpeaker.CreatedByUserID = userId;
            sessionSpeaker.CreatedOnDate = DateTime.Now;
            sessionSpeaker.LastModifiedByUserID = userId;
            sessionSpeaker.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionSpeakerBase>();
                rep.Insert(sessionSpeaker);
            }
        }
        public void DeleteSessionSpeaker(SessionSpeakerBase sessionSpeaker)
        {
            Requires.NotNull(sessionSpeaker);
            Requires.PropertyNotNegative(sessionSpeaker, "SessionSpeakerId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionSpeakerBase>();
                rep.Delete(sessionSpeaker);
            }
        }
        public void UpdateSessionSpeaker(SessionSpeakerBase sessionSpeaker, int userId)
        {
            Requires.NotNull(sessionSpeaker);
            Requires.PropertyNotNegative(sessionSpeaker, "SessionSpeakerId");
            sessionSpeaker.LastModifiedByUserID = userId;
            sessionSpeaker.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionSpeakerBase>();
                rep.Update(sessionSpeaker);
            }
        } 
 }

    public interface ISessionSpeakerRepository
    {
        IEnumerable<SessionSpeaker> GetSessionSpeakers(int sessionId);
        IEnumerable<SessionSpeaker> GetSessionSpeakersByUser(int speakerId);
        SessionSpeaker GetSessionSpeaker(int speakerId, int sessionId);
        void AddSessionSpeaker(SessionSpeakerBase sessionSpeaker, int userId);
        void DeleteSessionSpeaker(SessionSpeakerBase sessionSpeaker);
        void UpdateSessionSpeaker(SessionSpeakerBase sessionSpeaker, int userId);
    }
}

