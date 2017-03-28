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

function getPastel() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    red = Math.floor((red + 255) / 2);
    green = Math.floor((green + 255) / 2);
    blue = Math.floor((blue + 255) / 2);
    red = Math.floor((red + 255) / 2);
    green = Math.floor((green + 255) / 2);
    blue = Math.floor((blue + 255) / 2);
    var res = ("00" + red.toString(16)).substr(-2);
    res += ("00" + green.toString(16)).substr(-2);
    res += ("00" + blue.toString(16)).substr(-2);
    return res;
}

sort_by = function(field, reverse, primer) {
    var key = primer ?
        function(x) { return primer(x[field]) } :
        function(x) { return x[field] };
    reverse = !reverse ? 1 : -1;
    return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

colStyle = function(width, right) {
    if (right) {
        return { width: width.toString() + 'px', textAlign: "right" };
    } else {
        return { width: width.toString() + 'px' };
    }
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

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

$(document).ready(function() {
    var el = $('.ModConnectConferenceC .container');
    if (el != undefined) {
        if (el.parent().closest('.container').length == 1) {
            el.removeClass('container');
        }
    }
})