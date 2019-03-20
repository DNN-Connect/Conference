import * as React from "react";
import * as Models from "../Models/";

interface IAttendanceButtonProps {
  module: Models.IAppModule;
  session: Models.ISession;
}

interface IAttendanceButtonState {
  attendees: Models.ISessionAttendee[];
  codes: string;
}

export default class AttendanceButton extends React.Component<
  IAttendanceButtonProps,
  IAttendanceButtonState
> {
  refs: {
    dialog: any;
    codes: HTMLTextAreaElement;
  };

  constructor(props: IAttendanceButtonProps) {
    super(props);
    this.state = {
      attendees: [],
      codes: ""
    };
  }

  showDialog(e) {
    e.preventDefault();
    this.props.module.service.getSessionAttendees(
      this.props.session.ConferenceId,
      this.props.session.SessionId,
      data => {
        this.setState(
          {
            attendees: data
          },
          () => {
            ($(this.refs.dialog) as any).modal("show");
          }
        );
      },
      () => {}
    );
  }

  addAttendees(e) {
    e.preventDefault();
    this.props.module.service.attendSession(
      this.props.session.ConferenceId,
      this.props.session.SessionId,
      this.refs.codes.value,
      data => {
        this.setState({
          codes: "",
          attendees: data
        });
      },
      () => {}
    );
  }

  handleChangedCodes(e) {
    this.setState({ codes: e.target.value });
  }

  render() {
    var attendees = this.state.attendees.map(a => {
      return (
        <tr>
          <td>{a.DisplayName}</td>
        </tr>
      );
    });
    return (
      <div>
        <a
          href="#"
          onClick={e => this.showDialog(e)}
          style={{ color: "#000", float: "right" }}
        >
          <i className="glyphicon glyphicon-barcode" />
        </a>
        <div className="modal fade" ref="dialog" role="dialog">
          <div
            className="modal-dialog"
            role="document"
            style={{ marginTop: "60px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">
                  Attendance {this.props.session.Title}
                </h4>
              </div>
              <div className="modal-body">
                <table className="table">
                  <tbody>{attendees}</tbody>
                </table>
                <textarea
                  ref="codes"
                  className="form-control"
                  placeholder="Print barcodes here"
                  value={this.state.codes}
                  onChange={this.handleChangedCodes}
                />
                <a
                  href="#"
                  className="btn btn-block btn-primary"
                  style={{ marginTop: "10px" }}
                  onClick={e => this.addAttendees(e)}
                >
                  Add
                </a>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
