import * as React from 'react';
import * as moment from 'moment';
import * as Models from '../Models/';
import ScheduleScheduledSession from './ScheduleScheduledSession';
import ScheduleGrid from './ScheduleGrid';

interface IScheduleDayProps {
    conference: Models.IConference;
    locations: Models.ILocation[];
    locationList: object;
    sessionList: Models.ISession[];
    slots: Models.ISlot[];
    slotList: object;
    day: number
    start: number;
    finish: number;
    leftMargin: number;
};

const ScheduleDay: React.SFC<IScheduleDayProps> = props => {
  var height = props.finish - props.start;
  var width = props.locations.length * 100;
  var viewBox =
    "0 0 " + (width + props.leftMargin).toString() + " " + height;
  var scheduledSessions: any[] = [];
  for (var i = 0; i < props.sessionList.length; i++) {
    var session = props.sessionList[i];
    if ((session.DayNr == props.day) && (session.SlotId > 0)) {
      var slot = props.slotList[session.SlotId];
      if (session.IsPlenary) {
        scheduledSessions.push(
          <foreignObject
            x={props.leftMargin}
            y={slot.StartMinutes - props.start}
            width={width}
            height={slot.DurationMins}
          >
            <ScheduleScheduledSession session={session} />
          </foreignObject>
        );
      } else {
        scheduledSessions.push(
          <foreignObject
            x={
              props.locationList[session.LocationId || 0] * 100 +
              props.leftMargin
            }
            y={slot.StartMinutes - props.start}
            width="100"
            height={slot.DurationMins}
          >
            <ScheduleScheduledSession session={session} />
          </foreignObject>
        );
      }
    }
  }
  var date = new Date(props.conference.StartDate || new Date());
  date = date.addDays(props.day - 1);
  var dateString = moment(date).format("dddd MMM Do");
  return (
    <div>
      <h2>{dateString}</h2>
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
        <ScheduleGrid
          width={width}
          height={height}
          leftMargin={props.leftMargin}
          start={props.start}
          locationList={props.locationList}
          locations={props.locations}
          slots={props.slots}
        />
        {scheduledSessions}
      </svg>
    </div>
  );}

export default ScheduleDay;

