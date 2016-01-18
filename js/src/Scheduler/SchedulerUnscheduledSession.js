/** @jsx React.DOM */
var SchedulerUnscheduledSession = React.createClass({

  getInitialState: function() {
    return {
    }
  },

  render: function() {
    return (
      <div className="panel panel-default session">
        <div className="panel-body">
          {this.props.session.Title}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
  }

});

module.exports = SchedulerUnscheduledSession;