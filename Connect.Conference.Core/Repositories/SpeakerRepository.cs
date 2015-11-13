using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.Speakers;

namespace Connect.Conference.Core.Repositories
{

	public class SpeakerRepository : ServiceLocator<ISpeakerRepository, SpeakerRepository>, ISpeakerRepository
 {
        protected override Func<ISpeakerRepository> GetFactory()
        {
            return () => new SpeakerRepository();
        }
        public IEnumerable<Speaker> GetSpeakers(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Speaker>();
                return rep.Get(conferenceId);
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
                    conferenceId,userId);
            }
        }
        public void AddSpeaker(SpeakerBase speaker, int userId)
        {
            Requires.NotNull(speaker);
            Requires.PropertyNotNegative(speaker, "PortalId");
            speaker.CreatedByUserID = userId;
            speaker.CreatedOnDate = DateTime.Now;
            speaker.LastModifiedByUserID = userId;
            speaker.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SpeakerBase>();
                rep.Insert(speaker);
            }
        }
        public void DeleteSpeaker(SpeakerBase speaker)
        {
            Requires.NotNull(speaker);
            Requires.PropertyNotNegative(speaker, "SpeakerId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SpeakerBase>();
                rep.Delete(speaker);
            }
        }
        public void UpdateSpeaker(SpeakerBase speaker, int userId)
        {
            Requires.NotNull(speaker);
            Requires.PropertyNotNegative(speaker, "SpeakerId");
            speaker.LastModifiedByUserID = userId;
            speaker.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SpeakerBase>();
                rep.Update(speaker);
            }
        } 
 }

    public interface ISpeakerRepository
    {
        IEnumerable<Speaker> GetSpeakers(int conferenceId);
        IEnumerable<Speaker> GetSpeakersByUser(int userId);
        Speaker GetSpeaker(int conferenceId, int userId);
        void AddSpeaker(SpeakerBase speaker, int userId);
        void DeleteSpeaker(SpeakerBase speaker);
        void UpdateSpeaker(SpeakerBase speaker, int userId);
    }
}

