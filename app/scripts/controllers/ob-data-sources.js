/* global $*/
((angular) => {
'use strict';

function DataSourcesCtrl($log,$rootScope,OnboardingService) {
   let ob_dsc = this;
   ob_dsc.selDataSource={};
   $log.info('DataSourcesCtrl...');
   function getDatasource(){
     let promise = OnboardingService.getDatasource();
     promise.then(function (result) {
       ob_dsc.datasources = result;
       $log.info('getCustomer -----------'+JSON.stringify(result));
     });
   }

   ob_dsc.setDatasource= function(datasource){
     ob_dsc.selDataSource=datasource;
     if(!datasource.isActive){
       ob_dsc.selDataSource.hostURL=datasource.defaultHostUrl;
    }
    let promise = OnboardingService.getStandardObject(ob_dsc.selDataSource.id);
    promise.then(function (result) {
      ob_dsc.standardObject = result;
    });
   }
   getDatasource();
   ob_dsc.getProducts=function(){
     $rootScope.$broadcast('getProducts');
   };
}

angular
  .module('tCRMAPP')
  .controller('DataSourcesCtrl', DataSourcesCtrl);
}(angular));
