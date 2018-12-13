import * as React from "react";
import * as Models from "../Models/";

interface ISessionVoteProps {
  module: Models.IAppModule;
  allowVote: boolean;
  item: Models.ISessionWithVote;
  onVote: (s: Models.ISessionWithVote) => void;
}

const SessionVote: React.SFC<ISessionVoteProps> = props => {
  var voteCol = props.allowVote ? (
    <td className="btncol">
      <a
        href="#"
        className={props.item.Voted === 0 ? "btn btn-default":"btn btn-primary" }
        onClick={props.onVote.bind(null, props.item)}
        title={props.module.resources.Vote}
      >
        <span className="glyphicon glyphicon-thumbs-up" />
      </a>
    </td>
  ) : null;
  var speakers = props.item.Speakers.map(function(item) {
    return <span className="detailItem">{item.Value}</span>;
  });
  var tags = props.item.Tags.map(function(item) {
    return <span className="detailItem">{item.Value}</span>;
  });
  var rowStyle = {};
  if (props.item.BackgroundColor != "") {
    rowStyle = {
      backgroundColor: props.item.BackgroundColor
    };
  }
  var track =
    props.item.TrackTitle == undefined ? null : (
      <span
        className="glyphicon glyphicon-resize-vertical"
        title={props.module.resources.Track}
      />
    );
  var tagsIcon =
    tags.length == 0 ? null : (
      <span
        className="glyphicon glyphicon-tags"
        title={props.module.resources.Tags}
      />
    );
  return (
    <tr style={rowStyle}>
      <td>
        <p>{props.item.Title}</p>
        <p className="itemDetails">
          <span
            className="glyphicon glyphicon-user"
            title={props.module.resources.Speakers}
          />
          {speakers}
        </p>
        <p className="itemDetails">
          {track}
          {props.item.TrackTitle}
          <span
            className="glyphicon glyphicon-paperclip"
            title={props.module.resources.Resources}
          />
          {props.item.NrResources}
          {tagsIcon}
          {tags}
        </p>
      </td>
      <td className="nrcol">{props.item.NrVotes}</td>
      {voteCol}
    </tr>
  );
};

export default SessionVote;
