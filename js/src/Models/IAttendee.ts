export interface IAttendee {
  ConferenceId: number;
  UserId: number;
  Status: number;
  ReceiveNotifications: boolean;
  Company: string;
  AttCode: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  DisplayName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  PhotoVisibility?: number;
  PhotoFilename: string;
  PhotoFolder: string;
  PhotoWidth?: number;
  PhotoHeight?: number;
  PhotoContentType: string;
  Biography: string;
  ProfileCompany: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class Attendee implements IAttendee {
  ConferenceId: number;
  UserId: number;
  Status: number;
  ReceiveNotifications: boolean;
  Company: string;
  AttCode: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  DisplayName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  PhotoVisibility?: number;
  PhotoFilename: string;
  PhotoFolder: string;
  PhotoWidth?: number;
  PhotoHeight?: number;
  PhotoContentType: string;
  Biography: string;
  ProfileCompany: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
    constructor() {
  this.ConferenceId = -1;
  this.UserId = -1;
  this.Status = -1;
  this.ReceiveNotifications = false;
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

