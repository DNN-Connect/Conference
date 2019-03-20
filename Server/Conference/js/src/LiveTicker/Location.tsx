import * as React from "react";
import * as Models from "../Models/";
import Session from "./Session";

interface ILocationProps {
  module: Models.IAppModule;
  data: {
    Sessions: Models.IKeyedCollection<Models.ISession>;
    Attendees: Models.IKeyedCollection<Models.ISessionAttendee>;
  };
  location: Models.ILocation;
  colSize: number;
}

const Location: React.SFC<ILocationProps> = props => {
  var sessionList = props.data.Sessions[props.location.LocationId];
  var sessions: JSX.Element[] = [];
  if (sessionList != undefined) {
    sessions = sessionList.map(item => {
      return (
        <Session
          session={item}
          attendees={props.data.Attendees[item.SessionId]}
        />
      );
    });
  }
  return (
    <div className={"col-md-" + props.colSize + " col-xs-12"}>
      <h2>{props.location.Name}</h2>
      {sessions}
    </div>
  );
};

export default Location;
