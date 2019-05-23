import * as React from "react";
import * as Models from "../Models/";
import AttendeeRow from "./AttendeeRow";

interface IAttendeeTableProps {
  module: Models.IAppModule;
  attendees: Models.IAttendee[];
  conferenceId: number;
}

interface IAttendeeTableState {
  attendees: Models.IAttendee[];
}

export default class AttendeeTable extends React.Component<
  IAttendeeTableProps,
  IAttendeeTableState
> {

  constructor(props: IAttendeeTableProps) {
    super(props);
    this.state = {
      attendees: props.attendees
    };
  }

  updateAttendee(attendee) {
    this.props.module.service.editAttendee(
      this.props.conferenceId,
      attendee,
      (data: Models.IAttendee) => {
        var newList = this.state.attendees.map(a => {
          return a.UserId === attendee.UserId ? data : a;
        });
        this.setState({
          attendees: newList
        });
      }
    );
  }

  render() {
    var attendees = this.state.attendees.map((item, i) => {
      return (
        <AttendeeRow
          module={this.props.module}
          attendee={item}
          key={item.UserId}
          update={a => this.updateAttendee(a)}
          index={i}
        />
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-responsive table-striped">
              <thead>
                <tr>
                  <th />
                  <th>{this.props.module.resources.Name}</th>
                  <th>{this.props.module.resources.Email}</th>
                  <th>N</th>
                  <th>{this.props.module.resources.Company}</th>
                  <th>{this.props.module.resources.Code}</th>
                </tr>
              </thead>
              <tbody>{attendees}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
