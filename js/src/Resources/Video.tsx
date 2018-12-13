import * as React from "react";
import * as Models from "../Models/";

interface IVideoProps {
  module: Models.IAppModule;
  resource: Models.ISessionResource;
  canAdd: boolean;
  deleteResource: (resource: Models.ISessionResource) => void;
  editResource: (resource: Models.ISessionResource) => void;
  approveResource: (resource: Models.ISessionResource) => void;
}

interface IVideoState {
  description: string;
  dirty: boolean;
}

export default class Video extends React.Component<IVideoProps, IVideoState> {
  refs: {};

  constructor(props: IVideoProps) {
    super(props);
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
    var deleteCol = this.props.canAdd ? (
      <td className="iconCol">
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            if (confirm(this.props.module.resources.ResourceDeleteConfirm)) {
              this.props.deleteResource(this.props.resource);
            }
          }}
          title={this.props.module.resources.Delete}
        >
          <span className="btn btn-sm btn-danger glyphicon glyphicon-remove" />
        </a>
      </td>
    ) : null;
    var okCol = this.props.module.security.CanManage ? (
      <td className="iconCol">
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            this.props.approveResource(this.props.resource);
          }}
          title={this.props.module.resources.Approve}
        >
          <span className="btn btn-sm btn-success glyphicon glyphicon-check" />
        </a>
      </td>
    ) : (
      <td className="iconCol" />
    );
    var descriptionBox = this.props.canAdd ? (
      <input
        type="text"
        value={this.state.description}
        className="form-control"
        onBlur={this.onDescriptionChanged}
        onChange={this.onDescriptionChange}
      />
    ) : (
      this.props.resource.ResourceDescription
    );
    return (
      <div className="embeddedContent">
        <iframe width="100%" height="400px" src={srcLink} />
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
      this.props.editResource(resource);
      this.setState({
        dirty: false
      });
    }
  }
}
