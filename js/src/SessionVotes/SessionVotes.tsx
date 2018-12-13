import * as React from "react";
import * as Models from "../Models/";
import SessionVote from "./SessionVote";

interface ISessionVotesProps {
  module: Models.IAppModule;
  conferenceId: number;
  voteList: Models.ISessionWithVote[];
  allowVote: boolean;
}

interface ISessionVotesState {
  votes: Models.ISessionWithVote[];
}

export default class SessionVotes extends React.Component<
  ISessionVotesProps,
  ISessionVotesState
> {
  refs: {};

  constructor(props: ISessionVotesProps) {
    super(props);
    props.voteList.sort(this.votesSort);
    this.state = {
      votes: props.voteList
    };
  }

  render() {
    var votes = this.state.votes.map(item => {
      return (
        <SessionVote
          module={this.props.module}
          item={item}
          key={item.SessionId}
          allowVote={this.props.allowVote}
          onVote={s => this.onVote(s)}
        />
      );
    });
    var voteCol = this.props.allowVote ? <th className="btncol" /> : null;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>{this.props.module.resources.Session}</th>
            <th className="nrcol">{this.props.module.resources.Votes}</th>
            {voteCol}
          </tr>
        </thead>
        <tbody>{votes}</tbody>
      </table>
    );
  }

  onVote(sessionVote) {
    if (sessionVote.Voted == 0) {
      this.props.module.service.sessionVote(
        this.props.conferenceId,
        sessionVote.SessionId,
        1,
        () => {
          sessionVote.Voted = 1;
          sessionVote.NrVotes += 1;
          this.voteChanged(sessionVote);
        }
      );
    } else {
      this.props.module.service.sessionVote(
        this.props.conferenceId,
        sessionVote.SessionId,
        0,
        () => {
          sessionVote.Voted = 0;
          sessionVote.NrVotes -= 1;
          this.voteChanged(sessionVote);
        }
      );
    }
  }

  voteChanged(vote) {
    var newList = this.state.votes.map(v => {
      return v.SessionId === vote.SessionId ? vote : v;
    });
    newList.sort(this.votesSort);
    this.setState({
      votes: newList
    });
  }

  votesSort(a: Models.ISessionWithVote, b: Models.ISessionWithVote) {
    if ((b.NrVotes || 0) - (a.NrVotes || 0) == 0) {
      if (a.Title < b.Title) {
        return -1;
      } else if (a.Title > b.Title) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return (b.NrVotes || 0) - (a.NrVotes || 0);
    }
  }
}
