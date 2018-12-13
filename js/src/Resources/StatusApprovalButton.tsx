import * as React from "react";
import * as Models from "../Models/";

interface IStatusApprovalButtonProps {
  module: Models.IAppModule;
  resource: Models.ISessionResource;
  approveResource: (resource: Models.ISessionResource) => void;
}

const StatusApprovalButton: React.SFC<IStatusApprovalButtonProps> = props => {
  var classes =
    props.resource.Visibility == 0
      ? "btn btn-sm btn-warning"
      : "btn btn-sm btn-success";
  var txt =
    props.resource.Visibility == 0
      ? props.module.resources.Unapproved
      : props.module.resources.Approved;
  var btn = props.module.security.CanManage ? (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        props.approveResource(props.resource);
      }}
      title={props.module.resources.Approve}
      className={classes}
    >
      {txt}
    </a>
  ) : (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        alert(props.module.resources.AdminMustApprove);
      }}
      title={props.module.resources.Approve}
      className={classes}
    >
      {txt}
    </a>
  );
  return <td className="btnCol">{btn}</td>;
};

export default StatusApprovalButton;
