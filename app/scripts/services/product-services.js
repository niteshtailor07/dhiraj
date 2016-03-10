((angular) => {
  'use strict';

  function ProductServices($q, $log,Restangular,toaster) {
    let products = [];

    let services = {
      add: add,
      remove: remove,
      getAll: getAll,
      edit: edit,
      importProducts:importProducts,
      getProductCategory:getProductCategory,
      getProductSubCategory:getProductSubCategory,
      getAllMetaData:getAllMetaData
    };

    return services;

    /*
      Create (Add New Product)
      URL- http://103.21.53.11:8389/product
      Action Type -Post
      Request Header -Authorization,content-Type,Accept
      Content-Type - application/json
      Accept - application/json
    */
    function add(product) {
      return products.post(product).then((response) =>{
          toaster.pop('success', 'Product added.');
          return product;
        }, function(err) {
          toaster.pop('error', 'Api error.','error in creating product.');
          return err;
        });
    }

    /*
      GET (Products)
      URL- http://103.21.53.11:8389/sfdc/importproducts
      Action Type -GET
      Request Header -Authorization,content-Type,Accept
      Content-Type - application/json
      Accept - application/json
    */
    function getAll() {
      return Restangular.all('product').getList().then((data) =>{
        products=data;
        return data;
      }, function(err) {
        toaster.pop('error', 'Api error.', 'error connect to api to fetching product.');
      });
    }

    function getAllMetaData() {
      return Restangular.all('sfdc/importallmetadata').getList().then((data) =>{
        //console.log("Importallmetadata", data)
        return data;
      }, function(err) {
        toaster.pop('error', 'Api error.', 'error connect to api to fetching product.');
      });
    }

    /*
      Update (Product)
      URL- http://103.21.53.11:8389/product
      Action Type -PUT
      Data - Product Object
      Request Header -Authorization,content-Type,Accept
      Content-Type - application/json
      Accept - application/json
    */
    function edit(product) {
      let productCopy=Restangular.copy(product);
      delete productCopy.creationDate;
      delete productCopy.lastModifiedDate;
      delete productCopy.productSubCategoryName;
      delete productCopy.productCategoryName;
      return productCopy.put().then((response) =>{
          toaster.pop('success', 'Product updated.');
          return response;
        }, function(err) {
          toaster.pop('error', 'Api error.','error in editing product');
          return err;
        });
    }

    /*
      delete (Product)
      URL- http://103.21.53.11:8389/product/{id}
      Action Type -Delete
      Data - Product Object
      Request Header -Authorization,content-Type,Accept
      Content-Type - application/json
      Accept - application/json
    */
    function remove(product) {
      return product.customDELETE(product.productId,undefined,{'content-Type': 'application/json'}).then((response) =>{
          toaster.pop('success', 'Product deleted.');
          return response;
        }, function(err) {
          toaster.pop('error', 'Api error.','error in deleting product');
          return err;
      });
    }

    /*
      Import Products  (Import Products from Data Source)
      URL- http://103.21.53.11:8389/sfdc/importproducts
      Action Type -GET
      Request Header -Authorization,content-Type,Accept
      Content-Type - application/json
      Accept - application/json
    */
    function importProducts(){
      return Restangular.all('sfdc').customGET('importproducts').then((data) =>{
        $log.info('success', 'Products Imported');
        return data;
      }, function(err) {
        toaster.pop('error', 'Api error.', 'error connect to api to import product.');
      });
    }

    /*
      GET Product Category(Product Category)
      URL- http://103.21.53.11:8389/product/category
      Action Type -GET
      Request Header -Authorization,content-Type,Accept
      Content-Type - application/json
      Accept - application/json
    */
    function getProductCategory(){
      return Restangular.all('product/category').getList().then((data) =>{
        $log.info('success', 'Products category fetched');
        return data;
      }, function(err) {
        toaster.pop('error', 'Api error.', 'error connect to api to fetching product category.');
      });
    }
    /*
      GET Product Sub Category(Product Sub Category)
      URL- http://103.21.53.11:8389/product/category/{id}
      Action Type -GET
      Request Header -Authorization,content-Type,Accept
      Content-Type - application/json
      Accept - application/json
    */
    function getProductSubCategory(id){
      return Restangular.all('product/category/sub').customGETLIST(id).then((data) =>{
        return data;
      }, function(err) {
        toaster.pop('error', 'Api error.', 'error connect to api.');
        return err;
      });
    }

  }

angular.module('tCRMAPP')
  .factory('ProductServices', ProductServices);

}(angular));
