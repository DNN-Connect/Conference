using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Tags
{

    public partial class TagWithVote : Tag
    {
        [DataMember]
        public int Voted { get; set; }
    }
}
