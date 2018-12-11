var Status = require("./Status.jsx"),
  Track = require("./Track.jsx");

export default class Session extends React.Component {
  render() {
    var speakers = this.props.session.Speakers.map(item => {
      return item.Value;
    });
    return (
      <tr>
        <td>
          <div className="sessionTitle" onClick={this.toggleAbstract}>
            {this.props.session.Title}
            <br />
            <span className="details">{speakers.join(", ")}</span>
            <br />
          </div>
          <div
            className="details sessionAbstract"
            ref="abstract"
            dangerouslySetInnerHTML={this.getAbstract()}
          />
        </td>
        <td className="text-right">{this.props.session.NrVotes}</td>
        <td className="text-right">
          <Status
            options={this.props.statusOptions}
            session={this.props.session}
            key={"status" + this.props.session.SessionId}
            changeStatus={this.props.changeStatus}
          />
        </td>
        <td className="text-right">
          <Track
            tracks={this.props.tracks}
            session={this.props.session}
            key={"track" + this.props.session.SessionId}
            changeTrack={this.props.changeTrack}
          />
        </td>
      </tr>
    );
  }

  toggleAbstract() {
    $(this.refs.abstract.getDOMNode()).toggleClass("sessionAbstract");
  }

  getAbstract() {
    if (this.props.session.Description == null) {
      return { __html: "" };
    }
    return {
      __html: this.props.session.Description.replace(
        /(?:\r\n|\r|\n)/g,
        "<br />"
      )
    };
  }
}
