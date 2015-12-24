var moduleConferenceService;

function ModuleConferenceService($, settings, mid) {
 var moduleId = mid;
 var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Conference');

 this.apiCall = function (method, controller, action, id, data, success, fail) {
  showLoading();
  var path = baseServicepath + controller + '/' + action;
  if (id != null) { path += '/' + id }
  $.ajax({
   type: method,
   url: path,
   beforeSend: $.dnnSF(moduleId).setModuleHeaders,
   data: data
  }).done(function (data) {
   hideLoading();
   if (success != undefined) {
    success(data);
   }
  }).fail(function (xhr, status) {
   showError(xhr.responseText);
   if (fail != undefined) {
    fail(xhr.responseText);
   }
  });
 }

 this.orderTracks = function (conferenceId, newOrder, success, fail) {
  this.apiCall('POST', 'Tracks', 'Reorder', null, JSON.stringify({ Id: conferenceId, NewOrder: newOrder }), success, fail);
 }
 this.orderLocations = function (conferenceId, newOrder, success, fail) {
  this.apiCall('POST', 'Locations', 'Reorder', null, JSON.stringify({ Id: conferenceId, NewOrder: newOrder }), success, fail);
 }
}

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
  setTimeout(function () { $('#serviceStatus').hide(); }, 3000);
 }
}

function isInt(value) {
 return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function validateForm(form, submitButton, formErrorDiv) {
 submitButton.click(function () {
  var hasErrors = false;
  formErrorDiv.empty().hide();
  form.find('input[data-validator="integer"]').each(function (i, el) {
   if (!isInt($(el).val())) {
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
 $('#' + tableId + ' tbody:first tr').each(function (i, el) {
  res.push({ id: $(el).data('id'), order: i });
 });
 return res;
}
