import * as React from "react";
import * as Models from "../Models/";
import UserRow from "./UserRow";
import { linkState } from "../LinkState";

interface IBulkAddUsersProps {
  module: Models.IAppModule;
  conferenceId: number;
  type: "attendees" | "speakers";
}

interface IBulkAddUsersState {
  addedUsers: Models.IAttendee[];
  newUser: Models.IAttendee;
}

export default class BulkAddUsers extends React.Component<
  IBulkAddUsersProps,
  IBulkAddUsersState
> {
  refs: {
    txtEmail: HTMLInputElement;
  };

  constructor(props: IBulkAddUsersProps) {
    super(props);
    this.state = {
      addedUsers: [],
      newUser: new Models.Attendee()
    };
  }

  render() {
    var userRows = this.state.addedUsers.map(item => {
      return <UserRow user={item} />;
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th>{this.props.module.resources.Email}</th>
            <th>{this.props.module.resources.FirstName}</th>
            <th>{this.props.module.resources.LastName}</th>
            <th>{this.props.module.resources.DisplayName}</th>
            <th>{this.props.module.resources.Company}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {userRows}
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                ref="txtEmail"
                value={this.state.newUser.Email}
                onChange={linkState(this, "newUser", "Email")}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={this.state.newUser.FirstName}
                onChange={linkState(this, "newUser", "FirstName")}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={this.state.newUser.LastName}
                onChange={linkState(this, "newUser", "LastName")}
                onBlur={e => this.makeDisplayName}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={this.state.newUser.DisplayName}
                onChange={linkState(this, "newUser", "DisplayName")}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={this.state.newUser.Company}
                onChange={linkState(this, "newUser", "Company")}
              />
            </td>
            <td>
              <a
                href="#"
                className="btn btn-primary"
                onClick={e => this.addUser(e)}
              >
                {this.props.module.resources.Add}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  componentDidMount() {
    $(document).ready(() => {
      ($(this.refs.txtEmail) as any).autocomplete({
        minLength: 1,
        source: (request, response) => {
          this.props.module.service.searchUsersByEmail(
            this.props.conferenceId,
            request.term,
            data => {
              response(
                data.map(item => {
                  return {
                    label: item.Email,
                    value: item.UserId,
                    item: item
                  };
                })
              );
            }
          );
        },
        select: (e, ui) => {
          e.preventDefault();
          var u = new Models.Attendee();
          u.Email = ui.item.item.Email;
          u.FirstName = ui.item.item.FirstName;
          u.LastName = ui.item.item.LastName;
          u.DisplayName = ui.item.item.DisplayName;
          this.setState({ newUser: u });
        }
      });
    });
  }

  addUser(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    switch (this.props.type) {
      case "attendees":
        this.props.module.service.addAttendee(
          this.props.conferenceId,
          this.state.newUser.Email,
          this.state.newUser.FirstName,
          this.state.newUser.LastName,
          this.state.newUser.DisplayName,
          this.state.newUser.Company,
          (data: Models.IAttendee) => {
            this.addedUser(data);
          }
        );
        break;
      case "speakers":
        this.props.module.service.addSpeaker(
          this.props.conferenceId,
          this.state.newUser.Email,
          this.state.newUser.FirstName,
          this.state.newUser.LastName,
          this.state.newUser.DisplayName,
          this.state.newUser.Company,
          (data: Models.IAttendee) => {
            this.addedUser(data);
          }
        );
        break;
    }
  }

  addedUser(data) {
    this.setState({ newUser: new Models.Attendee() });
    var newList = this.state.addedUsers;
    newList.push(data);
    this.setState({
      addedUsers: newList
    });
  }

  makeDisplayName(e: React.FocusEvent<HTMLInputElement>) {
    if (this.state.newUser.DisplayName === "") {
      var u = this.state.newUser;
      u.DisplayName = u.FirstName + " " + u.LastName;
      this.setState({ newUser: u });
    }
  }
}
