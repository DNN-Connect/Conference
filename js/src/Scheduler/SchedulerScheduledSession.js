/** @jsx React.DOM */
var SchedulerScheduledSession = React.createClass({

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
      <div className="panel panel-default session scheduled" data-slotid={this.props.session.SlotId} 
           data-locationid={this.props.session.LocationId} data-plenary={this.props.session.IsPlenary}
           ref="Session" data-sessionid={this.props.session.SessionId} data-day={this.props.session.DayNr}>
       <div className="panel-body">
         {speakers}<br />
         {this.props.session.Title}          
       </div>
      </div>
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      this.props.sessionPlace(this.refs.Session.getDOMNode());
    }.bind(this));
  }

});

module.exports = SchedulerScheduledSession;
