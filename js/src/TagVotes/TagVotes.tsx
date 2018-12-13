import * as React from "react";
import * as Models from "../Models/";
import TagVote from "./TagVote";

interface ITagVotesProps {
  module: Models.IAppModule;
  conferenceId: number;
  voteList: Models.ITagWithVote[];
  allowVote: boolean;
  allowAdd: boolean;
}

interface ITagVotesState {
  votes: Models.ITagWithVote[];
  newTagName: string;
}

export default class TagVotes extends React.Component<
  ITagVotesProps,
  ITagVotesState
> {
  refs: {};

  constructor(props: ITagVotesProps) {
    super(props);
    props.voteList.sort(this.votesSort);
    this.state = {
      votes: props.voteList,
      newTagName: ""
    };
  }

  render() {
    var votes = this.state.votes.map(v => {
      return (
        <TagVote
          module={this.props.module}
          item={v}
          key={v.TagId}
          allowVote={this.props.allowVote}
          onVote={v => this.onVote(v)}
        />
      );
    });
    var voteCol = this.props.allowVote ? <th className="btncol" /> : null;
    var addRow = this.props.allowAdd ? (
      <tr>
        <td className="dnnFormItem">
          <input
            type="text"
            className="fullwidth"
            value={this.state.newTagName}
            onChange={e => this.setState({ newTagName: e.target.value })}
          />
        </td>
        <td />
        <td />
        <td className="btncol">
          <a
            href="#"
            className="btn btn-default"
            onClick={this.onAddTag}
            title={this.props.module.resources.Add}
          >
            <span className="glyphicon glyphicon-plus" />
          </a>
        </td>
      </tr>
    ) : null;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>{this.props.module.resources.Theme}</th>
            <th className="nrcol">{this.props.module.resources.Sessions}</th>
            <th className="nrcol">{this.props.module.resources.Votes}</th>
            {voteCol}
          </tr>
        </thead>
        <tbody>
          {votes}
          {addRow}
        </tbody>
      </table>
    );
  }

  onVote(tagVote: Models.ITagWithVote) {
    if (tagVote.Voted == 0) {
      this.props.module.service.tagVote(
        this.props.conferenceId,
        tagVote.TagId,
        1,
        () => {
          tagVote.Voted = 1;
          tagVote.NrVotes = tagVote.NrVotes ? tagVote.NrVotes + 1 : 1;
          this.voteChanged(tagVote);
        }
      );
    } else {
      this.props.module.service.tagVote(
        this.props.conferenceId,
        tagVote.TagId,
        0,
        () => {
          tagVote.Voted = 0;
          tagVote.NrVotes = tagVote.NrVotes ? tagVote.NrVotes - 1 : 0;
          this.voteChanged(tagVote);
        }
      );
    }
  }

  voteChanged(vote) {
    var newList = this.state.votes.map(v => {
      return v.TagId == vote.TagId ? vote : v;
    });
    newList.sort(this.votesSort);
    this.setState({
      votes: newList
    });
  }

  votesSort(a, b) {
    if (b.NrVotes - a.NrVotes == 0) {
      if (a.TagName < b.TagName) {
        return -1;
      } else if (a.TagName > b.TagName) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return b.NrVotes - a.NrVotes;
    }
  }

  onAddTag(e) {
    e.preventDefault();
    this.props.module.service.addTag(
      this.props.conferenceId,
      this.state.newTagName,
      data => {
        data.Voted = 0;
        var newList = this.state.votes;
        newList.push(data);
        newList.sort(this.votesSort);
        this.setState({
          votes: newList,
          newTagName: ""
        });
      }
    );
  }
}
