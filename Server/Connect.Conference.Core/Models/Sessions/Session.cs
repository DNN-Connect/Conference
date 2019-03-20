using DotNetNuke.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Sessions
{

    public partial class Session : SessionBase
    {
        [IgnoreColumn]
        [DataMember]
        public bool IsScheduled
        {
            get
            {
                return (Status > 2 | SlotId > 0);
            }
        }
    }
}
