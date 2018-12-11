var Resource = require("./Resource.jsx"),
  Video = require("./Video.jsx");

export default class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.resources = ConnectConference.modules[props.moduleId].resources;
    this.service = ConnectConference.modules[props.moduleId].service;
    this.state = {
      resources: props.resources
    };
  }

  render() {
    var uploadPanel = null;
    var urlPanel = null;
    if (this.props.canAdd) {
      uploadPanel = (
        <div className="dropPanel">
          <a href="#" className="btn btn-default cmdUpload">
            {this.resources.Upload}
          </a>
          <div ref="msgBox">{this.resources.DropHere}</div>
        </div>
      );
      urlPanel = (
        <div className="form-group">
          <label>{this.resources.NewUrl}</label>
          <div className="input-group">
            <input type="text" className="form-control" ref="newUrl" />
            <a
              href="#"
              className="input-group-addon btn btn-default"
              onClick={this.addUrl}
            >
              {this.resources.Add}
            </a>
          </div>
        </div>
      );
    }
    var resourceList = this.state.resources.map(
      function(item) {
        if (item.ResourceType < 200) {
          return (
            <Resource
              resource={item}
              key={item.SessionResourceId}
              moduleId={this.props.moduleId}
              approveResource={this.approveResource}
              deleteResource={this.deleteResource}
              editResource={this.editResource}
              resourceDir={this.props.resourceDir}
              canAdd={this.props.canAdd}
            />
          );
        }
      }.bind(this)
    );
    var embeddedContent = this.state.resources.map(
      function(item) {
        if (item.ResourceType > 199) {
          return (
            <Video
              resource={item}
              key={item.SessionResourceId}
              moduleId={this.props.moduleId}
              approveResource={this.approveResource}
              deleteResource={this.deleteResource}
              editResource={this.editResource}
              resourceDir={this.props.resourceDir}
              canAdd={this.props.canAdd}
            />
          );
        }
      }.bind(this)
    );
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
    $(document).ready(
      function() {
        var uploader = new ss.SimpleUpload({
          button: $(".cmdUpload"),
          dropzone: $(".dropPanel"),
          url:
            this.service.ServicePath() +
            "Conference/" +
            this.props.conferenceId +
            "/SessionResources/Upload/" +
            this.props.sessionId,
          customHeaders: {
            ModuleId: this.props.moduleId,
            TabId: this.props.tabId,
            RequestVerificationToken: $(
              '[name="__RequestVerificationToken"]'
            ).val()
          },
          name: "resource",
          multipart: true,
          hoverClass: "hover",
          focusClass: "focus",
          responseType: "json",
          startXHR() {},
          onSubmit: function() {
            this.refs.msgBox.getDOMNode().innerHtml = this.resources.Uploading;
          }.bind(this),
          onComplete: function(filename, response) {
            this.refs.msgBox.getDOMNode().innerHtml = this.resources.DropHere;
            this.setState({
              resources: response
            });
          }.bind(this),
          onError: function(
            filename,
            errorType,
            status,
            statusText,
            response,
            uploadBtn,
            fileSize
          ) {
            this.refs.msgBox.getDOMNode().innerHtml =
              "Error uploading file: " + response;
          }.bind(this)
        });
      }.bind(this)
    );
  }

  addUrl(e) {
    e.preventDefault();
    var url = this.refs.newUrl.getDOMNode().value;
    this.service.addUrl(
      this.props.conferenceId,
      this.props.sessionId,
      url.trim(),
      function(data) {
        this.refs.newUrl.getDOMNode().value = "";
        this.setState({
          resources: data
        });
      }.bind(this),
      function(data) {
        alert(data);
      }
    );
  }

  approveResource(resource, e) {
    e.preventDefault();
    this.service.approveResource(
      this.props.conferenceId,
      this.props.sessionId,
      resource,
      function(data) {
        this.setState({
          resources: data
        });
      }.bind(this)
    );
  }

  deleteResource(resource, e) {
    e.preventDefault();
    if (confirm(this.resources.ResourceDeleteConfirm)) {
      this.service.deleteResource(
        this.props.conferenceId,
        this.props.sessionId,
        resource,
        function(data) {
          this.setState({
            resources: data
          });
        }.bind(this)
      );
    }
  }

  editResource(resource, e) {
    this.service.editResource(
      this.props.conferenceId,
      this.props.sessionId,
      resource,
      function(data) {
        this.setState({
          resources: data
        });
      }.bind(this)
    );
  }
}
