(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var Comment = React.createClass({displayName: "Comment",

  resources: null,
  security: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.security = ConnectConference.modules[this.props.moduleId].security;
    return {};
  },

  render: function() {
    var imgUrl = this.props.appPath + '/DnnImageHandler.ashx?mode=profilepic&w=64&h=64&userId=' + this.props.comment.UserId;
    var actionBar = null;
    if (this.security.CanManage | this.security.UserId == this.props.comment.UserId) {
      actionBar = (
                  React.createElement("div", {className: "action"}, 
                      React.createElement("button", {type: "button", className: "btn btn-danger btn-xs", 
                              title: this.resources.Delete, onClick: this.props.onDelete.bind(null, this.props.comment.CommentId), 
                              "data-id": this.props.comment.CommentId}, 
                          React.createElement("span", {className: "glyphicon glyphicon-trash"})
                      )
                  )
        );
    }
    return (
      React.createElement("li", {className: "list-group-item"}, 
          React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "img-col"}, 
                  React.createElement("img", {src: imgUrl, className: "img-circle img-responsive", alt: ""})), 
              React.createElement("div", {className: "comment-col"}, 
                  React.createElement("div", {className: "comment-details"}, this.props.comment.StampLine), 
                  React.createElement("div", {className: "comment-text"}, this.props.comment.Remarks), 
                  actionBar
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

var Comments = React.createClass({displayName: "Comments",

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    if (this.props.pollingSeconds == undefined) {
      this.pollingInterval = 30000;
    } else {
      this.pollingInterval = this.props.pollingSeconds * 1000;
    }
    return {
      comments: this.props.comments,
      commentCount: this.props.totalComments,
      canLoadMore: (this.props.totalComments > this.props.comments.length) ? true : false,
      lastPage: 0
    }
  },

  render: function() {
    var submitPanel = React.createElement("div", null);
    var commentList = this.state.comments.map(function(item) {
      return React.createElement(Comment, {moduleId: this.props.moduleId, comment: item, key: item.CommentId, 
                      appPath: this.props.appPath, onDelete: this.onCommentDelete})
    }.bind(this));
    if (this.props.loggedIn) {
      submitPanel = (
        React.createElement("div", {className: "panel-form"}, 
          React.createElement("div", null, 
           React.createElement("textarea", {className: "form-control", ref: "txtComment", placeholder: this.props.help})
          ), 
          React.createElement("div", {className: "panel-form-button"}, 
           React.createElement("button", {className: "btn btn-primary", ref: "cmdAdd", onClick: this.addComment}, this.resources.AddComment)
          )
         )
      );
    }
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-xs-12"}, 
          React.createElement("div", {className: "panel panel-default widget"}, 
           React.createElement("div", {className: "panel-heading"}, 
            React.createElement("span", {className: "glyphicon glyphicon-comment"}), 
            React.createElement("h3", {className: "panel-title"}, this.props.title), 
            React.createElement("span", {className: "label label-info"}, this.state.commentCount)
           ), 
           submitPanel, 
           React.createElement("div", {className: "panel-body"}, 
            React.createElement("ul", {className: "list-group"}, 
              commentList
            ), 
            React.createElement("a", {href: "#", className: "btn btn-primary btn-sm btn-block", role: "button", 
               onClick: this.loadMoreComments, ref: "cmdMore", disabled: !this.state.canLoadMore}, 
               React.createElement("span", {className: "glyphicon glyphicon-refresh"}), " ", this.resources.More
            )
           )
          )
        )
       )
    );
  },

  componentDidMount: function() {
    this.lastCheck = new Date();
    this.pollServer();
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
  },

  loadMoreComments: function(e) {
    e.preventDefault();
    if (this.state.canLoadMore) {
      this.service.loadComments(this.props.conferenceId, this.props.sessionId, this.props.visibility, this.state.lastPage + 1, this.props.pageSize, function(data) {
        var newCommentList = this.state.comments;
        newCommentList = newCommentList.concat(data);
        this.setState({
          comments: newCommentList,
          lastPage: this.state.lastPage + 1,
          canLoadMore: (data.length < this.props.pageSize) ? false : true
        });
      }.bind(this));
    }
  },

  onCommentDelete: function(commentId, e) {
    e.preventDefault();
    if (confirm(this.resources.CommentDeleteConfirm)) {
      this.service.deleteComment(this.props.conferenceId, commentId, function() {
        var newCommentList = [];
        for (i = 0; i < this.state.comments.length; i++) {
          if (this.state.comments[i].CommentId != commentId) {
            newCommentList.push(this.state.comments[i]);
          }
        }
        this.setState({
          comments: newCommentList,
          commentCount: this.state.commentCount - 1
        });
      }.bind(this));
    }
  },

  pollServer: function() {
    setTimeout(function() {
      this.service.checkNewComments(this.props.conferenceId, this.props.sessionId,
        this.props.visibility, this.lastCheck,
        function(data) {
          this.lastCheck = new Date(data.CheckTime);
          if (data.Comments.length > 0) {
            var newCommentList = data.Comments;
            for (i = 0; i < this.state.comments.length; i++) {
              if ($.inArray(this.state.comments[i], newCommentList) == -1) {
                newCommentList.push(this.state.comments[i]);
              }
            }
            this.setState({
              comments: newCommentList,
              commentCount: data.NewTotalComments
            });
          }
          this.pollServer();
        }.bind(this));
    }.bind(this), this.pollingInterval);
  }


});

module.exports = Comments;


},{"./Comment":1}],3:[function(require,module,exports){
/** @jsx React.DOM */
var ScheduleDay = require('./ScheduleDay');

var Schedule = React.createClass({displayName: "Schedule",

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    var locationList = {};
    for (i=0;i<this.props.locations.length;i++)
    {
      locationList[this.props.locations[i].LocationId] = i;
    }
    var slotList = {};
    for (j=0;j<this.props.slots.length;j++)
    {
      slotList[this.props.slots[j].SlotId] = this.props.slots[j];
    }
    return {
      sessionList: this.props.sessions,
      locationList: locationList,
      slotList: slotList
    }
  },

  render: function() {
    var scheduleDays = [];
    for (i = 1; i <= this.props.nrDays; i++) {
      var daySlots = [];
      for (j=0;j<this.props.slots.length;j++)
      {
        var slot = this.props.slots[j];
        if (slot.DayNr == undefined | slot.DayNr == i)
        {
          daySlots.push(slot);
        }
      }
      scheduleDays.push(
        React.createElement(ScheduleDay, {conference: this.props.conference, day: i, slots: daySlots, 
           start: Math.floor(daySlots[0].StartMinutes/60) * 60 - 60, 
           finish: 120 + Math.floor(daySlots[daySlots.length - 1].StartMinutes / 60) * 60, 
           locationList: this.state.locationList, 
           leftMargin: 50, 
           sessionList: this.state.sessionList, 
           locations: this.props.locations, 
           slotList: this.state.slotList})
        );
    }
    return (
      React.createElement("div", {className: "row Scheduler"}, 
        React.createElement("div", {className: "col-xs-12", ref: "scheduleColumn"}, 
          scheduleDays
        )
      )
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      $('[data-toggle="popover"]').popover({html:true, trigger: 'hover', container: 'body'});
      $('div.embedded').each(function(i, el) {
        $(el).height($(el).parent().attr('height') - 12);
      })
    }.bind(this));
  }

});

module.exports = Schedule;


},{"./ScheduleDay":4}],4:[function(require,module,exports){
/** @jsx React.DOM */
var ScheduleGrid = require('./ScheduleGrid'),
    SchedulerScheduledSession = require('./ScheduleScheduledSession');

var ScheduleDay = React.createClass({displayName: "ScheduleDay",

  propTypes: {
    day: React.PropTypes.number,
    start: React.PropTypes.number,
    finish: React.PropTypes.number,
    leftMargin: React.PropTypes.number
  },

  getInitialState: function() {
    return {}
  },

  render: function() {
    var height = this.props.finish - this.props.start;
    var width = this.props.locations.length * 100;
    var viewBox = "0 0 " + (width + this.props.leftMargin).toString() + " " + height;
    var scheduledSessions = [];
    for (i=0;i<this.props.sessionList.length;i++)
    {
      var session = this.props.sessionList[i];
      if (session.DayNr == this.props.day & session.SlotId > 0)
      {
        var slot = this.props.slotList[session.SlotId];
        if (session.IsPlenary) {
          scheduledSessions.push(
          React.createElement("foreignObject", {x: this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: this.props.width, height: slot.DurationMins}, 
            React.createElement(SchedulerScheduledSession, {session: session})
          )
            );          

        } else {
          scheduledSessions.push(
          React.createElement("foreignObject", {x: this.props.locationList[session.LocationId] * 100 + this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: "100", height: slot.DurationMins}, 
            React.createElement(SchedulerScheduledSession, {session: session})
          )
            );          
        }
      }
    }
    var date = new Date(this.props.conference.StartDate);
    date = date.addDays(this.props.day - 1);
    var dateString = moment(date).format('dddd MMM Do');
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, dateString), 
        React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", 
             className: "schedulerDay", 
             viewBox: viewBox}, 
             React.createElement("pattern", {id: "Pattern", x: "10", y: "10", width: "8", height: "8", patternUnits: "userSpaceOnUse"}, 
              React.createElement("path", {d: "M0 0L8 8ZM8 0L0 8Z", className: "hashLines"})
             ), 
             React.createElement("rect", {x: "0", y: "0", height: height, width: width + this.props.leftMargin, className: "dayBackground"}), 
             React.createElement(ScheduleGrid, {width: width, height: height, leftMargin: this.props.leftMargin, 
                            start: this.props.start, ref: "Grid", locationList: this.props.locationList, 
                            locations: this.props.locations, slots: this.props.slots, day: this.props.day}), 
             scheduledSessions
        )
      )
    );
  }

});

module.exports = ScheduleDay;


},{"./ScheduleGrid":5,"./ScheduleScheduledSession":6}],5:[function(require,module,exports){
/** @jsx React.DOM */
var ScheduleGrid = React.createClass({displayName: "ScheduleGrid",

  getInitialState: function() {
    return {}
  },

  render: function() {
    var vertLines = [];
    for (i = this.props.leftMargin; i < this.props.width; i = i + 100) {
      vertLines.push(
        React.createElement("line", {x1: i, y1: "0", x2: i, y2: this.props.height, className: "gridline"})
      );
    }
    var horLabels = [];
    for (i = 0; i < this.props.locations.length; i++) {
      horLabels.push(
        React.createElement("text", {x: 6 + i*100 + this.props.leftMargin, y: "20", className: "gridLabel"}, this.props.locations[i].Name)
      );
    }
    var horLines = [];
    for (i = 0; i < this.props.height; i = i + 60) {
      horLines.push(
        React.createElement("line", {x1: this.props.leftMargin, y1: i, x2: this.props.width + this.props.leftMargin, y2: i, className: "gridline"})
      );
    }
    var vertLabels = [];
    for (i = 60; i < this.props.height; i = i + 60) {
      vertLabels.push(
        React.createElement("text", {x: "6", y: i + 12, className: "gridLabel"}, minutesToTime(i + this.props.start))
      );
      horLines.push(
        React.createElement("line", {x1: "0", y1: i, x2: this.props.width, y2: i, className: "gridline"})
      );
    }
    var slotBands = [];
    for (i = 0; i < this.props.slots.length; i++) {
      var slot = this.props.slots[i];
      if (slot.SlotType == 1) {
        slotBands.push(
          React.createElement("foreignObject", {x: this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: this.props.width, height: slot.DurationMins}, 
            React.createElement("div", {className: "panel panel-default"}, 
              React.createElement("div", {className: "panel-body embedded"}, 
                slot.Title
              )
            )
          )
        );
      } else if (slot.SlotType == 2) {
        slotBands.push(
          React.createElement("foreignObject", {x: this.props.locationList[slot.LocationId] * 100 + this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: "100", height: slot.DurationMins}, 
            React.createElement("div", {className: "panel panel-default"}, 
              React.createElement("div", {className: "panel-body embedded"}, 
                slot.Title
              )
            )
          )
        );
      }
    }
    return (
      React.createElement("g", null, 
         vertLines, 
         horLines, 
         horLabels, 
         vertLabels, 
         slotBands
      )
    );
  },

  componentDidMount: function() {}

});

module.exports = ScheduleGrid;


},{}],6:[function(require,module,exports){
/** @jsx React.DOM */
var ScheduleScheduledSession = React.createClass({displayName: "ScheduleScheduledSession",

  getInitialState: function() {
    return {}
  },

  render: function() {
    var speakers = this.props.session.Speakers.map(function(item) {
      return (
        React.createElement("span", {className: "speaker"}, item.Value)
        );
    });
    var speakerList = '<br/>';
    this.props.session.Speakers.forEach(function(el) {
      speakerList += '<span class="speaker">' + el.Value + '</span>';
    });
    return (
      React.createElement("div", {className: "panel panel-default session scheduled embedded", "data-slotid": this.props.session.SlotId, 
           "data-locationid": this.props.session.LocationId, "data-plenary": this.props.session.IsPlenary, 
           ref: "Session", "data-sessionid": this.props.session.SessionId, "data-day": this.props.session.DayNr, 
           "data-toggle": "popover", title: this.props.session.Title, 
           "data-content": this.props.session.Description + speakerList}, 
       React.createElement("div", {className: "panel-body"}, 
         React.createElement("div", {className: "speakers"}, speakers), 
         this.props.session.Title
       )
      )
    );
  }

});

module.exports = ScheduleScheduledSession;


},{}],7:[function(require,module,exports){
/** @jsx React.DOM */
var SchedulerDay = require('./SchedulerDay'),
  SchedulerUnscheduledSession = require('./SchedulerUnscheduledSession');

var Scheduler = React.createClass({displayName: "Scheduler",

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    var locationList = {};
    for (i=0;i<this.props.locations.length;i++)
    {
      locationList[this.props.locations[i].LocationId] = i;
    }
    return {
      sessionList: this.props.sessions,
      locationList: locationList
    }
  },

  render: function() {
    var unscheduledSessions = this.state.sessionList.map(function(item) {
      if (item.SlotId == 0) {
        return React.createElement(SchedulerUnscheduledSession, React.__spread({},  this.props, {session: item, key: item.SessionId}))
      }
      else
      {
        return null;        
      }
    });
    var scheduleDays = [];
    for (i = 1; i <= this.props.nrDays; i++) {
      var daySlots = [];
      for (j=0;j<this.props.slots.length;j++)
      {
        var slot = this.props.slots[j];
        if (slot.DayNr == undefined | slot.DayNr == i)
        {
          daySlots.push(slot);
        }
      }
      scheduleDays.push(
        React.createElement(SchedulerDay, {conference: this.props.conference, day: i, slots: daySlots, 
           start: Math.floor(daySlots[0].StartMinutes/60) * 60 - 60, 
           finish: 120 + Math.floor(daySlots[daySlots.length - 1].StartMinutes / 60) * 60, 
           locationList: this.state.locationList, 
           leftMargin: 50, 
           sessionList: this.state.sessionList, 
           locations: this.props.locations, 
           sessionPlace: this.sessionPlace})
        );
    }
    return (
      React.createElement("div", {className: "row Scheduler"}, 
        React.createElement("div", {className: "col-xs-12 col-md-2 unscheduled canDrop", ref: "unscheduledColumn"}, 
          unscheduledSessions
        ), 
        React.createElement("div", {className: "col-xs-12 col-md-10", ref: "schedulerColumn"}, 
          scheduleDays
        )
      )
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      var hasReset = true;
      interact('.session')
        .draggable({
          inertia: false,
          restrict: {
            endOnly: true
          },
          autoScroll: true,
          onend: function(event) {}
        })
        .on('dragmove', function(event) {
          moveObject(event.target, event.dx, event.dy);
        });
      interact('.canDrop')
        .dropzone({
          accept: '.session',
          overlap: 0.5,
          ondropactivate: function(event) {
            hasReset = false;
            $(event.relatedTarget).width(100);
            $(event.relatedTarget).popover('hide');
          },
          ondragenter: function(event) {
            var dropzoneElement = event.target;
            dropzoneElement.classList.add('drop-target');
          },
          ondragleave: function(event) {
            event.target.classList.remove('drop-target');
          },
          ondrop: function(event) {
            hasReset = true;
            if (event.target === this.refs.unscheduledColumn.getDOMNode())
            {
              this.tryRemoveSession(event.relatedTarget);
            }
            else
            {
              this.tryMoveSession(event.relatedTarget, event.target);
            }
          }.bind(this),
          ondropdeactivate: function(event) {
            if (!hasReset)
            {
              this.sessionPlace(event.relatedTarget);
              hasReset = true;
            }
            event.target.classList.remove('drop-target');
          }.bind(this)
        });
        $(this.refs.unscheduledColumn.getDOMNode()).height(this.refs.schedulerColumn.getDOMNode().getBoundingClientRect().height);
        $('[data-toggle="popover"]').popover({html:true, trigger: 'hover'});
    }.bind(this));
  },

  sessionPlace: function(session) {
    var jqSession = $(session);
    var sessionBox = session.getBoundingClientRect();
    var key = 'slot' + session.getAttribute('data-day') + 'x' + session.getAttribute('data-slotid');
    if (session.getAttribute('data-plenary') != 'true') {
      key += 'x' + session.getAttribute('data-locationid');
    }
    var slot = document.getElementById(key);
    if (slot != null)
    {
      var jqSlot = $(slot);
      var slotBox = slot.getBoundingClientRect();
      jqSession.width(slotBox.width - 12);
      jqSession.height(slotBox.height - 12);
      moveObject(session,
        slotBox.left - sessionBox.left + 4,
        slotBox.top - sessionBox.top + 4);
      session.setAttribute('data-orig-x', slotBox.left - sessionBox.left + 4);
      session.setAttribute('data-orig-y', slotBox.top - sessionBox.top + 4);
      session.setAttribute('data-slotkey', slot.getAttribute('data-reactid'));
      slot.classList.remove('canDrop');
    }
    else {
      session.setAttribute('data-orig-x', '');
      session.setAttribute('data-orig-y', '');
      session.setAttribute('data-slotkey', '');
      session.style.webkitTransform =
        session.style.transform =
        '';
      session.setAttribute('data-x', '');
      session.setAttribute('data-y', '');
    }
  },

  tryRemoveSession: function(session) {
    var sessionId = session.getAttribute('data-sessionid');
    this.service.tryRemoveSession(this.props.conference.conferenceId, sessionId, function(data) {
      hasReset = true;
      this.setState({
        sessionList: data
      });
    }.bind(this), function(data) {
      alert(data);
      $(session).css('width', 'auto');
      this.sessionPlace(session);
    }.bind(this));
    if (session.getAttribute('data-slotkey') != '') {
      $('[data-reactid="' + session.getAttribute('data-slotkey') + '"]').attr('class', 'sessionSlot canDrop');
    }
  },

  tryMoveSession: function(session, slot) {
    var jqSession = $(session);
    var jqSlot = $(slot);
    var sessionId = jqSession.data('sessionid');
    var isPlenary = jqSession.data('plenary');
    var slotId = jqSlot.data('slotid');
    var locationId = jqSlot.data('locationid');
    var day = jqSlot.data('day');
    this.service.tryMoveSession(this.props.conference.conferenceId, sessionId, day, slotId, locationId, false, function(data) {
      hasReset = true;
      this.setState({
        sessionList: data
      });
    }.bind(this), function(data) {
      alert(data);
      $(session).css('width', 'auto');
      this.sessionPlace(session);
    }.bind(this));
    if (jqSession.data('slotkey') != '') {
      $('[data-reactid="' + jqSession.data('slotkey') + '"]').attr('class', 'sessionSlot canDrop');
    }
  }

});

module.exports = Scheduler;


},{"./SchedulerDay":8,"./SchedulerUnscheduledSession":11}],8:[function(require,module,exports){
/** @jsx React.DOM */
var SchedulerGrid = require('./SchedulerGrid'),
    SchedulerScheduledSession = require('./SchedulerScheduledSession');

var SchedulerDay = React.createClass({displayName: "SchedulerDay",

  propTypes: {
    day: React.PropTypes.number,
    start: React.PropTypes.number,
    finish: React.PropTypes.number,
    leftMargin: React.PropTypes.number
  },

  getInitialState: function() {
    return {}
  },

  render: function() {
    var height = this.props.finish - this.props.start;
    var width = this.props.locations.length * 100;
    var viewBox = "0 0 " + (width + this.props.leftMargin).toString() + " " + height;
    var scheduledSessions = [];
    for (i=0;i<this.props.sessionList.length;i++)
    {
      var session = this.props.sessionList[i];
      if (session.DayNr == this.props.day & session.SlotId > 0)
      {
        scheduledSessions.push(
          React.createElement(SchedulerScheduledSession, {session: session, sessionPlace: this.props.sessionPlace})
          );
      }
    }
    var date = new Date(this.props.conference.StartDate);
    date = date.addDays(this.props.day - 1);
    var dateString = moment(date).format('dddd MMM Do');
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, dateString), 
        React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", 
             className: "schedulerDay", 
             viewBox: viewBox}, 
             React.createElement("pattern", {id: "Pattern", x: "10", y: "10", width: "8", height: "8", patternUnits: "userSpaceOnUse"}, 
              React.createElement("path", {d: "M0 0L8 8ZM8 0L0 8Z", className: "hashLines"})
             ), 
             React.createElement("rect", {x: "0", y: "0", height: height, width: width + this.props.leftMargin, className: "dayBackground"}), 
             React.createElement(SchedulerGrid, {width: width, height: height, leftMargin: this.props.leftMargin, 
                            start: this.props.start, ref: "Grid", locationList: this.props.locationList, 
                            locations: this.props.locations, slots: this.props.slots, day: this.props.day})
        ), 
        scheduledSessions
      )
    );
  },

  componentDidMount: function() {
  }

});

module.exports = SchedulerDay;


},{"./SchedulerGrid":9,"./SchedulerScheduledSession":10}],9:[function(require,module,exports){
/** @jsx React.DOM */
var SchedulerGrid = React.createClass({displayName: "SchedulerGrid",

  getInitialState: function() {
    return {}
  },

  render: function() {
    var vertLines = [];
    for (i = this.props.leftMargin; i < this.props.width; i = i + 100) {
      vertLines.push(
        React.createElement("line", {x1: i, y1: "0", x2: i, y2: this.props.height, className: "gridline"})
      );
    }
    var horLabels = [];
    for (i = 0; i < this.props.locations.length; i++) {
      horLabels.push(
        React.createElement("text", {x: 6 + i*100 + this.props.leftMargin, y: "20", className: "gridLabel"}, this.props.locations[i].Name)
      );
    }
    var horLines = [];
    for (i = 0; i < this.props.height; i = i + 60) {
      horLines.push(
        React.createElement("line", {x1: this.props.leftMargin, y1: i, x2: this.props.width + this.props.leftMargin, y2: i, className: "gridline"})
      );
    }
    var vertLabels = [];
    for (i = 60; i < this.props.height; i = i + 60) {
      vertLabels.push(
        React.createElement("text", {x: "6", y: i + 12, className: "gridLabel"}, minutesToTime(i + this.props.start))
      );
      horLines.push(
        React.createElement("line", {x1: "0", y1: i, x2: this.props.width, y2: i, className: "gridline"})
      );
    }
    var slotBands = [];
    for (i = 0; i < this.props.slots.length; i++) {
      var slot = this.props.slots[i];
      if (slot.SlotType == 0) {
        var refId = 'slot' + this.props.day + 'x' + slot.SlotId.toString();
        slotBands.push(
          React.createElement("rect", {x: this.props.leftMargin, y: slot.StartMinutes - this.props.start, 
                width: this.props.width, height: slot.DurationMins, "data-type": "slot", 
                id: refId, "data-slotid": slot.SlotId, "data-locationid": "-1", "data-day": this.props.day, 
                fill: "url(#Pattern)", ref: refId})
        );
      } else if (slot.SlotType == 1) {
        slotBands.push(
          React.createElement("foreignObject", {x: this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: this.props.width, height: slot.DurationMins}, 
            React.createElement("div", {className: "panel panel-default closedSlot"}, 
              React.createElement("div", {className: "panel-body embedded"}, 
                slot.Title
              )
            )
          )
        );
      } else if (slot.SlotType == 2) {
        slotBands.push(
          React.createElement("foreignObject", {x: this.props.locationList[slot.LocationId] * 100 + this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: "100", height: slot.DurationMins}, 
            React.createElement("div", {className: "panel panel-default closedSlot"}, 
              React.createElement("div", {className: "panel-body embedded"}, 
                slot.Title
              )
            )
          )
        );
      }
    }
    var slots = [];
    for (i = 0; i < this.props.slots.length; i++) {
      var slot = this.props.slots[i];
      if (slot.SlotType == 0) {
        for (j = 0; j < this.props.locations.length; j++) {
          var refId = 'slot' + this.props.day + 'x' + slot.SlotId.toString() + 'x' + this.props.locations[j].LocationId.toString();
          slots.push(
            React.createElement("rect", {x: j * 100 + this.props.leftMargin, y: slot.StartMinutes - this.props.start, height: slot.DurationMins, width: "100", className: "sessionSlot canDrop", 
                   ref: refId, "data-slotid": slot.SlotId, "data-locationid": this.props.locations[j].LocationId, id: refId, 
                   "data-day": this.props.day})
          );
        }
      }
    }
    return (
      React.createElement("g", null, 
         vertLines, 
         horLines, 
         slotBands, 
         horLabels, 
         vertLabels, 
         slots
      )
    );
  },

  componentDidMount: function() {}

});

module.exports = SchedulerGrid;


},{}],10:[function(require,module,exports){
/** @jsx React.DOM */
var SchedulerScheduledSession = React.createClass({displayName: "SchedulerScheduledSession",

  getInitialState: function() {
    return {}
  },

  render: function() {
    var speakers = this.props.session.Speakers.map(function(item) {
      return (
        React.createElement("span", {className: "speaker"}, item.Value)
        );
    });
    var speakerList = '<br/>';
    this.props.session.Speakers.forEach(function(el) {
      speakerList += '<span class="speaker">' + el.Value + '</span>';
    });
    return (
      React.createElement("div", {className: "panel panel-default session scheduled", "data-slotid": this.props.session.SlotId, 
           "data-locationid": this.props.session.LocationId, "data-plenary": this.props.session.IsPlenary, 
           ref: "Session", "data-sessionid": this.props.session.SessionId, "data-day": this.props.session.DayNr, 
           "data-toggle": "popover", title: this.props.session.Title, 
           "data-content": this.props.session.Description + speakerList}, 
       React.createElement("div", {className: "panel-body"}, 
         React.createElement("div", {className: "speakers"}, speakers), 
         this.props.session.Title
       )
      )
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      this.props.sessionPlace(this.refs.Session.getDOMNode());
    }.bind(this));
  },

  componentDidUpdate: function() {
    this.props.sessionPlace(this.refs.Session.getDOMNode());
  }

});

module.exports = SchedulerScheduledSession;


},{}],11:[function(require,module,exports){
/** @jsx React.DOM */
var SchedulerUnscheduledSession = React.createClass({displayName: "SchedulerUnscheduledSession",

  getInitialState: function() {
    return {}
  },

  render: function() {
    var speakers = this.props.session.Speakers.map(function(item) {
      return (
        React.createElement("span", {className: "speaker"}, item.Value)
        );
    });
    var speakerList = '<br/>';
    this.props.session.Speakers.forEach(function(el) {
      speakerList += '<span class="speaker">' + el.Value + '</span>';
    });
    return (
      React.createElement("div", {className: "panel panel-default session", "data-slotkey": "", "data-orig-x": "0", "data-orig-y": "0", 
           "data-sessionid": this.props.session.SessionId, 
           "data-plenary": this.props.session.IsPlenary, 
           "data-toggle": "popover", title: this.props.session.Title, 
           "data-content": this.props.session.Description + speakerList, 
           "data-placement": "bottom"}, 
        React.createElement("div", {className: "panel-body"}, 
         React.createElement("div", {className: "speakers"}, speakers), 
         this.props.session.Title
        )
      )
    );
  },

  componentDidMount: function() {
  }

});

module.exports = SchedulerUnscheduledSession;

},{}],12:[function(require,module,exports){
/** @jsx React.DOM */
var SessionVote = React.createClass({displayName: "SessionVote",

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {
    }
  },

  render: function() {
    var voteCol = null;
    if (this.props.allowVote) {
      var btnClasses = 'btn';
      if (this.props.item.Voted == 0) {
        btnClasses += ' btn-default';
      } else {
        btnClasses += ' btn-primary';         
      }
      voteCol = (
   React.createElement("td", {className: "btncol"}, 
    React.createElement("a", {href: "#", className: btnClasses, onClick: this.props.onVote.bind(null, this.props.item), 
       title: this.resources.Vote}, 
     React.createElement("span", {className: "glyphicon glyphicon-thumbs-up"})
    )
   )
        )
    }
    var speakers = this.props.item.Speakers.map(function (item) {
      return (
        React.createElement("span", {className: "detailItem bg-info"}, item.Value)
        )
    });
    var tags = this.props.item.Tags.map(function (item) {
      return (
        React.createElement("span", {className: "detailItem bg-info"}, item.Value)
        )
    });
    return (
      React.createElement("tr", null, 
       React.createElement("td", null, React.createElement("p", null, this.props.item.Title), 
        React.createElement("p", {className: "itemDetails"}, 
        React.createElement("span", {className: "glyphicon glyphicon-user"}), speakers, 
        React.createElement("span", {className: "glyphicon glyphicon-tags"}), tags
        )
       ), 
       React.createElement("td", {className: "nrcol"}, this.props.item.NrVotes), 
       voteCol
      )
    );
  },

  componentDidMount: function() {
  }

});

module.exports = SessionVote;

},{}],13:[function(require,module,exports){
/** @jsx React.DOM */
var SessionVote = require('./SessionVote');

var SessionVotes = React.createClass({displayName: "SessionVotes",

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    this.props.voteList.sort(this.votesSort);
    return {
      votes: this.props.voteList
    }
  },

  render: function() {
    var votes = this.state.votes.map(function(item) {
      return React.createElement(SessionVote, {moduleId: this.props.moduleId, item: item, key: item.SessionId, allowVote: this.props.allowVote, onVote: this.onVote})
    }.bind(this));
    var voteCol = null;
    if (this.props.allowVote) {
      voteCol = React.createElement("th", {className: "btncol"})
    }
    return (
      React.createElement("table", {className: "table"}, 
       React.createElement("thead", null, 
         React.createElement("tr", null, 
          React.createElement("th", null, this.resources.Session), 
          React.createElement("th", {className: "nrcol"}, this.resources.Votes), 
          voteCol
         )
       ), 
       React.createElement("tbody", null, votes)
      )
    );
  },

  componentDidMount: function() {},

  onVote: function(sessionVote, e) {
    e.preventDefault();
    if (sessionVote.Voted == 0) {
      this.service.sessionVote(this.props.conferenceId, sessionVote.SessionId, 1, function() {
        sessionVote.Voted = 1;
        sessionVote.NrVotes += 1;
        this.voteChanged(sessionVote);
      }.bind(this));
    } else {
      this.service.sessionVote(this.props.conferenceId, sessionVote.SessionId, 0, function() {
        sessionVote.Voted = 0;
        sessionVote.NrVotes -= 1;
        this.voteChanged(sessionVote);
      }.bind(this));
    }
  },

  voteChanged: function(vote) {
    var newList = [];
    for (i = 0; i < this.state.votes.length; i++) {
      if (this.state.votes[i].SessionId == vote.SessionId) {
        newList.push(vote);
      } else {
        newList.push(this.state.votes[i]);
      }
    }
    newList.sort(this.votesSort);
    this.setState({
      votes: newList
    });
  },

  votesSort: function(a, b) {
    if (b.NrVotes - a.NrVotes == 0) {
      if (a.Title < b.Title) {
        return -1;
      } else if (a.Title > b.Title) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return (b.NrVotes - a.NrVotes);
    }
  }

});

module.exports = SessionVotes;


},{"./SessionVote":12}],14:[function(require,module,exports){
/** @jsx React.DOM */
var Speaker = React.createClass({displayName: "Speaker",

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
    }
  },

  render: function() {
    return (
      React.createElement("tr", {className: "sortable", "data-id": this.props.speaker.SpeakerId}, 
        React.createElement("td", null, this.props.speaker.DisplayName), 
        React.createElement("td", {className: "btncol"}, 
          React.createElement("a", {href: "#", className: "btn btn-default", onClick: this.props.onDelete.bind(null, this.props.speaker), 
             title: this.resources.Delete}, 
           React.createElement("span", {className: "glyphicon glyphicon-remove"})
          )
        )
      )
    );
  },

  componentDidMount: function() {
  }

});

module.exports = Speaker;

},{}],15:[function(require,module,exports){
/** @jsx React.DOM */
var Speaker = require('./Speaker');

var Speakers = React.createClass({displayName: "Speakers",

  resources: null,
  service: null,
  security: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    this.security = ConnectConference.modules[this.props.moduleId].security;
    return {
      speakers: this.props.speakers
    }
  },

  render: function() {
    var speakers = this.state.speakers.map(function(item) {
      return React.createElement(Speaker, {moduleId: this.props.moduleId, speaker: item, key: item.SpeakerId, onDelete: this.onDelete})
    }.bind(this));
    var addRow = null;
    if (this.security.CanManage) {
      addRow = (
        React.createElement("tr", null, 
          React.createElement("td", {className: "dnnFormItem"}, 
           React.createElement("input", {type: "text", className: "fullwidth", ref: "newSpeaker"}), 
           React.createElement("input", {type: "hidden", ref: "newSpeakerId"})
          ), 
          React.createElement("td", {className: "btncol"}, 
            React.createElement("a", {href: "#", className: "btn btn-default", onClick: this.onSpeakerAdd, 
               title: this.resources.Add}, 
             React.createElement("span", {className: "glyphicon glyphicon-plus"})
            )
          )
        )
      );
    }
    return (
      React.createElement("table", {className: "table", id: "speakersTable"}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, this.resources.Speakers), 
            React.createElement("th", null)
          )
        ), 
        React.createElement("tbody", {ref: "speakersTable"}, 
          speakers
        ), 
        React.createElement("tbody", null, 
          addRow
        )
      )
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      if (this.security.CanManage) {
        $(this.refs.newSpeaker.getDOMNode()).autocomplete({
          minLength: 1,
          source: function(request, response) {
            this.refs.newSpeakerId.getDOMNode().value = '';
            this.service.searchUsers(this.props.conferenceId, request.term, function(data) {
              response(data.map(function(item) {
                return {
                  label: item.DisplayName,
                  value: item.UserId
                }
              }));
            });
          }.bind(this),
          select: function(e, ui) {
            e.preventDefault();
            this.refs.newSpeakerId.getDOMNode().value = ui.item.value;
            this.refs.newSpeaker.getDOMNode().value = ui.item.label;
          }.bind(this)
        });
      }
      $(this.refs.speakersTable.getDOMNode()).sortable({
        update: function(event, ui) {
          this.service.orderSessionSpeakers(this.props.conferenceId, this.props.sessionId, getTableOrder('speakersTable'));
        }.bind(this)
      });
    }.bind(this));
  },

  onDelete: function(speaker, e) {
    e.preventDefault();
    if (confirm(this.resources.SpeakerDeleteConfirm)) {
      this.service.deleteSessionSpeaker(this.props.conferenceId, this.props.sessionId, speaker.SpeakerId, function(data) {
        var newList = [];
        for (i = 0; i < this.state.speakers.length; i++) {
          if (this.state.speakers[i].SpeakerId != speaker.SpeakerId) {
            newList.push(this.state.speakers[i]);
          }
        }
        this.setState({
          speakers: newList
        });
      }.bind(this));
    }
  },

  onSpeakerAdd: function(e) {
    e.preventDefault();
    var newUserId = this.refs.newSpeakerId.getDOMNode().value;
    if (newUserId != '') {
      for (i = 0; i < this.state.speakers.length; i++) {
        if (this.state.speakers[i].UserId == newUserId) {
          return;
        }
      }
      this.service.addSessionSpeaker(this.props.conferenceId, this.props.sessionId, this.refs.newSpeakerId.getDOMNode().value, function(data) {
        this.refs.newSpeakerId.getDOMNode().value = '';
        this.refs.newSpeaker.getDOMNode().value = '';
        var newList = this.state.speakers;
        newList.push(data);
        this.setState({
          speakers: newList
        });
      }.bind(this));
    }
  }

});

module.exports = Speakers;


},{"./Speaker":14}],16:[function(require,module,exports){
/** @jsx React.DOM */
var Tag = React.createClass({displayName: "Tag",
  render: function() {
    return (
      React.createElement("span", {className: "tag label label-info"}, this.props.tag.TagName, 
       React.createElement("span", {"data-role": "remove", onClick: this.props.onRemoveTag.bind(null, this.props.tag.TagId)})
      )
    );
  }
});

module.exports = Tag;

},{}],17:[function(require,module,exports){
/** @jsx React.DOM */
var TagVote = React.createClass({displayName: "TagVote",

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {
    }
  },

  render: function() {
    var voteCol = null;
    if (this.props.allowVote) {
      var btnClasses = 'btn';
      if (this.props.item.Voted == 0) {
        btnClasses += ' btn-default';
      } else {
        btnClasses += ' btn-primary';         
      }
      voteCol = (
   React.createElement("td", {className: "btncol"}, 
    React.createElement("a", {href: "#", className: btnClasses, onClick: this.props.onVote.bind(null, this.props.item), 
       title: this.resources.Vote}, 
     React.createElement("span", {className: "glyphicon glyphicon-thumbs-up"})
    )
   )
        )
    }
    return (
      React.createElement("tr", null, 
       React.createElement("td", null, this.props.item.TagName), 
       React.createElement("td", {className: "nrcol"}, this.props.item.NrSessions), 
       React.createElement("td", {className: "nrcol"}, this.props.item.NrVotes), 
       voteCol
      )
    );
  },

  componentDidMount: function() {
  }

});

module.exports = TagVote;

},{}],18:[function(require,module,exports){
/** @jsx React.DOM */
var TagVote = require('./TagVote');

var TagVotes = React.createClass({displayName: "TagVotes",

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    this.props.voteList.sort(this.votesSort);
    return {
      votes: this.props.voteList
    }
  },

  render: function() {
    var votes = this.state.votes.map(function(item) {
      return React.createElement(TagVote, {moduleId: this.props.moduleId, item: item, key: item.TagId, allowVote: this.props.allowVote, onVote: this.onVote})
    }.bind(this));
    var voteCol = null;
    if (this.props.allowVote) {
      voteCol = React.createElement("th", {className: "btncol"})
    }
    var addRow = null;
    if (this.props.allowAdd) {
      addRow = (
        React.createElement("tr", null, 
          React.createElement("td", {className: "dnnFormItem"}, 
           React.createElement("input", {type: "text", className: "fullwidth", ref: "newTagName"})
          ), 
          React.createElement("td", null), React.createElement("td", null), 
          React.createElement("td", {className: "btncol"}, 
            React.createElement("a", {href: "#", className: "btn btn-default", onClick: this.onAddTag, 
               title: this.resources.Add}, 
             React.createElement("span", {className: "glyphicon glyphicon-plus"})
            )
          )
         )
      );
    }
    return (
      React.createElement("table", {className: "table"}, 
       React.createElement("thead", null, 
         React.createElement("tr", null, 
          React.createElement("th", null, this.resources.Theme), 
          React.createElement("th", {className: "nrcol"}, this.resources.Sessions), 
          React.createElement("th", {className: "nrcol"}, this.resources.Votes), 
          voteCol
         )
       ), 
       React.createElement("tbody", null, votes, addRow)
      )
    );
  },

  componentDidMount: function() {},

  onVote: function(tagVote, e) {
    e.preventDefault();
    if (tagVote.Voted == 0) {
      this.service.tagVote(this.props.conferenceId, tagVote.TagId, 1, function() {
        tagVote.Voted = 1;
        tagVote.NrVotes += 1;
        this.voteChanged(tagVote);
      }.bind(this));
    } else {
      this.service.tagVote(this.props.conferenceId, tagVote.TagId, 0, function() {
        tagVote.Voted = 0;
        tagVote.NrVotes -= 1;
        this.voteChanged(tagVote);
      }.bind(this));
    }
  },

  voteChanged: function(vote) {
    var newList = [];
    for (i = 0; i < this.state.votes.length; i++) {
      if (this.state.votes[i].TagId == vote.TagId) {
        newList.push(vote);
      } else {
        newList.push(this.state.votes[i]);
      }
    }
    newList.sort(this.votesSort);
    this.setState({
      votes: newList
    });
  },

  votesSort: function(a, b) {
    if (b.NrVotes - a.NrVotes == 0) {
      if (a.TagName < b.TagName) {
        return -1;
      } else if (a.TagName > b.TagName) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return (b.NrVotes - a.NrVotes);
    }
  },

  onAddTag: function(e) {
    e.preventDefault();
    this.service.addTag(this.props.conferenceId, this.refs.newTagName.getDOMNode().value, function(data) {
      this.refs.newTagName.getDOMNode().value = '';
      data.Voted = 0;
      var newList = this.state.votes;
      newList.push(data);
      newList.sort(this.votesSort);
      this.setState({
        votes: newList
      });
    }.bind(this));
  }

});

module.exports = TagVotes;


},{"./TagVote":17}],19:[function(require,module,exports){
/** @jsx React.DOM */
var Tag = require('./Tag');

var Tags = React.createClass({displayName: "Tags",

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
      tags: this.props.tags,
      newTagId: -1
    }
  },

  render: function() {
    var tagList = this.state.tags.map(function(item) {
      return React.createElement(Tag, {tag: item, key: item.TagId, onRemoveTag: this.onRemoveTag})
    }.bind(this));
    return (
      React.createElement("div", {className: "bootstrap-tagsinput"}, 
        tagList, 
        React.createElement("input", {type: "text", placeholder: this.props.placeholder, className: "taginput", ref: "newTag", 
               onKeyPress: this.onNewTagKeyPress}), 
        React.createElement("input", {type: "hidden", name: this.props.name, value: JSON.stringify(this.state.tags)})
      )
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      $(this.refs.newTag.getDOMNode()).autocomplete({
        minLength: 1,
        source: function(request, response) {
          this.service.searchTags(this.props.conferenceId, request.term, function(data) {
            response(data);
          });
        }.bind(this),
        select: function(e, ui) {
          e.preventDefault();
          this.addTag(ui.item.label, ui.item.value);
          this.refs.newTag.getDOMNode().value = '';
        }.bind(this)
      });
    }.bind(this));

  },

  onRemoveTag: function(tagId, e) {
    e.preventDefault();
    var newTagList = [];
    for (i = 0; i < this.state.tags.length; i++) {
      if (this.state.tags[i].TagId != tagId) {
        newTagList.push(this.state.tags[i]);
      }
    }
    this.setState({
      tags: newTagList
    });
  },

  onNewTagKeyPress: function(e) {
    switch (e.charCode) {
      case 13:
      case 44:
        e.preventDefault();
        var newTag = this.refs.newTag.getDOMNode().value;
        this.addTag(newTag);
        this.refs.newTag.getDOMNode().value = '';
    }
  },

  addTag: function(tagName, tagId) {
    var newTagList = this.state.tags;
    var shouldAdd = true;
    for (i = 0; i < this.state.tags.length; i++) {
      if (this.state.tags[i].TagName == tagName) {
        shouldAdd = false;
      }
    }
    if (shouldAdd) {
      var newTag = {
        TagId: (tagId == undefined) ? this.state.newTagId : tagId,
        TagName: tagName
      };
      newTagList.push(newTag)
    }
    this.setState({
      tags: newTagList,
      newTagId: (tagId == undefined) ? this.state.newTagId - 1 : this.state.newTagId
    });
  }

});

module.exports = Tags;


},{"./Tag":16}],20:[function(require,module,exports){
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
                    React.createElement("option", {value: "1"}, this.resources.General), 
                    React.createElement("option", {value: "2"}, this.resources.LocationSpecific)
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
                  React.createElement("label", null, this.resources.Location), 
                  React.createElement("select", {className: "form-control", ref: "location"}
                  )
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
    this.refs.location.getDOMNode().value = '-1';
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
    this.state.service.getLocations(this.props.conferenceId, function(data) {
      var dd = $(this.refs.location.getDOMNode());
      dd.empty();
      dd.append($('<option/>').attr("value", -1).text(this.resources.ChooseLocation));
      $.each(data, function(i,item) {
        dd.append($('<option/>').attr("value", item.LocationId).text(item.Name));
      });
      this.refs.location.getDOMNode().value = slot.LocationId;
    }.bind(this));
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
    var l = this.refs.location.getDOMNode();
    slot.LocationId = parseInt(l.options[l.selectedIndex].value);
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


},{"./TimesheetEditorSlot":21}],21:[function(require,module,exports){
/** @jsx React.DOM */
var TimesheetEditorSlot = React.createClass({displayName: "TimesheetEditorSlot",

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
      React.createElement("li", null, 
        React.createElement("span", {className: classes, 
               "data-id": this.props.slot.SlotId, 
               "data-oldstart": this.props.slot.StartMinutes, 
               "data-oldlength": this.props.slot.DurationMins, 
               "data-start": this.props.slot.StartMinutes, 
               "data-scale": "48", 
               "data-length": this.props.slot.DurationMins, 
               style: barStyle, 
               title: this.props.slot.Title, 
               onDoubleClick: this.doubleClicked, 
               ref: "timeBar"}, 
           React.createElement("strong", null, this.props.slot.DayNr), " ", React.createElement("strong", null, this.props.slot.LocationName), " ", this.props.slot.Title
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

module.exports = TimesheetEditorSlot;


},{}],22:[function(require,module,exports){
/** @jsx React.DOM */
var Track = React.createClass({displayName: "Track",
  render: function() {
    var classes = "glyphicon";
    if (this.props.track.Selected) {
      classes += " glyphicon-check";
    } else {
      classes += " glyphicon-unchecked";
    }
    return (
      React.createElement("li", {className: "list-group-item", onClick: this.props.onCheckClick.bind(null, this.props.track)}, 
        React.createElement("input", {type: "checkbox", className: "hidden"}), 
        React.createElement("span", {className: classes}), 
        this.props.track.Title
      )
    );
  }
});

module.exports = Track;

},{}],23:[function(require,module,exports){
/** @jsx React.DOM */
var Track = require('./Track');

var Tracks = React.createClass({displayName: "Tracks",

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    var trackList = [];
    for (i = 0; i < this.props.tracks.length; i++) {
      var track = this.props.tracks[i];
      track.Selected = (this.props.initialData.indexOf(track.TrackId) > -1);
      trackList.push(track);
    }
    return {
      tracks: this.props.tracks,
      selection: this.props.initialData
    }
  },

  render: function() {
    var trackList = this.state.tracks.map(function(item) {
      return React.createElement(Track, {track: item, key: item.TrackId, onCheckClick: this.onCheckClick})
    }.bind(this));
    return (
      React.createElement("div", null, 
        React.createElement("ul", {className: "list-group checked-list-box"}, 
          trackList
        ), 
        React.createElement("input", {type: "hidden", name: this.props.name, value: JSON.stringify(this.state.selection)})
      )
    );
  },

  componentDidMount: function() {},

  onCheckClick: function(track,e) {
    e.preventDefault();
    track.Selected = !track.Selected;
    var newList=[];
    for (i = 0; i < this.state.tracks.length; i++) {
      if (this.state.tracks[i].TrackId == track.TrackId) {
        newList.push(track);
      } else {
        newList.push(this.state.tracks[i]);
      }
    }
    var newSelection=[];
    for (i = 0; i < newList.length; i++) {
      if (newList[i].Selected) {
        newSelection.push(newList[i].TrackId);
      }
    }
    this.setState({
      tracks: newList,
      selection: newSelection
    });
  }

});

module.exports = Tracks;


},{"./Track":22}],24:[function(require,module,exports){
/** @jsx React.DOM */
var TimesheetEditor = require('./TimesheetEditor'),
    Comments = require('./Comments'),
    Tags = require('./Tags'),
    Tracks = require('./Tracks'),
    Speakers = require('./Speakers'),
    TagVotes = require('./TagVotes'),
    SessionVotes = require('./SessionVotes'),
    Scheduler = require('./Scheduler/Scheduler'),
    Schedule = require('./Schedule/Schedule');

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
        var security = $(el).data('security');
        ConnectConference.modules[moduleId] = {
          service: new ConferenceService($, moduleId),
          resources: resources,
          security: security
        };
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
        var visibility = $(el).data('visibility');
        var pageSize = $(el).data('pagesize');
        var comments = $(el).data('comments');
        var appPath = $(el).data('apppath');
        var totalComments = $(el).data('totalcomments');
        var loggedIn = $(el).data('loggedin');
        var title = $(el).data('title');
        var help = $(el).data('help');
        React.render(React.createElement(Comments, {moduleId: moduleId, 
           conferenceId: conferenceId, sessionId: sessionId, appPath: appPath, 
           totalComments: totalComments, loggedIn: loggedIn, title: title, help: help, 
           visibility: visibility, pageSize: pageSize, comments: comments}), el);
      });
      $('.tagsComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var fieldName = $(el).data('name');
        var placeholder = $(el).data('placeholder');
        var tags = $(el).data('tags');
        React.render(React.createElement(Tags, {moduleId: moduleId, name: fieldName, tags: tags, placeholder: placeholder, 
           conferenceId: conferenceId}), el);
      });
      $('.tracksComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var fieldName = $(el).data('name');
        var tracks = $(el).data('tracks');
        var initialData = $(el).data('initial');
        React.render(React.createElement(Tracks, {moduleId: moduleId, name: fieldName, tracks: tracks, initialData: initialData, 
           conferenceId: conferenceId}), el);
      });
      $('.speakersComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var sessionId = $(el).data('session');
        var fieldName = $(el).data('name');
        var speakers = $(el).data('speakers');
        React.render(React.createElement(Speakers, {moduleId: moduleId, name: fieldName, speakers: speakers, sessionId: sessionId, 
           conferenceId: conferenceId}), el);
      });
      $('.tagVoteComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var voteList = $(el).data('votelist');
        var allowVote = $(el).data('allowvote');
        var allowAdd = $(el).data('allowadd');
        React.render(React.createElement(TagVotes, {moduleId: moduleId, voteList: voteList, allowVote: allowVote, allowAdd: allowAdd, 
           conferenceId: conferenceId}), el);
      });
      $('.sessionVoteComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var voteList = $(el).data('votelist');
        var allowVote = $(el).data('allowvote');
        React.render(React.createElement(SessionVotes, {moduleId: moduleId, voteList: voteList, allowVote: allowVote, 
           conferenceId: conferenceId}), el);
      });
      $('.schedulerComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conference = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        var slots = $(el).data('slots');
        var sessions = $(el).data('sessions');
        var gridHeight = $(el).data('gridheight');
        var locations = $(el).data('locations');
        React.render(React.createElement(Scheduler, {moduleId: moduleId, conference: conference, locations: locations, 
                      nrDays: nrDays, slots: slots, sessions: sessions, gridHeight: gridHeight}), el);
      });
      $('.scheduleComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conference = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        var slots = $(el).data('slots');
        var sessions = $(el).data('sessions');
        var gridHeight = $(el).data('gridheight');
        var locations = $(el).data('locations');
        React.render(React.createElement(Schedule, {moduleId: moduleId, conference: conference, locations: locations, 
                      nrDays: nrDays, slots: slots, sessions: sessions, gridHeight: gridHeight}), el);
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


},{"./Comments":2,"./Schedule/Schedule":3,"./Scheduler/Scheduler":7,"./SessionVotes":13,"./Speakers":15,"./TagVotes":18,"./Tags":19,"./TimesheetEditor":20,"./Tracks":23}]},{},[24])
window.ConferenceService = function($, mid) {
  var moduleId = mid;
  var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Conference');

  this.ServicePath = function() {
      return baseServicepath;
    },

    this.apiCall = function(method, controller, action, conferenceId, id, data, success, fail) {
      //showLoading();
      // console.log(data);
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
    this.apiCall('POST', 'Comments', 'Add', conferenceId, null, {
      SessionId: sessionId,
      Visibility: visibility,
      Remarks: comment
    }, success, fail);
  }
  this.loadComments = function(conferenceId, sessionId, visibility, pageIndex, pageSize, success, fail) {
    this.apiCall('GET', 'Comments', 'List', conferenceId, null, {
      SessionId: sessionId,
      Visibility: visibility,
      PageIndex: pageIndex,
      PageSize: pageSize
    }, success, fail);
  }
  this.deleteComment = function(conferenceId, commentId, success, fail) {
    this.apiCall('POST', 'Comments', 'Delete', conferenceId, commentId, null, success, fail);
  }
  this.searchTags = function(conferenceId, searchTerm, success, fail) {
    this.apiCall('GET', 'Tags', 'Search', conferenceId, null, {
      search: searchTerm
    }, success, fail);
  }
  this.tagVote = function(conferenceId, tagId, vote, success, fail) {
    this.apiCall('POST', 'Tags', 'Vote', conferenceId, tagId, {
      vote: vote
    }, success, fail);
  }
  this.sessionVote = function(conferenceId, sessionId, vote, success, fail) {
    this.apiCall('POST', 'Sessions', 'Vote', conferenceId, sessionId, {
      vote: vote
    }, success, fail);
  }
  this.addTag = function(conferenceId, tagName, success, fail) {
    this.apiCall('POST', 'Tags', 'Add', conferenceId, null, {
      tagName: tagName
    }, success, fail);
  }
  this.editTag = function(conferenceId, tagId, tagName, success, fail) {
    this.apiCall('POST', 'Tags', 'Edit', conferenceId, tagId, {
      tagName: tagName
    }, success, fail);
  }
  this.deleteTag = function(conferenceId, tagId, success, fail) {
    this.apiCall('POST', 'Tags', 'Delete', conferenceId, tagId, null, success, fail);
  }
  this.searchUsers = function(conferenceId, search, success, fail) {
    this.apiCall('GET', 'Speakers', 'SearchUsers', conferenceId, null, {
      search: search
    }, success, fail);
  }
  this.addSessionSpeaker = function(conferenceId, sessionId, userId, success, fail) {
    this.apiCall('POST', 'SessionSpeakers', 'Add', conferenceId, sessionId, {
      UserId: userId
    }, success, fail);
  }
  this.deleteSessionSpeaker = function(conferenceId, sessionId, userId, success, fail) {
    this.apiCall('POST', 'SessionSpeakers', 'Delete', conferenceId, sessionId, {
      UserId: userId
    }, success, fail);
  }
  this.orderSessionSpeakers = function(conferenceId, sessionId, newOrder, success, fail) {
    this.apiCall('POST', 'SessionSpeakers', 'Reorder', conferenceId, sessionId, JSON.stringify(newOrder), success, fail);
  }
  this.searchTracks = function(conferenceId, searchTerm, success, fail) {
    this.apiCall('GET', 'Tracks', 'Search', conferenceId, null, {
      search: searchTerm
    }, success, fail);
  }
  this.changeAttendeeStatus = function(conferenceId, newStatus, success, fail) {
    this.apiCall('POST', 'Attendees', 'ChangeStatus', conferenceId, null, {
      Status: newStatus
    }, success, fail);
  }
  this.getLocations = function(conferenceId, success, fail) {
    this.apiCall('GET', 'Locations', 'List', conferenceId, null, null, success, fail);
  }
  this.tryMoveSession = function(conferenceId, sessionId, day, slotId, locationId, displaceOthers, success, fail) {
    this.apiCall('POST', 'Sessions', 'Move', conferenceId, sessionId, {
      Day: day,
      SlotId: slotId,
      LocationId: locationId,
      DisplaceOthers: displaceOthers
    }, success, fail);
  }
  this.tryRemoveSession = function(conferenceId, sessionId, success, fail) {
    this.apiCall('POST', 'Sessions', 'Remove', conferenceId, sessionId, null, success, fail);
  }
  this.checkNewComments = function(conferenceId, sessionId, visibility, lastCheck, success, fail) {
    this.apiCall('GET', 'Comments', 'Poll', conferenceId, null, { SessionId: sessionId, Visibility: visibility, LastCheck: lastCheck.toUTCDateTimeDigits()}, success, fail);
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
    setTimeout(function() {
      $('#serviceStatus').hide();
    }, 3000);
  }
}

function isInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

function validateForm(form, submitButton, formErrorDiv) {
  submitButton.click(function() {
    var hasErrors = false;
    formErrorDiv.empty().hide();
    form.find('input[data-validator="integer"]').each(function(i, el) {
      if (!isInt($(el).val()) & $(el).val() != '') {
        hasErrors = true;
        $(el).parent().addClass('error');
        formErrorDiv.append('<span>' + $(el).attr('data-message') + '</span><br />').show();
      }
    });
    form.find('input[data-required="true"]').each(function(i, el) {
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
  $('#' + tableId + ' tbody:first tr').each(function(i, el) {
    res.push({
      id: $(el).data('id'),
      order: i
    });
  });
  return res;
}

function minutesToTime(mins) {
  var hr = Math.floor(mins / 60);
  var mn = mins - 60 * hr;
  var res = mn.toString();
  if (res.length == 1) {
    res = "0" + res
  }
  res = hr.toString() + ":" + res;
  return res;
}

function moveObject(object, dx, dy) {
  var x = (parseFloat(object.getAttribute('data-x')) || 0) + dx,
    y = (parseFloat(object.getAttribute('data-y')) || 0) + dy;
  object.style.webkitTransform =
    object.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';
  object.setAttribute('data-x', x);
  object.setAttribute('data-y', y);
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

if (!Date.prototype.toUTCDateTimeDigits) {
  (function() {
    Date.prototype.toUTCDateTimeDigits = function() {
      return this.getUTCFullYear() + '-' +
        pad(this.getUTCMonth() + 1) + '-' +
        pad(this.getUTCDate()) +
        'T' +
        pad(this.getUTCHours()) + ':' +
        pad(this.getUTCMinutes()) + ':' +
        pad(this.getUTCSeconds()) +
        'Z';
    };
  }());
}

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

$(document).ready(function() {
  var el = $('.ModConnectConferenceC .container');
  if (el != undefined) {
    if (el.parent().closest('.container').length == 1) {
      el.removeClass('container');
    }
  }
})
