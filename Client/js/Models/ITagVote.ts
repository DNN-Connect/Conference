export interface ITagVote {
  TagId: number;
  UserId: number;
}

export class TagVote implements ITagVote {
  TagId: number;
  UserId: number;
    constructor() {
  this.TagId = -1;
  this.UserId = -1;
   }
}

