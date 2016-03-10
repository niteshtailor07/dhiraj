/* global $*/
((angular) => {
'use strict';

function LoginCtrl($log, $location,
    Restangular, localStorageService, AuthService, toaster) {
  $log.info('loaded login...');
  var lc = this;
  //display settings
  lc.ls = {
    isLogged:false,
    isError:true,
    doneLoading: true
  };

  lc.login = {
    wrong: 'display:none;'
  };

  // already authenticated?
  const token = localStorageService.get('auth');
  if(token){
      $log.info('existing token found: ', token);
      $location.path('/onboarding');
  }

  // LoginMe:
  lc.auth = () => {
    $log.info('login.username: ', lc.login.username);
    $log.info('login.password: ', lc.login.password);

    if(lc.login.username && lc.login.password){
      // run AuthService
      const promise = AuthService.login(lc.login);
      $log.info('promise2: ', promise);
      if(promise){
        promise.then((payload) => {
          $log.info('route w/ payload: ', payload);
          // SAVE TO LOCAL
          if(payload){
            localStorageService.set('userType', payload.userType);
            localStorageService.set('permissions', payload.permissions);
          }
          /*
permissions: "onboarding:create,update,delete,view;case:create,update,delete,view;user:create,update,delete,view;asset:create,update,delete,view;account:create,update,delete,view"

userType: "CEO"
          */
          toaster.pop('info', 'Welcome', lc.login.username);
          $location.path('/onboarding');//redirect to main page
        });
      }
    }
    else{
      $log.error('bad creds...');
      toaster.pop('error', 'Auth Error:', 'Bad credentials.');
      lc.ls.isError = false;
    }
  };

}

angular
  .module('tCRMAPP')
  .controller('LoginCtrl', LoginCtrl);

}(angular));
