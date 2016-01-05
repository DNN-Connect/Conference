
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Sessions
{

    [TableName("vw_Connect_Conference_Sessions")]
    [PrimaryKey("SessionId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]
    public partial class Session : SessionBase
    {

        #region .ctor
        public Session() : base()
        {
        }
        #endregion

        #region Custom Properties
        [IgnoreColumn]
        public string StatusGlyphicon
        {
            get
            {
                switch (Status)
                {
                    case -1:
                        return "remove";
                    case 0:
                        return "floppy-disk";
                    case 1:
                        return "send";
                    case 2:
                        return "repeat";
                    case 4:
                        return "education";
                    case 5:
                        return "lock";
                    default:
                        return "ok";
                }
            }
        }
        #endregion

        #region Properties
        [DataMember]
        public System.DateTime? SessionDate { get; set; }
        [DataMember]
        public string LocationName { get; set; }
        [DataMember]
        public string SlotTitle { get; set; }
        [DataMember]
        public int? NrAttendees { get; set; }
        [DataMember]
        public int? NrSpeakers { get; set; }
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
            res.Votes = Votes;
            res.Sort = Sort;
            res.Capacity = Capacity;
            res.SlotId = SlotId;
            res.Title = Title;
            res.SubTitle = SubTitle;
            res.Description = Description;
            res.Status = Status;
            res.IsPlenary = IsPlenary;
            res.DayNr = DayNr;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.LastModifiedByUserID = LastModifiedByUserID;
            res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}
