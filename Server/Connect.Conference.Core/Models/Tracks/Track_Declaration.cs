using Connect.Conference.Core.Common;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Tracks
{

    [TableName("vw_Connect_Conference_Tracks")]
    [PrimaryKey("TrackId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]
    public partial class Track : TrackBase
    {

        #region .ctor
        public Track() : base()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string CreatedByUser { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string LastModifiedByUser { get; set; }
        [DataMember]
        public int? NrSessions { get; set; }
        #endregion

        #region Methods
        public TrackBase GetTrackBase()
        {
            TrackBase res = new TrackBase();
            res.TrackId = TrackId;
            res.ConferenceId = ConferenceId;
            res.SessionVoting = SessionVoting;
            res.BackgroundColor = BackgroundColor;
            res.Sort = Sort;
            res.Title = Title;
            res.Description = Description;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.LastModifiedByUserID = LastModifiedByUserID;
            res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public Track Clone()
        {
            Track res = new Track();
            res.TrackId = TrackId;
            res.ConferenceId = ConferenceId;
            res.SessionVoting = SessionVoting;
            res.BackgroundColor = BackgroundColor;
            res.Sort = Sort;
            res.Title = Title;
            res.Description = Description;
            res.CreatedByUser = CreatedByUser;
            res.LastModifiedByUser = LastModifiedByUser;
            res.NrSessions = NrSessions;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.LastModifiedByUserID = LastModifiedByUserID;
            res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}
