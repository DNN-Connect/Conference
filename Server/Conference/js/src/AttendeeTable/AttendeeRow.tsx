import * as React from "react";
import * as Models from "../Models/";

interface IAttendeeRowProps {
  module: Models.IAppModule;
  attendee: Models.IAttendee;
  update: (a: Models.IAttendee) => void;
  index: number;
}

interface IAttendeeRowState {
  code: string;
  company: string;
}

export default class AttendeeRow extends React.Component<
  IAttendeeRowProps,
  IAttendeeRowState
> {
  refs: {
    txtCompany: HTMLInputElement;
    txtCode: HTMLInputElement;
  };

  constructor(props: IAttendeeRowProps) {
    super(props);
    this.state = {
      code: props.attendee.AttCode,
      company: props.attendee.Company
    };
  }

  editCompany() {
    var oldValue = this.props.attendee.Company
      ? this.props.attendee.Company
      : "";
    if (this.state.company != oldValue) {
      var attendee = this.props.attendee;
      attendee.Company = this.state.company;
      this.props.update(this.props.attendee);
    }
  }

  editCode() {
    var oldValue = this.props.attendee.AttCode
      ? this.props.attendee.AttCode
      : "";
    if (this.state.code != oldValue) {
      var attendee = this.props.attendee;
      attendee.AttCode = this.state.code;
      this.props.update(this.props.attendee);
    }
  }

  toggleReceive() {
    var attendee = this.props.attendee;
    attendee.ReceiveNotifications = !attendee.ReceiveNotifications;
    this.props.update(this.props.attendee);
  }

  render() {
    return (
      <tr>
        <td className="nrcol">{this.props.index + 1}.</td>
        <td>
          {this.props.attendee.LastName}, {this.props.attendee.FirstName}
        </td>
        <td>{this.props.attendee.Email}</td>
        <td>
          <input
            type="checkbox"
            checked={this.props.attendee.ReceiveNotifications}
            onChange={e => this.toggleReceive()}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={this.state.company || ""}
            tabIndex={1000 + this.props.index}
            ref="txtCompany"
            onBlur={this.editCompany.bind(null)}
            onChange={e =>
              this.setState({
                company: e.target.value
              })
            }
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={this.state.code || ""}
            tabIndex={2000 + this.props.index}
            ref="txtCode"
            onBlur={e => this.editCode()}
            onChange={e =>
              this.setState({
                code: e.target.value
              })
            }
          />
        </td>
      </tr>
    );
  }
}
