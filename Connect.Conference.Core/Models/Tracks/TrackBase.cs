
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.Tracks
{
    [TableName("Connect_Conference_Tracks")]
    [PrimaryKey("TrackId", AutoIncrement = true)]
    [DataContract]
    public partial class TrackBase  : AuditableEntity 
    {

        #region .ctor
        public TrackBase()
        {
            TrackId = -1;
        }
        #endregion

        #region Properties
        [DataMember]
        public int TrackId { get; set; }
        [DataMember]
        public int ConferenceId { get; set; }
        [DataMember]
        public bool SessionVoting { get; set; }
        [DataMember]
        public string BackgroundColor { get; set; }
        [DataMember]
        public int? Sort { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string Description { get; set; }
        #endregion

        #region Methods
        public void ReadTrackBase(TrackBase track)
        {
            if (track.TrackId > -1)
                TrackId = track.TrackId;

            if (track.ConferenceId > -1)
                ConferenceId = track.ConferenceId;

            SessionVoting = track.SessionVoting;

            if (!String.IsNullOrEmpty(track.BackgroundColor))
                BackgroundColor = track.BackgroundColor;

            if (track.Sort > -1)
                Sort = track.Sort;

            if (!String.IsNullOrEmpty(track.Title))
                Title = track.Title;

            if (!String.IsNullOrEmpty(track.Description))
                Description = track.Description;

        }
        #endregion

    }
}



