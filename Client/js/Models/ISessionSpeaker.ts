export interface ISessionSpeaker {
  SpeakerId: number;
  SessionId: number;
  Sort?: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  Company: string;
  Description: string;
  DescriptionShort: string;
  Url: string;
  DisplayName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class SessionSpeaker implements ISessionSpeaker {
  SpeakerId: number;
  SessionId: number;
  Sort?: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  Company: string;
  Description: string;
  DescriptionShort: string;
  Url: string;
  DisplayName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
  constructor() {
    this.SpeakerId = -1;
    this.SessionId = -1;
    this.CreatedByUserID = -1;
    this.CreatedOnDate = new Date();
    this.LastModifiedByUserID = -1;
    this.LastModifiedOnDate = new Date();
    this.DisplayName = "";
    this.FirstName = "";
    this.LastName = "";
    this.Username = "";
  }
}
