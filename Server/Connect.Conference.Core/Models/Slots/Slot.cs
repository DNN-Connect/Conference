using DotNetNuke.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Slots
{
    public partial class Slot : SlotBase
    {
        [IgnoreColumn]
        [DataMember]
        public int StartMinutes
        {
            get
            {
                return (int)Start.TotalMinutes;
            }
        }
    }
}
