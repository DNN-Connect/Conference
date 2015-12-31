/** @jsx React.DOM */
var TimesheetEditorSlot = require('./TimesheetEditorSlot');

var TimesheetEditor = React.createClass({

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
    var slots = [];
    for (var i = 0; i < this.state.slots.length; i++) {
      slots.push(
        <TimesheetEditorSlot moduleId={this.state.moduleId} slot={this.state.slots[i]} />
      );
    }
    return (
      <div ref="mainDiv" className="timesheet">
        <div className="timesheet-grid">
          {hours}
        </div>
        <ul className="data">
          <li>&nbsp;</li>
          {slots}
        </ul>
      </div>
    );
  },

  setupEditor: function() {

    $(".timesheet").css({
      'height': (($(".timesheet .data").height() + 20) + 'px')
    });

  }


});

module.exports = TimesheetEditor;
