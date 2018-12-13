import * as React from 'react';
import * as Models from '../Models/';
import { minutesToTime } from '../Common';

interface IScheduleGridProps {
    locations: Models.ILocation[];
    locationList: object;
    slots: Models.ISlot[];
    leftMargin: number;
    width: number;
    height: number;
    start: number;
};

const ScheduleGrid: React.SFC<IScheduleGridProps> = props => {
  var vertLines: JSX.Element[] = [];
  for (var i = props.leftMargin; i < props.width; i = i + 100) {
    vertLines.push(
      <line
        x1={i}
        y1="0"
        x2={i}
        y2={props.height}
        className="gridline"
      />
    );
  }
  var horLabels: JSX.Element[] = [];
  for (var i = 0; i < props.locations.length; i++) {
    horLabels.push(
      <text
        x={6 + i * 100 + props.leftMargin}
        y="20"
        className="gridLabel"
      >
        {props.locations[i].Name}
      </text>
    );
  }
  var horLines: JSX.Element[] = [];
  for (var i = 0; i < props.height; i = i + 60) {
    horLines.push(
      <line
        x1={props.leftMargin}
        y1={i}
        x2={props.width + props.leftMargin}
        y2={i}
        className="gridline"
      />
    );
  }
  var vertLabels: JSX.Element[] = [];
  for (var i = 60; i < props.height; i = i + 60) {
    vertLabels.push(
      <text x="6" y={i + 12} className="gridLabel">
        {minutesToTime(i + props.start)}
      </text>
    );
    horLines.push(
      <line x1="0" y1={i} x2={props.width} y2={i} className="gridline" />
    );
  }
  var slotBands: JSX.Element[] = [];
  for (var i = 0; i < props.slots.length; i++) {
    var slot = props.slots[i];
    if (slot.SlotType == 1) {
      slotBands.push(
        <foreignObject
          x={props.leftMargin}
          y={slot.StartMinutes - props.start}
          width={props.width}
          height={slot.DurationMins}
        >
          <div className="panel panel-default">
            <div className="panel-body embedded">{slot.Title}</div>
          </div>
        </foreignObject>
      );
    } else if (slot.SlotType == 2) {
      slotBands.push(
        <foreignObject
          x={
            props.locationList[slot.LocationId || 0] * 100 +
            props.leftMargin
          }
          y={slot.StartMinutes - props.start}
          width="100"
          height={slot.DurationMins}
        >
          <div className="panel panel-default">
            <div className="panel-body embedded">{slot.Title}</div>
          </div>
        </foreignObject>
      );
    }
  }
  return (
    <g>
      {vertLines}
      {horLines}
      {horLabels}
      {vertLabels}
      {slotBands}
    </g>
  );}

export default ScheduleGrid;

