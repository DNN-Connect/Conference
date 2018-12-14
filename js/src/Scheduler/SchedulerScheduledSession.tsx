import * as React from "react";
import * as Models from "../Models/";

interface ISchedulerScheduledSessionProps {
  session: Models.ISession;
  sessionPlace: (s: HTMLElement) => void;
}

const SchedulerScheduledSession: React.SFC<
  ISchedulerScheduledSessionProps
> = props => {
  var speakers = props.session.Speakers.map(function(item) {
    return <span className="speaker" key={item.Key}>{item.Value}</span>;
  });
  var divStyle = {
    backgroundColor: props.session.BackgroundColor
  };
  return (
    <div
      className="panel panel-default session scheduled"
      data-slotid={props.session.SlotId}
      data-locationid={props.session.LocationId}
      data-plenary={props.session.IsPlenary}
      data-sessionid={props.session.SessionId}
      data-day={props.session.DayNr}
      style={divStyle}
    >
      <div className="panel-body">
        <div className="speakers">{speakers}</div>
        {props.session.Title}
      </div>
    </div>
  );
};

export default SchedulerScheduledSession;

// export  class SchedulerScheduledSessionasdfasdf extends React.Component {
//   componentDidMount() {
//     $(document).ready(
//       function() {
//         props.sessionPlace(this.refs.Session);
//       }.bind(this)
//     );
//   }

//   componentDidUpdate() {
//     props.sessionPlace(this.refs.Session);
//   }
// }
