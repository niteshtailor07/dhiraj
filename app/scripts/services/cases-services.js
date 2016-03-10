'use strict';

//const UPLOAD_URL = 'http://103.21.53.11:8389/cases';
const UPLOAD_URL = 'http://cloudia.co.in/cases';

function CaseService($log, Restangular, toaster,Upload){
    class Service {
        constructor() {
          //Restangular.setBaseUrl('http://103.21.53.11:8389');
          //$log.info('cases service');
          this.cases={};
        }
        initialize(){
        }
        /*
        1)Retrieval
          URL- http://103.21.53.11:8389/cases/
          Action Type -GET
          Request Header -
          Content-Type - application/json
          Accept - application/json
        */
        getCases(isMyCase){
          return Restangular.all('cases').getList().then((data) =>{
            $log.info('CaseService::getCases data:', data);
            toaster.pop('success', 'Retrieved cases.', data.length);
            if (isMyCase === true) {
              var temp = [];
              temp = _.where(data, {assignedtoUserName: 'Aditya'});
              this.cases = temp;
            } else {
              this.cases=data;
            }

            return this.cases;
          }, function(err) {
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
        createCase(c,selectedFile){
          var parent= this;
          var fd = new FormData();
          fd.append("data",angular.toJson(c));
          console.log(selectedFile+"  "+selectedFile!=undefined);
          if(selectedFile){
            fd.append("file", selectedFile[0]);
          }
          return this.cases.withHttpConfig({transformRequest: angular.identity})
          .customPOST(fd, undefined, undefined,{ 'Content-Type': undefined })
          .then((response) =>{
              toaster.pop('success', 'Case inserted.');
              Restangular.one('cases', response.id).get().then(function(c) {
                console.log('createCase' , parent.cases);
                 parent.cases.push(c);
              });
          }, function(err) {
            toaster.pop('error', 'Api error.','error in creating case');
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
        editCase(c,selectedFile,oldValue){
          var parent= this;
          var fd = new FormData();
          if(c && c.extra){
            delete c.extra;
          }
          //var cPlain = c.plain()
          //console.log(c)
          fd.append("data",angular.toJson(c));
          console.log(selectedFile+"  "+selectedFile!=undefined);
          if(selectedFile){
            fd.append("file", selectedFile[0]);
          }
          return Restangular.all('cases').withHttpConfig({transformRequest: angular.identity})
          .customPUT(fd, undefined, undefined,{ 'Content-Type': undefined })
          .then((response) =>{
              toaster.pop('success', 'Case Updated.');
          }, function(err) {
            toaster.pop('error', 'Api error.','error in updating case');
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
        getCaseValues(){
          return Restangular.all('cases').customGET("tempdata").then((data) =>{
            $log.info('success', 'Retrieved cases values', data);
            return data;
          }, function(err) {
            toaster.pop('error', 'Api error.', 'error connect to api.');
          });
        }

        // Get Case Types
        getCaseTypes(){
          return Restangular.all('cases/picklist/casetype').getList().then((data) =>{
            //$log.info('success', 'Retrieved cases types', data);
            return data;
          }, function(err) {
            toaster.pop('error', 'Api error.', 'error connect to api.');
          });
        }

        // Get Case Origin
        getCaseOrigin(){
          return Restangular.all('cases/picklist/caseorigin').getList().then((data) =>{
            //$log.info('success', 'Retrieved cases types', data);
            return data;
          }, function(err) {
            toaster.pop('error', 'Api error.', 'error connect to api.');
          });
        }

        // Get Case Severity
        getCaseSeverity(){
          return Restangular.all('cases/picklist/casepriority').getList().then((data) =>{
            $log.info('success', 'Retrieved cases Severity', Restangular.stripRestangular(data));
            return data;
          }, function(err) {
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
        getRequesters(){
          return Restangular.all('cases').customGET("requester").then((data) =>{
            //$log.info('success', 'Retrieved requester');
            return data;
          }, function(err) {
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
        deleteCase(c){
          return c.remove().then((response) =>{
              toaster.pop('success', 'Case Deleted.');
              return;
            }, function(err) {
              toaster.pop('error', 'Api error.','error in deleting case');
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
        searchCases(freeText, start, end){
          return Restangular.all('solr/cases/').customGETLIST(freeText,{freeText:freeText, start:start, end:end}).then((data) =>{
           // $log.info('CaseService::search cases:', data);
            toaster.pop('success', 'Retrieved cases.', data.length);
            this.cases=data;
            return this.cases;
          }, function(err) {
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
        getCaseDetail(id){
          return Restangular.one('cases', id).get().then( function (data) {
            console.log('return single case based on id from service', data);
            return data;
          }, function (err) {
            toaster.pop('error', 'Api error.', 'error connect to api');
          });
        };
        /*
        9)Case will be assigned to Aditya in backend
          URL- http://103.21.53.11:8389/cases/{{casesId}}
          Action Type -PUT
          Request Header -
          Content-Type - application/json
          Accept - application/json
        */
        assignToMe(id){
          return this.cases.customPUT(undefined, 'assignedto/'+ id)
          .then((response) =>{
              toaster.pop('success', 'Case Assigned.');
              return response;
          }, function(err) {
            toaster.pop('error', 'Api error.','error in updating case');
            return;
          });
        }

    }
    let svc= new Service();
    return svc;
}
angular.module('tCRMAPP').factory('CaseService',CaseService);
