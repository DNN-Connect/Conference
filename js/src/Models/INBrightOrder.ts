export interface INBrightOrder {
  ItemId: number;
  OrderedBy: string;
  OrderNr: string;
  CreatedDate: Date;
  OrderStatus: number;
  SubTotal: number;
  Discount: number;
  Total: number;
  NrParticipants: number;
}

export class NBrightOrder implements INBrightOrder {
  ItemId: number;
  OrderedBy: string;
  OrderNr: string;
  CreatedDate: Date;
  OrderStatus: number;
  SubTotal: number;
  Discount: number;
  Total: number;
  NrParticipants: number;
  constructor() {
    this.ItemId = -1;
    this.OrderedBy = "";
    this.OrderNr = "";
    this.CreatedDate = new Date();
    this.OrderStatus = 0;
    this.SubTotal = 0;
    this.Discount = 0;
    this.Total = 0;
    this.NrParticipants = 0;
  }
}
