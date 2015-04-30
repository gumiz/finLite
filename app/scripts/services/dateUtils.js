/*global appServices, $*/
angular.module('finLiteApp').service('dateUtils', function () {
   "use strict";

    var dateToString = function(date) {
      return moment(date).format('YYYY-MM-DD');
    };

    var convertDate = function(date) {
        return moment(date).toDate();
    };

    var getActualDate = function() {
        return convertDate(new Date());
    };

    var lastDayOfTheMonth = function(year, month) {
        var date = new Date(year, month-1, 1);
        return moment(date).endOf('month');
    };

    var getDate = function(year, month, day) {
        var date = new Date(year, month-1, day);
        return moment(date);
    };

    return {
        getActualDate: getActualDate,
        convertDate: convertDate,
        lastDayOfTheMonth: lastDayOfTheMonth,
        getDate: getDate,
        dateToString : dateToString
    };
});
