'use strict';

/**
 * @ngdoc overview
 * @name tCRMAPP.routes
 * @description
 * # tCRMAPP.routes
 *
 * Routes module of the tCRMAPP application.
 */
angular
  .module('tCRMAPP.routes', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs:'lc'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs:'lc'
      }).when('/dash', {
        templateUrl: 'views/dash.html',
        controller: 'DashCtrl',
        controllerAs:'dc'
      }).when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs:'dbc'
      }).when('/onboarding', {
        templateUrl: 'views/onboarding/index.html',
        controller: 'OnboardingCtrl',
        controllerAs:'oc',
        resolve: {
          'Resolver': 'AuthResolver'
        }
      }).when('/cases',{
        templateUrl: 'views/cases.html',
        controller: 'CasesCtrl',
        controllerAs: 'cc',
        resolve: {
          'Resolver': 'AuthResolver'
        }
      }).when('/createcase',{
        templateUrl: 'views/createcase.html',
        controller: 'CreateCaseCtrl',
        controllerAs: 'ccc'
      }).when('/accounts',{
        templateUrl: 'views/accounts.html',
        controller: 'AccountCtrl',
        controllerAs: 'acc'
      }).when('/accountdetail/:id',{
        templateUrl: 'views/accountdetail.html',
        controller: 'AccountDetailCtrl',
        controllerAs: 'acdtl'
      }).when('/casedetail/:id',{
        templateUrl: 'views/casedetail.html',
        controller: 'CaseDetailCtrl',
        controllerAs: 'cdtl'
      }).otherwise({
        redirectTo: '/'
      });
  });
