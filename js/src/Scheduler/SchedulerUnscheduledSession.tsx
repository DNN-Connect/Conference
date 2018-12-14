import * as React from 'react';
import * as Models from '../Models/';

interface ISchedulerUnscheduledSessionProps {
  session: Models.ISession;
};

const SchedulerUnscheduledSession: React.SFC<ISchedulerUnscheduledSessionProps> = props => {
  var speakers = props.session.Speakers.map((item) => {
    return <span className="speaker" key={item.Key}>{item.Value}</span>;
  });
  var divStyle = {
    backgroundColor: props.session.BackgroundColor
  };
  return (
    <div
      className="panel panel-default session"
      data-slotkey=""
      data-orig-x="0"
      data-orig-y="0"
      data-sessionid={props.session.SessionId}
      data-plenary={props.session.IsPlenary}
      style={divStyle}
    >
      <div className="panel-body">
        <div className="speakers">{speakers}</div>
        {props.session.Title}
      </div>
    </div>
  );}

export default SchedulerUnscheduledSession;
