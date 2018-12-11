var ScheduleDay = require("./ScheduleDay.jsx");

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.resources = ConnectConference.modules[props.moduleId].resources;
    this.service = ConnectConference.modules[props.moduleId].service;
    var locationList = {};
    for (var i = 0; i < props.locations.length; i++) {
      locationList[props.locations[i].LocationId] = i;
    }
    var slotList = {};
    for (var j = 0; j < props.slots.length; j++) {
      slotList[props.slots[j].SlotId] = props.slots[j];
    }
    this.state = {
      sessionList: props.sessions,
      locationList: locationList,
      slotList: slotList
    };
  }

  render() {
    var scheduleDays = [];
    for (var i = 1; i <= this.props.nrDays; i++) {
      var daySlots = [];
      for (var j = 0; j < this.props.slots.length; j++) {
        var slot = this.props.slots[j];
        if ((slot.DayNr == undefined) | (slot.DayNr == i)) {
          daySlots.push(slot);
        }
      }
      scheduleDays.push(
        <ScheduleDay
          conference={this.props.conference}
          day={i}
          slots={daySlots}
          start={Math.floor(daySlots[0].StartMinutes / 60) * 60 - 60}
          finish={
            120 +
            Math.floor(daySlots[daySlots.length - 1].StartMinutes / 60) * 60
          }
          locationList={this.state.locationList}
          leftMargin={50}
          sessionList={this.state.sessionList}
          locations={this.props.locations}
          slotList={this.state.slotList}
        />
      );
    }
    return (
      <div className="row Scheduler">
        <div className="col-xs-12" ref="scheduleColumn">
          {scheduleDays}
        </div>
      </div>
    );
  }

  componentDidMount() {
    $(document).ready(
      function() {
        $('[data-toggle="popover"]').popover({
          html: true,
          trigger: "hover",
          container: "body"
        });
        $("div.embedded").each(function(i, el) {
          $(el).height(
            $(el)
              .parent()
              .attr("height") - 12
          );
        });
      }.bind(this)
    );
  }
}
