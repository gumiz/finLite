/*global appServices, $*/
angular.module("finLiteApp").factory('dialogService', ['ngDialog', function (ngDialog) {
    "use strict";

    var showMessage = function(message) {
        ngDialog.openConfirm({
            template:
            '<p>'+message+'</p>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">OK</button>\
                </div>',
            plain: true
        });
    };

    var confirmation = function(question, successFunction) {
        ngDialog.openConfirm({
            template:
                '<p>'+question+'</p>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">Nie</button>\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Tak</button>\
                </div>',
            plain: true
        }).then(function(value){
            successFunction();
        },function(reject){
        });
    };

    var showDialog = function(templateName, scope) {
        ngDialog.openConfirm({
            template: templateName,
            scope: scope
        });
    };

    var closeDialog = function() {
        ngDialog.close();
    };

    return {
        showMessage: showMessage,
        confirmation: confirmation,
        showDialog: showDialog,
        closeDialog: closeDialog
    };
}]);
