/** @jsx React.DOM */
var TagVote = React.createClass({

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
    }
  },

  render: function() {
    var voteCol = null;
    if (this.props.allowVote) {
      var btnClasses = 'btn';
      if (this.props.item.Voted == 0) {
        btnClasses += ' btn-default';
      } else {
        btnClasses += ' btn-primary';         
      }
      voteCol = (
   <td className="btncol">
    <a href="#" className={btnClasses} onClick={this.props.onVote.bind(null, this.props.item)}>
     <span className="glyphicon glyphicon-thumbs-up"></span>
    </a>
   </td>
        )
    }
    return (
      <tr>
       <td>{this.props.item.TagName}</td>
       <td className="nrcol">{this.props.item.NrSessions}</td>
       <td className="nrcol">{this.props.item.NrVotes}</td>
       {voteCol}
      </tr>
    );
  },

  componentDidMount: function() {
  }

});

module.exports = TagVote;