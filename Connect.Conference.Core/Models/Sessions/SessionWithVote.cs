using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Sessions
{
    public class SessionWithVote : Session
    {
        [DataMember]
        public int Voted { get; set; }
    }
}
