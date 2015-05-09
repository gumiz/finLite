/*global appServices, $*/
  angular.module('finLiteApp').service('ajaxService', ['$http', '$rootScope', 'notify', '$q', function ($http, $rootScope, notify, $q) {
        "use strict";

    var doPost = function (url, dataToSend, blockUi) {
        incrementAsyncRequestCount(blockUi);
        var def = $q.defer();
        $http.post(url, dataToSend)
            .success(function(data){
                decrementAsyncRequestCount(blockUi);
                def.resolve(data);
            })
            .error(function(data, status){
                decrementAsyncRequestCount(blockUi);
                handleRequestFail(def, status, data);
            });
        return def.promise;
    };

    var doGet = function (url, blockUi) {
        incrementAsyncRequestCount(blockUi);
        var def = $q.defer();
        $http.get(url)
            .success(function (data) {
                decrementAsyncRequestCount(blockUi);
                def.resolve(data);
            })
            .error(function (data, status) {
                decrementAsyncRequestCount(blockUi);
                handleRequestFail(def, status, data);
            });
        return def.promise;
    };

    function incrementAsyncRequestCount(blockUi) {
        if ($rootScope.incrementAsyncRequestCount && blockUi) {
            $rootScope.incrementAsyncRequestCount();
        }
    }

    function decrementAsyncRequestCount(blockUi) {
        if ($rootScope.decrementAsyncRequestCount && blockUi) {
            $rootScope.decrementAsyncRequestCount();
        }
    }

    function handleRequestFail(deferred, status, message) {
        var error = message || "Wystąpił błąd podczas przetwarzania";
      notify.error(error);
        deferred.reject(status);
    }

    function doPostWithBlock(url, dataToSend) {
        return doPost(url, dataToSend, true);
    }

    function doGetWithBlock(url) {
        return doGet(url, true);
    }


    return {
        doGet: doGet,
        doPost: doPost,
        doPostWithBlock: doPostWithBlock,
        doGetWithBlock: doGetWithBlock
    };
}]);
