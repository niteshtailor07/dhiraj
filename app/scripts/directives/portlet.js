/*globals $*/
((angular) => {
'use strict';
/*
* @name portlet directive
* usage: <portlet></portlet>
* desc: A portlet for dashboard
*
*/
    var portlet =  (/*, $compile*/$log, $timeout, toaster) => {
      function createPortlet(result){
        $log.info('createPortlet...');
        let data = [];
        let deferred = $.Deferred();
        if(result){
          if(data){
            deferred.resolve(result);
          }else{
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
          templateUrl: function(elem, attrs) {
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
          link: function(scope, element, attrs) {//DOM manipulation
            //$log.info(scope, element, attrs);
            /*
              //CALLING CALLBACK AND PASS PARAMS
              scope.clickHandler = (param, id) => scope.callback()(param, id);
            */
            $log.info('link in portlets...');

            //WATCH FOR CHANGES FROM DIGEST CYCLE
            scope.$watch('data', () => {
              $log.info('BBBBB changes in data', scope);
              scope.isHidden = false;
              let deferred = createPortlet(scope.data);
              deferred.then((result) => {
                $log.info('CCCCC result:', result);
                //scope.portlets = result;//use in template
                scope.isHidden = true;//now hide loader

                //portlets binding codes starts
                $( '.column' ).sortable({
                  connectWith: '.column',
                  handle: '.portlet-header',
                  cancel: '.portlet-toggle',
                  placeholder: 'portlet-placeholder ui-corner-all',
                  update : function () {
                    var order = $('.column').sortable('toArray');
                    //SAVE ORDER TO STORAGE (DB LATER)
                    if(typeof(Storage) !== 'undefined') {
                      console.log('Order 1:', order);
                      console.log('controller.dashboard.id:', scope.controller.dashboard.id);
                        // Code for localStorage/sessionStorage// Store
                        localStorage.setItem(scope.controller.dashboard.id, order);
                    } else {
                        // Sorry! No Web Storage support..
                    }
                 }
                });

                $('.column').bind('sortstart', function(event, ui) {
                     //console.log('...here sortstart');
                    $('.portlet-placeholder').append('<span>Drop here</span>');
                });

                $( '.portlet' )
                  .addClass( 'ui-widget ui-widget-content ui-helper-clearfix ui-corner-all' )
                  .find( '.portlet-header' )
                    .addClass( 'ui-widget-header ui-corner-all' )
                    .prepend( '<span class="ui-icon ui-icon-minusthick portlet-toggle"></span>');

                $( '.portlet-toggle' ).click(function() {
                  var icon = $( this );
                  icon.toggleClass( 'ui-icon-minusthick ui-icon-plusthick' );
                  icon.closest( '.portlet' ).find( '.portlet-content' ).toggle();
                });

                //portlets ends

                /*
                $timeout makes sure it's executed when the ng-repeated elements have REALLY
                finished rendering (because the $timeout will execute at the end of the
                current digest cycle -- and it will also call $apply internally, unlike setTimeout).
                */
                $timeout( () => {
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

                  _.forEach(scope.data, function(datum, key) {
                    console.log(datum);
                    let visualization = d3plus.viz()
                      .container('#boo'+datum.id)
                      .data(datum.data)
                      .type(datum.type);
                      if(datum.type === 'bar'){
                        visualization.id('name').x('year').y('score')
                      }
                      else if (datum.type === 'line') {
                        visualization.id(['parent','name'])
                        .y('value')
                        .x('week')
                      }
                      else {
                        visualization.id('name').size('value').color('growth')
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

    angular.module('tCRMAPP')
        .directive('portlet', portlet);

}(angular));
