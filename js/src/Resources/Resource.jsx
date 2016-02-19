var Icon = require('./Icon.jsx'),
    StatusApprovalButton = require('./StatusApprovalButton.jsx');

var Resource = React.createClass({

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.security = ConnectConference.modules[this.props.moduleId].security;
    return {
      description: this.props.resource.ResourceDescription,
      dirty: false
    }
  },

  render: function() {
    var icon = "file";
    var link = this.props.resourceDir + this.props.resource.ResourceLink;
    var linkClass = "btn btn-sm btn-success glyphicon glyphicon-download";
    switch (this.props.resource.ResourceType)
    {
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
    var deleteCol = null;
    if (this.props.canAdd) {
      deleteCol = (
        <td className="iconCol">
         <a href="#" onClick={this.props.deleteResource.bind(null, this.props.resource)} title={this.resources.Delete}>
           <span className="btn btn-sm btn-danger glyphicon glyphicon-remove"></span>
         </a>
        </td>
        );
    }
    var okCol = null;
    if (this.security.CanManage | this.props.canAdd) {
      okCol = (
        <StatusApprovalButton resource={this.props.resource} 
                   approveResource={this.props.approveResource} 
                   canManage={this.security.CanManage}
                   moduleId={this.props.moduleId} />
        );
    }
    var descriptionBox = this.props.resource.ResourceDescription;
    if (this.props.canAdd) {
      descriptionBox = (
        <input type="text" value={this.state.description} className="form-control"
                onBlur={this.onDescriptionChanged} onChange={this.onDescriptionChange} />
        );
    }
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
           <span className={linkClass}></span>
         </a>
       </td>
      </tr>
    );
  },

  onDescriptionChange: function(e) {
    this.setState({
      description: e.target.value,
      dirty: true
    });
  },

  onDescriptionChanged: function(e) {
    if (this.state.dirty) {
      var resource = this.props.resource;
      resource.ResourceDescription = e.target.value;
      this.props.editResource(resource, e);
      this.setState({
        dirty: false
      });
    }
  }

});

module.exports = Resource;