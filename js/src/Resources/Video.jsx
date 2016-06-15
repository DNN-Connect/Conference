module.exports = React.createClass({

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.security = ConnectConference.modules[this.props.moduleId].security;
    return {
      description: this.props.resource.ResourceDescription,
      dirty: false
    }
  },

  render: function() {
    var srcLink = "";
    switch (this.props.resource.ResourceType)
    {
      case 200:
        srcLink = "//www.youtube.com/embed/" + this.props.resource.ResourceLink + "?rel=0";
        break;
      case 201:
        srcLink = "https://player.vimeo.com/video/" + this.props.resource.ResourceLink + "?rel=0";
        break;
      case 202:
        srcLink = "https://channel9.msdn.com/" + this.props.resource.ResourceLink + "/player";
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
    if (this.security.CanManage) {
      if (this.props.resource.Visibility == 0) {
        okCol = (
        <td className="iconCol">
         <a href="#" onClick={this.props.approveResource.bind(null, this.props.resource)} title={this.resources.Approve}>
           <span className="btn btn-sm btn-success glyphicon glyphicon-check"></span>
         </a>
        </td>
          );
      } else {
        okCol = (
        <td className="iconCol">
        </td>
          );
      }
    }
    var descriptionBox = this.props.resource.ResourceDescription;
    if (this.props.canAdd) {
      descriptionBox = (
        <input type="text" value={this.state.description} className="form-control"
                onBlur={this.onDescriptionChanged} onChange={this.onDescriptionChange} />
        );
    }
    return (
      <div className="embeddedContent">
        <iframe width="100%" height="400px" src={srcLink} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
        </iframe>
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
