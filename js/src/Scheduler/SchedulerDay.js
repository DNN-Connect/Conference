/** @jsx React.DOM */
var SchedulerGrid = require('./SchedulerGrid'),
    SchedulerScheduledSession = require('./SchedulerScheduledSession');

var SchedulerDay = React.createClass({

  getInitialState: function() {
    var mySlots = [];
    for (i=0;i<this.props.slots.length;i++)
    {
      var slot = this.props.slots[i];
      if (slot.DayNr == undefined | slot.DayNr == this.props.day)
      {
        mySlots.push(slot);
      }
    }
    var start = Math.floor(mySlots[0].StartMinutes/60) * 60 - 60;
    var finish = 120 + Math.floor(mySlots[mySlots.length - 1].StartMinutes / 60) * 60;
    var height = finish - start;
    var locationList = {};
    for (i=0;i<this.props.locations.length;i++)
    {
      locationList[this.props.locations[i].LocationId] = i;
    }
    var slotList = {};
    for (i=0;i<mySlots.length;i++)
    {
      slotList[mySlots[i].SlotId] = mySlots[i];
    }
    return {
      mySlots: mySlots,
      start: start,
      finish: finish,
      width: this.props.locations.length * 100,
      height: height,
      locationList: locationList,
      slotList: slotList,
      sessionList: this.props.sessionList,
      leftMargin: 50
    }
  },

  render: function() {
    var viewBox = "0 0 " + (this.state.width + this.state.leftMargin).toString() + " " + this.state.height;
    var scheduledSessions = [];
    for (i=0;i<this.state.sessionList.length;i++)
    {
      var session = this.state.sessionList[i];
      if (session.DayNr == this.props.day & session.SlotId > 0)
      {
        scheduledSessions.push(
          <SchedulerScheduledSession session={session} sessionPlace={this.sessionPlace} />
          );
      }
    }
    return (
      <div>
        <h2>{this.props.day}</h2>
        <svg xmlns="http://www.w3.org/2000/svg"
             className="schedulerDay" 
             viewBox={viewBox}>
             <pattern id="Pattern" x="10" y="10" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d='M0 0L8 8ZM8 0L0 8Z' className="hashLines" />
             </pattern>
             <rect x="0" y="0" height={this.state.height} width={this.state.width + this.state.leftMargin} className="dayBackground" />
             <SchedulerGrid width={this.state.width} height={this.state.height} leftMargin={this.state.leftMargin}
                            start={this.state.start} ref="Grid" locationList={this.state.locationList}
                            locations={this.props.locations} mySlots={this.state.mySlots} day={this.props.day} />
        </svg>
        {scheduledSessions}
      </div>
    );
  },

  componentDidMount: function() {
  },

  sessionPlace: function(session) {
    var el = session.getDOMNode();
    var key = 'slot' + $(el).data('slotid');
    if (!$(el).data('plenary')) {
      key += 'x' + $(el).data('locationid');
    }
    this.refs.Grid.placeElement(el, key);
  }

});

module.exports = SchedulerDay;
