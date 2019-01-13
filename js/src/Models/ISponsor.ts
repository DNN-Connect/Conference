export interface ISponsor {
  SponsorId: number;
  ConferenceId: number;
  Name: string;
  Url: string;
  Description: string;
  ViewOrder: number;
  SponsorLevel: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class Sponsor implements ISponsor {
  SponsorId: number;
  ConferenceId: number;
  Name: string;
  Url: string;
  Description: string;
  ViewOrder: number;
  SponsorLevel: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  CreatedByUser: string;
  LastModifiedByUser: string;
    constructor() {
  this.SponsorId = -1;
  this.ConferenceId = -1;
  this.Name = "";
  this.ViewOrder = -1;
  this.CreatedByUserID = -1;
  this.CreatedOnDate = new Date();
  this.LastModifiedByUserID = -1;
  this.LastModifiedOnDate = new Date();
   }
}

