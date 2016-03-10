'use strict';

function OnboardingService($log, Restangular, toaster){
    class Service {
        constructor() {
          $log.info('Onboarding service');
        }
        initialize(){
        }

        /*
        1)Retrieval (Customer()
          URL- http://103.21.53.11:8389/customer
          Action Type -GET
          Request Header -
          Content-Type - application/json
          Accept - application/json
        */
        getCustomer(){
          return Restangular.one('customer').get().then((data) =>{
            $log.info('success', 'Retrieved customer values'+ JSON.stringify(data));
            return data;
          }, function(err) {
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
        connect(datasource){
          return Restangular.one('datasource').customPUT(datasource, undefined, {}, {'Content-Type': 'application/json'}).then((response, status) =>{
            console.log(response.status)
            if(response.status){              
              toaster.pop('success', response.message,);
            }else{
              toaster.pop('error', response.message);
            }
            return response;
          }, function(err) {
            toaster.pop('error', 'Api error.','error in connecting database');
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
        getDatasource(){
          return Restangular.one('datasource').get().then((data) =>{
            return data;
          }, function(err) {
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
        getStandardObject(id){
          return Restangular.all('datasource/standardobject/'+id).getList().then((data) =>{
            return data;
          }, function(err) {
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
        updateStandardObject(object){
          object=Restangular.stripRestangular(object);
          return Restangular.all('datasource/standardobject').customPOST({customerObjectList:object})
          .then((response) =>{
              return response;
          }, function(err) {
            toaster.pop('error', 'Api error.', 'error connect to api.');
            return;
          });
        } 

        // Case Management services
        getImportCases(){
          return Restangular.one('sfdc/importcases').get().then((data) =>{
            toaster.pop('success', data.message);
            return data;            
          }, function(err) {
            toaster.pop('error', 'Api error.', 'error connect to api.');
          });
        }

        getImportCasePriority(){
          return Restangular.one('cases/picklist/casepriority').get().then((data) =>{
            //toaster.pop('success', data.message);
            return data;            
          }, function(err) {
            toaster.pop('error', 'Api error.', 'error connect to api.');
          });
        }

        getImportCaseStatus(){
          return Restangular.one('cases/picklist/casestatus').get().then((data) =>{
            //toaster.pop('success', data.message);
            return data;            
          }, function(err) {
            toaster.pop('error', 'Api error.', 'error connect to api.');
          });
        }





    }
    let svc= new Service();
    return svc;
}
angular.module('tCRMAPP').factory('OnboardingService',OnboardingService);
