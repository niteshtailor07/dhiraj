((angular) => {
'use strict';
    var editProductModal = function () {
      return {
          restrict: 'EA', //E = element, A = attribute, C = class, M = comment
          replace: true,
          scope:{
            product:'=',
            productCategories:'=',
            productSubCategories:"="
          },
          // Will allow a component to have its properties bound to the controller, rather than to scope
          controllerAs:'editProductModalCtrl',
          // Identifier name for a reference to the controller in the directive's scope
          bindToController:true,
          controller: function($log,$rootScope,ProductServices){
            let editProductModalCtrl=this;
            //fetch sub category on category change
            editProductModalCtrl.getSubType=function(id){
              let promise=ProductServices.getProductSubCategory(id);
              promise.then(function (result) {
                editProductModalCtrl.productSubCategories = result;
              });
            };
            //closing popup and reseting file feild
            editProductModalCtrl.close= function(){
              $('#editProductModal').modal('hide');
            };
            //edit product
            editProductModalCtrl.editProduct= function(){
              let promise= ProductServices.edit(editProductModalCtrl.product);
              promise.then(function(response){
                $rootScope.$broadcast('refreshProductList');
                editProductModalCtrl.close();
              });
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
        .directive('editProductModal', editProductModal);

}(angular));
