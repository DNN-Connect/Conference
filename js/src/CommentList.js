/** @jsx React.DOM */
var Comment = require('./Comment');

var CommentList = React.createClass({

  resources: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {
      comments: this.props.comments
    }
  },

  render: function() {
    var commentItems = this.props.comments.map(function(item) {
      return <Comment moduleId={this.props.moduleId} comment={item} key={item.CommentId} 
                      appPath={this.props.appPath} onDelete={this.props.onCommentDelete} />
    }.bind(this));
    return (
      <ul className="list-group">
       {commentItems}
      </ul>
    );
  }

});

module.exports = CommentList;
