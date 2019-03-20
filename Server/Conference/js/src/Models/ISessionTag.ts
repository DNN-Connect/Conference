export interface ISessionTag {
  SessionId: number;
  TagId: number;
  Title: string;
  TagName: string;
  ConferenceId: number;
}

export class SessionTag implements ISessionTag {
  SessionId: number;
  TagId: number;
  Title: string;
  TagName: string;
  ConferenceId: number;
    constructor() {
  this.SessionId = -1;
  this.TagId = -1;
  this.TagName = "";
  this.ConferenceId = -1;
   }
}

