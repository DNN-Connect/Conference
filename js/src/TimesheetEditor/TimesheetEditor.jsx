import TimesheetEditorSlot from "./TimesheetEditorSlot.jsx";

export default class TimesheetEditor extends React.Component {
  slotBeingEdited = null;
  resources = null;

  constructor(props) {
    super(props);
    var crtSlots = props.slots;
    crtSlots.sort(function(a, b) {
      return parseFloat(a.StartMinutes) - parseFloat(b.StartMinutes);
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
    var hours = [];
    for (var i = 0; i < 24; i++) {
      hours.push(<section key={i}>{i}:00</section>);
    }
    var slots = [];
    for (var i = 0; i < this.state.slots.length; i++) {
      slots.push(
        <TimesheetEditorSlot
          key={this.state.slots[i].SlotId}
          slot={this.state.slots[i]}
          editSlot={this.editSlot}
          onSlotUpdate={this.onSlotUpdate}
        />
      );
    }
    var daySelector = [];
    for (var i = 1; i <= this.state.nrDays; i++) {
      var id = "dnOpt" + i;
      daySelector.push(
        <label className="btn btn-primary">
          <input
            type="radio"
            name="daynr"
            value={i}
            id={id}
          />{" "}
          {i}
        </label>
      );
    }
    var locations = this.props.locations.map(function(item) {
      return <option value={item.LocationId}>{item.Name}</option>;
    });
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
          <a href="#" className="btn btn-default" onClick={this.addClick}>
            {this.props.module.resources.Add}
          </a>
        </div>
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
                <h4 className="modal-title">{this.props.module.resources.Slot}</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>{this.props.module.resources.Type}</label>
                  <select className="form-control" ref="slotType">
                    <option value="0">{this.props.module.resources.Session}</option>
                    <option value="1">{this.props.module.resources.General}</option>
                    <option value="2">{this.props.module.resources.LocationSpecific}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{this.props.module.resources.Title}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={this.props.module.resources.Title}
                    ref="title"
                  />
                </div>
                <div className="form-group">
                  <label>{this.props.module.resources.Description}</label>
                  <textarea
                    className="form-control"
                    placeholder={this.props.module.resources.Description}
                    ref="description"
                  />
                </div>
                <div className="form-group">
                  <label>{this.props.module.resources.Location}</label>
                  <select className="form-control" ref="location">
                    <option value="-1">{this.props.module.resources.All}</option>
                    {locations}
                  </select>
                </div>
                <div className="form-group">
                  <label>{this.props.module.resources.Day}</label>
                  <div ref="dayNrButtons">
                    <div className="btn-group" data-toggle="buttons">
                      <label className="btn btn-primary">
                        <input
                          type="radio"
                          name="daynr"
                          value="-1"
                          id="dnOpt0"
                        />{" "}
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
                  onClick={this.cmdDelete}
                  ref="cmdDelete"
                >
                  {this.props.module.resources.Delete}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.cmdSave}
                >
                  {this.props.module.resources.SaveChanges}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  setupEditor() {
    var mainDiv = this.refs.mainDiv.getDOMNode();
    var childDiv = mainDiv.getElementsByTagName("ul")[0];
    $(mainDiv).css({
      height: $(childDiv).height() + 30 + "px"
    });
  }

  resetPopup() {
    this.refs.title.getDOMNode().value = "";
    this.refs.description.getDOMNode().value = "";
    this.refs.slotType.getDOMNode().value = "0";
    this.refs.location.getDOMNode().value = "-1";
    this.setDayNr(null);
  }

  setDayNr(dayNr) {
    var dnDiv = $(this.refs.dayNrButtons.getDOMNode());
    var btns = dnDiv
      .children()
      .first()
      .children();
    btns.removeClass("active");
    dayNr = dayNr ? dayNr : 0;
    btns.eq(dayNr).addClass("active");
  }

  addClick() {
    this.slotBeingEdited = null;
    this.resetPopup();
    $(this.refs.popup.getDOMNode()).modal();
    $(this.refs.cmdDelete.getDOMNode()).hide();
    return false;
  }

  editSlot(slot) {
    this.slotBeingEdited = slot;
    this.resetPopup();
    this.refs.title.getDOMNode().value = slot.Title;
    this.refs.description.getDOMNode().value = slot.Description;
    this.refs.slotType.getDOMNode().value = slot.SlotType;
    this.setDayNr(slot.DayNr);
    this.props.module.service.getLocations(
      this.props.conferenceId,
      function(data) {
        var dd = $(this.refs.location.getDOMNode());
        dd.empty();
        dd.append(
          $("<option/>")
            .attr("value", -1)
            .text(this.props.module.resources.ChooseLocation)
        );
        $.each(data, function(i, item) {
          dd.append(
            $("<option/>")
              .attr("value", item.LocationId)
              .text(item.Name)
          );
        });
        this.refs.location.getDOMNode().value = slot.LocationId;
      }.bind(this)
    );
    $(this.refs.popup.getDOMNode()).modal();
    $(this.refs.cmdDelete.getDOMNode()).show();
  }

  onSlotUpdate(slot, fail) {
    this.props.module.service.updateSlot(
      slot.ConferenceId,
      slot,
      function(data) {
        var newSlots = [];
        $(this.refs.popup.getDOMNode()).modal("hide");
        if (this.slotBeingEdited == null) {
          newSlots = this.state.slots;
          newSlots.push(data);
        } else {
          for (var i = 0; i < this.state.slots.length; i++) {
            if (this.state.slots[i].SlotId == data.SlotId) {
              newSlots.push(data);
            } else {
              newSlots.push(this.state.slots[i]);
            }
          }
        }
        newSlots.sort(function(a, b) {
          return parseFloat(a.StartMinutes) - parseFloat(b.StartMinutes);
        });
        this.setState({
          slots: newSlots
        });
        this.setupEditor();
      }.bind(this),
      function() {
        if (fail != undefined) {
          fail();
        }
      }
    );
  }

  cmdSave(e) {
    var slot = this.slotBeingEdited;
    if (slot == null) {
      slot = {
        SlotId: -1,
        ConferenceId: this.props.conferenceId,
        DurationMins: 60,
        NewStartMinutes: 0
      };
    }
    slot.Title = this.refs.title.getDOMNode().value;
    slot.Description = this.refs.description.getDOMNode().value;
    var e = this.refs.slotType.getDOMNode();
    slot.SlotType = parseInt(e.options[e.selectedIndex].value);
    var l = this.refs.location.getDOMNode();
    slot.LocationId = parseInt(l.options[l.selectedIndex].value);
    var dayNr = $(this.refs.dayNrButtons.getDOMNode())
      .children()
      .first()
      .children("label.active")
      .first()
      .children()
      .first()
      .val();
    if (dayNr == -1) {
      slot.DayNr = null;
    } else {
      slot.DayNr = dayNr;
    }
    this.onSlotUpdate(slot);
  }

  cmdDelete(e) {
    if (confirm(this.props.module.resources.SlotDeleteConfirm)) {
      $(this.refs.popup.getDOMNode()).modal("hide");
      var slot = this.slotBeingEdited,
        that = this;
      this.props.module.service.deleteSlot(slot.ConferenceId, slot.SlotId, function() {
        var newSlots = [];
        for (var i = 0; i < that.state.slots.length; i++) {
          if (that.state.slots[i].SlotId != slot.SlotId) {
            newSlots.push(that.state.slots[i]);
          }
        }
        newSlots.sort(function(a, b) {
          return parseFloat(a.StartMinutes) - parseFloat(b.StartMinutes);
        });
        that.setState({
          slots: newSlots
        });
        that.setupEditor();
      });
    }
  }
}
