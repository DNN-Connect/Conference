(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ConferenceService = function($, mid) {
  var moduleId = mid;
  var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Conference');

  this.apiCall = function(method, controller, action, conferenceId, id, data, success, fail) {
    showLoading();
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
      hideLoading();
      if (success != undefined) {
        success(data);
      }
    }).fail(function(xhr, status) {
      showError(xhr.responseText);
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
  this.deleteTrack = function(conferenceId, trackId, success, fail) {
    this.apiCall('POST', 'Tracks', 'Delete', conferenceId, trackId, null, success, fail);
  }
  this.deleteLocation = function(conferenceId, locationId, success, fail) {
    this.apiCall('POST', 'Locations', 'Delete', conferenceId, locationId, null, success, fail);
  }

}

module.exports = ConferenceService;


},{}],2:[function(require,module,exports){
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


},{"./ConferenceService":1}]},{},[2])