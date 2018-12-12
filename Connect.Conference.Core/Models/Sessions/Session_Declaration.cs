
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Sessions
{

    [TableName("vw_Connect_Conference_Sessions")]
    [PrimaryKey("SessionId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]
    public partial class Session  : SessionBase 
    {

        #region .ctor
        public Session()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string TimeZoneId { get; set; }
        [DataMember]
        public DateTime? SessionDateAndTime { get; set; }
        [DataMember]
        public DateTime? SessionEnd { get; set; }
        [DataMember]
        public string LocationName { get; set; }
        [DataMember]
        public string SlotTitle { get; set; }
        [DataMember]
        public string TrackTitle { get; set; }
        [DataMember]
        public string BackgroundColor { get; set; }
        [DataMember]
        public int? NrAttendees { get; set; }
        [DataMember]
        public int? NrSpeakers { get; set; }
        [DataMember]
        public int? NrVotes { get; set; }
        [DataMember]
        public int? NrResources { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public SessionBase GetSessionBase()
        {
            SessionBase res = new SessionBase();
             res.SessionId = SessionId;
             res.ConferenceId = ConferenceId;
             res.LocationId = LocationId;
             res.Level = Level;
             res.Sort = Sort;
             res.Capacity = Capacity;
             res.SlotId = SlotId;
             res.Title = Title;
             res.SubTitle = SubTitle;
             res.Description = Description;
             res.Status = Status;
             res.IsPlenary = IsPlenary;
             res.DayNr = DayNr;
             res.Notes = Notes;
             res.TrackId = TrackId;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public Session Clone()
        {
            Session res = new Session();
            res.SessionId = SessionId;
            res.ConferenceId = ConferenceId;
            res.LocationId = LocationId;
            res.Level = Level;
            res.Sort = Sort;
            res.Capacity = Capacity;
            res.SlotId = SlotId;
            res.Title = Title;
            res.SubTitle = SubTitle;
            res.Description = Description;
            res.Status = Status;
            res.IsPlenary = IsPlenary;
            res.DayNr = DayNr;
            res.Notes = Notes;
            res.TrackId = TrackId;
            res.TimeZoneId = TimeZoneId;
            res.SessionDateAndTime = SessionDateAndTime;
            res.SessionEnd = SessionEnd;
            res.LocationName = LocationName;
            res.SlotTitle = SlotTitle;
            res.TrackTitle = TrackTitle;
            res.BackgroundColor = BackgroundColor;
            res.NrAttendees = NrAttendees;
            res.NrSpeakers = NrSpeakers;
            res.NrVotes = NrVotes;
            res.NrResources = NrResources;
            res.CreatedByUser = CreatedByUser;
            res.LastModifiedByUser = LastModifiedByUser;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.LastModifiedByUserID = LastModifiedByUserID;
            res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}
