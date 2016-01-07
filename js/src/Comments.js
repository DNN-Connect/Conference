/** @jsx React.DOM */
var CommentList = require('./CommentList');

var Comments = React.createClass({

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
      comments: this.props.comments,
      commentCount: 0
    }
  },

  render: function() {
    return (
      <div className="container">
       <div className="row">
        <div className="panel panel-default widget">
         <div className="panel-heading">
          <span className="glyphicon glyphicon-comment"></span>
          <h3 className="panel-title">{this.resources.Comments}</h3>
          <span className="label label-info">{this.state.commentCount}</span>
         </div>
         <div className="panel-form">
          <div>
           <textarea className="form-control" ref="txtComment" />
          </div>
          <div className="panel-form-button">
           <button className="btn btn-primary" ref="cmdAdd" onClick={this.addComment}>Add</button>
          </div>
         </div>
         <div className="panel-body">
          <CommentList moduleId={this.props.moduleId} comments={this.state.comments} />
          <a href="#" className="btn btn-primary btn-sm btn-block" role="button"><span className="glyphicon glyphicon-refresh"></span> More</a>
         </div>
        </div>
       </div>
      </div>
    );
  },

  addComment: function(e) {
    e.preventDefault();
    var comment = this.refs.txtComment.getDOMNode().value;
    this.service.addComment(this.props.conferenceId, this.props.sessionId, this.props.visibility, comment, function(data) {
      this.refs.txtComment.getDOMNode().value = '';
      var newComments = this.state.comments;
      newComments.unshift(data);
      this.setState({
        comments: newComments,
        commentCount: this.state.commentCount + 1
      });
    }.bind(this));
    return false;
  }


});

module.exports = Comments;
