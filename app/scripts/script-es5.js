'use strict';

/**
 * @ngdoc overview
 * @name anHeatmapApp
 * @description
 * # anHeatmapApp
 *
 * Main module of the application.
 */

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

angular.module('tCRMAPP', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.layout', 'restangular', 'LocalStorageModule', 'toaster', 'angucomplete-alt', 'ngFileUpload', 'agGrid', 'mgo-angular-wizard', 'tCRMAPP.routes', // ROUTES
'tCRMAPP.configs', // CONFIGS
'tCRMAPP.filters']);

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

// FILTERS
'use strict';

function AccountService($log, Restangular, toaster, $q) {
  var Service = (function () {
    function Service() {
      _classCallCheck(this, Service);

      //Restangular.setBaseUrl('http://103.21.53.11:8389');
      $log.info('account service');
    }

    _createClass(Service, [{
      key: 'initialize',
      value: function initialize() {}

      /*
      1)Retrieval
        URL- http://103.21.53.11:8389/accounts/
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getAccounts',
      value: function getAccounts() {
        $log.info('AccountsService::getAccounts');
        return Restangular.all('accounts').getList().then(function (data) {
          $log.info('success', 'Retrieved accounts.', data.length);
          toaster.pop('success', 'Retrieved accounts');
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      /*
      2)Retrieve requesters by account
        URL- http://103.21.53.11:8389/user/query?accountid={accountId}
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getRequesters',
      value: function getRequesters(accountId) {
        $log.info('AccountsService::getRequesters');
        return Restangular.one('user/requester', accountId).get().then(function (data) {
          $log.info('success', 'Retrieved requesters.', data);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error in fetching requesters.');
        });
      }

      /*
      3)Retrieve Accounts Details
        URL- http://103.21.53.11:8389/user/accountid/{accountId}
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getAccountDetail',
      value: function getAccountDetail(id) {
        return Restangular.one('accounts', id).get().then(function (data) {
          console.log('return single account based on id from service', data);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api');
        });
      }

      /*
      4)Import Accounts From SFDC
        URL- http://103.21.53.11:8389/sfdc/importaccounts
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'importAccounts',
      value: function importAccounts() {
        return Restangular.all('sfdc').customGET('importaccounts').then(function (data) {
          $log.info('success', 'Account Imported');
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api to import account.');
        });
      }

      /*
      4)Retrieval Onboarding
        URL- http://103.21.53.11:8389/accounts/list
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getAccountsList',
      value: function getAccountsList() {
        $log.info('AccountsService::getAccounts');
        return Restangular.all('accounts/list').getList().then(function (data) {
          toaster.pop('success', 'Retrieved accounts');
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }
    }]);

    return Service;
  })();

  var svc = new Service();
  return svc;
}
angular.module('tCRMAPP').factory('AccountService', AccountService);

'use strict';

function AssetsService($log, Restangular, toaster) {
  var Service = (function () {
    function Service() {
      _classCallCheck(this, Service);

      //Restangular.setBaseUrl('http://103.21.53.11:8389');
      $log.info('Assets service');
    }

    _createClass(Service, [{
      key: 'initialize',
      value: function initialize() {}

      /*
      1)Retrieval
        URL- http://103.21.53.11:8389/assets/
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getAssets',
      value: function getAssets() {
        $log.info('AssetsService::getAccounts');
        return Restangular.all('assets').getList().then(function (data) {
          $log.info('success', 'Retrieved accounts.', data.length);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      /*
      2)Retrieval
        URL- http://103.21.53.11:8389/assets/
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getAssetsByAccount',
      value: function getAssetsByAccount(accId) {
        return Restangular.all("assets").customGETLIST("query", { accountno: accId }).then(function (data) {
          $log.info('success', 'Retrieved asset.');
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }
    }, {
      key: 'getAssetDetail',

      /*
      3)Retrieve asset details
        URL- http://103.21.53.11:8389/assets/{{assetId}}
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
      value: function getAssetDetail(id) {
        return Restangular.one('assets', id).get().then(function (data) {
          console.log('return single assets based on id from service', data);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api');
        });
      }
    }]);

    return Service;
  })();

  var svc = new Service();
  return svc;
}
angular.module('tCRMAPP').factory('AssetsService', AssetsService);

(function (angular) {
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
  angular.module('tCRMAPP').factory('AuthService', function (Restangular, $log, $location, localStorageService, toaster) {
    var Service = (function () {
      function Service() {
        _classCallCheck(this, Service);
      }

      _createClass(Service, [{
        key: 'initialize',

        // DEFAULT AUTH GOES HERE
        //this.restangular = Restangular.withConfig( (RestangularConfigurer) => {
        //  RestangularConfigurer.setBaseUrl('http://103.21.53.11:8389');
        //});
        value: function initialize() {
          //check against the local session storage for existing token
          var token = localStorageService.get('auth');
          $log.info('Existing token? ', token);

          this.username = '';
          if (!token) {
            this.loggedIn = false;
            $log.error('No token. Route to login page. ');
            toaster.pop('error', 'Auth Error:', 'No token or it has expired. Redirecting to login page.');
            $location.path('/');
          } else {
            $log.info('atob() token: ', atob(token.split(' ')[1])); //dhirajsingh@lmsin.com:12345
            this.loggedIn = true;
          }
          return token;
        }
      }, {
        key: 'login',
        value: function login(credentials) {
          //dhirajsingh@lmsin.com, 12345
          var self = this;
          var headers = {};
          headers.authorization = "Basic " + btoa(credentials.username + ":" + credentials.password);
          return Restangular.all("user").customGET("login", undefined, headers).then(function (data) {
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
      }, {
        key: 'logout',
        value: function logout() {
          this.loggedIn = false;
          this.username = '';
          localStorageService.remove('auth');
          //TODO clean from header
          $log.info('successfully logged out! ');
          $location.path('/'); //redirect to login page
        }
      }, {
        key: 'getAuth',
        value: function getAuth() {
          if (this.loggedIn) {
            return {
              'auth': localStorageService.get('auth'),
              'userType': localStorageService.get('userType'),
              'permissions': localStorageService.get('permissions')
            };
          }
          return null;
        }
      }]);

      return Service;
    })();

    var svc = new Service();
    return svc;
  }).factory('AuthResolver', function ($log, AuthService) {
    $log.info('Waiting for authservice to initialize');
    return AuthService.initialize();
  });
})(angular);

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

'use strict';

//const UPLOAD_URL = 'http://103.21.53.11:8389/cases';
var UPLOAD_URL = 'http://cloudia.co.in/cases';

function CaseService($log, Restangular, toaster, Upload) {
  var Service = (function () {
    function Service() {
      _classCallCheck(this, Service);

      //Restangular.setBaseUrl('http://103.21.53.11:8389');
      //$log.info('cases service');
      this.cases = {};
    }

    _createClass(Service, [{
      key: 'initialize',
      value: function initialize() {}

      /*
      1)Retrieval
        URL- http://103.21.53.11:8389/cases/
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getCases',
      value: function getCases(isMyCase) {
        var _this = this;

        return Restangular.all('cases').getList().then(function (data) {
          $log.info('CaseService::getCases data:', data);
          toaster.pop('success', 'Retrieved cases.', data.length);
          if (isMyCase === true) {
            var temp = [];
            temp = _.where(data, { assignedtoUserName: 'Aditya' });
            _this.cases = temp;
          } else {
            _this.cases = data;
          }

          return _this.cases;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      /*
      2)Creation
        URL- http://103.21.53.11:8389/cases/
        Action Type -POST
        Data - Case object
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'createCase',
      value: function createCase(c, selectedFile) {
        var parent = this;
        var fd = new FormData();
        fd.append("data", angular.toJson(c));
        console.log(selectedFile + "  " + selectedFile != undefined);
        if (selectedFile) {
          fd.append("file", selectedFile[0]);
        }
        return this.cases.withHttpConfig({ transformRequest: angular.identity }).customPOST(fd, undefined, undefined, { 'Content-Type': undefined }).then(function (response) {
          toaster.pop('success', 'Case inserted.');
          Restangular.one('cases', response.id).get().then(function (c) {
            console.log('createCase', parent.cases);
            parent.cases.push(c);
          });
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error in creating case');
          return;
        });
      }

      /*
      3)Edit
        URL- http://103.21.53.11:8389/cases/
        Action Type -PUT
        Data - Case object
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'editCase',
      value: function editCase(c, selectedFile, oldValue) {
        var parent = this;
        var fd = new FormData();
        if (c && c.extra) {
          delete c.extra;
        }
        //var cPlain = c.plain()
        //console.log(c)
        fd.append("data", angular.toJson(c));
        console.log(selectedFile + "  " + selectedFile != undefined);
        if (selectedFile) {
          fd.append("file", selectedFile[0]);
        }
        return Restangular.all('cases').withHttpConfig({ transformRequest: angular.identity }).customPUT(fd, undefined, undefined, { 'Content-Type': undefined }).then(function (response) {
          toaster.pop('success', 'Case Updated.');
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error in updating case');
          return;
        });
        /*return c.put().then((response) =>{
            toaster.pop('success', 'Case updated.');
            return c;
          }, function(err) {
            toaster.pop('error', 'Api error.','error in editing case');
            return oldValue;
          });*/
      }

      /*
      4)Retrieval (Values for status, priority,type)
        URL- http://103.21.53.11:8389/cases/values
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getCaseValues',
      value: function getCaseValues() {
        return Restangular.all('cases').customGET("tempdata").then(function (data) {
          $log.info('success', 'Retrieved cases values', data);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      // Get Case Types
    }, {
      key: 'getCaseTypes',
      value: function getCaseTypes() {
        return Restangular.all('cases/picklist/casetype').getList().then(function (data) {
          //$log.info('success', 'Retrieved cases types', data);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      // Get Case Origin
    }, {
      key: 'getCaseOrigin',
      value: function getCaseOrigin() {
        return Restangular.all('cases/picklist/caseorigin').getList().then(function (data) {
          //$log.info('success', 'Retrieved cases types', data);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      // Get Case Severity
    }, {
      key: 'getCaseSeverity',
      value: function getCaseSeverity() {
        return Restangular.all('cases/picklist/casepriority').getList().then(function (data) {
          $log.info('success', 'Retrieved cases Severity', Restangular.stripRestangular(data));
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      /*
      5)Retrieval (Requester)
        URL- http://103.21.53.11:8389/cases/requester
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getRequesters',
      value: function getRequesters() {
        return Restangular.all('cases').customGET("requester").then(function (data) {
          //$log.info('success', 'Retrieved requester');
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      /*
      6)Deletion
        URL- http://103.21.53.11:8389/cases/
        Action Type -Delete
        Request - case
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'deleteCase',
      value: function deleteCase(c) {
        return c.remove().then(function (response) {
          toaster.pop('success', 'Case Deleted.');
          return;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error in deleting case');
          return;
        });
      }

      /*
      7)Free text search
      URL- http://103.21.53.11:8389/solr/cases/{casekey(s)}?[requestParams]
      Action Type -Post
      Request - Solr
      Content-Type - application/json
      Accept - application/json
      */
    }, {
      key: 'searchCases',
      value: function searchCases(freeText, start, end) {
        var _this2 = this;

        return Restangular.all('solr/cases/').customGETLIST(freeText, { freeText: freeText, start: start, end: end }).then(function (data) {
          // $log.info('CaseService::search cases:', data);
          toaster.pop('success', 'Retrieved cases.', data.length);
          _this2.cases = data;
          return _this2.cases;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      /*
      8)Retrieve Case details
        URL- http://103.21.53.11:8389/cases/{{casesId}}
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getCaseDetail',
      value: function getCaseDetail(id) {
        return Restangular.one('cases', id).get().then(function (data) {
          console.log('return single case based on id from service', data);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api');
        });
      }
    }, {
      key: 'assignToMe',

      /*
      9)Case will be assigned to Aditya in backend
        URL- http://103.21.53.11:8389/cases/{{casesId}}
        Action Type -PUT
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
      value: function assignToMe(id) {
        return this.cases.customPUT(undefined, 'assignedto/' + id).then(function (response) {
          toaster.pop('success', 'Case Assigned.');
          return response;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error in updating case');
          return;
        });
      }
    }]);

    return Service;
  })();

  var svc = new Service();
  return svc;
}
angular.module('tCRMAPP').factory('CaseService', CaseService);

'use strict';

function OnboardingService($log, Restangular, toaster) {
  var Service = (function () {
    function Service() {
      _classCallCheck(this, Service);

      $log.info('Onboarding service');
    }

    _createClass(Service, [{
      key: 'initialize',
      value: function initialize() {}

      /*
      1)Retrieval (Customer()
        URL- http://103.21.53.11:8389/customer
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getCustomer',
      value: function getCustomer() {
        return Restangular.one('customer').get().then(function (data) {
          $log.info('success', 'Retrieved customer values' + JSON.stringify(data));
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      /*
      2)create (datasource)
        URL- http://103.21.53.11:8389/datasource
        Action Type -POST
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'connect',
      value: function connect(datasource) {
        return Restangular.one('datasource').customPUT(datasource, undefined, {}, { 'Content-Type': 'application/json' }).then(function (response, status) {
          console.log(response.status);
          if (response.status) {
            toaster.pop('success', response.message);
          } else {
            toaster.pop('error', response.message);
          }
          return response;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error in connecting database');
          return err;
        });
      }

      /*
      3)Retrieval (datasource)
        URL- http://103.21.53.11:8389/datasource
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getDatasource',
      value: function getDatasource() {
        return Restangular.one('datasource').get().then(function (data) {
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      /*
      4)Retrieval (Standard Object)
        URL- http://103.21.53.11:8389/datasource/standardobject
        Action Type -GET
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'getStandardObject',
      value: function getStandardObject(id) {
        return Restangular.all('datasource/standardobject/' + id).getList().then(function (data) {
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }

      /*
      5)Update (Standard Object)
        URL- http://103.21.53.11:8389/datasource/standardobject
        Action Type -PUT
        Request Header -
        Content-Type - application/json
        Accept - application/json
      */
    }, {
      key: 'updateStandardObject',
      value: function updateStandardObject(object) {
        object = Restangular.stripRestangular(object);
        return Restangular.all('datasource/standardobject').customPOST({ customerObjectList: object }).then(function (response) {
          return response;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
          return;
        });
      }

      // Case Management services
    }, {
      key: 'getImportCases',
      value: function getImportCases() {
        return Restangular.one('sfdc/importcases').get().then(function (data) {
          toaster.pop('success', data.message);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }
    }, {
      key: 'getImportCasePriority',
      value: function getImportCasePriority() {
        return Restangular.one('cases/picklist/casepriority').get().then(function (data) {
          //toaster.pop('success', data.message);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }
    }, {
      key: 'getImportCaseStatus',
      value: function getImportCaseStatus() {
        return Restangular.one('cases/picklist/casestatus').get().then(function (data) {
          //toaster.pop('success', data.message);
          return data;
        }, function (err) {
          toaster.pop('error', 'Api error.', 'error connect to api.');
        });
      }
    }]);

    return Service;
  })();

  var svc = new Service();
  return svc;
}
angular.module('tCRMAPP').factory('OnboardingService', OnboardingService);

(function (angular) {
  'use strict';

  function PortletService($log, $q, $rootScope) {
    var dashboard = [{
      accountType: 'all',
      user: 'longh',
      name: 'overview',
      id: 'dash_1',
      portlets: [{
        id: 'portlet_2',
        name: 'Account Health: All Accounts',
        type: 'tree_map',
        size: 'small',
        data: [{ 'value': 1, 'name': 'AT&T', 'growth': -.9 }, { 'value': 1, 'name': 'Chevron', 'growth': -.2 }, { 'value': 1, 'name': 'Walgreen', 'growth': .5 }, { 'value': 1, 'name': 'Apple', 'growth': .5 }, { 'value': 1, 'name': 'Boeing', 'growth': -.3 }, { 'value': 1, 'name': 'Oracle', 'growth': .65 }, { 'value': 1, 'name': 'Dupont', 'growth': .2 }, { 'value': 1, 'name': 'Disney', 'growth': .1 }]
      }, {
        id: 'portlet_3',
        name: 'CSAT',
        type: 'bar',
        size: 'small',
        data: [{ 'year': 2011, 'name': 'beta', 'score': 7 }, { 'year': 2012, 'name': 'beta', 'score': 4 }, { 'year': 2013, 'name': 'beta', 'score': 8 }, { 'year': 2014, 'name': 'beta', 'score': 5 }, { 'year': 2015, 'name': 'beta', 'score': 5 }]
      }, {
        id: 'portlet_4',
        name: 'Case Count Trend',
        type: 'line',
        size: 'small',
        data: [{ 'week': 1, 'name': 'Open', 'value': 15, 'parent': 'Open' }, { 'week': 2, 'name': 'Open', 'value': 20, 'parent': 'Open' }, { 'week': 3, 'name': 'Open', 'value': 30, 'parent': 'Open' }, { 'week': 4, 'name': 'Open', 'value': 40, 'parent': 'Open' }, { 'week': 1, 'name': 'Close', 'value': 20, 'parent': 'Close' }, { 'week': 2, 'name': 'Close', 'value': 20, 'parent': 'Close' }, { 'week': 3, 'name': 'Close', 'value': 25, 'parent': 'Close' }, { 'week': 4, 'name': 'Close', 'value': 32, 'parent': 'Close' }]
      }]
    }, {
      accountType: 'all',
      user: 'longh',
      name: 'custom',
      id: 'dash_2',
      portlets: [{
        id: 'portlet_1',
        name: 'MTTR',
        type: 'tree_map',
        size: 'small',
        data: [{ 'value': 1, 'name': 'Honeywell', 'growth': .9 }, { 'value': 1, 'name': 'Bestbuy', 'growth': .4 }, { 'value': 1, 'name': 'Yelp', 'growth': -.3 }, { 'value': 1, 'name': 'Facebook', 'growth': -.65 }, { 'value': 1, 'name': 'Amazon', 'growth': .7 }, { 'value': 1, 'name': 'Google', 'growth': .2 }, { 'value': 1, 'name': 'Tesla', 'growth': .2 }, { 'value': 1, 'name': 'GoPro', 'growth': .2 }, { 'value': 1, 'name': 'Ebay', 'growth': .2 }]
      }]
    }];

    var service = {
      getPortlets: getPortlets,
      createPortlet: createPortlet
    };

    return service;

    function getPortlets(i) {
      if (typeof Storage !== 'undefined') {
        var _ret = (function () {
          var result = {};
          var temp = [];
          var deferred = $q.defer();

          //add more attribute here for the dashboard
          result.id = dashboard[i].id;
          console.log("portletServices...", dashboard[i]);
          if (localStorage.getItem(dashboard[i].id)) {
            var storageData = localStorage.getItem(dashboard[i].id).split(',');
            console.log('dbc.dashboard.id from localStorage:', storageData);
            _.forEach(storageData, function (key, n) {
              var result = _.findWhere(dashboard[i].portlets, { 'id': key });
              temp.push(result);
            });
          } else {
            temp = dashboard[i].portlets;
          }
          if (temp) {
            result.portlets = temp;
            deferred.resolve(result);
          } else {
            deferred.reject("Failed to get portlet data");
          }

          return {
            v: deferred.promise
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
    }

    function createPortlet(dashboardId, pData) {
      for (var i = 0; i < dashboard.length; i++) {
        if (dashboard[i].id === dashboardId) {
          var alreadyThere = _.findWhere(dashboard[i].portlets, { 'id': pData.id });
          console.log("checking if data is already there", alreadyThere);
          if (alreadyThere === null || alreadyThere === undefined) {
            dashboard[i].portlets.push(pData);

            //save the order to local storage
            if (localStorage.getItem(dashboard[i].id)) {
              var storageData = localStorage.getItem(dashboard[i].id).split(',');
              storageData.push(pData.id);
              console.log('local storage in create new portlet:', storageData);
              localStorage.setItem(dashboardId, storageData);
            }
            $rootScope.$broadcast('portlet:created', { id: i });
            //console.log("broadcasting new portlet");
          }
        }
      }
    }
  }

  angular.module('tCRMAPP').factory('PortletService', PortletService);
})(angular);

(function (angular) {
  'use strict';

  function ProductServices($q, $log, Restangular, toaster) {
    var products = [];

    var services = {
      add: add,
      remove: remove,
      getAll: getAll,
      edit: edit,
      importProducts: importProducts,
      getProductCategory: getProductCategory,
      getProductSubCategory: getProductSubCategory,
      getAllMetaData: getAllMetaData
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
      return products.post(product).then(function (response) {
        toaster.pop('success', 'Product added.');
        return product;
      }, function (err) {
        toaster.pop('error', 'Api error.', 'error in creating product.');
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
      return Restangular.all('product').getList().then(function (data) {
        products = data;
        return data;
      }, function (err) {
        toaster.pop('error', 'Api error.', 'error connect to api to fetching product.');
      });
    }

    function getAllMetaData() {
      return Restangular.all('sfdc/importallmetadata').getList().then(function (data) {
        //console.log("Importallmetadata", data)
        return data;
      }, function (err) {
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
      var productCopy = Restangular.copy(product);
      delete productCopy.creationDate;
      delete productCopy.lastModifiedDate;
      delete productCopy.productSubCategoryName;
      delete productCopy.productCategoryName;
      return productCopy.put().then(function (response) {
        toaster.pop('success', 'Product updated.');
        return response;
      }, function (err) {
        toaster.pop('error', 'Api error.', 'error in editing product');
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
      return product.customDELETE(product.productId, undefined, { 'content-Type': 'application/json' }).then(function (response) {
        toaster.pop('success', 'Product deleted.');
        return response;
      }, function (err) {
        toaster.pop('error', 'Api error.', 'error in deleting product');
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
    function importProducts() {
      return Restangular.all('sfdc').customGET('importproducts').then(function (data) {
        $log.info('success', 'Products Imported');
        return data;
      }, function (err) {
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
    function getProductCategory() {
      return Restangular.all('product/category').getList().then(function (data) {
        $log.info('success', 'Products category fetched');
        return data;
      }, function (err) {
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
    function getProductSubCategory(id) {
      return Restangular.all('product/category/sub').customGETLIST(id).then(function (data) {
        return data;
      }, function (err) {
        toaster.pop('error', 'Api error.', 'error connect to api.');
        return err;
      });
    }
  }

  angular.module('tCRMAPP').factory('ProductServices', ProductServices);
})(angular);

'use strict';
function StorageService($log, $cookies) {
  var Service = (function () {
    function Service() {
      _classCallCheck(this, Service);

      $log.info('storage service');
    }

    _createClass(Service, [{
      key: 'initialize',
      value: function initialize() {}
    }, {
      key: 'get',
      value: function get(key) {
        return sessionStorage.getItem(key);
      }
    }, {
      key: 'put',
      value: function put(key, value) {
        return sessionStorage.setItem(key, value);
      }
    }, {
      key: 'remove',
      value: function remove(key) {
        return sessionStorage.removeItem(key);
      }
    }]);

    return Service;
  })();

  ;
  var svc = new Service();
  return svc;
}

angular.module('tCRMAPP').factory('StorageService', StorageService);

(function (angular) {
  'use strict';
  var addProductModal = function addProductModal() {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      replace: true,
      scope: {
        product: '=',
        productCategories: '='
      },
      // Will allow a component to have its properties bound to the controller, rather than to scope
      controllerAs: 'addProductModalCtrl',
      // Identifier name for a reference to the controller in the directive's scope
      bindToController: true,
      controller: function controller($log, $rootScope, ProductServices) {
        var addProductModalCtrl = this;
        addProductModalCtrl.getSubType = function (id) {
          var promise = ProductServices.getProductSubCategory(id);
          promise.then(function (result) {
            addProductModalCtrl.productSubCategories = result;
          });
        };
        addProductModalCtrl.addProduct = function (form) {
          if (form.$valid) {
            var promise = ProductServices.add(addProductModalCtrl.product);
            promise.then(function (result) {
              $rootScope.$broadcast('refreshProductList');
              $('#addProductModal').modal('hide');
            });
          }
        };
        //closing popup and reseting file feild
        addProductModalCtrl.close = function () {
          $('#addProductModal').modal('hide');
        };
      }, //Embed a custom controller in the directive
      link: function link(scope, element, attrs) {
        //DOM manipulation
        // concatenating the directory to the ver attr to select the correct excerpt for the day
        console.log('attrs.filename: ', attrs.filename);

        scope.contentUrl = 'views/onboarding/partials/steps/' + attrs.filename + '.html';
        attrs.$observe("filename", function (v) {
          scope.contentUrl = 'views/onboarding/partials/steps/' + v + '.html';
        });
      },
      template: '<div ng-include="contentUrl"></div>'
      //templateUrl: contentUrl,//'views/partials/create-new.html',
    };
  };

  angular.module('tCRMAPP').directive('addProductModal', addProductModal);
})(angular);

(function (angular) {
  'use strict';
  var sourcesModal = function sourcesModal() {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      replace: true,
      scope: {
        selDataSource: '=',
        standardObject: '='
      },
      // Will allow a component to have its properties bound to the controller, rather than to scope
      controllerAs: 'addDataSourceCtrl',
      // Identifier name for a reference to the controller in the directive's scope
      bindToController: true,
      controller: function controller($log, filterFilter, OnboardingService, $timeout) {
        var addDataSourceCtrl = this;
        addDataSourceCtrl.testConnection = function (form) {
          if (!addDataSourceCtrl.selDataSource.status) {
            var promise = OnboardingService.connect(addDataSourceCtrl.selDataSource);
            promise.then(function (result) {
              //$log.info('addDataSourceCtrl ----------- '+JSON.stringify(  addDataSourceCtrl.selDataSource));
              console.log(result);
              if (result.isActive) {
                addDataSourceCtrl.alert = 'alert-success';
                addDataSourceCtrl.selDataSource = result;
              } else {
                addDataSourceCtrl.alert = 'alert-danger';
              }
              addDataSourceCtrl.message = result.message;
            });
          }
        };
        //Call service to import what all to be imported form datasource on selection
        addDataSourceCtrl['import'] = function () {
          var promise = OnboardingService.updateStandardObject(addDataSourceCtrl.standardObject);
          promise.then(function (result) {
            $('#dataSourcesModal').modal('hide');
            $timeout(function () {
              angular.element('#nextProduct').triggerHandler('click');
            }, 500);
          });
        };
        //closing popup and reseting file feild
        addDataSourceCtrl.close = function () {
          $('#dataSourcesModal').modal('hide');
          delete addDataSourceCtrl.message;
        };
      }, //Embed a custom controller in the directive
      link: function link(scope, element, attrs) {
        //DOM manipulation
        // concatenating the directory to the ver attr to select the correct excerpt for the day
        console.log('attrs.filename: ', attrs.filename);

        scope.contentUrl = 'views/onboarding/partials/steps/' + attrs.filename + '.html';
        attrs.$observe('filename', function (v) {
          scope.contentUrl = 'views/onboarding/partials/steps/' + v + '.html';
        });
      },
      template: '<div ng-include="contentUrl"></div>'
      //templateUrl: contentUrl,//'views/partials/create-new.html',
    };
  };

  angular.module('tCRMAPP').directive('sourcesModal', sourcesModal);
})(angular);

(function (angular) {
  'use strict';
  var editCaseModal = function editCaseModal() {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      replace: true,
      scope: {
        //@ reads the attribute value as a string, = provides two-way binding, & works with functions
        'case': '=selectedCase',
        caseCopy: "=caseCopy",
        values: '=',
        accounts: '=',
        requesters: "=",
        assets: "=",
        uploadfiles: "=",
        selectedAsset: "=",
        selectedAccount: "="
      },
      // Will allow a component to have its properties bound to the controller, rather than to scope
      controllerAs: 'editCaseCtrl',
      // Identifier name for a reference to the controller in the directive's scope
      bindToController: true,
      controller: function controller($scope, $rootScope, $log, CaseService, AccountService, AssetsService) {
        var editCaseCtrl = this;
        editCaseCtrl.getAssetsAndRequesters = function (accId) {
          var promise = AssetsService.getAssetsByAccount(accId);
          promise.then(function (result) {
            editCaseCtrl.assets = result;
          });
          editCaseCtrl.requesters = [];
          AccountService.getRequesters(accId).then(function (result) {
            editCaseCtrl.requesters = result;
          });
          editCaseCtrl.selectedAccount = null;
          editCaseCtrl.selectedAsset = null;
          AccountService.getAccountDetail(accId).then(function (result) {
            editCaseCtrl.selectedAccount = result;
          });
        };
        //reads the values in case on create-new model popup
        editCaseCtrl.editCase = function (form) {
          if (form.$valid) {
            console.log(editCaseCtrl['case']);
            CaseService.editCase(editCaseCtrl['case'], editCaseCtrl.selectedFile, editCaseCtrl.caseCopy).then(function (resp) {
              $rootScope.$broadcast("getUpdatedCases");
              $log.info('edit case: ', resp);
              editCaseCtrl['case'] = resp;
            });
            //closing popup and reseting file feild
            $('#editCaseModal').modal('hide');
            $("#editCaseFile").val('');
            editCaseCtrl.selectedFile = null;
          }
        };
        //closing popup and reseting file feild
        editCaseCtrl.close = function () {
          $('#editCaseModal').modal('hide');
          $("#editCaseFile").val('');
          editCaseCtrl.selectedFile = null;
          editCaseCtrl['case'].subject = editCaseCtrl.caseCopy.subject;
        };
        // assign selected files to uploaded files
        editCaseCtrl.setFiles = function (element) {
          editCaseCtrl.selectedFile = element.files;
        };
        editCaseCtrl.clearAttachment = function () {
          $("#editCaseFile").val('');
          editCaseCtrl.selectedFile = null;
        };
        editCaseCtrl.getAssetDetail = function (assetId) {
          editCaseCtrl.selectedAsset = null;
          AssetsService.getAssetDetail(assetId).then(function (result) {
            editCaseCtrl.selectedAsset = result;
          });
        };
      }, //Embed a custom controller in the directive
      link: function link(scope, element, attrs) {
        //DOM manipulation
        // concatenating the directory to the ver attr to select the correct excerpt for the day
        console.log('attrs.filename: ', attrs.filename);

        scope.contentUrl = 'views/partials/' + attrs.filename + '.html';
        attrs.$observe("filename", function (v) {
          scope.contentUrl = 'views/partials/' + v + '.html';
        });
      },
      template: '<div ng-include="contentUrl"></div>'
      //templateUrl: contentUrl,//'views/partials/create-new.html',
    };
  };

  angular.module('tCRMAPP').directive('editCaseModal', editCaseModal);
})(angular);

(function (angular) {
  'use strict';
  var editProductModal = function editProductModal() {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      replace: true,
      scope: {
        product: '=',
        productCategories: '=',
        productSubCategories: "="
      },
      // Will allow a component to have its properties bound to the controller, rather than to scope
      controllerAs: 'editProductModalCtrl',
      // Identifier name for a reference to the controller in the directive's scope
      bindToController: true,
      controller: function controller($log, $rootScope, ProductServices) {
        var editProductModalCtrl = this;
        //fetch sub category on category change
        editProductModalCtrl.getSubType = function (id) {
          var promise = ProductServices.getProductSubCategory(id);
          promise.then(function (result) {
            editProductModalCtrl.productSubCategories = result;
          });
        };
        //closing popup and reseting file feild
        editProductModalCtrl.close = function () {
          $('#editProductModal').modal('hide');
        };
        //edit product
        editProductModalCtrl.editProduct = function () {
          var promise = ProductServices.edit(editProductModalCtrl.product);
          promise.then(function (response) {
            $rootScope.$broadcast('refreshProductList');
            editProductModalCtrl.close();
          });
        };
      }, //Embed a custom controller in the directive
      link: function link(scope, element, attrs) {
        //DOM manipulation
        // concatenating the directory to the ver attr to select the correct excerpt for the day
        console.log('attrs.filename: ', attrs.filename);

        scope.contentUrl = 'views/onboarding/partials/steps/' + attrs.filename + '.html';
        attrs.$observe("filename", function (v) {
          scope.contentUrl = 'views/onboarding/partials/steps/' + v + '.html';
        });
      },
      template: '<div ng-include="contentUrl"></div>'
      //templateUrl: contentUrl,//'views/partials/create-new.html',
    };
  };

  angular.module('tCRMAPP').directive('editProductModal', editProductModal);
})(angular);

/*globals $*/
(function (angular) {
  'use strict';
  /*
  * @name portlet directive
  * usage: <portlet></portlet>
  * desc: A portlet for dashboard
  *
  */
  var portletWidget = function portletWidget(PortletService, $timeout) {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/directive/portlet_widget.html',
      scope: {
        //@ reads the attribute value as a string,
        //= provides two-way binding,
        //& works with functions
        controller: '='
      },
      link: function link(scope, element, attrs) {
        scope.portletWidgets = [{
          id: 'new_portlet_1',
          name: 'MTTR Heat Map 1',
          type: 'tree_map',
          size: 'small',
          img: '/images/Treemap.png',
          desc: "Compare the mean time to resolution across your clients with this heat map"
        }, {
          id: 'new_portlet_2',
          name: 'Case MTTR Trend 2',
          type: 'line',
          size: 'small',
          img: '/images/trendchart.png',
          desc: " View the MTTR trend up to last 6 months with this trend chart"
        }, {
          id: 'new_portlet_3',
          name: 'CSAT Bar 3',
          type: 'bar',
          size: 'small',
          img: '/images/barchart.png',
          desc: "Compare the time to first response across your clients with this bar chart"
        }, {
          id: 'new_portlet_4',
          name: 'MTTR Heat Map 4',
          type: 'tree_map',
          size: 'small',
          img: '/images/Treemap.png',
          desc: "Compare the mean time to resolution across your clients with this heat map"
        }, {
          id: 'new_portlet_5',
          name: 'Case MTTR Trend 5',
          type: 'line',
          size: 'small',
          img: '/images/trendchart.png',
          desc: " View the MTTR trend up to last 6 months with this trend chart"
        }, {
          id: 'new_portlet_6',
          name: 'CSAT Bar 6',
          type: 'bar',
          size: 'small',
          img: '/images/barchart.png',
          desc: "Compare the time to first response across your clients with this bar chart"
        }];

        var p = [{
          id: 'new_portlet_1',
          name: 'Account Health: All Accounts',
          type: 'tree_map',
          size: 'small',
          data: [{ 'value': 1, 'name': 'AT&T', 'growth': -.9 }, { 'value': 1, 'name': 'Chevron', 'growth': -.2 }, { 'value': 1, 'name': 'Walgreen', 'growth': .5 }, { 'value': 1, 'name': 'Apple', 'growth': .5 }, { 'value': 1, 'name': 'Boeing', 'growth': -.3 }, { 'value': 1, 'name': 'Oracle', 'growth': .65 }, { 'value': 1, 'name': 'Dupont', 'growth': .2 }, { 'value': 1, 'name': 'Disney', 'growth': .1 }]
        }, {
          id: 'new_portlet_2',
          name: 'Case Count Trend',
          type: 'line',
          size: 'small',
          data: [{ 'week': 1, 'name': 'Open', 'value': 15, 'parent': 'Open' }, { 'week': 2, 'name': 'Open', 'value': 20, 'parent': 'Open' }, { 'week': 3, 'name': 'Open', 'value': 30, 'parent': 'Open' }, { 'week': 4, 'name': 'Open', 'value': 40, 'parent': 'Open' }, { 'week': 1, 'name': 'Close', 'value': 20, 'parent': 'Close' }, { 'week': 2, 'name': 'Close', 'value': 20, 'parent': 'Close' }, { 'week': 3, 'name': 'Close', 'value': 25, 'parent': 'Close' }, { 'week': 4, 'name': 'Close', 'value': 32, 'parent': 'Close' }]
        }, {
          id: 'new_portlet_3',
          name: 'CSAT',
          type: 'bar',
          size: 'small',
          data: [{ 'year': 2011, 'name': 'beta', 'score': 7 }, { 'year': 2012, 'name': 'beta', 'score': 4 }, { 'year': 2013, 'name': 'beta', 'score': 8 }, { 'year': 2014, 'name': 'beta', 'score': 5 }, { 'year': 2015, 'name': 'beta', 'score': 5 }]
        }, {
          id: 'new_portlet_4',
          name: 'Account Health: All Accounts',
          type: 'tree_map',
          size: 'small',
          data: [{ 'value': 1, 'name': 'AT&T', 'growth': -.9 }, { 'value': 1, 'name': 'Chevron', 'growth': -.2 }, { 'value': 1, 'name': 'Walgreen', 'growth': .5 }, { 'value': 1, 'name': 'Apple', 'growth': .5 }, { 'value': 1, 'name': 'Boeing', 'growth': -.3 }, { 'value': 1, 'name': 'Oracle', 'growth': .65 }, { 'value': 1, 'name': 'Dupont', 'growth': .2 }, { 'value': 1, 'name': 'Disney', 'growth': .1 }]
        }, {
          id: 'new_portlet_5',
          name: 'Case Count Trend',
          type: 'line',
          size: 'small',
          data: [{ 'week': 1, 'name': 'Open', 'value': 15, 'parent': 'Open' }, { 'week': 2, 'name': 'Open', 'value': 20, 'parent': 'Open' }, { 'week': 3, 'name': 'Open', 'value': 30, 'parent': 'Open' }, { 'week': 4, 'name': 'Open', 'value': 40, 'parent': 'Open' }, { 'week': 1, 'name': 'Close', 'value': 20, 'parent': 'Close' }, { 'week': 2, 'name': 'Close', 'value': 20, 'parent': 'Close' }, { 'week': 3, 'name': 'Close', 'value': 25, 'parent': 'Close' }, { 'week': 4, 'name': 'Close', 'value': 32, 'parent': 'Close' }]
        }, {
          id: 'new_portlet_6',
          name: 'CSAT',
          type: 'bar',
          size: 'small',
          data: [{ 'year': 2011, 'name': 'beta', 'score': 7 }, { 'year': 2012, 'name': 'beta', 'score': 4 }, { 'year': 2013, 'name': 'beta', 'score': 8 }, { 'year': 2014, 'name': 'beta', 'score': 5 }, { 'year': 2015, 'name': 'beta', 'score': 5 }]
        }];

        $timeout(function () {

          $('.portlet-widgets').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true
          });

          $('*[draggable!=true]', '.slick-track').unbind('dragstart');
          $('.portlet-widget').draggable({
            helper: 'clone',
            revert: 'invalid'
          });

          $('.droppable').droppable({
            drop: function drop(event, ui) {
              var dashId = scope.controller.dashboard.id;
              var portletId = ui.draggable.context.id;
              switch (portletId) {
                case 'new_portlet_1':
                  PortletService.createPortlet(dashId, p[0]);
                  break;
                case 'new_portlet_2':
                  PortletService.createPortlet(dashId, p[1]);
                  break;
                case 'new_portlet_3':
                  PortletService.createPortlet(dashId, p[2]);
                  break;
                case 'new_portlet_4':
                  PortletService.createPortlet(dashId, p[3]);
                  break;
                case 'new_portlet_5':
                  PortletService.createPortlet(dashId, p[4]);
                  break;
                case 'new_portlet_6':
                  PortletService.createPortlet(dashId, p[5]);
                  break;
              }
            }
          });
        });
      }
    };
    return directive;
  };

  angular.module('tCRMAPP').directive('portletWidget', portletWidget);
})(angular);

/*globals $*/
(function (angular) {
  'use strict';
  /*
  * @name portlet directive
  * usage: <portlet></portlet>
  * desc: A portlet for dashboard
  *
  */
  var portlet = function portlet( /*, $compile*/$log, $timeout, toaster) {
    function createPortlet(result) {
      $log.info('createPortlet...');
      var data = [];
      var deferred = $.Deferred();
      if (result) {
        if (data) {
          deferred.resolve(result);
        } else {
          deferred.reject('failed');
        }
      }

      return deferred;
    }

    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      //replace: true, //replace directive''s tags - //https://docs.angularjs.org/error/$compile/tplrt?p0=portlet&p1=views%2Fdirective%2Fportlet_default.html
      scope: {
        //@ reads the attribute value as a string,
        //= provides two-way binding,
        //& works with functions
        data: '=',
        controller: '=',
        id: '@',
        callback: '&'
      },
      // Will allow a component to have its properties bound to the controller, rather than to scope
      //controllerAs:'portletCtrl',
      // Identifier name for a reference to the controller in the directive's scope
      //bindToController:true,
      /*template: `<div class='portlet' id='1'>
                            <div class='portlet-header'>Portlet 1</div>
                            <div class='portlet-content'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
                          </div>`*/
      templateUrl: function templateUrl(elem, attrs) {
        return attrs.templateurl || 'views/directive/portlet_default.html';
      },
      ///compile: (element/*, jqLite, attributes*/) => {
      //One time config of element. Think init.
      ///},
      /*controller: function($scope,$log,CaseService,AccountService,AssetsService){
        let editCaseCtrl=this;
        editCaseCtrl.getAssets= function(accId){
          let promise = AssetsService.getAssetsByAccount(accId);
          promise.then(function (result) {
            editCaseCtrl.assets = result;
          });
        }
        //reads the values in case on create-new model popup
        editCaseCtrl.editCase = function(form){
          console.log('form');
          if(form.$valid){
            console.log('form');
            CaseService.editCase(editCaseCtrl.case,editCaseCtrl.caseCopy).then(function(resp){
              $log.info('edit case: ',resp);
              editCaseCtrl.case=resp;
            });
            $('#editCaseModal').modal('hide');
          }else{
            alert('not valid form');
          }
          };
      },*/
      //Embed a custom controller in the directive
      link: function link(scope, element, attrs) {
        //DOM manipulation
        //$log.info(scope, element, attrs);
        /*
          //CALLING CALLBACK AND PASS PARAMS
          scope.clickHandler = (param, id) => scope.callback()(param, id);
        */
        $log.info('link in portlets...');

        //WATCH FOR CHANGES FROM DIGEST CYCLE
        scope.$watch('data', function () {
          $log.info('BBBBB changes in data', scope);
          scope.isHidden = false;
          var deferred = createPortlet(scope.data);
          deferred.then(function (result) {
            $log.info('CCCCC result:', result);
            //scope.portlets = result;//use in template
            scope.isHidden = true; //now hide loader

            //portlets binding codes starts
            $('.column').sortable({
              connectWith: '.column',
              handle: '.portlet-header',
              cancel: '.portlet-toggle',
              placeholder: 'portlet-placeholder ui-corner-all',
              update: function update() {
                var order = $('.column').sortable('toArray');
                //SAVE ORDER TO STORAGE (DB LATER)
                if (typeof Storage !== 'undefined') {
                  console.log('Order 1:', order);
                  console.log('controller.dashboard.id:', scope.controller.dashboard.id);
                  // Code for localStorage/sessionStorage// Store
                  localStorage.setItem(scope.controller.dashboard.id, order);
                } else {
                  // Sorry! No Web Storage support..
                }
              }
            });

            $('.column').bind('sortstart', function (event, ui) {
              //console.log('...here sortstart');
              $('.portlet-placeholder').append('<span>Drop here</span>');
            });

            $('.portlet').addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all').find('.portlet-header').addClass('ui-widget-header ui-corner-all').prepend('<span class="ui-icon ui-icon-minusthick portlet-toggle"></span>');

            $('.portlet-toggle').click(function () {
              var icon = $(this);
              icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
              icon.closest('.portlet').find('.portlet-content').toggle();
            });

            //portlets ends

            /*
            $timeout makes sure it's executed when the ng-repeated elements have REALLY
            finished rendering (because the $timeout will execute at the end of the
            current digest cycle -- and it will also call $apply internally, unlike setTimeout).
            */
            $timeout(function () {
              $log.info('done...');
              //Charts
              /*var sample_data = [
                {'value': 100, 'name': 'alpha', 'growth': .9},
                {'value': 70, 'name': 'beta', 'growth': .4},
                {'value': 40, 'name': 'gamma', 'growth': -.3},
                {'value': 15, 'name': 'delta', 'growth': -.65},
                {'value': 5, 'name': 'epsilon', 'growth': .7},
                {'value': 1, 'name': 'zeta', 'growth': .2}
              ]*/

              _.forEach(scope.data, function (datum, key) {
                console.log(datum);
                var visualization = d3plus.viz().container('#boo' + datum.id).data(datum.data).type(datum.type);
                if (datum.type === 'bar') {
                  visualization.id('name').x('year').y('score');
                } else if (datum.type === 'line') {
                  visualization.id(['parent', 'name']).y('value').x('week');
                } else {
                  visualization.id('name').size('value').color('growth');
                }
                visualization.draw();
              });
            });
          });
        }, true);

        //end link function
      }
    };
  };

  angular.module('tCRMAPP').directive('portlet', portlet);
})(angular);

(function (angular) {
  'use strict';

  function productModal() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/directive/product-modal.html',
      scope: {
        //@ reads the attribute value as a string,
        //= provides two-way binding,
        //& works with functions
      },

      link: linkFunc,
      controller: ProductModalCtrl,
      controllerAs: 'ob_pm',
      bindToController: true
    };

    return directive;

    function linkFunc(scope, element, attrs, ob_pm) {}
  }

  ProductModalCtrl.$inject = ['$scope', 'ProductServices'];

  function ProductModalCtrl($scope, ProductServices) {
    var ob_pm = this;
    ob_pm.product = {};

    ob_pm.add = function () {
      if (ob_pm.productForm.$valid) {
        var temp = angular.copy(ob_pm.product);
        ProductServices.add(temp);
        ob_pm.product = {};
        $("#productModal").modal("hide");
        $("#productModal").val("");
      }
    };
  }

  angular.module('tCRMAPP').directive('productModal', productModal);
})(angular);

(function (angular) {
  'use strict';

  var tcrmModal = function tcrmModal() {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      replace: true,
      scope: {
        //@ reads the attribute value as a string, = provides two-way binding, & works with functions
        'case': '=',
        values: '=',
        accounts: '=',
        requesters: "=",
        selectedAsset: "=",
        selectedAccount: "="
      },
      // Will allow a component to have its properties bound to the controller, rather than to scope
      bindToController: true,
      // Identifier name for a reference to the controller in the directive's scope
      controllerAs: "createCaseCtrl",
      controller: function controller($log, CaseService, AccountService, AssetsService) {
        var createCaseCtrl = this;
        createCaseCtrl.getAssetsAndRequesters = function (accId) {
          var promise = AssetsService.getAssetsByAccount(accId);
          console.log("accountid", accId);
          //createCaseCtrl.assets=[];
          promise.then(function (result) {
            createCaseCtrl.assets = result;
            $log.info(result);
          });
          createCaseCtrl.requesters = [];
          AccountService.getRequesters(accId).then(function (result) {
            createCaseCtrl.requesters = result;
          });
          createCaseCtrl.selectedAccount = null;
          createCaseCtrl.selectedAsset = null;
          AccountService.getAccountDetail(accId).then(function (result) {
            createCaseCtrl.selectedAccount = result;
          });
        };
        //reads the values in case on create-new model popup
        createCaseCtrl.createCase = function (form) {
          if (form.$valid) {
            createCaseCtrl['case'].caseStatus = 1; //status 1 is for open
            console.log(createCaseCtrl.uploadfiles + " create case");
            console.log(createCaseCtrl['case'] + " create case");
            CaseService.createCase(createCaseCtrl['case'], createCaseCtrl.uploadfiles);
            //closing popup and reseting file feild
            $('#gridSystemModal').modal('hide');
            $("#createCaseFile").val('');
            createCaseCtrl.uploadfiles = null;
          }

          /*let promise = CaseService.getCases();
          promise.then(function (result) {
          $parent.cases = result;//get parent scope to refresh latest
            $log.info('refresh case list.', $parent.cases);
          });*/
        };
        //closing popup and reseting file feild
        createCaseCtrl.close = function () {
          $('#gridSystemModal').modal('hide');
          $("#createCaseFile").val('');
          createCaseCtrl.uploadfiles = null;
        };
        // assign selected files to uploaded files
        createCaseCtrl.setFiles = function (element) {
          createCaseCtrl.uploadfiles = element.files;
        };
        createCaseCtrl.clearAttachment = function () {
          $("#createCaseFile").val('');
          createCaseCtrl.uploadfiles = null;
        };
        createCaseCtrl.getAssetDetail = function (assetId) {
          createCaseCtrl.selectedAsset = null;
          AssetsService.getAssetDetail(assetId).then(function (result) {
            createCaseCtrl.selectedAsset = result;
          });
        };
      }, //Embed a custom controller in the directive
      link: function link(scope, element, attrs) {
        //DOM manipulation
        // concatenating the directory to the ver attr to select the correct excerpt for the day
        console.log('attrs.filename: ', attrs.filename);

        scope.contentUrl = 'views/partials/' + attrs.filename + '.html';
        attrs.$observe("filename", function (v) {
          scope.contentUrl = 'views/partials/' + v + '.html';
        });
      },
      template: '<div ng-include="contentUrl"></div>'
      //templateUrl: contentUrl,//'views/partials/create-new.html',
    };
  };

  angular.module('tCRMAPP').directive('tcrmModal', tcrmModal);
})(angular);

(function (angular) {
  'use strict';

  angular.module('tCRMAPP').controller('AccountDetailCtrl', function ($scope, $log, AccountService, $routeParams) {
    var acdtl = this;
    var id = $routeParams.id;
    console.log(id);
    acdtl.account = {};
    //acdtl.getAccount = getAccount;
    getAccount(id);

    function getAccount(id) {
      var promise = AccountService.getAccountDetail(id);
      promise.then(function (data, error) {
        console.log('account detail from controller', data);
        acdtl.account = data;
      });
    }
  });
})(angular);

(function (angular) {
  'use strict';

  angular.module('tCRMAPP').controller('AccountCtrl', function ($scope, $log, AccountService) {
    $log.info('at Account controller ');
    var acc = this;

    acc.accounts = [];
    acc.columnDefs = [{ headerName: 'Id', field: 'account_id' }, { headerName: 'Type', field: 'type' }, { headerName: 'CRM Account Id', field: 'crm_account_id' }, { headerName: 'Industry', field: 'industry' }, { headerName: 'Description', field: 'description' }, { headerName: 'No of Emp', field: 'no_of_emp' }];

    acc.gridOptions = {
      columnDefs: acc.columnDefs,
      rowData: acc.accounts,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true
    };

    acc.listView = true;

    /*
    fetch accounts and assign to acc.accounts
    */
    var promise = AccountService.getAccounts();
    promise.then(function (data) {
      $log.info('got accounts' + data);
      acc.accounts = data;
      acc.gridOptions.api.setRowData(acc.accounts);
    });
  });
})(angular);

(function (angular) {
  'use strict';

  angular.module('tCRMAPP').controller('CaseDetailCtrl', function ($scope, $log, $routeParams, CaseService, AccountService, AssetsService, Restangular) {
    $log.info('at Case Detail controller ');
    var cdtl = this;
    var id = $routeParams.id;
    console.log(id);
    cdtl.caseDetail = {};
    //cdtl.getCase = getCase;
    getCaseDetail(id);
    //Asset and account list to show in edit mode
    cdtl.assets = [];
    cdtl.accounts = [];
    cdtl.init = function () {
      cdtl.editCaseDetail = false;
    };
    cdtl.init();
    //fetch case details and show on to the view
    function getCaseDetail(id) {
      var promise = CaseService.getCaseDetail(id);
      promise.then(function (data, error) {
        cdtl.caseDetail = data;
        if (data.accountId) {
          //fetch account details by account Id
          AccountService.getAccountDetail(data.accountId).then(function (result) {
            cdtl.caseAccount = result;
          });
        }
        if (data.assetId) {
          //fetch asset details
          AssetsService.getAssetDetail(data.assetId).then(function (result) {
            cdtl.caseAsset = result;
          });
        }
        $log.info('Case detail from controller', data);
      });
    }
    /*
    fetch Accountlist to show in dropdown in edit mode
    */
    cdtl.getAccounts = function () {
      var promise = AccountService.getAccounts();
      promise.then(function (result) {
        cdtl.accounts = result;
      });
    };
    //click on edit case detail fetch accounts create copy of case and account details to restore view on click of cancel
    cdtl.editCaseDtl = function () {
      cdtl.editCase = {};
      cdtl.getAccounts();
      cdtl.assets = [];
      var promise = AssetsService.getAssetsByAccount(cdtl.caseAccount.id);
      promise.then(function (result) {
        cdtl.assets = result;
      });
      cdtl.editCase.caseDetail = angular.copy(cdtl.caseDetail);
      cdtl.editCase.caseAccount = angular.copy(cdtl.caseAccount);
      cdtl.editCase.caseAsset = angular.copy(cdtl.caseAsset);
      cdtl.editCaseDetail = true;
    };

    //get accounts detail, assets and requesters on change account selection.
    cdtl.getAccoutDtl = function (account) {
      cdtl.caseAsset.id = '';
      var promise = AssetsService.getAssetsByAccount(account.id);
      promise.then(function (result) {
        cdtl.assets = result;
      });
      cdtl.caseAccount = account;
      cdtl.caseDetail.accountId = cdtl.caseAccount.id;
    };
    //fetch asset details on change of asset to show on view
    cdtl.getAssetDtl = function (asset) {
      cdtl.caseDetail.assetId = asset.id;
      cdtl.caseAsset = asset;
    };
    // Reset view to non editable mode
    cdtl.cancelEditCaseDtl = function () {
      cdtl.editCaseDetail = false;
      cdtl.caseDetail = angular.copy(cdtl.editCase.caseDetail);
      cdtl.caseAccount = angular.copy(cdtl.editCase.caseAccount);
      cdtl.caseAsset = angular.copy(cdtl.editCase.caseAsset);
      delete cdtl.editCase;
    };
    //on saving changed details
    cdtl.updateEditCaseDtl = function (form) {
      if (form.$valid) {
        CaseService.editCase(cdtl.caseDetail);
        cdtl.editCaseDetail = false;
      }
    };
    var promise = CaseService.getCaseValues();
    promise.then(function (result) {
      cdtl.values = result;
      $log.info('case values', result);
    });
  });
})(angular);

/*globals _*/
(function (angular) {
  'use strict';
  function CasesCtrl($scope, $filter, $log, $sce, CaseService, AccountService, AssetsService, Restangular, toaster) {
    var cc = this;
    cc.caseFilter = {};
    cc.freeText = '';
    cc.trustAsHtml = $sce.trustAsHtml; //sanitazing html like that  ngSanitize
    cc.values = { "source": '', "type": '', "severity": '' };

    /*cc.cases=[
    {
        'id': '07ff91d4-0522-48be-b15c-05feec17332a',
        'accountid': 'LMS1111',
        'caseNumber': '1',
        'description': 'NO DATA FAKE',
        'type': 1,
        'openDate': 1439380838107,
        'closedDate': 1439380838106,
        'lastUpdate': 1439380838107,
        'creatorName': 'Rakesh Manocha',
        'parentCaseNumber': 'Sales',
        'priority': 1,
        'status': 2,
        'subject': 'Case',
        'currentqueue': 'Current Queue-'
    }];*/
    /*
      column defination for grid view
      header, field
    */
    cc.columnDefs = [{ headerName: 'Id', field: 'crm_case_id' }, { headerName: 'Subject', field: 'subject' }, { headerName: 'Open Date', field: 'openDate',
      cellRenderer: function cellRenderer(params) {
        // cellRender filter to show date in format EEEE, MMM d yyyy as in list view
        return $filter('date')(params.data.openDate, 'EEEE, MMM d yyyy');
      } }, { headerName: 'Account', field: 'accountName' }, { headerName: 'Creater Name', field: 'createdbyUserName' }, { headerName: 'Assign To', field: 'assignedtoUserName' }, { headerName: 'Description', field: 'description' }];

    /*
    setting grid options
    */
    cc.gridOptions = {
      columnDefs: cc.columnDefs,
      rowData: null,
      enableFilter: true,
      enableColResize: true,
      enableSorting: true,
      angularCompileRows: true,
      sortingOrder: ['desc', 'asc', null],
      isExternalFilterPresent: isExternalFilterPresent, // activate external filter
      doesExternalFilterPass: doesExternalFilterPass // function apply filter on grid on given condition
    };
    // Function to activate external filters
    function isExternalFilterPresent() {
      return true;
    }
    // apply filter on change of filter
    function doesExternalFilterPass(node) {
      var result = true;
      if (filter.search.status) {
        // controll come inside if status filter is not selected to All
        result = node.data.status == filter.search.status;
      }
      if (result && filter.search.priority) {
        // controll come inside if priority filter is not selected to All
        result = node.data.priority == filter.search.priority;
      }
      if (result) {
        if (filter.search.assignedtoUserName === "") {
          result = node.data.assignedtoUserName != filter.search.assignedtoUserName;
        } else {
          result = node.data.assignedtoUserName == filter.search.assignedtoUserName;
        }
      }
      return result;
    }
    // dummy filter for all cases and Aditya(my) cases
    cc.filterUserCase = function (val, unAssigned) {
      cc.caseFilter.search.assignedtoUserName = val;
      cc.gridOptions.api.onFilterChanged(); // inform the grid that it needs to filter the data
    };
    // filter applied on cases holds all filters as filter.status, filter.priority
    var filter = cc.caseFilter;
    /*
      reset filter to all
      filter.status-> All
      filter.priority-> to All
    */
    cc.resetFilters = function () {
      filter.status = cc.caseStatus[0];
      filter.priority = cc.casePriority[0];
      filter.search = {};
      cc.search = {};
    };
    /*
      initialize case context
    */
    cc.init = function () {
      var v = { value: 'All' };
      cc.activeMenu = 1;
      cc.getCases = getCases;
      cc.caseStatus = [v];
      cc.casePriority = [v];
      cc.listView = true;
      cc.resetFilters();
      cc.searchStart = 0;
      cc.searchEnd = 0;
      //adding sorting option on cases listing
      cc.sortOptions = [{ "key": "openDate", "value": "Open Date", "reverse": true }, { "key": "accountName", "value": "Account", "reverse": false }, { "key": "assignedtoUserName", "value": "Requester", "reverse": false }];
      cc.caseFilter.caseSort = cc.sortOptions[0];
      getCases(true);
      //assigned and unassigned Case Filter
      cc.caseFilter.search.assignedtoUserName = "";
      cc.mycasesCaseFilter = { assignedtoUserName: "Aditya" };
      cc.assignedCaseFilter = { assignedtoUserName: "" };
      cc.unassignedCaseFilter = { assignedtoUserName: null };
      //getCasesValues();
    };

    cc.init();

    function getCases(isMyCase) {
      var promise = CaseService.getCases();
      promise.then(function (result) {
        cc.cases = result;
        cc.getDropdownValues();
        //console.log("all cases", result);
        cc.gridOptions.api.setRowData(cc.cases);
      });
    }

    $scope.$on("getUpdatedCases", function () {
      //alert(0)
      var promise = CaseService.getCases();
      promise.then(function (result) {
        cc.cases = result;
        cc.gridOptions.api.setRowData(cc.cases);
      });
    });

    /*
    fetch values for case status, priority etc
    */
    // let promise = CaseService.getCaseValues();
    // promise.then(function (result) {
    //   cc.values= result;
    //   //$log.info('case severity',result);
    //   cc.caseStatus=cc.caseStatus.concat(cc.values.status);
    //   cc.casePriority=cc.casePriority.concat(cc.values.severity);// [{value:'All'},{id:1,value:'Minor'},{id:2,value:'Major'},{id:3,value:'Critical'}];
    // });

    /*
    fetch values for case type, orgin, severity etc
    */
    cc.getDropdownValues = function () {
      // Get Case Severity
      var promiseSeverity = CaseService.getCaseSeverity();
      promiseSeverity.then(function (result) {
        cc.values.severity = result;
        //$log.info('case Types',result);
      });

      // Get Case Types
      var promiseTypes = CaseService.getCaseTypes();
      promiseTypes.then(function (result) {
        cc.values.type = result;
        //$log.info('case Types',result);
      });

      // Get Case Origin
      var promiseOrigin = CaseService.getCaseOrigin();
      promiseOrigin.then(function (result) {
        cc.values.source = result;
        //$log.info('case Origin',result);
      });
    };

    /*
      apply sorting on cases
    */
    cc.sortCase = function (srt) {
      cc.caseFilter.caseSort = srt;
      console.log(srt.key);
      if (!srt.reverse) {
        var sort = [{ colId: srt.key, sort: 'asc' }];
      } else {
        var sort = [{ colId: srt.key, sort: 'desc' }];
      }
      cc.gridOptions.api.setSortModel(sort);
    };
    /*
      apply filter on cases
    */
    cc.filterCase = function (name, value) {
      switch (name) {
        case 'status':
          filter.status = value;
          filter.search.status = value.id;
          break;
        case 'priority':
          filter.priority = value;
          filter.search.priority = value.id;
          break;
      }
      cc.gridOptions.api.onFilterChanged(); // inform the grid that it needs to filter the data
    };

    cc.createCase = function () {
      cc['case'] = {};
      cc.file = null;
      cc.getAccounts();
      //cc.getDropdownValues();
      cc.requesters = [];
      cc.selectedAccount = null;
      cc.selectedAsset = null;
    };
    /*
      set case to edit
    */
    cc.editCase = function (c) {
      if (c) {
        cc.selectedCase = Restangular.stripRestangular(c);
      }
      cc.caseCopy = _.clone(cc.selectedCase, true);
      $log.info('info', cc.selectedCase);
      if (cc.selectedCase) {
        cc.getAccounts();
        //cc.getDropdownValues();
        cc.getRequesters(cc.selectedCase.accountId);
        cc.getAssets(cc.selectedCase.accountId);
        cc.extractName(cc.selectedCase.resourceURL);
        cc.selectedAccount = null;
        cc.selectedAsset = null;
        AccountService.getAccountDetail(cc.selectedCase.accountId).then(function (result) {
          cc.selectedAccount = result;
        });
        AssetsService.getAssetDetail(cc.selectedCase.assetId).then(function (result) {
          cc.selectedAsset = result;
        });
      }
    };
    /*
      delete case from list and server
    */
    cc.deleteCase = function (c) {
      if (cc.selectedCase) {
        CaseService.deleteCase(cc.selectedCase).then(function (resp) {
          $log.info('delete case: ', resp);
          var index = cc.cases.indexOf(cc.selectedCase);
          cc.cases.splice(index, 1);
          cc.selectedCase = null;
        });
      }
    };
    /**
    getAssets list by selected account
    */
    cc.getAssets = function (accId) {
      var promise = AssetsService.getAssetsByAccount(accId);
      cc.assets = [];
      promise.then(function (result) {
        cc.assets = result;
      });
    };
    /*
    gets Accountlist
    */
    cc.getAccounts = function () {
      cc.accounts = [];
      var promise = AccountService.getAccounts();
      promise.then(function (result) {
        //$log.info('getAccounts:', result);
        cc.accounts = Restangular.stripRestangular(result);

        $log.info('stripgetAccounts:', cc.accounts);
      });
    };
    /*
    get requester list
    */
    cc.getRequesters = function (accountId) {

      cc.requesters = [];
      var promise = AccountService.getRequesters(accountId);
      promise.then(function (result) {
        cc.requesters = result;
      });
    };

    /*free text search call*/
    cc.searchText = function () {
      //if(cc.freeText){
      $log.info('freeText entered:', cc.freeText);
      var promise = CaseService.searchCases(cc.freeText, cc.searchStart, cc.searchEnd);
      promise.then(function (result) {

        //highlight matched terms
        //text = text.replace(new RegExp('('+phrase+')', 'gi'),'<span class="highlighted">$1</span>')
        result = _.map(result, function (datum) {
          datum.subject = datum.subject.replace(new RegExp('(' + cc.freeText + ')', 'gi'), '<span class="highlighted">$1</span>');
          return datum;
        });
        $log.info('search free text', result);
        cc.cases = result; //set for normal view
        cc.gridOptions.api.setRowData(cc.cases); // set for grid view
      });
      //}
      //else{
      //  toaster.pop('warning', 'Required input', 'No input entered.');
      //}
    };

    /*Extract file name from resource url*/
    cc.extractName = function (path) {
      delete cc.files;
      if (path) {
        cc.files = path.substring(path.lastIndexOf('/') + 1);
        cc.files = cc.files.substring(0, cc.files.indexOf("?"));
      }
    };
    //Sase will be assigned to by default Aditya
    cc.assignToMe = function (c) {
      var promise = CaseService.assignToMe(c.id);
      promise.then(function (result) {
        c.assignedtoUserName = result.assignedtoUserName;
        c.assignedtoUserId = result.assignedtoUserId;
      });
    };
  }
  angular.module('tCRMAPP').controller('CasesCtrl', CasesCtrl);
})(angular);

/* global $*/
(function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name tCRMAPP.controller:DashCtrl
   * @description
   * # DashCtrl
   * Controller of the app.
   */

  function DashCtrl($log, AccountService, CaseService) {
    var dc = this;
    $log.info('DashCrtl...');

    //Get cases count
    var promise = CaseService.getCases();
    promise.then(function (result) {
      $log.info('CaseService.getCases:', result.length);
      dc.caseCount = result.length;
    });

    //Get accounts count
    promise = AccountService.getAccounts();
    promise.then(function (result) {
      $log.info('AccountService.getAccounts:', result.length);
      dc.accountCount = result.length;
    });

    dc.countries = [{ name: 'Afghanistan', code: 'AF' }, { name: 'Aland Islands', code: 'AX' }, { name: 'Albania', code: 'AL' }, { name: 'Algeria', code: 'DZ' }, { name: 'American Samoa', code: 'AS' }, { name: 'AndorrA', code: 'AD' }, { name: 'Angola', code: 'AO' }, { name: 'Anguilla', code: 'AI' }, { name: 'Antarctica', code: 'AQ' }, { name: 'Antigua and Barbuda', code: 'AG' }, { name: 'Argentina', code: 'AR' }, { name: 'Armenia', code: 'AM' }, { name: 'Aruba', code: 'AW' }, { name: 'Australia', code: 'AU' }, { name: 'Austria', code: 'AT' }, { name: 'Azerbaijan', code: 'AZ' }, { name: 'Bahamas', code: 'BS' }, { name: 'Bahrain', code: 'BH' }, { name: 'Bangladesh', code: 'BD' }, { name: 'Barbados', code: 'BB' }, { name: 'Belarus', code: 'BY' }, { name: 'Belgium', code: 'BE' }, { name: 'Belize', code: 'BZ' }, { name: 'Benin', code: 'BJ' }, { name: 'Bermuda', code: 'BM' }, { name: 'Bhutan', code: 'BT' }, { name: 'Bolivia', code: 'BO' }, { name: 'Bosnia and Herzegovina', code: 'BA' }, { name: 'Botswana', code: 'BW' }, { name: 'Bouvet Island', code: 'BV' }, { name: 'Brazil', code: 'BR' }, { name: 'British Indian Ocean Territory', code: 'IO' }, { name: 'Brunei Darussalam', code: 'BN' }, { name: 'Bulgaria', code: 'BG' }, { name: 'Burkina Faso', code: 'BF' }, { name: 'Burundi', code: 'BI' }, { name: 'Cambodia', code: 'KH' }, { name: 'Cameroon', code: 'CM' }, { name: 'Canada', code: 'CA' }, { name: 'Cape Verde', code: 'CV' }, { name: 'Cayman Islands', code: 'KY' }, { name: 'Central African Republic', code: 'CF' }, { name: 'Chad', code: 'TD' }, { name: 'Chile', code: 'CL' }, { name: 'China', code: 'CN' }, { name: 'Christmas Island', code: 'CX' }, { name: 'Cocos (Keeling) Islands', code: 'CC' }, { name: 'Colombia', code: 'CO' }, { name: 'Comoros', code: 'KM' }, { name: 'Congo', code: 'CG' }, { name: 'Congo, The Democratic Republic of the', code: 'CD' }, { name: 'Cook Islands', code: 'CK' }, { name: 'Costa Rica', code: 'CR' }, { name: 'Cote D\'Ivoire', code: 'CI' }, { name: 'Croatia', code: 'HR' }, { name: 'Cuba', code: 'CU' }, { name: 'Cyprus', code: 'CY' }, { name: 'Czech Republic', code: 'CZ' }, { name: 'Denmark', code: 'DK' }, { name: 'Djibouti', code: 'DJ' }, { name: 'Dominica', code: 'DM' }, { name: 'Dominican Republic', code: 'DO' }, { name: 'Ecuador', code: 'EC' }, { name: 'Egypt', code: 'EG' }, { name: 'El Salvador', code: 'SV' }, { name: 'Equatorial Guinea', code: 'GQ' }, { name: 'Eritrea', code: 'ER' }, { name: 'Estonia', code: 'EE' }, { name: 'Ethiopia', code: 'ET' }, { name: 'Falkland Islands (Malvinas)', code: 'FK' }, { name: 'Faroe Islands', code: 'FO' }, { name: 'Fiji', code: 'FJ' }, { name: 'Finland', code: 'FI' }, { name: 'France', code: 'FR' }, { name: 'French Guiana', code: 'GF' }, { name: 'French Polynesia', code: 'PF' }, { name: 'French Southern Territories', code: 'TF' }, { name: 'Gabon', code: 'GA' }, { name: 'Gambia', code: 'GM' }, { name: 'Georgia', code: 'GE' }, { name: 'Germany', code: 'DE' }, { name: 'Ghana', code: 'GH' }, { name: 'Gibraltar', code: 'GI' }, { name: 'Greece', code: 'GR' }, { name: 'Greenland', code: 'GL' }, { name: 'Grenada', code: 'GD' }, { name: 'Guadeloupe', code: 'GP' }, { name: 'Guam', code: 'GU' }, { name: 'Guatemala', code: 'GT' }, { name: 'Guernsey', code: 'GG' }, { name: 'Guinea', code: 'GN' }, { name: 'Guinea-Bissau', code: 'GW' }, { name: 'Guyana', code: 'GY' }, { name: 'Haiti', code: 'HT' }, { name: 'Heard Island and Mcdonald Islands', code: 'HM' }, { name: 'Holy See (Vatican City State)', code: 'VA' }, { name: 'Honduras', code: 'HN' }, { name: 'Hong Kong', code: 'HK' }, { name: 'Hungary', code: 'HU' }, { name: 'Iceland', code: 'IS' }, { name: 'India', code: 'IN' }, { name: 'Indonesia', code: 'ID' }, { name: 'Iran, Islamic Republic Of', code: 'IR' }, { name: 'Iraq', code: 'IQ' }, { name: 'Ireland', code: 'IE' }, { name: 'Isle of Man', code: 'IM' }, { name: 'Israel', code: 'IL' }, { name: 'Italy', code: 'IT' }, { name: 'Jamaica', code: 'JM' }, { name: 'Japan', code: 'JP' }, { name: 'Jersey', code: 'JE' }, { name: 'Jordan', code: 'JO' }, { name: 'Kazakhstan', code: 'KZ' }, { name: 'Kenya', code: 'KE' }, { name: 'Kiribati', code: 'KI' }, { name: 'Korea, Democratic People\'S Republic of', code: 'KP' }, { name: 'Korea, Republic of', code: 'KR' }, { name: 'Kuwait', code: 'KW' }, { name: 'Kyrgyzstan', code: 'KG' }, { name: 'Lao People\'S Democratic Republic', code: 'LA' }, { name: 'Latvia', code: 'LV' }, { name: 'Lebanon', code: 'LB' }, { name: 'Lesotho', code: 'LS' }, { name: 'Liberia', code: 'LR' }, { name: 'Libyan Arab Jamahiriya', code: 'LY' }, { name: 'Liechtenstein', code: 'LI' }, { name: 'Lithuania', code: 'LT' }, { name: 'Luxembourg', code: 'LU' }, { name: 'Macao', code: 'MO' }, { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' }, { name: 'Madagascar', code: 'MG' }, { name: 'Malawi', code: 'MW' }, { name: 'Malaysia', code: 'MY' }, { name: 'Maldives', code: 'MV' }, { name: 'Mali', code: 'ML' }, { name: 'Malta', code: 'MT' }, { name: 'Marshall Islands', code: 'MH' }, { name: 'Martinique', code: 'MQ' }, { name: 'Mauritania', code: 'MR' }, { name: 'Mauritius', code: 'MU' }, { name: 'Mayotte', code: 'YT' }, { name: 'Mexico', code: 'MX' }, { name: 'Micronesia, Federated States of', code: 'FM' }, { name: 'Moldova, Republic of', code: 'MD' }, { name: 'Monaco', code: 'MC' }, { name: 'Mongolia', code: 'MN' }, { name: 'Montserrat', code: 'MS' }, { name: 'Morocco', code: 'MA' }, { name: 'Mozambique', code: 'MZ' }, { name: 'Myanmar', code: 'MM' }, { name: 'Namibia', code: 'NA' }, { name: 'Nauru', code: 'NR' }, { name: 'Nepal', code: 'NP' }, { name: 'Netherlands', code: 'NL' }, { name: 'Netherlands Antilles', code: 'AN' }, { name: 'New Caledonia', code: 'NC' }, { name: 'New Zealand', code: 'NZ' }, { name: 'Nicaragua', code: 'NI' }, { name: 'Niger', code: 'NE' }, { name: 'Nigeria', code: 'NG' }, { name: 'Niue', code: 'NU' }, { name: 'Norfolk Island', code: 'NF' }, { name: 'Northern Mariana Islands', code: 'MP' }, { name: 'Norway', code: 'NO' }, { name: 'Oman', code: 'OM' }, { name: 'Pakistan', code: 'PK' }, { name: 'Palau', code: 'PW' }, { name: 'Palestinian Territory, Occupied', code: 'PS' }, { name: 'Panama', code: 'PA' }, { name: 'Papua New Guinea', code: 'PG' }, { name: 'Paraguay', code: 'PY' }, { name: 'Peru', code: 'PE' }, { name: 'Philippines', code: 'PH' }, { name: 'Pitcairn', code: 'PN' }, { name: 'Poland', code: 'PL' }, { name: 'Portugal', code: 'PT' }, { name: 'Puerto Rico', code: 'PR' }, { name: 'Qatar', code: 'QA' }, { name: 'Reunion', code: 'RE' }, { name: 'Romania', code: 'RO' }, { name: 'Russian Federation', code: 'RU' }, { name: 'RWANDA', code: 'RW' }, { name: 'Saint Helena', code: 'SH' }, { name: 'Saint Kitts and Nevis', code: 'KN' }, { name: 'Saint Lucia', code: 'LC' }, { name: 'Saint Pierre and Miquelon', code: 'PM' }, { name: 'Saint Vincent and the Grenadines', code: 'VC' }, { name: 'Samoa', code: 'WS' }, { name: 'San Marino', code: 'SM' }, { name: 'Sao Tome and Principe', code: 'ST' }, { name: 'Saudi Arabia', code: 'SA' }, { name: 'Senegal', code: 'SN' }, { name: 'Serbia and Montenegro', code: 'CS' }, { name: 'Seychelles', code: 'SC' }, { name: 'Sierra Leone', code: 'SL' }, { name: 'Singapore', code: 'SG' }, { name: 'Slovakia', code: 'SK' }, { name: 'Slovenia', code: 'SI' }, { name: 'Solomon Islands', code: 'SB' }, { name: 'Somalia', code: 'SO' }, { name: 'South Africa', code: 'ZA' }, { name: 'South Georgia and the South Sandwich Islands', code: 'GS' }, { name: 'Spain', code: 'ES' }, { name: 'Sri Lanka', code: 'LK' }, { name: 'Sudan', code: 'SD' }, { name: 'Suriname', code: 'SR' }, { name: 'Svalbard and Jan Mayen', code: 'SJ' }, { name: 'Swaziland', code: 'SZ' }, { name: 'Sweden', code: 'SE' }, { name: 'Switzerland', code: 'CH' }, { name: 'Syrian Arab Republic', code: 'SY' }, { name: 'Taiwan, Province of China', code: 'TW' }, { name: 'Tajikistan', code: 'TJ' }, { name: 'Tanzania, United Republic of', code: 'TZ' }, { name: 'Thailand', code: 'TH' }, { name: 'Timor-Leste', code: 'TL' }, { name: 'Togo', code: 'TG' }, { name: 'Tokelau', code: 'TK' }, { name: 'Tonga', code: 'TO' }, { name: 'Trinidad and Tobago', code: 'TT' }, { name: 'Tunisia', code: 'TN' }, { name: 'Turkey', code: 'TR' }, { name: 'Turkmenistan', code: 'TM' }, { name: 'Turks and Caicos Islands', code: 'TC' }, { name: 'Tuvalu', code: 'TV' }, { name: 'Uganda', code: 'UG' }, { name: 'Ukraine', code: 'UA' }, { name: 'United Arab Emirates', code: 'AE' }, { name: 'United Kingdom', code: 'GB' }, { name: 'United States', code: 'US' }, { name: 'United States Minor Outlying Islands', code: 'UM' }, { name: 'Uruguay', code: 'UY' }, { name: 'Uzbekistan', code: 'UZ' }, { name: 'Vanuatu', code: 'VU' }, { name: 'Venezuela', code: 'VE' }, { name: 'Vietnam', code: 'VN' }, { name: 'Virgin Islands, British', code: 'VG' }, { name: 'Virgin Islands, U.S.', code: 'VI' }, { name: 'Wallis and Futuna', code: 'WF' }, { name: 'Western Sahara', code: 'EH' }, { name: 'Yemen', code: 'YE' }, { name: 'Zambia', code: 'ZM' }, { name: 'Zimbabwe', code: 'ZW' }];
  }

  angular.module('tCRMAPP').controller('DashCtrl', DashCtrl);
})(angular);

/* global $*/
(function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name tCRMAPP.controller:DashCtrl
   * @description
   * # DashCtrl
   * Controller of the app.
   */

  function DashboardCtrl($log, $scope, AccountService, CaseService, PortletService) {
    var dbc = this;
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
      PortletService.getPortlets(i).then(function (result) {
        //console.log('getPortlets>result', result);
        dbc.activeTab = i;
        dbc.dashboard = result;
      });
    }
  }

  angular.module('tCRMAPP').controller('DashboardCtrl', DashboardCtrl);
})(angular);

(function (angular) {
  'use strict';

  angular.module('tCRMAPP').controller('LeftMenuCtrl', function ($scope, $location) {
    var lmc = this;
    lmc.isActive = isActive;

    function isActive(currentPath) {
      return currentPath === $location.path();
    }

    //FOR ADJUSTING THE EQUAL HEIGHTS - https://github.com/Sam152/Javascript-Equal-Height-Responsive-Rows/blob/master/demo.html
    jQuery(function ($) {
      $('.element').responsiveEqualHeightGrid();
    });
  });
})(angular);

/* global $*/
(function (angular) {
  'use strict';

  function LoginCtrl($log, $location, Restangular, localStorageService, AuthService, toaster) {
    $log.info('loaded login...');
    var lc = this;
    //display settings
    lc.ls = {
      isLogged: false,
      isError: true,
      doneLoading: true
    };

    lc.login = {
      wrong: 'display:none;'
    };

    // already authenticated?
    var token = localStorageService.get('auth');
    if (token) {
      $log.info('existing token found: ', token);
      $location.path('/onboarding');
    }

    // LoginMe:
    lc.auth = function () {
      $log.info('login.username: ', lc.login.username);
      $log.info('login.password: ', lc.login.password);

      if (lc.login.username && lc.login.password) {
        // run AuthService
        var promise = AuthService.login(lc.login);
        $log.info('promise2: ', promise);
        if (promise) {
          promise.then(function (payload) {
            $log.info('route w/ payload: ', payload);
            // SAVE TO LOCAL
            if (payload) {
              localStorageService.set('userType', payload.userType);
              localStorageService.set('permissions', payload.permissions);
            }
            /*
            permissions: "onboarding:create,update,delete,view;case:create,update,delete,view;user:create,update,delete,view;asset:create,update,delete,view;account:create,update,delete,view"
            userType: "CEO"
            */
            toaster.pop('info', 'Welcome', lc.login.username);
            $location.path('/onboarding'); //redirect to main page
          });
        }
      } else {
          $log.error('bad creds...');
          toaster.pop('error', 'Auth Error:', 'Bad credentials.');
          lc.ls.isError = false;
        }
    };
  }

  angular.module('tCRMAPP').controller('LoginCtrl', LoginCtrl);
})(angular);

/* global $*/
(function (angular) {
  'use strict';

  function ObAccountsCtrl($log, $scope, AccountService, $rootScope) {
    var ob_ac = this;
    $log.info('ObAccountsCtrl...');

    //Mock data
    ob_ac.accounts = [];

    ob_ac.columnDefs = [{ headerName: "Account Id", field: "accountId" }, { headerName: "Account Name", field: "accountName" }, { headerName: "Account Type", field: "type" }, { headerName: "Billing Contact", field: "billingContact" }, { headerName: "Shipping Contact", field: "shippingContact" }];

    ob_ac.gridOptions = {
      columnDefs: ob_ac.columnDefs,
      rowData: null,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      ready: function ready(api) {
        api.sizeColumnsToFit();
      }
    };
    //
    $scope.$on('getAccounts', function () {
      var promise = AccountService.importAccounts();
      promise.then(function (result) {
        var innerPromise = AccountService.getAccountsList();
        innerPromise.then(function (result) {
          ob_ac.accounts = result;
          ob_ac.gridOptions.api.setRowData(ob_ac.accounts);
        });
      });
    });

    ob_ac.getCases = function () {
      $rootScope.$broadcast('getCases');
    };
  }

  angular.module('tCRMAPP').controller('ObAccountsCtrl', ObAccountsCtrl);
})(angular);

/* global $*/
(function (angular) {
  'use strict';

  function OnboardingCaseManagementCtrl($log, $scope, OnboardingService) {
    var ob_cmc = this;
    $log.info('OnboardingCaseManagementCtrl...');

    //  //Mock data
    //  ob_ac.accounts= [];

    //  ob_ac.columnDefs =
    //   [
    //     {headerName: "Account Number", field: "account_id"},
    //     {headerName: "Account Name", field: "account_name"},
    //     {headerName: "Account Type", field: "account_type"},
    //     {headerName: "Billing Address", field: "account_bill_address"},
    //     {headerName: "Shipping Address", field: "account_shipping_address"}
    //   ];

    // ob_ac.gridOptions = {
    //   columnDefs: ob_ac.columnDefs,
    //   rowData: ob_ac.accounts,
    //   enableColResize: true,
    //   enableSorting: true,
    //   enableFilter: true,
    //   ready: function(api) {
    //           api.sizeColumnsToFit();
    //       }
    // };

    $scope.$on('getCases', function () {
      var promise = OnboardingService.getImportCases();
      promise.then(function (result) {
        console.log('Salesforce import', result);
        var promiseCasePriority = OnboardingService.getImportCasePriority();
        promiseCasePriority.then(function (result) {
          console.log('Case Severities', result);
          ob_cmc.caseSeverities = result;
        });
        var promiseCaseStatus = OnboardingService.getImportCaseStatus();
        promiseCaseStatus.then(function (result) {
          console.log('Case Status', result);
          ob_cmc.caseStatus = result;
        });
      });
    });
  }

  angular.module('tCRMAPP').controller('OnboardingCaseManagementCtrl', OnboardingCaseManagementCtrl);
})(angular);

/* global $*/
(function (angular) {
  'use strict';

  function DataSourcesCtrl($log, $rootScope, OnboardingService) {
    var ob_dsc = this;
    ob_dsc.selDataSource = {};
    $log.info('DataSourcesCtrl...');
    function getDatasource() {
      var promise = OnboardingService.getDatasource();
      promise.then(function (result) {
        ob_dsc.datasources = result;
        $log.info('getCustomer -----------' + JSON.stringify(result));
      });
    }

    ob_dsc.setDatasource = function (datasource) {
      ob_dsc.selDataSource = datasource;
      if (!datasource.isActive) {
        ob_dsc.selDataSource.hostURL = datasource.defaultHostUrl;
      }
      var promise = OnboardingService.getStandardObject(ob_dsc.selDataSource.id);
      promise.then(function (result) {
        ob_dsc.standardObject = result;
      });
    };
    getDatasource();
    ob_dsc.getProducts = function () {
      $rootScope.$broadcast('getProducts');
    };
  }

  angular.module('tCRMAPP').controller('DataSourcesCtrl', DataSourcesCtrl);
})(angular);

/* global $*/
(function (angular) {
  'use strict';

  function ObProductsCtrl($log, $scope, $rootScope, ProductServices) {
    var ob_pc = this;
    ob_pc.products = [];

    console.log('ObProductsCtrl');

    ob_pc.columnDefs = [{ headerName: "Product Code", field: "productCode" }, { headerName: "Product Name", field: "productName" }, { headerName: "Product Description", field: "productDescription" }, { headerName: "Product Family/Category", field: "productCategoryName" }, { headerName: "SubCategory Name", field: "productSubCategoryName" }, { headerName: "Unit of Measure", field: "unitOfMeasure" }];

    ob_pc.gridOptions = {
      columnDefs: ob_pc.columnDefs,
      rowData: null,
      enableColResize: true,
      enableSorting: true,
      enableFilter: false,
      rowSelection: 'single',
      onSelectionChanged: onSelectRow,
      ready: function ready(api) {
        api.sizeColumnsToFit();
      }
    };
    //
    $scope.$on('getProducts', function () {
      //ob_pc.gridOptions.api.showLoading(show);
      var promiseAllMetaData = ProductServices.getAllMetaData();
      promiseAllMetaData.then(function (result) {
        //console.log("all MetaData", result);
        var promise = ProductServices.importProducts();
        promise.then(function (result) {
          var innerPromise = ProductServices.getAll();
          innerPromise.then(function (result) {
            ob_pc.products = result;
            //console.log("all products", result);
            ob_pc.gridOptions.api.setRowData(ob_pc.products);
          });
        });
      });
    });
    //
    $scope.$on('refreshProductList', function () {
      refreshProductList();
    });
    function refreshProductList() {
      $log.info('refreshProductList' + ob_pc.products);
      var innerPromise = ProductServices.getAll();
      innerPromise.then(function (result) {
        ob_pc.products = result;
        //console.log("all cases", result);
        ob_pc.gridOptions.api.setRowData(ob_pc.products);
      });
    }

    // function getAllMetaData(){
    //   let promiseAllMetaData= ProductServices.getAllMetaData();
    //   promiseAllMetaData.then(function (result) {
    //     console.log("all MetaData", result);
    //   });
    // }

    /*Open Product popup and assign Category to dropdown*/
    ob_pc.openCreatePopup = function () {
      var promise = ProductServices.getProductCategory();
      promise.then(function (result) {
        console.log(result);
        ob_pc.productCategories = result;
      });
      ob_pc.product = {};
    };

    ob_pc.openEditPopup = function () {
      ob_pc.productCategories = {};
      ob_pc.productSubCategories = {};
      if (!_.isEmpty(ob_pc.product)) {
        openEdiPopup();
        var promise = ProductServices.getProductCategory();
        promise.then(function (result) {
          ob_pc.productCategories = result;
        });
        if (ob_pc.product.productCategoryId) {
          ProductServices.getProductSubCategory(ob_pc.product.productCategoryId).then(function (result) {
            ob_pc.productSubCategories = result;
          });
        }
      }
    };
    ob_pc.deleteProduct = function () {
      if (!_.isEmpty(ob_pc.product)) {
        var promise = ProductServices.remove(ob_pc.product);
        promise.then(function (result) {
          refreshProductList();
          ob_pc.product = {};
        });
      }
    };
    function onSelectRow() {
      var rows = ob_pc.gridOptions.api.getSelectedRows();
      ob_pc.product = rows && rows.length > 0 ? rows[0] : null;
    }
    function openEdiPopup() {
      $('#editProductModal').modal('show');
    };
    ob_pc.getAccounts = function () {
      $rootScope.$broadcast('getAccounts');
    };
    /*
    =======
       ob_pc.deleteProduct = deleteProduct;
       ob_pc.columnDefs = [
        {headerName: "Product Code", field: "product_code"},
        {headerName: "Product Name", field: "product_name"},
        {headerName: "Product Description", field: "product_desc"},
        {headerName: "Product Category", field: "product_cat"}
      ];
      ob_pc.gridOptions = {
        columnDefs: ob_pc.columnDefs,
        rowData: ob_pc.products,
        rowHeight: 22,
        rowSelection: 'single',
        onSelectionChanged: onSelectRow,
        onGridReady: function() {
          //ob_pc.gridOptions.columnApi.sizeColumnsToFit();
        }
      };
    
      init();
    
      function init() {
        getProducts();
      }
    
      function getProducts() {
        let promise = ProductServices.getAll();
        promise.then(function (res) {
          ob_pc.products = res;
          ob_pc.gridOptions.api.setRowData(ob_pc.products);
        });
      }
    
      function deleteProduct() {
        if (!_.isEmpty(product)) {
          ProductServices.remove(product);
          product = {};
        }
      }
    
      function onSelectRow() {
        product = ob_pc.gridOptions.api.getSelectedRows();
      }
    
       $scope.$on("products:updated", function() {
         getProducts();
       });
    >>>>>>> snapshot_poc_fall_dev
    */
  }

  angular.module('tCRMAPP').controller('ObProductsCtrl', ObProductsCtrl);
})(angular);

/* global $*/
(function (angular) {
  'use strict';

  function WelcomeCtrl($log, $sce, OnboardingService, toaster) {
    var ob_wel = this;
    $log.info('WelcomeCtrl...');

    function getCustomer() {
      var promise = OnboardingService.getCustomer();
      promise.then(function (result) {
        ob_wel.customer = result;
        $log.info("getCustomer ----------- " + JSON.stringify(ob_wel.customer));
      });
    }

    getCustomer();
  }

  angular.module('tCRMAPP').controller('WelcomeCtrl', WelcomeCtrl);
})(angular);

/* global $*/
(function (angular) {
  'use strict';

  function OnboardingCtrl($log, $scope, AuthService, AccountService, CaseService, PortletService) {
    var oc = this;
    $log.info('OnboardingCtrl...');

    // Get auth object
    var authObject = AuthService.getAuth();
    if (authObject) {
      $log.info('authObject:', authObject);
      var username = atob(authObject.auth.split(' ')[1]); //dhirajsingh@lmsin.com:12345
      oc.username = username.split(':')[0];
      $log.info('oc.username', oc.username);
    }
  }

  angular.module('tCRMAPP').controller('OnboardingCtrl', OnboardingCtrl);
})(angular);

'use strict';

/**
 * @ngdoc overview
 * @name tCRMAPP.routes
 * @description
 * # tCRMAPP.routes
 *
 * Routes module of the tCRMAPP application.
 */
angular.module('tCRMAPP.routes', ['ngRoute']).config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'lc'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'lc'
  }).when('/dash', {
    templateUrl: 'views/dash.html',
    controller: 'DashCtrl',
    controllerAs: 'dc'
  }).when('/dashboard', {
    templateUrl: 'views/dashboard.html',
    controller: 'DashboardCtrl',
    controllerAs: 'dbc'
  }).when('/onboarding', {
    templateUrl: 'views/onboarding/index.html',
    controller: 'OnboardingCtrl',
    controllerAs: 'oc',
    resolve: {
      'Resolver': 'AuthResolver'
    }
  }).when('/cases', {
    templateUrl: 'views/cases.html',
    controller: 'CasesCtrl',
    controllerAs: 'cc',
    resolve: {
      'Resolver': 'AuthResolver'
    }
  }).when('/createcase', {
    templateUrl: 'views/createcase.html',
    controller: 'CreateCaseCtrl',
    controllerAs: 'ccc'
  }).when('/accounts', {
    templateUrl: 'views/accounts.html',
    controller: 'AccountCtrl',
    controllerAs: 'acc'
  }).when('/accountdetail/:id', {
    templateUrl: 'views/accountdetail.html',
    controller: 'AccountDetailCtrl',
    controllerAs: 'acdtl'
  }).when('/casedetail/:id', {
    templateUrl: 'views/casedetail.html',
    controller: 'CaseDetailCtrl',
    controllerAs: 'cdtl'
  }).otherwise({
    redirectTo: '/'
  });
});

'use strict';

/**
 * @ngdoc overview
 * @name tCRMAPP.configs
 * @description
 * # tCRMAPP.configs
 *
 * configs module of the tCRMAPP application.
 */
angular.module('tCRMAPP.configs', ['LocalStorageModule']).config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('tcrm') //prefix
  .setStorageType('sessionStorage') //session type
  .setNotify(true, true); //notify on setItem & removeItem
}).config(function (RestangularProvider) {
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
}).factory('interceptor', function (localStorageService) {
  console.log('interceptor...');
  return {
    request: function request(httpConfig) {
      var token = localStorageService.get('auth');
      if (token) {
        httpConfig.headers['authorization'] = token;
      }
      return httpConfig;
    }
  };
}).config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('interceptor');
}]);

'use strict';

/**
 * @ngdoc overview
 * @name tCRMAPP.configs
 * @description
 * # tCRMAPP.configs
 *
 * configs module of the tCRMAPP application.
 */
angular.module('tCRMAPP.filters', ['ngSanitize']).filter("sanitize", ['$sce', function ($sce) {
  //THIS IS FOR SEARCH HIGHLIGHTING FOR EMBEDED MARKUP
  return function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  };
}]);
//# sourceMappingURL=script-es5.js.map
//# sourceMappingURL=script-es5.js.map
