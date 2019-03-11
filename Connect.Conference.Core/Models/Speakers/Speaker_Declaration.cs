
using System;
using System.Runtime.Serialization;
using Connect.Conference.Core.Common;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Speakers
{

    [TableName("vw_Connect_Conference_Speakers")]
    [DataContract]
    public partial class Speaker  : SpeakerBase 
    {

        #region .ctor
        public Speaker()  : base() 
        {
        }
        #endregion

        #region Properties
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
        public int? PhotoVisibility { get; set; }
        [DataMember]
        public string PhotoFilename { get; set; }
        [DataMember]
        public string PhotoFolder { get; set; }
        [DataMember]
        public int? PhotoWidth { get; set; }
        [DataMember]
        public int? PhotoHeight { get; set; }
        [DataMember]
        public string PhotoContentType { get; set; }
        [DataMember]
        public string Biography { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string CreatedByUser { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public SpeakerBase GetSpeakerBase()
        {
            SpeakerBase res = new SpeakerBase();
             res.ConferenceId = ConferenceId;
             res.UserId = UserId;
             res.Company = Company;
             res.Sort = Sort;
             res.Url = Url;
             res.Description = Description;
             res.DescriptionShort = DescriptionShort;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.LastModifiedByUserID = LastModifiedByUserID;
            res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public Speaker Clone()
        {
            Speaker res = new Speaker();
            res.ConferenceId = ConferenceId;
            res.UserId = UserId;
            res.Company = Company;
            res.Sort = Sort;
            res.Url = Url;
            res.Description = Description;
            res.DescriptionShort = DescriptionShort;
            res.DisplayName = DisplayName;
            res.FirstName = FirstName;
            res.LastName = LastName;
            res.Email = Email;
            res.Username = Username;
            res.PhotoVisibility = PhotoVisibility;
            res.PhotoFilename = PhotoFilename;
            res.PhotoFolder = PhotoFolder;
            res.PhotoWidth = PhotoWidth;
            res.PhotoHeight = PhotoHeight;
            res.PhotoContentType = PhotoContentType;
            res.Biography = Biography;
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
