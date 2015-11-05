
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.SessionSpeakers
{

    [TableName("vw_Connect_Conference_SessionSpeakers")]
    [DataContract]
    public partial class SessionSpeaker  : SessionSpeakerBase 
    {

        #region " Private Members "
        #endregion

        #region " Constructors "
        public SessionSpeaker()  : base() 
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
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region " Public Methods "
        public SessionSpeakerBase GetSessionSpeakerBase()
        {
            SessionSpeakerBase res = new SessionSpeakerBase();
             res.SpeakerId = SpeakerId;
             res.SessionId = SessionId;
             res.Sort = Sort;
            return res;
        }
        #endregion

    }
}
