/** @jsx React.DOM */
var SchedulerGrid = require('./SchedulerGrid'),
    SchedulerScheduledSession = require('./SchedulerScheduledSession');

var SchedulerDay = React.createClass({

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
             <rect x="0" y="0" height={height} width={width + this.props.leftMargin} className="dayBackground" />
             <SchedulerGrid width={width} height={height} leftMargin={this.props.leftMargin}
                            start={this.props.start} ref="Grid" locationList={this.props.locationList}
                            locations={this.props.locations} slots={this.props.slots} day={this.props.day} />
        </svg>
        {scheduledSessions}
      </div>
    );
  },

  componentDidMount: function() {
  },

  sessionPlace: function(session) {
    var jqSession = $(session);
    var sessionBox = session.getBoundingClientRect();
    var key = 'slot' + jqSession.data('day') + 'x' + jqSession.data('slotid');
    if (!jqSession.data('plenary')) {
      key += 'x' + jqSession.data('locationid');
    }
    var slot = document.getElementById(key);
    if (slot != null)
    {
      var jqSlot = $(slot);
      var slotBox = slot.getBoundingClientRect();
      jqSession.width(slotBox.width - 12);
      jqSession.height(slotBox.height - 12);
      moveObject(session,
        slotBox.left - sessionBox.left + 4,
        slotBox.top - sessionBox.top + 4);
      jqSession.attr('data-orig-x', slotBox.left - sessionBox.left + 4);
      jqSession.attr('data-orig-y', slotBox.top - sessionBox.top + 4);
      jqSession.attr('data-slotkey', slot.getAttribute('data-reactid'));
      slot.classList.remove('canDrop');
    }
  }

});

module.exports = SchedulerDay;
