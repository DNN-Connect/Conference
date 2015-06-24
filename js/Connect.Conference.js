var moduleConferenceService;

function ModuleConferenceService($, settings, mid) {
	var moduleId = mid;
	var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Conference');

	this.ServicePath = baseServicepath;

	this.viewCall = function (controller, action, view, id, success, fail) {
		showLoading();
		var path = baseServicepath + controller + '/' + action;
		if (id != null) { path += '/' + id }
		$.ajax({
			type: "GET",
			url: path,
			beforeSend: $.dnnSF(moduleId).setModuleHeaders,
			data: { view: view }
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

	this.dataCall = function (controller, action, data, success, fail) {
		showLoading();
		$.ajax({
			type: "GET",
			url: baseServicepath + controller + '/' + action,
			beforeSend: $.dnnSF(moduleId).setModuleHeaders,
			data: data
		}).done(function (retdata) {
			hideLoading();
			if (success != undefined) {
				success(retdata);
			}
		}).fail(function (xhr, status) {
			showError(xhr.responseText);
			if (fail != undefined) {
				fail(xhr.responseText);
			}
		});
	}

	this.apiPostCall = function (controller, action, data, success, fail) {
		showLoading();
		$.ajax({
			type: "POST",
			url: baseServicepath + controller + '/' + action,
			beforeSend: $.dnnSF(moduleId).setModuleHeaders,
			data: data
		}).done(function (retdata) {
			hideLoading();
			if (success != undefined) {
				success(retdata);
			}
		}).fail(function (xhr, status) {
			showError(xhr.responseText);
			if (fail != undefined) {
				fail(xhr.responseText);
			}
		});
	}
	
	this.myMethod = function (id, success, fail) {
		this.viewCall('Widget', 'List', null, id, success, fail);
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
