'use strict';

angular.module('finLiteApp').factory('datepickerService', function () {

  var initDatePicker = function (value) {
    var datePicker = {};
    datePicker.today = function () {
      value = new Date();
    };
    datePicker.today();

    datePicker.clear = function () {
      value = null;
    };

    // Disable weekend selection
    datePicker.disabled = function (date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    datePicker.toggleMin = function () {
      datePicker.minDate = datePicker.minDate ? null : new Date();
    };
    datePicker.toggleMin();

    datePicker.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      datePicker.opened = true;
    };

    datePicker.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    datePicker.format = 'yyyy-MM-dd';
    return datePicker;
  };
  return {
    initDatePicker: initDatePicker
  }
});
