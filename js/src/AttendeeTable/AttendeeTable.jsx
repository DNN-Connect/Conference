var AttendeeRow = require('./AttendeeRow.jsx');

module.exports = React.createClass({

  attendeeBeingEdited: null,

  getInitialState() {
    return {
      attendees: this.props.attendees
    }
  },

  editClick(attendee, e) {
    e.preventDefault();
    this.refs.txtCompany.getDOMNode().value = attendee.Company;
    this.refs.txtAttCode.getDOMNode().value = attendee.AttCode;
    this.refs.chkNotifications.getDOMNode().checked = attendee.ReceiveNotifications;
    $('#editAttendee').modal('show');
    this.attendeeBeingEdited = attendee;
  },

  updateAttendee(e) {
    var attendee = this.attendeeBeingEdited;
    attendee.Company = this.refs.txtCompany.getDOMNode().value;
    attendee.AttCode = this.refs.txtAttCode.getDOMNode().value;
    attendee.ReceiveNotifications = this.refs.chkNotifications.getDOMNode().checked;
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
    $('#editAttendee').modal('hide');    
  },

  render() {
    var attendees = this.state.attendees.map((item, i) => {
      return <AttendeeRow module={this.props.module} attendee={item}
                          editClick={this.editClick} key={item.UserId}
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
      <th>{this.props.module.resources.Company}</th>
      <th>{this.props.module.resources.Code}</th>
      <th></th>
     </tr>
    </thead>
    <tbody>
      {attendees}
    </tbody>
   </table>
  </div>
 </div>

<div className="modal fade" id="editAttendee" tabindex="-1" role="dialog" aria-labelledby="editAttendeeLabel">
 <div className="modal-dialog" role="document">
  <div className="modal-content">
   <div className="modal-header">
    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 className="modal-title" id="editAttendeeLabel">{this.props.module.resources.Attendee}</h4>
   </div>
   <div className="modal-body">
    <div className="form-group">
     <label for="txtCompany">{this.props.module.resources.Company}</label>
     <input type="text" className="form-control" ref="txtCompany" placeholder={this.props.module.resources.Company} />
    </div>
    <div className="form-group">
     <label for="txtAttCode">{this.props.module.resources.Code}</label>
     <input type="text" className="form-control" ref="txtAttCode" placeholder={this.props.module.resources.Code} />
    </div>
    <div className="checkbox">
      <label>
        <input type="checkbox" ref="chkNotifications" /> {this.props.module.resources.ReceiveNotifications}
      </label>
    </div>
   </div>
   <div className="modal-footer">
    <button type="button" className="btn btn-default" data-dismiss="modal">{this.props.module.resources.Cancel}</button>
    <button type="button" className="btn btn-primary" onClick={this.updateAttendee}>{this.props.module.resources.Save}</button>
   </div>
  </div>
 </div>
</div>
</div>
    );
  }

});
