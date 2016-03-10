'use strict';
function StorageService($log,$cookies){
  class Service{
    constructor(){
      $log.info('storage service');
    }
    initialize(){
    }
    get(key) { return sessionStorage.getItem(key);  }
    put(key, value) { return sessionStorage.setItem(key, value); }
    remove(key) { return sessionStorage.removeItem(key); }
  };
  let svc= new Service();
  return svc;
}

angular.module('tCRMAPP').factory('StorageService',StorageService);
