(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      attendees: [],
      codes: ""
    };
  },
  showDialog: function showDialog(e) {
    var _this = this;

    e.preventDefault();
    this.props.module.service.getSessionAttendees(this.props.session.ConferenceId, this.props.session.SessionId, function (data) {
      _this.setState({
        attendees: data
      }, function () {
        $(_this.refs.dialog.getDOMNode()).modal("show");
      });
    }, function () {});
  },
  addAttendees: function addAttendees(e) {
    var _this2 = this;

    e.preventDefault();
    this.props.module.service.attendSession(this.props.session.ConferenceId, this.props.session.SessionId, this.refs.codes.getDOMNode().value, function (data) {
      _this2.setState({
        codes: "",
        attendees: data
      });
    }, function () {});
  },
  handleChangedCodes: function handleChangedCodes(e) {
    this.setState({ codes: e.target.value });
  },
  render: function render() {
    var _this3 = this;

    var attendees = this.state.attendees.map(function (a) {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          a.DisplayName
        )
      );
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "a",
        {
          href: "#",
          onClick: function onClick(e) {
            return _this3.showDialog(e);
          },
          style: { color: "#000", float: "right" }
        },
        React.createElement("i", { className: "glyphicon glyphicon-barcode" })
      ),
      React.createElement(
        "div",
        { className: "modal fade", ref: "dialog", tabindex: "-1", role: "dialog" },
        React.createElement(
          "div",
          {
            className: "modal-dialog",
            role: "document",
            style: { marginTop: "60px" }
          },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "close",
                  "data-dismiss": "modal",
                  "aria-label": "Close"
                },
                React.createElement(
                  "span",
                  { "aria-hidden": "true" },
                  "×"
                )
              ),
              React.createElement(
                "h4",
                { className: "modal-title" },
                "Attendance ",
                this.props.session.Title
              )
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(
                "table",
                { className: "table" },
                React.createElement(
                  "tbody",
                  null,
                  attendees
                )
              ),
              React.createElement("textarea", {
                ref: "codes",
                className: "form-control",
                placeholder: "Print barcodes here",
                value: this.state.codes,
                onChange: this.handleChangedCodes
              }),
              React.createElement(
                "a",
                {
                  href: "#",
                  className: "btn btn-block btn-primary",
                  style: { marginTop: "10px" },
                  onClick: function onClick(e) {
                    return _this3.addAttendees(e);
                  }
                },
                "Add"
              )
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-default",
                  "data-dismiss": "modal"
                },
                "Close"
              )
            )
          )
        )
      )
    );
  },
  componentDidMount: function componentDidMount() {}
});

},{}],2:[function(require,module,exports){
'use strict';

module.exports = React.createClass({
  displayName: 'exports',
  getInitialState: function getInitialState() {
    return {
      code: this.props.attendee.AttCode,
      company: this.props.attendee.Company
    };
  },
  changeCompany: function changeCompany(e) {
    this.setState({
      company: this.refs.txtCompany.getDOMNode().value
    });
  },
  changeCode: function changeCode(e) {
    this.setState({
      code: this.refs.txtCode.getDOMNode().value
    });
  },
  editCompany: function editCompany() {
    var value = this.refs.txtCompany.getDOMNode().value;
    var oldValue = this.props.attendee.Company ? this.props.attendee.Company : '';
    if (value != oldValue) {
      var attendee = this.props.attendee;
      attendee.Company = value;
      this.props.update(this.props.attendee);
    }
  },
  editCode: function editCode() {
    var value = this.refs.txtCode.getDOMNode().value;
    var oldValue = this.props.attendee.AttCode ? this.props.attendee.AttCode : '';
    if (value != oldValue) {
      var attendee = this.props.attendee;
      attendee.AttCode = value;
      this.props.update(this.props.attendee);
    }
  },
  toggleReceive: function toggleReceive() {
    var attendee = this.props.attendee;
    attendee.ReceiveNotifications = !attendee.ReceiveNotifications;
    this.props.update(this.props.attendee);
  },
  render: function render() {
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        { className: 'nrcol' },
        this.props.index + 1,
        '.'
      ),
      React.createElement(
        'td',
        null,
        this.props.attendee.LastName,
        ', ',
        this.props.attendee.FirstName
      ),
      React.createElement(
        'td',
        null,
        this.props.attendee.Email
      ),
      React.createElement(
        'td',
        null,
        React.createElement('input', { type: 'checkbox', checked: this.props.attendee.ReceiveNotifications,
          onChange: this.toggleReceive.bind(null) })
      ),
      React.createElement(
        'td',
        null,
        React.createElement('input', { type: 'text', className: 'form-control', value: this.state.company,
          tabIndex: 1000 + this.props.index, ref: 'txtCompany',
          onBlur: this.editCompany.bind(null),
          onChange: this.changeCompany })
      ),
      React.createElement(
        'td',
        null,
        React.createElement('input', { type: 'text', className: 'form-control', value: this.state.code,
          tabIndex: 2000 + this.props.index, ref: 'txtCode',
          onBlur: this.editCode.bind(null),
          onChange: this.changeCode })
      )
    );
  }
});

},{}],3:[function(require,module,exports){
"use strict";

var AttendeeRow = require('./AttendeeRow.jsx');

module.exports = React.createClass({
  displayName: "exports",


  attendeeBeingEdited: null,

  getInitialState: function getInitialState() {
    return {
      attendees: this.props.attendees
    };
  },
  updateAttendee: function updateAttendee(attendee) {
    var _this = this;

    this.props.module.service.editAttendee(this.props.conferenceId, attendee, function (data) {
      var newList = [];
      for (var i = 0; i < _this.state.attendees.length; i++) {
        var a = _this.state.attendees[i];
        if (a.UserId == attendee.UserId) {
          newList.push(data);
        } else {
          newList.push(a);
        }
      }
      _this.setState({
        attendees: newList
      });
    });
  },
  render: function render() {
    var _this2 = this;

    var attendees = this.state.attendees.map(function (item, i) {
      return React.createElement(AttendeeRow, { module: _this2.props.module, attendee: item,
        key: item.UserId,
        update: _this2.updateAttendee,
        index: i });
    });
    return React.createElement(
      "div",
      { "class": "container" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-12" },
          React.createElement(
            "table",
            { className: "table table-responsive table-striped" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement("th", null),
                React.createElement(
                  "th",
                  null,
                  this.props.module.resources.Name
                ),
                React.createElement(
                  "th",
                  null,
                  this.props.module.resources.Email
                ),
                React.createElement(
                  "th",
                  null,
                  "N"
                ),
                React.createElement(
                  "th",
                  null,
                  this.props.module.resources.Company
                ),
                React.createElement(
                  "th",
                  null,
                  this.props.module.resources.Code
                )
              )
            ),
            React.createElement(
              "tbody",
              null,
              attendees
            )
          )
        )
      )
    );
  }
});

},{"./AttendeeRow.jsx":2}],4:[function(require,module,exports){
"use strict";

var UserRow = require('./UserRow.jsx');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
      addedUsers: []
    };
  },
  render: function render() {
    var userRows = this.state.addedUsers.map(function (item) {
      return React.createElement(UserRow, { user: item });
    });
    return React.createElement(
      "table",
      { className: "table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            this.resources.Email
          ),
          React.createElement(
            "th",
            null,
            this.resources.FirstName
          ),
          React.createElement(
            "th",
            null,
            this.resources.LastName
          ),
          React.createElement(
            "th",
            null,
            this.resources.DisplayName
          ),
          React.createElement(
            "th",
            null,
            this.resources.Company
          ),
          React.createElement("th", null)
        )
      ),
      React.createElement(
        "tbody",
        null,
        userRows,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            React.createElement("input", { type: "text", className: "form-control", ref: "txtEmail" })
          ),
          React.createElement(
            "td",
            null,
            React.createElement("input", { type: "text", className: "form-control", ref: "txtFirstName" })
          ),
          React.createElement(
            "td",
            null,
            React.createElement("input", { type: "text", className: "form-control", ref: "txtLastName", onBlur: this.makeDisplayName })
          ),
          React.createElement(
            "td",
            null,
            React.createElement("input", { type: "text", className: "form-control", ref: "txtDisplayName" })
          ),
          React.createElement(
            "td",
            null,
            React.createElement("input", { type: "text", className: "form-control", ref: "txtCompany" })
          ),
          React.createElement(
            "td",
            null,
            React.createElement(
              "a",
              { href: "#", className: "btn btn-primary", onClick: this.addUser },
              this.resources.Add
            )
          )
        )
      )
    );
  },
  componentDidMount: function componentDidMount() {
    $(document).ready(function () {
      $(this.refs.txtEmail.getDOMNode()).autocomplete({
        minLength: 1,
        source: function (request, response) {
          this.service.searchUsersByEmail(this.props.conferenceId, request.term, function (data) {
            response(data.map(function (item) {
              return {
                label: item.Email,
                value: item.UserId,
                item: item
              };
            }));
          });
        }.bind(this),
        select: function (e, ui) {
          e.preventDefault();
          this.refs.txtEmail.getDOMNode().value = ui.item.item.Email;
          this.refs.txtFirstName.getDOMNode().value = ui.item.item.FirstName;
          this.refs.txtLastName.getDOMNode().value = ui.item.item.LastName;
          this.refs.txtDisplayName.getDOMNode().value = ui.item.item.DisplayName;
        }.bind(this)
      });
    }.bind(this));
  },
  addUser: function addUser(e) {
    e.preventDefault();
    switch (this.props.type) {
      case 'attendees':
        this.service.addAttendee(this.props.conferenceId, this.refs.txtEmail.getDOMNode().value, this.refs.txtFirstName.getDOMNode().value, this.refs.txtLastName.getDOMNode().value, this.refs.txtDisplayName.getDOMNode().value, this.refs.txtCompany.getDOMNode().value, function (data) {
          this.addedUser(data);
        }.bind(this));
        break;
      case 'speakers':
        this.service.addSpeaker(this.props.conferenceId, this.refs.txtEmail.getDOMNode().value, this.refs.txtFirstName.getDOMNode().value, this.refs.txtLastName.getDOMNode().value, this.refs.txtDisplayName.getDOMNode().value, this.refs.txtCompany.getDOMNode().value, function (data) {
          this.addedUser(data);
        }.bind(this));
        break;
    }
  },
  addedUser: function addedUser(data) {
    this.refs.txtEmail.getDOMNode().value = '';
    this.refs.txtFirstName.getDOMNode().value = '';
    this.refs.txtLastName.getDOMNode().value = '';
    this.refs.txtDisplayName.getDOMNode().value = '';
    this.refs.txtCompany.getDOMNode().value = '';
    var newList = this.state.addedUsers;
    newList.push(data);
    this.setState({
      addedUsers: newList
    });
  },
  makeDisplayName: function makeDisplayName(e) {
    if (this.refs.txtDisplayName.getDOMNode().value == '') {
      this.refs.txtDisplayName.getDOMNode().value = this.refs.txtFirstName.getDOMNode().value + ' ' + this.refs.txtLastName.getDOMNode().value;
    }
  }
});

},{"./UserRow.jsx":5}],5:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.user.Email
      ),
      React.createElement(
        "td",
        null,
        this.props.user.FirstName
      ),
      React.createElement(
        "td",
        null,
        this.props.user.LastName
      ),
      React.createElement(
        "td",
        null,
        this.props.user.DisplayName
      ),
      React.createElement(
        "td",
        null,
        this.props.user.Company
      ),
      React.createElement("td", null)
    );
  }
});

},{}],6:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      selectedOption: this.props.selected
    };
  },
  render: function render() {
    var btnClass = "";
    var btnText = "";
    var options = [];
    for (var i = 0; i < this.props.options.length; i++) {
      var opt = this.props.options[i];
      if (opt.Id == this.state.selectedOption) {
        btnClass = opt.ClassName;
        btnText = opt.Text;
      } else {
        options.push(React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#", "data-id": opt.Id,
              "data-confirm": opt.Confirm,
              onClick: this.statusChange.bind(null, opt) },
            opt.Text
          )
        ));
      }
    }
    return React.createElement(
      "div",
      { className: "btn-group" },
      React.createElement(
        "button",
        { type: "button", className: "btn btn-sm btn-" + btnClass },
        btnText
      ),
      React.createElement(
        "button",
        { type: "button", className: "btn btn-sm btn-" + btnClass + " dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
        " ",
        React.createElement("span", { className: "caret" }),
        React.createElement(
          "span",
          { className: "sr-only" },
          "Toggle Dropdown"
        )
      ),
      React.createElement(
        "ul",
        { className: "dropdown-menu" },
        options
      )
    );
  },
  statusChange: function statusChange(newStatus, e) {
    var _this = this;

    e.preventDefault();
    if (newStatus.Confirm != undefined) {
      if (!confirm(newStatus.Confirm)) {
        return;
      }
    }
    this.props.module.service.changeSessionStatus(this.props.conferenceId, this.props.sessionId, newStatus.Id, function (data) {
      _this.setState({
        selectedOption: data.Status
      });
    });
  }
});

},{}],7:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",


  resources: null,
  security: null,

  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.security = ConnectConference.modules[this.props.moduleId].security;
    return {};
  },
  render: function render() {
    var imgUrl = this.props.appPath + '/DnnImageHandler.ashx?mode=profilepic&w=64&h=64&userId=' + this.props.comment.UserId;
    var actionBar = null;
    if (this.security.CanManage | this.security.UserId == this.props.comment.UserId) {
      actionBar = React.createElement(
        "div",
        { className: "action" },
        React.createElement(
          "button",
          { type: "button", className: "btn btn-danger btn-xs",
            title: this.resources.Delete, onClick: this.props.onDelete.bind(null, this.props.comment.CommentId),
            "data-id": this.props.comment.CommentId },
          React.createElement("span", { className: "glyphicon glyphicon-trash" })
        )
      );
    }
    var time = moment(this.props.comment.Datime);
    var strTime = time.fromNow();
    if (moment().diff(time, 'months', true) > 1) {
      strTime = time.format('LLL');
    }
    return React.createElement(
      "li",
      { className: "list-group-item" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "img-col" },
          React.createElement("img", { src: imgUrl, className: "img-circle img-responsive", alt: "" })
        ),
        React.createElement(
          "div",
          { className: "comment-col" },
          React.createElement(
            "div",
            { className: "comment-details" },
            this.props.comment.DisplayName,
            " ",
            strTime
          ),
          React.createElement(
            "div",
            { className: "comment-text" },
            this.props.comment.Remarks
          ),
          actionBar
        )
      )
    );
  }
});

},{}],8:[function(require,module,exports){
"use strict";

var Comment = require('./Comment.jsx');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
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
      canLoadMore: this.props.totalComments > this.props.comments.length ? true : false,
      lastPage: 0
    };
  },
  render: function render() {
    var _this = this;

    var submitPanel = React.createElement("div", null);
    var commentList = this.state.comments.map(function (item) {
      return React.createElement(Comment, { moduleId: _this.props.moduleId, comment: item, key: item.CommentId,
        appPath: _this.props.appPath, onDelete: _this.onCommentDelete });
    });
    if (this.props.loggedIn) {
      submitPanel = React.createElement(
        "div",
        { className: "panel-form" },
        React.createElement(
          "div",
          null,
          React.createElement("textarea", { className: "form-control", ref: "txtComment", placeholder: this.props.help })
        ),
        React.createElement(
          "div",
          { className: "panel-form-button" },
          React.createElement(
            "button",
            { className: "btn btn-primary", ref: "cmdAdd", onClick: this.addComment },
            this.resources.AddComment
          )
        )
      );
    }
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-xs-12" },
        React.createElement(
          "div",
          { className: "panel panel-default widget" },
          React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement("span", { className: "glyphicon glyphicon-comment" }),
            React.createElement(
              "h3",
              { className: "panel-title" },
              this.props.title
            ),
            React.createElement(
              "span",
              { className: "label label-info" },
              this.state.commentCount
            )
          ),
          submitPanel,
          React.createElement(
            "div",
            { className: "panel-body" },
            React.createElement(
              "ul",
              { className: "list-group" },
              commentList
            ),
            React.createElement(
              "a",
              { href: "#", className: "btn btn-primary btn-sm btn-block", role: "button",
                onClick: this.loadMoreComments, ref: "cmdMore", disabled: !this.state.canLoadMore },
              React.createElement("span", { className: "glyphicon glyphicon-refresh" }),
              " ",
              this.resources.More
            )
          )
        )
      )
    );
  },
  componentDidMount: function componentDidMount() {
    this.lastCheck = new Date();
    this.pollServer();
  },
  addComment: function addComment(e) {
    var _this2 = this;

    e.preventDefault();
    var comment = this.refs.txtComment.getDOMNode().value;
    this.service.addComment(this.props.conferenceId, this.props.sessionId, this.props.visibility, comment, function (data) {
      _this2.refs.txtComment.getDOMNode().value = '';
      var newComments = _this2.state.comments;
      newComments.unshift(data);
      _this2.setState({
        comments: newComments,
        commentCount: _this2.state.commentCount + 1
      });
    });
    return false;
  },
  loadMoreComments: function loadMoreComments(e) {
    var _this3 = this;

    e.preventDefault();
    if (this.state.canLoadMore) {
      this.service.loadComments(this.props.conferenceId, this.props.sessionId, this.props.visibility, this.state.lastPage + 1, this.props.pageSize, function (data) {
        var newCommentList = _this3.state.comments;
        newCommentList = newCommentList.concat(data);
        _this3.setState({
          comments: newCommentList,
          lastPage: _this3.state.lastPage + 1,
          canLoadMore: data.length < _this3.props.pageSize ? false : true
        });
      });
    }
  },
  onCommentDelete: function onCommentDelete(commentId, e) {
    var _this4 = this;

    e.preventDefault();
    if (confirm(this.resources.CommentDeleteConfirm)) {
      this.service.deleteComment(this.props.conferenceId, commentId, function () {
        var newCommentList = [];
        for (var i = 0; i < _this4.state.comments.length; i++) {
          if (_this4.state.comments[i].CommentId != commentId) {
            newCommentList.push(_this4.state.comments[i]);
          }
        }
        _this4.setState({
          comments: newCommentList,
          commentCount: _this4.state.commentCount - 1
        });
      });
    }
  },
  pollServer: function pollServer() {
    setTimeout(function () {
      this.service.checkNewComments(this.props.conferenceId, this.props.sessionId, this.props.visibility, this.lastCheck, function (data) {
        this.lastCheck = new Date(data.CheckTime);
        if (data.Comments.length > 0) {
          var newCommentList = data.Comments;
          for (var i = 0; i < this.state.comments.length; i++) {
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

},{"./Comment.jsx":7}],9:[function(require,module,exports){
'use strict';

var TimesheetEditor = require('./TimesheetEditor/TimesheetEditor.jsx'),
    Comments = require('./Comments/Comments.jsx'),
    Tags = require('./Tags/Tags.jsx'),
    Speakers = require('./Speakers/Speakers.jsx'),
    TagVotes = require('./TagVotes/TagVotes.jsx'),
    SessionVotes = require('./SessionVotes/SessionVotes.jsx'),
    Scheduler = require('./Scheduler/Scheduler.jsx'),
    Schedule = require('./Schedule/Schedule.jsx'),
    Resources = require('./Resources/Resources.jsx'),
    BulkAddUsers = require('./BulkAddUsers/BulkAddUsers.jsx'),
    SessionStatusButton = require('./Buttons/SessionStatusButton.jsx'),
    SessionManager = require('./SessionManager/SessionManager.jsx'),
    AttendeeTable = require('./AttendeeTable/AttendeeTable.jsx'),
    LiveTicker = require('./LiveTicker/LiveTicker.jsx'),
    NBrightOrders = require('./NBright/OrderTable.jsx'),
    AttendanceButton = require('./Attendance/AttendanceButton.jsx');

(function ($, window, document, undefined) {

  $(document).ready(function () {
    ConnectConference.loadData();
  });

  window.ConnectConference = {
    modules: {},

    loadData: function loadData() {
      $('.connectConference').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var resources = $(el).data('resources');
        var security = $(el).data('security');
        ConnectConference.modules[moduleId] = {
          service: new ConferenceService($, moduleId),
          resources: resources,
          security: security
        };
      });
      $('.timesheetEditor').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var slots = $(el).data('slots');
        var locations = $(el).data('locations');
        var conferenceId = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        React.render(React.createElement(TimesheetEditor, { moduleId: moduleId, slots: slots, locations: locations,
          conferenceId: conferenceId, nrDays: nrDays }), el);
      });
      $('.commentsComponent').each(function (i, el) {
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
        React.render(React.createElement(Comments, { moduleId: moduleId,
          conferenceId: conferenceId, sessionId: sessionId, appPath: appPath,
          totalComments: totalComments, loggedIn: loggedIn, title: title, help: help,
          visibility: visibility, pageSize: pageSize, comments: comments }), el);
      });
      $('.tagsComponent').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var fieldName = $(el).data('name');
        var placeholder = $(el).data('placeholder');
        var tags = $(el).data('tags');
        React.render(React.createElement(Tags, { moduleId: moduleId, name: fieldName, tags: tags, placeholder: placeholder,
          conferenceId: conferenceId }), el);
      });
      $('.speakersComponent').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var sessionId = $(el).data('session');
        var fieldName = $(el).data('name');
        var speakers = $(el).data('speakers');
        React.render(React.createElement(Speakers, { moduleId: moduleId, name: fieldName, speakers: speakers, sessionId: sessionId,
          conferenceId: conferenceId }), el);
      });
      $('.tagVoteComponent').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var voteList = $(el).data('votelist');
        var allowVote = $(el).data('allowvote');
        var allowAdd = $(el).data('allowadd');
        React.render(React.createElement(TagVotes, { moduleId: moduleId, voteList: voteList, allowVote: allowVote, allowAdd: allowAdd,
          conferenceId: conferenceId }), el);
      });
      $('.sessionVoteComponent').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var voteList = $(el).data('votelist');
        var allowVote = $(el).data('allowvote');
        React.render(React.createElement(SessionVotes, { moduleId: moduleId, voteList: voteList, allowVote: allowVote,
          conferenceId: conferenceId }), el);
      });
      $('.schedulerComponent').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var conference = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        var slots = $(el).data('slots');
        var sessions = $(el).data('sessions');
        var gridHeight = $(el).data('gridheight');
        var locations = $(el).data('locations');
        React.render(React.createElement(Scheduler, { moduleId: moduleId, conference: conference, locations: locations,
          nrDays: nrDays, slots: slots, sessions: sessions, gridHeight: gridHeight }), el);
      });
      $('.scheduleComponent').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var conference = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        var slots = $(el).data('slots');
        var sessions = $(el).data('sessions');
        var gridHeight = $(el).data('gridheight');
        var locations = $(el).data('locations');
        React.render(React.createElement(Schedule, { moduleId: moduleId, conference: conference, locations: locations,
          nrDays: nrDays, slots: slots, sessions: sessions, gridHeight: gridHeight }), el);
      });
      $('.resourcesComponent').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var tabId = $(el).data('tabid');
        var conferenceId = $(el).data('conferenceid');
        var sessionId = $(el).data('sessionid');
        var resources = $(el).data('resources');
        var canAdd = $(el).data('canadd');
        var resourceDir = $(el).data('resourcedir');
        React.render(React.createElement(Resources, { moduleId: moduleId, conferenceId: conferenceId, resources: resources,
          canAdd: canAdd, tabId: tabId, sessionId: sessionId, resourceDir: resourceDir }), el);
      });
      $('.bulkAddUsersComponent').each(function (i, el) {
        var moduleId = $(el).data('moduleid');
        var tabId = $(el).data('tabid');
        var conferenceId = $(el).data('conferenceid');
        var type = $(el).data('type');
        React.render(React.createElement(BulkAddUsers, { moduleId: moduleId, conferenceId: conferenceId, type: type }), el);
      });
      $('.sessionStatusButton').each(function (i, el) {
        React.render(React.createElement(SessionStatusButton, { module: ConnectConference.modules[$(el).data('moduleid')],
          options: $(el).data('options'),
          selected: $(el).data('selected'),
          conferenceId: $(el).data('conferenceid'),
          sessionId: $(el).data('sessionid') }), el);
      });
      $('.sessionManager').each(function (i, el) {
        React.render(React.createElement(SessionManager, { module: ConnectConference.modules[$(el).data('moduleid')],
          statusOptions: $(el).data('statusoptions'),
          tracks: $(el).data('tracks'),
          conferenceId: $(el).data('conferenceid'),
          sessions: $(el).data('sessions') }), el);
      });
      $('.attendeeTable').each(function (i, el) {
        React.render(React.createElement(AttendeeTable, { module: ConnectConference.modules[$(el).data('moduleid')],
          conferenceId: $(el).data('conferenceid'),
          attendees: $(el).data('attendees') }), el);
      });
      $('.liveTicker').each(function (i, el) {
        React.render(React.createElement(LiveTicker, { module: ConnectConference.modules[$(el).data('moduleid')],
          conferenceId: $(el).data('conferenceid'),
          locations: $(el).data('locations') }), el);
      });
      $('.nbright').each(function (i, el) {
        React.render(React.createElement(NBrightOrders, { module: ConnectConference.modules[$(el).data('moduleid')],
          conferenceId: $(el).data('conferenceid'),
          orders: $(el).data('orders') }), el);
      });
      $('.sessionAttendanceButton').each(function (i, el) {
        React.render(React.createElement(AttendanceButton, { module: ConnectConference.modules[$(el).data('moduleid')],
          session: $(el).data('session')
        }), el);
      });
    },

    formatString: function formatString(format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    }

  };
})(jQuery, window, document);

},{"./Attendance/AttendanceButton.jsx":1,"./AttendeeTable/AttendeeTable.jsx":3,"./BulkAddUsers/BulkAddUsers.jsx":4,"./Buttons/SessionStatusButton.jsx":6,"./Comments/Comments.jsx":8,"./LiveTicker/LiveTicker.jsx":10,"./NBright/OrderTable.jsx":14,"./Resources/Resources.jsx":21,"./Schedule/Schedule.jsx":24,"./Scheduler/Scheduler.jsx":28,"./SessionManager/SessionManager.jsx":34,"./SessionVotes/SessionVotes.jsx":38,"./Speakers/Speakers.jsx":40,"./TagVotes/TagVotes.jsx":43,"./Tags/Tags.jsx":45,"./TimesheetEditor/TimesheetEditor.jsx":46}],10:[function(require,module,exports){
"use strict";

var Location = require('./Location.jsx');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    if (this.props.pollingSeconds == undefined) {
      this.pollingInterval = 10000;
    } else {
      this.pollingInterval = this.props.pollingSeconds * 1000;
    }
    return {
      data: {
        Sessions: []
      }
    };
  },
  componentDidMount: function componentDidMount() {
    this.lastCheck = new Date();
    this.pollServer();
  },
  render: function render() {
    var _this = this;

    var colSize = Math.floor(12 / this.props.locations.length);
    var locations = this.props.locations.map(function (item) {
      return React.createElement(Location, { location: item, module: _this.props.module,
        colSize: colSize, key: item.LocationId,
        data: _this.state.data });
    });
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        "div",
        { className: "row" },
        locations
      )
    );
  },
  pollServer: function pollServer() {
    var _this2 = this;

    setTimeout(function () {
      _this2.props.module.service.getNextSessions(_this2.props.conferenceId, function (data) {
        _this2.lastCheck = new Date(data.CheckTime);
        _this2.setState({
          data: data
        });
        _this2.pollServer();
      });
    }, this.pollingInterval);
  }
});

},{"./Location.jsx":11}],11:[function(require,module,exports){
"use strict";

var Session = require('./Session.jsx');

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    var _this = this;

    var sessionList = this.props.data.Sessions[this.props.location.LocationId];
    var sessions = null;
    if (sessionList != undefined) {
      sessions = sessionList.map(function (item) {
        return React.createElement(Session, { session: item,
          attendees: _this.props.data.Attendees[item.SessionId] });
      });
    }
    return React.createElement(
      "div",
      { className: "col-md-" + this.props.colSize + " col-xs-12" },
      React.createElement(
        "h2",
        null,
        this.props.location.Name
      ),
      sessions
    );
  }
});

},{"./Session.jsx":12}],12:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    var attendees = null;
    if (this.props.attendees.length != 0) {
      var attendeeList = this.props.attendees.map(function (item) {
        return React.createElement(
          "p",
          null,
          item.SessionAttendeeName
        );
      });
      attendees = React.createElement(
        "div",
        { className: "attendees" },
        React.createElement(
          "h4",
          null,
          "Attending"
        ),
        attendeeList
      );
    }
    var start = moment(this.props.session.SessionDateAndTime);
    var end = moment(this.props.session.SessionEnd);
    var speakers = this.props.session.Speakers.map(function (item) {
      return React.createElement(
        "span",
        null,
        item.Value
      );
    });
    var subtitle = this.props.session.SubTitle == null ? null : React.createElement(
      "div",
      { className: "subTitle" },
      this.props.session.SubTitle
    );
    var boxStyle = {
      backgroundColor: this.props.session.BackgroundColor
    };
    var style1 = {
      borderColor: this.props.session.BackgroundColor
    };
    var style2 = {
      backgroundColor: this.props.session.BackgroundColor,
      borderColor: this.props.session.BackgroundColor
    };
    var style3 = {
      borderTopColor: this.props.session.BackgroundColor,
      borderBottomColor: this.props.session.BackgroundColor
    };
    return React.createElement(
      "div",
      { className: "session" },
      React.createElement(
        "div",
        { className: "panel panel-default", style: style1 },
        React.createElement(
          "div",
          { className: "panel-heading", style: style2 },
          React.createElement("span", { className: "glyphicon glyphicon-time" }),
          " ",
          React.createElement(
            "span",
            { className: "time" },
            start.format('H:mm')
          ),
          " - ",
          React.createElement(
            "span",
            { className: "time" },
            end.format('H:mm')
          ),
          React.createElement(
            "span",
            { className: "pull-right headSub" },
            start.fromNow()
          )
        ),
        React.createElement(
          "div",
          { className: "panel-body", style: style3 },
          React.createElement(
            "div",
            { className: "sessionTitle" },
            this.props.session.Title,
            subtitle
          ),
          React.createElement(
            "div",
            { className: "speakers" },
            speakers
          ),
          attendees
        )
      )
    );
  }
});

},{}],13:[function(require,module,exports){
'use strict';

module.exports = React.createClass({
    displayName: 'exports',
    getInitialState: function getInitialState() {
        return {
            ItemId: -1
        };
    },
    show: function show(itemId) {
        var _this = this;

        this.setState({
            ItemId: itemId
        }, function () {
            $(_this.refs.popup.getDOMNode()).modal('show');
        });
    },
    cmdSave: function cmdSave() {
        $(this.refs.popup.getDOMNode()).modal('hide');
        this.props.save(this.state.ItemId, this.refs.txtInput.getDOMNode().value);
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'modal fade', tabindex: '-1', role: 'dialog', ref: 'popup' },
            React.createElement(
                'div',
                { className: 'modal-dialog' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                            React.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '×'
                            )
                        ),
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            'Title'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement('input', { type: 'text', className: 'form-control', ref: 'txtInput', placeholder: 'Audit Text' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                            'Cancel'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-primary', onClick: this.cmdSave },
                            'Save'
                        )
                    )
                )
            )
        );
    }
});

},{}],14:[function(require,module,exports){
'use strict';

var OrderTableRow = require('./OrderTableRow.jsx'),
    ColumnHeader = require('../Tables/ColumnHeader.jsx'),
    ShowDetails = require('./ShowDetails.jsx'),
    AddAuditText = require('./AddAuditText.jsx');

module.exports = React.createClass({
    displayName: 'exports',
    getInitialState: function getInitialState() {
        return {
            orders: this.props.orders,
            sortField: 'OrderNr',
            sortReverse: false
        };
    },
    sort: function sort(sortField, sortReverse) {
        this.setState({
            sortField: sortField,
            sortReverse: sortReverse
        });
    },
    changeStatus: function changeStatus(order, newStatus) {
        var _this = this;

        this.props.module.service.updateOrderStatus(order.ItemId, newStatus.Id, function (data) {
            var orders = _this.state.orders.map(function (o) {
                if (o.ItemId == order.ItemId) {
                    return data;
                } else {
                    return o;
                }
            });
            _this.setState({
                orders: orders
            });
        });
    },
    addAuditClick: function addAuditClick(itemId, e) {
        e.preventDefault();
        this.refs.AuditText.show(itemId);
    },
    addAuditText: function addAuditText(itemId, auditText) {
        this.props.module.service.addOrderAudit(itemId, auditText, function () {});
    },
    showDetailsClick: function showDetailsClick(itemId, e) {
        e.preventDefault();
        this.refs.ShowDetails.show(itemId);
    },
    render: function render() {
        var _this2 = this;

        var statusOptions = [{ Id: 10, Color: "#bbb", Text: "Incomplete" }, { Id: 20, Color: "#2d3538", Text: "Waiting for Bank" }, { Id: 30, Color: "#bbb", Text: "Cancelled" }, { Id: 40, Color: "#acc413", Text: "Payment OK" }, { Id: 50, Color: "#c93200", Text: "Payment Not Verified" }, { Id: 60, Color: "#ea690b", Text: "Waiting for Payment" }, { Id: 70, Color: "#eb2659", Text: "Waiting for Stock" }, { Id: 80, Color: "#eb2659", Text: "Waiting" }, { Id: 90, Color: "#893658", Text: "Shipped" }, { Id: 100, Color: "#1aa8e3", Text: "Completed" }, { Id: 110, Color: "#bbb", Text: "Archived" }, { Id: 120, Color: "#eb2659", Text: "Being Manufactured" }];
        var orders = this.state.orders;
        var sortPrimer = null;
        switch (this.state.sortField) {
            case 'CreatedDate':
                sortPrimer = function sortPrimer(a) {
                    return moment(a).format();
                };
                break;
            case 'OrderStatus':
                sortPrimer = parseInt;
                break;
            case 'OrderedBy':
                sortPrimer = function sortPrimer(a) {
                    return a.toUpperCase();
                };
                break;
        }
        orders.sort(sort_by(this.state.sortField, this.state.sortReverse, sortPrimer));
        var rows = orders.map(function (o) {
            return React.createElement(OrderTableRow, { order: o, statusOptions: statusOptions, statusChange: _this2.changeStatus, addAuditClick: _this2.addAuditClick, showDetailsClick: _this2.showDetailsClick });
        });
        return React.createElement(
            'div',
            null,
            React.createElement(
                'table',
                { className: 'table table-responsive' },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(ColumnHeader, { SortField: this.state.sortField, SortReverse: this.state.sortReverse,
                            Heading: 'Date', ColumnName: 'CreatedDate', SortClick: this.sort }),
                        React.createElement(ColumnHeader, { SortField: this.state.sortField, SortReverse: this.state.sortReverse,
                            Heading: 'Nr', ColumnName: 'OrderNr', SortClick: this.sort }),
                        React.createElement(ColumnHeader, { SortField: this.state.sortField, SortReverse: this.state.sortReverse,
                            Heading: 'By', ColumnName: 'OrderedBy', SortClick: this.sort }),
                        React.createElement(
                            'th',
                            null,
                            'Total'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Nr'
                        ),
                        React.createElement(ColumnHeader, { SortField: this.state.sortField, SortReverse: this.state.sortReverse,
                            Heading: 'Status', ColumnName: 'OrderStatus', SortClick: this.sort }),
                        React.createElement('th', null),
                        React.createElement('th', null)
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    rows
                )
            ),
            React.createElement(AddAuditText, { ref: 'AuditText', save: this.addAuditText }),
            React.createElement(ShowDetails, { ref: 'ShowDetails', module: this.props.module, conferenceId: this.props.conferenceId })
        );
    }
});

},{"../Tables/ColumnHeader.jsx":41,"./AddAuditText.jsx":13,"./OrderTableRow.jsx":15,"./ShowDetails.jsx":17}],15:[function(require,module,exports){
'use strict';

var StatusButton = require('./StatusButton.jsx');

module.exports = React.createClass({
    displayName: 'exports',
    getInitialState: function getInitialState() {
        return {};
    },
    render: function render() {
        var _this = this;

        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                { style: colStyle(75) },
                moment(this.props.order.CreatedDate).format('l')
            ),
            React.createElement(
                'td',
                { style: colStyle(150) },
                this.props.order.OrderNr
            ),
            React.createElement(
                'td',
                null,
                this.props.order.OrderedBy
            ),
            React.createElement(
                'td',
                { style: colStyle(50, true) },
                this.props.order.Total.toFixed(2)
            ),
            React.createElement(
                'td',
                { style: colStyle(20, true) },
                this.props.order.NrParticipants
            ),
            React.createElement(
                'td',
                { style: colStyle(200) },
                React.createElement(StatusButton, { options: this.props.statusOptions, onStatusChange: function onStatusChange(newStatus) {
                        return _this.props.statusChange(_this.props.order, newStatus);
                    }, selected: this.props.order.OrderStatus })
            ),
            React.createElement(
                'td',
                { style: colStyle(32) },
                React.createElement(
                    'button',
                    { className: 'btn btn-default', onClick: function onClick(e) {
                            return _this.props.addAuditClick(_this.props.order.ItemId, e);
                        } },
                    React.createElement('i', { className: 'glyphicon glyphicon-plus' })
                )
            ),
            React.createElement(
                'td',
                { style: colStyle(32) },
                React.createElement(
                    'button',
                    { className: 'btn btn-default', onClick: function onClick(e) {
                            return _this.props.showDetailsClick(_this.props.order.ItemId, e);
                        } },
                    React.createElement('i', { className: 'glyphicon glyphicon-user' })
                )
            )
        );
    }
});

},{"./StatusButton.jsx":18}],16:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
    displayName: "exports",
    getInitialState: function getInitialState() {
        return {};
    },
    render: function render() {
        var _this = this;

        var btn = null;
        if (this.props.participant.ProductName == 'Attendee' && (this.props.participant.OrderStatus == 40 || this.props.participant.OrderStatus == 100)) {
            if (this.props.participant.AttendeeUserId) {
                btn = React.createElement(
                    "button",
                    { className: "btn btn-sm btn-warning", onClick: function onClick(e) {
                            return _this.props.toggleParticipantRegistration(_this.props.participant, e);
                        } },
                    React.createElement("i", { className: "glyphicon glyphicon-minus" })
                );
            } else {
                btn = React.createElement(
                    "button",
                    { className: "btn btn-sm btn-success", onClick: function onClick(e) {
                            return _this.props.toggleParticipantRegistration(_this.props.participant, e);
                        } },
                    React.createElement("i", { className: "glyphicon glyphicon-plus" })
                );
            }
        }
        return React.createElement(
            "tbody",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { style: colStyle(50) },
                    this.props.participant.ProductName
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.participant.FirstName
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.participant.LastName
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.participant.Email
                ),
                React.createElement(
                    "td",
                    { style: colStyle(32), rowSpan: 2 },
                    btn
                )
            ),
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: 4 },
                    React.createElement(
                        "em",
                        null,
                        "Staying from ",
                        moment(this.props.participant.Arrival).format('l'),
                        " to ",
                        moment(this.props.participant.Departure).format('l')
                    )
                )
            )
        );
    }
});

},{}],17:[function(require,module,exports){
"use strict";

var ParticipantRow = require('./ParticipantRow.jsx');

module.exports = React.createClass({
    displayName: "exports",
    getInitialState: function getInitialState() {
        return {
            ItemId: -1,
            Details: [],
            Log: [],
            FirstRec: {}
        };
    },
    statusToText: function statusToText(status) {
        switch (status) {
            case 10:
                return "Incomplete 010";
            case 20:
                return "Waiting for Bank 020";
            case 30:
                return "Cancelled 030";
            case 40:
                return "Payment OK 040";
            case 50:
                return "Payment Not Verified 050";
            case 60:
                return "Waiting for Payment 060";
            case 70:
                return "Waiting for Stock 070";
            case 80:
                return "Waiting 080";
            case 90:
                return "Shipped 090";
            case 100:
                return "Completed 100";
            case 110:
                return "Archived 110";
            case 120:
                return "Being Manufactured 120";
        }
    },
    nullOrMoney: function nullOrMoney(amount) {
        if (amount) {
            return amount.toFixed(2);
        }
        return "";
    },
    show: function show(itemId) {
        var _this = this;

        this.setState({
            ItemId: itemId
        }, function () {
            _this.props.module.service.getOrderAudit(_this.props.conferenceId, itemId, function (data) {
                _this.setState({
                    Log: data
                }, function () {
                    _this.props.module.service.getOrderDetails(_this.props.conferenceId, itemId, function (data) {
                        if (data.length > 0) {
                            _this.setState({
                                FirstRec: data[0]
                            });
                        }
                        _this.setState({
                            Details: data
                        }, function () {
                            $(_this.refs.popup.getDOMNode()).modal('show');
                        });
                    });
                });
            });
        });
    },
    cmdSave: function cmdSave() {
        $(this.refs.popup.getDOMNode()).modal('hide');
        this.props.save(this.state.ItemId, this.refs.txtInput.getDOMNode().value);
    },
    toggleParticipantRegistration: function toggleParticipantRegistration(person, e) {
        var _this2 = this;

        e.preventDefault();
        this.props.module.service.toggleParticipant(this.props.conferenceId, this.state.ItemId, person, function (data) {
            _this2.setState({
                Details: data
            });
        });
    },
    render: function render() {
        var _this3 = this;

        var rows = this.state.Details.map(function (person) {
            return React.createElement(ParticipantRow, { participant: person, toggleParticipantRegistration: _this3.toggleParticipantRegistration });
        });
        var auditRows = this.state.Log.map(function (item) {
            var msg = item.Message;
            if (!msg && item.OrderStatus) {
                msg = 'Status: ' + _this3.statusToText(item.OrderStatus);
            }
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { style: colStyle(50) },
                    moment(item.AuditDate).format('l')
                ),
                React.createElement(
                    "td",
                    { style: colStyle(75) },
                    item.Username
                ),
                React.createElement(
                    "td",
                    null,
                    msg
                )
            );
        });
        return React.createElement(
            "div",
            { className: "modal fade", tabindex: "-1", role: "dialog", ref: "popup" },
            React.createElement(
                "div",
                { className: "modal-dialog" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "modal-header" },
                        React.createElement(
                            "button",
                            { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                            React.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "×"
                            )
                        ),
                        React.createElement(
                            "h4",
                            { className: "modal-title" },
                            "Details"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        React.createElement(
                            "dl",
                            { className: "dl-horizontal" },
                            React.createElement(
                                "dt",
                                null,
                                "Order Nr"
                            ),
                            React.createElement(
                                "dd",
                                null,
                                this.state.FirstRec.OrderNr
                            ),
                            React.createElement(
                                "dt",
                                null,
                                "Order Date and Time"
                            ),
                            React.createElement(
                                "dd",
                                null,
                                moment(this.state.FirstRec.CreatedDate).format('LLL')
                            ),
                            React.createElement(
                                "dt",
                                null,
                                "Ordered By"
                            ),
                            React.createElement(
                                "dd",
                                null,
                                this.state.FirstRec.OrderedBy
                            ),
                            React.createElement(
                                "dt",
                                null,
                                "Status"
                            ),
                            React.createElement(
                                "dd",
                                null,
                                this.statusToText(this.state.FirstRec.OrderStatus)
                            ),
                            React.createElement(
                                "dt",
                                null,
                                "Subtotal"
                            ),
                            React.createElement(
                                "dd",
                                null,
                                this.nullOrMoney(this.state.FirstRec.SubTotal)
                            ),
                            React.createElement(
                                "dt",
                                null,
                                "Discount"
                            ),
                            React.createElement(
                                "dd",
                                null,
                                this.nullOrMoney(this.state.FirstRec.Discount)
                            ),
                            React.createElement(
                                "dt",
                                null,
                                "Total"
                            ),
                            React.createElement(
                                "dd",
                                null,
                                this.nullOrMoney(this.state.FirstRec.Total)
                            )
                        ),
                        React.createElement(
                            "h4",
                            null,
                            "Participants"
                        ),
                        React.createElement(
                            "table",
                            { className: "table table-responsive" },
                            React.createElement(
                                "thead",
                                null,
                                React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "th",
                                        null,
                                        "Type"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "First"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Last"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Email"
                                    ),
                                    React.createElement("th", null)
                                )
                            ),
                            rows
                        ),
                        React.createElement(
                            "h4",
                            null,
                            "Audit"
                        ),
                        React.createElement(
                            "table",
                            { className: "table table-responsive" },
                            React.createElement(
                                "thead",
                                null,
                                React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "th",
                                        null,
                                        "Date"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "User"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Message"
                                    )
                                )
                            ),
                            React.createElement(
                                "tbody",
                                null,
                                auditRows
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-footer" },
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
                            "Cancel"
                        ),
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-primary", onClick: this.cmdSave },
                            "Save"
                        )
                    )
                )
            )
        );
    }
});

},{"./ParticipantRow.jsx":16}],18:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
    displayName: "exports",
    getInitialState: function getInitialState() {
        return {};
    },
    render: function render() {
        var btnClass = "";
        var btnText = "";
        var options = [];
        var style = {
            color: "#fff"
        };
        var liStyle = {
            listStyleType: "none"
        };
        btnClass = 'default';
        for (var i = 0; i < this.props.options.length; i++) {
            var opt = this.props.options[i];
            if (opt.Id == this.props.selected) {
                style.backgroundColor = opt.Color;
                style.borderColor = opt.Color;
                btnText = opt.Text;
            } else {
                options.push(React.createElement(
                    "li",
                    { style: liStyle },
                    React.createElement(
                        "a",
                        { href: "#", "data-id": opt.Id,
                            onClick: this.statusChange.bind(null, opt) },
                        opt.Text
                    )
                ));
            }
        }
        return React.createElement(
            "div",
            { className: "btn-group" },
            React.createElement(
                "button",
                { type: "button", className: "btn btn-sm btn-" + btnClass, style: style },
                btnText
            ),
            React.createElement(
                "button",
                { type: "button", className: "btn btn-sm btn-" + btnClass + " dropdown-toggle", style: style, "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                " ",
                React.createElement("span", { className: "caret" }),
                React.createElement(
                    "span",
                    { className: "sr-only" },
                    "Toggle Dropdown"
                )
            ),
            React.createElement(
                "ul",
                { className: "dropdown-menu" },
                options
            )
        );
    },
    statusChange: function statusChange(newStatus, e) {
        e.preventDefault();
        if (!confirm('Do you wish to change the status to ' + newStatus.Text + '?')) {
            return;
        }
        this.props.onStatusChange(newStatus);
    }
});

},{}],19:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    switch (this.props.type) {

      case 'file-text':
        return React.createElement(
          "svg",
          { width: "2048", height: "2048", viewBox: "0 0 2048 2048", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement("path", { d: "M1724 508q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-1024-864q0-14 9-23t23-9h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64zm736 224q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704zm0 256q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704z" })
        );

      case 'file-powerpoint':
        return React.createElement(
          "svg",
          { width: "2048", height: "2048", viewBox: "0 0 2048 2048", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement("path", { d: "M1724 508q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-992-234v106h327v-106h-93v-167h137q76 0 118-15 67-23 106.5-87t39.5-146q0-81-37-141t-100-87q-48-19-130-19h-368v107h92v555h-92zm353-280h-119v-268h120q52 0 83 18 56 33 56 115 0 89-62 120-31 15-78 15z" })
        );

      case 'file-pdf':
        return React.createElement(
          "svg",
          { width: "2048", height: "2048", viewBox: "0 0 2048 2048", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement("path", { d: "M1724 508q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-514-593q33 26 84 56 59-7 117-7 147 0 177 49 16 22 2 52 0 1-1 2l-2 2v1q-6 38-71 38-48 0-115-20t-130-53q-221 24-392 83-153 262-242 262-15 0-28-7l-24-12q-1-1-6-5-10-10-6-36 9-40 56-91.5t132-96.5q14-9 23 6 2 2 2 4 52-85 107-197 68-136 104-262-24-82-30.5-159.5t6.5-127.5q11-40 42-40h22q23 0 35 15 18 21 9 68-2 6-4 8 1 3 1 8v30q-2 123-14 192 55 164 146 238zm-576 411q52-24 137-158-51 40-87.5 84t-49.5 74zm398-920q-15 42-2 132 1-7 7-44 0-3 7-43 1-4 4-8-1-1-1-2t-.5-1.5-.5-1.5q-1-22-13-36 0 1-1 2v2zm-124 661q135-54 284-81-2-1-13-9.5t-16-13.5q-76-67-127-176-27 86-83 197-30 56-45 83zm646-16q-24-24-140-24 76 28 124 28 14 0 18-1 0-1-2-3z" })
        );

      case 'file':
        return React.createElement(
          "svg",
          { width: "2048", height: "2048", viewBox: "0 0 2048 2048", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement("path", { d: "M1724 508q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280z" })
        );

      case 'file-code':
        return React.createElement(
          "svg",
          { width: "2048", height: "2048", viewBox: "0 0 2048 2048", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement("path", { d: "M1724 508q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-928-896q8-11 21-12.5t24 6.5l51 38q11 8 12.5 21t-6.5 24l-182 243 182 243q8 11 6.5 24t-12.5 21l-51 38q-11 8-24 6.5t-21-12.5l-226-301q-14-19 0-38zm802 301q14 19 0 38l-226 301q-8 11-21 12.5t-24-6.5l-51-38q-11-8-12.5-21t6.5-24l182-243-182-243q-8-11-6.5-24t12.5-21l51-38q11-8 24-6.5t21 12.5zm-620 461q-13-2-20.5-13t-5.5-24l138-831q2-13 13-20.5t24-5.5l63 10q13 2 20.5 13t5.5 24l-138 831q-2 13-13 20.5t-24 5.5z" })
        );

      case 'file-archive':
        return React.createElement(
          "svg",
          { width: "2048", height: "2048", viewBox: "0 0 2048 2048", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement("path", { d: "M896 512v-128h-128v128h128zm128 128v-128h-128v128h128zm-128 128v-128h-128v128h128zm128 128v-128h-128v128h128zm700-388q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-128v128h-128v-128h-512v1536h1280zm-627-721l107 349q8 27 8 52 0 83-72.5 137.5t-183.5 54.5-183.5-54.5-72.5-137.5q0-25 8-52 21-63 120-396v-128h128v128h79q22 0 39 13t23 34zm-141 465q53 0 90.5-19t37.5-45-37.5-45-90.5-19-90.5 19-37.5 45 37.5 45 90.5 19z" })
        );

      case 'hyperlink':
        return React.createElement(
          "svg",
          { width: "2048", height: "2048", viewBox: "0 0 2048 2048", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement("path", { d: "M1536 1056v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45 45-19h512q26 0 45 19t19 45z" })
        );

      default:
        return null;

    }
  }
});

},{}],20:[function(require,module,exports){
'use strict';

var Icon = require('./Icon.jsx'),
    StatusApprovalButton = require('./StatusApprovalButton.jsx');

module.exports = React.createClass({
  displayName: 'exports',


  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.security = ConnectConference.modules[this.props.moduleId].security;
    return {
      description: this.props.resource.ResourceDescription,
      dirty: false
    };
  },

  render: function render() {
    var icon = "file";
    var link = this.props.resourceDir + this.props.resource.ResourceLink;
    var linkClass = "btn btn-sm btn-success glyphicon glyphicon-download";
    switch (this.props.resource.ResourceType) {
      case 1:
        icon = "file-powerpoint";
        break;
      case 2:
        icon = "file-archive";
        break;
      case 3:
        icon = "file-pdf";
        break;
      case 100:
        icon = "hyperlink";
        link = this.props.resource.ResourceLink;
        linkClass = "btn btn-sm btn-info glyphicon glyphicon-globe";
        break;
    }
    var deleteCol = null;
    if (this.props.canAdd) {
      deleteCol = React.createElement(
        'td',
        { className: 'iconCol' },
        React.createElement(
          'a',
          { href: '#', onClick: this.props.deleteResource.bind(null, this.props.resource), title: this.resources.Delete },
          React.createElement('span', { className: 'btn btn-sm btn-danger glyphicon glyphicon-remove' })
        )
      );
    }
    var okCol = null;
    if (this.security.CanManage | this.props.canAdd) {
      okCol = React.createElement(StatusApprovalButton, { resource: this.props.resource,
        approveResource: this.props.approveResource,
        canManage: this.security.CanManage,
        moduleId: this.props.moduleId });
    }
    var descriptionBox = this.props.resource.ResourceDescription;
    if (this.props.canAdd) {
      descriptionBox = React.createElement('input', { type: 'text', value: this.state.description, className: 'form-control',
        onBlur: this.onDescriptionChanged, onChange: this.onDescriptionChange });
    }
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        { className: 'iconCol' },
        React.createElement(Icon, { type: icon })
      ),
      React.createElement(
        'td',
        null,
        descriptionBox
      ),
      okCol,
      deleteCol,
      React.createElement(
        'td',
        { className: 'iconCol' },
        React.createElement(
          'a',
          { href: link },
          React.createElement('span', { className: linkClass })
        )
      )
    );
  },

  onDescriptionChange: function onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
      dirty: true
    });
  },

  onDescriptionChanged: function onDescriptionChanged(e) {
    if (this.state.dirty) {
      var resource = this.props.resource;
      resource.ResourceDescription = e.target.value;
      this.props.editResource(resource, e);
      this.setState({
        dirty: false
      });
    }
  }

});

},{"./Icon.jsx":19,"./StatusApprovalButton.jsx":22}],21:[function(require,module,exports){
'use strict';

var Resource = require('./Resource.jsx'),
    Video = require('./Video.jsx');

module.exports = React.createClass({
  displayName: 'exports',


  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
      resources: this.props.resources
    };
  },

  render: function render() {
    var uploadPanel = null;
    var urlPanel = null;
    if (this.props.canAdd) {
      uploadPanel = React.createElement(
        'div',
        { className: 'dropPanel' },
        React.createElement(
          'a',
          { href: '#', className: 'btn btn-default cmdUpload' },
          this.resources.Upload
        ),
        React.createElement(
          'div',
          { ref: 'msgBox' },
          this.resources.DropHere
        )
      );
      urlPanel = React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          null,
          this.resources.NewUrl
        ),
        React.createElement(
          'div',
          { className: 'input-group' },
          React.createElement('input', { type: 'text', className: 'form-control', ref: 'newUrl' }),
          React.createElement(
            'a',
            { href: '#', className: 'input-group-addon btn btn-default', onClick: this.addUrl },
            this.resources.Add
          )
        )
      );
    }
    var resourceList = this.state.resources.map(function (item) {
      if (item.ResourceType < 200) {
        return React.createElement(Resource, { resource: item, key: item.SessionResourceId, moduleId: this.props.moduleId,
          approveResource: this.approveResource, deleteResource: this.deleteResource, editResource: this.editResource,
          resourceDir: this.props.resourceDir, canAdd: this.props.canAdd });
      }
    }.bind(this));
    var embeddedContent = this.state.resources.map(function (item) {
      if (item.ResourceType > 199) {
        return React.createElement(Video, { resource: item, key: item.SessionResourceId, moduleId: this.props.moduleId,
          approveResource: this.approveResource, deleteResource: this.deleteResource, editResource: this.editResource,
          resourceDir: this.props.resourceDir, canAdd: this.props.canAdd });
      }
    }.bind(this));
    return React.createElement(
      'div',
      null,
      embeddedContent,
      React.createElement(
        'table',
        { className: 'table' },
        React.createElement(
          'tbody',
          null,
          resourceList
        )
      ),
      uploadPanel,
      urlPanel
    );
  },

  componentDidMount: function componentDidMount() {
    $(document).ready(function () {
      var uploader = new ss.SimpleUpload({
        button: $('.cmdUpload'),
        dropzone: $('.dropPanel'),
        url: this.service.ServicePath() + 'Conference/' + this.props.conferenceId + '/SessionResources/Upload/' + this.props.sessionId,
        customHeaders: {
          ModuleId: this.props.moduleId,
          TabId: this.props.tabId,
          RequestVerificationToken: $('[name="__RequestVerificationToken"]').val()
        },
        name: 'resource',
        multipart: true,
        hoverClass: 'hover',
        focusClass: 'focus',
        responseType: 'json',
        startXHR: function startXHR() {},
        onSubmit: function () {
          this.refs.msgBox.getDOMNode().innerHtml = this.resources.Uploading;
        }.bind(this),
        onComplete: function (filename, response) {
          this.refs.msgBox.getDOMNode().innerHtml = this.resources.DropHere;
          this.setState({
            resources: response
          });
        }.bind(this),
        onError: function (filename, errorType, status, statusText, response, uploadBtn, fileSize) {
          this.refs.msgBox.getDOMNode().innerHtml = 'Error uploading file: ' + response;
        }.bind(this)
      });
    }.bind(this));
  },

  addUrl: function addUrl(e) {
    e.preventDefault();
    var url = this.refs.newUrl.getDOMNode().value;
    this.service.addUrl(this.props.conferenceId, this.props.sessionId, url.trim(), function (data) {
      this.refs.newUrl.getDOMNode().value = '';
      this.setState({
        resources: data
      });
    }.bind(this), function (data) {
      alert(data);
    });
  },

  approveResource: function approveResource(resource, e) {
    e.preventDefault();
    this.service.approveResource(this.props.conferenceId, this.props.sessionId, resource, function (data) {
      this.setState({
        resources: data
      });
    }.bind(this));
  },

  deleteResource: function deleteResource(resource, e) {
    e.preventDefault();
    if (confirm(this.resources.ResourceDeleteConfirm)) {
      this.service.deleteResource(this.props.conferenceId, this.props.sessionId, resource, function (data) {
        this.setState({
          resources: data
        });
      }.bind(this));
    }
  },

  editResource: function editResource(resource, e) {
    this.service.editResource(this.props.conferenceId, this.props.sessionId, resource, function (data) {
      this.setState({
        resources: data
      });
    }.bind(this));
  }

});

},{"./Resource.jsx":20,"./Video.jsx":23}],22:[function(require,module,exports){
'use strict';

module.exports = React.createClass({
  displayName: 'exports',


  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {};
  },

  render: function render() {
    var classes = this.props.resource.Visibility == 0 ? 'btn btn-sm btn-warning' : 'btn btn-sm btn-success';
    var txt = this.props.resource.Visibility == 0 ? this.resources.Unapproved : this.resources.Approved;
    var btn = null;
    if (this.props.canManage) {
      btn = React.createElement(
        'a',
        { href: '#', onClick: this.props.approveResource.bind(null, this.props.resource),
          title: this.resources.Approve,
          className: classes },
        txt
      );
    } else {
      btn = React.createElement(
        'a',
        { href: '#', onClick: this.unapproved,
          title: this.resources.Approve,
          className: classes },
        txt
      );
    }
    return React.createElement(
      'td',
      { className: 'btnCol' },
      btn
    );
  },

  unapproved: function unapproved(e) {
    e.preventDefault();
    alert(this.resources.AdminMustApprove);
  }

});

},{}],23:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",


  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.security = ConnectConference.modules[this.props.moduleId].security;
    return {
      description: this.props.resource.ResourceDescription,
      dirty: false
    };
  },

  render: function render() {
    var srcLink = "";
    switch (this.props.resource.ResourceType) {
      case 200:
        srcLink = "//www.youtube.com/embed/" + this.props.resource.ResourceLink + "?rel=0";
        break;
      case 201:
        srcLink = "https://player.vimeo.com/video/" + this.props.resource.ResourceLink + "?rel=0";
        break;
      case 202:
        srcLink = "https://channel9.msdn.com/" + this.props.resource.ResourceLink + "/player";
        break;
    }
    var deleteCol = null;
    if (this.props.canAdd) {
      deleteCol = React.createElement(
        "td",
        { className: "iconCol" },
        React.createElement(
          "a",
          { href: "#", onClick: this.props.deleteResource.bind(null, this.props.resource), title: this.resources.Delete },
          React.createElement("span", { className: "btn btn-sm btn-danger glyphicon glyphicon-remove" })
        )
      );
    }
    var okCol = null;
    if (this.security.CanManage) {
      if (this.props.resource.Visibility == 0) {
        okCol = React.createElement(
          "td",
          { className: "iconCol" },
          React.createElement(
            "a",
            { href: "#", onClick: this.props.approveResource.bind(null, this.props.resource), title: this.resources.Approve },
            React.createElement("span", { className: "btn btn-sm btn-success glyphicon glyphicon-check" })
          )
        );
      } else {
        okCol = React.createElement("td", { className: "iconCol" });
      }
    }
    var descriptionBox = this.props.resource.ResourceDescription;
    if (this.props.canAdd) {
      descriptionBox = React.createElement("input", { type: "text", value: this.state.description, className: "form-control",
        onBlur: this.onDescriptionChanged, onChange: this.onDescriptionChange });
    }
    return React.createElement(
      "div",
      { className: "embeddedContent" },
      React.createElement("iframe", { width: "100%", height: "400px", src: srcLink, frameborder: "0", webkitallowfullscreen: true, mozallowfullscreen: true, allowfullscreen: true }),
      React.createElement(
        "table",
        { className: "table" },
        React.createElement(
          "tbody",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              descriptionBox
            ),
            okCol,
            deleteCol
          )
        )
      )
    );
  },

  onDescriptionChange: function onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
      dirty: true
    });
  },

  onDescriptionChanged: function onDescriptionChanged(e) {
    if (this.state.dirty) {
      var resource = this.props.resource;
      resource.ResourceDescription = e.target.value;
      this.props.editResource(resource, e);
      this.setState({
        dirty: false
      });
    }
  }

});

},{}],24:[function(require,module,exports){
"use strict";

var ScheduleDay = require('./ScheduleDay.jsx');

module.exports = React.createClass({
  displayName: "exports",


  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    var locationList = {};
    for (var i = 0; i < this.props.locations.length; i++) {
      locationList[this.props.locations[i].LocationId] = i;
    }
    var slotList = {};
    for (var j = 0; j < this.props.slots.length; j++) {
      slotList[this.props.slots[j].SlotId] = this.props.slots[j];
    }
    return {
      sessionList: this.props.sessions,
      locationList: locationList,
      slotList: slotList
    };
  },

  render: function render() {
    var scheduleDays = [];
    for (var i = 1; i <= this.props.nrDays; i++) {
      var daySlots = [];
      for (var j = 0; j < this.props.slots.length; j++) {
        var slot = this.props.slots[j];
        if (slot.DayNr == undefined | slot.DayNr == i) {
          daySlots.push(slot);
        }
      }
      scheduleDays.push(React.createElement(ScheduleDay, { conference: this.props.conference, day: i, slots: daySlots,
        start: Math.floor(daySlots[0].StartMinutes / 60) * 60 - 60,
        finish: 120 + Math.floor(daySlots[daySlots.length - 1].StartMinutes / 60) * 60,
        locationList: this.state.locationList,
        leftMargin: 50,
        sessionList: this.state.sessionList,
        locations: this.props.locations,
        slotList: this.state.slotList }));
    }
    return React.createElement(
      "div",
      { className: "row Scheduler" },
      React.createElement(
        "div",
        { className: "col-xs-12", ref: "scheduleColumn" },
        scheduleDays
      )
    );
  },

  componentDidMount: function componentDidMount() {
    $(document).ready(function () {
      $('[data-toggle="popover"]').popover({ html: true, trigger: 'hover', container: 'body' });
      $('div.embedded').each(function (i, el) {
        $(el).height($(el).parent().attr('height') - 12);
      });
    }.bind(this));
  }

});

},{"./ScheduleDay.jsx":25}],25:[function(require,module,exports){
'use strict';

var ScheduleGrid = require('./ScheduleGrid.jsx'),
    SchedulerScheduledSession = require('./ScheduleScheduledSession.jsx');

module.exports = React.createClass({
  displayName: 'exports',


  propTypes: {
    day: React.PropTypes.number,
    start: React.PropTypes.number,
    finish: React.PropTypes.number,
    leftMargin: React.PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    var height = this.props.finish - this.props.start;
    var width = this.props.locations.length * 100;
    var viewBox = "0 0 " + (width + this.props.leftMargin).toString() + " " + height;
    var scheduledSessions = [];
    for (var i = 0; i < this.props.sessionList.length; i++) {
      var session = this.props.sessionList[i];
      if (session.DayNr == this.props.day & session.SlotId > 0) {
        var slot = this.props.slotList[session.SlotId];
        if (session.IsPlenary) {
          scheduledSessions.push(React.createElement(
            'foreignObject',
            { x: this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: this.props.width, height: slot.DurationMins },
            React.createElement(SchedulerScheduledSession, { session: session })
          ));
        } else {
          scheduledSessions.push(React.createElement(
            'foreignObject',
            { x: this.props.locationList[session.LocationId] * 100 + this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: '100', height: slot.DurationMins },
            React.createElement(SchedulerScheduledSession, { session: session })
          ));
        }
      }
    }
    var date = new Date(this.props.conference.StartDate);
    date = date.addDays(this.props.day - 1);
    var dateString = moment(date).format('dddd MMM Do');
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h2',
        null,
        dateString
      ),
      React.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg',
          className: 'schedulerDay',
          viewBox: viewBox },
        React.createElement(
          'pattern',
          { id: 'Pattern', x: '10', y: '10', width: '8', height: '8', patternUnits: 'userSpaceOnUse' },
          React.createElement('path', { d: 'M0 0L8 8ZM8 0L0 8Z', className: 'hashLines' })
        ),
        React.createElement('rect', { x: '0', y: '0', height: height, width: width + this.props.leftMargin, className: 'dayBackground' }),
        React.createElement(ScheduleGrid, { width: width, height: height, leftMargin: this.props.leftMargin,
          start: this.props.start, ref: 'Grid', locationList: this.props.locationList,
          locations: this.props.locations, slots: this.props.slots, day: this.props.day }),
        scheduledSessions
      )
    );
  }

});

},{"./ScheduleGrid.jsx":26,"./ScheduleScheduledSession.jsx":27}],26:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",


  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    var vertLines = [];
    for (var i = this.props.leftMargin; i < this.props.width; i = i + 100) {
      vertLines.push(React.createElement("line", { x1: i, y1: "0", x2: i, y2: this.props.height, className: "gridline" }));
    }
    var horLabels = [];
    for (var i = 0; i < this.props.locations.length; i++) {
      horLabels.push(React.createElement(
        "text",
        { x: 6 + i * 100 + this.props.leftMargin, y: "20", className: "gridLabel" },
        this.props.locations[i].Name
      ));
    }
    var horLines = [];
    for (var i = 0; i < this.props.height; i = i + 60) {
      horLines.push(React.createElement("line", { x1: this.props.leftMargin, y1: i, x2: this.props.width + this.props.leftMargin, y2: i, className: "gridline" }));
    }
    var vertLabels = [];
    for (var i = 60; i < this.props.height; i = i + 60) {
      vertLabels.push(React.createElement(
        "text",
        { x: "6", y: i + 12, className: "gridLabel" },
        minutesToTime(i + this.props.start)
      ));
      horLines.push(React.createElement("line", { x1: "0", y1: i, x2: this.props.width, y2: i, className: "gridline" }));
    }
    var slotBands = [];
    for (var i = 0; i < this.props.slots.length; i++) {
      var slot = this.props.slots[i];
      if (slot.SlotType == 1) {
        slotBands.push(React.createElement(
          "foreignObject",
          { x: this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: this.props.width, height: slot.DurationMins },
          React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
              "div",
              { className: "panel-body embedded" },
              slot.Title
            )
          )
        ));
      } else if (slot.SlotType == 2) {
        slotBands.push(React.createElement(
          "foreignObject",
          { x: this.props.locationList[slot.LocationId] * 100 + this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: "100", height: slot.DurationMins },
          React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
              "div",
              { className: "panel-body embedded" },
              slot.Title
            )
          )
        ));
      }
    }
    return React.createElement(
      "g",
      null,
      vertLines,
      horLines,
      horLabels,
      vertLabels,
      slotBands
    );
  },

  componentDidMount: function componentDidMount() {}

});

},{}],27:[function(require,module,exports){
'use strict';

module.exports = React.createClass({
  displayName: 'exports',


  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    var speakers = this.props.session.Speakers.map(function (item) {
      return React.createElement(
        'span',
        { className: 'speaker' },
        React.createElement(
          'a',
          { href: window.speakerDetailUrl.replace('-1', item.Key) },
          item.Value
        )
      );
    });
    var speakerList = '<br/>';
    this.props.session.Speakers.forEach(function (el) {
      speakerList += '<span class="speaker">' + el.Value + '</span>';
    });
    var divStyle = {
      backgroundColor: this.props.session.BackgroundColor
    };
    return React.createElement(
      'div',
      { className: 'panel panel-default session scheduled embedded', 'data-slotid': this.props.session.SlotId,
        'data-locationid': this.props.session.LocationId, 'data-plenary': this.props.session.IsPlenary,
        ref: 'Session', 'data-sessionid': this.props.session.SessionId, 'data-day': this.props.session.DayNr,
        'data-toggle': 'popover', title: this.props.session.Title,
        'data-content': this.props.session.Description + speakerList, style: divStyle },
      React.createElement(
        'div',
        { className: 'panel-body' },
        React.createElement(
          'div',
          { className: 'speakers' },
          speakers
        ),
        React.createElement(
          'a',
          { href: window.sessionDetailUrl.replace('-1', this.props.session.SessionId.toString()) },
          this.props.session.Title
        )
      )
    );
  }

});

},{}],28:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var SchedulerDay = require('./SchedulerDay.jsx'),
    SchedulerUnscheduledSession = require('./SchedulerUnscheduledSession.jsx');

module.exports = React.createClass({
  displayName: 'exports',


  hasReset: true,

  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    var locationList = {};
    for (var i = 0; i < this.props.locations.length; i++) {
      locationList[this.props.locations[i].LocationId] = i;
    }
    return {
      sessionList: this.props.sessions,
      locationList: locationList,
      selectedTab: 1
    };
  },
  render: function render() {
    var _this = this;

    var unscheduledSessions = this.state.sessionList.map(function (item) {
      if (item.SlotId == 0) {
        return React.createElement(SchedulerUnscheduledSession, _extends({}, _this.props, { session: item, key: item.SessionId }));
      } else {
        return null;
      }
    });
    var scheduleTabs = [];
    var scheduleDays = [];
    for (var i = 1; i <= this.props.nrDays; i++) {
      var daySlots = [];
      for (var j = 0; j < this.props.slots.length; j++) {
        var slot = this.props.slots[j];
        if (slot.DayNr == undefined | slot.DayNr == i) {
          daySlots.push(slot);
        }
      }
      var tabClass = i == this.state.selectedTab ? "active" : "";
      var date = new Date(this.props.conference.StartDate);
      date = date.addDays(i - 1);
      var dateString = moment(date).format('dddd MMM Do');
      scheduleTabs.push(React.createElement(
        'li',
        { role: 'presentation', className: tabClass },
        React.createElement(
          'a',
          { href: '#',
            onClick: this.changeDay.bind(null, i) },
          dateString
        )
      ));
      scheduleDays.push(React.createElement(SchedulerDay, { conference: this.props.conference, day: i, slots: daySlots,
        start: Math.floor(daySlots[0].StartMinutes / 60) * 60 - 60,
        finish: 120 + Math.floor(daySlots[daySlots.length - 1].StartMinutes / 60) * 60,
        locationList: this.state.locationList,
        leftMargin: 50,
        sessionList: this.state.sessionList,
        locations: this.props.locations,
        sessionPlace: this.sessionPlace,
        selectedTab: this.state.selectedTab }));
    }
    return React.createElement(
      'div',
      { className: 'row Scheduler' },
      React.createElement(
        'div',
        { className: 'col-xs-12 col-md-2 unscheduled canDrop', ref: 'unscheduledColumn' },
        unscheduledSessions
      ),
      React.createElement(
        'div',
        { className: 'col-xs-12 col-md-10', ref: 'schedulerColumn' },
        React.createElement(
          'ul',
          { className: 'nav nav-tabs', role: 'tablist', id: 'scheduleTabs' },
          scheduleTabs
        ),
        React.createElement(
          'div',
          { className: 'tab-content' },
          scheduleDays
        )
      )
    );
  },
  componentDidMount: function componentDidMount() {
    var _this2 = this;

    $(document).ready(function () {
      var that = _this2;
      interact('.session').draggable({
        inertia: false,
        restrict: {
          endOnly: true
        },
        autoScroll: true,
        onend: function onend(event) {}
      }).on('dragmove', function (event) {
        moveObject(event.target, event.dx, event.dy);
      });
      interact('.canDrop').dropzone({
        accept: '.session',
        overlap: 0.5,
        ondropactivate: function ondropactivate(event) {
          that.hasReset = false;
          $(event.relatedTarget).width(100);
        },
        ondragenter: function ondragenter(event) {
          var dropzoneElement = event.target;
          dropzoneElement.classList.add('drop-target');
        },
        ondragleave: function ondragleave(event) {
          event.target.classList.remove('drop-target');
        },
        ondrop: function ondrop(event) {
          that.hasReset = true;
          if (event.target === that.refs.unscheduledColumn.getDOMNode()) {
            that.tryRemoveSession(event.relatedTarget);
          } else {
            that.tryMoveSession(event.relatedTarget, event.target);
          }
        },
        ondropdeactivate: function ondropdeactivate(event) {
          if (!that.hasReset) {
            that.sessionPlace(event.relatedTarget);
            that.hasReset = true;
          }
          event.target.classList.remove('drop-target');
        }
      });
      $(_this2.refs.unscheduledColumn.getDOMNode()).height(_this2.refs.schedulerColumn.getDOMNode().getBoundingClientRect().height);
    });
  },
  changeDay: function changeDay(day, e) {
    e.preventDefault();
    console.log(day);
    this.setState({
      selectedTab: day
    });
  },
  sessionPlace: function sessionPlace(session) {
    var jqSession = $(session);
    var sessionBox = session.getBoundingClientRect();
    var key = 'slot' + session.getAttribute('data-day') + 'x' + session.getAttribute('data-slotid');
    if (session.getAttribute('data-plenary') != 'true') {
      key += 'x' + session.getAttribute('data-locationid');
    }
    var slot = document.getElementById(key);
    if (slot != null) {
      var jqSlot = $(slot);
      var slotBox = slot.getBoundingClientRect();
      jqSession.width(slotBox.width - 12);
      jqSession.height(slotBox.height - 12);
      moveObject(session, slotBox.left - sessionBox.left + 4, slotBox.top - sessionBox.top + 4);
      session.setAttribute('data-orig-x', slotBox.left - sessionBox.left + 4);
      session.setAttribute('data-orig-y', slotBox.top - sessionBox.top + 4);
      session.setAttribute('data-slotkey', slot.getAttribute('data-reactid'));
      slot.classList.remove('canDrop');
    } else {
      session.setAttribute('data-orig-x', '');
      session.setAttribute('data-orig-y', '');
      session.setAttribute('data-slotkey', '');
      session.style.webkitTransform = session.style.transform = '';
      session.setAttribute('data-x', '');
      session.setAttribute('data-y', '');
    }
  },
  tryRemoveSession: function tryRemoveSession(session) {
    var _this3 = this;

    var sessionId = session.getAttribute('data-sessionid');
    this.service.tryRemoveSession(this.props.conference.ConferenceId, sessionId, function (data) {
      _this3.hasReset = true;
      _this3.setState({
        sessionList: data
      });
    }, function (data) {
      alert(data);
      $(session).css('width', 'auto');
      _this3.sessionPlace(session);
    });
    if (session.getAttribute('data-slotkey') != '') {
      $('[data-reactid="' + session.getAttribute('data-slotkey') + '"]').attr('class', 'sessionSlot canDrop');
    }
  },
  tryMoveSession: function tryMoveSession(session, slot) {
    var _this4 = this;

    var jqSession = $(session);
    var jqSlot = $(slot);
    var sessionId = jqSession.data('sessionid');
    var isPlenary = jqSession.data('plenary');
    var slotId = jqSlot.data('slotid');
    var locationId = jqSlot.data('locationid');
    var day = jqSlot.data('day');
    this.service.tryMoveSession(this.props.conference.ConferenceId, sessionId, day, slotId, locationId, false, function (data) {
      _this4.hasReset = true;
      _this4.setState({
        sessionList: data
      });
    }, function (data) {
      alert(data);
      $(session).css('width', 'auto');
      _this4.sessionPlace(session);
    });
    if (jqSession.data('slotkey') != '') {
      $('[data-reactid="' + jqSession.data('slotkey') + '"]').attr('class', 'sessionSlot canDrop');
    }
  }
});

},{"./SchedulerDay.jsx":29,"./SchedulerUnscheduledSession.jsx":32}],29:[function(require,module,exports){
'use strict';

var SchedulerGrid = require('./SchedulerGrid.jsx'),
    SchedulerScheduledSession = require('./SchedulerScheduledSession.jsx');

module.exports = React.createClass({
  displayName: 'exports',


  propTypes: {
    day: React.PropTypes.number,
    start: React.PropTypes.number,
    finish: React.PropTypes.number,
    leftMargin: React.PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    var height = this.props.finish - this.props.start;
    var width = this.props.locations.length * 100;
    var viewBox = "0 0 " + (width + this.props.leftMargin).toString() + " " + height;
    var scheduledSessions = [];
    for (var i = 0; i < this.props.sessionList.length; i++) {
      var session = this.props.sessionList[i];
      if (session.DayNr == this.props.day & session.SlotId > 0) {
        scheduledSessions.push(React.createElement(SchedulerScheduledSession, { session: session, sessionPlace: this.props.sessionPlace }));
      }
    }
    var panelClass = this.props.day == this.props.selectedTab ? "tab-pane active schedulePane" : "tab-pane schedulePane";
    return React.createElement(
      'div',
      { className: panelClass },
      React.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg',
          className: 'schedulerDay',
          viewBox: viewBox },
        React.createElement(
          'pattern',
          { id: 'Pattern', x: '10', y: '10', width: '8', height: '8', patternUnits: 'userSpaceOnUse' },
          React.createElement('path', { d: 'M0 0L8 8ZM8 0L0 8Z', className: 'hashLines' })
        ),
        React.createElement('rect', { x: '0', y: '0', height: height, width: width + this.props.leftMargin, className: 'dayBackground' }),
        React.createElement(SchedulerGrid, { width: width, height: height, leftMargin: this.props.leftMargin,
          start: this.props.start, ref: 'Grid', locationList: this.props.locationList,
          locations: this.props.locations, slots: this.props.slots, day: this.props.day })
      ),
      scheduledSessions
    );
  }

});

},{"./SchedulerGrid.jsx":30,"./SchedulerScheduledSession.jsx":31}],30:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",


  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    var vertLines = [];
    for (var i = this.props.leftMargin; i < this.props.width; i = i + 100) {
      vertLines.push(React.createElement("line", { x1: i, y1: "0", x2: i, y2: this.props.height, className: "gridline" }));
    }
    var horLabels = [];
    for (var i = 0; i < this.props.locations.length; i++) {
      horLabels.push(React.createElement(
        "text",
        { x: 6 + i * 100 + this.props.leftMargin, y: "20", className: "gridLabel" },
        this.props.locations[i].Name
      ));
    }
    var horLines = [];
    for (var i = 0; i < this.props.height; i = i + 60) {
      horLines.push(React.createElement("line", { x1: this.props.leftMargin, y1: i, x2: this.props.width + this.props.leftMargin, y2: i, className: "gridline" }));
    }
    var vertLabels = [];
    for (var i = 60; i < this.props.height; i = i + 60) {
      vertLabels.push(React.createElement(
        "text",
        { x: "6", y: i + 12, className: "gridLabel" },
        minutesToTime(i + this.props.start)
      ));
      horLines.push(React.createElement("line", { x1: "0", y1: i, x2: this.props.width, y2: i, className: "gridline" }));
    }
    var slotBands = [];
    for (var i = 0; i < this.props.slots.length; i++) {
      var slot = this.props.slots[i];
      if (slot.SlotType == 0) {
        var refId = 'slot' + this.props.day + 'x' + slot.SlotId.toString();
        slotBands.push(React.createElement("rect", { x: this.props.leftMargin, y: slot.StartMinutes - this.props.start,
          width: this.props.width, height: slot.DurationMins, "data-type": "slot",
          id: refId, "data-slotid": slot.SlotId, "data-locationid": "-1", "data-day": this.props.day,
          fill: "url(#Pattern)", ref: refId }));
      } else if (slot.SlotType == 1) {
        slotBands.push(React.createElement(
          "foreignObject",
          { x: this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: this.props.width, height: slot.DurationMins },
          React.createElement(
            "div",
            { className: "panel panel-default closedSlot" },
            React.createElement(
              "div",
              { className: "panel-body embedded" },
              slot.Title
            )
          )
        ));
      } else if (slot.SlotType == 2) {
        slotBands.push(React.createElement(
          "foreignObject",
          { x: this.props.locationList[slot.LocationId] * 100 + this.props.leftMargin, y: slot.StartMinutes - this.props.start, width: "100", height: slot.DurationMins },
          React.createElement(
            "div",
            { className: "panel panel-default closedSlot" },
            React.createElement(
              "div",
              { className: "panel-body embedded" },
              slot.Title
            )
          )
        ));
      }
    }
    var slots = [];
    for (var i = 0; i < this.props.slots.length; i++) {
      var slot = this.props.slots[i];
      if (slot.SlotType == 0) {
        for (var j = 0; j < this.props.locations.length; j++) {
          var refId = 'slot' + this.props.day + 'x' + slot.SlotId.toString() + 'x' + this.props.locations[j].LocationId.toString();
          slots.push(React.createElement("rect", { x: j * 100 + this.props.leftMargin, y: slot.StartMinutes - this.props.start, height: slot.DurationMins, width: "100", className: "sessionSlot canDrop",
            ref: refId, "data-slotid": slot.SlotId, "data-locationid": this.props.locations[j].LocationId, id: refId,
            "data-day": this.props.day }));
        }
      }
    }
    return React.createElement(
      "g",
      null,
      vertLines,
      horLines,
      slotBands,
      horLabels,
      vertLabels,
      slots
    );
  },

  componentDidMount: function componentDidMount() {}

});

},{}],31:[function(require,module,exports){
'use strict';

module.exports = React.createClass({
  displayName: 'exports',


  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    var speakers = this.props.session.Speakers.map(function (item) {
      return React.createElement(
        'span',
        { className: 'speaker' },
        item.Value
      );
    });
    var speakerList = '<br/>';
    this.props.session.Speakers.forEach(function (el) {
      speakerList += '<span class="speaker">' + el.Value + '</span>';
    });
    var divStyle = {
      backgroundColor: this.props.session.BackgroundColor
    };
    return React.createElement(
      'div',
      { className: 'panel panel-default session scheduled', 'data-slotid': this.props.session.SlotId,
        'data-locationid': this.props.session.LocationId, 'data-plenary': this.props.session.IsPlenary,
        ref: 'Session', 'data-sessionid': this.props.session.SessionId, 'data-day': this.props.session.DayNr,
        style: divStyle },
      React.createElement(
        'div',
        { className: 'panel-body' },
        React.createElement(
          'div',
          { className: 'speakers' },
          speakers
        ),
        this.props.session.Title
      )
    );
  },

  componentDidMount: function componentDidMount() {
    $(document).ready(function () {
      this.props.sessionPlace(this.refs.Session.getDOMNode());
    }.bind(this));
  },

  componentDidUpdate: function componentDidUpdate() {
    this.props.sessionPlace(this.refs.Session.getDOMNode());
  }

});

},{}],32:[function(require,module,exports){
'use strict';

module.exports = React.createClass({
  displayName: 'exports',


  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    var speakers = this.props.session.Speakers.map(function (item) {
      return React.createElement(
        'span',
        { className: 'speaker' },
        item.Value
      );
    });
    var speakerList = '<br/>';
    this.props.session.Speakers.forEach(function (el) {
      speakerList += '<span class="speaker">' + el.Value + '</span>';
    });
    var divStyle = {
      backgroundColor: this.props.session.BackgroundColor
    };
    return React.createElement(
      'div',
      { className: 'panel panel-default session', 'data-slotkey': '', 'data-orig-x': '0', 'data-orig-y': '0',
        'data-sessionid': this.props.session.SessionId,
        'data-plenary': this.props.session.IsPlenary,
        style: divStyle },
      React.createElement(
        'div',
        { className: 'panel-body' },
        React.createElement(
          'div',
          { className: 'speakers' },
          speakers
        ),
        this.props.session.Title
      )
    );
  },

  componentDidMount: function componentDidMount() {}

});

},{}],33:[function(require,module,exports){
'use strict';

var Status = require('./Status.jsx'),
    Track = require('./Track.jsx');

module.exports = React.createClass({
  displayName: 'exports',
  render: function render() {
    var speakers = this.props.session.Speakers.map(function (item) {
      return item.Value;
    });
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        React.createElement(
          'div',
          { className: 'sessionTitle', onClick: this.toggleAbstract },
          this.props.session.Title,
          React.createElement('br', null),
          React.createElement(
            'span',
            { className: 'details' },
            speakers.join(', ')
          ),
          React.createElement('br', null)
        ),
        React.createElement('div', { className: 'details sessionAbstract',
          ref: 'abstract',
          dangerouslySetInnerHTML: this.getAbstract() })
      ),
      React.createElement(
        'td',
        { className: 'text-right' },
        this.props.session.NrVotes
      ),
      React.createElement(
        'td',
        { className: 'text-right' },
        React.createElement(Status, { options: this.props.statusOptions,
          session: this.props.session,
          key: 'status' + this.props.session.SessionId,
          changeStatus: this.props.changeStatus })
      ),
      React.createElement(
        'td',
        { className: 'text-right' },
        React.createElement(Track, { tracks: this.props.tracks,
          session: this.props.session,
          key: 'track' + this.props.session.SessionId,
          changeTrack: this.props.changeTrack })
      )
    );
  },
  toggleAbstract: function toggleAbstract() {
    $(this.refs.abstract.getDOMNode()).toggleClass('sessionAbstract');
  },
  getAbstract: function getAbstract() {
    if (this.props.session.Description == null) {
      return { __html: '' };
    }
    return { __html: this.props.session.Description.replace(/(?:\r\n|\r|\n)/g, '<br />') };
  }
});

},{"./Status.jsx":35,"./Track.jsx":36}],34:[function(require,module,exports){
"use strict";

var Session = require('./Session.jsx');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    var tracks = this.props.tracks;
    tracks.unshift({
      TrackId: -1,
      Sort: -1,
      Title: "None",
      NrSessions: 0,
      BackgroundColor: "#ffffff"
    });
    return {
      sessions: this.props.sessions,
      tracks: tracks,
      sort: "Title",
      sortOrder: "asc"
    };
  },
  sortSessions: function sortSessions(newSort) {
    var newSortOrder = newSort == this.state.sort & this.state.sortOrder == 'asc' ? 'desc' : 'asc';
    var newList = this.state.sessions;
    newList.sort(function (a, b) {
      if (a[newSort] < b[newSort]) {
        return newSortOrder == 'asc' ? -1 : 1;
      }
      if (a[newSort] > b[newSort]) {
        return newSortOrder == 'asc' ? 1 : -1;
      }
      return 0;
    });
    this.setState({
      sessions: newList,
      sort: newSort,
      sortOrder: newSortOrder
    });
  },
  render: function render() {
    var _this = this;

    var statusTotals = {};
    var trackTotals = {};
    var trackTotalsAccepted = {};
    var speakerTotals = {};
    var nrSpeakers = 0;
    var sessions = this.state.sessions.map(function (item) {
      statusTotals[item.Status] = statusTotals[item.Status] == undefined ? 1 : statusTotals[item.Status] + 1;
      var trackId = item.TrackId == null ? -1 : item.TrackId;
      trackTotals[trackId] = trackTotals[trackId] == undefined ? 1 : trackTotals[trackId] + 1;
      if (item.Status > 2) {
        trackTotalsAccepted[trackId] = trackTotalsAccepted[trackId] == undefined ? 1 : trackTotalsAccepted[trackId] + 1;
        for (var i = 0; i < item.Speakers.length; i++) {
          var sp = item.Speakers[i];
          speakerTotals[sp.Value] = speakerTotals[sp.Value] == undefined ? 1 : speakerTotals[sp.Value] + 1;
        }
      }
      return React.createElement(Session, { module: _this.props.module,
        session: item,
        statusOptions: _this.props.statusOptions,
        tracks: _this.state.tracks,
        key: item.SessionId,
        changeStatus: _this.changeSessionStatus,
        changeTrack: _this.changeSessionTrack });
    });
    var statusList = [];
    for (var i = 0; i < this.props.statusOptions.length; i++) {
      var so = this.props.statusOptions[i];
      if (statusTotals[so.Id] != undefined) {
        statusList.push(React.createElement(
          "dt",
          null,
          so.Text
        ));
        statusList.push(React.createElement(
          "dd",
          null,
          statusTotals[so.Id]
        ));
      }
    }
    var trackList = [];
    for (var i = 0; i < this.state.tracks.length; i++) {
      var tr = this.state.tracks[i];
      trackList.push(React.createElement(
        "dt",
        null,
        tr.Title
      ));
      trackList.push(React.createElement(
        "dd",
        null,
        trackTotals[tr.TrackId] == undefined ? 0 : trackTotals[tr.TrackId],
        "  (",
        trackTotalsAccepted[tr.TrackId] == undefined ? 0 : trackTotalsAccepted[tr.TrackId],
        ")"
      ));
    }
    var speakerList = [];
    for (var key in speakerTotals) {
      if (speakerTotals.hasOwnProperty(key)) {
        nrSpeakers++;
        speakerList.push(React.createElement(
          "dt",
          null,
          key
        ));
        speakerList.push(React.createElement(
          "dd",
          null,
          speakerTotals[key]
        ));
      }
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-4" },
          React.createElement(
            "h3",
            null,
            this.props.module.resources.Statuses
          ),
          React.createElement(
            "dl",
            { className: "dl-horizontal" },
            statusList
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-4" },
          React.createElement(
            "h3",
            null,
            this.props.module.resources.Tracks
          ),
          React.createElement(
            "dl",
            { className: "dl-horizontal" },
            trackList
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-4" },
          React.createElement(
            "h3",
            null,
            this.props.module.resources.Speakers,
            " (",
            nrSpeakers,
            ")"
          ),
          React.createElement(
            "dl",
            { className: "dl-horizontal" },
            speakerList
          )
        )
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-xs-12" },
          React.createElement(
            "table",
            { className: "table" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  { className: "sortable", onClick: this.sortSessions.bind(null, 'Title') },
                  this.props.module.resources.Session
                ),
                React.createElement(
                  "th",
                  { className: "text-right sortable", onClick: this.sortSessions.bind(null, 'NrVotes') },
                  this.props.module.resources.Votes
                ),
                React.createElement(
                  "th",
                  { className: "text-right sortable", onClick: this.sortSessions.bind(null, 'Status') },
                  this.props.module.resources.Status
                ),
                React.createElement(
                  "th",
                  { className: "text-right sortable", onClick: this.sortSessions.bind(null, 'TrackId') },
                  this.props.module.resources.Track
                )
              )
            ),
            React.createElement(
              "tbody",
              null,
              sessions
            )
          )
        )
      )
    );
  },
  changeSessionStatus: function changeSessionStatus(session, newStatus, e) {
    var _this2 = this;

    e.preventDefault();
    if (newStatus.Confirm != undefined) {
      if (!confirm(newStatus.Confirm)) {
        return;
      }
    }
    this.props.module.service.changeSessionStatus(this.props.conferenceId, session.SessionId, newStatus.Id, function (data) {
      var newList = [];
      for (var i = 0; i < _this2.state.sessions.length; i++) {
        var s = _this2.state.sessions[i];
        if (s.SessionId == session.SessionId) {
          s = data;
        }
        newList.push(s);
      }
      _this2.setState({
        sessions: newList
      });
    });
  },
  changeSessionTrack: function changeSessionTrack(session, newTrack, e) {
    var _this3 = this;

    e.preventDefault();
    this.props.module.service.changeSessionTrack(this.props.conferenceId, session.SessionId, newTrack.TrackId, function (data) {
      var newList = [];
      for (var i = 0; i < _this3.state.sessions.length; i++) {
        var s = _this3.state.sessions[i];
        if (s.SessionId == session.SessionId) {
          s = data;
        }
        newList.push(s);
      }
      _this3.setState({
        sessions: newList
      });
    });
  }
});

},{"./Session.jsx":33}],35:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    var btnClass = "";
    var btnText = "";
    var options = [];
    for (var i = 0; i < this.props.options.length; i++) {
      var opt = this.props.options[i];
      if (opt.Id == this.props.session.Status) {
        btnClass = opt.ClassName;
        btnText = opt.Text;
      } else {
        options.push(React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#", "data-id": opt.Id,
              "data-confirm": opt.Confirm,
              onClick: this.props.changeStatus.bind(null, this.props.session, opt) },
            opt.Text
          )
        ));
      }
    }
    return React.createElement(
      "div",
      { className: "btn-group" },
      React.createElement(
        "button",
        { type: "button", className: "btn btn-sm btn-" + btnClass },
        btnText
      ),
      React.createElement(
        "button",
        { type: "button", className: "btn btn-sm btn-" + btnClass + " dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
        " ",
        React.createElement("span", { className: "caret" }),
        React.createElement(
          "span",
          { className: "sr-only" },
          "Toggle Dropdown"
        )
      ),
      React.createElement(
        "ul",
        { className: "dropdown-menu" },
        options
      )
    );
  }
});

},{}],36:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    var btnClass = "";
    var btnText = "";
    var options = [];
    var btnStyle = {};
    var trackId = this.props.session.TrackId == null ? -1 : this.props.session.TrackId;
    for (var i = 0; i < this.props.tracks.length; i++) {
      var opt = this.props.tracks[i];
      if (opt.TrackId == trackId) {
        btnClass = "default";
        btnText = opt.Title;
        btnStyle = {
          backgroundColor: opt.BackgroundColor
        };
      } else {
        options.push(React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#", "data-id": opt.TrackId,
              onClick: this.props.changeTrack.bind(null, this.props.session, opt) },
            opt.Title
          )
        ));
      }
    }
    return React.createElement(
      "div",
      { className: "btn-group" },
      React.createElement(
        "button",
        { type: "button", className: "btn btn-sm btn-" + btnClass, style: btnStyle },
        btnText
      ),
      React.createElement(
        "button",
        { type: "button", className: "btn btn-sm btn-" + btnClass + " dropdown-toggle", style: btnStyle, "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
        " ",
        React.createElement("span", { className: "caret" }),
        React.createElement(
          "span",
          { className: "sr-only" },
          "Toggle Dropdown"
        )
      ),
      React.createElement(
        "ul",
        { className: "dropdown-menu" },
        options
      )
    );
  }
});

},{}],37:[function(require,module,exports){
'use strict';

module.exports = React.createClass({
  displayName: 'exports',


  resources: null,
  service: null,

  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {};
  },

  render: function render() {
    var voteCol = null;
    if (this.props.allowVote) {
      var btnClasses = 'btn';
      if (this.props.item.Voted == 0) {
        btnClasses += ' btn-default';
      } else {
        btnClasses += ' btn-primary';
      }
      voteCol = React.createElement(
        'td',
        { className: 'btncol' },
        React.createElement(
          'a',
          { href: '#', className: btnClasses, onClick: this.props.onVote.bind(null, this.props.item),
            title: this.resources.Vote },
          React.createElement('span', { className: 'glyphicon glyphicon-thumbs-up' })
        )
      );
    }
    var speakers = this.props.item.Speakers.map(function (item) {
      return React.createElement(
        'span',
        { className: 'detailItem' },
        item.Value
      );
    });
    var tags = this.props.item.Tags.map(function (item) {
      return React.createElement(
        'span',
        { className: 'detailItem' },
        item.Value
      );
    });
    var rowStyle = {};
    if (this.props.item.BackgroundColor != '') {
      rowStyle = {
        backgroundColor: this.props.item.BackgroundColor
      };
    }
    var track = this.props.item.TrackTitle == undefined ? null : React.createElement('span', { className: 'glyphicon glyphicon-resize-vertical', title: this.resources.Track });
    var tagsIcon = tags.length == 0 ? null : React.createElement('span', { className: 'glyphicon glyphicon-tags', title: this.resources.Tags });
    return React.createElement(
      'tr',
      { style: rowStyle },
      React.createElement(
        'td',
        null,
        React.createElement(
          'p',
          null,
          React.createElement(
            'a',
            { href: window.sessionDetailUrl.replace('-1', this.props.item.SessionId.toString()) },
            this.props.item.Title
          )
        ),
        React.createElement(
          'p',
          { className: 'itemDetails' },
          React.createElement('span', { className: 'glyphicon glyphicon-user', title: this.resources.Speakers }),
          speakers
        ),
        React.createElement(
          'p',
          { className: 'itemDetails' },
          track,
          this.props.item.TrackTitle,
          React.createElement('span', { className: 'glyphicon glyphicon-paperclip', title: this.resources.Resources }),
          this.props.item.NrResources,
          tagsIcon,
          tags
        )
      ),
      React.createElement(
        'td',
        { className: 'nrcol' },
        this.props.item.NrVotes
      ),
      voteCol
    );
  },

  componentDidMount: function componentDidMount() {}

});

},{}],38:[function(require,module,exports){
"use strict";

var SessionVote = require('./SessionVote.jsx');

module.exports = React.createClass({
  displayName: "exports",


  resources: null,
  service: null,

  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    this.props.voteList.sort(this.votesSort);
    return {
      votes: this.props.voteList
    };
  },

  render: function render() {
    var votes = this.state.votes.map(function (item) {
      return React.createElement(SessionVote, { moduleId: this.props.moduleId, item: item, key: item.SessionId, allowVote: this.props.allowVote, onVote: this.onVote });
    }.bind(this));
    var voteCol = null;
    if (this.props.allowVote) {
      voteCol = React.createElement("th", { className: "btncol" });
    }
    return React.createElement(
      "table",
      { className: "table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            this.resources.Session
          ),
          React.createElement(
            "th",
            { className: "nrcol" },
            this.resources.Votes
          ),
          voteCol
        )
      ),
      React.createElement(
        "tbody",
        null,
        votes
      )
    );
  },

  componentDidMount: function componentDidMount() {},

  onVote: function onVote(sessionVote, e) {
    e.preventDefault();
    if (sessionVote.Voted == 0) {
      this.service.sessionVote(this.props.conferenceId, sessionVote.SessionId, 1, function () {
        sessionVote.Voted = 1;
        sessionVote.NrVotes += 1;
        this.voteChanged(sessionVote);
      }.bind(this));
    } else {
      this.service.sessionVote(this.props.conferenceId, sessionVote.SessionId, 0, function () {
        sessionVote.Voted = 0;
        sessionVote.NrVotes -= 1;
        this.voteChanged(sessionVote);
      }.bind(this));
    }
  },

  voteChanged: function voteChanged(vote) {
    var newList = [];
    for (var i = 0; i < this.state.votes.length; i++) {
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

  votesSort: function votesSort(a, b) {
    if (b.NrVotes - a.NrVotes == 0) {
      if (a.Title < b.Title) {
        return -1;
      } else if (a.Title > b.Title) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return b.NrVotes - a.NrVotes;
    }
  }

});

},{"./SessionVote.jsx":37}],39:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",


  resources: null,
  service: null,

  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {};
  },

  render: function render() {
    return React.createElement(
      "tr",
      { className: "sortable", "data-id": this.props.speaker.SpeakerId },
      React.createElement(
        "td",
        null,
        this.props.speaker.DisplayName
      ),
      React.createElement(
        "td",
        { className: "btncol" },
        React.createElement(
          "a",
          { href: "#", className: "btn btn-default", onClick: this.props.onDelete.bind(null, this.props.speaker),
            title: this.resources.Delete },
          React.createElement("span", { className: "glyphicon glyphicon-remove" })
        )
      )
    );
  },

  componentDidMount: function componentDidMount() {}

});

},{}],40:[function(require,module,exports){
"use strict";

var Speaker = require('./Speaker.jsx');

module.exports = React.createClass({
  displayName: "exports",


  resources: null,
  service: null,
  security: null,

  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    this.security = ConnectConference.modules[this.props.moduleId].security;
    return {
      speakers: this.props.speakers
    };
  },

  render: function render() {
    var speakers = this.state.speakers.map(function (item) {
      return React.createElement(Speaker, { moduleId: this.props.moduleId, speaker: item, key: item.SpeakerId, onDelete: this.onDelete });
    }.bind(this));
    var addRow = null;
    if (this.security.CanManage) {
      addRow = React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { className: "dnnFormItem" },
          React.createElement("input", { type: "text", className: "fullwidth", ref: "newSpeaker" }),
          React.createElement("input", { type: "hidden", ref: "newSpeakerId" })
        ),
        React.createElement(
          "td",
          { className: "btncol" },
          React.createElement(
            "a",
            { href: "#", className: "btn btn-default", onClick: this.onSpeakerAdd,
              title: this.resources.Add },
            React.createElement("span", { className: "glyphicon glyphicon-plus" })
          )
        )
      );
    }
    return React.createElement(
      "table",
      { className: "table", id: "speakersTable" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            this.resources.Speakers
          ),
          React.createElement("th", null)
        )
      ),
      React.createElement(
        "tbody",
        { ref: "speakersTable" },
        speakers
      ),
      React.createElement(
        "tbody",
        null,
        addRow
      )
    );
  },

  componentDidMount: function componentDidMount() {
    $(document).ready(function () {
      if (this.security.CanManage) {
        $(this.refs.newSpeaker.getDOMNode()).autocomplete({
          minLength: 1,
          source: function (request, response) {
            this.refs.newSpeakerId.getDOMNode().value = '';
            this.service.searchUsers(this.props.conferenceId, request.term, function (data) {
              response(data.map(function (item) {
                return {
                  label: item.DisplayName,
                  value: item.UserId
                };
              }));
            });
          }.bind(this),
          select: function (e, ui) {
            e.preventDefault();
            this.refs.newSpeakerId.getDOMNode().value = ui.item.value;
            this.refs.newSpeaker.getDOMNode().value = ui.item.label;
          }.bind(this)
        });
      }
      $(this.refs.speakersTable.getDOMNode()).sortable({
        update: function (event, ui) {
          this.service.orderSessionSpeakers(this.props.conferenceId, this.props.sessionId, getTableOrder('speakersTable'));
        }.bind(this)
      });
    }.bind(this));
  },

  onDelete: function onDelete(speaker, e) {
    e.preventDefault();
    if (confirm(this.resources.SpeakerDeleteConfirm)) {
      this.service.deleteSessionSpeaker(this.props.conferenceId, this.props.sessionId, speaker.SpeakerId, function (data) {
        var newList = [];
        for (var i = 0; i < this.state.speakers.length; i++) {
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

  onSpeakerAdd: function onSpeakerAdd(e) {
    e.preventDefault();
    var newUserId = this.refs.newSpeakerId.getDOMNode().value;
    if (newUserId != '') {
      for (var i = 0; i < this.state.speakers.length; i++) {
        if (this.state.speakers[i].UserId == newUserId) {
          return;
        }
      }
      this.service.addSessionSpeaker(this.props.conferenceId, this.props.sessionId, this.refs.newSpeakerId.getDOMNode().value, function (data) {
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

},{"./Speaker.jsx":39}],41:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
    displayName: "exports",
    getInitialState: function getInitialState() {
        return {};
    },
    clicked: function clicked() {
        if (this.props.SortField == this.props.ColumnName) {
            this.props.SortClick(this.props.ColumnName, !this.props.SortReverse);
        } else {
            this.props.SortClick(this.props.ColumnName, false);
        }
    },
    render: function render() {
        var style = {
            cursor: "pointer"
        };
        return React.createElement(
            "th",
            { onClick: this.clicked, style: style },
            this.props.Heading
        );
    }
});

},{}],42:[function(require,module,exports){
'use strict';

module.exports = React.createClass({
  displayName: 'exports',


  resources: null,
  service: null,

  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {};
  },

  render: function render() {
    var voteCol = null;
    if (this.props.allowVote) {
      var btnClasses = 'btn';
      if (this.props.item.Voted == 0) {
        btnClasses += ' btn-default';
      } else {
        btnClasses += ' btn-primary';
      }
      voteCol = React.createElement(
        'td',
        { className: 'btncol' },
        React.createElement(
          'a',
          { href: '#', className: btnClasses, onClick: this.props.onVote.bind(null, this.props.item),
            title: this.resources.Vote },
          React.createElement('span', { className: 'glyphicon glyphicon-thumbs-up' })
        )
      );
    }
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        this.props.item.TagName
      ),
      React.createElement(
        'td',
        { className: 'nrcol' },
        this.props.allowVote ? this.props.item.NrSubmittedSessions : this.props.item.NrAcceptedSessions
      ),
      React.createElement(
        'td',
        { className: 'nrcol' },
        this.props.item.NrVotes
      ),
      voteCol
    );
  },

  componentDidMount: function componentDidMount() {}

});

},{}],43:[function(require,module,exports){
"use strict";

var TagVote = require("./TagVote.jsx");

module.exports = React.createClass({
  displayName: "exports",

  resources: null,
  service: null,

  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    this.props.voteList.sort(this.votesSort);
    return {
      votes: this.props.voteList
    };
  },

  render: function render() {
    var votes = this.state.votes.map(function (item) {
      return React.createElement(TagVote, {
        moduleId: this.props.moduleId,
        item: item,
        key: item.TagId,
        allowVote: this.props.allowVote,
        onVote: this.onVote
      });
    }.bind(this));
    var voteCol = null;
    if (this.props.allowVote) {
      voteCol = React.createElement("th", { className: "btncol" });
    }
    var addRow = null;
    if (this.props.allowAdd) {
      addRow = React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { className: "dnnFormItem" },
          React.createElement("input", { type: "text", className: "fullwidth", ref: "newTagName" })
        ),
        React.createElement("td", null),
        React.createElement("td", null),
        React.createElement(
          "td",
          { className: "btncol" },
          React.createElement(
            "a",
            {
              href: "#",
              className: "btn btn-default",
              onClick: this.onAddTag,
              title: this.resources.Add
            },
            React.createElement("span", { className: "glyphicon glyphicon-plus" })
          )
        )
      );
    }
    return React.createElement(
      "table",
      { className: "table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            this.resources.Theme
          ),
          React.createElement(
            "th",
            { className: "nrcol" },
            this.resources.Sessions
          ),
          React.createElement(
            "th",
            { className: "nrcol" },
            this.resources.Votes
          ),
          voteCol
        )
      ),
      React.createElement(
        "tbody",
        null,
        votes,
        addRow
      )
    );
  },

  componentDidMount: function componentDidMount() {},

  onVote: function onVote(tagVote, e) {
    e.preventDefault();
    if (tagVote.Voted == 0) {
      this.service.tagVote(this.props.conferenceId, tagVote.TagId, 1, function () {
        tagVote.Voted = 1;
        tagVote.NrVotes += 1;
        this.voteChanged(tagVote);
      }.bind(this));
    } else {
      this.service.tagVote(this.props.conferenceId, tagVote.TagId, 0, function () {
        tagVote.Voted = 0;
        tagVote.NrVotes -= 1;
        this.voteChanged(tagVote);
      }.bind(this));
    }
  },

  voteChanged: function voteChanged(vote) {
    var newList = [];
    for (var i = 0; i < this.state.votes.length; i++) {
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

  votesSort: function votesSort(a, b) {
    if (b.NrVotes - a.NrVotes == 0) {
      if (a.TagName < b.TagName) {
        return -1;
      } else if (a.TagName > b.TagName) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return b.NrVotes - a.NrVotes;
    }
  },

  onAddTag: function onAddTag(e) {
    e.preventDefault();
    this.service.addTag(this.props.conferenceId, this.refs.newTagName.getDOMNode().value, function (data) {
      this.refs.newTagName.getDOMNode().value = "";
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

},{"./TagVote.jsx":42}],44:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",

  render: function render() {
    return React.createElement(
      "span",
      { className: "tag label label-info" },
      this.props.tag.TagName,
      React.createElement("span", { "data-role": "remove", onClick: this.props.onRemoveTag.bind(null, this.props.tag.TagId) })
    );
  }
});

},{}],45:[function(require,module,exports){
"use strict";

var Tag = require('./Tag.jsx');

module.exports = React.createClass({
  displayName: "exports",


  resources: null,
  service: null,

  getInitialState: function getInitialState() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
      tags: this.props.tags,
      newTagId: -1
    };
  },

  render: function render() {
    var tagList = this.state.tags.map(function (item) {
      return React.createElement(Tag, { tag: item, key: item.TagId, onRemoveTag: this.onRemoveTag });
    }.bind(this));
    return React.createElement(
      "div",
      { className: "bootstrap-tagsinput" },
      tagList,
      React.createElement("input", { type: "text", placeholder: this.props.placeholder, className: "taginput", ref: "newTag",
        onKeyPress: this.onNewTagKeyPress }),
      React.createElement("input", { type: "hidden", name: this.props.name, value: JSON.stringify(this.state.tags) })
    );
  },

  componentDidMount: function componentDidMount() {
    $(document).ready(function () {
      $(this.refs.newTag.getDOMNode()).autocomplete({
        minLength: 1,
        source: function (request, response) {
          this.service.searchTags(this.props.conferenceId, request.term, function (data) {
            response(data);
          });
        }.bind(this),
        select: function (e, ui) {
          e.preventDefault();
          this.addTag(ui.item.label, ui.item.value);
          this.refs.newTag.getDOMNode().value = '';
        }.bind(this)
      });
    }.bind(this));
  },

  onRemoveTag: function onRemoveTag(tagId, e) {
    e.preventDefault();
    var newTagList = [];
    for (var i = 0; i < this.state.tags.length; i++) {
      if (this.state.tags[i].TagId != tagId) {
        newTagList.push(this.state.tags[i]);
      }
    }
    this.setState({
      tags: newTagList
    });
  },

  onNewTagKeyPress: function onNewTagKeyPress(e) {
    switch (e.charCode) {
      case 13:
      case 44:
        e.preventDefault();
        var newTag = this.refs.newTag.getDOMNode().value;
        this.addTag(newTag);
        this.refs.newTag.getDOMNode().value = '';
    }
  },

  addTag: function addTag(tagName, tagId) {
    var newTagList = this.state.tags;
    var shouldAdd = true;
    for (var i = 0; i < this.state.tags.length; i++) {
      if (this.state.tags[i].TagName == tagName) {
        shouldAdd = false;
      }
    }
    if (shouldAdd) {
      var newTag = {
        TagId: tagId == undefined ? this.state.newTagId : tagId,
        TagName: tagName
      };
      newTagList.push(newTag);
    }
    this.setState({
      tags: newTagList,
      newTagId: tagId == undefined ? this.state.newTagId - 1 : this.state.newTagId
    });
  }

});

},{"./Tag.jsx":44}],46:[function(require,module,exports){
'use strict';

var TimesheetEditorSlot = require('./TimesheetEditorSlot.jsx');

module.exports = React.createClass({
  displayName: 'exports',


  slotBeingEdited: null,
  resources: null,

  getInitialState: function getInitialState() {
    var crtSlots = this.props.slots;
    crtSlots.sort(function (a, b) {
      return parseFloat(a.StartMinutes) - parseFloat(b.StartMinutes);
    });
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    return {
      moduleId: this.props.moduleId,
      slots: crtSlots,
      nrDays: this.props.nrDays,
      service: ConnectConference.modules[this.props.moduleId].service
    };
  },

  componentDidMount: function componentDidMount() {
    this.setupEditor();
  },

  render: function render() {
    var hours = [];
    for (var i = 0; i < 24; i++) {
      hours.push(React.createElement(
        'section',
        null,
        i,
        ':00'
      ));
    }
    var slots = [];
    for (var i = 0; i < this.state.slots.length; i++) {
      slots.push(React.createElement(TimesheetEditorSlot, { moduleId: this.state.moduleId,
        key: this.state.slots[i].SlotId,
        slot: this.state.slots[i],
        editSlot: this.editSlot,
        onSlotUpdate: this.onSlotUpdate }));
    }
    var daySelector = [];
    for (var i = 1; i <= this.state.nrDays; i++) {
      var id = 'dnOpt' + i;
      daySelector.push(React.createElement(
        'label',
        { className: 'btn btn-primary' },
        React.createElement('input', { type: 'radio', name: 'daynr', value: i, autocomplete: 'off', id: id }),
        ' ',
        i
      ));
    }
    var locations = this.props.locations.map(function (item) {
      return React.createElement(
        'option',
        { value: item.LocationId },
        item.Name
      );
    });
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { ref: 'mainDiv', className: 'timesheet' },
        React.createElement(
          'div',
          { className: 'timesheet-grid' },
          hours
        ),
        React.createElement(
          'ul',
          { className: 'data' },
          React.createElement(
            'li',
            null,
            ' '
          ),
          slots
        )
      ),
      React.createElement(
        'div',
        { className: 'buttons-right' },
        React.createElement(
          'a',
          { href: '#', className: 'btn btn-default', onClick: this.addClick },
          this.resources.Add
        )
      ),
      React.createElement(
        'div',
        { className: 'modal fade', tabindex: '-1', role: 'dialog', ref: 'popup' },
        React.createElement(
          'div',
          { className: 'modal-dialog' },
          React.createElement(
            'div',
            { className: 'modal-content' },
            React.createElement(
              'div',
              { className: 'modal-header' },
              React.createElement(
                'button',
                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                React.createElement(
                  'span',
                  { 'aria-hidden': 'true' },
                  '×'
                )
              ),
              React.createElement(
                'h4',
                { className: 'modal-title' },
                this.resources.Slot
              )
            ),
            React.createElement(
              'div',
              { className: 'modal-body' },
              React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                  'label',
                  null,
                  this.resources.Type
                ),
                React.createElement(
                  'select',
                  { className: 'form-control', ref: 'slotType' },
                  React.createElement(
                    'option',
                    { value: '0' },
                    this.resources.Session
                  ),
                  React.createElement(
                    'option',
                    { value: '1' },
                    this.resources.General
                  ),
                  React.createElement(
                    'option',
                    { value: '2' },
                    this.resources.LocationSpecific
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                  'label',
                  null,
                  this.resources.Title
                ),
                React.createElement('input', { type: 'text', className: 'form-control', placeholder: this.resources.Title, ref: 'title' })
              ),
              React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                  'label',
                  null,
                  this.resources.Description
                ),
                React.createElement('textarea', { className: 'form-control', placeholder: this.resources.Description, ref: 'description' })
              ),
              React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                  'label',
                  null,
                  this.resources.Location
                ),
                React.createElement(
                  'select',
                  { className: 'form-control', ref: 'location' },
                  React.createElement(
                    'option',
                    { value: '-1' },
                    this.resources.All
                  ),
                  locations
                )
              ),
              React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                  'label',
                  null,
                  this.resources.Day
                ),
                React.createElement(
                  'div',
                  { ref: 'dayNrButtons' },
                  React.createElement(
                    'div',
                    { className: 'btn-group', 'data-toggle': 'buttons' },
                    React.createElement(
                      'label',
                      { className: 'btn btn-primary' },
                      React.createElement('input', { type: 'radio', name: 'daynr', autocomplete: 'off', value: '-1', id: 'dnOpt0' }),
                      ' ',
                      this.resources.All
                    ),
                    daySelector
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'modal-footer' },
              React.createElement(
                'button',
                { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                this.resources.Close
              ),
              React.createElement(
                'button',
                { type: 'button', className: 'btn btn-warning', onClick: this.cmdDelete, ref: 'cmdDelete' },
                this.resources.Delete
              ),
              React.createElement(
                'button',
                { type: 'button', className: 'btn btn-primary', onClick: this.cmdSave },
                this.resources.SaveChanges
              )
            )
          )
        )
      )
    );
  },

  setupEditor: function setupEditor() {
    var mainDiv = this.refs.mainDiv.getDOMNode();
    var childDiv = mainDiv.getElementsByTagName('ul')[0];
    $(mainDiv).css({
      'height': $(childDiv).height() + 30 + 'px'
    });
  },

  resetPopup: function resetPopup() {
    this.refs.title.getDOMNode().value = '';
    this.refs.description.getDOMNode().value = '';
    this.refs.slotType.getDOMNode().value = '0';
    this.refs.location.getDOMNode().value = '-1';
    this.setDayNr(null);
  },

  setDayNr: function setDayNr(dayNr) {
    var dnDiv = $(this.refs.dayNrButtons.getDOMNode());
    var btns = dnDiv.children().first().children();
    btns.removeClass('active');
    dayNr = dayNr ? dayNr : 0;
    btns.eq(dayNr).addClass('active');
  },

  addClick: function addClick() {
    this.slotBeingEdited = null;
    this.resetPopup();
    $(this.refs.popup.getDOMNode()).modal();
    $(this.refs.cmdDelete.getDOMNode()).hide();
    return false;
  },

  editSlot: function editSlot(slot) {
    this.slotBeingEdited = slot;
    this.resetPopup();
    this.refs.title.getDOMNode().value = slot.Title;
    this.refs.description.getDOMNode().value = slot.Description;
    this.refs.slotType.getDOMNode().value = slot.SlotType;
    this.setDayNr(slot.DayNr);
    this.state.service.getLocations(this.props.conferenceId, function (data) {
      var dd = $(this.refs.location.getDOMNode());
      dd.empty();
      dd.append($('<option/>').attr("value", -1).text(this.resources.ChooseLocation));
      $.each(data, function (i, item) {
        dd.append($('<option/>').attr("value", item.LocationId).text(item.Name));
      });
      this.refs.location.getDOMNode().value = slot.LocationId;
    }.bind(this));
    $(this.refs.popup.getDOMNode()).modal();
    $(this.refs.cmdDelete.getDOMNode()).show();
  },

  onSlotUpdate: function onSlotUpdate(slot, fail) {
    this.state.service.updateSlot(slot.ConferenceId, slot, function (data) {
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
      newSlots.sort(function (a, b) {
        return parseFloat(a.StartMinutes) - parseFloat(b.StartMinutes);
      });
      this.setState({
        slots: newSlots
      });
      this.setupEditor();
    }.bind(this), function () {
      if (fail != undefined) {
        fail();
      }
    });
  },

  cmdSave: function cmdSave(e) {
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
    var dayNr = $(this.refs.dayNrButtons.getDOMNode()).children().first().children('label.active').first().children().first().val();
    if (dayNr == -1) {
      slot.DayNr = null;
    } else {
      slot.DayNr = dayNr;
    }
    this.onSlotUpdate(slot);
  },

  cmdDelete: function cmdDelete(e) {
    if (confirm(this.resources.SlotDeleteConfirm)) {
      $(this.refs.popup.getDOMNode()).modal('hide');
      var slot = this.slotBeingEdited,
          that = this;
      this.state.service.deleteSlot(slot.ConferenceId, slot.SlotId, function () {
        var newSlots = [];
        for (var i = 0; i < that.state.slots.length; i++) {
          if (that.state.slots[i].SlotId != slot.SlotId) {
            newSlots.push(that.state.slots[i]);
          }
        }
        newSlots.sort(function (a, b) {
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

},{"./TimesheetEditorSlot.jsx":47}],47:[function(require,module,exports){
'use strict';

module.exports = React.createClass({
  displayName: 'exports',


  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
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
    return React.createElement(
      'li',
      null,
      React.createElement(
        'span',
        { className: classes,
          'data-id': this.props.slot.SlotId,
          'data-oldstart': this.props.slot.StartMinutes,
          'data-oldlength': this.props.slot.DurationMins,
          'data-start': this.props.slot.StartMinutes,
          'data-scale': '48',
          'data-length': this.props.slot.DurationMins,
          style: barStyle,
          title: this.props.slot.Title,
          onDoubleClick: this.doubleClicked,
          ref: 'timeBar' },
        React.createElement(
          'strong',
          null,
          this.props.slot.DayNr
        ),
        ' ',
        React.createElement(
          'strong',
          null,
          this.props.slot.LocationName
        ),
        ' ',
        this.props.slot.Title
      ),
      React.createElement(
        'span',
        { className: 'timesheet-time', style: txtStyle, ref: 'timeText' },
        timeString
      )
    );
  },

  componentDidMount: function componentDidMount() {
    var that = this;
    this.interactable = interact(this.refs.timeBar.getDOMNode());
    this.interactable.draggable({
      inertia: false,
      restrict: {
        restriction: "parent",
        endOnly: true
      },
      autoScroll: false,
      onmove: function onmove(event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            hour = parseFloat(target.getAttribute('data-scale')),
            start = parseInt(target.getAttribute('data-oldstart')),
            scale = hour / 12,
            roundX = Math.round(x / scale) * scale,
            newMins = start + 60 * roundX / hour,
            textSpan = target.nextElementSibling;
        target.style.webkitTransform = target.style.transform = 'translate(' + roundX + 'px, 0px)';
        target.setAttribute('data-x', x);
        target.setAttribute('data-start', newMins);
        textSpan.style.transform = 'translate(' + roundX + 'px, 0px)';
        textSpan.innerHTML = that.getTimestring(newMins, parseInt(target.getAttribute('data-length')));
      },
      onend: that.updateSlot
    }).resizable({
      preserveAspectRatio: false,
      edges: {
        left: false,
        right: true,
        bottom: false,
        top: false
      },
      onmove: function onmove(event) {
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

  componentWillUnmount: function componentWillUnmount() {
    this.interactable.unset();
    this.interactable = null;
  },

  getTimestring: function getTimestring(start, len) {
    var timeString = (start % 60).toString();
    if (timeString.length < 2) {
      timeString = '0' + timeString;
    }
    timeString = Math.floor(start / 60).toString() + ':' + timeString + ' ';
    var minsDuration = (len % 60).toString();
    if (minsDuration.length < 2) {
      minsDuration = '0' + minsDuration;
    }
    timeString += Math.floor(len / 60).toString() + ':' + minsDuration;
    return timeString;
  },

  updateSlot: function updateSlot(event) {
    var timeBar = this.refs.timeBar.getDOMNode(),
        timeText = this.refs.timeText.getDOMNode(),
        slot = this.props.slot;
    slot.DurationMins = parseInt(timeBar.getAttribute('data-length'));
    slot.NewStartMinutes = parseInt(timeBar.getAttribute('data-start'));
    this.props.onSlotUpdate(slot, function () {
      timeBar.style.webkitTransform = timeBar.style.transform = null;
      timeText.style.transform = null;
      var len = this.props.slot.DurationMins,
          lenPixels = len * 1152 / 1440;
      timeBar.style.width = lenPixels + 'px';
    }.bind(this));
    return false;
  },

  doubleClicked: function doubleClicked() {
    this.props.editSlot(this.props.slot);
  }

});

},{}]},{},[9])


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

    this.addAttendee = function(conferenceId, email, firstName, lastName, displayName, company, success, fail) {
        this.apiCall('POST', 'Attendees', 'Add', conferenceId, null, {
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            DisplayName: displayName,
            Company: company
        }, success, fail);
    }
    this.addComment = function(conferenceId, sessionId, visibility, comment, success, fail) {
        this.apiCall('POST', 'Comments', 'Add', conferenceId, null, {
            SessionId: sessionId,
            Visibility: visibility,
            Remarks: comment
        }, success, fail);
    }
    this.addOrderAudit = function(itemId, message, success, fail) {
        this.apiCall('POST', 'NBright', 'AddAudit', null, itemId, { Message: message }, success, fail);
    }
    this.addSessionSpeaker = function(conferenceId, sessionId, userId, success, fail) {
        this.apiCall('POST', 'SessionSpeakers', 'Add', conferenceId, sessionId, {
            UserId: userId
        }, success, fail);
    }
    this.addSpeaker = function(conferenceId, email, firstName, lastName, displayName, company, success, fail) {
        this.apiCall('POST', 'Speakers', 'Add', conferenceId, null, {
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            DisplayName: displayName,
            Company: company
        }, success, fail);
    }
    this.addTag = function(conferenceId, tagName, success, fail) {
        this.apiCall('POST', 'Tags', 'Add', conferenceId, null, {
            tagName: tagName
        }, success, fail);
    }
    this.addUrl = function(conferenceId, sessionId, url, success, fail) {
        this.apiCall('POST', 'SessionResources', 'Add', conferenceId, sessionId, { url: url }, success, fail);
    }
    this.attendSession = function(conferenceId, sessionId, codes, success, fail) {
        this.apiCall('POST', 'SessionAttendees', 'AttendByCode', conferenceId, null, { SessionId: sessionId, Codes: codes }, success, fail);
    }
    this.approveResource = function(conferenceId, sessionId, sessionResource, success, fail) {
        this.apiCall('POST', 'SessionResources', 'Approve', conferenceId, sessionId, { SessionResource: sessionResource }, success, fail);
    }
    this.changeAttendeeStatus = function(conferenceId, userId, newStatus, success, fail) {
        this.apiCall('POST', 'Attendees', 'ChangeStatus', conferenceId, null, {
            UserId: userId,
            Status: newStatus
        }, success, fail);
    }
    this.changeSessionStatus = function(conferenceId, sessionId, newStatus, success, fail) {
        this.apiCall('POST', 'Sessions', 'ChangeStatus', conferenceId, sessionId, { newStatus: newStatus }, success, fail);
    }
    this.changeSessionTrack = function(conferenceId, sessionId, newTrack, success, fail) {
        this.apiCall('POST', 'Sessions', 'ChangeTrack', conferenceId, sessionId, { newTrack: newTrack }, success, fail);
    }
    this.checkNewComments = function(conferenceId, sessionId, visibility, lastCheck, success, fail) {
        this.apiCall('GET', 'Comments', 'Poll', conferenceId, null, { SessionId: sessionId, Visibility: visibility, LastCheck: lastCheck.toUTCDateTimeDigits() }, success, fail);
    }
    this.deleteComment = function(conferenceId, commentId, success, fail) {
        this.apiCall('POST', 'Comments', 'Delete', conferenceId, commentId, null, success, fail);
    }
    this.deleteLocation = function(conferenceId, locationId, success, fail) {
        this.apiCall('POST', 'Locations', 'Delete', conferenceId, locationId, null, success, fail);
    }
    this.deleteResource = function(conferenceId, sessionId, sessionResource, success, fail) {
        this.apiCall('POST', 'SessionResources', 'Delete', conferenceId, sessionId, { SessionResource: sessionResource }, success, fail);
    }
    this.deleteSession = function(conferenceId, sessionId, success, fail) {
        this.apiCall('POST', 'Sessions', 'Delete', conferenceId, sessionId, null, success, fail);
    }
    this.deleteSessionSpeaker = function(conferenceId, sessionId, userId, success, fail) {
        this.apiCall('POST', 'SessionSpeakers', 'Delete', conferenceId, sessionId, {
            UserId: userId
        }, success, fail);
    }
    this.deleteSlot = function(conferenceId, slotId, success, fail) {
        this.apiCall('POST', 'Slots', 'Delete', conferenceId, slotId, null, success, fail);
    }
    this.deleteTag = function(conferenceId, tagId, success, fail) {
        this.apiCall('POST', 'Tags', 'Delete', conferenceId, tagId, null, success, fail);
    }
    this.deleteTrack = function(conferenceId, trackId, success, fail) {
        this.apiCall('POST', 'Tracks', 'Delete', conferenceId, trackId, null, success, fail);
    }
    this.editAttendee = function(conferenceId, attendee, success, fail) {
        this.apiCall('POST', 'Attendees', 'Edit', conferenceId, attendee.UserId, {
            Company: attendee.Company,
            AttCode: attendee.AttCode,
            ReceiveNotifications: attendee.ReceiveNotifications
        }, success, fail);
    }
    this.editResource = function(conferenceId, sessionId, sessionResource, success, fail) {
        this.apiCall('POST', 'SessionResources', 'Edit', conferenceId, sessionId, { SessionResource: sessionResource }, success, fail);
    }
    this.editTag = function(conferenceId, tagId, tagName, success, fail) {
        this.apiCall('POST', 'Tags', 'Edit', conferenceId, tagId, {
            tagName: tagName
        }, success, fail);
    }
    this.getConferenceSlots = function(conferenceId, success, fail) {
        this.apiCall('POST', 'Slots', 'List', conferenceId, null, null, success, fail);
    }
    this.getLocations = function(conferenceId, success, fail) {
        this.apiCall('GET', 'Locations', 'List', conferenceId, null, null, success, fail);
    }
    this.getNextSessions = function(conferenceId, success, fail) {
        this.apiCall('GET', 'Sessions', 'Next', conferenceId, null, null, success, fail);
    }
    this.getSessionAttendees = function(conferenceId, sessionId, success, fail) {
        this.apiCall('GET', 'SessionAttendees', 'SessionAttendees', conferenceId, sessionId, null, success, fail);
    }
    this.getOrderDetails = function(conferenceId, itemId, success, fail) {
        this.apiCall('GET', 'NBright', 'Details', conferenceId, itemId, null, success, fail);
    }
    this.getOrderAudit = function(conferenceId, itemId, success, fail) {
        this.apiCall('GET', 'NBright', 'Audit', null, itemId, null, success, fail);
    }
    this.loadComments = function(conferenceId, sessionId, visibility, pageIndex, pageSize, success, fail) {
        this.apiCall('GET', 'Comments', 'List', conferenceId, null, {
            SessionId: sessionId,
            Visibility: visibility,
            PageIndex: pageIndex,
            PageSize: pageSize
        }, success, fail);
    }
    this.orderLocations = function(conferenceId, newOrder, success, fail) {
        this.apiCall('POST', 'Locations', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
    }
    this.orderSessions = function(conferenceId, newOrder, success, fail) {
        this.apiCall('POST', 'Sessions', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
    }
    this.orderSessionSpeakers = function(conferenceId, sessionId, newOrder, success, fail) {
        this.apiCall('POST', 'SessionSpeakers', 'Reorder', conferenceId, sessionId, JSON.stringify(newOrder), success, fail);
    }
    this.orderSpeakers = function(conferenceId, newOrder, success, fail) {
        this.apiCall('POST', 'Speakers', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
    }
    this.orderTracks = function(conferenceId, newOrder, success, fail) {
        this.apiCall('POST', 'Tracks', 'Reorder', conferenceId, null, JSON.stringify(newOrder), success, fail);
    }
    this.searchUsers = function(conferenceId, search, success, fail) {
        this.apiCall('GET', 'Speakers', 'SearchUsers', conferenceId, null, {
            search: search
        }, success, fail);
    }
    this.searchUsersByEmail = function(conferenceId, searchTerm, success, fail) {
        this.apiCall('GET', 'Module', 'SearchUsers', conferenceId, null, {
            field: 'email',
            search: searchTerm
        }, success, fail);
    }
    this.searchTags = function(conferenceId, searchTerm, success, fail) {
        this.apiCall('GET', 'Tags', 'Search', conferenceId, null, {
            search: searchTerm
        }, success, fail);
    }
    this.searchTracks = function(conferenceId, searchTerm, success, fail) {
        this.apiCall('GET', 'Tracks', 'Search', conferenceId, null, {
            search: searchTerm
        }, success, fail);
    }
    this.sessionVote = function(conferenceId, sessionId, vote, success, fail) {
        this.apiCall('POST', 'Sessions', 'Vote', conferenceId, sessionId, {
            vote: vote
        }, success, fail);
    }
    this.tagVote = function(conferenceId, tagId, vote, success, fail) {
        this.apiCall('POST', 'Tags', 'Vote', conferenceId, tagId, {
            vote: vote
        }, success, fail);
    }
    this.toggleParticipant = function(conferenceId, itemId, participant, success, fail) {
        this.apiCall('POST', 'NBright', 'Participant', conferenceId, itemId, participant, success, fail);
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
    this.updateOrderStatus = function(itemId, newStatus, success, fail) {
        this.apiCall('POST', 'NBright', 'OrderStatus', null, null, { ItemId: itemId, Status: newStatus }, success, fail);
    }
    this.updateSlot = function(conferenceId, slot, success, fail) {
        this.apiCall('POST', 'Slots', 'Update', conferenceId, slot.SlotId, slot, success, fail);
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

function getPastel() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    red = Math.floor((red + 255) / 2);
    green = Math.floor((green + 255) / 2);
    blue = Math.floor((blue + 255) / 2);
    red = Math.floor((red + 255) / 2);
    green = Math.floor((green + 255) / 2);
    blue = Math.floor((blue + 255) / 2);
    var res = ("00" + red.toString(16)).substr(-2);
    res += ("00" + green.toString(16)).substr(-2);
    res += ("00" + blue.toString(16)).substr(-2);
    return res;
}

sort_by = function(field, reverse, primer) {
    var key = primer ?
        function(x) { return primer(x[field]) } :
        function(x) { return x[field] };
    reverse = !reverse ? 1 : -1;
    return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

colStyle = function(width, right) {
    if (right) {
        return { width: width.toString() + 'px', textAlign: "right" };
    } else {
        return { width: width.toString() + 'px' };
    }
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

Date.prototype.addDays = function(days) {
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