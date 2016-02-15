/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-3
 * Time: 上午10:12:08
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	var util = require("../util/CommonUtil") ;
	var TipIndexView = require("./tipIndex_view") ;
	var SysIndexView = require("./sysIndex_view") ;
	var ErrorPageView = require("./errorPage_view") ;
	
	var AppView = Backbone.View.extend({
        initialize: function () {
			
        },
	    showSysIndex:function(){//系统首页
        	var sysIndeView = new SysIndexView() ;
        	jcfManager.contentRegion.show(sysIndeView) ;
	    },
	    authMgrUser:function(params){
	    	var queryString = QueryString.parse(params);
			var UserMgrApi = require("../api/auth/UserMgrApi") ;
			var UserMgrLayoutView = require("./auth/userMgrLayout");
	    	$.when(UserMgrApi.getAllRoles())
			 .done(function(data){
			 	 if(data.flag=="true"){
				 	var rmodel = new Backbone.Model(data) ;
	       	     	var userMgrLayout = new UserMgrLayoutView({model:rmodel,queryString:queryString}) ;
	       	     	jcfManager.contentRegion.show(userMgrLayout) ;
				 }else{
				 	util.showErrPage() ;
				 }
			 }) ;
	    },
	    addUser:function(params){
	    	var UserAddView = require("./auth/userAdd_view") ;
	    	var serverURL = "/"+jcfManager.appName+"/user/getAllRoleList.action" ;
		    $.when(util.dealAjaxRequestWithoutParam(serverURL)).done(function(data){
			   if(data.flag=="true"){
			   	  var roleList = new Backbone.Collection(data.roleList) ;
		       	  jcfManager.contentRegion.show(new UserAddView({collection:roleList})) ;
			   }else{
			   		util.showErrPage() ;
			   }	
		    }) ;
	    },
	    detailUser:function(params){
	    	var queryString = QueryString.parse(params);
			var UserMgrApi = require("../api/auth/UserMgrApi") ;
	    	var userId = queryString.userId ;
	    	var UserDetailView = require("./auth/userDetail_view") ;
	    	var UserMgrApi = require("../api/auth/UserMgrApi") ;
	    	$.when(UserMgrApi.getUserByID(userId)).done(function(data){
				if(data.flag=="true"){
					var model = new Backbone.Model(data) ;
	    			var userDetailView = new UserDetailView({model:model}) ;
	    			jcfManager.contentRegion.show(userDetailView) ;
				}else{
					util.showErrPage() ;
				}
			}) ;
	    },
	    modifyUser:function(params){
	    	var queryString = QueryString.parse(params);
	    	var UserModifyView = require("./auth/userModify_view")  ;
	    	var userId = queryString.userId ;
	    	var loginId = queryString.loginId ;
	    	var searchURL = "/"+util.getAppName()+"/user/toModifyUserUI.action" ;
			var qdata = {"userID":userId , "loginId":loginId} ;
			$.when(util.dealAjaxRequest4SimpleParam(searchURL,qdata)).done(function(data){
				if(data.flag=="true"){
					var model = new Backbone.Model(data.userInfo) ;
	    			model.set("canMod",data.canMod) ;
	    			//model.roleId_login = $("#indexHiddenLoginId").val();
	    			var userModifyView = new UserModifyView({model:model,roleList:data.roleList}) ;
	    			jcfManager.contentRegion.show(userModifyView) ;
				}else{
					util.showErrPage() ;
				}
	    	}) ;
	    },
	    authMgrRole:function(params){
	    	var queryString = QueryString.parse(params);
	    	var RoleMgrLayout = require("./auth/roleMgrLayout") ;
	    	var roleLayout = new RoleMgrLayout({queryString:queryString}) ;
	    	jcfManager.contentRegion.show(roleLayout) ;
	    	roleLayout.trigger("showPageInfo") ;
	    },
	    addRole:function(){
	    	var RoleAddView = require("./auth/roleAdd_view") ;
	    	var roleAddView = new RoleAddView() ;
	    	jcfManager.contentRegion.show(roleAddView) ;
	    	roleAddView.trigger("showPageInfo") ;
	    },
	    updateRole:function(params){
	    	var RoleUpdateView = require("./auth/roleUpdate_view") ;
	    	var queryString = QueryString.parse(params);
	    	var roleId = queryString.roleId ;
	    	var operatorType = queryString.operatorType ;
	    	var chkDisabled = operatorType=="view" ? false :true ;
	    	var jsonParam = {"roleId":roleId,"operatorType":operatorType} ;
	    	var serverURL = "/"+jcfManager.appName+"/auth/toUpdateRoleUI.action" ;
	    	var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
	    	$.when(ajaxing).done(function(data){
	    		var model = new Backbone.Model(data) ;
	    		model.set("operatorType",operatorType) ;
	    		var roleUpdateView = new RoleUpdateView({model:model}) ;
	    		jcfManager.contentRegion.show(roleUpdateView) ;
	    		roleUpdateView.trigger("showPageInfo") ;
	    	}) ;
	    },
	    showServerIndex:function(params){
			var ServerMgrLayout = require("./server/serverMgrLayout");
	    	var queryString = QueryString.parse(params);
	    	var selectedPageUI = queryString.selectedPageUI ;
	    	if(selectedPageUI==undefined||selectedPageUI==""){
	    		queryString.selectedPageUI = "serverListUI" ;
	    	}
	    	var model = new Backbone.Model({"selectedPageUI":queryString.selectedPageUI}) ;
	    	var serverMgrLayout = new ServerMgrLayout({model:model,queryString:queryString}) ; 
	    	jcfManager.contentRegion.show(serverMgrLayout) ;
	    	serverMgrLayout.trigger("showPageInfo") ;
	    },
	    serverMgrGroup:function(params){
	    	var queryString = QueryString.parse(params);
	    	var id = queryString.groupId ;
	    	var selectedPageUI = queryString.selectedPageUI ;
	    	if(selectedPageUI==undefined||selectedPageUI==""){
	    		queryString.selectedPageUI = "serverGroupList" ;
	    	}
	    	var ServerMgr4GroupLayout = require("./server/serverMgr4GroupLayout") ;
	    	var serverURL = "/"+jcfManager.appName+"/server/findGroupNameById.action" ;
	    	var queryData = {"groupId":id} ;
	    	var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,queryData) ;
	    	var autoFreshFlag = $("#freshPage4GroupServerFlag").val() ;
		    if(autoFreshFlag!=undefined&&autoFreshFlag.length>0){
			   window.clearInterval(autoFreshFlag)  ;
		    }
	    	$.when(ajaxing).done(function(data){
	    		var groupCategory = data.groupInfo.groupCategory ;
	    		var model = new Backbone.Model({hiddenGroupId:id,groupCategory:groupCategory}) ;
	    		model.set("selectedPageUI",queryString.selectedPageUI) ;
		    	var groupLayout = new ServerMgr4GroupLayout({model:model,queryString:queryString}) ;
		    	jcfManager.contentRegion.show(groupLayout) ;
		    	//if(groupCategory!=3&&groupCategory!=4){
		    	//groupLayout.trigger("group:showSearchFormView") ;//jcf服务器和适配服务器要显示查询条件view
		    	//}
		    	groupLayout.trigger("showPageInfo") ;//查询列表显示view
	    	}) ;
	    	
	    },
	    serverMgrServer:function(params){//点击单个服务器信息
	    	var ServerMgr4ServerLayout = require("./server/serverMgr4ServerLayout") ;
	    	var queryString = QueryString.parse(params);
	    	var selectedPageUI = queryString.selectedPageUI ;
	    	if(selectedPageUI==undefined||selectedPageUI==null){
	    		queryString.selectedPageUI = "detailInfo" ;
	    	}
	    	var serverId = queryString.serverId ; 
	    	var serverCategory = "" ;
	    	var jsonParam = {"serverId":serverId} ;
	    	var serverURL = "/"+jcfManager.appName+"/server/getServerCategory.action" ;
	    	var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
	    	
	    	$.when(ajaxing).done(function(data){
	    		if(data.flag == "true"){
	    			serverCategory = data.serverCategory ;
	    			var model = new Backbone.Model({"selectNavItem":queryString.selectedPageUI,"serverId":serverId,"serverCategory":serverCategory}) ;
		    		var serverLayout = new ServerMgr4ServerLayout({model:model,queryString:queryString}) ;
		    		jcfManager.contentRegion.show(serverLayout) ;
		    		serverLayout.trigger("showDownContentRegion") ;
	    		}else{
	    			//alert("获取服务器信息出错!") ;
					var ev = new ErrorPageView() ;
					jcfManager.contentRegion.show(ev) ;
	    		}
	    	}) ;
	    },
	    serverMemoryInfo:function(params){
	    	var queryString = QueryString.parse(params);
	    	var ServerSysMemoryStatisticsLayout = require("./server/serverSysMemoryStatisticsLayout") ;
	    	var layout = new ServerSysMemoryStatisticsLayout({queryString:queryString}) ;
			jcfManager.contentRegion.show(layout) ;
			layout.trigger("showPageInfo") ;
	    },
	    showDeployIndex:function(params){
	    	var queryString = QueryString.parse(params);
	    	var selectedPageUI = queryString.selectedPageUI ;
			if(selectedPageUI==undefined||selectedPageUI==""){
				queryString.selectedPageUI = "showAllAppUI" ;
			}
	    	var DeployMgrLayout = require("./deploy/deployMgrLayout") ;
	    	var model = new Backbone.Model({"selectedPageUI":queryString.selectedPageUI}) ;
	    	var layout = new DeployMgrLayout({model:model,queryString:queryString}) ;
	    	jcfManager.contentRegion.show(layout) ;
	    },
	    deployMgrGroup:function(params){//点击部署组管理
	    	var queryString = QueryString.parse(params);
	    	var GroupDeployMgrLayout = require("./deploy/groupDeployMgrLayout") ;
	    	var curStr =  queryString.selectedPageUI ;
	    	if(curStr==undefined||curStr==null){
	    		queryString.selectedPageUI = "showAllAppUI" ;
	    	}
	    	var groupId = queryString.groupId ;
	    	var model = new Backbone.Model({"groupId":groupId,"selectedPageUI":queryString.selectedPageUI}) ;
	    	var layout = new GroupDeployMgrLayout({model:model,queryString:queryString}) ;
	    	jcfManager.contentRegion.show(layout) ;
	    	layout.trigger("queryAndShowPageInfo") ;
	    },
	    viewAppStatus4GroupServer:function(params){//
	    	var GroupServerAppStatusLayout = require("./deploy/groupServerAppStautsLayout") ;
	    	var queryString = QueryString.parse(params);
	    	var groupId = queryString.groupId; 
	    	var appId = queryString.appId ;
	    	var model = new Backbone.Model({"groupId":groupId,"appId":appId}) ;
	    	var statusLayout = new GroupServerAppStatusLayout({model:model,queryString:queryString}) ;
	    	jcfManager.contentRegion.show(statusLayout) ;
	    	statusLayout.trigger("showPageInfo") ;
	    },
	    deployMgrA4ppRollback:function(params){
	    	var queryString = QueryString.parse(params);
	    	var RollBackLayout = require("./deploy/rollbackLayout") ;
	    	var rollbackLayout = new RollBackLayout({queryString:queryString}) ;
			jcfManager.contentRegion.show(rollbackLayout) ;
			rollbackLayout.trigger("showPageInfo") ;
	    },
	    appLogCfg:function(params){//
	    	var queryString = QueryString.parse(params);
	    	var GroupDeployAppLogCfgLayout = require("./deploy/groupDeployAppLogCfgLayout") ;
	    	var cfgLogLayout = new GroupDeployAppLogCfgLayout({queryString:queryString}) ;
	    	jcfManager.contentRegion.show(cfgLogLayout) ;
	    	cfgLogLayout.trigger("showPageInfo") ;
	    },
	    deployMgrServer:function(params){
	    	var ServerAppStatusLayout = require("./deploy/serverAppStatusLayout") ;
	    	var queryString = QueryString.parse(params);
	    	var layout = new ServerAppStatusLayout({queryString:queryString}) ;
	    	jcfManager.contentRegion.show(layout) ;
	    	layout.trigger("queryAndShowPageInfo") ;
	    	//this.tipIndexView.render() ;
	    },
	    deployMgrGroupAppConfig:function(params){
	    	var queryString = QueryString.parse(params);
	    	var GroupAppCongfigLayout = require("./deploy/groupAppConfigLayout") ;
	    	var layout = new GroupAppCongfigLayout({queryString:queryString}) ;
	    	jcfManager.contentRegion.show(layout) ;
	    	layout.trigger("showPageInfo") ;
	    },
	    deployMgrServerAppConfig:function(params){
	    	var queryString = QueryString.parse(params);
	    	var ServerAppCongfigLayout = require("./deploy/serverAppConfigLayout") ;
	    	var layout = new ServerAppCongfigLayout({queryString:queryString}) ;
	    	jcfManager.contentRegion.show(layout) ;
	    	layout.trigger("showPageInfo") ;
	    },
	    showServiceIndex:function(params){
	    	var queryString = QueryString.parse(params);
	    	var ServiceMgrLayout = require("./service/serviceMgrLayout") ;
	    	if(queryString.selectedPageUI==undefined||queryString.selectedPageUI==""){
	    		queryString.selectedPageUI = "serviceListUI" ;
	    	}
	    	var model = new Backbone.Model({"selectedPageUI":queryString.selectedPageUI}) ;
	    	var layout = new ServiceMgrLayout({model:model,queryString:queryString}) ;
	    	jcfManager.contentRegion.show(layout) ;
	    	layout.trigger("showPageInfo") ;
	    },
	    serviceMgrGroup:function(params){
	    	var queryString = QueryString.parse(params);
			var GroupServiceMgr = require("./service/groupServiceMgrLayout") ;
			var groupId = queryString.groupId ;
			var curStr =  queryString.selectedPageUI ;
	    	if(curStr==undefined||curStr==null){
	    		queryString.selectedPageUI = "showServiceMgrUI" ;
	    	}
			var model = new Backbone.Model({"groupId":groupId,"selectedPageUI":queryString.selectedPageUI}) ;
	    	var layout = new GroupServiceMgr({model:model,queryString:queryString}) ;
	    	jcfManager.contentRegion.show(layout) ;
	    	layout.trigger("showPageInfo") ;
	    },
	    groupServiceDetail:function(params){//组服务详细信息页面
	    	var ServiceDetailLayout = require("./service/serviceDetailLayout") ;
	    	var queryString = QueryString.parse(params);
	    	var detailView = new ServiceDetailLayout({queryString:queryString}) ;
			jcfManager.contentRegion.show(detailView) ;
			detailView.trigger("showPageInfo") ;
	    },
	    serverMoniOption:function(params){
	    	var queryString = QueryString.parse(params);
	    	var serverURL = "/"+jcfManager.appName+"/service/chartSearch.action" ;
	    	var serverServiceChart_view = require("./service/serverServiceChart_view");
	    	var ajaxing = util.dealAjaxRequest4JSObj(serverURL,queryString) ;
	    	$.when(ajaxing).done(function(data){
				 if(data.flag != 'error'){
					 var model1 = new Backbone.Model(data) ;
					 var sc_view = new serverServiceChart_view({model:model1}) ;
					 jcfManager.contentRegion.show(sc_view) ;
				 }else{
					 alert('度量数据加载失败');
				 }
			 }) ;	 
	    },
	    groupMoniOption:function(params){
	    	var serverServiceChart_view = require("./service/groupServiceChart_view");
	    	var queryString = QueryString.parse(params);
	    	var serverURL = "/"+jcfManager.appName+"/service/chartGroupSearch.action" ;
	    	var ajaxing = util.dealAjaxRequest4JSObj(serverURL,queryString) ;
	    	$.when(ajaxing).done(function(data){
				 if(data.flag != 'error'){
					 var model1 = new Backbone.Model(data) ;
					 var sc_view = new serverServiceChart_view({model:model1}) ;
					 jcfManager.contentRegion.show(sc_view) ;
				 }else{
					 alert('度量数据加载失败');
				 }
			 }) ;	 
	    },
	    serviceMgrServer:function(params){
	    	var queryString = QueryString.parse(params);
	    	var paramCategory = queryString.category== undefined ?"":queryString.category ;
	    	var paramStatus = queryString.status == undefined ?"":queryString.status;
	    	var ServerServiceLayout = require("./service/serverServiceMgrLayout") ;
	    	var serverURL = "/"+jcfManager.appName+"/service/toSearchServerServiceUI.action" ;
	    	var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
	    	var serverId = queryString.serverId ;
	    	$.when(ajaxing).done(function(data){
	    		var model = new Backbone.Model(data) ;
	    		model.set("paramCategory",paramCategory) ;
	    		model.set("paramStatus",paramStatus) ;
	    		model.set("serverId",serverId) ;
	    		var layout = new ServerServiceLayout({model:model,queryString:queryString}) ;
		    	jcfManager.contentRegion.show(layout) ;
		    	layout.trigger("showPageInfo") ;
	    	}) ;
	    	
	    },
	    serverServiceCfg:function(params){
	    	var queryString = QueryString.parse(params);
	    	var ServerServiceCfgView = require("./service/serverServiceCfg_view") ;
	    	var serverURL = "/"+jcfManager.appName+"/service/toConfigServiceUI.action" ;
			var serverId = queryString.serverId ;
			var serviceId = queryString.serviceId ;
			
			
			var jsonParam = {"serverId":serverId,"serviceId":serviceId} ;
			var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			$.when(ajaxing).done(function(data){
				 var errorFlag = data.errorFlag ;
				 if(errorFlag==""){
					 var model = new Backbone.Model(data.serviceParamInfo) ;
					 model.set("queueTypes",data.queueTypes||"") ;
					 model.set("messageModes",data.messageModes||"") ;
					 model.set("pageFlag",data.pageFlag||"") ;
					 model.set("serviceId",data.baseInfo.serviceId||"") ;
					 model.set("serverId",data.baseInfo.serverId||"") ;
					 model.set("serviceName",data.baseInfo.serviceName||"") ;
					 model.set("groupName",data.baseInfo.groupName||"") ;
					 model.set("currentVersion",data.baseInfo.currentVersion||"") ;
					 model.set("serverName",data.baseInfo.serverName||"") ;
					 //处理可能为空的情况
					 model.set("mode",data.serviceParamInfo.mode ||"") ;
					 var dialogView = new ServerServiceCfgView({model:model}) ;
					 jcfManager.contentRegion.show(dialogView) ;
				 }else{
					 alert(errorFlag) ;
				 }
			}) ;
	    	
	    },
	    serviceMonitor:function(params){
	    	var queryString = QueryString.parse(params);
	    	var MonitorServiceView = require("./service/monitorService_view") ;
	    	var serverId = queryString.serverId ;
	    	var serviceId = queryString.serviceId ;
	    	var jsonParam = {"serverId":serverId,"serviceId":serviceId} ;
	    	var serverURL = "/"+jcfManager.appName+"/service/monitorService.action" ;
	    	var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
	    	$.when(ajaxing).done(function(data){
	    	    if(data.errorFlag!=undefined && data.errorFlag.length>0){
	    		   alert(data.errorFlag) ;
	    	    }else{
	    	       var model = new Backbone.Model(data) ;
	    	       var version = data.configInfo.version || "" ;
	    	       var serviceName = data.configInfo.name || "" ;
	    	       var requestQueueSize = data.configInfo.requestQueueSize ||"";
	    	       model.set("version",version) ;
	    	       model.set("serviceName",serviceName) ;
	    	       model.set("requestQueueSize",requestQueueSize) ;
	    	       
		    	   var monitorView = new MonitorServiceView({model:model,queryString:queryString}) ;
		    	   jcfManager.contentRegion.show(monitorView) ;
	    		}
	    	}) ;
	    },

	    serviceDegradeConfig: function(params){//降级
	    	var queryString = QueryString.parse(params);
	    	var ServiceDegradeConfigModel = require("../model/service/service_degrade_config_model");
	    	var model = new ServiceDegradeConfigModel();
	    	var ServiceDegradeConfigView = require("./service/serviceDegradeConfig_view");
	    	var serviceView = new ServiceDegradeConfigView({
	    		queryString: queryString,
	    		model: model
	    	});
	    	//serviceView.render();
			jcfManager.contentRegion.show(serviceView) ;
	    	model.fetch({data : QueryString.stringify(queryString), reset: true});
    	},
	    serviceGrayConfig: function(params){//灰度
	    	var queryString = QueryString.parse(params);
	    	var ServiceGrayConfigModel = require("../model/service/service_gray_config_model");
	    	var model = new ServiceGrayConfigModel();
	    	var ServiceGrayConfigView = require("./service/serviceGrayConfig_view");
	    	var serviceView = new ServiceGrayConfigView({
	    		queryString: queryString,
	    		model: model
	    	});
	    	//serviceView.render();
			jcfManager.contentRegion.show(serviceView) ;
	    	model.fetch({data : QueryString.stringify(queryString), reset: true});
	    },
	    domainDataSource:function(params){
	    	var queryString = QueryString.parse(params);
	    	var DataSourceCollection = require ("../collection/dataSource/dataSource_collection");
	    	var dataSource_collection = new DataSourceCollection();
	    	var DataSourceListView = require("./dataSource/dataSourceList_view");
	    	var dataSourceListView = new DataSourceListView({
			    queryString : queryString,
			    collection: dataSource_collection
			});
	    	dataSourceListView.render();
	    	var refresh = setInterval(function() {
	    		if (window.location.hash == "#dataSrcMgr"){
        			dataSource_collection.fetch({reset: true});
        		}
        		else{
        			window.clearInterval(refresh);
        		}
        	}, 2000);
        	setTimeout("window.clearInterval("+refresh+");",20000);
	    },
	    groupDataSource: function(params){//组数据源管理
	    	var queryString = QueryString.parse(params);
	    	if (queryString.selectTab == "groupDataSource" || queryString.selectTab == undefined){
	    		var GroupDataSourceCollection = require ("../collection/dataSource/group_dataSource_collection");
	    		var group_dataSource_collection = new GroupDataSourceCollection();
	    		var GroupDataSourceListView = require("./dataSource/groupDataSourceList_view");
			    var groupDataSourceListView = new GroupDataSourceListView({
			    	queryString : queryString,
			    	collection: group_dataSource_collection
			    });
			    groupDataSourceListView.render();
			    var GroupDataSourceListHeadView = require("./dataSource/groupDataSourceListHead_view");
			    var groupDataSourceListHeadView = new GroupDataSourceListHeadView({
			    	queryString : queryString,
			    	collection: group_dataSource_collection
			    });
			    groupDataSourceListHeadView.render();
				//#dataSrcMgr/group/param
			    var refresh = setInterval(function() {
	        		if (window.location.hash.indexOf("#dataSrcMgr/group/param")>-1){
	        			if (group_dataSource_collection.length > 0){
	        				window.clearInterval(refresh);
	        			}else{
	        				group_dataSource_collection.fetch({data : QueryString.stringify(queryString), reset: true});
	        			}
	        		}else{
	        			window.clearInterval(refresh);
	        		}
	        	}, 3000);
	        	setTimeout("window.clearInterval("+refresh+");",20000);
	    	}
	    	else if (queryString.selectTab == "groupDeployDataSource"){
	    		var GroupDeployDataSourceView = require("./dataSource/groupDeployDataSource_view");
	    		var groupDeployDataSourceView = new GroupDeployDataSourceView({
			    	queryString : queryString
			    });
	    		groupDeployDataSourceView.render();
	    		groupDeployDataSourceView.getServerList();
	    	}
	    	else if (queryString.selectTab == "groupDataSourceConfig"){
	    		var GroupDataSourceConfigView = require("./dataSource/groupDataSourceConfig_view");
	    		var GroupDataSourceConfigHeadView = require("./dataSource/groupDataSourceConfigHead_view");
	    		var GroupDataSourceConfigModel = require("../model/dataSource/group_dataSource_config_model");
				
	    		var groupDataSourceConfigModel = new GroupDataSourceConfigModel();
	    		var groupDataSourceConfigHeadView = new GroupDataSourceConfigHeadView({
			    	queryString : queryString,
			    	model: groupDataSourceConfigModel
			    });
	    		groupDataSourceConfigHeadView.render();
	    		var groupDataSourceConfigView = new GroupDataSourceConfigView({
			    	queryString : queryString,
			    	model: groupDataSourceConfigModel
			    });
	    		groupDataSourceConfigView.render();
	    	}
	    },
	    serverDataSource: function(params){//数据源管理，点击单个服务器
	    	var queryString = QueryString.parse(params);
	    	if (queryString.selectTab == "dataSource" || queryString.selectTab == undefined){//数据源列表
	    		var ServerDataSourceListView = require("./dataSource/serverDataSourceList_view");
			    var serverDataSourceListView = new ServerDataSourceListView({
			    	queryString : queryString
			    });
			    serverDataSourceListView.render();
	    	}
	    	else if (queryString.selectTab == "deployDataSource"){//新增数据源
	    		var ServerDeployDataSourceView = require("./dataSource/serverDeployDataSource_view");
	    		var serverDeployDataSourceView = new ServerDeployDataSourceView({
			    	queryString : queryString
			    });
	    		serverDeployDataSourceView.render();
	    	}
	    	else if (queryString.selectTab == "testDataSource"){//测试数据源
	    		var ServerTestDataSourceListView = require("./dataSource/serverTestDataSourceList_view");
			    var serverTestDataSourceListView = new ServerTestDataSourceListView({
			    	queryString : queryString
			    });
			    serverTestDataSourceListView.render();
	    	}
	    },
	    
	    
	    showContextIndex:function(){
	    	var tipIndexView = new TipIndexView();
	    	jcfManager.contentRegion.show(tipIndexView);
	    },
	    contextMgrGroup:function(id){
	    	var HighchartView = require("./context/highcharts");
	    	var highchartView = new HighchartView();
	    	highchartView.render();
 	    },
	    contextMgrServer:function(params){
	     	var queryString = QueryString.parse(params);
	     	var ServerContextModel = require("../model/context/server_context_model");
	     	var serverContextModel = new ServerContextModel();
	     	if(queryString.selectTab == "contextInfo" || queryString.selectTab == undefined){
		     	var ServerContextInfoView = require("./context/serverContextInfo_view");
			    var serverContextInfoView = new ServerContextInfoView({
			    	queryString : queryString,
			    	model: serverContextModel
			    });
			    serverContextInfoView.render();
	     	}
	     	else if (queryString.selectTab == "contextConfig"){
	     		var ServerContextConfigView = require("./context/serverContextConfig_view");
			    var serverContextConfigView = new ServerContextConfigView({
			    	queryString : queryString,
			    	model: serverContextModel
			    });
			    serverContextConfigView.render();
	     	}
	     	serverContextModel.fetch({data: QueryString.stringify(queryString)});
	    },
	    
	    showLogIndex:function(){
	    	var LogListCollection = require('../collection/log/log_collection');
	    	var logListCollection = new LogListCollection();
	    	var LogListView = require("./log/logList_view");
	    	var logListView = new LogListView({
	    		collection: logListCollection
	    	});
	    	logListView.render();
	    	logListCollection.fetch({reset : true});
	    },
	    logMgrGroup:function(params){
	    	var queryString = QueryString.parse(params);
	    	var LogConfigView = require("./log/logConfig_view");
	    	var LogConfigHeadView = require("./log/logConfigHead_view");
	    	var LogAppNameCollection = require ("../collection/log/log_app_name_collection");
	    	var logAppNameCollection = new LogAppNameCollection();
	    	var LogConfigModel = require("../model/log/log_config_model");
	    	var logConfigModel = new LogConfigModel();
	    	var logConfigHeadView = new LogConfigHeadView({
	    		queryString: queryString,
	    		model: logConfigModel,
	    		collection: logAppNameCollection
	    	});
	    	logConfigHeadView.render();
	    	var logConfigView = new LogConfigView({
	    		queryString: queryString,
	    		model: logConfigModel,
	    		collection : logAppNameCollection
	    	});
	    	logConfigView.render();
	    	logAppNameCollection.fetch({data: QueryString.stringify(queryString), reset: true});
	    }
	});
	return AppView;
});
