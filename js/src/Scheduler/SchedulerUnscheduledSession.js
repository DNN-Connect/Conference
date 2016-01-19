/** @jsx React.DOM */
var SchedulerUnscheduledSession = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    var speakers = this.props.session.Speakers.map(function(item) {
      return (
        <span className="speaker">{item.Value}</span>
        );
    });
    return (
      <div className="panel panel-default session" data-slotkey="" data-orig-x="0" data-orig-y="0"
           data-sessionid={this.props.session.SessionId}
           data-plenary={this.props.session.IsPlenary}>
        <div className="panel-body">
         {speakers}<br />
         {this.props.session.Title}          
        </div>
      </div>
    );
  },

  componentDidMount: function() {
  }

});

module.exports = SchedulerUnscheduledSession;