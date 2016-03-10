((angular) => {
  'use strict';

  function productModal() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/directive/product-modal.html',
      scope: {
        //@ reads the attribute value as a string,
        //= provides two-way binding,
        //& works with functions
      },

      link: linkFunc,
      controller: ProductModalCtrl,
      controllerAs: 'ob_pm',
      bindToController: true
    };

    return directive;

    function linkFunc(scope, element, attrs, ob_pm) {

    }
  }

  ProductModalCtrl.$inject = ['$scope', 'ProductServices'];

  function ProductModalCtrl($scope, ProductServices) {
    var ob_pm = this;
    ob_pm.product = {};

    ob_pm.add = function() {
      if (ob_pm.productForm.$valid) {
        var temp = angular.copy(ob_pm.product);
        ProductServices.add(temp);
        ob_pm.product = {};
        $("#productModal").modal("hide");
        $("#productModal").val("");
      }
    }
  }

  angular.module('tCRMAPP')
    .directive('productModal', productModal);
}(angular));
