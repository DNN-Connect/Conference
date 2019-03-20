import * as React from "react";
import * as moment from "moment";
import * as Models from "../Models/";

interface ISessionProps {
  session: Models.ISession;
  attendees: Models.ISessionAttendee[];
}

const Session: React.SFC<ISessionProps> = props => {
  var attendees: JSX.Element | null = null;
  if (props.attendees.length != 0) {
    var attendeeList = props.attendees.map(item => {
      return <p>{item.SessionAttendeeName}</p>;
    });
    attendees = (
      <div className="attendees">
        <h4>Attending</h4>
        {attendeeList}
      </div>
    );
  }
  var start = moment(props.session.SessionDateAndTime);
  var end = moment(props.session.SessionEnd);
  var speakers = props.session.Speakers.map(item => {
    return <span>{item.Value}</span>;
  });
  var subtitle =
    props.session.SubTitle == null ? null : (
      <div className="subTitle">{props.session.SubTitle}</div>
    );
  var style1 = {
    borderColor: props.session.BackgroundColor
  };
  var style2 = {
    backgroundColor: props.session.BackgroundColor,
    borderColor: props.session.BackgroundColor
  };
  var style3 = {
    borderTopColor: props.session.BackgroundColor,
    borderBottomColor: props.session.BackgroundColor
  };
  return (
    <div className="session">
      <div className="panel panel-default" style={style1}>
        <div className="panel-heading" style={style2}>
          <span className="glyphicon glyphicon-time" />
          &nbsp;
          <span className="time">{start.format("H:mm")}</span>&nbsp;-&nbsp;
          <span className="time">{end.format("H:mm")}</span>
          <span className="pull-right headSub">{start.fromNow()}</span>
        </div>
        <div className="panel-body" style={style3}>
          <div className="sessionTitle">
            {props.session.Title}
            {subtitle}
          </div>
          <div className="speakers">{speakers}</div>
          {attendees}
        </div>
      </div>
    </div>
  );
};

export default Session;
