var Speaker = require('./Speaker.jsx');

var Speakers = React.createClass({

  resources: null,
  service: null,
  security: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    this.security = ConnectConference.modules[this.props.moduleId].security;
    return {
      speakers: this.props.speakers
    }
  },

  render: function() {
    var speakers = this.state.speakers.map(function(item) {
      return <Speaker moduleId={this.props.moduleId} speaker={item} key={item.SpeakerId} onDelete={this.onDelete} />
    }.bind(this));
    var addRow = null;
    if (this.security.CanManage) {
      addRow = (
        <tr>
          <td className="dnnFormItem">
           <input type="text" className="fullwidth" ref="newSpeaker" />
           <input type="hidden" ref="newSpeakerId" />
          </td>
          <td className="btncol">
            <a href="#" className="btn btn-default" onClick={this.onSpeakerAdd}
               title={this.resources.Add}>
             <span className="glyphicon glyphicon-plus"></span>
            </a>
          </td>
        </tr>
      );
    }
    return (
      <table className="table" id="speakersTable">
        <thead>
          <tr>
            <th>{this.resources.Speakers}</th>
            <th />
          </tr>
        </thead>
        <tbody ref="speakersTable">
          {speakers}
        </tbody>
        <tbody>
          {addRow}
        </tbody>
      </table>
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      if (this.security.CanManage) {
        $(this.refs.newSpeaker.getDOMNode()).autocomplete({
          minLength: 1,
          source: function(request, response) {
            this.refs.newSpeakerId.getDOMNode().value = '';
            this.service.searchUsers(this.props.conferenceId, request.term, function(data) {
              response(data.map(function(item) {
                return {
                  label: item.DisplayName,
                  value: item.UserId
                }
              }));
            });
          }.bind(this),
          select: function(e, ui) {
            e.preventDefault();
            this.refs.newSpeakerId.getDOMNode().value = ui.item.value;
            this.refs.newSpeaker.getDOMNode().value = ui.item.label;
          }.bind(this)
        });
      }
      $(this.refs.speakersTable.getDOMNode()).sortable({
        update: function(event, ui) {
          this.service.orderSessionSpeakers(this.props.conferenceId, this.props.sessionId, getTableOrder('speakersTable'));
        }.bind(this)
      });
    }.bind(this));
  },

  onDelete: function(speaker, e) {
    e.preventDefault();
    if (confirm(this.resources.SpeakerDeleteConfirm)) {
      this.service.deleteSessionSpeaker(this.props.conferenceId, this.props.sessionId, speaker.SpeakerId, function(data) {
        var newList = [];
        for (i = 0; i < this.state.speakers.length; i++) {
          if (this.state.speakers[i].SpeakerId != speaker.SpeakerId) {
            newList.push(this.state.speakers[i]);
          }
        }
        this.setState({
          speakers: newList
        });
      }.bind(this));
    }
  },

  onSpeakerAdd: function(e) {
    e.preventDefault();
    var newUserId = this.refs.newSpeakerId.getDOMNode().value;
    if (newUserId != '') {
      for (i = 0; i < this.state.speakers.length; i++) {
        if (this.state.speakers[i].UserId == newUserId) {
          return;
        }
      }
      this.service.addSessionSpeaker(this.props.conferenceId, this.props.sessionId, this.refs.newSpeakerId.getDOMNode().value, function(data) {
        this.refs.newSpeakerId.getDOMNode().value = '';
        this.refs.newSpeaker.getDOMNode().value = '';
        var newList = this.state.speakers;
        newList.push(data);
        this.setState({
          speakers: newList
        });
      }.bind(this));
    }
  }

});

module.exports = Speakers;
