export interface ISimpleUser {
  UserId: number;
  PortalId: number;
  Username: string;
  FirstName: string;
  LastName: string;
  DisplayName: string;
  IsSuperUser: boolean;
  Email: string;
  VanityUrl: string;
}

export class SimpleUser implements ISimpleUser {
  UserId: number;
  PortalId: number;
  Username: string;
  FirstName: string;
  LastName: string;
  DisplayName: string;
  IsSuperUser: boolean;
  Email: string;
  VanityUrl: string;
  constructor() {
    this.UserId = -1;
    this.PortalId = -1;
    this.Username = "";
    this.FirstName = "";
    this.LastName = "";
    this.DisplayName = "";
    this.IsSuperUser = false;
    this.Email = "";
    this.VanityUrl = "";
  }
}
