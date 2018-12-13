import * as React from "react";
import * as Models from "../Models/";

interface IScheduleScheduledSessionProps {
  session: Models.ISession;
}

const ScheduleScheduledSession: React.SFC<
  IScheduleScheduledSessionProps
> = props => {
  var speakers = props.session.Speakers.map(function(item) {
    return <span className="speaker">{item.Value}</span>;
  });
  var speakerList = "<br/>";
  props.session.Speakers.forEach(function(el) {
    speakerList += '<span class="speaker">' + el.Value + "</span>";
  });
  var divStyle = {
    backgroundColor: props.session.BackgroundColor
  };
  return (
    <div
      className="panel panel-default session scheduled embedded"
      data-slotid={props.session.SlotId}
      data-locationid={props.session.LocationId}
      data-plenary={props.session.IsPlenary}
      ref="Session"
      data-sessionid={props.session.SessionId}
      data-day={props.session.DayNr}
      data-toggle="popover"
      title={props.session.Title}
      data-content={props.session.Description + speakerList}
      style={divStyle}
    >
      <div className="panel-body">
        <div className="speakers">{speakers}</div>
        {props.session.Title}
      </div>
    </div>
  );
};

export default ScheduleScheduledSession;
