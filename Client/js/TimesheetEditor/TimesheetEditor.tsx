import * as React from "react";
import * as Models from "../Models/";
import TimesheetEditorSlot from "./TimesheetEditorSlot";
import EditSlot from "./EditSlot";

interface ITimesheetEditorProps {
  module: Models.IAppModule;
  slots: Models.ISlot[];
  nrDays: number;
  locations: Models.ILocation[];
  conferenceId: number;
}

interface ITimesheetEditorState {
  slots: Models.ISlot[];
  nrDays: number;
}

export default class TimesheetEditor extends React.Component<
  ITimesheetEditorProps,
  ITimesheetEditorState
> {
  slotBeingEdited = null;
  resources = null;

  refs: {
    mainDiv: HTMLDivElement;
    popup: EditSlot;
  };

  constructor(props: ITimesheetEditorProps) {
    super(props);
    var crtSlots = props.slots;
    crtSlots.sort(function(a, b) {
      return (
        parseFloat(a.StartMinutes.toString()) -
        parseFloat(b.StartMinutes.toString())
      );
    });
    this.state = {
      slots: crtSlots,
      nrDays: props.nrDays
    };
  }

  componentDidMount() {
    this.setupEditor();
  }

  render() {
    var hours: JSX.Element[] = [];
    for (var i = 0; i < 24; i++) {
      hours.push(<section key={i}>{i}:00</section>);
    }
    var slots: JSX.Element[] = [];
    for (var i = 0; i < this.state.slots.length; i++) {
      slots.push(
        <TimesheetEditorSlot
          key={this.state.slots[i].SlotId}
          slot={this.state.slots[i]}
          editSlot={s => this.editSlot(s)}
          onSlotUpdate={(s, f) => this.updateSlot(s, f)}
        />
      );
    }
    return (
      <div>
        <div ref="mainDiv" className="timesheet">
          <div className="timesheet-grid">{hours}</div>
          <ul className="data">
            <li>&nbsp;</li>
            {slots}
          </ul>
        </div>
        <div className="buttons-right">
          <a
            href="#"
            className="btn btn-default"
            onClick={e => this.addClick(e)}
          >
            {this.props.module.resources.Add}
          </a>
        </div>
        <EditSlot
          module={this.props.module}
          locations={this.props.locations}
          nrDays={this.props.nrDays}
          saveSlot={s => this.updateSlot(s, null)}
          deleteSlot={s => this.deleteSlot(s)}
          ref="popup"
        />
      </div>
    );
  }

  setupEditor() {
    var mainDiv = $(this.refs.mainDiv);
    var childDiv = mainDiv.children("ul").first();
    var h = childDiv.height() || 0;
    mainDiv.css({
      height: h + 30 + "px"
    });
  }

  addClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    var slot = new Models.Slot();
    slot.ConferenceId = this.props.conferenceId;
    slot.DurationMins = 60;
    this.refs.popup.show(slot);
    return false;
  }

  editSlot(slot) {
    this.refs.popup.show(slot);
  }

  updateSlot(slot, fail) {
    this.props.module.service.updateSlot(
      slot.ConferenceId,
      slot,
      data => {
        var added = false;
        var newSlots = this.state.slots.map(s => {
          if (s.SlotId == data.SlotId) {
            added = true;
            return data;
          } else {
            return s;
          }
        });
        if (!added) newSlots.push(data);
        newSlots.sort(function(a, b) {
          return (
            parseFloat(a.StartMinutes.toString()) -
            parseFloat(b.StartMinutes.toString())
          );
        });
        this.setState({
          slots: newSlots
        });
        this.setupEditor();
      },
      () => {
        if (fail != undefined) {
          fail();
        }
      }
    );
  }

  deleteSlot(slot: Models.ISlot) {
    this.props.module.service.deleteSlot(slot.ConferenceId, slot.SlotId, () => {
      var newSlots: Models.ISlot[] = [];
      for (var i = 0; i < this.state.slots.length; i++) {
        if (this.state.slots[i].SlotId != slot.SlotId) {
          newSlots.push(this.state.slots[i]);
        }
      }
      newSlots.sort(function(a, b) {
        return (
          parseFloat(a.StartMinutes.toString()) -
          parseFloat(b.StartMinutes.toString())
        );
      });
      this.setState({
        slots: newSlots
      });
    });
  }
}
