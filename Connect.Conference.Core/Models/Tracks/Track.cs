
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Tracks
{

    [TableName("vw_Connect_Conference_Tracks")]
    [PrimaryKey("TrackId", AutoIncrement = true)]
    [DataContract]
    public partial class Track  : TrackBase 
    {

        #region " Private Members "
        #endregion

        #region " Constructors "
        public Track()  : base() 
        {
        }
        #endregion

        #region " Public Properties "
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region " Public Methods "
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
            return res;
        }
        #endregion

    }
}
