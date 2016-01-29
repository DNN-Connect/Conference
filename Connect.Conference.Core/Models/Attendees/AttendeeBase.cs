
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.Attendees
{
    [TableName("Connect_Conference_Attendees")]
    [DataContract]
    public partial class AttendeeBase  : AuditableEntity 
    {

        #region .ctor
        public AttendeeBase()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int ConferenceId { get; set; }
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public int Status { get; set; }
        [DataMember]
        public bool ReceiveNotifications { get; set; }
        [DataMember]
        public string Company { get; set; }
        #endregion

        #region Methods
        public void ReadAttendeeBase(AttendeeBase attendee)
        {
            if (attendee.ConferenceId > -1)
                ConferenceId = attendee.ConferenceId;

            if (attendee.UserId > -1)
                UserId = attendee.UserId;

            if (attendee.Status > -1)
                Status = attendee.Status;

            ReceiveNotifications = attendee.ReceiveNotifications;

            if (!String.IsNullOrEmpty(attendee.Company))
                Company = attendee.Company;

        }
        #endregion

    }
}



