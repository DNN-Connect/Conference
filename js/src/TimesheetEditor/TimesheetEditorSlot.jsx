module.exports = React.createClass({

  getInitialState: function() {
    return {
    }
  },

  render: function() {
    var start = this.props.slot.StartMinutes,
      startPixels = start * 1152 / 1440,
      len = this.props.slot.DurationMins,
      lenPixels = len * 1152 / 1440,
      timeString = this.getTimestring(start, len);
    var barStyle = {
      marginLeft: startPixels + 'px',
      width: lenPixels + 'px',
      zIndex: 999
    };
    var txtStyle = {
      marginLeft: lenPixels + 'px'
    };
    var classes = "timesheet-box";
    switch (this.props.slot.SlotType) {
      case 0:
        classes += ' timesheet-box-sessions';
        break;
      case 1:
        classes += ' timesheet-box-general';
        break;
    }
    return (
      <li>
        <span className={classes}
               data-id={this.props.slot.SlotId}
               data-oldstart={this.props.slot.StartMinutes}
               data-oldlength={this.props.slot.DurationMins}
               data-start={this.props.slot.StartMinutes}
               data-scale="48"
               data-length={this.props.slot.DurationMins}
               style={barStyle}
               title={this.props.slot.Title}
               onDoubleClick={this.doubleClicked}
               ref="timeBar">
           <strong>{this.props.slot.DayNr}</strong> <strong>{this.props.slot.LocationName}</strong> {this.props.slot.Title}
        </span>
        <span className="timesheet-time" style={txtStyle} ref="timeText">{timeString}</span>
      </li>
    );
  },

  componentDidMount: function() {
    var that = this;
    this.interactable = interact(this.refs.timeBar.getDOMNode());
    this.interactable
      .draggable({
        inertia: false,
        restrict: {
          restriction: "parent",
          endOnly: true
        },
        autoScroll: false,
        onmove: function(event) {
          var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            hour = parseFloat(target.getAttribute('data-scale')),
            start = parseInt(target.getAttribute('data-oldstart')),
            scale = hour / 12,
            roundX = Math.round(x / scale) * scale,
            newMins = start + (60 * roundX / hour),
            textSpan = target.nextElementSibling;
          target.style.webkitTransform =
            target.style.transform =
            'translate(' + roundX + 'px, 0px)';
          target.setAttribute('data-x', x);
          target.setAttribute('data-start', newMins);
          textSpan.style.transform =
            'translate(' + roundX + 'px, 0px)';
          textSpan.innerHTML = that.getTimestring(newMins, parseInt(target.getAttribute('data-length')));
        },
        onend: that.updateSlot
      })
      .resizable({
        preserveAspectRatio: false,
        edges: {
          left: false,
          right: true,
          bottom: false,
          top: false
        },
        onmove: function(event) {
          var target = event.target,
            dragLen = event.rect.width,
            hour = parseFloat(target.getAttribute('data-scale')),
            scale = hour / 12,
            roundLen = Math.round(dragLen / scale) * scale,
            newMins = 60 * roundLen / hour,
            textSpan = target.nextElementSibling;

          target.setAttribute('data-length', newMins);
          target.style.width = roundLen + 'px';
          textSpan.innerHTML = that.getTimestring(parseInt(target.getAttribute('data-start')), newMins);
        },
        onend: that.updateSlot
      });
  },

  componentWillUnmount: function() {
    this.interactable.unset();
    this.interactable = null;
  },

  getTimestring: function(start, len) {
    var timeString = (start % 60).toString();
    if (timeString.length < 2) {
      timeString = '0' + timeString
    }
    timeString = (Math.floor(start / 60)).toString() + ':' + timeString + ' ';
    var minsDuration = (len % 60).toString();
    if (minsDuration.length < 2) {
      minsDuration = '0' + minsDuration
    }
    timeString += (Math.floor(len / 60)).toString() + ':' + minsDuration;
    return timeString;
  },

  updateSlot: function(event) {
    var timeBar = this.refs.timeBar.getDOMNode(),
      timeText = this.refs.timeText.getDOMNode(),
      slot = this.props.slot;
    slot.DurationMins = parseInt(timeBar.getAttribute('data-length'));
    slot.NewStartMinutes = parseInt(timeBar.getAttribute('data-start'));
    this.props.onSlotUpdate(slot, function() {
      timeBar.style.webkitTransform =
        timeBar.style.transform = null;
      timeText.style.transform = null;
      var len = this.props.slot.DurationMins,
        lenPixels = len * 1152 / 1440;
      timeBar.style.width = lenPixels + 'px';
    }.bind(this));
    return false;
  },

  doubleClicked: function() {
    this.props.editSlot(this.props.slot);
  }

});
