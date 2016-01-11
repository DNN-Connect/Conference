window.ConferenceService = function($, mid) {
  var moduleId = mid;
  var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Conference');

  this.ServicePath = function() {
    return baseServicepath;
  },

  this.apiCall = function(method, controller, action, conferenceId, id, data, success, fail) {
    //showLoading();
    console.log(data);
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

}
