export interface ISessionEvaluation {
  SessionId: number;
  UserId: number;
  Stars: number;
  Review: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  DisplayName: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
}

export class SessionEvaluation implements ISessionEvaluation {
  SessionId: number;
  UserId: number;
  Stars: number;
  Review: string;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  DisplayName: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
    constructor() {
  this.SessionId = -1;
  this.UserId = -1;
  this.Stars = -1;
  this.CreatedByUserID = -1;
  this.CreatedOnDate = new Date();
  this.LastModifiedByUserID = -1;
  this.LastModifiedOnDate = new Date();
  this.DisplayName = "";
   }
}

