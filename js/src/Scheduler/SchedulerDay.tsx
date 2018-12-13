import * as React from 'react';
import * as Models from '../Models/';
import SchedulerScheduledSession from './SchedulerScheduledSession';
import SchedulerGrid from './SchedulerGrid';

interface ISchedulerDayProps {
    locations: Models.ILocation[];
    locationList: object;
    slots: Models.ISlot[];
    sessionList: Models.ISession[];
    start: number;
    finish: number;
    leftMargin: number;
    day: number;
    sessionPlace: any;
    selectedTab: number;
};

const SchedulerDay: React.SFC<ISchedulerDayProps> = props => {
  var height = props.finish - props.start;
  var width = props.locations.length * 100;
  var viewBox =
    "0 0 " + (width + props.leftMargin).toString() + " " + height;
  var scheduledSessions: JSX.Element[] = [];
  for (var i = 0; i < props.sessionList.length; i++) {
    var session = props.sessionList[i];
    if ((session.DayNr === props.day) && (session.SlotId > 0)) {
      scheduledSessions.push(
        <SchedulerScheduledSession
          session={session}
          sessionPlace={props.sessionPlace}
        />
      );
    }
  }
  var panelClass =
    props.day == props.selectedTab
      ? "tab-pane active schedulePane"
      : "tab-pane schedulePane";
  return (
    <div className={panelClass}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="schedulerDay"
        viewBox={viewBox}
      >
        <pattern
          id="Pattern"
          x="10"
          y="10"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 0L8 8ZM8 0L0 8Z" className="hashLines" />
        </pattern>
        <rect
          x="0"
          y="0"
          height={height}
          width={width + props.leftMargin}
          className="dayBackground"
        />
        <SchedulerGrid
          width={width}
          height={height}
          leftMargin={props.leftMargin}
          start={props.start}
          locationList={props.locationList}
          locations={props.locations}
          slots={props.slots}
          day={props.day}
        />
      </svg>
      {scheduledSessions}
    </div>
  );}

export default SchedulerDay;

