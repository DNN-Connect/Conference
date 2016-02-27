module.exports = React.createClass({

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
    }
  },

  render: function() {
    return (
      <tr className="sortable" data-id={this.props.speaker.SpeakerId}>
        <td>{this.props.speaker.DisplayName}</td>
        <td className="btncol">
          <a href="#" className="btn btn-default" onClick={this.props.onDelete.bind(null, this.props.speaker)}
             title={this.resources.Delete}>
           <span className="glyphicon glyphicon-remove"></span>
          </a>
        </td>
      </tr>
    );
  },

  componentDidMount: function() {
  }

});
