using Connect.Conference.Core.Models.Conferences;
using Connect.Conference.Core.Repositories;
using System.Collections.Generic;

namespace Connect.Conference.Core.Controllers
{

    public partial class ConferencesController
    {

        public static IEnumerable<Connect.Conference.Core.Models.Conferences.Conference> GetConferences(int portalId)
        {

            ConferenceRepository repo = new ConferenceRepository();
            return repo.Get(portalId);

        }

        public static Connect.Conference.Core.Models.Conferences.Conference GetConference(int portalId, int conferenceId)
        {

            ConferenceRepository repo = new ConferenceRepository();
            return repo.GetById(conferenceId, portalId);

        }

        public static int AddConference(ref ConferenceBase conference, int userId)
        {

            conference.SetAddingUser(userId);
            ConferenceBaseRepository repo = new ConferenceBaseRepository();
            repo.Insert(conference);
            return conference.ConferenceId;

        }

        public static void UpdateConference(ConferenceBase conference, int userId)
        {

            conference.SetModifyingUser(userId);
            ConferenceBaseRepository repo = new ConferenceBaseRepository();
            repo.Update(conference);

        }

        public static void DeleteConference(ConferenceBase conference)
        {

            ConferenceBaseRepository repo = new ConferenceBaseRepository();
            repo.Delete(conference);

        }

    }
}
