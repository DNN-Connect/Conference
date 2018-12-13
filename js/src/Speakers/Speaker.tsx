import * as React from "react";
import * as Models from "../Models/";

interface ISpeakerProps {
  module: Models.IAppModule;
  speaker: Models.ISessionSpeaker;
  onDelete: (speaker: Models.ISessionSpeaker) => void;
}

const Speaker: React.SFC<ISpeakerProps> = props => {
  return (
    <tr className="sortable" data-id={props.speaker.SpeakerId}>
      <td>{props.speaker.DisplayName}</td>
      <td className="btncol">
        <a
          href="#"
          className="btn btn-default"
          onClick={e => {
            e.preventDefault();
            if (confirm(props.module.resources.SpeakerDeleteConfirm)) {
              props.onDelete(props.speaker);
            }
          }}
          title={props.module.resources.Delete}
        >
          <span className="glyphicon glyphicon-remove" />
        </a>
      </td>
    </tr>
  );
};

export default Speaker;
