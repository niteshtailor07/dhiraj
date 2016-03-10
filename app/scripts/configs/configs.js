'use strict';

/**
 * @ngdoc overview
 * @name tCRMAPP.configs
 * @description
 * # tCRMAPP.configs
 *
 * configs module of the tCRMAPP application.
 */
angular.module('tCRMAPP.configs', ['LocalStorageModule']).config(function(localStorageServiceProvider) {
  localStorageServiceProvider
  .setPrefix('tcrm')  //prefix
  .setStorageType('sessionStorage') //session type
  .setNotify(true, true); //notify on setItem & removeItem
}).config(function(RestangularProvider) {
    // Global configuration for Restangular
    RestangularProvider.setBaseUrl('http://103.21.53.11:8389');
    //RestangularProvider.setRequestSuffix('.json');
    // Use Request interceptor
    /*RestangularProvider.setRequestInterceptor(function(element, operation, route, url) {
      //deleting extra values
      if(element && element.extra){
        delete element.extra;
      }
      return element;
    });*/

  }).factory('interceptor',
  function(localStorageService) {
   console.log('interceptor...');
   return {
      request: function(httpConfig) {
        const token = localStorageService.get('auth');
        if(token){
          httpConfig.headers['authorization'] = token;
        }
        return httpConfig;
      }
    };
})
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('interceptor');
}]);
