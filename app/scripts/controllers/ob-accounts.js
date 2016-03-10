/* global $*/
((angular) => {
'use strict';

function ObAccountsCtrl($log, $scope, AccountService, $rootScope) {
   let ob_ac = this;
   $log.info('ObAccountsCtrl...');

   //Mock data
   ob_ac.accounts= [];

   ob_ac.columnDefs =
    [
      {headerName: "Account Id", field: "accountId"},
      {headerName: "Account Name", field: "accountName"},
      {headerName: "Account Type", field: "type"},
      {headerName: "Billing Contact", field: "billingContact"},
      {headerName: "Shipping Contact", field: "shippingContact"}
    ];

  ob_ac.gridOptions = {
    columnDefs: ob_ac.columnDefs,
    rowData: null,
    enableColResize: true,
    enableSorting: true,
    enableFilter: true,
    ready: function(api) {
            api.sizeColumnsToFit();
        }
  };
  //
  $scope.$on('getAccounts',  function(){
    let promise= AccountService.importAccounts();
    promise.then(function (result) {
      let innerPromise= AccountService.getAccountsList();
      innerPromise.then(function (result) {
        ob_ac.accounts = result;
        ob_ac.gridOptions.api.setRowData(ob_ac.accounts);
      });
    });
  });

  ob_ac.getCases= function(){
    $rootScope.$broadcast('getCases');
  }
}

angular
  .module('tCRMAPP')
  .controller('ObAccountsCtrl', ObAccountsCtrl);
}(angular));
