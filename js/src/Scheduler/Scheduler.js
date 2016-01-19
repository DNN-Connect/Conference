/** @jsx React.DOM */
var SchedulerDay = require('./SchedulerDay'),
  SchedulerUnscheduledSession = require('./SchedulerUnscheduledSession');

var Scheduler = React.createClass({

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
        return <SchedulerUnscheduledSession {...this.props} session={item} key={item.SessionId} />
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
        <SchedulerDay day={i} slots={daySlots} 
           start={Math.floor(daySlots[0].StartMinutes/60) * 60 - 60}
           finish={120 + Math.floor(daySlots[daySlots.length - 1].StartMinutes / 60) * 60}
           locationList={this.state.locationList} 
           leftMargin={50}
           sessionList={this.state.sessionList}
           locations={this.props.locations}
           sessionPlace={this.sessionPlace} />
        );
    }
    return (
      <div className="row Scheduler">
        <div className="col-xs-12 col-md-2 unscheduled canDrop" ref="unscheduledColumn">
          {unscheduledSessions}
        </div>
        <div className="col-xs-12 col-md-10" ref="schedulerColumn">
          {scheduleDays}
        </div>
      </div>
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
    this.service.tryRemoveSession(this.props.conferenceId, sessionId, function(data) {
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
    this.service.tryMoveSession(this.props.conferenceId, sessionId, day, slotId, locationId, false, function(data) {
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
