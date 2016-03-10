((angular) => {
'use strict';

angular.module('tCRMAPP')
  .controller('CaseDetailCtrl', function ($scope,$log,$routeParams,CaseService,AccountService,AssetsService,Restangular) {
    $log.info('at Case Detail controller ');
	 let cdtl = this;
	    let id = $routeParams.id;
	    console.log(id);
	    cdtl.caseDetail = {};
	    //cdtl.getCase = getCase;
	    getCaseDetail(id);
      //Asset and account list to show in edit mode
      cdtl.assets=[];
      cdtl.accounts=[];
      cdtl.init=function(){
        cdtl.editCaseDetail = false;
      }
      cdtl.init();
      //fetch case details and show on to the view
	    function getCaseDetail(id) {
	      let promise = CaseService.getCaseDetail(id);
	      promise.then(function (data, error) {
	        cdtl.caseDetail = data;
          if(data.accountId){
            //fetch account details by account Id
            AccountService.getAccountDetail(data.accountId).then(function(result){
              cdtl.caseAccount=result;
            });
          }
          if(data.assetId){
            //fetch asset details
            AssetsService.getAssetDetail(data.assetId).then(function(result){
              cdtl.caseAsset=result;
            });
          }
          $log.info('Case detail from controller', data);
	      });
	    }
      /*
      fetch Accountlist to show in dropdown in edit mode
     */
     cdtl.getAccounts = function(){
       let promise = AccountService.getAccounts();
       promise.then(function (result) {
         cdtl.accounts = result;
       });
     }
     //click on edit case detail fetch accounts create copy of case and account details to restore view on click of cancel
     cdtl.editCaseDtl = function(){
       cdtl.editCase = {};
       cdtl.getAccounts();
       cdtl.assets=[];
       let promise = AssetsService.getAssetsByAccount(cdtl.caseAccount.id);
         promise.then(function (result){
           cdtl.assets = result;
         });
       cdtl.editCase.caseDetail = angular.copy(cdtl.caseDetail);
       cdtl.editCase.caseAccount = angular.copy(cdtl.caseAccount);
       cdtl.editCase.caseAsset = angular.copy(cdtl.caseAsset);
       cdtl.editCaseDetail = true;
     }

     //get accounts detail, assets and requesters on change account selection.
     cdtl.getAccoutDtl=function(account){
       cdtl.caseAsset.id='';
       let promise = AssetsService.getAssetsByAccount(account.id);
       promise.then(function (result){
         cdtl.assets = result;
       });
       cdtl.caseAccount=account;
       cdtl.caseDetail.accountId = cdtl.caseAccount.id
     }
     //fetch asset details on change of asset to show on view
     cdtl.getAssetDtl=function(asset){
       cdtl.caseDetail.assetId =asset.id;
       cdtl.caseAsset = asset;
     };
     // Reset view to non editable mode
     cdtl.cancelEditCaseDtl = function(){
       cdtl.editCaseDetail = false;
       cdtl.caseDetail = angular.copy(cdtl.editCase.caseDetail);
       cdtl.caseAccount = angular.copy(cdtl.editCase.caseAccount);
       cdtl.caseAsset = angular.copy(cdtl.editCase.caseAsset);
       delete cdtl.editCase;
     }
     //on saving changed details
     cdtl.updateEditCaseDtl=function(form){
       if(form.$valid){
         CaseService.editCase(cdtl.caseDetail);
         cdtl.editCaseDetail = false;
       }
     }
      let promise = CaseService.getCaseValues();
      promise.then(function (result) {
        cdtl.values= result;
        $log.info('case values',result);
      });
  });
}(angular));
