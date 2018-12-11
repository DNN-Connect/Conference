export default class Speaker extends React.Component {
  resources = null;
  service = null;

  constructor(props) {
    super(props);
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    this.state = {};
  }

  render() {
    return (
      <tr className="sortable" data-id={this.props.speaker.SpeakerId}>
        <td>{this.props.speaker.DisplayName}</td>
        <td className="btncol">
          <a
            href="#"
            className="btn btn-default"
            onClick={this.props.onDelete.bind(null, this.props.speaker)}
            title={this.resources.Delete}
          >
            <span className="glyphicon glyphicon-remove" />
          </a>
        </td>
      </tr>
    );
  }
}
