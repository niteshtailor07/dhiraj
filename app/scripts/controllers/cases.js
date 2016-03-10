/*globals _*/
((angular)=>{
    'use strict';
    function CasesCtrl($scope,$filter,$log,$sce,CaseService,AccountService,AssetsService,Restangular, toaster){
      let cc=this;
      cc.caseFilter={};
      cc.freeText='';
      cc.trustAsHtml = $sce.trustAsHtml;//sanitazing html like that  ngSanitize
      cc.values = {"source": '', "type": '', "severity": '',}

      /*cc.cases=[
      {
          'id': '07ff91d4-0522-48be-b15c-05feec17332a',
          'accountid': 'LMS1111',
          'caseNumber': '1',
          'description': 'NO DATA FAKE',
          'type': 1,
          'openDate': 1439380838107,
          'closedDate': 1439380838106,
          'lastUpdate': 1439380838107,
          'creatorName': 'Rakesh Manocha',
          'parentCaseNumber': 'Sales',
          'priority': 1,
          'status': 2,
          'subject': 'Case',
          'currentqueue': 'Current Queue-'
      }];*/
    /*
      column defination for grid view
      header, field
    */
    cc.columnDefs=[
      {headerName: 'Id', field: 'crm_case_id'},
      {headerName: 'Subject', field: 'subject'},
      {headerName: 'Open Date', field: 'openDate',
      cellRenderer: function(params) {
        // cellRender filter to show date in format EEEE, MMM d yyyy as in list view
        return $filter('date')(params.data.openDate, 'EEEE, MMM d yyyy');
      }},
      {headerName: 'Account', field: 'accountName'},
      {headerName: 'Creater Name', field: 'createdbyUserName'},
      {headerName: 'Assign To', field: 'assignedtoUserName'},
      {headerName: 'Description', field: 'description'}
    ];

    /*
    setting grid options
    */
    cc.gridOptions = {
      columnDefs: cc.columnDefs,
      rowData: null,
      enableFilter: true,
      enableColResize: true,
      enableSorting: true,
      angularCompileRows:true,
      sortingOrder: ['desc','asc',null],
      isExternalFilterPresent: isExternalFilterPresent,// activate external filter
      doesExternalFilterPass: doesExternalFilterPass  // function apply filter on grid on given condition
    };
    // Function to activate external filters
    function isExternalFilterPresent() {
      return true;
    }
    // apply filter on change of filter
    function doesExternalFilterPass(node) {
      var result=true;
      if(filter.search.status){
        // controll come inside if status filter is not selected to All
        result= (node.data.status==filter.search.status);
      }
      if(result && filter.search.priority){
        // controll come inside if priority filter is not selected to All
        result=(node.data.priority==filter.search.priority);
      }
      if(result){
        if(filter.search.assignedtoUserName===""){
          result=(node.data.assignedtoUserName!=filter.search.assignedtoUserName);
        }else{
          result=(node.data.assignedtoUserName==filter.search.assignedtoUserName);
        }

      }
      return result;
    }
    // dummy filter for all cases and Aditya(my) cases
    cc.filterUserCase=function(val,unAssigned){
      cc.caseFilter.search.assignedtoUserName=val;
      cc.gridOptions.api.onFilterChanged();// inform the grid that it needs to filter the data
    }
    // filter applied on cases holds all filters as filter.status, filter.priority
    var filter=cc.caseFilter;
    /*
      reset filter to all
      filter.status-> All
      filter.priority-> to All
    */
    cc.resetFilters= function(){
      filter.status=cc.caseStatus[0];
      filter.priority=cc.casePriority[0];
      filter.search={};
      cc.search={};
    };
        /*
          initialize case context
        */
      cc.init= function(){
        var v = {value:'All'};
        cc.activeMenu = 1;
        cc.getCases = getCases;
        cc.caseStatus =[v];
        cc.casePriority =[v];
        cc.listView=true;
        cc.resetFilters();
        cc.searchStart=0;
        cc.searchEnd=0;
        //adding sorting option on cases listing
        cc.sortOptions=[{"key":"openDate","value":"Open Date","reverse":true},{"key":"accountName", "value":"Account","reverse":false},{"key":"assignedtoUserName","value":"Requester","reverse":false}];
        cc.caseFilter.caseSort = cc.sortOptions[0];
        getCases(true);
        //assigned and unassigned Case Filter
        cc.caseFilter.search.assignedtoUserName="";
        cc.mycasesCaseFilter={assignedtoUserName:"Aditya"};
        cc.assignedCaseFilter={assignedtoUserName:""};
        cc.unassignedCaseFilter={assignedtoUserName:null};
        //getCasesValues();
      };

      cc.init();

      function getCases(isMyCase) {
        let promise = CaseService.getCases();
        promise.then(function (result) {
          cc.cases = result;
          cc.getDropdownValues();
          //console.log("all cases", result);
          cc.gridOptions.api.setRowData(cc.cases);
        });
      }

      $scope.$on("getUpdatedCases", function () {
        //alert(0)
        let promise = CaseService.getCases();
        promise.then(function (result) {
          cc.cases = result;
          cc.gridOptions.api.setRowData(cc.cases);
        });
      });


      /*
      fetch values for case status, priority etc
      */
      // let promise = CaseService.getCaseValues();
      // promise.then(function (result) {
      //   cc.values= result;
      //   //$log.info('case severity',result);
      //   cc.caseStatus=cc.caseStatus.concat(cc.values.status);
      //   cc.casePriority=cc.casePriority.concat(cc.values.severity);// [{value:'All'},{id:1,value:'Minor'},{id:2,value:'Major'},{id:3,value:'Critical'}];
      // });



      /*
      fetch values for case type, orgin, severity etc
      */
      cc.getDropdownValues= function(){
        // Get Case Severity
        let promiseSeverity = CaseService.getCaseSeverity();
        promiseSeverity.then(function (result) {
          cc.values.severity = result;
          //$log.info('case Types',result);
        });


        // Get Case Types
        let promiseTypes = CaseService.getCaseTypes();
        promiseTypes.then(function (result) {
          cc.values.type = result;
          //$log.info('case Types',result);
        });

        // Get Case Origin
        let promiseOrigin = CaseService.getCaseOrigin();
        promiseOrigin.then(function (result) {
          cc.values.source = result;
          //$log.info('case Origin',result);
        });
      }

      /*
        apply sorting on cases
      */
      cc.sortCase = function(srt){
        cc.caseFilter.caseSort = srt;
        console.log(srt.key);
        if(!srt.reverse){
          var sort = [{colId: srt.key, sort: 'asc'}];
        }
        else{
          var sort = [{colId: srt.key, sort: 'desc'}];
        }
        cc.gridOptions.api.setSortModel(sort);
      };
      /*
        apply filter on cases
      */
      cc.filterCase = function(name, value){
            switch(name){
                case 'status':
                    filter.status=value;
                    filter.search.status=value.id;
                    break;
                case 'priority':
                    filter.priority=value;
                    filter.search.priority=value.id;
                    break;
            }
            cc.gridOptions.api.onFilterChanged();// inform the grid that it needs to filter the data
        };

        cc.createCase = function(){
          cc.case={};
          cc.file=null;
          cc.getAccounts();
          //cc.getDropdownValues();
          cc.requesters=[];
          cc.selectedAccount=null;
          cc.selectedAsset=null;
        };
        /*
          set case to edit
        */
        cc.editCase=function(c){
          if(c){
            cc.selectedCase= Restangular.stripRestangular(c);
          }
          cc.caseCopy= _.clone(cc.selectedCase,true);
          $log.info('info',cc.selectedCase)
          if(cc.selectedCase){
            cc.getAccounts();
            //cc.getDropdownValues();
            cc.getRequesters(cc.selectedCase.accountId);
            cc.getAssets(cc.selectedCase.accountId);
            cc.extractName(cc.selectedCase.resourceURL);
            cc.selectedAccount=null;
            cc.selectedAsset=null;
            AccountService.getAccountDetail(cc.selectedCase.accountId).then(function(result){
              cc.selectedAccount=result;
            });
            AssetsService.getAssetDetail(cc.selectedCase.assetId).then(function(result){
              cc.selectedAsset=result;
            });
          }
        }
        /*
          delete case from list and server
        */
        cc.deleteCase=function(c){
          if(cc.selectedCase){
            CaseService.deleteCase(cc.selectedCase).then(function(resp){
              $log.info('delete case: ',resp);
              var index = cc.cases.indexOf(cc.selectedCase);
              cc.cases.splice(index,1);
              cc.selectedCase=null;
          });
          }
        }
        /**
        getAssets list by selected account
        */
        cc.getAssets= function(accId){
          let promise = AssetsService.getAssetsByAccount(accId);
          cc.assets=[];
          promise.then(function (result) {
            cc.assets = result;
          });
        }
        /*
        gets Accountlist
        */
        cc.getAccounts= function(){
          cc.accounts=[];
          let promise = AccountService.getAccounts();
          promise.then(function (result) {
            //$log.info('getAccounts:', result);
            cc.accounts = Restangular.stripRestangular(result);

            $log.info('stripgetAccounts:', cc.accounts);
          });
        }
        /*
        get requester list
        */
        cc.getRequesters= function(accountId){

          cc.requesters=[];
          let promise = AccountService.getRequesters(accountId);
          promise.then(function (result) {
            cc.requesters = result;
          });
        }

        /*free text search call*/
        cc.searchText= function(){
          //if(cc.freeText){
            $log.info('freeText entered:', cc.freeText);
            let promise=CaseService.searchCases(cc.freeText,cc.searchStart,cc.searchEnd);
            promise.then(function (result) {

              //highlight matched terms
              //text = text.replace(new RegExp('('+phrase+')', 'gi'),'<span class="highlighted">$1</span>')
              result =  _.map(result, (datum) => {
                datum.subject = datum.subject.replace(new RegExp('('+cc.freeText+')', 'gi'),'<span class="highlighted">$1</span>');
                return datum;
              });
              $log.info('search free text',result);
              cc.cases = result;//set for normal view
              cc.gridOptions.api.setRowData(cc.cases);// set for grid view
            });
          //}
          //else{
          //  toaster.pop('warning', 'Required input', 'No input entered.');
          //}
        }

        /*Extract file name from resource url*/
        cc.extractName=function(path){
          delete cc.files;
          if(path){
            cc.files=path.substring(path.lastIndexOf('/')+1);
            cc.files=cc.files.substring(0,cc.files.indexOf("?"));
          }
        };
        //Sase will be assigned to by default Aditya
        cc.assignToMe=function(c){
           let promise = CaseService.assignToMe(c.id);
          promise.then(function (result) {
            c.assignedtoUserName = result.assignedtoUserName;
            c.assignedtoUserId = result.assignedtoUserId;
          });
        }
    }
    angular.module('tCRMAPP')
        .controller('CasesCtrl',CasesCtrl);
}(angular));
