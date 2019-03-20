export interface IApiKey {
  ApiKey: string;
  ConferenceId: number;
  Expires?: Date;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  CreatedByUser: string;
  CreatedByUserName: string;
}

export class ApiKey implements IApiKey {
  ApiKey: string;
  ConferenceId: number;
  Expires?: Date;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  CreatedByUser: string;
  CreatedByUserName: string;
    constructor() {
  this.ApiKey = "";
  this.ConferenceId = -1;
  this.CreatedByUserID = -1;
  this.CreatedOnDate = new Date();
  this.CreatedByUser = "";
  this.CreatedByUserName = "";
   }
}

