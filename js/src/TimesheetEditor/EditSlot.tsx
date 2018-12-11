import * as React from "react";
import * as Models from "../Models/";
import { linkState } from "../LinkState";

interface IEditSlotProps {
  module: Models.IAppModule;
  locations: Models.ILocation[];
  nrDays: number;
  saveSlot: (s: Models.ISlot) => void;
  deleteSlot: (s: Models.ISlot) => void;
}

interface IEditSlotState {
  slot: Models.ISlot;
}

export default class EditSlot extends React.Component<
  IEditSlotProps,
  IEditSlotState
> {
  refs: { popup: any };

  constructor(props: IEditSlotProps) {
    super(props);
    this.state = {
      slot: new Models.Slot()
    };
  }

  public show(slot: Models.ISlot): void {
    this.setState({ slot: slot }, () => {
      ($(this.refs.popup) as any).modal("show");
    });
  }

  delete(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (this.props.module.resources.SlotDeleteConfirm) {
      this.props.deleteSlot(this.state.slot);
      ($(this.refs.popup) as any).modal("hide");
    }
  }

  save(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    this.props.saveSlot(this.state.slot);
    ($(this.refs.popup) as any).modal("hide");
  }

  onChangeDay(newValue: number): void {
    var s = this.state.slot;
    s.DayNr = newValue;
    this.setState({ slot: s });
  }

  public render(): JSX.Element {
    var daySelector: JSX.Element[] = [];
    for (var i = 1; i <= this.props.nrDays; i++) {
      daySelector.push(
        <label
          className={
            "btn btn-primary" + (this.state.slot.DayNr === i ? " active" : "")
          }
          key={i}
          data-value={i}
          onClick={e => this.onChangeDay($(e.target).data("value"))}
        >
          {" "}
          {i}
        </label>
      );
    }
    var locations = this.props.locations.map(l => {
      return (
        <option value={l.LocationId} key={l.LocationId}>
          {l.Name}
        </option>
      );
    });
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
                {this.props.module.resources.Slot}
              </h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{this.props.module.resources.Type}</label>
                <select
                  className="form-control"
                  value={this.state.slot.SlotType}
                  onChange={linkState(this, "slot", "SlotType", "int")}
                >
                  <option value={0}>
                    {this.props.module.resources.Session}
                  </option>
                  <option value={1}>
                    {this.props.module.resources.General}
                  </option>
                  <option value={2}>
                    {this.props.module.resources.LocationSpecific}
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label>{this.props.module.resources.Title}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={this.props.module.resources.Title}
                  value={this.state.slot.Title || ""}
                  onChange={linkState(this, "slot", "Title")}
                />
              </div>
              <div className="form-group">
                <label>{this.props.module.resources.Description}</label>
                <textarea
                  className="form-control"
                  placeholder={this.props.module.resources.Description}
                  value={this.state.slot.Description || ""}
                  onChange={linkState(this, "slot", "Description")}
                />
              </div>
              <div className="form-group">
                <label>{this.props.module.resources.Location}</label>
                <select
                  className="form-control"
                  value={this.state.slot.LocationId}
                  onChange={linkState(this, "slot", "LocationId", "int")}
                >
                  <option value="-1">{this.props.module.resources.All}</option>
                  {locations}
                </select>
              </div>
              <div className="form-group">
                <label>{this.props.module.resources.Day}</label>
                <div ref="dayNrButtons">
                  <div className="btn-group" data-toggle="buttons">
                    <label
                      className={
                        "btn btn-primary" +
                        (this.state.slot.DayNr === undefined ||
                        this.state.slot.DayNr === -1
                          ? " active"
                          : "")
                      }
                      onClick={e => this.onChangeDay(-1)}
                    >
                      {" "}
                      {this.props.module.resources.All}
                    </label>
                    {daySelector}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                {this.props.module.resources.Close}
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={e => this.delete(e)}
              >
                {this.props.module.resources.Delete}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={e => this.save(e)}
              >
                {this.props.module.resources.SaveChanges}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
