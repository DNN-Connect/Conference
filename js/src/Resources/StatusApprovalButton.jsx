module.exports = React.createClass({

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {
    }
  },

  render: function() {
    var classes = (this.props.resource.Visibility == 0) ? 'btn btn-sm btn-warning' : 'btn btn-sm btn-success';
    var txt = (this.props.resource.Visibility == 0) ? this.resources.Unapproved : this.resources.Approved;
    var btn = null;
    if (this.props.canManage)
    {
      btn = (
         <a href="#" onClick={this.props.approveResource.bind(null, this.props.resource)} 
                     title={this.resources.Approve}
                     className={classes}>
           {txt}
         </a>
        );
    } else {
      btn = (
         <a href="#" onClick={this.unapproved} 
                     title={this.resources.Approve}
                     className={classes}>
           {txt}
         </a>
        );
    }
    return (
      <td className="btnCol">
       {btn}
      </td>
    );
  },

  unapproved: function(e) {
    e.preventDefault();
    alert(this.resources.AdminMustApprove);
  }

});
