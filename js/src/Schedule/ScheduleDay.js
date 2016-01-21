/** @jsx React.DOM */
var ScheduleGrid = require('./ScheduleGrid'),
    SchedulerScheduledSession = require('./ScheduleScheduledSession');

var ScheduleDay = React.createClass({

  propTypes: {
    day: React.PropTypes.number,
    start: React.PropTypes.number,
    finish: React.PropTypes.number,
    leftMargin: React.PropTypes.number
  },

  getInitialState: function() {
    return {}
  },

  render: function() {
    var height = this.props.finish - this.props.start;
    var width = this.props.locations.length * 100;
    var viewBox = "0 0 " + (width + this.props.leftMargin).toString() + " " + height;
    var scheduledSessions = [];
    for (i=0;i<this.props.sessionList.length;i++)
    {
      var session = this.props.sessionList[i];
      if (session.DayNr == this.props.day & session.SlotId > 0)
      {
        var slot = this.props.slotList[session.SlotId];
        if (session.IsPlenary) {
          scheduledSessions.push(
          <foreignObject x={this.props.leftMargin} y={slot.StartMinutes - this.props.start} width={this.props.width} height={slot.DurationMins}>
            <SchedulerScheduledSession session={session} />
          </foreignObject>
            );          

        } else {
          scheduledSessions.push(
          <foreignObject x={this.props.locationList[session.LocationId] * 100 + this.props.leftMargin} y={slot.StartMinutes - this.props.start} width="100" height={slot.DurationMins}>
            <SchedulerScheduledSession session={session} />
          </foreignObject>
            );          
        }
      }
    }
    var date = new Date(this.props.conference.StartDate);
    date = date.addDays(this.props.day - 1);
    var dateString = moment(date).format('dddd MMM Do');
    return (
      <div>
        <h2>{dateString}</h2>
        <svg xmlns="http://www.w3.org/2000/svg"
             className="schedulerDay" 
             viewBox={viewBox}>
             <pattern id="Pattern" x="10" y="10" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d='M0 0L8 8ZM8 0L0 8Z' className="hashLines" />
             </pattern>
             <rect x="0" y="0" height={height} width={width + this.props.leftMargin} className="dayBackground" />
             <ScheduleGrid width={width} height={height} leftMargin={this.props.leftMargin}
                            start={this.props.start} ref="Grid" locationList={this.props.locationList}
                            locations={this.props.locations} slots={this.props.slots} day={this.props.day} />
             {scheduledSessions}
        </svg>
      </div>
    );
  }

});

module.exports = ScheduleDay;
