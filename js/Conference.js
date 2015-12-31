(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ConferenceService = function($, mid) {
  var moduleId = mid;
  var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Conference');

  this.apiCall = function(method, controller, action, conferenceId, id, data, success, fail) {
    //showLoading();
    var path = baseServicepath;
    if (conferenceId != null) {
      path += 'Conference/' + conferenceId + '/'
    }
    path = path + controller + '/' + action;
    if (id != null) {
      path += '/' + id
    }
    $.ajax({
      type: method,
      url: path,
      beforeSend: $.dnnSF(moduleId).setModuleHeaders,
      data: data
    }).done(function(data) {
      //hideLoading();
      if (success != undefined) {
        success(data);
      }
    }).fail(function(xhr, status) {
      //showError(xhr.responseText);
      if (fail != undefined) {
        fail(xhr.responseText);
      }
    });
  }

  this.orderTracks = function(conferenceId, newOrder, success, fail) {
    this.apiCall('POST', 'Tracks', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
  }
  this.orderLocations = function(conferenceId, newOrder, success, fail) {
    this.apiCall('POST', 'Locations', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
  }
  this.deleteTrack = function(conferenceId, trackId, success, fail) {
    this.apiCall('POST', 'Tracks', 'Delete', conferenceId, trackId, null, success, fail);
  }
  this.deleteLocation = function(conferenceId, locationId, success, fail) {
    this.apiCall('POST', 'Locations', 'Delete', conferenceId, locationId, null, success, fail);
  }
  this.getConferenceSlots = function(conferenceId, success, fail) {
    this.apiCall('POST', 'Slots', 'List', conferenceId, null, null, success, fail);
  }
  this.updateSlot = function(conferenceId, slot, success, fail) {
    this.apiCall('POST', 'Slots', 'Update', conferenceId, slot.SlotId, slot, success, fail);
  }

}

module.exports = ConferenceService;


},{}],2:[function(require,module,exports){
/** @jsx React.DOM */
var TimesheetEditorSlot = require('./TimesheetEditorSlot');

var TimesheetEditor = React.createClass({displayName: "TimesheetEditor",

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
      hours.push(React.createElement("section", null, i, ":00"));
    }
    var slots = [];
    for (var i = 0; i < this.state.slots.length; i++) {
      slots.push(
        React.createElement(TimesheetEditorSlot, {moduleId: this.state.moduleId, slot: this.state.slots[i]})
      );
    }
    return (
      React.createElement("div", {ref: "mainDiv", className: "timesheet"}, 
        React.createElement("div", {className: "timesheet-grid"}, 
          hours
        ), 
        React.createElement("ul", {className: "data"}, 
          React.createElement("li", null, " "), 
          slots
        )
      )
    );
  },

  setupEditor: function() {

    $(".timesheet").css({
      'height': (($(".timesheet .data").height() + 20) + 'px')
    });

  }


});

module.exports = TimesheetEditor;


},{"./TimesheetEditorSlot":3}],3:[function(require,module,exports){
/** @jsx React.DOM */
var TimesheetEditorSlot = React.createClass({displayName: "TimesheetEditorSlot",

  getInitialState: function() {
    return {
      moduleId: this.props.moduleId,
      slot: this.props.slot,
      service: ConnectConference.modules[this.props.moduleId].service,
      lastStart: this.props.slot.StartMinutes,
      lastLength: this.props.slot.DurationMins
    }
  },

  render: function() {
    var start = this.state.lastStart,
      startPixels = start * 1152 / 1440,
      len = this.state.lastLength,
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
    return (
      React.createElement("li", null, 
        React.createElement("span", {className: "timesheet-box", 
               "data-id": this.state.slot.SlotId, 
               "data-oldstart": this.state.lastStart, 
               "data-oldlength": this.state.lastLength, 
               "data-start": this.state.lastStart, 
               "data-scale": "48", 
               "data-length": this.state.lastLength, 
               style: barStyle, 
               ref: "timeBar"}
        ), 
        React.createElement("span", {className: "timesheet-time", style: txtStyle, ref: "timeText"}, timeString)
      )
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
      slot = this.state.slot,
      that = this;
    slot.DurationMins = parseInt(timeBar.getAttribute('data-length'));
    slot.NewStartMinutes = parseInt(timeBar.getAttribute('data-start'));
    this.state.service.updateSlot(slot.ConferenceId, slot, function() {
      that.setState({
        lastStart: slot.NewStartMinutes,
        lastLength: slot.DurationMins
      });
    }, function() {
      timeBar.style.webkitTransform =
        timeBar.style.transform = null;
      timeText.style.transform = null;
      var len = that.state.lastLength,
        lenPixels = len * 1152 / 1440;
      timeBar.style.width = lenPixels + 'px';
    });
    return false;
  }

});

module.exports = TimesheetEditorSlot;


},{}],4:[function(require,module,exports){
/** @jsx React.DOM */
var ConferenceService = require('./ConferenceService'),
    TimesheetEditor = require('./TimesheetEditor');

;
(function($, window, document, undefined) {

  $(document).ready(function() {
    ConnectConference.loadData();
  });

  window.ConnectConference = {
    modules: {},

    loadData: function() {
      $('.connectConference').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var newModule = {
          service: new ConferenceService($, moduleId)
        };
        ConnectConference.modules[moduleId] = newModule;
      });
      $('.timesheetEditor').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var slots = $(el).data('slots');
        React.render(React.createElement(TimesheetEditor, {moduleId: moduleId, slots: slots}), el);
      });
    },

    formatString: function(format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    }


  }


})(jQuery, window, document);


},{"./ConferenceService":1,"./TimesheetEditor":2}]},{},[4])