
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.SessionTracks
{

    [TableName("vw_Connect_Conference_SessionTracks")]
    [DataContract]
    public partial class SessionTrack  : SessionTrackBase 
    {

        #region " Private Members "
        #endregion

        #region " Constructors "
        public SessionTrack()  : base() 
        {
        }
        #endregion

        #region " Public Properties "
        [DataMember]
        public string SessionTitle { get; set; }
        [DataMember]
        public string TrackTitle { get; set; }
        [DataMember]
        public int? Sort { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region " Public Methods "
        public SessionTrackBase GetSessionTrackBase()
        {
            SessionTrackBase res = new SessionTrackBase();
             res.TrackId = TrackId;
             res.SessionId = SessionId;
            return res;
        }
        #endregion

    }
}
