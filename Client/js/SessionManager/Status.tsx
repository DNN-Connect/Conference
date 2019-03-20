import * as React from "react";
import * as Models from "../Models/";

interface IStatusProps {
  session: Models.ISession;
  options: Models.ISwitchButtonOption[];
  changeStatus: (
    session: Models.ISession,
    status: Models.ISwitchButtonOption
  ) => void;
}

const Status: React.SFC<IStatusProps> = props => {
  var btnClass = "";
  var btnText = "";
  var options: JSX.Element[] = [];
  for (var i = 0; i < props.options.length; i++) {
    var opt = props.options[i];
    if (opt.Id == props.session.Status) {
      btnClass = opt.ClassName;
      btnText = opt.Text;
    } else {
      let opt2 = opt;
      options.push(
        <li>
          <a
            href="#"
            data-id={opt2.Id}
            data-confirm={opt2.Confirm}
            onClick={e => {
              e.preventDefault();
              props.changeStatus(props.session, opt2);
            }}
          >
            {opt2.Text}
          </a>
        </li>
      );
    }
  }
  return (
    <div className="btn-group">
      <button type="button" className={"btn btn-sm btn-" + btnClass}>
        {btnText}
      </button>
      <button
        type="button"
        className={"btn btn-sm btn-" + btnClass + " dropdown-toggle"}
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

export default Status;
