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
      return React.createElement(Comment, {moduleId: this.props.moduleId, comment: item, key: item.CommentId, 
                      appPath: this.props.appPath, onDelete: this.props.onCommentDelete})
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
      commentCount: this.props.totalComments,
      canLoadMore: (this.props.totalComments > this.props.comments.length) ? true : false,
      lastPage: 0
    }
  },

  render: function() {
    var submitPanel = React.createElement("div", null);
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
            React.createElement(CommentList, {moduleId: this.props.moduleId, comments: this.state.comments, 
                         appPath: this.props.appPath, onCommentDelete: this.onCommentDelete}), 
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

  componentDidMount: function() {},

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
  }


});

module.exports = Comments;


},{"./CommentList":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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


},{"./SessionVote":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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


},{"./Speaker":6}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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


},{"./TagVote":9}],11:[function(require,module,exports){
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


},{"./Tag":8}],12:[function(require,module,exports){
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


},{"./TimesheetEditorSlot":13}],13:[function(require,module,exports){
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


},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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


},{"./Track":14}],16:[function(require,module,exports){
/** @jsx React.DOM */
var TimesheetEditor = require('./TimesheetEditor'),
    Comments = require('./Comments'),
    Tags = require('./Tags'),
    Tracks = require('./Tracks'),
    Speakers = require('./Speakers'),
    TagVotes = require('./TagVotes'),
    SessionVotes = require('./SessionVotes');

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
    },

    formatString: function(format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    }


  }


})(jQuery, window, document);


},{"./Comments":3,"./SessionVotes":5,"./Speakers":7,"./TagVotes":10,"./Tags":11,"./TimesheetEditor":12,"./Tracks":15}]},{},[16])
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
    this.apiCall('POST', 'Comments', 'Add', conferenceId, null, { SessionId: sessionId, Visibility: visibility, Remarks: comment}, success, fail);
  }
  this.loadComments = function(conferenceId, sessionId, visibility, pageIndex, pageSize, success, fail) {
    this.apiCall('GET', 'Comments', 'List', conferenceId, null, { SessionId: sessionId, Visibility: visibility, PageIndex: pageIndex, PageSize: pageSize}, success, fail);
  }
  this.deleteComment = function(conferenceId, commentId, success, fail) {
    this.apiCall('POST', 'Comments', 'Delete', conferenceId, commentId, null, success, fail);
  }
  this.searchTags = function(conferenceId, searchTerm, success, fail) {
    this.apiCall('GET', 'Tags', 'Search', conferenceId, null, { search: searchTerm}, success, fail);
  }
  this.tagVote = function(conferenceId, tagId, vote, success, fail) {
    this.apiCall('POST', 'Tags', 'Vote', conferenceId, tagId, { vote: vote }, success, fail);
  }
  this.sessionVote = function(conferenceId, sessionId, vote, success, fail) {
    this.apiCall('POST', 'Sessions', 'Vote', conferenceId, sessionId, { vote: vote }, success, fail);
  }
  this.addTag = function(conferenceId, tagName, success, fail) {
    this.apiCall('POST', 'Tags', 'Add', conferenceId, null, { tagName: tagName }, success, fail);
  }
  this.editTag = function(conferenceId, tagId, tagName, success, fail) {
    this.apiCall('POST', 'Tags', 'Edit', conferenceId, tagId, { tagName: tagName }, success, fail);
  }
  this.deleteTag = function(conferenceId, tagId, success, fail) {
    this.apiCall('POST', 'Tags', 'Delete', conferenceId, tagId, null, success, fail);
  }
  this.searchUsers = function(conferenceId, search, success, fail) {
    this.apiCall('GET', 'Speakers', 'SearchUsers', conferenceId, null, { search: search }, success, fail);
  }
  this.addSessionSpeaker = function(conferenceId, sessionId, userId, success, fail) {
    this.apiCall('POST', 'SessionSpeakers', 'Add', conferenceId, sessionId, { UserId: userId }, success, fail);
  }
  this.deleteSessionSpeaker = function(conferenceId, sessionId, userId, success, fail) {
    this.apiCall('POST', 'SessionSpeakers', 'Delete', conferenceId, sessionId, { UserId: userId }, success, fail);
  }
  this.orderSessionSpeakers = function(conferenceId, sessionId, newOrder, success, fail) {
    this.apiCall('POST', 'SessionSpeakers', 'Reorder', conferenceId, sessionId, JSON.stringify(newOrder), success, fail);
  }
  this.searchTracks = function(conferenceId, searchTerm, success, fail) {
    this.apiCall('GET', 'Tracks', 'Search', conferenceId, null, { search: searchTerm}, success, fail);
  }
  this.changeAttendeeStatus = function(conferenceId, newStatus, success, fail) {
    this.apiCall('POST', 'Attendees', 'ChangeStatus', conferenceId, null, { Status: newStatus}, success, fail);
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

$(document).ready(function() {
  var el = $('.ModConnectConferenceC .container');
  if (el != undefined) {
    if (el.parent().closest('.container').length == 1) {
      el.removeClass('container');
    }
  }
})
