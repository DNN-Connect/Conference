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
      commentCount: this.props.totalComments,
      canLoadMore: (this.props.totalComments > this.props.comments.length) ? true : false,
      lastPage: 0
    }
  },

  render: function() {
    var submitPanel = <div />;
    if (this.props.loggedIn) {
      submitPanel = (
        <div className="panel-form">
          <div>
           <textarea className="form-control" ref="txtComment" />
          </div>
          <div className="panel-form-button">
           <button className="btn btn-primary" ref="cmdAdd" onClick={this.addComment}>{this.resources.AddComment}</button>
          </div>
         </div>
      );
    }
    return (
      <div className="container">
       <div className="row">
        <div className="panel panel-default widget">
         <div className="panel-heading">
          <span className="glyphicon glyphicon-comment"></span>
          <h3 className="panel-title">{this.resources.Comments}</h3>
          <span className="label label-info">{this.state.commentCount}</span>
         </div>
         {submitPanel}
         <div className="panel-body">
          <CommentList moduleId={this.props.moduleId} comments={this.state.comments} 
                       appPath={this.props.appPath} onCommentDelete={this.onCommentDelete} />
          <a href="#" className="btn btn-primary btn-sm btn-block" role="button" 
             onClick={this.loadMoreComments} ref="cmdMore" disabled={!this.state.canLoadMore}>
             <span className="glyphicon glyphicon-refresh"></span> {this.resources.More}
          </a>
         </div>
        </div>
       </div>
      </div>
    );
  },

  componentDidMount: function() {},

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
  },

  loadMoreComments: function(e) {
    e.preventDefault();
    if (this.state.canLoadMore) {
      this.service.loadComments(this.props.conferenceId, this.props.sessionId, this.props.visibility, this.state.lastPage + 1, this.props.pageSize, function(data) {
        var newCommentList = this.state.comments;
        newCommentList = newCommentList.concat(data);
        this.setState({
          comments: newCommentList,
          lastPage: this.state.lastPage + 1,
          canLoadMore: (data.length < this.props.pageSize) ? false : true
        });
      }.bind(this));
    }
  },

  onCommentDelete: function(commentId, e) {
    e.preventDefault();
    if (confirm(this.resources.CommentDeleteConfirm)) {
      this.service.deleteComment(this.props.conferenceId, commentId, function() {
        var newCommentList = [];
        for (i = 0; i < this.state.comments.length; i++) {
          if (this.state.comments[i].CommentId != commentId) {
            newCommentList.push(this.state.comments[i]);
          }
        }
        this.setState({
          comments: newCommentList,
          commentCount: this.state.commentCount - 1
        });
      }.bind(this));
    }
  }


});

module.exports = Comments;
