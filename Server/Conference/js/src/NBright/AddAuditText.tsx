import * as React from "react";
import * as Models from "../Models/";

interface IAddAuditTextProps {
  module: Models.IAppModule;
  save: (id: number, text: string) => void;
}

interface IAddAuditTextState {
  ItemId: number;
  AuditText: string;
}

export default class AddAuditText extends React.Component<
  IAddAuditTextProps,
  IAddAuditTextState
> {
  refs: {
    popup: any;
  };

  constructor(props: IAddAuditTextProps) {
    super(props);
    this.state = {
      ItemId: -1,
      AuditText: ""
    };
  }

  show(itemId: number) {
    this.setState(
      {
        ItemId: itemId,
        AuditText: ""
      },
      () => {
        ($(this.refs.popup) as any).modal("show");
      }
    );
  }

  cmdSave() {
    ($(this.refs.popup) as any).modal("hide");
    this.props.save(this.state.ItemId, this.state.AuditText);
  }

  render() {
    return (
      <div className="modal fade" role="dialog" ref="popup">
        <div className="modal-dialog">
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
                {this.props.module.resources.AddAuditText}
              </h4>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={this.state.AuditText}
                onChange={e => this.setState({ AuditText: e.target.value })}
                placeholder="Audit Text"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                {this.props.module.resources.Cancel}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={e => {
                  e.preventDefault();
                  this.cmdSave();
                }}
              >
                {this.props.module.resources.Save}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
