using DotNetNuke.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Attendees
{
    public partial class Attendee  : AttendeeBase 
    {
        [IgnoreColumn]
        [DataMember]
        public bool HasNotificationToken
        {
            get
            {
                return !string.IsNullOrEmpty(NotificationToken);
            }
        }
    }
}
