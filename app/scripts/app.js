'use strict';

/**
 * @ngdoc overview
 * @name anHeatmapApp
 * @description
 * # anHeatmapApp
 *
 * Main module of the application.
 */
angular
  .module('tCRMAPP', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.layout',
    'restangular',
    'LocalStorageModule',
    'toaster',
    'angucomplete-alt',
    'ngFileUpload',
    'agGrid',
    'mgo-angular-wizard',
    'tCRMAPP.routes',  // ROUTES
    'tCRMAPP.configs', // CONFIGS
    'tCRMAPP.filters', // FILTERS
  ]);

  /*
  .factory('interceptor',
        function($injector) {
         return {
            request: function(httpConfig) {
              var AuthService= $injector.get("AuthService");
              var token = AuthService.getCredentials();
              if (token) {
                httpConfig.headers['authorization'] = token;
              }
              return httpConfig;
            }
          };
      })
 .config(['$httpProvider', function($httpProvider) {
   $httpProvider.interceptors.push('interceptor');
 }]).
  */
