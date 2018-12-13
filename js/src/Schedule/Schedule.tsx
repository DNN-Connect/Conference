import * as React from "react";
import * as Models from "../Models/";
import ScheduleDay from "./ScheduleDay";

interface IScheduleProps {
  module: Models.IAppModule;
  conference: Models.IConference;
  locations: Models.ILocation[];
  slots: Models.ISlot[];
  sessions: Models.ISession[];
  nrDays: number;
  gridHeight: number;
}

interface IScheduleState {
  sessionList: Models.ISession[];
  locationList: object;
  slotList: object;
}

export default class Schedule extends React.Component<
  IScheduleProps,
  IScheduleState
> {
  refs: {};

  constructor(props: IScheduleProps) {
    super(props);
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
    var scheduleDays: JSX.Element[] = [];
    for (var i = 1; i <= this.props.nrDays; i++) {
      var daySlots: Models.ISlot[] = [];
      for (var j = 0; j < this.props.slots.length; j++) {
        var slot = this.props.slots[j];
        if (slot.DayNr === undefined || slot.DayNr === i) {
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
        ($('[data-toggle="popover"]') as any).popover({
          html: true,
          trigger: "hover",
          container: "body"
        });
        $("div.embedded").each((i, el) => {
          $(el).height(
            parseInt(
              $(el)
                .parent()
                .attr("height") || "0"
            ) - 12
          );
        });
      }.bind(this)
    );
  }
}
