'use strict';

function AccountService($log, Restangular, toaster, $q){
    class Service {
        constructor() {
          //Restangular.setBaseUrl('http://103.21.53.11:8389');
          $log.info('account service');
        }
        initialize(){
        }
        /*
        1)Retrieval
          URL- http://103.21.53.11:8389/accounts/
          Action Type -GET
          Request Header -
          Content-Type - application/json
          Accept - application/json
        */
        getAccounts(){
          $log.info('AccountsService::getAccounts');
          return Restangular.all('accounts').getList().then((data) =>{
            $log.info('success', 'Retrieved accounts.', data.length);
            toaster.pop('success','Retrieved accounts');
            return data;
          }, function(err) {
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
        getRequesters(accountId){
          $log.info('AccountsService::getRequesters');
          return Restangular.one('user/requester' , accountId).get().then( function (data) {
            $log.info('success', 'Retrieved requesters.', data);
            return data;
          }, function(err) {
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
        getAccountDetail(id) {
          return Restangular.one('accounts', id).get().then( function (data) {
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
        importAccounts(){
          return Restangular.all('sfdc').customGET('importaccounts').then((data) =>{
            $log.info('success', 'Account Imported');
            return data;
          }, function(err) {
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
        getAccountsList(){
          $log.info('AccountsService::getAccounts');
          return Restangular.all('accounts/list').getList().then((data) =>{
            toaster.pop('success','Retrieved accounts');
            return data;
          }, function(err) {
            toaster.pop('error', 'Api error.', 'error connect to api.');
          });
        }
    }
    let svc= new Service();
    return svc;
}
angular.module('tCRMAPP').factory('AccountService',AccountService);
