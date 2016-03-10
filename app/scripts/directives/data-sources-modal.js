((angular) => {
'use strict';
    var sourcesModal = function () {
      return {
          restrict: 'EA', //E = element, A = attribute, C = class, M = comment
          replace: true,
          scope:{
            selDataSource:'=',
            standardObject:'='
          },
          // Will allow a component to have its properties bound to the controller, rather than to scope
          controllerAs:'addDataSourceCtrl',
          // Identifier name for a reference to the controller in the directive's scope
          bindToController:true,
          controller: function($log,filterFilter,OnboardingService,$timeout){
           let addDataSourceCtrl=this;
           addDataSourceCtrl.testConnection=function(form){
             if(!addDataSourceCtrl.selDataSource.status){
               let promise=  OnboardingService.connect(addDataSourceCtrl.selDataSource);
               promise.then(function (result) {
                  //$log.info('addDataSourceCtrl ----------- '+JSON.stringify(  addDataSourceCtrl.selDataSource));
                  console.log(result)
                  if(result.isActive){                    
                    addDataSourceCtrl.alert='alert-success';
                    addDataSourceCtrl.selDataSource=result;
                  }else{
                    addDataSourceCtrl.alert='alert-danger';
                  }
                  addDataSourceCtrl.message=result.message;
                });
              }
            };
            //Call service to import what all to be imported form datasource on selection
            addDataSourceCtrl.import= function(){
              let promise=OnboardingService.updateStandardObject(addDataSourceCtrl.standardObject);
              promise.then(function (result) {
                $('#dataSourcesModal').modal('hide');
                $timeout(function() {
                  angular.element('#nextProduct').triggerHandler('click');
                }, 500);
               });

            };
            //closing popup and reseting file feild
            addDataSourceCtrl.close= function(){
              $('#dataSourcesModal').modal('hide');
              delete addDataSourceCtrl.message;
            };
          }, //Embed a custom controller in the directive
          link: function(scope, element, attrs) {//DOM manipulation
              // concatenating the directory to the ver attr to select the correct excerpt for the day
              console.log('attrs.filename: ', attrs.filename);

              scope.contentUrl = 'views/onboarding/partials/steps/' + attrs.filename + '.html';
              attrs.$observe('filename',function(v){
                  scope.contentUrl = 'views/onboarding/partials/steps/' +v+ '.html';
              });

          },
          template: '<div ng-include="contentUrl"></div>'
          //templateUrl: contentUrl,//'views/partials/create-new.html',
      };
    };

    angular.module('tCRMAPP')
        .directive('sourcesModal', sourcesModal);

}(angular));
