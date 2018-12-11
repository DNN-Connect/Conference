var TagVote = require("./TagVote.jsx");

export default class TagVotes extends React.Component {
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
          <TagVote
            moduleId={this.props.moduleId}
            item={item}
            key={item.TagId}
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
    var addRow = null;
    if (this.props.allowAdd) {
      addRow = (
        <tr>
          <td className="dnnFormItem">
            <input type="text" className="fullwidth" ref="newTagName" />
          </td>
          <td />
          <td />
          <td className="btncol">
            <a
              href="#"
              className="btn btn-default"
              onClick={this.onAddTag}
              title={this.resources.Add}
            >
              <span className="glyphicon glyphicon-plus" />
            </a>
          </td>
        </tr>
      );
    }
    return (
      <table className="table">
        <thead>
          <tr>
            <th>{this.resources.Theme}</th>
            <th className="nrcol">{this.resources.Sessions}</th>
            <th className="nrcol">{this.resources.Votes}</th>
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

  componentDidMount() {}

  onVote(tagVote, e) {
    e.preventDefault();
    if (tagVote.Voted == 0) {
      this.service.tagVote(
        this.props.conferenceId,
        tagVote.TagId,
        1,
        function() {
          tagVote.Voted = 1;
          tagVote.NrVotes += 1;
          this.voteChanged(tagVote);
        }.bind(this)
      );
    } else {
      this.service.tagVote(
        this.props.conferenceId,
        tagVote.TagId,
        0,
        function() {
          tagVote.Voted = 0;
          tagVote.NrVotes -= 1;
          this.voteChanged(tagVote);
        }.bind(this)
      );
    }
  }

  voteChanged(vote) {
    var newList = [];
    for (var i = 0; i < this.state.votes.length; i++) {
      if (this.state.votes[i].TagId == vote.TagId) {
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
    this.service.addTag(
      this.props.conferenceId,
      this.refs.newTagName.getDOMNode().value,
      function(data) {
        this.refs.newTagName.getDOMNode().value = "";
        data.Voted = 0;
        var newList = this.state.votes;
        newList.push(data);
        newList.sort(this.votesSort);
        this.setState({
          votes: newList
        });
      }.bind(this)
    );
  }
}
