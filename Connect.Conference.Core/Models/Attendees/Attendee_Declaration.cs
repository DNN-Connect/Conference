
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Attendees
{

    [TableName("vw_Connect_Conference_Attendees")]
    [DataContract]
    public partial class Attendee  : AttendeeBase 
    {

        #region .ctor
        public Attendee()  : base() 
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
        public string Email { get; set; }
        [DataMember]
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
        public string ProfileCompany { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public AttendeeBase GetAttendeeBase()
        {
            AttendeeBase res = new AttendeeBase();
             res.ConferenceId = ConferenceId;
             res.UserId = UserId;
             res.Status = Status;
             res.ReceiveNotifications = ReceiveNotifications;
             res.Company = Company;
             res.AttCode = AttCode;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public Attendee Clone()
        {
            Attendee res = new Attendee();
            res.ConferenceId = ConferenceId;
            res.UserId = UserId;
            res.Status = Status;
            res.ReceiveNotifications = ReceiveNotifications;
            res.Company = Company;
            res.AttCode = AttCode;
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
            res.ProfileCompany = ProfileCompany;
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
