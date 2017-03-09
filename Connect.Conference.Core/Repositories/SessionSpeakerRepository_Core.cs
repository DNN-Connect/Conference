using System;
using System.Collections.Generic;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.SessionSpeakers;

namespace Connect.Conference.Core.Repositories
{

	public partial class SessionSpeakerRepository : ServiceLocator<ISessionSpeakerRepository, SessionSpeakerRepository>, ISessionSpeakerRepository
 {
        protected override Func<ISessionSpeakerRepository> GetFactory()
        {
            return () => new SessionSpeakerRepository();
        }
        public IEnumerable<SessionSpeaker> GetSessionSpeakersBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionSpeaker>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionSpeakers WHERE SessionId=@0",
                    sessionId);
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
            Requires.NotNull(sessionSpeaker.SessionId);
            Requires.NotNull(sessionSpeaker.SpeakerId);
            sessionSpeaker.CreatedByUserID = userId;
            sessionSpeaker.CreatedOnDate = DateTime.Now;
            sessionSpeaker.LastModifiedByUserID = userId;
            sessionSpeaker.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionSpeakers " +
                    "WHERE SpeakerId=@0 AND SessionId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionSpeakers (SpeakerId, SessionId, CreatedByUserID, CreatedOnDate, LastModifiedByUserID, LastModifiedOnDate, Sort) " +
                    "SELECT @0, @1, @2, @3, @4, @5, @6", sessionSpeaker.SpeakerId, sessionSpeaker.SessionId, sessionSpeaker.CreatedByUserID, sessionSpeaker.CreatedOnDate, sessionSpeaker.LastModifiedByUserID, sessionSpeaker.LastModifiedOnDate, sessionSpeaker.Sort);
            }
        }
        public void DeleteSessionSpeaker(SessionSpeakerBase sessionSpeaker)
        {
            DeleteSessionSpeaker(sessionSpeaker.SpeakerId, sessionSpeaker.SessionId);
        }
        public void DeleteSessionSpeaker(int speakerId, int sessionId)
        {
             Requires.NotNull(sessionId);
             Requires.NotNull(speakerId);
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionSpeakers WHERE SpeakerId=@0 AND SessionId=@1",
                    speakerId,sessionId);
            }
        }
        public void DeleteSessionSpeakersBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionSpeakers WHERE SessionId=@0",
                    sessionId);
            }
        }
        public void DeleteSessionSpeakersByUser(int speakerId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionSpeakers WHERE SpeakerId=@0",
                    speakerId);
            }
        }
        public void UpdateSessionSpeaker(SessionSpeakerBase sessionSpeaker, int userId)
        {
            Requires.NotNull(sessionSpeaker);
            Requires.NotNull(sessionSpeaker.SessionId);
            Requires.NotNull(sessionSpeaker.SpeakerId);
            sessionSpeaker.LastModifiedByUserID = userId;
            sessionSpeaker.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionSpeakerBase>();
                rep.Update("SET CreatedByUserID=@0, CreatedOnDate=@1, LastModifiedByUserID=@2, LastModifiedOnDate=@3, Sort=@4 WHERE SpeakerId=@5 AND SessionId=@6",
                          sessionSpeaker.CreatedByUserID,sessionSpeaker.CreatedOnDate,sessionSpeaker.LastModifiedByUserID,sessionSpeaker.LastModifiedOnDate,sessionSpeaker.Sort, sessionSpeaker.SpeakerId,sessionSpeaker.SessionId);
            }
        } 
 }

    public partial interface ISessionSpeakerRepository
    {
        IEnumerable<SessionSpeaker> GetSessionSpeakersBySession(int sessionId);
        IEnumerable<SessionSpeaker> GetSessionSpeakersByUser(int speakerId);
        SessionSpeaker GetSessionSpeaker(int speakerId, int sessionId);
        void AddSessionSpeaker(SessionSpeakerBase sessionSpeaker, int userId);
        void DeleteSessionSpeaker(SessionSpeakerBase sessionSpeaker);
        void DeleteSessionSpeaker(int speakerId, int sessionId);
        void DeleteSessionSpeakersBySession(int sessionId);
        void DeleteSessionSpeakersByUser(int speakerId);
        void UpdateSessionSpeaker(SessionSpeakerBase sessionSpeaker, int userId);
    }
}

