import * as React from "react";
import * as moment from "moment";
import * as Models from "../Models/";

interface ICommentProps {
  module: Models.IAppModule;
  appPath: string;
  comment: Models.IComment;
  onDeleteComment: (commentId: number) => void;
}

const Comment: React.SFC<ICommentProps> = props => {
  var imgUrl =
    props.appPath +
    "/DnnImageHandler.ashx?mode=profilepic&w=64&h=64&userId=" +
    props.comment.UserId;
  var actionBar: JSX.Element | null = null;
  if (
    props.module.security.CanManage ||
    props.module.security.UserId === props.comment.UserId
  ) {
    actionBar = (
      <div className="action">
        <button
          type="button"
          className="btn btn-danger btn-xs"
          title={props.module.resources.Delete}
          onClick={e => {
            e.preventDefault();
            if (confirm(props.module.resources.CommentDeleteConfirm)) {
              props.onDeleteComment(props.comment.CommentId);
            }
          }}
          data-id={props.comment.CommentId}
        >
          <span className="glyphicon glyphicon-trash" />
        </button>
      </div>
    );
  }
  var time = moment(props.comment.Datime);
  var strTime = time.fromNow();
  if (moment().diff(time, "months", true) > 1) {
    strTime = time.format("LLL");
  }
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="img-col">
          <img src={imgUrl} className="img-circle img-responsive" alt="" />
        </div>
        <div className="comment-col">
          <div className="comment-details">
            {props.comment.DisplayName}&nbsp;
            {strTime}
          </div>
          <div className="comment-text">{props.comment.Remarks}</div>
          {actionBar}
        </div>
      </div>
    </li>
  );
};

export default Comment;
