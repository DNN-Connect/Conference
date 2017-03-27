var AttendeeRow = require('./AttendeeRow.jsx');

module.exports = React.createClass({

  attendeeBeingEdited: null,

  getInitialState() {
    return {
      attendees: this.props.attendees
    }
  },

  updateAttendee(attendee) {
    this.props.module.service.editAttendee(this.props.conferenceId, attendee, (data) => {
      var newList = [];
      for (var i=0;i<this.state.attendees.length;i++)
      {
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
    });
  },

  render() {
    var attendees = this.state.attendees.map((item, i) => {
      return <AttendeeRow module={this.props.module} attendee={item}
                          key={item.UserId}
                          update={this.updateAttendee}
                          index={i} />;
    });
    return (
<div class="container">
 <div className="row">
  <div className="col-sm-12">
   <table className="table table-responsive table-striped">
    <thead>
     <tr>
      <th></th>
      <th>{this.props.module.resources.Name}</th>
      <th>{this.props.module.resources.Email}</th>
      <th>N</th>
      <th>{this.props.module.resources.Company}</th>
      <th>{this.props.module.resources.Code}</th>
     </tr>
    </thead>
    <tbody>
      {attendees}
    </tbody>
   </table>
  </div>
 </div>
</div>
    );
  }

});
