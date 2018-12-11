export interface ITag {
  TagId: number;
  ConferenceId: number;
  TagName: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  NrSessions?: number;
  NrVotes?: number;
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class Tag implements ITag {
  TagId: number;
  ConferenceId: number;
  TagName: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  NrSessions?: number;
  NrVotes?: number;
  CreatedByUser: string;
  LastModifiedByUser: string;
    constructor() {
  this.TagId = -1;
  this.ConferenceId = -1;
  this.TagName = "";
  this.CreatedByUserID = -1;
  this.CreatedOnDate = new Date();
  this.LastModifiedByUserID = -1;
  this.LastModifiedOnDate = new Date();
   }
}

