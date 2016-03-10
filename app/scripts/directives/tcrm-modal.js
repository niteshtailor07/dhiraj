((angular) => {
'use strict';

    var tcrmModal = function () {
      return {
          restrict: 'EA', //E = element, A = attribute, C = class, M = comment
          replace: true,
          scope: {
          //@ reads the attribute value as a string, = provides two-way binding, & works with functions
              case: '=',
              values: '=',
              accounts: '=',
              requesters:"=",
              selectedAsset:"=",
              selectedAccount:"="
          },
          // Will allow a component to have its properties bound to the controller, rather than to scope
          bindToController: true,
          // Identifier name for a reference to the controller in the directive's scope
          controllerAs:"createCaseCtrl",
          controller: function($log,CaseService,AccountService,AssetsService){
            let createCaseCtrl=this;
            createCaseCtrl.getAssetsAndRequesters= function(accId){
              let promise = AssetsService.getAssetsByAccount(accId);
              console.log("accountid" , accId );
              //createCaseCtrl.assets=[];
              promise.then(function (result) {
                createCaseCtrl.assets = result;
                $log.info(result)
              });
              createCaseCtrl.requesters=[];
              AccountService.getRequesters(accId).then(function(result){
                createCaseCtrl.requesters=result;
              });
              createCaseCtrl.selectedAccount=null;
              createCaseCtrl.selectedAsset=null;
              AccountService.getAccountDetail(accId).then(function(result){
                createCaseCtrl.selectedAccount=result;
              });
            }
            //reads the values in case on create-new model popup
            createCaseCtrl.createCase= function(form){
              if(form.$valid){
                createCaseCtrl.case.caseStatus=1;//status 1 is for open
                console.log(createCaseCtrl.uploadfiles+" create case" );
                console.log(createCaseCtrl.case+" create case" );
                CaseService.createCase(createCaseCtrl.case,createCaseCtrl.uploadfiles);
                //closing popup and reseting file feild
                $('#gridSystemModal').modal('hide');
                $("#createCaseFile").val('');
                createCaseCtrl.uploadfiles=null;
              }

              /*let promise = CaseService.getCases();
              promise.then(function (result) {
              $parent.cases = result;//get parent scope to refresh latest
                $log.info('refresh case list.', $parent.cases);
              });*/
            };
            //closing popup and reseting file feild
            createCaseCtrl.close= function(){
              $('#gridSystemModal').modal('hide');
              $("#createCaseFile").val('');
              createCaseCtrl.uploadfiles=null;
            };
            // assign selected files to uploaded files
            createCaseCtrl.setFiles = function(element) {
              createCaseCtrl.uploadfiles= element.files;
            };
            createCaseCtrl.clearAttachment= function () {
                $("#createCaseFile").val('');
                createCaseCtrl.uploadfiles=null;
            };
            createCaseCtrl.getAssetDetail =function(assetId){
              createCaseCtrl.selectedAsset=null;
              AssetsService.getAssetDetail(assetId).then(function(result){
                createCaseCtrl.selectedAsset=result;
              });
            };

          }, //Embed a custom controller in the directive
          link: function(scope, element, attrs) {//DOM manipulation
              // concatenating the directory to the ver attr to select the correct excerpt for the day
              console.log('attrs.filename: ', attrs.filename);

              scope.contentUrl = 'views/partials/' + attrs.filename + '.html';
              attrs.$observe("filename",function(v){
                  scope.contentUrl = 'views/partials/' +v+ '.html';
              });
          },
          template: '<div ng-include="contentUrl"></div>'
          //templateUrl: contentUrl,//'views/partials/create-new.html',
      };
    };

    angular.module('tCRMAPP')
        .directive('tcrmModal', tcrmModal);

}(angular));
