export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.resources = ConnectConference.modules[props.moduleId].resources;
    this.security = ConnectConference.modules[props.moduleId].security;
    this.state = {
      description: props.resource.ResourceDescription,
      dirty: false
    };
  }

  render() {
    var srcLink = "";
    switch (this.props.resource.ResourceType) {
      case 200:
        srcLink =
          "//www.youtube.com/embed/" +
          this.props.resource.ResourceLink +
          "?rel=0";
        break;
      case 201:
        srcLink =
          "https://player.vimeo.com/video/" +
          this.props.resource.ResourceLink +
          "?rel=0";
        break;
      case 202:
        srcLink =
          "https://channel9.msdn.com/" +
          this.props.resource.ResourceLink +
          "/player";
        break;
    }
    var deleteCol = null;
    if (this.props.canAdd) {
      deleteCol = (
        <td className="iconCol">
          <a
            href="#"
            onClick={this.props.deleteResource.bind(null, this.props.resource)}
            title={this.resources.Delete}
          >
            <span className="btn btn-sm btn-danger glyphicon glyphicon-remove" />
          </a>
        </td>
      );
    }
    var okCol = null;
    if (this.security.CanManage) {
      if (this.props.resource.Visibility == 0) {
        okCol = (
          <td className="iconCol">
            <a
              href="#"
              onClick={this.props.approveResource.bind(
                null,
                this.props.resource
              )}
              title={this.resources.Approve}
            >
              <span className="btn btn-sm btn-success glyphicon glyphicon-check" />
            </a>
          </td>
        );
      } else {
        okCol = <td className="iconCol" />;
      }
    }
    var descriptionBox = this.props.resource.ResourceDescription;
    if (this.props.canAdd) {
      descriptionBox = (
        <input
          type="text"
          value={this.state.description}
          className="form-control"
          onBlur={this.onDescriptionChanged}
          onChange={this.onDescriptionChange}
        />
      );
    }
    return (
      <div className="embeddedContent">
        <iframe
          width="100%"
          height="400px"
          src={srcLink}
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        />
        <table className="table">
          <tbody>
            <tr>
              <td>{descriptionBox}</td>
              {okCol}
              {deleteCol}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
      dirty: true
    });
  }

  onDescriptionChanged(e) {
    if (this.state.dirty) {
      var resource = this.props.resource;
      resource.ResourceDescription = e.target.value;
      this.props.editResource(resource, e);
      this.setState({
        dirty: false
      });
    }
  }
}
