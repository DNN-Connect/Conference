/** @jsx React.DOM */
var SchedulerDay = require('./SchedulerDay'),
  SchedulerUnscheduledSession = require('./SchedulerUnscheduledSession');

var Scheduler = React.createClass({

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    return {
      sessionList: this.props.sessions
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
      scheduleDays.push(<SchedulerDay {...this.props} day={i} sessionList={this.state.sessionList} />);
    }
    return (
      <div className="row Scheduler">
        <div className="col-xs-12 col-md-2">
          {unscheduledSessions}
        </div>
        <div className="col-xs-12 col-md-10">
          {scheduleDays}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    $(document).ready(function() {
      interact('.session')
        .draggable({
          inertia: false,
          restrict: {
            endOnly: true
          },
          autoScroll: false,
          onend: function(event) {}
        })
        .on('dragmove', function(event) {
          moveObject(event.target, event.dx, event.dy);
        });
      interact('.sessionSlot')
        .dropzone({
          accept: '.session',
          overlap: 0.75,
          ondropactivate: function(event) {
          },
          ondragenter: function(event) {
            var dropzoneElement = event.target;
            dropzoneElement.classList.add('drop-target');
          },
          ondragleave: function(event) {
            event.target.classList.remove('drop-target');
          },
          ondrop: function(event) {
            var session = $(event.relatedTarget);
            var dropBox = event.target.getBoundingClientRect();
            var sessionBox = event.relatedTarget.getBoundingClientRect();
            session.width(dropBox.width - 12);
            session.height(dropBox.height - 12);
            moveObject(event.relatedTarget, 
                       dropBox.left - sessionBox.left + 4,
                       dropBox.top - sessionBox.top + 4);
          },
          ondropdeactivate: function(event) {
            event.target.classList.remove('drop-target');
          }
        });
    });
  }

});

module.exports = Scheduler;
