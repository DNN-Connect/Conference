export interface IConference {
  ConferenceId: number;
  PortalId: number;
  Name: string;
  Description: string;
  StartDate?: Date;
  EndDate?: Date;
  MaxCapacity?: number;
  SessionVoting: boolean;
  AttendeeRole: number;
  SpeakerRole: number;
  Location: string;
  Url: string;
  SubmittedSessionsPublic: boolean;
  TimeZoneId: string;
  MqttBroker: string;
  MqttBrokerUsername: string;
  MqttBrokerPassword: string;
  BaseTopicPath: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  NrAttendees?: number;
  NrSpeakers?: number;
  NrLocations?: number;
  NrTracks?: number;
  NrSessions?: number;
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class Conference implements IConference {
  ConferenceId: number;
  PortalId: number;
  Name: string;
  Description: string;
  StartDate?: Date;
  EndDate?: Date;
  MaxCapacity?: number;
  SessionVoting: boolean;
  AttendeeRole: number;
  SpeakerRole: number;
  Location: string;
  Url: string;
  SubmittedSessionsPublic: boolean;
  TimeZoneId: string;
  MqttBroker: string;
  MqttBrokerUsername: string;
  MqttBrokerPassword: string;
  BaseTopicPath: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  NrAttendees?: number;
  NrSpeakers?: number;
  NrLocations?: number;
  NrTracks?: number;
  NrSessions?: number;
  CreatedByUser: string;
  LastModifiedByUser: string;
    constructor() {
  this.ConferenceId = -1;
  this.PortalId = -1;
  this.Name = "";
  this.SessionVoting = false;
  this.AttendeeRole = -1;
  this.SpeakerRole = -1;
  this.SubmittedSessionsPublic = false;
  this.CreatedByUserID = -1;
  this.CreatedOnDate = new Date();
  this.LastModifiedByUserID = -1;
  this.LastModifiedOnDate = new Date();
   }
}

