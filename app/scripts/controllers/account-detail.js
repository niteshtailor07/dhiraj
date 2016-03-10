((angular) => {
'use strict';

angular.module('tCRMAPP')
  .controller('AccountDetailCtrl', function ($scope,$log,AccountService, $routeParams) {
    let acdtl = this;
    let id = $routeParams.id;
    console.log(id);
    acdtl.account = {};
    //acdtl.getAccount = getAccount;
    getAccount(id);

    function getAccount(id) {
      let promise = AccountService.getAccountDetail(id);
      promise.then(function (data, error) {
        console.log('account detail from controller', data);
        acdtl.account = data;
      });
    }
  });
}(angular));
