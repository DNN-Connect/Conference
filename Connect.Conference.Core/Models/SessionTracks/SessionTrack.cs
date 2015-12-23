
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.SessionTracks
{

    [TableName("vw_Connect_Conference_SessionTracks")]
    [DataContract]
    [Scope("SessionId")]                
    public partial class SessionTrack  : SessionTrackBase 
    {

        #region .ctor
        public SessionTrack()  : base() 
        {
        }
        #endregion

        #region Properties
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

        #region Methods
        public SessionTrackBase GetSessionTrackBase()
        {
            SessionTrackBase res = new SessionTrackBase();
             res.TrackId = TrackId;
             res.SessionId = SessionId;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}
