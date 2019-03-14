using Connect.Conference.Core.Common;
using DotNetNuke.ComponentModel.DataAnnotations;
using System;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.SessionAttendees
{

    [TableName("vw_Connect_Conference_SessionAttendees")]
    [DataContract]
    public partial class SessionAttendee : SessionAttendeeBase
    {

        #region .ctor
        public SessionAttendee() : base()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public string Title { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public int ConferenceId { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public DateTime? SessionDateAndTime { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public DateTime? SessionEnd { get; set; }
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public string Email { get; set; }
        [DataMember]
        public string Company { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public string AttCode { get; set; }
        [DataMember]
        public string SessionAttendeeName { get; set; }
        [DataMember]
        public int ReviewStars { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string CreatedByUser { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public SessionAttendeeBase GetSessionAttendeeBase()
        {
            SessionAttendeeBase res = new SessionAttendeeBase();
            res.SessionId = SessionId;
            res.UserId = UserId;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.LastModifiedByUserID = LastModifiedByUserID;
            res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public SessionAttendee Clone()
        {
            SessionAttendee res = new SessionAttendee();
            res.SessionId = SessionId;
            res.UserId = UserId;
            res.Title = Title;
            res.ConferenceId = ConferenceId;
            res.SessionDateAndTime = SessionDateAndTime;
            res.SessionEnd = SessionEnd;
            res.DisplayName = DisplayName;
            res.Email = Email;
            res.Company = Company;
            res.AttCode = AttCode;
            res.SessionAttendeeName = SessionAttendeeName;
            res.ReviewStars = ReviewStars;
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
