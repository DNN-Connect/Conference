var SessionVote = require("./SessionVote.jsx");

export default class SessionVotes extends React.Component {
  resources = null;
  service = null;

  constructor(props) {
    super(props);
    this.resources = ConnectConference.modules[props.moduleId].resources;
    this.service = ConnectConference.modules[props.moduleId].service;
    props.voteList.sort(this.votesSort);
    this.state = {
      votes: props.voteList
    };
  }

  render() {
    var votes = this.state.votes.map(
      function(item) {
        return (
          <SessionVote
            moduleId={this.props.moduleId}
            item={item}
            key={item.SessionId}
            allowVote={this.props.allowVote}
            onVote={this.onVote}
          />
        );
      }.bind(this)
    );
    var voteCol = null;
    if (this.props.allowVote) {
      voteCol = <th className="btncol" />;
    }
    return (
      <table className="table">
        <thead>
          <tr>
            <th>{this.resources.Session}</th>
            <th className="nrcol">{this.resources.Votes}</th>
            {voteCol}
          </tr>
        </thead>
        <tbody>{votes}</tbody>
      </table>
    );
  }

  onVote(sessionVote, e) {
    e.preventDefault();
    if (sessionVote.Voted == 0) {
      this.service.sessionVote(
        this.props.conferenceId,
        sessionVote.SessionId,
        1,
        function() {
          sessionVote.Voted = 1;
          sessionVote.NrVotes += 1;
          this.voteChanged(sessionVote);
        }.bind(this)
      );
    } else {
      this.service.sessionVote(
        this.props.conferenceId,
        sessionVote.SessionId,
        0,
        function() {
          sessionVote.Voted = 0;
          sessionVote.NrVotes -= 1;
          this.voteChanged(sessionVote);
        }.bind(this)
      );
    }
  }

  voteChanged(vote) {
    var newList = [];
    for (var i = 0; i < this.state.votes.length; i++) {
      if (this.state.votes[i].SessionId == vote.SessionId) {
        newList.push(vote);
      } else {
        newList.push(this.state.votes[i]);
      }
    }
    newList.sort(this.votesSort);
    this.setState({
      votes: newList
    });
  }

  votesSort(a, b) {
    if (b.NrVotes - a.NrVotes == 0) {
      if (a.Title < b.Title) {
        return -1;
      } else if (a.Title > b.Title) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return b.NrVotes - a.NrVotes;
    }
  }
}
