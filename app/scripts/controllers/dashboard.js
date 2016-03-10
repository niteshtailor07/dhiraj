/* global $*/
((angular) => {
'use strict';

/**
 * @ngdoc function
 * @name tCRMAPP.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the app.
 */

function DashboardCtrl($log, $scope, AccountService, CaseService, PortletService) {
   let dbc = this;
   $log.info('DashboardCtrl...');

   dbc.dashboard = {};
   dbc.activeTab;
   dbc.getPortlets = getPortlets;
   init();

   $scope.$on('portlet:created', function (event, args) {
     //console.log('recieving broadcast',args.id);
     getPortlets(args.id);
   });

   function init() {
     dbc.activeTab = 0;
     getPortlets(0);
   }

   function getPortlets(i) {
     PortletService.getPortlets(i)
      .then(function(result) {
        //console.log('getPortlets>result', result);
        dbc.activeTab = i;
        dbc.dashboard = result;
      });
   }
}

angular
  .module('tCRMAPP')
  .controller('DashboardCtrl', DashboardCtrl);
}(angular));
