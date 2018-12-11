export default class Comment extends React.Component {
  resources = null;
  security = null;

  constructor(props) {
    super(props);
    this.resources = ConnectConference.modules[props.moduleId].resources;
    this.security = ConnectConference.modules[props.moduleId].security;
    this.state = {
      
    };
  }

  render() {
    var imgUrl =
      this.props.appPath +
      "/DnnImageHandler.ashx?mode=profilepic&w=64&h=64&userId=" +
      this.props.comment.UserId;
    var actionBar = null;
    if (
      this.security.CanManage |
      (this.security.UserId == this.props.comment.UserId)
    ) {
      actionBar = (
        <div className="action">
          <button
            type="button"
            className="btn btn-danger btn-xs"
            title={this.resources.Delete}
            onClick={this.props.onDelete.bind(
              null,
              this.props.comment.CommentId
            )}
            data-id={this.props.comment.CommentId}
          >
            <span className="glyphicon glyphicon-trash" />
          </button>
        </div>
      );
    }
    var time = moment(this.props.comment.Datime);
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
              {this.props.comment.DisplayName}&nbsp;
              {strTime}
            </div>
            <div className="comment-text">{this.props.comment.Remarks}</div>
            {actionBar}
          </div>
        </div>
      </li>
    );
  }
}
