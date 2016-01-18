/** @jsx React.DOM */
var SchedulerGrid = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    var vertLines = [];
    for (i = this.props.leftMargin; i < this.props.width; i = i + 100) {
      vertLines.push(
        <line x1={i} y1="0" x2={i} y2={this.props.height} className="gridline" />
      );
    }
    var horLabels = [];
    for (i = 0; i < this.props.locations.length; i++) {
      horLabels.push(
        <text x={6 + i*100 + this.props.leftMargin} y="20" className="gridLabel">{this.props.locations[i].Name}</text>
      );
    }
    var horLines = [];
    for (i = 0; i < this.props.height; i = i + 60) {
      horLines.push(
        <line x1={this.props.leftMargin} y1={i} x2={this.props.width + this.props.leftMargin} y2={i} className="gridline" />
      );
    }
    var vertLabels = [];
    for (i = 60; i < this.props.height; i = i + 60) {
      vertLabels.push(
        <text x="6" y={i + 12} className="gridLabel">{minutesToTime(i + this.props.start)}</text>
      );
      horLines.push(
        <line x1="0" y1={i} x2={this.props.width} y2={i} className="gridline" />
      );
    }
    var slotBands = [];
    for (i = 0; i < this.props.mySlots.length; i++) {
      var slot = this.props.mySlots[i];
      if (slot.SlotType == 0) {
        var refId = 'slot' + slot.SlotId.toString();
        slotBands.push(
          <rect x={this.props.leftMargin} y={slot.StartMinutes - this.props.start} 
                width={this.props.width} height={slot.DurationMins} 
                fill="url(#Pattern)" ref={refId} />
        );
      } else if (slot.SlotType == 1) {
        slotBands.push(
          <foreignObject x={this.props.leftMargin} y={slot.StartMinutes - this.props.start} width={this.props.width} height={slot.DurationMins}>
            <div className="panel panel-default closedSlot">
              <div className="panel-body embedded">
                {slot.Title}
              </div>
            </div>
          </foreignObject>
        );
      } else if (slot.SlotType == 2) {
        slotBands.push(
          <foreignObject x={this.props.locationList[slot.LocationId] * 100 + this.props.leftMargin} y={slot.StartMinutes - this.props.start} width="100" height={slot.DurationMins}>
            <div className="panel panel-default closedSlot">
              <div className="panel-body embedded">
                {slot.Title}
              </div>
            </div>
          </foreignObject>
        );
      }
    }
    var slots = [];
    for (i = 0; i < this.props.mySlots.length; i++) {
      var slot = this.props.mySlots[i];
      if (slot.SlotType == 0) {
        for (j = 0; j < this.props.locations.length; j++) {
          var refId = 'slot' + slot.SlotId.toString() + 'x' + this.props.locations[j].LocationId.toString();
          slots.push(
            <rect x={j * 100 + this.props.leftMargin} y={slot.StartMinutes - this.props.start} height={slot.DurationMins} width="100" className="sessionSlot canDrop"
                   ref={refId} data-slotid={slot.SlotId} data-locationid={this.props.locations[j].LocationId}
                   data-day={this.props.day} />
          );
        }
      }
    }
    return (
      <g>
         {vertLines}
         {horLines}
         {slotBands}
         {horLabels}
         {vertLabels}
         {slots}
      </g>
    );
  },

  componentDidMount: function() {},

  placeElement: function(el, key) {
    var sl = this.refs[key];
    if (sl != undefined) {
      if (key.indexOf('x') == -1) {
        for (var ref in this.refs) {
          if (ref.startsWith(key + 'x')) {
            this.refs[ref].getDOMNode().setAttribute('class', 'sessionSlot');
          }
        }
      }
      else {
        $(sl.getDOMNode()).attr('class', 'sessionSlot');
      }
      var box = sl.getDOMNode().getBoundingClientRect();
      var sessionBox = el.getBoundingClientRect();
      var session = $(el);
      session.width(box.width - 12);
      session.height(box.height - 12);
      moveObject(el,
        box.left - sessionBox.left + 4,
        box.top - sessionBox.top + 4);
      session.attr('data-orig-x', box.left - sessionBox.left + 4);
      session.attr('data-orig-y', box.top - sessionBox.top + 4);
      session.attr('data-slotkey', sl.getDOMNode().getAttribute('data-reactid'));
    }
  }

});

module.exports = SchedulerGrid;
