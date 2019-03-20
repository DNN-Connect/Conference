export interface ISessionAttendee {
  SessionId: number;
  UserId: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  Title: string;
  ConferenceId: number;
  SessionDateAndTime?: Date;
  SessionEnd?: Date;
  DisplayName: string;
  Email: string;
  Company: string;
  AttCode: string;
  SessionAttendeeName: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class SessionAttendee implements ISessionAttendee {
  SessionId: number;
  UserId: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  Title: string;
  ConferenceId: number;
  SessionDateAndTime?: Date;
  SessionEnd?: Date;
  DisplayName: string;
  Email: string;
  Company: string;
  AttCode: string;
  SessionAttendeeName: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
    constructor() {
  this.SessionId = -1;
  this.UserId = -1;
  this.CreatedByUserID = -1;
  this.CreatedOnDate = new Date();
  this.LastModifiedByUserID = -1;
  this.LastModifiedOnDate = new Date();
  this.ConferenceId = -1;
  this.DisplayName = "";
  this.SessionAttendeeName = "";
   }
}

