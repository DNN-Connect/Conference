using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Speakers
{
    public class SpeakerWithNrSessions : Speaker
    {
        [DataMember]
        public int NrSessions { get; set; }
    }
}
