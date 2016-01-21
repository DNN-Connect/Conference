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
        React.render(<TimesheetEditor moduleId={moduleId} slots={slots} 
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
      $('.tracksComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var fieldName = $(el).data('name');
        var tracks = $(el).data('tracks');
        var initialData = $(el).data('initial');
        React.render(<Tracks moduleId={moduleId} name={fieldName} tracks={tracks} initialData={initialData}
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
        var conferenceId = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        var slots = $(el).data('slots');
        var sessions = $(el).data('sessions');
        var gridHeight = $(el).data('gridheight');
        var locations = $(el).data('locations');
        React.render(<Scheduler moduleId={moduleId} conferenceId={conferenceId} locations={locations}
                      nrDays={nrDays} slots={slots} sessions={sessions} gridHeight={gridHeight} />, el);
      });
      $('.scheduleComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var nrDays = $(el).data('nrdays');
        var slots = $(el).data('slots');
        var sessions = $(el).data('sessions');
        var gridHeight = $(el).data('gridheight');
        var locations = $(el).data('locations');
        React.render(<Schedule moduleId={moduleId} conferenceId={conferenceId} locations={locations}
                      nrDays={nrDays} slots={slots} sessions={sessions} gridHeight={gridHeight} />, el);
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
