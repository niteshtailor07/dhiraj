((angular) => {
  'use strict';

function PortletService($log, $q, $rootScope) {
  let dashboard = [{
      accountType: 'all',
      user: 'longh',
      name: 'overview',
      id: 'dash_1',
      portlets: [
        {
          id: 'portlet_2',
          name: 'Account Health: All Accounts',
          type: 'tree_map',
          size: 'small',
          data: [
            {'value': 1, 'name': 'AT&T', 'growth': -.9},
            {'value': 1, 'name': 'Chevron', 'growth': -.2},
            {'value': 1, 'name': 'Walgreen', 'growth': .5},
            {'value': 1, 'name': 'Apple', 'growth': .5},
            {'value': 1, 'name': 'Boeing', 'growth': -.3},
            {'value': 1, 'name': 'Oracle', 'growth': .65},
            {'value': 1, 'name': 'Dupont', 'growth': .2},
            {'value': 1, 'name': 'Disney', 'growth': .1}
          ]
        }, {
          id: 'portlet_3',
          name: 'CSAT',
          type: 'bar',
          size: 'small',
          data: [
             {'year': 2011, 'name':'beta', 'score': 7},
             {'year': 2012, 'name':'beta', 'score': 4},
             {'year': 2013, 'name':'beta', 'score': 8},
             {'year': 2014, 'name':'beta', 'score': 5},
             {'year': 2015, 'name':'beta', 'score': 5},

           ]
        }, {
          id: 'portlet_4',
          name: 'Case Count Trend',
          type: 'line',
          size: 'small',
          data: [
             {'week': 1, 'name':'Open', 'value': 15, 'parent': 'Open'},
             {'week': 2, 'name':'Open', 'value': 20, 'parent': 'Open'},
             {'week': 3, 'name':'Open', 'value': 30, 'parent': 'Open'},
             {'week': 4, 'name':'Open', 'value': 40, 'parent': 'Open'},
             {'week': 1, 'name':'Close', 'value': 20, 'parent': 'Close'},
             {'week': 2, 'name':'Close', 'value': 20, 'parent': 'Close'},
             {'week': 3, 'name':'Close', 'value': 25, 'parent': 'Close'},
             {'week': 4, 'name':'Close', 'value': 32, 'parent': 'Close'}
           ]
        }
      ]
    },
    {
      accountType: 'all',
      user: 'longh',
      name: 'custom',
      id: 'dash_2',
      portlets: [
        {
          id: 'portlet_1',
          name: 'MTTR',
          type: 'tree_map',
          size: 'small',
          data: [
            {'value': 1, 'name': 'Honeywell', 'growth': .9},
            {'value': 1, 'name': 'Bestbuy', 'growth': .4},
            {'value': 1, 'name': 'Yelp', 'growth': -.3},
            {'value': 1, 'name': 'Facebook', 'growth': -.65},
            {'value': 1, 'name': 'Amazon', 'growth': .7},
            {'value': 1, 'name': 'Google', 'growth': .2},
            {'value': 1, 'name': 'Tesla', 'growth': .2},
            {'value': 1, 'name': 'GoPro', 'growth': .2},
            {'value': 1, 'name': 'Ebay', 'growth': .2}
          ]
        }
      ]
    }];

  let service = {
    getPortlets: getPortlets,
    createPortlet: createPortlet
  };

  return service;

  function getPortlets(i) {
    if(typeof(Storage) !== 'undefined') {
        let result = {};
        let temp = [];
        let deferred = $q.defer();

        //add more attribute here for the dashboard
        result.id = dashboard[i].id;
        console.log("portletServices...", dashboard[i]);
        if(localStorage.getItem(dashboard[i].id)){
            let storageData = localStorage.getItem(dashboard[i].id).split(',');
            console.log('dbc.dashboard.id from localStorage:', storageData);
            _.forEach(storageData, function(key, n) {
               let result = _.findWhere(dashboard[i].portlets, { 'id': key});
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

         return deferred.promise;
    }
  }

  function createPortlet(dashboardId, pData) {
    for (let i = 0; i < dashboard.length; i++) {
      if (dashboard[i].id === dashboardId) {
        let alreadyThere = _.findWhere(dashboard[i].portlets, { 'id': pData.id});
        console.log("checking if data is already there", alreadyThere);
        if (alreadyThere === null || alreadyThere === undefined) {
          dashboard[i].portlets.push(pData);

          //save the order to local storage
          if (localStorage.getItem(dashboard[i].id)) {
            let storageData = localStorage.getItem(dashboard[i].id).split(',');
            storageData.push(pData.id);
            console.log('local storage in create new portlet:', storageData);
            localStorage.setItem(dashboardId, storageData);
          }
          $rootScope.$broadcast('portlet:created', {id: i });
          //console.log("broadcasting new portlet");
        }
      }
    }
  }
}

angular
  .module('tCRMAPP')
  .factory('PortletService', PortletService);
}(angular));
