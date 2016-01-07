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
        React.render(<TimesheetEditor moduleId={moduleId} slots={slots} 
           conferenceId={conferenceId} nrDays={nrDays} />, el);
      });
      $('.commentsComponent').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var conferenceId = $(el).data('conference');
        var sessionId = $(el).data('session');
        var visiblity = $(el).data('visiblity');
        var pageSize = $(el).data('pageSize');
        var comments = $(el).data('comments');
        React.render(<Comments moduleId={moduleId} 
           conferenceId={conferenceId} sessionId={sessionId} 
           visiblity={visiblity} pageSize={pageSize} comments={comments} />, el);
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
