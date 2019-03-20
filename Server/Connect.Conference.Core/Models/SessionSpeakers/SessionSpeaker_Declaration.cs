
using System;
using System.Runtime.Serialization;
using Connect.Conference.Core.Common;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.SessionSpeakers
{

    [TableName("vw_Connect_Conference_SessionSpeakers")]
    [DataContract]
    public partial class SessionSpeaker  : SessionSpeakerBase 
    {

        #region .ctor
        public SessionSpeaker()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string Company { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public string Description { get; set; }
        [DataMember]
        public string DescriptionShort { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public string Url { get; set; }
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public string Email { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public string Username { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string CreatedByUser { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public SessionSpeakerBase GetSessionSpeakerBase()
        {
            SessionSpeakerBase res = new SessionSpeakerBase();
             res.SpeakerId = SpeakerId;
             res.SessionId = SessionId;
             res.Sort = Sort;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public SessionSpeaker Clone()
        {
            SessionSpeaker res = new SessionSpeaker();
            res.SpeakerId = SpeakerId;
            res.SessionId = SessionId;
            res.Sort = Sort;
            res.Company = Company;
            res.Description = Description;
            res.DescriptionShort = DescriptionShort;
            res.Url = Url;
            res.DisplayName = DisplayName;
            res.FirstName = FirstName;
            res.LastName = LastName;
            res.Email = Email;
            res.Username = Username;
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
