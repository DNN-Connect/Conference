
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Tags
{

    public partial class TagWithVote : Tag
    {
        public int Voted { get; set; }
    }
}
