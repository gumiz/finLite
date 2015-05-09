"use strict";angular.module("finLiteApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngDialog","angular-growl","ui.bootstrap"]).config(["$routeProvider","growlProvider",function(a,b){b.globalTimeToLive(5e3),a.when("/login",{templateUrl:"views/login.ejs",controller:"LoginCtrl"}).when("/accounts",{templateUrl:"views/accounts.html",controller:"AccountsCtrl"}).when("/documents",{templateUrl:"views/documents.html",controller:"DocumentsCtrl"}).when("/reports",{templateUrl:"views/reports.html",controller:"ReportsCtrl"}).otherwise({redirectTo:"/documents"})}]).directive("autoActive",["$location",function(a){return{restrict:"A",scope:!1,link:function(b,c){function d(){var b=a.path();b&&angular.forEach(c.find("li"),function(a){var c=a.querySelector("a");c.href.match("#"+b+"(?=\\?|$)")?angular.element(a).addClass("active"):angular.element(a).removeClass("active")})}d(),b.$on("$locationChangeSuccess",d)}}}]).filter("total",function(){return function(a,b){var c=a instanceof Array?a.length:0;if("undefined"==typeof b||0===c)return c;if(isNaN(a[0][b]))throw"filter total can count only numeric values";for(var d=0;c--;)d+=Number(a[c][b]);return d}}),angular.module("finLiteApp").controller("MainCtrl",["$scope","$location",function(a,b){a.getClass=function(a){return b.path().substr(0,a.length)==a?"active":""}}]),angular.module("finLiteApp").controller("AccountsCtrl",["$scope","repositoryService","dialogService","notify",function(a,b,c,d){var e=function(b){a.accounts=b},f=function(){b.getAccounts(e)};a.refresh=f,a.addAccount=function(){b.addAccount(a.newAccount,f)};var g=function(a){return function(){return b.deleteAccount(a,f)}};a.deleteAccount=function(a){c.confirmation("Czy na pewno chcesz usunąć to konto?",g(a))},f()}]),angular.module("finLiteApp").controller("DocumentsCtrl",["$scope","repositoryService","dialogService","notify","datepickerService","dateUtils",function(a,b,c,d,e,f){function g(){a.newDocument={}}function h(){var b=1;if(0!=a.documents.length){var c=_.max(a.documents,function(a){var b=isNaN(a.autoNumber)?0:a.autoNumber;return b});b=Number(c.autoNumber)+1}a.newDocument.autoNumber=b}function i(){a.newDocument.price&&(a.newDocument.price=a.newDocument.price.replace(",","."))}g(),a.newDocument={};var j=function(b){a.documents=b},k=function(){b.getDocuments(j)};a.refresh=k,a.addDocument=function(){h(),i(),a.newDocument.date=f.dateToString(a.newDocument.date),b.addDocument(a.newDocument,k),g()};var l=function(a){return function(){return b.deleteDocument(a,k)}};a.deleteDocument=function(a){c.confirmation("Czy na pewno chcesz usunąć dokument?",l(a))};var m=function(b){a.accounts=b};b.getAccounts(m),a.datepicker=e.initDatePicker(a.newDocument.date),k()}]),angular.module("finLiteApp").controller("ReportsCtrl",["$scope","repositoryService","dialogService",function(a,b,c){b.getReports(function(b){a.reports=b})}]),angular.module("finLiteApp").service("repositoryService",["$http","ajaxService",function(a,b){var c=function(a){b.doGetWithBlock("getAccounts").then(a)},d=function(a,c){b.doPostWithBlock("addAccounts",a).then(c)},e=function(a,c){b.doPostWithBlock("deleteAccounts",{id:a}).then(c)},f=function(a){b.doGetWithBlock("getDocuments").then(a)},g=function(a,c){b.doPostWithBlock("addDocuments",a).then(c)},h=function(a,c){b.doPostWithBlock("deleteDocuments",{id:a}).then(c)},i=function(a){b.doGetWithBlock("getReports").then(a)};return{addAccount:d,deleteAccount:e,getAccounts:c,addDocument:g,deleteDocument:h,getDocuments:f,getReports:i}}]),angular.module("finLiteApp").service("ajaxService",["$http","$rootScope","notify","$q",function(a,b,c,d){function e(a){b.incrementAsyncRequestCount&&a&&b.incrementAsyncRequestCount()}function f(a){b.decrementAsyncRequestCount&&a&&b.decrementAsyncRequestCount()}function g(a,b,d){var e=d||"Wystąpił błąd podczas przetwarzania";c.error(e),a.reject(b)}function h(a,b){return j(a,b,!0)}function i(a){return k(a,!0)}var j=function(b,c,h){e(h);var i=d.defer();return a.post(b,c).success(function(a){f(h),i.resolve(a)}).error(function(a,b){f(h),g(i,b,a)}),i.promise},k=function(b,c){e(c);var h=d.defer();return a.get(b).success(function(a){f(c),h.resolve(a)}).error(function(a,b){f(c),g(h,b,a)}),h.promise};return{doGet:k,doPost:j,doPostWithBlock:h,doGetWithBlock:i}}]),angular.module("finLiteApp").factory("dialogService",["ngDialog",function(a){var b=function(b){a.openConfirm({template:"<p>"+b+'</p>                <div class="ngdialog-buttons">                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">OK</button>                </div>',plain:!0})},c=function(b,c){a.openConfirm({template:"<p>"+b+'</p>                <div class="ngdialog-buttons">                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">Nie</button>                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Tak</button>                </div>',plain:!0}).then(function(a){c()},function(a){})},d=function(b,c){a.openConfirm({template:b,scope:c})},e=function(){a.close()};return{showMessage:b,confirmation:c,showDialog:d,closeDialog:e}}]),angular.module("finLiteApp").service("notify",["growl",function(a){var b=function(b){a.info(b,{title:"FinLite informuje"})},c=function(b){a.error(b,{title:"Błąd!"})};return{info:b,error:c}}]),angular.module("finLiteApp").factory("datepickerService",function(){var a=function(a){var b={};return b.today=function(){a=new Date},b.today(),b.clear=function(){a=null},b.disabled=function(a,b){return"day"===b&&(0===a.getDay()||6===a.getDay())},b.toggleMin=function(){b.minDate=b.minDate?null:new Date},b.toggleMin(),b.open=function(a){a.preventDefault(),a.stopPropagation(),b.opened=!0},b.dateOptions={formatYear:"yy",startingDay:1},b.format="yyyy-MM-dd",b};return{initDatePicker:a}}),angular.module("finLiteApp").service("dateUtils",function(){var a=function(a){return moment(a).format("YYYY-MM-DD")},b=function(a){return moment(a).toDate()},c=function(){return b(new Date)},d=function(a,b){var c=new Date(a,b-1,1);return moment(c).endOf("month")},e=function(a,b,c){var d=new Date(a,b-1,c);return moment(d)};return{getActualDate:c,convertDate:b,lastDayOfTheMonth:d,getDate:e,dateToString:a}}),angular.module("finLiteApp").controller("LoginCtrl",["$scope","ajaxService","notify",function(a,b,c){function d(){c.info("Zalogowano do FinLite")}a.user={name:"gumiz",pass:"testpass"},a.login=function(){var c={username:a.user.name,password:a.user.pass};b.doPost("loginFinlite",c).then(d)}}]);
