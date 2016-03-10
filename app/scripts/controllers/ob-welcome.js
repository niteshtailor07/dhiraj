/* global $*/
((angular) => {
'use strict';

function WelcomeCtrl($log, $sce,OnboardingService, toaster) {
   let ob_wel = this;
   $log.info('WelcomeCtrl...');

  function getCustomer(){
    let promise = OnboardingService.getCustomer();
    promise.then(function (result) {
      ob_wel.customer = result;
      $log.info("getCustomer ----------- "+JSON.stringify(ob_wel.customer));
    });
  }

  getCustomer();

}

angular
  .module('tCRMAPP')
  .controller('WelcomeCtrl', WelcomeCtrl);
}(angular));
