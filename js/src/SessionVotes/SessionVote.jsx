export default class SessionVote extends React.Component {
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
    var speakers = this.props.item.Speakers.map(function(item) {
      return <span className="detailItem">{item.Value}</span>;
    });
    var tags = this.props.item.Tags.map(function(item) {
      return <span className="detailItem">{item.Value}</span>;
    });
    var rowStyle = {};
    if (this.props.item.BackgroundColor != "") {
      rowStyle = {
        backgroundColor: this.props.item.BackgroundColor
      };
    }
    var track =
      this.props.item.TrackTitle == undefined ? null : (
        <span
          className="glyphicon glyphicon-resize-vertical"
          title={this.resources.Track}
        />
      );
    var tagsIcon =
      tags.length == 0 ? null : (
        <span
          className="glyphicon glyphicon-tags"
          title={this.resources.Tags}
        />
      );
    return (
      <tr style={rowStyle}>
        <td>
          <p>
            <a
              href={window.sessionDetailUrl.replace(
                "-1",
                this.props.item.SessionId.toString()
              )}
            >
              {this.props.item.Title}
            </a>
          </p>
          <p className="itemDetails">
            <span
              className="glyphicon glyphicon-user"
              title={this.resources.Speakers}
            />
            {speakers}
          </p>
          <p className="itemDetails">
            {track}
            {this.props.item.TrackTitle}
            <span
              className="glyphicon glyphicon-paperclip"
              title={this.resources.Resources}
            />
            {this.props.item.NrResources}
            {tagsIcon}
            {tags}
          </p>
        </td>
        <td className="nrcol">{this.props.item.NrVotes}</td>
        {voteCol}
      </tr>
    );
  }
}
