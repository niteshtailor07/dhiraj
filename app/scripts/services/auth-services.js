((angular) => {
'use strict';

/**
 * @ngdoc overview
 * @name tCRMAPP
 * @description
 * Auth module of the tCRMAPP application.
 * An existing active token is required to stay in a session. If none is provided, user will
 * be routed out to login screen. If this is the first time authenticating, user is required to
 * provide valid credentials and a new token is generated for the session untill token expired.
 */
angular
  .module('tCRMAPP').factory('AuthService', (
    Restangular,
    $log,
    $location,
    localStorageService,
    toaster) => {
    class Service {
      constructor() {
        // DEFAULT AUTH GOES HERE
        //this.restangular = Restangular.withConfig( (RestangularConfigurer) => {
        //  RestangularConfigurer.setBaseUrl('http://103.21.53.11:8389');
        //});
      }
      initialize() {
        //check against the local session storage for existing token
        const token = localStorageService.get('auth');
        $log.info('Existing token? ', token);

        this.username = '';
        if(!token){
          this.loggedIn = false;
          $log.error('No token. Route to login page. ');
          toaster.pop('error', 'Auth Error:', 'No token or it has expired. Redirecting to login page.');
          $location.path('/');
        }
        else {
          $log.info('atob() token: ', atob(token.split(' ')[1]));//dhirajsingh@lmsin.com:12345
          this.loggedIn = true;
        }
        return token;
      }

      login(credentials) {//dhirajsingh@lmsin.com, 12345
        var self = this;
        let headers={};
        headers.authorization = "Basic "+ btoa(credentials.username + ":" + credentials.password);
        return Restangular.all("user").customGET("login", undefined, headers).then((data) => {
          localStorageService.set('auth', headers.authorization);
          self.loggedIn = true;
          toaster.pop('success', 'Auth success', 'Connection approved.');
          $log.info('data payload:', data);
          return data;
        }, function failure(err, status) {
          self.loggedIn = false;
          self.username = '';
          $log.error('error authenticating to api ' + err);
          toaster.pop('error', 'Auth Error:', 'error authenticating to api ' + err);
          return err;
        });
      }

      logout() {
        this.loggedIn = false;
        this.username = '';
        localStorageService.remove('auth');
        //TODO clean from header
        $log.info('successfully logged out! ');
        $location.path('/');//redirect to login page
      }

      getAuth() {
        if (this.loggedIn) {
          return {
            'auth' : localStorageService.get('auth'),
            'userType': localStorageService.get('userType'),
            'permissions': localStorageService.get('permissions'),
          };
        }
        return null;
      }
    }
    let svc = new Service();
    return svc;
  }
).factory('AuthResolver', ($log, AuthService) => {
  $log.info('Waiting for authservice to initialize');
  return AuthService.initialize();
});
}(angular));

/*'use strict';

function AuthService($log, Restangular,StorageService, toaster){
  class Service {
      constructor() {
        $log.info('auth service');
      }
      initialize(){
      }
      getCredentials(){
        return StorageService.get('authorization');
      };
      setCredentials(value){
        StorageService.put('authorization',value);
      };

      1)Authentication
        URL- BASE_URI/user/login
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json

      authenticate(credentials) {
        let headers={};
        headers.authorization= "Basic "+ btoa(credentials.username + ":" + credentials.password);
        return Restangular.all("user").customGET("login",undefined,headers).then((data) => {
          this.setCredentials(headers.authorization);
          toaster.pop('success', 'Auth success', 'Connection approved.');
          return data;
        }, function(err,status) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
          $log.info("err",err);
          return err;
        });
    };
  }
  let svc= new Service();
  return svc;
};
angular.module('tCRMAPP').factory('AuthService',AuthService);

*/
