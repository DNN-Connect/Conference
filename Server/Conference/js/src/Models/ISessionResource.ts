export interface ISessionResource {
  SessionResourceId: number;
  SessionId: number;
  ResourceLink: string;
  ResourceDescription: string;
  ResourceType: number;
  Visibility: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class SessionResource implements ISessionResource {
  SessionResourceId: number;
  SessionId: number;
  ResourceLink: string;
  ResourceDescription: string;
  ResourceType: number;
  Visibility: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  CreatedByUser: string;
  LastModifiedByUser: string;
    constructor() {
  this.SessionResourceId = -1;
  this.SessionId = -1;
  this.ResourceLink = "";
  this.ResourceType = -1;
  this.Visibility = -1;
  this.CreatedByUserID = -1;
  this.CreatedOnDate = new Date();
  this.LastModifiedByUserID = -1;
  this.LastModifiedOnDate = new Date();
   }
}

