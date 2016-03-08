var TagVote = require('./TagVote.jsx');

module.exports = React.createClass({

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    this.props.voteList.sort(this.votesSort);
    return {
      votes: this.props.voteList
    }
  },

  render: function() {
    var votes = this.state.votes.map(function(item) {
      return <TagVote moduleId={this.props.moduleId} item={item} key={item.TagId} allowVote={this.props.allowVote} onVote={this.onVote} />
    }.bind(this));
    var voteCol = null;
    if (this.props.allowVote) {
      voteCol = <th className="btncol" />
    }
    var addRow = null;
    if (this.props.allowAdd) {
      addRow = (
        <tr>
          <td className="dnnFormItem">
           <input type="text" className="fullwidth" ref="newTagName" />
          </td>
          <td /><td />
          <td className="btncol">
            <a href="#" className="btn btn-default" onClick={this.onAddTag}
               title={this.resources.Add}>
             <span className="glyphicon glyphicon-plus"></span>
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
       <tbody>{votes}{addRow}</tbody>
      </table>
    );
  },

  componentDidMount: function() {},

  onVote: function(tagVote, e) {
    e.preventDefault();
    if (tagVote.Voted == 0) {
      this.service.tagVote(this.props.conferenceId, tagVote.TagId, 1, function() {
        tagVote.Voted = 1;
        tagVote.NrVotes += 1;
        this.voteChanged(tagVote);
      }.bind(this));
    } else {
      this.service.tagVote(this.props.conferenceId, tagVote.TagId, 0, function() {
        tagVote.Voted = 0;
        tagVote.NrVotes -= 1;
        this.voteChanged(tagVote);
      }.bind(this));
    }
  },

  voteChanged: function(vote) {
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
  },

  votesSort: function(a, b) {
    if (b.NrVotes - a.NrVotes == 0) {
      if (a.TagName < b.TagName) {
        return -1;
      } else if (a.TagName > b.TagName) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return (b.NrVotes - a.NrVotes);
    }
  },

  onAddTag: function(e) {
    e.preventDefault();
    this.service.addTag(this.props.conferenceId, this.refs.newTagName.getDOMNode().value, function(data) {
      this.refs.newTagName.getDOMNode().value = '';
      data.Voted = 0;
      var newList = this.state.votes;
      newList.push(data);
      newList.sort(this.votesSort);
      this.setState({
        votes: newList
      });
    }.bind(this));
  }

});
