/** @jsx React.DOM */
var SchedulerScheduledSession = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div className="panel panel-default session scheduled" data-slotid={this.props.session.SlotId} 
           data-locationid={this.props.session.LocationId} data-plenary={this.props.session.IsPlenary}
           ref="Session">
       <div className="panel-body">
         {this.props.session.Title}
       </div>
      </div>
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      this.props.sessionPlace(this.refs.Session);
    }.bind(this));
  }

});

module.exports = SchedulerScheduledSession;
