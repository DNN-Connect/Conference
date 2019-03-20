export interface ISlot {
  SlotId: number;
  ConferenceId: number;
  Start: Date;
  DurationMins: number;
  SlotType: number;
  Title: string;
  Description: string;
  DayNr?: number;
  LocationId?: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  LocationName: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
  StartMinutes: number;
  NewStartMinutes: number;
}

export class Slot implements ISlot {
  SlotId: number;
  ConferenceId: number;
  Start: Date;
  DurationMins: number;
  SlotType: number;
  Title: string;
  Description: string;
  DayNr?: number;
  LocationId?: number;
  CreatedByUserID: number;
  CreatedOnDate: Date;
  LastModifiedByUserID: number;
  LastModifiedOnDate: Date;
  LocationName: string;
  CreatedByUser: string;
  LastModifiedByUser: string;
  StartMinutes: number;
  NewStartMinutes: number;
  constructor() {
    this.SlotId = -1;
    this.ConferenceId = -1;
    this.Start = new Date();
    this.DurationMins = 60;
    this.SlotType = 0;
    this.CreatedByUserID = -1;
    this.CreatedOnDate = new Date();
    this.LastModifiedByUserID = -1;
    this.LastModifiedOnDate = new Date();
  }
}
