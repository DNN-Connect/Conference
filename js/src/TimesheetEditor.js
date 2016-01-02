/** @jsx React.DOM */
var TimesheetEditorSlot = require('./TimesheetEditorSlot');

var TimesheetEditor = React.createClass({

  slotBeingEdited: null,

  getInitialState: function() {
    return {
      moduleId: this.props.moduleId,
      slots: this.props.slots,
      service: ConnectConference.modules[this.props.moduleId].service
    }
  },

  componentDidMount: function() {
    this.setupEditor();
  },

  render: function() {
    var hours = [];
    for (var i = 0; i < 24; i++) {
      hours.push(<section>{i}:00</section>);
    }
    var crtSlots = this.state.slots;
    crtSlots.sort(function(a, b) {
      return parseFloat(a.StartMinutes) - parseFloat(b.StartMinutes);
    });
    var slots = [];
    for (var i = 0; i < crtSlots.length; i++) {
      slots.push(
        <TimesheetEditorSlot moduleId={this.state.moduleId}
           key={crtSlots[i].SlotId} 
           slot={crtSlots[i]} 
           editSlot={this.editSlot} />
      );
    }
    return (
      <div>
        <div ref="mainDiv" className="timesheet">
          <div className="timesheet-grid">
            {hours}
          </div>
          <ul className="data">
            <li>&nbsp;</li>
            {slots}
          </ul>
        </div>
        <div className="buttons-right">
          <a href="#" className="btn btn-default" onClick={this.addClick}>Add</a>
        </div>
        <div className="modal fade" tabindex="-1" role="dialog" ref="popup">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Slot</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" placeholder="Title" ref="title" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" className="form-control" placeholder="Description" ref="description" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-warning" onClick={this.cmdDelete} ref="cmdDelete">Delete</button>
                <button type="button" className="btn btn-primary" onClick={this.cmdSave}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  setupEditor: function() {
    var mainDiv = this.refs.mainDiv.getDOMNode();
    var childDiv = mainDiv.getElementsByTagName('ul')[0];
    $(mainDiv).css({
      'height': (($(childDiv).height() + 30) + 'px')
    });
  },

  resetPopup: function() {
    this.refs.title.getDOMNode().value = '';
    this.refs.description.getDOMNode().value = '';
  },

  addClick: function() {
    this.slotBeingEdited = null;
    this.resetPopup();
    $(this.refs.popup.getDOMNode()).modal();
    $(this.refs.cmdDelete.getDOMNode()).hide();
    return false;
  },

  editSlot: function(slot) {
    this.slotBeingEdited = slot;
    this.resetPopup();
    this.refs.title.getDOMNode().value = slot.Title;
    this.refs.description.getDOMNode().value = slot.Description;
    $(this.refs.popup.getDOMNode()).modal();
    $(this.refs.cmdDelete.getDOMNode()).show();
  },

  cmdSave: function(e) {
    var slot = this.slotBeingEdited,
      that = this;
    if (slot == null) {
      slot = {
        SlotId: -1,
        ConferenceId: this.props.conferenceId,
        SlotType: this.props.slottype,
        DurationMins: 60,
        NewStartMinutes: 0
      }
    }
    slot.Title = this.refs.title.getDOMNode().value;
    slot.Description = this.refs.description.getDOMNode().value;
    this.state.service.updateSlot(slot.ConferenceId, slot, function(data) {
      var newSlots = [];
      $(that.refs.popup.getDOMNode()).modal('hide');
      if (that.slotBeingEdited == null) {
        newSlots = that.state.slots;
        newSlots.push(data);
      } else {
        for (var i = 0; i < that.state.slots.length; i++) {
          if (that.state.slots[i].SlotId == data.SlotId) {
            newSlots.push(data);
          } else {
            newSlots.push(that.state.slots[i]);
          }
        }
      }
      that.setState({
        slots: newSlots
      });
      that.setupEditor();
    }, function() {});
  },

  cmdDelete: function(e) {
    if (confirm('Do you wish to delete this slot?')) {
      $(this.refs.popup.getDOMNode()).modal('hide');
      var slot = this.slotBeingEdited,
        that = this;
      this.state.service.deleteSlot(slot.ConferenceId, slot.SlotId, function() {
        var newSlots = [];
        for (var i = 0; i < that.state.slots.length; i++) {
          if (that.state.slots[i].SlotId != slot.SlotId) {
            newSlots.push(that.state.slots[i]);
          }
        }
        that.setState({
          slots: newSlots
        });
        that.setupEditor();
      });
    }
  }


});

module.exports = TimesheetEditor;
