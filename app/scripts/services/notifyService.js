/*global appServices, $ */
angular.module('finLiteApp').service('notifyService', function () {
	"use strict";

	function showMessage(message) {
		return notification.message(message);
	}

	function showErrorMessage(message) {
		return notification.error(message);
	}

	function alert(message) {
		return notification.message(message);
	}

	return {
		showMessage: showMessage,
		showErrorMessage: showErrorMessage,
		alert: alert
	};
});
