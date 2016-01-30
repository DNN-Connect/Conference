/** @jsx React.DOM */
var UserRow = require('./UserRow');

var BulkAddUsers = React.createClass({

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
      addedUsers: []
    }
  },

  render: function() {
    var userRows = this.state.addedUsers.map(function(item) {
      return (<UserRow user={item} />);
    });
    return (
      <table className="table">
       <thead>
        <tr>
         <th>{this.resources.Email}</th>
         <th>{this.resources.FirstName}</th>
         <th>{this.resources.LastName}</th>
         <th>{this.resources.DisplayName}</th>
         <th>{this.resources.Company}</th>
         <th></th>
        </tr>
       </thead>
       <tbody>
        {userRows}
        <tr>
         <td>
          <input type="text" className="form-control" ref="txtEmail" />
         </td>
         <td>
          <input type="text" className="form-control" ref="txtFirstName" />
         </td>
         <td>
          <input type="text" className="form-control" ref="txtLastName" onBlur={this.makeDisplayName} />
         </td>
         <td>
          <input type="text" className="form-control" ref="txtDisplayName" />
         </td>
         <td>
          <input type="text" className="form-control" ref="txtCompany" />
         </td>
         <td>
          <a href="#" className="btn btn-primary" onClick={this.addUser}>
           {this.resources.Add}
          </a>
         </td>
        </tr>
       </tbody>
      </table>
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      $(this.refs.txtEmail.getDOMNode()).autocomplete({
        minLength: 1,
        source: function(request, response) {
          this.service.searchUsersByEmail(this.props.conferenceId, request.term, function(data) {
            response(data.map(function(item) {
              return {
                label: item.Email,
                value: item.UserId,
                item: item
              };
            }));
          });
        }.bind(this),
        select: function(e, ui) {
          e.preventDefault();
          this.refs.txtEmail.getDOMNode().value = ui.item.item.Email;
          this.refs.txtFirstName.getDOMNode().value = ui.item.item.FirstName;
          this.refs.txtLastName.getDOMNode().value = ui.item.item.LastName;
          this.refs.txtDisplayName.getDOMNode().value = ui.item.item.DisplayName;
        }.bind(this)
      });
    }.bind(this));
  },

  addUser: function(e) {
    e.preventDefault();
    switch (this.props.type) {
      case 'attendees':
        this.service.addAttendee(this.props.conferenceId,
          this.refs.txtEmail.getDOMNode().value,
          this.refs.txtFirstName.getDOMNode().value,
          this.refs.txtLastName.getDOMNode().value,
          this.refs.txtDisplayName.getDOMNode().value,
          this.refs.txtCompany.getDOMNode().value,
          function(data) {
            this.refs.txtEmail.getDOMNode().value = '';
            this.refs.txtFirstName.getDOMNode().value = '';
            this.refs.txtLastName.getDOMNode().value = '';
            this.refs.txtDisplayName.getDOMNode().value = '';
            this.refs.txtCompany.getDOMNode().value = '';
            var newList = this.state.addedUsers;
            newList.push(data);
            this.setState({
              addedUsers: newList
            })
          }.bind(this));
        break;
      case 'speakers':
        break;
    }
  },

  makeDisplayName: function(e) {
    if (this.refs.txtDisplayName.getDOMNode().value == '') {
      this.refs.txtDisplayName.getDOMNode().value = this.refs.txtFirstName.getDOMNode().value + ' ' + this.refs.txtLastName.getDOMNode().value;
    }
  }

});

module.exports = BulkAddUsers;
