// Common functions for the module
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
