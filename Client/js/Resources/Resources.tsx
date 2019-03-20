import * as React from "react";
import * as Models from "../Models/";
// import * as ss from "simple-ajax-uploader"
import Video from "./Video";
import Resource from "./Resource";

declare const ss: any;

interface IResourcesProps {
  module: Models.IAppModule;
  resources: Models.ISessionResource[];
  canAdd: boolean;
  resourceDir: string;
  conferenceId: number;
  sessionId: number;
}

interface IResourcesState {
  resources: Models.ISessionResource[];
  newUrl: string;
}

export default class Resources extends React.Component<
  IResourcesProps,
  IResourcesState
> {
  refs: {
    msgBox: HTMLDivElement;
  };

  constructor(props: IResourcesProps) {
    super(props);
    this.state = {
      resources: props.resources,
      newUrl: ""
    };
  }

  uploader: any;

  render() {
    var uploadPanel = this.props.canAdd ? (
      <div className="dropPanel">
        <a href="#" className="btn btn-default cmdUpload">
          {this.props.module.resources.Upload}
        </a>
        <div ref="msgBox">{this.props.module.resources.DropHere}</div>
      </div>
    ) : null;
    var urlPanel = this.props.canAdd ? (
      <div className="form-group">
        <label>{this.props.module.resources.NewUrl}</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={this.state.newUrl}
            onChange={e => this.setState({ newUrl: e.target.value })}
          />
          <a
            href="#"
            className="input-group-addon btn btn-default"
            onClick={this.addUrl}
          >
            {this.props.module.resources.Add}
          </a>
        </div>
      </div>
    ) : null;
    var resourceList = this.state.resources.map(item => {
      if (item.ResourceType < 200) {
        return (
          <Resource
            resource={item}
            key={item.SessionResourceId}
            module={this.props.module}
            approveResource={r => this.approveResource(r)}
            deleteResource={r => this.deleteResource(r)}
            editResource={r => this.editResource(r)}
            resourceDir={this.props.resourceDir}
            canAdd={this.props.canAdd}
          />
        );
      }
      return null;
    });
    var embeddedContent = this.state.resources.map(item => {
      if (item.ResourceType > 199) {
        return (
          <Video
            resource={item}
            key={item.SessionResourceId}
            module={this.props.module}
            approveResource={r => this.approveResource(r)}
            deleteResource={r => this.deleteResource(r)}
            editResource={r => this.editResource(r)}
            canAdd={this.props.canAdd}
          />
        );
      }
      return null;
    });
    return (
      <div>
        {embeddedContent}
        <table className="table">
          <tbody>{resourceList}</tbody>
        </table>
        {uploadPanel}
        {urlPanel}
      </div>
    );
  }

  componentDidMount() {
    this.uploader = new ss.SimpleUpload({
      button: $(".cmdUpload"),
      dropzone: $(".dropPanel"),
      url:
        this.props.module.service.baseServicepath +
        "Conference/" +
        this.props.conferenceId +
        "/SessionResources/Upload/" +
        this.props.sessionId,
      customHeaders: {
        ModuleId: this.props.module.moduleId,
        TabId: this.props.module.tabId,
        RequestVerificationToken: $('[name="__RequestVerificationToken"]').val()
      },
      name: "resource",
      multipart: true,
      hoverClass: "hover",
      focusClass: "focus",
      responseType: "json",
      startXHR() {},
      onSubmit: () => {
        this.refs.msgBox.innerHTML = this.props.module.resources.Uploading;
      },
      onComplete: (filename, response) => {
        this.refs.msgBox.innerHTML = this.props.module.resources.DropHere;
        this.setState({
          resources: response
        });
      },
      onError: (
        filename,
        errorType,
        status,
        statusText,
        response,
        uploadBtn,
        fileSize
      ) => {
        this.refs.msgBox.innerHTML = "Error uploading file: " + response;
      }
    });
  }

  addUrl(e) {
    e.preventDefault();
    this.props.module.service.addUrl(
      this.props.conferenceId,
      this.props.sessionId,
      this.state.newUrl.trim(),
      data => {
        this.setState({
          resources: data,
          newUrl: ""
        });
      },
      function(data) {
        alert(data);
      }
    );
  }

  approveResource(resource) {
    this.props.module.service.approveResource(
      this.props.conferenceId,
      this.props.sessionId,
      resource,
      data => {
        this.setState({
          resources: data
        });
      }
    );
  }

  deleteResource(resource) {
    this.props.module.service.deleteResource(
      this.props.conferenceId,
      this.props.sessionId,
      resource,
      data => {
        this.setState({
          resources: data
        });
      }
    );
  }

  editResource(resource) {
    this.props.module.service.editResource(
      this.props.conferenceId,
      this.props.sessionId,
      resource,
      data => {
        this.setState({
          resources: data
        });
      }
    );
  }
}
