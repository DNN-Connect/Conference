export interface ISessionVote {
  SessionId: number;
  UserId: number;
}

export class SessionVote implements ISessionVote {
  SessionId: number;
  UserId: number;
    constructor() {
  this.SessionId = -1;
  this.UserId = -1;
   }
}

