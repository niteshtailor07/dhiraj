/*globals $*/
((angular) => {
'use strict';
/*
* @name portlet directive
* usage: <portlet></portlet>
* desc: A portlet for dashboard
*
*/
    var portletWidget =  (PortletService, $timeout) => {
      var directive = {
        restrict: 'EA',
        templateUrl: 'views/directive/portlet_widget.html',
        scope: {
          //@ reads the attribute value as a string,
          //= provides two-way binding,
          //& works with functions
          controller: '='
        },
        link: function(scope, element, attrs) {
          scope.portletWidgets = [
               {
                 id:'new_portlet_1',
                 name: 'MTTR Heat Map 1',
                 type: 'tree_map',
                 size: 'small',
                 img: '/images/Treemap.png',
                 desc: "Compare the mean time to resolution across your clients with this heat map"
               }, {
                 id:'new_portlet_2',
                 name: 'Case MTTR Trend 2',
                 type: 'line',
                 size: 'small',
                 img: '/images/trendchart.png',
                 desc: " View the MTTR trend up to last 6 months with this trend chart"
               }, {
                 id:'new_portlet_3',
                 name: 'CSAT Bar 3',
                 type: 'bar',
                 size: 'small',
                 img: '/images/barchart.png',
                 desc: "Compare the time to first response across your clients with this bar chart"
               }, {
                 id:'new_portlet_4',
                 name: 'MTTR Heat Map 4',
                 type: 'tree_map',
                 size: 'small',
                 img: '/images/Treemap.png',
                 desc: "Compare the mean time to resolution across your clients with this heat map"
               }, {
                 id:'new_portlet_5',
                 name: 'Case MTTR Trend 5',
                 type: 'line',
                 size: 'small',
                 img: '/images/trendchart.png',
                 desc: " View the MTTR trend up to last 6 months with this trend chart"
               }, {
                 id:'new_portlet_6',
                 name: 'CSAT Bar 6',
                 type: 'bar',
                 size: 'small',
                 img: '/images/barchart.png',
                 desc: "Compare the time to first response across your clients with this bar chart"
               }
           ];

           let p = [
             {
               id: 'new_portlet_1',
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
             },  {
               id: 'new_portlet_2',
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
             },  {
                id: 'new_portlet_3',
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
                id: 'new_portlet_4',
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
              },  {
                id: 'new_portlet_5',
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
              },  {
                   id: 'new_portlet_6',
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
                 }
            ];

           $timeout( () => {

             $('.portlet-widgets').slick( {
               infinite: true,
               slidesToShow: 3,
               slidesToScroll: 3,
               dots: true
             });

             $('*[draggable!=true]','.slick-track').unbind('dragstart');
             $('.portlet-widget').draggable( {
                helper: 'clone',
                revert: 'invalid',
             });

             $('.droppable').droppable( {
               drop: function (event, ui) {
                 let dashId = scope.controller.dashboard.id;
                 let portletId = ui.draggable.context.id;
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
      }
      return directive;
    };

    angular.module('tCRMAPP')
        .directive('portletWidget', portletWidget);

}(angular));
