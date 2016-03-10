'use strict';

/**
 * @ngdoc overview
 * @name tCRMAPP.configs
 * @description
 * # tCRMAPP.configs
 *
 * configs module of the tCRMAPP application.
 */
angular.module('tCRMAPP.filters', ['ngSanitize']).filter("sanitize", ['$sce', function($sce) {//THIS IS FOR SEARCH HIGHLIGHTING FOR EMBEDED MARKUP
      return function(htmlCode){
          return $sce.trustAsHtml(htmlCode);
      }
}]);
