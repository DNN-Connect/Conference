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
        React.render(<Comments moduleId={moduleId} 
           conferenceId={conferenceId} sessionId={sessionId} appPath={appPath}
           totalComments={totalComments} loggedIn={loggedIn}
           visibility={visibility} pageSize={pageSize} comments={comments} />, el);
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
