'use strict';

function AssetsService($log, Restangular, toaster){
    class Service {
        constructor() {
          //Restangular.setBaseUrl('http://103.21.53.11:8389');
          $log.info('Assets service');
        }
        initialize(){
        }
        /*
        1)Retrieval
          URL- http://103.21.53.11:8389/assets/
          Action Type -GET
          Request Header -
          Content-Type - application/json
          Accept - application/json
        */
        getAssets(){
          $log.info('AssetsService::getAccounts');
          return Restangular.all('assets').getList().then((data) =>{
            $log.info('success', 'Retrieved accounts.', data.length);
            return data;
          }, function(err) {
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
        getAssetsByAccount(accId){
        return Restangular.all("assets").customGETLIST("query", {accountno: accId}).then((data) =>{
            $log.info('success', 'Retrieved asset.');
            return data;
          }, function(err) {
            toaster.pop('error', 'Api error.', 'error connect to api.');
          });
        };
        /*
        3)Retrieve asset details
          URL- http://103.21.53.11:8389/assets/{{assetId}}
          Action Type -GET
          Request Header -
          Content-Type - application/json
          Accept - application/json
        */
        getAssetDetail(id){
          return Restangular.one('assets', id).get().then( function (data) {
            console.log('return single assets based on id from service', data);
            return data;
          }, function (err) {
            toaster.pop('error', 'Api error.', 'error connect to api');
          });
        };

    }
    let svc= new Service();
    return svc;
}
angular.module('tCRMAPP').factory('AssetsService',AssetsService);
