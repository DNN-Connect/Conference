module.exports = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    var vertLines = [];
    for (var i = this.props.leftMargin; i < this.props.width; i = i + 100) {
      vertLines.push(
        <line x1={i} y1="0" x2={i} y2={this.props.height} className="gridline" />
      );
    }
    var horLabels = [];
    for (var i = 0; i < this.props.locations.length; i++) {
      horLabels.push(
        <text x={6 + i*100 + this.props.leftMargin} y="20" className="gridLabel">{this.props.locations[i].Name}</text>
      );
    }
    var horLines = [];
    for (var i = 0; i < this.props.height; i = i + 60) {
      horLines.push(
        <line x1={this.props.leftMargin} y1={i} x2={this.props.width + this.props.leftMargin} y2={i} className="gridline" />
      );
    }
    var vertLabels = [];
    for (var i = 60; i < this.props.height; i = i + 60) {
      vertLabels.push(
        <text x="6" y={i + 12} className="gridLabel">{minutesToTime(i + this.props.start)}</text>
      );
      horLines.push(
        <line x1="0" y1={i} x2={this.props.width} y2={i} className="gridline" />
      );
    }
    var slotBands = [];
    for (var i = 0; i < this.props.slots.length; i++) {
      var slot = this.props.slots[i];
      if (slot.SlotType == 0) {
        var refId = 'slot' + this.props.day + 'x' + slot.SlotId.toString();
        slotBands.push(
          <rect x={this.props.leftMargin} y={slot.StartMinutes - this.props.start} 
                width={this.props.width} height={slot.DurationMins} data-type="slot"
                id={refId} data-slotid={slot.SlotId} data-locationid="-1" data-day={this.props.day}
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
    for (var i = 0; i < this.props.slots.length; i++) {
      var slot = this.props.slots[i];
      if (slot.SlotType == 0) {
        for (var j = 0; j < this.props.locations.length; j++) {
          var refId = 'slot' + this.props.day + 'x' + slot.SlotId.toString() + 'x' + this.props.locations[j].LocationId.toString();
          slots.push(
            <rect x={j * 100 + this.props.leftMargin} y={slot.StartMinutes - this.props.start} height={slot.DurationMins} width="100" className="sessionSlot canDrop"
                   ref={refId} data-slotid={slot.SlotId} data-locationid={this.props.locations[j].LocationId} id={refId}
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

  componentDidMount: function() {}

});
