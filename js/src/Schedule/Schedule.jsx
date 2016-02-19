var ScheduleDay = require('./ScheduleDay.jsx');

var Schedule = React.createClass({

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    var locationList = {};
    for (i=0;i<this.props.locations.length;i++)
    {
      locationList[this.props.locations[i].LocationId] = i;
    }
    var slotList = {};
    for (j=0;j<this.props.slots.length;j++)
    {
      slotList[this.props.slots[j].SlotId] = this.props.slots[j];
    }
    return {
      sessionList: this.props.sessions,
      locationList: locationList,
      slotList: slotList
    }
  },

  render: function() {
    var scheduleDays = [];
    for (i = 1; i <= this.props.nrDays; i++) {
      var daySlots = [];
      for (j=0;j<this.props.slots.length;j++)
      {
        var slot = this.props.slots[j];
        if (slot.DayNr == undefined | slot.DayNr == i)
        {
          daySlots.push(slot);
        }
      }
      scheduleDays.push(
        <ScheduleDay conference={this.props.conference} day={i} slots={daySlots} 
           start={Math.floor(daySlots[0].StartMinutes/60) * 60 - 60}
           finish={120 + Math.floor(daySlots[daySlots.length - 1].StartMinutes / 60) * 60}
           locationList={this.state.locationList} 
           leftMargin={50}
           sessionList={this.state.sessionList}
           locations={this.props.locations}
           slotList={this.state.slotList} />
        );
    }
    return (
      <div className="row Scheduler">
        <div className="col-xs-12" ref="scheduleColumn">
          {scheduleDays}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      $('[data-toggle="popover"]').popover({html:true, trigger: 'hover', container: 'body'});
      $('div.embedded').each(function(i, el) {
        $(el).height($(el).parent().attr('height') - 12);
      })
    }.bind(this));
  }

});

module.exports = Schedule;
