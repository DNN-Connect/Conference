import * as React from "react";
import * as Models from "../Models/";

interface ITagVoteProps {
  module: Models.IAppModule;
  allowVote: boolean;
  item: Models.ITagWithVote;
  onVote: (itm: Models.ITagWithVote) => void;
}

const TagVote: React.SFC<ITagVoteProps> = props => {
  var voteCol: JSX.Element | null = null;
  if (props.allowVote) {
    var btnClasses = "btn";
    if (props.item.Voted == 0) {
      btnClasses += " btn-default";
    } else {
      btnClasses += " btn-primary";
    }
    voteCol = (
      <td className="btncol">
        <a
          href="#"
          className={btnClasses}
          onClick={e => {
            e.preventDefault();
            props.onVote(props.item);
          }}
          title={props.module.resources.Vote}
        >
          <span className="glyphicon glyphicon-thumbs-up" />
        </a>
      </td>
    );
  }
  return (
    <tr>
      <td>{props.item.TagName}</td>
      <td className="nrcol">
        {props.item.NrSessions}
      </td>
      <td className="nrcol">{props.item.NrVotes}</td>
      {voteCol}
    </tr>
  );
};

export default TagVote;
