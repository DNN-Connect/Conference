import * as React from "react";
import * as Models from "../Models/";
import Comment from "./Comment";
import { linkState } from "../LinkState";

interface ICommentsProps {
  module: Models.IAppModule;
  conferenceId: number;
  sessionId: number;
  visibility: number;
  pollingSeconds?: number;
  comments: Models.IComment[];
  pageSize: number;
  totalComments: number;
  loggedIn: boolean;
  appPath: string;
  title: string;
  help: string;
}

interface ICommentsState {
  comments: Models.IComment[];
  commentCount: number;
  canLoadMore: boolean;
  lastPage: number;
  pollingInterval: number;
  lastCheck: Date;
  newComment: Models.IComment;
}

export default class Comments extends React.Component<
  ICommentsProps,
  ICommentsState
> {
  constructor(props: ICommentsProps) {
    super(props);
    var pollingInterval = 30000;
    if (props.pollingSeconds !== undefined) {
      pollingInterval = props.pollingSeconds * 1000;
    }
    this.state = {
      comments: props.comments,
      commentCount: props.totalComments,
      canLoadMore: props.totalComments > props.comments.length ? true : false,
      lastPage: 0,
      pollingInterval: pollingInterval,
      lastCheck: new Date(),
      newComment: new Models.Comment()
    };
  }

  render() {
    var submitPanel = <div />;
    var commentList = this.state.comments.map(item => {
      return (
        <Comment
          module={this.props.module}
          comment={item}
          key={item.CommentId}
          appPath={this.props.appPath}
          onDeleteComment={id => this.onCommentDelete(id)}
        />
      );
    });
    if (this.props.loggedIn) {
      submitPanel = (
        <div className="panel-form">
          <div>
            <textarea
              className="form-control"
              value={this.state.newComment.Remarks}
              onChange={linkState(this, "newComment", "Remarks")}
              placeholder={this.props.help}
            />
          </div>
          <div className="panel-form-button">
            <button
              className="btn btn-primary"
              ref="cmdAdd"
              onClick={this.addComment}
            >
              {this.props.module.resources.AddComment}
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
              <button
                className="btn btn-primary btn-sm btn-block"
                role="button"
                onClick={e => this.loadMoreComments(e)}
                ref="cmdMore"
                disabled={!this.state.canLoadMore}
              >
                <span className="glyphicon glyphicon-refresh" />{" "}
                {this.props.module.resources.More}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.pollServer();
  }

  addComment(e) {
    e.preventDefault();
    var comment = this.state.newComment.Remarks;
    this.props.module.service.addComment(
      this.props.conferenceId,
      this.props.sessionId,
      this.props.visibility,
      comment,
      data => {
        var newComments = this.state.comments;
        newComments.unshift(data);
        this.setState({
          comments: newComments,
          commentCount: this.state.commentCount + 1,
          newComment: new Models.Comment()
        });
      }
    );
    return false;
  }

  loadMoreComments(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (this.state.canLoadMore) {
      this.props.module.service.loadComments(
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

  onCommentDelete(commentId) {
    this.props.module.service.deleteComment(
      this.props.conferenceId,
      commentId,
      () => {
        var newCommentList: Models.IComment[] = [];
        for (var i = 0; i < this.state.comments.length; i++) {
          if (this.state.comments[i].CommentId != commentId) {
            newCommentList.push(this.state.comments[i]);
          }
        }
        this.setState({
          comments: newCommentList,
          commentCount: this.state.commentCount - 1
        });
      }
    );
  }

  pollServer() {
    setTimeout(() => {
      this.props.module.service.checkNewComments(
        this.props.conferenceId,
        this.props.sessionId,
        this.props.visibility,
        this.state.lastCheck,
        data => {
          if (data.Comments.length > 0) {
            var newCommentList = data.Comments;
            for (var i = 0; i < this.state.comments.length; i++) {
              if ($.inArray(this.state.comments[i], newCommentList) == -1) {
                newCommentList.push(this.state.comments[i]);
              }
            }
          }
          this.setState({
            lastCheck: new Date(data.CheckTime)
          });
          this.pollServer();
        }
      );
    }, this.state.pollingInterval);
  }
}
