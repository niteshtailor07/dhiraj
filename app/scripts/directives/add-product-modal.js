((angular) => {
'use strict';
    var addProductModal = function () {
      return {
          restrict: 'EA', //E = element, A = attribute, C = class, M = comment
          replace: true,
          scope:{
            product:'=',
            productCategories:'='
          },
          // Will allow a component to have its properties bound to the controller, rather than to scope
          controllerAs:'addProductModalCtrl',
          // Identifier name for a reference to the controller in the directive's scope
          bindToController:true,
          controller: function($log,$rootScope,ProductServices){
            let addProductModalCtrl=this;
            addProductModalCtrl.getSubType=function(id){
              let promise=ProductServices.getProductSubCategory(id);
              promise.then(function (result) {
                addProductModalCtrl.productSubCategories = result;
              });
            };
            addProductModalCtrl.addProduct=function(form){
              if(form.$valid){
                let promise=ProductServices.add(addProductModalCtrl.product);
                promise.then(function (result) {
                    $rootScope.$broadcast('refreshProductList');
                    $('#addProductModal').modal('hide');
                });
              }
            };
            //closing popup and reseting file feild
            addProductModalCtrl.close= function(){
              $('#addProductModal').modal('hide');
            };
          }, //Embed a custom controller in the directive
          link: function(scope, element, attrs) {//DOM manipulation
              // concatenating the directory to the ver attr to select the correct excerpt for the day
              console.log('attrs.filename: ', attrs.filename);

              scope.contentUrl = 'views/onboarding/partials/steps/' + attrs.filename + '.html';
              attrs.$observe("filename",function(v){
                  scope.contentUrl = 'views/onboarding/partials/steps/' +v+ '.html';
              });

          },
          template: '<div ng-include="contentUrl"></div>'
          //templateUrl: contentUrl,//'views/partials/create-new.html',
      };
    };

    angular.module('tCRMAPP')
        .directive('addProductModal', addProductModal);

}(angular));
