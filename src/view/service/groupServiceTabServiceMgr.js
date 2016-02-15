define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var layoutTmpStr = require('../../template/service/groupServiceTabMgrLayout.tpl');
	var itemTmpStr = require("../../template/service/groupServiceItem.tpl") ;
	var listTmpStr = require("../../template/service/groupServiceList.tpl"); 
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var QueryString = require('querystring');
	
	require("bs-modal")($) ;
	
	//详细信息页面
	var ServiceDetailLayout = require("./serviceDetailLayout") ;
	var authCheck = require("./AuthCheck4Service") ;
	var ListTipModel = require("../../model/listTip_model") ; 
	var ListTipView = require("../listTip_view") ;
	var ServerOperHelper = require("./ServiceOperHelper") ;
	
	var GroupServiceCfgView=require("./groupServiceCfg");
	
	var GrayServiceCfgView=require("./serviceGrayConfig_view");
	var DegradeServiceCfgView=require("./serviceDegradeConfig_view");
	
	//列表每一项视图
	var ItemView = Marionette.ItemView.extend({
		 initialize:function(){
			var authJcfStartFlag = authCheck.getJcfStart4GroupFlag() ;
			var authJcfStopFlag = authCheck.getJcfStop4GroupFlag() ;
			var authJcfForceStopFlag = authCheck.getJcForceStop4GroupFlag() ;
			var authJcfSXQHFlag = authCheck.getJcfSXQH4GroupFlag() ;
			this.model.set("authJcfStartFlag",authJcfStartFlag) ;
			this.model.set("authJcfStopFlag",authJcfStopFlag) ;
			this.model.set("authJcfForceStopFlag",authJcfForceStopFlag) ;
			this.model.set("authJcfSXQHFlag",authJcfSXQHFlag) ;//切换域内域外可见
			///////////
			var authSihStartFlag = authCheck.getSihStart4GroupFlag() ;
			var authSihStopFlag = authCheck.getSihStop4GroupFlag() ;
			var authSihForceStopFlag = authCheck.getSihForceStop4GroupFlag() ;
			var authSihSXQHFlag = authCheck.getSihSXQH4GroupFlag() ;
			this.model.set("authSihStartFlag",authSihStartFlag) ;
			this.model.set("authSihStopFlag",authSihStopFlag) ;
			this.model.set("authSihForceStopFlag",authSihForceStopFlag) ;
			this.model.set("authSihSXQHFlag",authSihSXQHFlag) ;
			///////////
			var authHttpStartFlag = authCheck.getHttpStart4GroupFlag() ;
			var authHttpStopFlag = authCheck.getHttpStop4GroupFlag() ;
			var authHttpForceStopFlag = authCheck.getHttpForceStop4GroupFlag() ;
			var authHttpSXQHFlag = authCheck.getHttpSXQH4GroupFlag() ;
			this.model.set("authHttpStartFlag",authHttpStartFlag) ;
			this.model.set("authHttpStopFlag",authHttpStopFlag) ;
			this.model.set("authHttpForceStopFlag",authHttpForceStopFlag) ;
			this.model.set("authHttpSXQHFlag",authHttpSXQHFlag) ;
			////////////
			var authWebStartFlag = authCheck.getWebStart4GroupFlag() ;
			var authWebStopFlag = authCheck.getWebStop4GroupFlag() ;
			var authWebForceStopFlag = authCheck.getWebForceStop4GroupFlag() ;
			var authWebSXQHFlag = authCheck.getWebSXQH4GroupFlag() ;
			this.model.set("authWebStartFlag",authWebStartFlag) ;
			this.model.set("authWebStopFlag",authWebStopFlag) ;
			this.model.set("authWebForceStopFlag",authWebForceStopFlag) ;
			this.model.set("authWebSXQHFlag",authWebSXQHFlag) ;
			///////////////
			var authTbStartFlag = authCheck.getTbStart4GroupFlag() ;
			var authTbStopFlag = authCheck.getTbStop4GroupFlag() ;
			var authTbForceStopFlag = authCheck.getTbForceStop4GroupFlag() ;
			var authTbSXQHFlag = authCheck.getTbSXQH4GroupFlag() ;
			this.model.set("authTbStartFlag",authTbStartFlag) ;
			this.model.set("authTbStopFlag",authTbStopFlag) ;
			this.model.set("authTbForceStopFlag",authTbForceStopFlag) ;
			this.model.set("authTbSXQHFlag",authTbSXQHFlag) ;
			////////////
			var authTtStartFlag = authCheck.getTtStart4GroupFlag() ;
			var authTtStopFlag = authCheck.getTtStop4GroupFlag() ;
			var authTtForceStopFlag = authCheck.getTtForceStop4GroupFlag() ;
			var authTtSXQHFlag = authCheck.getTtSXQH4GroupFlag() ;
			this.model.set("authTtStartFlag",authTtStartFlag) ;
			this.model.set("authTtStopFlag",authTtStopFlag) ;
			this.model.set("authTtForceStopFlag",authTtForceStopFlag) ;
			this.model.set("authTtSXQHFlag",authTtSXQHFlag) ;
			///////////////////
			var authUtlStartFlag = authCheck.getUtlStart4GroupFlag() ;
			var authUtlStopFlag = authCheck.getUtlStop4GroupFlag() ;
			var authUtlForceStopFlag = authCheck.getUtlForceStop4GroupFlag() ;
			var authUtlSXQHFlag = authCheck.getUtlSXQH4GroupFlag() ;
			this.model.set("authUtlStartFlag",authUtlStartFlag) ;
			this.model.set("authUtlStopFlag",authUtlStopFlag) ;
			this.model.set("authUtlForceStopFlag",authUtlForceStopFlag) ;
			this.model.set("authUtlSXQHFlag",authUtlSXQHFlag) ;
			
			
			//增加权限
			var authSwitchDefaultVersionFlag = authCheck.getSwitchDefaultVersionFlag() ;
			this.model.set("authSwitchDefaultVersionFlag",authSwitchDefaultVersionFlag) ;
		
		    this.model.set("groupId",$("#hiddenGroupIdOnPage").val()) ;
		    this.model.on("change",this.render) ;
	     },
		 tagName:"tr",
		 template: _.template(itemTmpStr),
		 events:{
			"click .serviceOperationTd a" : "operServiceStatus",
			"click .changeDomainBtn" :"changeVisibly",
			"click .serviceDetail" :"toServiceDetailUI",
			"click .GroupMoniView" :"toGroupMoniViewUI",
			"click .changeDefaultVersionTd button" : "changeDefaultVersion",
			"click a.serviceDegradeConfig":"serviceDegradeConfig",
			"click a.openServiceDegradeConfig": "openServiceDegradeConfig",
			"click a.closeServiceDegradeConfig": "closeServiceDegradeConfig",
			"click a.serviceGrayConfig":"serviceGrayConfig",
			"click a.openServiceGrayConfig": "openServiceGrayConfig",
			"click a.closeServiceGrayConfig": "closeServiceGrayConfig",
			"click .groupServiceCfgTd" :"groupServiceCfg"
		 },
		 changeDefaultVersion:function(){
			var self = this ;
			var autoFreshFlag = $("#freshPage4GroupServiceFlag").val() ;
			window.clearInterval(autoFreshFlag) ; 
			var ff = this.model.get("isDefaultVersion") ;
			var toFlag = "" ;
			var msg = "确定将应用从";
			if(ff=="TRUE"){
				toFlag = "FALSE" ;
				msg += "默认版切换到非默认版?";
			}else{
				toFlag = "TRUE" ;
				msg += "非默认版切换到默认版?";
			}
			var checkRegistryFlag = this.checkRegistryRun();
			if(checkRegistryFlag){
				var groupId  = $.trim($("#hiddenGroupIdOnPage").val()) ;
				var serviceId = this.model.get("serviceId") ;
				var isDefaultVersion = this.model.get("isDefaultVersion") ;
				var currentVersion = this.model.get("appVersion") ;
				var serviceName  = this.model.get("serviceName") ;
				var grayEnable=this.model.get("grayEnable");
				var jsParam = {} ;
				jsParam.groupId = groupId ;
				jsParam.serviceId = serviceId ;
				jsParam.isDefaultVersion = isDefaultVersion ;
				jsParam.currentVersion = currentVersion ;
				jsParam.serviceName = serviceName ;
				jsParam.grayEnable=grayEnable;
				if (confirm(msg)) {
					var serverURL = "/"+jcfManager.appName+"/service/changeServiceDefaultVersion.action" ;
					var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
					$.when(ajaxing).done(function(data){
						if (data.msg == "success") {
							self.model.set("isDefaultVersion",toFlag) ;
						//	alert("grayEnable   "+data.grayEnable);
						//	alert("isDefaultVersion   "+data.isDefaultVersion);
						//	alert("grayConfig   "+data.grayConfig);
							self.model.set("grayEnable",data.grayEnable);
							self.model.set("grayConfig",data.grayConfig);
							//将其他版本改为非默认版
							self.trigger("parent:refreshPageDefaultVersion") ;
						}else{
							var tipModel = new ListTipModel() ;
							tipModel.set("errList",["切换失败!"]) ;
							var tipView = new ListTipView({model:tipModel}) ;
							jcfManager.tipInfoRegion.show(tipView) ;
						}
					}) ;
				}
			}
		 },
		 checkRegistryRun:function(){//检查注册库服务器是否正常运行
			var flag = false;
			var serverURL = "/"+jcfManager.appName+"/deployMgr/checkRegistryStatus.action" ;
			var ajaxing = util.dealSYNCHAjaxRequestWithoutParam(serverURL) ;
			$.when(ajaxing).done(function(data){
				if(data.flag == "true"){
				    if(data.status=="1"){
						flag = true ;
					}else{
						var tipModel = new ListTipModel() ;
						tipModel.set("errList",[""+data.errMsg]) ;
						var tipView = new ListTipView({model:tipModel}) ;
						jcfManager.tipInfoRegion.show(tipView) ;
					}
				}else{
					var tipModel = new ListTipModel() ;
					tipModel.set("errList",[""+data.errMsg]) ;
					var tipView = new ListTipView({model:tipModel}) ;
					jcfManager.tipInfoRegion.show(tipView) ;
				}
			}) ;
			return flag ;
		 },
		 toServiceDetailUI:function(e){//跳转到查看服务详情页面
			 e.preventDefault() ;
			 var autoFreshFlag = $("#freshPage4GroupServiceFlag").val() ;
			 window.clearInterval(autoFreshFlag) ; 
			 var groupId = this.model.get("groupId") ;
			 var serviceId = this.model.get("serviceId") ;
			 var queryString = {"groupId":groupId,"serviceId":serviceId} ;
			 var modelName = sidbarUtil.getModuleName() ;
			 appRouter.navigate(modelName +"/group/detail/param/" + QueryString.stringify(queryString)) ; 
			 
			 var detailView = new ServiceDetailLayout({queryString:queryString}) ;
			 jcfManager.contentRegion.show(detailView) ;
			 detailView.trigger("showPageInfo") ;
		 },
		 toGroupMoniViewUI:function(e){//跳转到度量数据查询页面
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 var autoFreshFlag = $("#freshPage4GroupServiceFlag").val() ;
			 window.clearInterval(autoFreshFlag) ; 
			 var RespGroupMoniView = require("./respGroupMoni_view") ;			 
			 this.model.set("checkGroupCategory","1") ;
			 jcfManager.dialogRegion.show(new RespGroupMoniView({model:this.model})) ; 
		 	  $('#queryGroupDataModal').modal('show');
		 },
		 operServiceStatus:function(e){//启动停止服务器
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 var autoFreshFlag = $("#freshPage4GroupServiceFlag").val() ;
			 window.clearInterval(autoFreshFlag) ;  
			 var href = $(e.target).attr("href") ;
			 var helper = new ServerOperHelper() ;
			 var groupOrServer = "group" ;
			 //当前服务状态
			 if("stop"==href){
			    helper.stopService(this.model,groupOrServer) ;
			 }else if ("forceStop"==href){
				helper.forceStopService(this.model,groupOrServer) ;
			 }else if("start"==href){
				helper.startService(this.model,groupOrServer) ;
			 }
		 },
		 changeVisibly:function(){
			var self = this;
			var autoFreshFlag = $("#freshPage4GroupServiceFlag").val() ;
			window.clearInterval(autoFreshFlag) ; 
			var flag = this.checkRegistryRun() ;
			if (flag) {
				var serviceName = self.model.get('serviceName');
	        	var visibly = true;
	        	var toServiceProperty = "" ;
	        	if (this.model.get('serviceProperty') == 1){//当前为域外可见//切换为域内可见
	        		visibly = false;
	        		toServiceProperty = "0" ;
	        	}else{//当前为域内可见//切换为域外可见
	        		visibly = true;
	        		toServiceProperty = "1" ;
	        	}
	        	var jsonParam = {"serviceName": serviceName,"visibly": visibly} ;
	        	var serverURL = "/"+jcfManager.appName+"/service/setServiceVisibly.action" ;
	        	var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
	        	$.when(ajaxing).done(function(data){
	        		if(data.flag=="true"){
	        			self.model.set('serviceProperty', toServiceProperty);
	        		}else{
						var tipModel = new ListTipModel() ;
						tipModel.set("errList",["切换失败"]) ;
						var tipView = new ListTipView({model:tipModel}) ;
						jcfManager.tipInfoRegion.show(tipView) ;
	        		}
	        	}) ;
			}
		 },
		 
		 groupServiceCfg: function(e){//组服务配置
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 var modelName = sidbarUtil.getModuleName() ;
			 var serverURL = "/"+jcfManager.appName+"/service/getGroupServiceConfig.action" ;
			 var groupId = this.model.get('groupId');
			 var serviceId = this.model.get('serviceId');
			 var serviceCategory=this.model.get('serviceCategory');
			 var appName=this.model.get('appName');
			 var appVersion=this.model.get('appVersion');
			 var serviceName=this.model.get('serviceName');
			 
			 var jsonParam = {"groupId":groupId,"serviceId":serviceId,"serviceCategory":serviceCategory,"appName":appName,"appVersion":appVersion,"serviceName":serviceName} ;
			 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			 
			 var self=this;
			 $.when(ajaxing).done(function(data){
				 var errorFlag = data.errorFlag ;
				 if(errorFlag==""){
					 var groupName=data.groupName;
					 var model = new Backbone.Model(data) ;
					 model.set({"groupName":groupName,"serviceId":serviceId,"groupId":groupId,"appName":appName,"appVersion":appVersion,"serviceName":serviceName,"serviceCategory":serviceCategory});
					// alert("self.model====="+self.model);
					 var dialogView = new GroupServiceCfgView({model:model,preModel:self.model}) ;
					 jcfManager.dialogRegion.show(dialogView) ;
					 $('#groupServiceConfigModal').modal('show');
				 }else{
					 alert(errorFlag) ;
				 }
			 }) ;
		    
		 },
		 
		 render:function(){
			  this.$el.html(this.template(this.model.attributes));
			  return this;
		 },
		 serviceDegradeConfig:function(e){
			 e.stopPropagation() ;
			 e.preventDefault() ;

			 var serviceId=this.model.get("serviceId");
			 var appVersion=this.model.get("appVersion");
			 var serviceName=this.model.get("serviceName");
			 var groupId=this.model.get("groupId");
			 var serviceCategory=this.model.get("serviceCategory");
			 
			 var url="/"+jcfManager.appName+"/service/getServiceDegradeConfig.action";
			 var jsonParam={"serviceId":serviceId,"appVersion":appVersion,"serviceName":serviceName,"groupId":groupId,"serviceCategory":serviceCategory};
			 var ajaxing = util.dealAjaxRequest4SimpleParam(url,jsonParam) ;
			 $.when(ajaxing).done(function(data){
				 if(data.errorMsg==""){
					 var model = new Backbone.Model(data) ;
					 model.set({"serviceName":serviceName,"appVersion":appVersion,"serviceCategory":serviceCategory,"groupId":groupId,"serviceId":serviceId});
					 var dialogView = new DegradeServiceCfgView({model:model}) ;
					 jcfManager.dialogRegion.show(dialogView) ;
					 $('#degradeModal').modal('show');
				 }else{
					 alert(data.errorMsg);
				 }
			 }) ;
		 },
		 serviceGrayConfig:function(e){
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 
			 var serviceId=this.model.get("serviceId");
			 var appVersion=this.model.get("appVersion");
			 var serviceName=this.model.get("serviceName");
			 var grayEnable=this.model.get("grayEnable");
			 var groupId=this.model.get("groupId");
			 
			 var url="/"+jcfManager.appName+"/service/getServiceGrayConfig.action";
			 
			 var jsonParam={"serviceId":serviceId};
			 var ajaxing = util.dealAjaxRequest4SimpleParam(url,jsonParam) ;
			 
			 $.when(ajaxing).done(function(data){
				 var errorFlag = data.errorFlag ;
				 if(errorFlag==""){
					 var model = new Backbone.Model(data) ;
					 model.set({"groupId":groupId,"serviceId":serviceId,"appVersion":appVersion,"serviceName":serviceName,"grayEnable":grayEnable});
					 var dialogView = new GrayServiceCfgView({model:model}) ;
					 jcfManager.dialogRegion.show(dialogView) ;
					 $('#grayModal').modal('show');
				 }else{
					 alert(errorFlag) ;
				 }
			 }) ;
		 },
		 openServiceDegradeConfig: function(){
			 var self = this;
			 var jsonParam = {"groupId":this.model.get('groupId'),"serviceName": this.model.get('serviceName'),
					 "appVersion": this.model.get('appVersion'), "serviceCategory":this.model.get('serviceCategory'),
					 "serviceId": this.model.get('serviceId')};
			 var serverURL = "/"+jcfManager.appName+"/service/enableServiceDegrade.action";
			 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam);
			 $.when(ajaxing).done(function(data){
        		if(data.flag){
        			self.model.set("degradeEnable", "true");
        		}else{
        			alert("开启失败");
        		}
        	});
		 },
		 closeServiceDegradeConfig: function(){
			 var self = this;
			 var jsonParam = {"groupId":self.model.get('groupId'),"serviceName": self.model.get('serviceName'),
					 "appVersion": self.model.get('appVersion'), "serviceCategory":self.model.get('serviceCategory'),
					 "serviceId": self.model.get('serviceId')};
			 var serverURL = "/"+jcfManager.appName+"/service/disableServiceDegrade.action";
			 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam);
			 $.when(ajaxing).done(function(data){
        		if(data.flag){
        			self.model.set("degradeEnable", "false");
        		}else{
        			alert("关闭失败");
        		}
        	});
		 },
		 openServiceGrayConfig: function(){
			 var self = this;
			 var jsonParam = {"serviceId": self.model.get('serviceId'),"serviceName":self.model.get("serviceName")};
			 var serverURL = "/"+jcfManager.appName+"/service/enableServiceGray.action";
			 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam);
			 $.when(ajaxing).done(function(data){
        		if(data.flag){
        			self.model.set("grayEnable", "true");
        		}
        		else{
        			alert("开启失败!"+data.errorMsg);
        		}
        	});
		 },
		 closeServiceGrayConfig: function(){
			 var self = this;
			 var jsonParam = {"serviceId": self.model.get('serviceId')};
			 var serverURL = "/"+jcfManager.appName+"/service/disableServiceGray.action";
			 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam);
			 $.when(ajaxing).done(function(data){
        		if(data.flag){
        			self.model.set("grayEnable", "false");
        		}
        		else{
        			alert("关闭失败");
        		}
        	});
		 }
	});
	//列表视图
	var ListView =  Marionette.CompositeView.extend({
		initialize:function(){
		},
	    template: _.template(listTmpStr),
	    tagName:"table",
	    className:"table table-bordered",
		childView: ItemView,
		childViewContainer: "tbody",
		childEvents: {
		    'parent:refreshPageDefaultVersion': function (curChildView) {
			   var model = curChildView.model;
			   var serviceName = model.get("serviceName") ;
			   var appVersion = model.get("appVersion") ;
			   var isDefaultVersion = model.get("isDefaultVersion") ;
			   if("TRUE"==isDefaultVersion){//如果当前model改为默认版本则其他都为非默认版本
			  		this.collection.each(function(m){
				  	    if(m.get("serviceName")==serviceName){
				  		   if(m.get("appVersion")!=appVersion){
				  			  m.set("isDefaultVersion","FALSE") ;
				  			  m.set("grayConfig","TRUE");
				  		   }
				  		}
				  	}) ;
			  	}
			  }
		  }
		
	});
	

	var GroupServiceMgrLayout = Marionette.LayoutView.extend({
		  initialize:function(options){
			  this.queryString = options.queryString ;
			  this.on("showPageInfo",this.showPageInfo) ;
			  jcfManager.tipInfoRegion = this.tipInfoRegion ;
		  },
		  template: _.template(layoutTmpStr),
		  regions: {
		  	tipInfoRegion:"#tipInfoRegion",
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion"
		  },
		  events:{
			  "click #searchGroupServiceBtn" : "searchGroupService"
		  },
		  searchGroupService:function(){
			  var category = $("#search4ServiceType").val() ;
			  var status = $("#search4RuningStatus").val() ;
			  var appName = $("#search4AppName").val() ;
			  this.queryString.currentPage = "1" ;
			  if(this.queryString.pageSize==undefined||this.queryString.pageSize==""){
				  this.queryString.pageSize = jcfManager.defaultPageSize ;
			  }
			  var jsParam = {} ;
			  jsParam.currentPage = this.queryString.currentPage;
			  jsParam.pageSize = this.queryString.pageSize ;
			  jsParam.groupId = this.queryString.groupId ;
			  jsParam.category = category ;
			  jsParam.status = status ;
			  jsParam.appName = appName ;
			  var modelName = sidbarUtil.getModuleName() ;
			  appRouter.navigate(modelName +"/group/param/" + QueryString.stringify(jsParam)) ;
			  this.showPageInfo2(jsParam) ;
		  },
		  showPageInfo:function(){
			  if(this.queryString.currentPage==undefined||this.queryString.currentPage==""){
				  this.queryString.currentPage = "1" ;
				  this.queryString.pageSize = jcfManager.defaultPageSize ;
			  }
			  var jsParam = {} ;
			  jsParam.currentPage = this.queryString.currentPage ;
			  jsParam.pageSize = this.queryString.pageSize ;
			  jsParam.groupId = this.queryString.groupId ;
			  jsParam.category = this.queryString.category ;
			  jsParam.status = this.queryString.status ;
			  jsParam.appName = this.queryString.appName ;
			  
			  this.showPageInfo2(jsParam) ;
		  },
		  showPageInfo2:function(jsParam){
			  var self = this ;
		      var  refreshSpace = 2000 ;
		      var refreshNum = util.getFefreshPageNum() ;//刷新次数
		      var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
		      //保存当前url
		      var curHash = window.location.hash ;
		      $("#freshPage4GroupServiceUrl").val(curHash) ;
			  var serverURL = '/' + jcfManager.appName + '/service/searchGroupService.action' ;
			  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			  $.when(ajaxing).done(function(data){
				  var collection = new Backbone.Collection(data.recordList) ;
				  var listView = new ListView({collection:collection}) ;
				  self.listRegion.show(listView) ;
				  var model = new Backbone.Model(data) ;
				  model.set("uriSection","group") ;
				  var pbView = new PagebarView({model:model,queryString:self.queryString}) ;
				  self.pagebarRegion.show(pbView) ;
				  self.collection = collection ;
				  //定时刷新页面服务的状态
				  if(collection.length>0){
					 var ttt= setInterval(self.updatePageServiceStatus,refreshSpace,self);
					 $("#freshPage4GroupServiceFlag").val(ttt) ;
					 setTimeout("window.clearInterval("+ttt+")",refreshTime);
				  }
			  }) ;
			  
		  },
		  updatePageServiceStatus:function(self){//定时更新页面上的服务器状态字段
		      var groupId = self.queryString.groupId ;
		  	  var collection = self.collection ;
			  var curHash = window.location.hash ;
			  var oldUrl  = $("#freshPage4GroupServiceUrl").val() ;
			  var autoFreshFlag = $("#freshPage4GroupServiceFlag").val() ;
			  if(oldUrl==curHash){//刷新页面
			  	  var jsonParam = {"groupId":groupId} ;
				  var serverURL = "/"+jcfManager.appName+"/service/searchGroupServiceStatus.action" ;
				  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				  $.when(ajaxing).done(function(data){
					  var model = new Backbone.Model(data) ;
					  collection.each(function(m){
						  var serviceId =  m.get("serviceId") ;
						  var cStatus = model.get(""+serviceId+"") ;
						  if(cStatus!=undefined){
						  	 m.set("serviceStatus",cStatus) ;
						  }
					  }) ;
				  }) ;
			  }else{//结束自动刷新
				  window.clearInterval(autoFreshFlag) ;  
			  }
		  }
	});
	
	return GroupServiceMgrLayout ;
});
