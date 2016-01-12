using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Speakers
{
    public class DnnUser
    {
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string Email { get; set; }
    }
}
