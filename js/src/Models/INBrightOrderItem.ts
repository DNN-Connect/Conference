import { INBrightOrder, NBrightOrder } from "./INBrightOrder";

export interface INBrightOrderItem extends INBrightOrder {
  ProductName: string;
  Cost: number;
  Sharing: boolean;
  Gender: string;
  FirstName: string;
  LastName: string;
  Company: string;
  Email: string;
  Arrival: Date;
  Departure: Date;
  UserID?: number;
  AttendeeStatus?: number;
  AttendeeUserId?: number;
  AlternativeUserId?: number;
}
export class NBrightOrderItem extends NBrightOrder
  implements INBrightOrderItem {
  ProductName: string;
  Cost: number;
  Sharing: boolean;
  Gender: string;
  FirstName: string;
  LastName: string;
  Company: string;
  Email: string;
  Arrival: Date;
  Departure: Date;
  UserID?: number;
  AttendeeStatus?: number;
  AttendeeUserId?: number;
  AlternativeUserId?: number;
  constructor() {
    super();
    this.ProductName = "";
    this.Cost = 0;
    this.Sharing = false;
    this.Gender = "";
    this.FirstName = "";
    this.LastName = "";
    this.Company = "";
    this.Email = "";
    this.Arrival = new Date();
    this.Departure = new Date();
  }
}
