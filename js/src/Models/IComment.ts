export interface IComment {
  CommentId: number;
  UserId: number;
  ConferenceId: number;
  SessionId: number;
  Datime: Date;
  Remarks: string;
  Visibility: number;
  DisplayName: string;
  Email: string;
  FirstName: string;
  LastName: string;
  ConferenceName: string;
  SessionTitle: string;
}

export class Comment implements IComment {
  CommentId: number;
  UserId: number;
  ConferenceId: number;
  SessionId: number;
  Datime: Date;
  Remarks: string;
  Visibility: number;
  DisplayName: string;
  Email: string;
  FirstName: string;
  LastName: string;
  ConferenceName: string;
  SessionTitle: string;
    constructor() {
  this.CommentId = -1;
  this.UserId = -1;
  this.ConferenceId = -1;
  this.SessionId = -1;
  this.Datime = new Date();
  this.Remarks = "";
  this.Visibility = -1;
  this.DisplayName = "";
  this.FirstName = "";
  this.LastName = "";
  this.ConferenceName = "";
   }
}

