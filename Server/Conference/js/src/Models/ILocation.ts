export interface ILocation {
  LocationId: number;
  ConferenceId: number;
  Name: string;
  Description: string;
  Capacity?: number;
  Sort?: number;
  BackgroundColor: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  ConferenceName: string;
  StartDate?: Date;
  EndDate?: Date;
  NrSessions?: number;
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class Location implements ILocation {
  LocationId: number;
  ConferenceId: number;
  Name: string;
  Description: string;
  Capacity?: number;
  Sort?: number;
  BackgroundColor: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  ConferenceName: string;
  StartDate?: Date;
  EndDate?: Date;
  NrSessions?: number;
  CreatedByUser: string;
  LastModifiedByUser: string;
    constructor() {
  this.LocationId = -1;
  this.ConferenceId = -1;
  this.CreatedByUserID = -1;
  this.CreatedOnDate = new Date();
  this.LastModifiedByUserID = -1;
  this.LastModifiedOnDate = new Date();
  this.ConferenceName = "";
   }
}

