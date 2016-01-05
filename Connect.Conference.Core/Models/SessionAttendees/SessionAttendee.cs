
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.SessionAttendees
{

    [TableName("vw_Connect_Conference_SessionAttendees")]
    [DataContract]
    public partial class SessionAttendee  : SessionAttendeeBase 
    {

        #region .ctor
        public SessionAttendee()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string SessionAttendeeName { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public SessionAttendeeBase GetSessionAttendeeBase()
        {
            SessionAttendeeBase res = new SessionAttendeeBase();
             res.SessionId = SessionId;
             res.UserId = UserId;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}
