export interface ITrack {
  TrackId: number;
  ConferenceId: number;
  SessionVoting: boolean;
  BackgroundColor: string;
  Sort?: number;
  Title: string;
  Description: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  CreatedByUser: string;
  LastModifiedByUser: string;
  NrSessions?: number;
}

export class Track implements ITrack {
  TrackId: number;
  ConferenceId: number;
  SessionVoting: boolean;
  BackgroundColor: string;
  Sort?: number;
  Title: string;
  Description: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  CreatedByUser: string;
  LastModifiedByUser: string;
  NrSessions?: number;
    constructor() {
  this.TrackId = -1;
  this.ConferenceId = -1;
  this.SessionVoting = false;
  this.CreatedByUserID = -1;
  this.CreatedOnDate = new Date();
  this.LastModifiedByUserID = -1;
  this.LastModifiedOnDate = new Date();
   }
}

