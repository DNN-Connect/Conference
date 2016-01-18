/** @jsx React.DOM */
var SchedulerUnscheduledSession = React.createClass({

  getInitialState: function() {
    return {
    }
  },

  render: function() {
    var speakers = this.props.session.Speakers.map(function(item) {
      return (
        <span className="speaker">{item.Value}</span>
        );
    });
    return (
      <div className="panel panel-default session">
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