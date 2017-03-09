using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Tracks
{

    [TableName("vw_Connect_Conference_Tracks")]
    [PrimaryKey("TrackId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]
    public partial class Track  : TrackBase 
    {

        #region .ctor
        public Track()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
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
        #endregion

    }
}
