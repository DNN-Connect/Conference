using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.SessionTracks;

namespace Connect.Conference.Core.Repositories
{

	public class SessionTrackRepository : ServiceLocator<ISessionTrackRepository, SessionTrackRepository>, ISessionTrackRepository
 {
        protected override Func<ISessionTrackRepository> GetFactory()
        {
            return () => new SessionTrackRepository();
        }
        public IEnumerable<SessionTrack> GetSessionTracksBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionTrack>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionTracks WHERE SessionId=@0",
                    sessionId);
            }
        }
        public IEnumerable<SessionTrack> GetSessionTracksByTrack(int trackId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionTrack>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionTracks WHERE TrackId=@0",
                    trackId);
            }
        }
        public void SetSessionTrack(int trackId, int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionTracks " +
                    "WHERE TrackId=@0 AND SessionId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionTracks (TrackId, SessionId) " +
                    "SELECT @0, @1", trackId, sessionId);
            }
        }
        public void SetSessionTracks(int trackId, List<int> sessionTracks)
        {

            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionTracks WHERE TrackId=@0", trackId);
                context.Execute(System.Data.CommandType.Text,
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionTracks (TrackId, SessionId) " +
                    "SELECT @0, s.RecordID " +
                    "FROM {databaseOwner}{objectQualifier}SplitDelimitedIDs(@1, ',') s", trackId, string.Join(",", sessionTracks));
            }
        }
        public void DeleteSessionTrack(SessionTrackBase sessionTrack)
        {
            Requires.NotNull(sessionTrack);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionTrackBase>();
                rep.Delete(sessionTrack);
            }
        }
        public void DeleteSessionTracksBySession(int sessionId)
        {
            Requires.NotNull(sessionId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionTrackBase>();
                rep.Delete("WHERE SessionId=@0", sessionId);
            }
        }
        public void DeleteSessionTracksByTrack(int trackId)
        {
            Requires.NotNull(trackId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionTrackBase>();
                rep.Delete("WHERE TrackId=@0", trackId);
            }
        }
 }

    public interface ISessionTrackRepository
    {
        IEnumerable<SessionTrack> GetSessionTracksBySession(int sessionId);
        IEnumerable<SessionTrack> GetSessionTracksByTrack(int trackId);
        void SetSessionTrack(int trackId, int sessionId);
        void SetSessionTracks(int trackId, List<int> sessionTracks);
        void DeleteSessionTrack(SessionTrackBase sessionTrack);
        void DeleteSessionTracksBySession(int sessionId);
        void DeleteSessionTracksByTrack(int trackId);
    }
}

