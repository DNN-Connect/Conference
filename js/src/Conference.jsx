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
    NBrightOrders = require('./NBright/OrderTable.jsx');

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
        var locations = $(el).data('locations');
        var conferenceId = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        React.render(<TimesheetEditor moduleId={moduleId} slots={slots} locations={locations}
           conferenceId={conferenceId} nrDays={nrDays} />, el);
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
        React.render(<Comments moduleId={moduleId} 
           conferenceId={conferenceId} sessionId={sessionId} appPath={appPath}
           totalComments={totalComments} loggedIn={loggedIn} title={title} help={help}
           visibility={visibility} pageSize={pageSize} comments={comments} />, el);
      });
      $('.tagsComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var fieldName = $(el).data('name');
        var placeholder = $(el).data('placeholder');
        var tags = $(el).data('tags');
        React.render(<Tags moduleId={moduleId} name={fieldName} tags={tags} placeholder={placeholder}
           conferenceId={conferenceId} />, el);
      });
      $('.speakersComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var sessionId = $(el).data('session');
        var fieldName = $(el).data('name');
        var speakers = $(el).data('speakers');
        React.render(<Speakers moduleId={moduleId} name={fieldName} speakers={speakers} sessionId={sessionId}
           conferenceId={conferenceId} />, el);
      });
      $('.tagVoteComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var voteList = $(el).data('votelist');
        var allowVote = $(el).data('allowvote');
        var allowAdd = $(el).data('allowadd');
        React.render(<TagVotes moduleId={moduleId} voteList={voteList} allowVote={allowVote} allowAdd={allowAdd}
           conferenceId={conferenceId} />, el);
      });
      $('.sessionVoteComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var voteList = $(el).data('votelist');
        var allowVote = $(el).data('allowvote');
        React.render(<SessionVotes moduleId={moduleId} voteList={voteList} allowVote={allowVote}
           conferenceId={conferenceId} />, el);
      });
      $('.schedulerComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conference = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        var slots = $(el).data('slots');
        var sessions = $(el).data('sessions');
        var gridHeight = $(el).data('gridheight');
        var locations = $(el).data('locations');
        React.render(<Scheduler moduleId={moduleId} conference={conference} locations={locations}
                      nrDays={nrDays} slots={slots} sessions={sessions} gridHeight={gridHeight} />, el);
      });
      $('.scheduleComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conference = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        var slots = $(el).data('slots');
        var sessions = $(el).data('sessions');
        var gridHeight = $(el).data('gridheight');
        var locations = $(el).data('locations');
        React.render(<Schedule moduleId={moduleId} conference={conference} locations={locations}
                      nrDays={nrDays} slots={slots} sessions={sessions} gridHeight={gridHeight} />, el);
      });
      $('.resourcesComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var tabId = $(el).data('tabid');
        var conferenceId = $(el).data('conferenceid');
        var sessionId = $(el).data('sessionid');
        var resources = $(el).data('resources');
        var canAdd = $(el).data('canadd');
        var resourceDir = $(el).data('resourcedir');
        React.render(<Resources moduleId={moduleId} conferenceId={conferenceId} resources={resources}
                      canAdd={canAdd} tabId={tabId} sessionId={sessionId} resourceDir={resourceDir} />, el);
      });
      $('.bulkAddUsersComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var tabId = $(el).data('tabid');
        var conferenceId = $(el).data('conferenceid');
        var type = $(el).data('type');
        React.render(<BulkAddUsers moduleId={moduleId} conferenceId={conferenceId} type={type} />, el);
      });
      $('.sessionStatusButton').each(function(i, el) {
        React.render(<SessionStatusButton module={ConnectConference.modules[$(el).data('moduleid')]}
                        options={$(el).data('options')}
                        selected={$(el).data('selected')}
                        conferenceId={$(el).data('conferenceid')}
                        sessionId={$(el).data('sessionid')} />, el);
      });
      $('.sessionManager').each(function(i, el) {
        React.render(<SessionManager module={ConnectConference.modules[$(el).data('moduleid')]}
                        statusOptions={$(el).data('statusoptions')}
                        tracks={$(el).data('tracks')}
                        conferenceId={$(el).data('conferenceid')}
                        sessions={$(el).data('sessions')} />, el);
      });
      $('.attendeeTable').each(function(i, el) {
        React.render(<AttendeeTable module={ConnectConference.modules[$(el).data('moduleid')]}
                        conferenceId={$(el).data('conferenceid')}
                        attendees={$(el).data('attendees')} />, el);
      });
      $('.liveTicker').each(function(i, el) {
        React.render(<LiveTicker module={ConnectConference.modules[$(el).data('moduleid')]}
                        conferenceId={$(el).data('conferenceid')}
                        locations={$(el).data('locations')} />, el);
      });
      $('.nbright').each(function(i, el) {
        React.render(<NBrightOrders module={ConnectConference.modules[$(el).data('moduleid')]}
                        conferenceId={$(el).data('conferenceid')}
                        orders={$(el).data('orders')} />, el);
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
