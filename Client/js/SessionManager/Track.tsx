import * as React from "react";
import * as Models from "../Models/";

interface ITrackProps {
  session: Models.ISession;
  tracks: Models.ITrack[];
  changeTrack: (session: Models.ISession, track: Models.ITrack) => void;
}

const Track: React.SFC<ITrackProps> = props => {
  var btnClass = "";
  var btnText = "";
  var options: JSX.Element[] = [];
  var btnStyle: React.CSSProperties = {};
  var trackId = props.session.TrackId == null ? -1 : props.session.TrackId;
  for (var i = 0; i < props.tracks.length; i++) {
    var opt = props.tracks[i];
    if (opt.TrackId == trackId) {
      btnClass = "default";
      btnText = opt.Title;
      btnStyle = {
        backgroundColor: opt.BackgroundColor
      };
    } else {
      options.push(
        <li>
          <a
            href="#"
            data-id={opt.TrackId}
            onClick={e => {
              e.preventDefault();
              props.changeTrack(props.session, opt);
            }}
          >
            {opt.Title}
          </a>
        </li>
      );
    }
  }
  return (
    <div className="btn-group">
      <button
        type="button"
        className={"btn btn-sm btn-" + btnClass}
        style={btnStyle}
      >
        {btnText}
      </button>
      <button
        type="button"
        className={"btn btn-sm btn-" + btnClass + " dropdown-toggle"}
        style={btnStyle}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        &nbsp;
        <span className="caret" />
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu">{options}</ul>
    </div>
  );
};

export default Track;
