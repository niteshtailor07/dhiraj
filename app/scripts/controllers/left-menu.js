((angular) => {
'use strict';

angular.module('tCRMAPP')
  .controller('LeftMenuCtrl', function ($scope,$location) {
    let lmc = this;
    lmc.isActive = isActive;

    function isActive (currentPath) {
       return currentPath === $location.path(); 
    }


    //FOR ADJUSTING THE EQUAL HEIGHTS - https://github.com/Sam152/Javascript-Equal-Height-Responsive-Rows/blob/master/demo.html
    jQuery(function($) {
      $('.element').responsiveEqualHeightGrid();
    });

  });
}(angular));
