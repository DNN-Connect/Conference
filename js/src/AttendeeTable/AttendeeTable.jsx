import AttendeeRow from "./AttendeeRow.jsx";

export default class AttendeeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: props.attendees
    };
  }

  updateAttendee(attendee) {
    this.props.module.service.editAttendee(
      this.props.conferenceId,
      attendee,
      data => {
        var newList = [];
        for (var i = 0; i < this.state.attendees.length; i++) {
          var a = this.state.attendees[i];
          if (a.UserId == attendee.UserId) {
            newList.push(data);
          } else {
            newList.push(a);
          }
        }
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
          update={this.updateAttendee}
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
