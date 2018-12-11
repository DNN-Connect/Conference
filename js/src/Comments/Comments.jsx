var Comment = require("./Comment.jsx");

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.resources = ConnectConference.modules[props.moduleId].resources;
    this.service = ConnectConference.modules[props.moduleId].service;
    if (props.pollingSeconds == undefined) {
      this.pollingInterval = 30000;
    } else {
      this.pollingInterval = props.pollingSeconds * 1000;
    }
    this.state = {
      comments: props.comments,
      commentCount: props.totalComments,
      canLoadMore: props.totalComments > props.comments.length ? true : false,
      lastPage: 0
    };
  }

  render() {
    var submitPanel = <div />;
    var commentList = this.state.comments.map(item => {
      return (
        <Comment
          moduleId={this.props.moduleId}
          comment={item}
          key={item.CommentId}
          appPath={this.props.appPath}
          onDelete={this.onCommentDelete}
        />
      );
    });
    if (this.props.loggedIn) {
      submitPanel = (
        <div className="panel-form">
          <div>
            <textarea
              className="form-control"
              ref="txtComment"
              placeholder={this.props.help}
            />
          </div>
          <div className="panel-form-button">
            <button
              className="btn btn-primary"
              ref="cmdAdd"
              onClick={this.addComment}
            >
              {this.resources.AddComment}
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default widget">
            <div className="panel-heading">
              <span className="glyphicon glyphicon-comment" />
              <h3 className="panel-title">{this.props.title}</h3>
              <span className="label label-info">
                {this.state.commentCount}
              </span>
            </div>
            {submitPanel}
            <div className="panel-body">
              <ul className="list-group">{commentList}</ul>
              <a
                href="#"
                className="btn btn-primary btn-sm btn-block"
                role="button"
                onClick={this.loadMoreComments}
                ref="cmdMore"
                disabled={!this.state.canLoadMore}
              >
                <span className="glyphicon glyphicon-refresh" />{" "}
                {this.resources.More}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.lastCheck = new Date();
    this.pollServer();
  }

  addComment(e) {
    e.preventDefault();
    var comment = this.refs.txtComment.getDOMNode().value;
    this.service.addComment(
      this.props.conferenceId,
      this.props.sessionId,
      this.props.visibility,
      comment,
      data => {
        this.refs.txtComment.getDOMNode().value = "";
        var newComments = this.state.comments;
        newComments.unshift(data);
        this.setState({
          comments: newComments,
          commentCount: this.state.commentCount + 1
        });
      }
    );
    return false;
  }

  loadMoreComments(e) {
    e.preventDefault();
    if (this.state.canLoadMore) {
      this.service.loadComments(
        this.props.conferenceId,
        this.props.sessionId,
        this.props.visibility,
        this.state.lastPage + 1,
        this.props.pageSize,
        data => {
          var newCommentList = this.state.comments;
          newCommentList = newCommentList.concat(data);
          this.setState({
            comments: newCommentList,
            lastPage: this.state.lastPage + 1,
            canLoadMore: data.length < this.props.pageSize ? false : true
          });
        }
      );
    }
  }

  onCommentDelete(commentId, e) {
    e.preventDefault();
    if (confirm(this.resources.CommentDeleteConfirm)) {
      this.service.deleteComment(this.props.conferenceId, commentId, () => {
        var newCommentList = [];
        for (var i = 0; i < this.state.comments.length; i++) {
          if (this.state.comments[i].CommentId != commentId) {
            newCommentList.push(this.state.comments[i]);
          }
        }
        this.setState({
          comments: newCommentList,
          commentCount: this.state.commentCount - 1
        });
      });
    }
  }

  pollServer() {
    setTimeout(
      function() {
        this.service.checkNewComments(
          this.props.conferenceId,
          this.props.sessionId,
          this.props.visibility,
          this.lastCheck,
          function(data) {
            this.lastCheck = new Date(data.CheckTime);
            if (data.Comments.length > 0) {
              var newCommentList = data.Comments;
              for (var i = 0; i < this.state.comments.length; i++) {
                if ($.inArray(this.state.comments[i], newCommentList) == -1) {
                  newCommentList.push(this.state.comments[i]);
                }
              }
              this.setState({
                comments: newCommentList,
                commentCount: data.NewTotalComments
              });
            }
            this.pollServer();
          }.bind(this)
        );
      }.bind(this),
      this.pollingInterval
    );
  }
}
