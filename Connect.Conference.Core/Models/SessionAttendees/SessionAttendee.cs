
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.SessionAttendees
{

    [TableName("vw_Connect_Conference_SessionAttendees")]
    [DataContract]
    public partial class SessionAttendee  : SessionAttendeeBase 
    {

        #region " Private Members "
        #endregion

        #region " Constructors "
        public SessionAttendee()  : base() 
        {
        }
        #endregion

        #region " Public Properties "
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string SessionAttendeeName { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region " Public Methods "
        public SessionAttendeeBase GetSessionAttendeeBase()
        {
            SessionAttendeeBase res = new SessionAttendeeBase();
             res.SessionId = SessionId;
             res.UserId = UserId;
            return res;
        }
        #endregion

    }
}
