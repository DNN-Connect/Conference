using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.SessionAttendees
{
    public partial class SessionAttendee  : SessionAttendeeBase 
    {
        [DataMember]
        public bool HasEvaluated
        {
            get
            {
                return ReviewStars != -1;
            }
        }
    }
}
