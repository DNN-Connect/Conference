
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Attendees
{

    [TableName("vw_Connect_Conference_Attendees")]
    [DataContract]
    public partial class Attendee  : AttendeeBase 
    {

        #region " Private Members "
        #endregion

        #region " Constructors "
        public Attendee()  : base() 
        {
        }
        #endregion

        #region " Public Properties "
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string Username { get; set; }
        [DataMember]
        public int? PhotoVisibility { get; set; }
        [DataMember]
        public string PhotoFilename { get; set; }
        [DataMember]
        public string PhotoFolder { get; set; }
        [DataMember]
        public int? PhotoWidth { get; set; }
        [DataMember]
        public int? PhotoHeight { get; set; }
        [DataMember]
        public string PhotoContentType { get; set; }
        [DataMember]
        public string Biography { get; set; }
        [DataMember]
        public string Company { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region " Public Methods "
        public AttendeeBase GetAttendeeBase()
        {
            AttendeeBase res = new AttendeeBase();
             res.ConferenceId = ConferenceId;
             res.UserId = UserId;
             res.Status = Status;
             res.ReceiveNotifications = ReceiveNotifications;
            return res;
        }
        #endregion

    }
}
