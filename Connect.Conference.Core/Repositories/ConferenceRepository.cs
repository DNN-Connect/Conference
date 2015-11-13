using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.Conferences;

namespace Connect.Conference.Core.Repositories
{

    public class ConferenceRepository : ServiceLocator<IConferenceRepository, ConferenceRepository>, IConferenceRepository
    {
        protected override Func<IConferenceRepository> GetFactory()
        {
            return () => new ConferenceRepository();
        }
        public IEnumerable<Connect.Conference.Core.Models.Conferences.Conference> GetConferences(int portalId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Connect.Conference.Core.Models.Conferences.Conference>();
                return rep.Get(portalId);
            }
        }
        public Connect.Conference.Core.Models.Conferences.Conference GetConference(int portalId, int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Connect.Conference.Core.Models.Conferences.Conference>();
                return rep.GetById(conferenceId, portalId);
            }
        }
        public int AddConference(ConferenceBase conference, int userId)
        {
            Requires.NotNull(conference);
            Requires.PropertyNotNegative(conference, "PortalId");
            conference.CreatedByUserID = userId;
            conference.CreatedOnDate = DateTime.Now;
            conference.LastModifiedByUserID = userId;
            conference.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<ConferenceBase>();
                rep.Insert(conference);
            }
            return conference.ConferenceId;
        }
        public void DeleteConference(ConferenceBase conference)
        {
            Requires.NotNull(conference);
            Requires.PropertyNotNegative(conference, "ConferenceId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<ConferenceBase>();
                rep.Delete(conference);
            }
        }
        public void UpdateConference(ConferenceBase conference, int userId)
        {
            Requires.NotNull(conference);
            Requires.PropertyNotNegative(conference, "ConferenceId");
            conference.LastModifiedByUserID = userId;
            conference.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<ConferenceBase>();
                rep.Update(conference);
            }
        }
    }

    public interface IConferenceRepository
    {
        IEnumerable<Connect.Conference.Core.Models.Conferences.Conference> GetConferences(int portalId);
        Connect.Conference.Core.Models.Conferences.Conference GetConference(int portalId, int conferenceId);
        int AddConference(ConferenceBase conference, int userId);
        void DeleteConference(ConferenceBase conference);
        void UpdateConference(ConferenceBase conference, int userId);
    }

}

