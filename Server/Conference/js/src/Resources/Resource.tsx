import * as React from "react";
import * as Models from "../Models/";
import StatusApprovalButton from "./StatusApprovalButton";
import Icon from "./Icon";

interface IResourceProps {
  module: Models.IAppModule;
  resource: Models.ISessionResource;
  resourceDir: string;
  canAdd: boolean;
  deleteResource: (resource: Models.ISessionResource) => void;
  editResource: (resource: Models.ISessionResource) => void;
  approveResource: (resource: Models.ISessionResource) => void;
}

interface IResourceState {
  description: string;
  dirty: boolean;
}

export default class Resource extends React.Component<
  IResourceProps,
  IResourceState
> {
  constructor(props: IResourceProps) {
    super(props);
    this.state = {
      description: props.resource.ResourceDescription,
      dirty: false
    };
  }

  render() {
    var icon = "file";
    var link = this.props.resourceDir + this.props.resource.ResourceLink;
    var linkClass = "btn btn-sm btn-success glyphicon glyphicon-download";
    switch (this.props.resource.ResourceType) {
      case 1:
        icon = "file-powerpoint";
        break;
      case 2:
        icon = "file-archive";
        break;
      case 3:
        icon = "file-pdf";
        break;
      case 100:
        icon = "hyperlink";
        link = this.props.resource.ResourceLink;
        linkClass = "btn btn-sm btn-info glyphicon glyphicon-globe";
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
    var okCol =
      this.props.module.security.CanManage || this.props.canAdd ? (
        <StatusApprovalButton
          module={this.props.module}
          resource={this.props.resource}
          approveResource={r => this.props.approveResource(r)}
        />
      ) : null;
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
      <tr>
        <td className="iconCol">
          <Icon type={icon} />
        </td>
        <td>{descriptionBox}</td>
        {okCol}
        {deleteCol}
        <td className="iconCol">
          <a href={link}>
            <span className={linkClass} />
          </a>
        </td>
      </tr>
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
