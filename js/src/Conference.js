var ConferenceService = require('./ConferenceService');

;
(function($, window, document, undefined) {

  $(document).ready(function() {
    ConnectConference.loadData();
  });

  window.ConnectConference = {
    modules: {},

    loadData: function() {
      $('.connectConference').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        var newModule = {
          service: new ConferenceService($, moduleId)
        };
        ConnectConference.modules[moduleId] = newModule;
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
