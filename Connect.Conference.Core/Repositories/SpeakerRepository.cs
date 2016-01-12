using System;
using System.Collections.Generic;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Speakers;
using DotNetNuke.Entities.Users;

namespace Connect.Conference.Core.Repositories
{

    public class SpeakerRepository : ServiceLocator<ISpeakerRepository, SpeakerRepository>, ISpeakerRepository
    {
        protected override Func<ISpeakerRepository> GetFactory()
        {
            return () => new SpeakerRepository();
        }
        public IEnumerable<SpeakerWithNrSessions> GetSpeakersByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SpeakerWithNrSessions>(System.Data.CommandType.Text,
                    "SELECT sp.*, (SELECT COUNT(*) FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionSpeakers ss INNER JOIN {databaseOwner}{objectQualifier}Connect_Conference_Sessions s ON s.SessionId=ss.SessionId WHERE ss.SpeakerId=sp.UserId AND s.ConferenceId=@0 AND s.Status>2) NrSessions FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Speakers sp WHERE sp.ConferenceId=@0",
                    conferenceId);
            }
        }
        public IEnumerable<Speaker> GetSpeakersByUser(int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Speaker>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Speakers WHERE UserId=@0",
                    userId);
            }
        }
        public Speaker GetSpeaker(int conferenceId, int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteSingleOrDefault<Speaker>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Speakers WHERE ConferenceId=@0 AND UserId=@1",
                    conferenceId, userId);
            }
        }
        public void AddSpeaker(SpeakerBase speaker, int userId)
        {
            Requires.NotNull(speaker);
            Requires.NotNull(speaker.ConferenceId);
            Requires.NotNull(speaker.UserId);
            speaker.CreatedByUserID = userId;
            speaker.CreatedOnDate = DateTime.Now;
            speaker.LastModifiedByUserID = userId;
            speaker.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_Speakers " +
                    "WHERE ConferenceId=@0 AND UserId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_Speakers (ConferenceId, UserId, Sort, CreatedByUserID, CreatedOnDate, LastModifiedByUserID, LastModifiedOnDate, Url, Description, DescriptionShort, Company) " +
                    "SELECT @0, @1, @2, @3, @4, @5, @6, @7, @8, @9, @10", speaker.ConferenceId, speaker.UserId, speaker.Sort, speaker.CreatedByUserID, speaker.CreatedOnDate, speaker.LastModifiedByUserID, speaker.LastModifiedOnDate, speaker.Url, speaker.Description, speaker.DescriptionShort, speaker.Company);
            }
        }
        public void DeleteSpeaker(SpeakerBase speaker)
        {
            DeleteSpeaker(speaker.ConferenceId, speaker.UserId);
        }
        public void DeleteSpeaker(int conferenceId, int userId)
        {
            Requires.NotNull(conferenceId);
            Requires.NotNull(userId);
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Speakers WHERE ConferenceId=@0 AND UserId=@1",
                    conferenceId, userId);
            }
        }
        public void DeleteSpeakersByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Speakers WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public void DeleteSpeakersByUser(int userId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Speakers WHERE UserId=@0",
                    userId);
            }
        }
        public void UpdateSpeaker(SpeakerBase speaker, int userId)
        {
            Requires.NotNull(speaker);
            Requires.NotNull(speaker.ConferenceId);
            Requires.NotNull(speaker.UserId);
            speaker.LastModifiedByUserID = userId;
            speaker.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SpeakerBase>();
                rep.Update("SET Sort=@0, CreatedByUserID=@1, CreatedOnDate=@2, LastModifiedByUserID=@3, LastModifiedOnDate=@4, Url=@5, Description=@6, DescriptionShort=@7, Company=@8 WHERE ConferenceId=@9 AND UserId=@10",
                          speaker.Sort, speaker.CreatedByUserID, speaker.CreatedOnDate, speaker.LastModifiedByUserID, speaker.LastModifiedOnDate, speaker.Url, speaker.Description, speaker.DescriptionShort, speaker.Company, speaker.ConferenceId, speaker.UserId);
            }
        }
        public IEnumerable<DnnUser> SearchUsers(int portalId, string search)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<DnnUser>(System.Data.CommandType.Text, "SELECT u.* FROM {databaseOwner}{objectQualifier}vw_Users u WHERE u.PortalId=@0 AND (u.FirstName LIKE '%' + @1 + '%' OR u.LastName LIKE '%' + @1 + '%' OR u.DisplayName LIKE '%' + @1 + '%') ORDER BY u.DisplayName", portalId, search);
            }
        }
    }

    public interface ISpeakerRepository
    {
        IEnumerable<SpeakerWithNrSessions> GetSpeakersByConference(int conferenceId);
        IEnumerable<Speaker> GetSpeakersByUser(int userId);
        Speaker GetSpeaker(int conferenceId, int userId);
        void AddSpeaker(SpeakerBase speaker, int userId);
        void DeleteSpeaker(SpeakerBase speaker);
        void DeleteSpeaker(int conferenceId, int userId);
        void DeleteSpeakersByConference(int conferenceId);
        void DeleteSpeakersByUser(int userId);
        void UpdateSpeaker(SpeakerBase speaker, int userId);
        IEnumerable<DnnUser> SearchUsers(int portalId, string search);
    }
}

