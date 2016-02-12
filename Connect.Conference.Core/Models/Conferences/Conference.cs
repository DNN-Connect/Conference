
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Conferences
{

    [TableName("vw_Connect_Conference_Conferences")]
    [PrimaryKey("ConferenceId", AutoIncrement = true)]
    [DataContract]
    [Scope("PortalId")]                
    public partial class Conference  : ConferenceBase 
    {

        #region .ctor
        public Conference()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int? NrAttendees { get; set; }
        [DataMember]
        public int? NrSpeakers { get; set; }
        [DataMember]
        public int? NrLocations { get; set; }
        [DataMember]
        public int? NrTracks { get; set; }
        [DataMember]
        public int? NrSessions { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public ConferenceBase GetConferenceBase()
        {
            ConferenceBase res = new ConferenceBase();
             res.ConferenceId = ConferenceId;
             res.PortalId = PortalId;
             res.Name = Name;
             res.Description = Description;
             res.StartDate = StartDate;
             res.EndDate = EndDate;
             res.MaxCapacity = MaxCapacity;
             res.SessionVoting = SessionVoting;
             res.AttendeeRole = AttendeeRole;
             res.SpeakerRole = SpeakerRole;
             res.Location = Location;
             res.Url = Url;
             res.SubmittedSessionsPublic = SubmittedSessionsPublic;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}
