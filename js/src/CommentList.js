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
      return <Comment moduleId={this.props.moduleId} comment={item} key={item.CommentId} />
    }.bind(this));
    return (
      <ul className="commentList">
       {commentItems}
      </ul>
    );
  }

});

module.exports = CommentList;
