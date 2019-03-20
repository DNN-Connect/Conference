using Connect.Conference.Core.Repositories;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Speakers
{
    public partial class Speaker
    {
        [IgnoreColumn]
        [DataMember]
        public IEnumerable<SessionExtract> Sessions { get; private set; }

        public Speaker LoadComplete()
        {
            Sessions = SessionRepository.Instance.GetSessionsBySpeaker(ConferenceId, UserId)
                .Where(s => s.Status > 2)
                .Select(s => new SessionExtract()
                {
                    SessionId = s.SessionId,
                    Title = s.Title,
                    SubTitle = s.SubTitle
                });
            return this;
        }

        public class SessionExtract
        {
            public int SessionId { get; set; }
            public string Title { get; set; }
            public string SubTitle { get; set; }
        }
    }
}
