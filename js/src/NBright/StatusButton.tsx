import * as React from "react";
import * as Models from "../Models/";

interface IStatusButtonProps {
  options: Models.ISwitchButtonOption[];
  selected: number;
  onStatusChange: (opt: Models.ISwitchButtonOption) => void;
}

const StatusButton: React.SFC<IStatusButtonProps> = props => {
  var btnClass = "";
  var btnText = "";
  var options: JSX.Element[] = [];
  var style: React.CSSProperties = {
    color: "#fff"
  };
  var liStyle = {
    listStyleType: "none"
  };
  btnClass = "default";
  for (var i = 0; i < props.options.length; i++) {
    var opt = props.options[i];
    if (opt.Id == props.selected) {
      style.backgroundColor = opt.ClassName;
      style.borderColor = opt.ClassName;
      btnText = opt.Text;
    } else {
      options.push(
        <li style={liStyle} key={opt.Id}>
          <a
            href="#"
            data-id={opt.Id}
            onClick={e => {
              e.preventDefault();
              if (
                !confirm(
                  "Do you wish to change the status to " + opt.Text + "?"
                )
              ) {
                return;
              }
              props.onStatusChange(opt);
            }}
          >
            {opt.Text}
          </a>
        </li>
      );
    }
  }
  return (
    <div className="btn-group">
      <button
        type="button"
        className={"btn btn-sm btn-" + btnClass}
        style={style}
      >
        {btnText}
      </button>
      <button
        type="button"
        className={"btn btn-sm btn-" + btnClass + " dropdown-toggle"}
        style={style}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        &nbsp;
        <span className="caret" />
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu">{options}</ul>
    </div>
  );
};

export default StatusButton;
