'use strict';
angular.module('finLiteApp').service('repositoryService', [function () {

  var accounts;
  var db;

  var getAccounts = function(acc) {
    var selectAllStatement = "SELECT * FROM Accounts";
    db.transaction(function (tx) {
      tx.executeSql(selectAllStatement, [], function (tx, result) {
        accounts = [];
        for (var i=0; i<result.rows.length; i++) {
          var item = result.rows.item(i);
          accounts.push(item);
        }
        acc(accounts);
      });
    });
    return accounts;
  };

  var addAccount = function(item, successFunc) {
    var insertStatement = "INSERT INTO Accounts (name, description) VALUES (?, ?)";
    db.transaction(function (tx) { tx.executeSql(insertStatement, [item.name, item.description], successFunc, onError); });
  };

  function onError(a,b) {
    debugger;
  }

  function createTable(success)
  {
      var createStatement = "CREATE TABLE IF NOT EXISTS Accounts (name INTEGER PRIMARY KEY, description TEXT)";
      db.transaction(function (tx) { tx.executeSql(createStatement, [], success, onError); });
  }

  function init(success) {
    db = openDatabase('finLiteDb', '1.0', 'finLite DB', 2 * 1024 * 1024);
    try {
      if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
      } else {
        createTable(success);
      }
    }
    catch (e) {
      if (e == 2) {
        console.log("Invalid database version.");
      } else {
        console.log("Unknown error " + e + ".");
      }
      return;
    }
  };

  return {
    addAccount: addAccount,
    getAccounts: getAccounts,
    init: init
  }
}]);
