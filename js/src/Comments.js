/** @jsx React.DOM */
var CommentList = require('./CommentList');

var Comments = React.createClass({

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
      comments: this.props.comments
    }
  },

  render: function() {
    return (
      <div className="detailBox">
          <div className="titleBox">
            <label>{this.resources.Comments}</label>
          </div>
          <div className="commentBox">        
            <p className="taskDescription">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className="actionBox">
            <CommentList moduleId={this.props.moduleId} comments={this.state.comments} />
            <div className="form-inline" role="form">
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Your comments" ref="txtComment" />
              </div>
              <div className="form-group">
                <button className="btn btn-default" ref="cmdAdd" onClick={this.addComment}>Add</button>
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
        comments: newComments
      });
    }.bind(this));
    return false;
  }


});

module.exports = Comments;
