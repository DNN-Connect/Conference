export interface ISpeaker {
  ConferenceId: number;
  UserId: number;
  Company: string;
  Sort?: number;
  Url: string;
  Description: string;
  DescriptionShort: string;
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
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class Speaker implements ISpeaker {
  ConferenceId: number;
  UserId: number;
  Company: string;
  Sort?: number;
  Url: string;
  Description: string;
  DescriptionShort: string;
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
  CreatedByUser: string;
  LastModifiedByUser: string;
    constructor() {
  this.ConferenceId = -1;
  this.UserId = -1;
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

