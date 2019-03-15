using Connect.Conference.Core.Common;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Conferences
{
    public partial class Conference : ConferenceBase
    {
        [IgnoreColumn]
        [DataMember]
        public bool OnGoing
        {
            get
            {
                return System.DateTime.Now.IsBetween(StartDate, EndDate);
            }
        }
    }
}
