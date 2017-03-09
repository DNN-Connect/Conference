using System;
using System.Collections.Generic;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Sessions;

namespace Connect.Conference.Core.Repositories
{

    public partial class SessionRepository : ServiceLocator<ISessionRepository, SessionRepository>, ISessionRepository
    {
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
        public Session GetSession(int conferenceId, int locationId, DateTime datime)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteSingleOrDefault<Session>(System.Data.CommandType.Text,
                    "SELECT s.* FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Sessions s WHERE s.ConferenceId=@0 AND s.LocationId=@1 AND s.SessionDateAndTime<=@2 AND s.SessionEnd>=@2",
                    conferenceId, locationId, datime);
            }
        }
        public IEnumerable<Session> GetSessionsBySlot(int conferenceId, int dayNr, int slotId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Session>(System.Data.CommandType.Text,
                    "SELECT s.* FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Sessions s WHERE s.ConferenceId=@0 AND s.DayNr=@1 AND s.SlotId=@2",
                    conferenceId, dayNr, slotId);
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
    }

    public partial interface ISessionRepository
    {
        IEnumerable<SessionWithVote> GetSessionsWithVote(int conferenceId, int userId, int statusThreshold);
        IEnumerable<Session> GetSessionsBySpeaker(int conferenceId, int userId);
        Session GetSession(int conferenceId, int sessionId);
        Session GetSession(int conferenceId, int locationId, DateTime datime);
        IEnumerable<Session> GetSessionsBySlot(int conferenceId, int dayNr, int slotId);
        void DeleteSession(int conferenceId, int sessionId);
    }
}

