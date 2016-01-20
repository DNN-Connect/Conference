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
    setTimeout(function() {
      $('#serviceStatus').hide();
    }, 3000);
  }
}

function isInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

function validateForm(form, submitButton, formErrorDiv) {
  submitButton.click(function() {
    var hasErrors = false;
    formErrorDiv.empty().hide();
    form.find('input[data-validator="integer"]').each(function(i, el) {
      if (!isInt($(el).val()) & $(el).val() != '') {
        hasErrors = true;
        $(el).parent().addClass('error');
        formErrorDiv.append('<span>' + $(el).attr('data-message') + '</span><br />').show();
      }
    });
    form.find('input[data-required="true"]').each(function(i, el) {
      if ($(el).val() == '') {
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
  $('#' + tableId + ' tbody:first tr').each(function(i, el) {
    res.push({
      id: $(el).data('id'),
      order: i
    });
  });
  return res;
}

function minutesToTime(mins) {
  var hr = Math.floor(mins / 60);
  var mn = mins - 60 * hr;
  var res = mn.toString();
  if (res.length == 1) {
    res = "0" + res
  }
  res = hr.toString() + ":" + res;
  return res;
}

function moveObject(object, dx, dy) {
  var x = (parseFloat(object.getAttribute('data-x')) || 0) + dx,
    y = (parseFloat(object.getAttribute('data-y')) || 0) + dy;
  object.style.webkitTransform =
    object.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';
  object.setAttribute('data-x', x);
  object.setAttribute('data-y', y);
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

if (!Date.prototype.toUTCDateTimeDigits) {
  (function() {
    Date.prototype.toUTCDateTimeDigits = function() {
      return this.getUTCFullYear() + '-' +
        pad(this.getUTCMonth() + 1) + '-' +
        pad(this.getUTCDate()) +
        'T' +
        pad(this.getUTCHours()) + ':' +
        pad(this.getUTCMinutes()) + ':' +
        pad(this.getUTCSeconds()) +
        'Z';
    };
  }());
}

$(document).ready(function() {
  var el = $('.ModConnectConferenceC .container');
  if (el != undefined) {
    if (el.parent().closest('.container').length == 1) {
      el.removeClass('container');
    }
  }
})
