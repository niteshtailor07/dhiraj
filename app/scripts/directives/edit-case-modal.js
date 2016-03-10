((angular) => {
'use strict';
    var editCaseModal = function () {
      return {
          restrict: 'EA', //E = element, A = attribute, C = class, M = comment
          replace: true,
          scope: {
          //@ reads the attribute value as a string, = provides two-way binding, & works with functions
              case: '=selectedCase',
              caseCopy:"=caseCopy",
              values: '=',
              accounts: '=',
              requesters:"=",
              assets: "=",
              uploadfiles:"=",
              selectedAsset:"=",
              selectedAccount:"="
          },
          // Will allow a component to have its properties bound to the controller, rather than to scope
          controllerAs:'editCaseCtrl',
          // Identifier name for a reference to the controller in the directive's scope
          bindToController:true,
          controller: function($scope,$rootScope,$log,CaseService,AccountService,AssetsService){
            let editCaseCtrl=this;
            editCaseCtrl.getAssetsAndRequesters= function(accId){
              let promise = AssetsService.getAssetsByAccount(accId);
              promise.then(function (result) {
                editCaseCtrl.assets = result;
              });
              editCaseCtrl.requesters=[];
              AccountService.getRequesters(accId).then(function(result){
                editCaseCtrl.requesters=result;
              });
              editCaseCtrl.selectedAccount=null;
              editCaseCtrl.selectedAsset=null;
              AccountService.getAccountDetail(accId).then(function(result){
                editCaseCtrl.selectedAccount=result;
              });
            }
            //reads the values in case on create-new model popup
            editCaseCtrl.editCase = function(form){
              if(form.$valid){
                console.log(editCaseCtrl.case)
                CaseService.editCase(editCaseCtrl.case,editCaseCtrl.selectedFile,editCaseCtrl.caseCopy).then(function(resp){
                    $rootScope.$broadcast("getUpdatedCases");
                    $log.info('edit case: ',resp);
                    editCaseCtrl.case=resp;
                  });
                  //closing popup and reseting file feild
                  $('#editCaseModal').modal('hide');
                  $("#editCaseFile").val('');
                  editCaseCtrl.selectedFile=null;
              }
              };
              //closing popup and reseting file feild
              editCaseCtrl.close= function(){
                $('#editCaseModal').modal('hide');
                $("#editCaseFile").val('');
                editCaseCtrl.selectedFile=null;
                editCaseCtrl.case.subject=editCaseCtrl.caseCopy.subject;
              };
            // assign selected files to uploaded files
            editCaseCtrl.setFiles = function(element) {
              editCaseCtrl.selectedFile= element.files;
            };
            editCaseCtrl.clearAttachment= function () {
               $("#editCaseFile").val('');
               editCaseCtrl.selectedFile=null;
            };
            editCaseCtrl.getAssetDetail =function(assetId){
              editCaseCtrl.selectedAsset=null;
              AssetsService.getAssetDetail(assetId).then(function(result){
                editCaseCtrl.selectedAsset=result;
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
        .directive('editCaseModal', editCaseModal);

}(angular));
