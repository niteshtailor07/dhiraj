((angular) => {
'use strict';

angular.module('tCRMAPP')
  .controller('AccountCtrl', function ($scope,$log,AccountService) {
    $log.info('at Account controller ');
    let acc=this;

    acc.accounts=[];
    acc.columnDefs=[
      {headerName: 'Id', field: 'account_id'},
      {headerName: 'Type', field: 'type'},
      {headerName: 'CRM Account Id', field: 'crm_account_id'},
      {headerName: 'Industry', field: 'industry'},
      {headerName: 'Description', field: 'description'},
      {headerName: 'No of Emp', field: 'no_of_emp'}
    ];

    acc.gridOptions = {
      columnDefs: acc.columnDefs,
      rowData: acc.accounts,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true
    };

    acc.listView=true;

    /*
    fetch accounts and assign to acc.accounts
    */
    let promise= AccountService.getAccounts();
    promise.then(function(data){
      $log.info('got accounts'+data);
      acc.accounts=data;
      acc.gridOptions.api.setRowData(acc.accounts);
    });
  });
}(angular));
