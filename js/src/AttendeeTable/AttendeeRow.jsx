module.exports = React.createClass({

  editCompany() {
    var value = this.refs.txtCompany.getDOMNode().value;
    var oldValue = this.props.attendee.Company ? this.props.attendee.Company : '';
    if (value != oldValue) {
      var attendee = this.props.attendee;
      attendee.Company = value;
      this.props.update(this.props.attendee);
    }
  },

  editCode() {
    var value = this.refs.txtCode.getDOMNode().value;
    var oldValue = this.props.attendee.AttCode ? this.props.attendee.AttCode : '';
    if (value != oldValue) {
      var attendee = this.props.attendee;
      attendee.AttCode = value;
      this.props.update(this.props.attendee);
    }
  },

  toggleReceive() {
    var attendee = this.props.attendee;
    attendee.ReceiveNotifications = !attendee.ReceiveNotifications;
    this.props.update(this.props.attendee);
  },

  render() {
    return (
      <tr>
        <td className="nrcol">{this.props.index + 1}.</td>
        <td>{this.props.attendee.LastName}, {this.props.attendee.FirstName}</td>
        <td>{this.props.attendee.Email}</td>
        <td>
          <input type="checkbox" checked={this.props.attendee.ReceiveNotifications}
            onChange={this.toggleReceive.bind(null)} />
        </td>
        <td>
          <input type="text" className="form-control" value={this.props.attendee.Company}
            tabIndex={1000 + this.props.index} ref="txtCompany"
            onBlur={this.editCompany.bind(null)} />
        </td>
        <td>
          <input type="text" className="form-control" value={this.props.attendee.AttCode}
            tabIndex={2000 + this.props.index} ref="txtCode"
            onBlur={this.editCode.bind(null)} />
        </td>
      </tr>
    );
  }

});
