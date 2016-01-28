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
    var speakerList = '<br/>';
    this.props.session.Speakers.forEach(function(el) {
      speakerList += '<span class="speaker">' + el.Value + '</span>';
    });
    var divStyle = {
      backgroundColor: this.props.session.BackgroundColor
    }
    return (
      <div className="panel panel-default session scheduled" data-slotid={this.props.session.SlotId} 
           data-locationid={this.props.session.LocationId} data-plenary={this.props.session.IsPlenary}
           ref="Session" data-sessionid={this.props.session.SessionId} data-day={this.props.session.DayNr}
           data-toggle="popover" title={this.props.session.Title} 
           data-content={this.props.session.Description + speakerList} style={divStyle}>
       <div className="panel-body">
         <div className="speakers">{speakers}</div>
         {this.props.session.Title}          
       </div>
      </div>
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      this.props.sessionPlace(this.refs.Session.getDOMNode());
    }.bind(this));
  },

  componentDidUpdate: function() {
    this.props.sessionPlace(this.refs.Session.getDOMNode());
  }

});

module.exports = SchedulerScheduledSession;
