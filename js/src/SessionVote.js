/** @jsx React.DOM */
var SessionVote = React.createClass({

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
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
    <a href="#" className={btnClasses} onClick={this.props.onVote.bind(null, this.props.item)}
       title={this.resources.Vote}>
     <span className="glyphicon glyphicon-thumbs-up"></span>
    </a>
   </td>
        )
    }
    var speakers = this.props.item.Speakers.map(function (item) {
      return (
        <span className="detailItem bg-info">{item.Value}</span>
        )
    });
    var tags = this.props.item.Tags.map(function (item) {
      return (
        <span className="detailItem bg-info">{item.Value}</span>
        )
    });
    return (
      <tr>
       <td><p><a href={window.sessionDetailUrl.replace('-1', this.props.item.SessionId.toString())}>{this.props.item.Title}</a></p>
        <p className="itemDetails">
        <span className="glyphicon glyphicon-user"></span>{speakers}
        <span className="glyphicon glyphicon-tags"></span>{tags}
        <span className="glyphicon glyphicon-paperclip"></span>{this.props.item.NrResources}
        </p>
       </td>
       <td className="nrcol">{this.props.item.NrVotes}</td>
       {voteCol}
      </tr>
    );
  },

  componentDidMount: function() {
  }

});

module.exports = SessionVote;