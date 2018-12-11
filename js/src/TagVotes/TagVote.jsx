export default class TagVote extends React.Component {
  resources = null;
  service = null;

  constructor(props) {
    super(props);
    this.resources = ConnectConference.modules[props.moduleId].resources;
    this.state = {      
    };
  }

  render() {
    var voteCol = null;
    if (this.props.allowVote) {
      var btnClasses = "btn";
      if (this.props.item.Voted == 0) {
        btnClasses += " btn-default";
      } else {
        btnClasses += " btn-primary";
      }
      voteCol = (
        <td className="btncol">
          <a
            href="#"
            className={btnClasses}
            onClick={this.props.onVote.bind(null, this.props.item)}
            title={this.resources.Vote}
          >
            <span className="glyphicon glyphicon-thumbs-up" />
          </a>
        </td>
      );
    }
    return (
      <tr>
        <td>{this.props.item.TagName}</td>
        <td className="nrcol">
          {this.props.allowVote
            ? this.props.item.NrSubmittedSessions
            : this.props.item.NrAcceptedSessions}
        </td>
        <td className="nrcol">{this.props.item.NrVotes}</td>
        {voteCol}
      </tr>
    );
  }

  componentDidMount() {}
}
