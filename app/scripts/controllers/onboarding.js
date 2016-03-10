/* global $*/
((angular) => {
'use strict';

function OnboardingCtrl($log, $scope, AuthService, AccountService, CaseService, PortletService) {
   let oc = this;
   $log.info('OnboardingCtrl...');

   // Get auth object
   const authObject = AuthService.getAuth();
   if(authObject){
     $log.info('authObject:', authObject);
     const username = atob(authObject.auth.split(' ')[1]);//dhirajsingh@lmsin.com:12345
     oc.username  = username.split(':')[0];
     $log.info('oc.username', oc.username);
   }

}

angular
  .module('tCRMAPP')
  .controller('OnboardingCtrl', OnboardingCtrl);
}(angular));
