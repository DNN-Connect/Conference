
using System;
using System.Runtime.Serialization;
using Connect.Conference.Core.Common;
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
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string CreatedByUser { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
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
             res.TimeZoneId = TimeZoneId;
             res.MqttBroker = MqttBroker;
             res.MqttBrokerUsername = MqttBrokerUsername;
             res.MqttBrokerPassword = MqttBrokerPassword;
             res.BaseTopicPath = BaseTopicPath;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public Conference Clone()
        {
            Conference res = new Conference();
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
            res.TimeZoneId = TimeZoneId;
            res.MqttBroker = MqttBroker;
            res.MqttBrokerUsername = MqttBrokerUsername;
            res.MqttBrokerPassword = MqttBrokerPassword;
            res.BaseTopicPath = BaseTopicPath;
            res.NrAttendees = NrAttendees;
            res.NrSpeakers = NrSpeakers;
            res.NrLocations = NrLocations;
            res.NrTracks = NrTracks;
            res.NrSessions = NrSessions;
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
