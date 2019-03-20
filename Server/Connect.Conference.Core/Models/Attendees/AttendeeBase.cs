
using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;
using DotNetNuke.ComponentModel.DataAnnotations;
using System;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Attendees
{
    [TableName("Connect_Conference_Attendees")]
    [DataContract]
    public partial class AttendeeBase : AuditableEntity
    {

        #region .ctor
        public AttendeeBase()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public int ConferenceId { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public int UserId { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public int Status { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public bool ReceiveNotifications { get; set; }
        [DataMember]
        public string Company { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public string AttCode { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string NotificationToken { get; set; }
        #endregion

        #region Methods
        public void ReadAttendeeBase(AttendeeBase attendee)
        {
            if (attendee.ConferenceId > -1)
            {
                ConferenceId = attendee.ConferenceId;
            }

            if (attendee.UserId > -1)
            {
                UserId = attendee.UserId;
            }

            if (attendee.Status > -1)
            {
                Status = attendee.Status;
            }

            ReceiveNotifications = attendee.ReceiveNotifications;

            if (!String.IsNullOrEmpty(attendee.Company))
            {
                Company = attendee.Company;
            }

            if (!String.IsNullOrEmpty(attendee.AttCode))
            {
                AttCode = attendee.AttCode;
            }

            if (!String.IsNullOrEmpty(attendee.NotificationToken))
            {
                NotificationToken = attendee.NotificationToken;
            }
        }
        #endregion

    }
}



