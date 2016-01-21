/** @jsx React.DOM */
var ScheduleScheduledSession = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    var speakers = this.props.session.Speakers.map(function(item) {
      return (
        <span className="speaker">{item.Value}</span>
        );
    });
    var speakerList = '<br/>';
    this.props.session.Speakers.forEach(function(el) {
      speakerList += '<span class="speaker">' + el.Value + '</span>';
    });
    return (
      <div className="panel panel-default session scheduled embedded" data-slotid={this.props.session.SlotId} 
           data-locationid={this.props.session.LocationId} data-plenary={this.props.session.IsPlenary}
           ref="Session" data-sessionid={this.props.session.SessionId} data-day={this.props.session.DayNr}
           data-toggle="popover" title={this.props.session.Title} 
           data-content={this.props.session.Description + speakerList}>
       <div className="panel-body">
         <div className="speakers">{speakers}</div>
         {this.props.session.Title}          
       </div>
      </div>
    );
  }

});

module.exports = ScheduleScheduledSession;
