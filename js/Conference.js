(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var Comment = React.createClass({displayName: "Comment",
  render: function() {
    return (
      React.createElement("li", {className: "list-group-item"}, 
          React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-xs-2 col-md-1"}, 
                  React.createElement("img", {src: "http://placehold.it/80", className: "img-circle img-responsive", alt: ""})), 
              React.createElement("div", {className: "col-xs-10 col-md-11"}, 
                  React.createElement("div", {className: "comment-details"}, this.props.comment.StampLine), 
                  React.createElement("div", {className: "comment-text"}, this.props.comment.Remarks), 
                  React.createElement("div", {className: "action"}, 
                      React.createElement("button", {type: "button", className: "btn btn-primary btn-xs", title: "Edit"}, 
                          React.createElement("span", {className: "glyphicon glyphicon-pencil"})
                      ), 
                      React.createElement("button", {type: "button", className: "btn btn-success btn-xs", title: "Approved"}, 
                          React.createElement("span", {className: "glyphicon glyphicon-ok"})
                      ), 
                      React.createElement("button", {type: "button", className: "btn btn-danger btn-xs", title: "Delete"}, 
                          React.createElement("span", {className: "glyphicon glyphicon-trash"})
                      )
                  )
              )
          )
      )
    );
  }
});

module.exports = Comment;


},{}],2:[function(require,module,exports){
/** @jsx React.DOM */
var Comment = require('./Comment');

var CommentList = React.createClass({displayName: "CommentList",

  resources: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {
      comments: this.props.comments
    }
  },

  render: function() {
    var commentItems = this.props.comments.map(function(item) {
      return React.createElement(Comment, {moduleId: this.props.moduleId, comment: item, key: item.CommentId})
    }.bind(this));
    return (
      React.createElement("ul", {className: "list-group"}, 
       commentItems
      )
    );
  }

});

module.exports = CommentList;


},{"./Comment":1}],3:[function(require,module,exports){
/** @jsx React.DOM */
var CommentList = require('./CommentList');

var Comments = React.createClass({displayName: "Comments",

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
      comments: this.props.comments,
      commentCount: 0
    }
  },

  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
       React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "panel panel-default widget"}, 
         React.createElement("div", {className: "panel-heading"}, 
          React.createElement("span", {className: "glyphicon glyphicon-comment"}), 
          React.createElement("h3", {className: "panel-title"}, this.resources.Comments), 
          React.createElement("span", {className: "label label-info"}, this.state.commentCount)
         ), 
         React.createElement("div", {className: "panel-form"}, 
          React.createElement("div", null, 
           React.createElement("textarea", {className: "form-control", ref: "txtComment"})
          ), 
          React.createElement("div", {className: "panel-form-button"}, 
           React.createElement("button", {className: "btn btn-primary", ref: "cmdAdd", onClick: this.addComment}, "Add")
          )
         ), 
         React.createElement("div", {className: "panel-body"}, 
          React.createElement(CommentList, {moduleId: this.props.moduleId, comments: this.state.comments}), 
          React.createElement("a", {href: "#", className: "btn btn-primary btn-sm btn-block", role: "button"}, React.createElement("span", {className: "glyphicon glyphicon-refresh"}), " More")
         )
        )
       )
      )
    );
  },

  addComment: function(e) {
    e.preventDefault();
    var comment = this.refs.txtComment.getDOMNode().value;
    this.service.addComment(this.props.conferenceId, this.props.sessionId, this.props.visibility, comment, function(data) {
      this.refs.txtComment.getDOMNode().value = '';
      var newComments = this.state.comments;
      newComments.unshift(data);
      this.setState({
        comments: newComments,
        commentCount: this.state.commentCount + 1
      });
    }.bind(this));
    return false;
  }


});

module.exports = Comments;


},{"./CommentList":2}],4:[function(require,module,exports){
/** @jsx React.DOM */
var TimesheetEditorSlot = require('./TimesheetEditorSlot');

var TimesheetEditor = React.createClass({displayName: "TimesheetEditor",

  slotBeingEdited: null,
  resources: null,

  getInitialState: function() {
    var crtSlots = this.props.slots;
    crtSlots.sort(function(a, b) {
      return parseFloat(a.StartMinutes) - parseFloat(b.StartMinutes);
    });
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {
      moduleId: this.props.moduleId,
      slots: crtSlots,
      nrDays: this.props.nrDays,
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
        React.createElement(TimesheetEditorSlot, {moduleId: this.state.moduleId, 
           key: this.state.slots[i].SlotId, 
           slot: this.state.slots[i], 
           editSlot: this.editSlot, 
           onSlotUpdate: this.onSlotUpdate})
      );
    }
    var daySelector = [];
    for (var i = 1; i <= this.state.nrDays; i++) {
      var id = 'dnOpt' + i;
      daySelector.push(
        React.createElement("label", {className: "btn btn-primary"}, 
            React.createElement("input", {type: "radio", name: "daynr", value: i, autocomplete: "off", id: id}), " ", i
          )
      );
    }
    return (
      React.createElement("div", null, 
        React.createElement("div", {ref: "mainDiv", className: "timesheet"}, 
          React.createElement("div", {className: "timesheet-grid"}, 
            hours
          ), 
          React.createElement("ul", {className: "data"}, 
            React.createElement("li", null, " "), 
            slots
          )
        ), 
        React.createElement("div", {className: "buttons-right"}, 
          React.createElement("a", {href: "#", className: "btn btn-default", onClick: this.addClick}, this.resources.Add)
        ), 
        React.createElement("div", {className: "modal fade", tabindex: "-1", role: "dialog", ref: "popup"}, 
          React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("div", {className: "modal-content"}, 
              React.createElement("div", {className: "modal-header"}, 
                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
                React.createElement("h4", {className: "modal-title"}, this.resources.Slot)
              ), 
              React.createElement("div", {className: "modal-body"}, 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, this.resources.Type), 
                  React.createElement("select", {className: "form-control", ref: "slotType"}, 
                    React.createElement("option", {value: "0"}, this.resources.Session), 
                    React.createElement("option", {value: "1"}, this.resources.General)
                  )
                ), 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, this.resources.Title), 
                  React.createElement("input", {type: "text", className: "form-control", placeholder: this.resources.Title, ref: "title"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, this.resources.Description), 
                  React.createElement("textarea", {className: "form-control", placeholder: this.resources.Description, ref: "description"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, this.resources.Day), 
                  React.createElement("div", {ref: "dayNrButtons"}, 
                    React.createElement("div", {className: "btn-group", "data-toggle": "buttons"}, 
                      React.createElement("label", {className: "btn btn-primary"}, 
                        React.createElement("input", {type: "radio", name: "daynr", autocomplete: "off", value: "-1", id: "dnOpt0"}), " ", this.resources.All
                      ), 
                       daySelector 
                    )
                  )
                )
              ), 
              React.createElement("div", {className: "modal-footer"}, 
                React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, this.resources.Close), 
                React.createElement("button", {type: "button", className: "btn btn-warning", onClick: this.cmdDelete, ref: "cmdDelete"}, this.resources.Delete), 
                React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.cmdSave}, this.resources.SaveChanges)
              )
            )
          )
        )
      )
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
    this.refs.slotType.getDOMNode().value = '0';
    this.setDayNr(null);
  },

  setDayNr: function(dayNr) {
    var dnDiv = $(this.refs.dayNrButtons.getDOMNode());
    var btns = dnDiv.children().first().children();
    btns.removeClass('active');
    dayNr = dayNr ? dayNr : 0;
    btns.eq(dayNr).addClass('active');
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
    this.refs.slotType.getDOMNode().value = slot.SlotType;
    this.setDayNr(slot.DayNr);
    $(this.refs.popup.getDOMNode()).modal();
    $(this.refs.cmdDelete.getDOMNode()).show();
  },

  onSlotUpdate: function(slot, fail) {
    this.state.service.updateSlot(slot.ConferenceId, slot, function(data) {
      var newSlots = [];
      $(this.refs.popup.getDOMNode()).modal('hide');
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
    }.bind(this), function() {
      if (fail != undefined) {
        fail();
      }
    });
  },

  cmdSave: function(e) {
    var slot = this.slotBeingEdited;
    if (slot == null) {
      slot = {
        SlotId: -1,
        ConferenceId: this.props.conferenceId,
        DurationMins: 60,
        NewStartMinutes: 0
      }
    }
    slot.Title = this.refs.title.getDOMNode().value;
    slot.Description = this.refs.description.getDOMNode().value;
    var e = this.refs.slotType.getDOMNode();
    slot.SlotType = parseInt(e.options[e.selectedIndex].value);
    var dayNr = $(this.refs.dayNrButtons.getDOMNode())
      .children().first().children('label.active').first()
      .children().first().val();
    if (dayNr == -1) {
      slot.DayNr = null;
    } else {
      slot.DayNr = dayNr;
    }
    this.onSlotUpdate(slot);
  },

  cmdDelete: function(e) {
    if (confirm(this.resources.SlotDeleteConfirm)) {
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


});

module.exports = TimesheetEditor;


},{"./TimesheetEditorSlot":5}],5:[function(require,module,exports){
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
    var classes = "timesheet-box";
    switch (this.state.slot.SlotType) {
      case 0:
        classes += ' timesheet-box-sessions';
        break;
      case 1:
        classes += ' timesheet-box-general';
        break;
    }
    return (
      React.createElement("li", null, 
        React.createElement("span", {className: classes, 
               "data-id": this.state.slot.SlotId, 
               "data-oldstart": this.state.lastStart, 
               "data-oldlength": this.state.lastLength, 
               "data-start": this.state.lastStart, 
               "data-scale": "48", 
               "data-length": this.state.lastLength, 
               style: barStyle, 
               title: this.state.slot.Title, 
               onDoubleClick: this.doubleClicked, 
               ref: "timeBar"}, 
           React.createElement("strong", null, this.state.slot.DayNr), " ", this.state.slot.Title
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
    this.props.onSlotUpdate(slot, function() {
      timeBar.style.webkitTransform =
        timeBar.style.transform = null;
      timeText.style.transform = null;
      var len = that.state.lastLength,
        lenPixels = len * 1152 / 1440;
      timeBar.style.width = lenPixels + 'px';
    });
    return false;
  },

  doubleClicked: function() {
    this.props.editSlot(this.state.slot);
  }

});

module.exports = TimesheetEditorSlot;


},{}],6:[function(require,module,exports){
/** @jsx React.DOM */
var TimesheetEditor = require('./TimesheetEditor'),
    Comments = require('./Comments');

(function($, window, document, undefined) {

  $(document).ready(function() {
    ConnectConference.loadData();
  });

  window.ConnectConference = {
    modules: {},

    loadData: function() {
      $('.connectConference').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var resources = $(el).data('resources');
        var newModule = {
          service: new ConferenceService($, moduleId)
        };
        ConnectConference.modules[moduleId] = newModule;
        ConnectConference.modules[moduleId].resources = resources;
      });
      $('.timesheetEditor').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var slots = $(el).data('slots');
        var conferenceId = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        React.render(React.createElement(TimesheetEditor, {moduleId: moduleId, slots: slots, 
           conferenceId: conferenceId, nrDays: nrDays}), el);
      });
      $('.commentsComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var sessionId = $(el).data('session');
        var visiblity = $(el).data('visiblity');
        var pageSize = $(el).data('pageSize');
        var comments = $(el).data('comments');
        React.render(React.createElement(Comments, {moduleId: moduleId, 
           conferenceId: conferenceId, sessionId: sessionId, 
           visiblity: visiblity, pageSize: pageSize, comments: comments}), el);
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


},{"./Comments":3,"./TimesheetEditor":4}]},{},[6])
window.ConferenceService = function($, mid) {
  var moduleId = mid;
  var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Conference');

  this.ServicePath = function() {
    return baseServicepath;
  },

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
  this.orderSessions = function(conferenceId, newOrder, success, fail) {
    this.apiCall('POST', 'Sessions', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
  }
  this.orderSpeakers = function(conferenceId, newOrder, success, fail) {
    this.apiCall('POST', 'Speakers', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
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
  this.deleteSlot = function(conferenceId, slotId, success, fail) {
    this.apiCall('POST', 'Slots', 'Delete', conferenceId, slotId, null, success, fail);
  }
  this.addComment = function(conferenceId, sessionId, visibility, comment, success, fail) {
    this.apiCall('POST', 'Comments', 'Add', conferenceId, null, { SessionId: sessionId, Visibility: visibility, Remarks: comment}, success, fail);
  }

}

// Common functions for the module
function showLoading() {
 if ($('#serviceStatus').length) {
  $('#serviceStatus div:first-child').show();
  $('#serviceStatus div:nth-child(2)').hide();
  $('#serviceStatus').css('background', '#2FC1F3').show();
 }
}

function hideLoading() {
 if ($('#serviceStatus').length) {
  $('#serviceStatus').hide();
 }
}

function showError(message) {
 if ($('#serviceStatus').length) {
  $('#serviceStatus div:first-child').hide();
  $('#serviceStatus div:nth-child(2)').html(message).show();
  $('#serviceStatus').css('background', '#F33B2F').show();
  setTimeout(function () { $('#serviceStatus').hide(); }, 3000);
 }
}

function isInt(value) {
 return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function validateForm(form, submitButton, formErrorDiv) {
 submitButton.click(function () {
  var hasErrors = false;
  formErrorDiv.empty().hide();
  form.find('input[data-validator="integer"]').each(function (i, el) {
   if (!isInt($(el).val()) & $(el).val() != '') {
    hasErrors = true;
    $(el).parent().addClass('error');
    formErrorDiv.append('<span>' + $(el).attr('data-message') + '</span><br />').show();
   }
  });
  form.find('input[data-required="true"]').each(function (i, el) {
   if ($(el).val() == '') {
    hasErrors = true;
    $(el).parent().addClass('error');
    formErrorDiv.append('<span>' + $(el).attr('data-message') + '</span><br />').show();
   }
  });
  return !hasErrors;
 });
}

function getTableOrder(tableId) {
 var res = [];
 $('#' + tableId + ' tbody:first tr').each(function (i, el) {
  res.push({ id: $(el).data('id'), order: i });
 });
 return res;
}
