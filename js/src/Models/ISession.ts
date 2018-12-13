export interface ISession {
  SessionId: number;
  ConferenceId: number;
  LocationId?: number;
  Level: string;
  Sort?: number;
  Capacity?: number;
  SlotId: number;
  Title: string;
  SubTitle: string;
  Description: string;
  Status?: number;
  IsPlenary: boolean;
  DayNr: number;
  Notes: string;
  TrackId?: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  TimeZoneId: string;
  SessionDateAndTime?: Date;
  SessionEnd?: Date;
  LocationName: string;
  SlotTitle: string;
  TrackTitle: string;
  BackgroundColor: string;
  NrAttendees?: number;
  NrSpeakers?: number;
  NrVotes?: number;
  NrResources?: number;
  CreatedByUser: string;
  LastModifiedByUser: string;
  Speakers: IKeyValuePair[];
  Tags: IKeyValuePair[];
}

export class Session implements ISession {
  SessionId: number;
  ConferenceId: number;
  LocationId?: number;
  Level: string;
  Sort?: number;
  Capacity?: number;
  SlotId: number;
  Title: string;
  SubTitle: string;
  Description: string;
  Status?: number;
  IsPlenary: boolean;
  DayNr: number;
  Notes: string;
  TrackId?: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  TimeZoneId: string;
  SessionDateAndTime?: Date;
  SessionEnd?: Date;
  LocationName: string;
  SlotTitle: string;
  TrackTitle: string;
  BackgroundColor: string;
  NrAttendees?: number;
  NrSpeakers?: number;
  NrVotes?: number;
  NrResources?: number;
  CreatedByUser: string;
  LastModifiedByUser: string;
  Speakers: IKeyValuePair[];
  Tags: IKeyValuePair[];
  constructor() {
    this.SessionId = -1;
    this.ConferenceId = -1;
    this.SlotId = -1;
    this.IsPlenary = false;
    this.DayNr = -1;
    this.CreatedByUserID = -1;
    this.CreatedOnDate = new Date();
    this.LastModifiedByUserID = -1;
    this.LastModifiedOnDate = new Date();
    this.Speakers = [];
    this.Tags = [];
  }
}

export interface ISessionWithVote extends ISession {
  Voted: number;
}

export class SessionWithVote extends Session implements ISessionWithVote {
  Voted: number;
  constructor() {
    super();
    this.Voted = 0;
  }
}
