/* global $*/
((angular) => {
'use strict';

function ObProductsCtrl($log, $scope,$rootScope, ProductServices) {
   let ob_pc = this;
   ob_pc.products= [];

   console.log('ObProductsCtrl');

   ob_pc.columnDefs =
    [
      {headerName: "Product Code", field: "productCode"},
      {headerName: "Product Name", field: "productName"},
      {headerName: "Product Description", field: "productDescription"},
      {headerName: "Product Family/Category", field: "productCategoryName"},
      {headerName: "SubCategory Name", field: "productSubCategoryName"},
      {headerName: "Unit of Measure", field: "unitOfMeasure"}
    ];

  ob_pc.gridOptions = {
    columnDefs: ob_pc.columnDefs,
    rowData: null,
    enableColResize: true,
    enableSorting: true,
    enableFilter: false,
    rowSelection: 'single',
    onSelectionChanged: onSelectRow,
    ready: function(api) {
            api.sizeColumnsToFit();
        }
  };
  // 
  $scope.$on('getProducts',  function(){
    //ob_pc.gridOptions.api.showLoading(show);
    let promiseAllMetaData= ProductServices.getAllMetaData();
    promiseAllMetaData.then(function (result) {
      //console.log("all MetaData", result);
      let promise= ProductServices.importProducts();
      promise.then(function (result) {
        let innerPromise= ProductServices.getAll();
        innerPromise.then(function (result) {
          ob_pc.products = result;
          //console.log("all products", result);
          ob_pc.gridOptions.api.setRowData(ob_pc.products);
        });
      });
    });    
  });
  //
  $scope.$on('refreshProductList',  function(){
    refreshProductList();
  });
  function refreshProductList(){
    $log.info('refreshProductList'+ob_pc.products);
    let innerPromise= ProductServices.getAll();
    innerPromise.then(function (result) {
      ob_pc.products = result;
      //console.log("all cases", result);
      ob_pc.gridOptions.api.setRowData(ob_pc.products);
    });
  }

  // function getAllMetaData(){
  //   let promiseAllMetaData= ProductServices.getAllMetaData();
  //   promiseAllMetaData.then(function (result) {
  //     console.log("all MetaData", result);
  //   });
  // }

  /*Open Product popup and assign Category to dropdown*/
  ob_pc.openCreatePopup= function(){
    let promise =ProductServices.getProductCategory();
    promise.then(function (result) {
      console.log(result);
      ob_pc.productCategories = result;
    });
    ob_pc.product={};
  };

  ob_pc.openEditPopup= function(){
    ob_pc.productCategories ={};
    ob_pc.productSubCategories={};
    if(!_.isEmpty(ob_pc.product)){
      openEdiPopup();
      let promise =ProductServices.getProductCategory();
      promise.then(function (result) {
        ob_pc.productCategories = result;
      });
      if(ob_pc.product.productCategoryId){
        ProductServices.getProductSubCategory(ob_pc.product.productCategoryId).then(function (result) {
          ob_pc.productSubCategories = result;
        });
      }
    }
  };
  ob_pc.deleteProduct= function() {
    if (!_.isEmpty(ob_pc.product)) {
      let promise=ProductServices.remove(ob_pc.product);
      promise.then(function (result) {
        refreshProductList();
        ob_pc.product = {};
      });
    }
  }
  function onSelectRow() {
    let rows=ob_pc.gridOptions.api.getSelectedRows();
    ob_pc.product =rows && rows.length>0?rows[0]:null;
  }
  function openEdiPopup(){
    $('#editProductModal').modal('show');
  };
  ob_pc.getAccounts= function(){
    $rootScope.$broadcast('getAccounts');
  }
/*
=======
   ob_pc.deleteProduct = deleteProduct;
   ob_pc.columnDefs = [
    {headerName: "Product Code", field: "product_code"},
    {headerName: "Product Name", field: "product_name"},
    {headerName: "Product Description", field: "product_desc"},
    {headerName: "Product Category", field: "product_cat"}
  ];
  ob_pc.gridOptions = {
    columnDefs: ob_pc.columnDefs,
    rowData: ob_pc.products,
    rowHeight: 22,
    rowSelection: 'single',
    onSelectionChanged: onSelectRow,
    onGridReady: function() {
      //ob_pc.gridOptions.columnApi.sizeColumnsToFit();
    }
  };

  init();

  function init() {
    getProducts();
  }

  function getProducts() {
    let promise = ProductServices.getAll();
    promise.then(function (res) {
      ob_pc.products = res;
      ob_pc.gridOptions.api.setRowData(ob_pc.products);
    });
  }

  function deleteProduct() {
    if (!_.isEmpty(product)) {
      ProductServices.remove(product);
      product = {};
    }
  }

  function onSelectRow() {
    product = ob_pc.gridOptions.api.getSelectedRows();
  }

   $scope.$on("products:updated", function() {
     getProducts();
   });
>>>>>>> snapshot_poc_fall_dev
*/
}

angular
  .module('tCRMAPP')
  .controller('ObProductsCtrl', ObProductsCtrl);
}(angular));
