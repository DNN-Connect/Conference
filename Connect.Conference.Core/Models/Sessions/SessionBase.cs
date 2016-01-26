
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.Sessions
{
    [TableName("Connect_Conference_Sessions")]
    [PrimaryKey("SessionId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]
    public partial class SessionBase  : AuditableEntity 
    {

        #region .ctor
        public SessionBase()
        {
            SessionId = -1;
            Status = 0;
        }
        #endregion

        #region Properties
        [DataMember]
        public int SessionId { get; set; }
        [DataMember]
        public int ConferenceId { get; set; }
        [DataMember]
        public int? LocationId { get; set; }
        [DataMember]
        public string Level { get; set; }
        [DataMember]
        public int? Sort { get; set; }
        [DataMember]
        public int? Capacity { get; set; }
        [DataMember]
        public int SlotId { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string SubTitle { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public int? Status { get; set; }
        [DataMember]
        public bool IsPlenary { get; set; }
        [DataMember]
        public int DayNr { get; set; }
        [DataMember]
        public string Notes { get; set; }
        [DataMember]
        public int? TrackId { get; set; }
        #endregion

        #region Methods
        public void ReadSessionBase(SessionBase session)
        {
            if (session.SessionId > -1)
                SessionId = session.SessionId;

            if (session.ConferenceId > -1)
                ConferenceId = session.ConferenceId;

            if (session.LocationId > -1)
                LocationId = session.LocationId;

            if (!String.IsNullOrEmpty(session.Level))
                Level = session.Level;

            if (session.Sort > -1)
                Sort = session.Sort;

            if (session.Capacity > -1)
                Capacity = session.Capacity;

            if (session.SlotId > -1)
                SlotId = session.SlotId;

            if (!String.IsNullOrEmpty(session.Title))
                Title = session.Title;

            if (!String.IsNullOrEmpty(session.SubTitle))
                SubTitle = session.SubTitle;

            if (!String.IsNullOrEmpty(session.Description))
                Description = session.Description;

            if (session.Status > -1)
                Status = session.Status;

            IsPlenary = session.IsPlenary;

            if (session.DayNr > -1)
                DayNr = session.DayNr;

            if (!String.IsNullOrEmpty(session.Notes))
                Notes = session.Notes;

            if (session.TrackId > -1)
                TrackId = session.TrackId;

        }
        #endregion

    }
}



