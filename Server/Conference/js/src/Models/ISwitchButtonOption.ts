export interface ISwitchButtonOption {
  Id: number;
  Text: string;
  Confirm?: string;
  ClassName: string;
}

export class SwitchButtonOption implements ISwitchButtonOption {
  Id: number;
  Text: string;
  Confirm?: string;
  ClassName: string;
  constructor() {
    this.Id = -1;
    this.Text = "";
    this.Confirm = "";
    this.ClassName = "";
    this.ClassName = "";
  }
}
