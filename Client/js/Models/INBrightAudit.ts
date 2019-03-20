export interface INBrightAudit {
  AuditDate: Date;
  AuditType: string;
  Username: string;
  OrderStatus: number;
  Message: string;
}
export class NBrightAudit implements INBrightAudit {
  AuditDate: Date;
  AuditType: string;
  Username: string;
  OrderStatus: number;
  Message: string;
  constructor() {
    this.AuditDate = new Date();
    this.AuditType = "";
    this.Username = "";
    this.OrderStatus = 0;
    this.Message = "";
  }
}
