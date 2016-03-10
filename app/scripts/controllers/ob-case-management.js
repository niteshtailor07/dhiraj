/* global $*/
((angular) => {
'use strict';

function OnboardingCaseManagementCtrl($log, $scope, OnboardingService) {
   let ob_cmc = this;
   $log.info('OnboardingCaseManagementCtrl...');

  //  //Mock data
  //  ob_ac.accounts= [];

  //  ob_ac.columnDefs =
  //   [
  //     {headerName: "Account Number", field: "account_id"},
  //     {headerName: "Account Name", field: "account_name"},
  //     {headerName: "Account Type", field: "account_type"},
  //     {headerName: "Billing Address", field: "account_bill_address"},
  //     {headerName: "Shipping Address", field: "account_shipping_address"}
  //   ];

  // ob_ac.gridOptions = {
  //   columnDefs: ob_ac.columnDefs,
  //   rowData: ob_ac.accounts,
  //   enableColResize: true,
  //   enableSorting: true,
  //   enableFilter: true,
  //   ready: function(api) {
  //           api.sizeColumnsToFit();
  //       }
  // };


  $scope.$on('getCases',function(){
    let promise= OnboardingService.getImportCases();
    promise.then(function (result) {
      console.log('Salesforce import', result)
      let promiseCasePriority= OnboardingService.getImportCasePriority();
      promiseCasePriority.then(function (result) {
        console.log('Case Severities', result)
        ob_cmc.caseSeverities = result;
      });
      let promiseCaseStatus= OnboardingService.getImportCaseStatus();
      promiseCaseStatus.then(function (result) {
        console.log('Case Status', result)
        ob_cmc.caseStatus = result;
      });
    });


  });
}

angular
  .module('tCRMAPP')
  .controller('OnboardingCaseManagementCtrl', OnboardingCaseManagementCtrl);
}(angular));
