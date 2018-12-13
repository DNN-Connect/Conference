import * as React from "react";
import * as Models from "../Models/";
import Status from "./Status";
import Track from "./Track";

interface ISessionProps {
  session: Models.ISession;
  tracks: Models.ITrack[];
  statusOptions: Models.ISwitchButtonOption[];
  changeTrack: (session: Models.ISession, track: Models.ITrack) => void;
  changeStatus: (
    session: Models.ISession,
    status: Models.ISwitchButtonOption
  ) => void;
}

const Session: React.SFC<ISessionProps> = props => {
  var speakers = props.session.Speakers.map(item => {
    return item.Value;
  });
  return (
    <tr>
      <td>
        <div
          className="sessionTitle"
          onClick={e => {
            $("#abstract" + props.session.SessionId.toString()).toggleClass(
              "sessionAbstract"
            );
          }}
        >
          {props.session.Title}
          <br />
          <span className="details">{speakers.join(", ")}</span>
          <br />
        </div>
        <div
          className="details sessionAbstract"
          id={"abstract" + props.session.SessionId.toString()}
          dangerouslySetInnerHTML={{
            __html:
              props.session.Description == null
                ? ""
                : props.session.Description.replace(/(?:\r\n|\r|\n)/g, "<br />")
          }}
        />
      </td>
      <td className="text-right">{props.session.NrVotes}</td>
      <td className="text-right">
        <Status
          options={props.statusOptions}
          session={props.session}
          key={"status" + props.session.SessionId}
          changeStatus={(se, st) => props.changeStatus(se, st)}
        />
      </td>
      <td className="text-right">
        <Track
          tracks={props.tracks}
          session={props.session}
          key={"track" + props.session.SessionId}
          changeTrack={(s, t) => props.changeTrack(s, t)}
        />
      </td>
    </tr>
  );
};

export default Session;
