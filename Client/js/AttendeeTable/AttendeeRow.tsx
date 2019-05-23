import * as React from "react";
import * as Models from "../Models/";
import { linkState } from "../LinkState";
import CountryDropdown from "../Generic/CountryDropdown";

interface IAttendeeRowProps {
  module: Models.IAppModule;
  attendee: Models.IAttendee;
  update: (a: Models.IAttendee) => void;
  index: number;
  countries: Models.ICountry[];
}

interface IAttendeeRowState {
  attendee: Models.IAttendee;
}

export default class AttendeeRow extends React.Component<
  IAttendeeRowProps,
  IAttendeeRowState
> {
  constructor(props: IAttendeeRowProps) {
    super(props);
    this.state = {
      attendee: Object.assign({}, props.attendee)
    };
  }

  updateIfChanged(propName: string) {
    if (this.props.attendee[propName] != this.state.attendee[propName]) {
      this.props.update(this.state.attendee);
    }
  }

  toggleReceive() {
    var attendee = this.state.attendee;
    attendee.ReceiveNotifications = !attendee.ReceiveNotifications;
    this.setState({
      attendee: attendee
    });
    this.props.update(attendee);
  }

  render() {
    return (
      <tr>
        <td className="nrcol">{this.props.index + 1}.</td>
        <td>
          <input
            type="text"
            className="form-control"
            value={this.state.attendee.LastName || ""}
            tabIndex={1000 + this.props.index}
            onBlur={e => this.updateIfChanged("LastName")}
            onChange={linkState(this, "attendee", "LastName")}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={this.state.attendee.FirstName || ""}
            tabIndex={1000 + this.props.index + 1}
            onBlur={e => this.updateIfChanged("FirstName")}
            onChange={linkState(this, "attendee", "FirstName")}
          />
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
            value={this.state.attendee.Company || ""}
            tabIndex={2000 + this.props.index}
            onBlur={e => this.updateIfChanged("Company")}
            onChange={linkState(this, "attendee", "Company")}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={this.state.attendee.AttCode || ""}
            tabIndex={3000 + this.props.index}
            onBlur={e => this.updateIfChanged("AttCode")}
            onChange={linkState(this, "attendee", "AttCode")}
          />
        </td>
        <td>
          <CountryDropdown
            module={this.props.module}
            countries={this.props.countries}
            value={this.state.attendee.ProfileCountry}
            onChange={cid => {
              var a = this.state.attendee;
              a.ProfileCountry = cid;
              this.setState({ attendee: a });
              this.props.update(a);
            }}
          />
        </td>
      </tr>
    );
  }
}
