define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var layoutTmpStr = require('../../template/service/serverServiceMgrLayout.tpl');
	var itemTmpStr = require("../../template/service/serverServiceItem.tpl") ;
	var listTmpStr = require("../../template/service/serverServiceList.tpl"); 
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var QueryString = require('querystring');
	var ServerServiceCfgView = require("./serverServiceCfg_view") ;
	var authCheck = require("./AuthCheck4Service") ;
	var ListTipModel = require("../../model/listTip_model") ; 
	var ListTipView = require("../listTip_view") ;
	var ServerOperHelper = require("./ServiceOperHelper") ;
	require("bs-modal")($) ;
	
	
	//列表每一项视图
	var ItemView = Marionette.ItemView.extend({
		 initialize:function(){
		    this.model.set("serverId",$("#hiddenServerIdOnPage").val()) ;
		    
		    var authJcfStartFlag = authCheck.getJcfStart4GroupFlag() ;
			var authJcfStopFlag = authCheck.getJcfStop4GroupFlag() ;
			var authJcfForceStopFlag = authCheck.getJcForceStop4GroupFlag() ;
			var authJcfMoniFlag = authCheck.getJcfMoni4ServerFlag() ;//监控
			this.model.set("authJcfStartFlag",authJcfStartFlag) ;
			this.model.set("authJcfStopFlag",authJcfStopFlag) ;
			this.model.set("authJcfForceStopFlag",authJcfForceStopFlag) ;
			this.model.set("authJcfMoniFlag",authJcfMoniFlag) ;
			///////////
			var authSihStartFlag = authCheck.getSihStart4GroupFlag() ;
			var authSihStopFlag = authCheck.getSihStop4GroupFlag() ;
			var authSihForceStopFlag = authCheck.getSihForceStop4GroupFlag() ;
			var authSihMoniFlag = authCheck.getSihMoni4ServerFlag() ;
			this.model.set("authSihStartFlag",authSihStartFlag) ;
			this.model.set("authSihStopFlag",authSihStopFlag) ;
			this.model.set("authSihForceStopFlag",authSihForceStopFlag) ;
			this.model.set("authSihMoniFlag",authSihMoniFlag) ;
			///////////
			var authHttpStartFlag = authCheck.getHttpStart4GroupFlag() ;
			var authHttpStopFlag = authCheck.getHttpStop4GroupFlag() ;
			var authHttpForceStopFlag = authCheck.getHttpForceStop4GroupFlag() ;
			var authHttpMoniFlag = authCheck.getHttpMoni4ServerFlag() ;
			this.model.set("authHttpStartFlag",authHttpStartFlag) ;
			this.model.set("authHttpStopFlag",authHttpStopFlag) ;
			this.model.set("authHttpForceStopFlag",authHttpForceStopFlag) ;
			this.model.set("authHttpMoniFlag",authHttpMoniFlag) ;
			////////////
			var authWebStartFlag = authCheck.getWebStart4GroupFlag() ;
			var authWebStopFlag = authCheck.getWebStop4GroupFlag() ;
			var authWebForceStopFlag = authCheck.getWebForceStop4GroupFlag() ;
			var authWebMoniFlag = authCheck.getWebMoni4ServerFlag() ;
			this.model.set("authWebStartFlag",authWebStartFlag) ;
			this.model.set("authWebStopFlag",authWebStopFlag) ;
			this.model.set("authWebForceStopFlag",authWebForceStopFlag) ;
			this.model.set("authWebMoniFlag",authWebMoniFlag) ;
			///////////////
			var authTbStartFlag = authCheck.getTbStart4GroupFlag() ;
			var authTbStopFlag = authCheck.getTbStop4GroupFlag() ;
			var authTbForceStopFlag = authCheck.getTbForceStop4GroupFlag() ;
			var authTbMoniFlag = authCheck.getTbMoni4ServerFlag() ;
			this.model.set("authTbStartFlag",authTbStartFlag) ;
			this.model.set("authTbStopFlag",authTbStopFlag) ;
			this.model.set("authTbForceStopFlag",authTbForceStopFlag) ;
			this.model.set("authTbMoniFlag",authTbMoniFlag) ;
			////////////
			var authTtStartFlag = authCheck.getTtStart4GroupFlag() ;
			var authTtStopFlag = authCheck.getTtStop4GroupFlag() ;
			var authTtForceStopFlag = authCheck.getTtForceStop4GroupFlag() ;
			var authTtMoniFlag = authCheck.getTtMoni4ServerFlag() ;
			this.model.set("authTtStartFlag",authTtStartFlag) ;
			this.model.set("authTtStopFlag",authTtStopFlag) ;
			this.model.set("authTtForceStopFlag",authTtForceStopFlag) ;
			this.model.set("authTtMoniFlag",authTtMoniFlag) ;
			///////////////////
			var authUtlStartFlag = authCheck.getUtlStart4GroupFlag() ;
			var authUtlStopFlag = authCheck.getUtlStop4GroupFlag() ;
			var authUtlForceStopFlag = authCheck.getUtlForceStop4GroupFlag() ;
			var authUtlMoniFlag = authCheck.getUtlMoni4ServerFlag() ;
			this.model.set("authUtlStartFlag",authUtlStartFlag) ;
			this.model.set("authUtlStopFlag",authUtlStopFlag) ;
			this.model.set("authUtlForceStopFlag",authUtlForceStopFlag) ;
			this.model.set("authUtlMoniFlag",authUtlMoniFlag) ;
			
			//增加配置权限
			var authJcfCfgFlag = authCheck.getJcfCfg4GroupFlag() ;
			var authSihCfgFlag = authCheck.getSihCfg4GroupFlag() ;
			var authHttpCfgFlag = authCheck.getHttpCfg4GroupFlag() ;
			var authWebCfgFlag = authCheck.getWebCfg4GroupFlag() ;
			var authTbCfgFlag = authCheck.getTbCfg4GroupFlag() ;
			var authTtCfgFlag = authCheck.getTtCfg4GroupFlag() ;
			var authUtlCfgFlag = authCheck.getUtlCfg4GroupFlag() ;
			
			this.model.set("authJcfCfgFlag",authJcfCfgFlag) ;
			this.model.set("authSihCfgFlag",authSihCfgFlag) ;
			this.model.set("authHttpCfgFlag",authHttpCfgFlag) ;
			this.model.set("authWebCfgFlag",authWebCfgFlag) ;
			this.model.set("authTbCfgFlag",authTbCfgFlag) ;
			this.model.set("authTtCfgFlag",authTtCfgFlag) ;
			this.model.set("authUtlCfgFlag",authUtlCfgFlag) ;
			
			
		    this.model.on("change",this.render) ;
	     },
		 tagName:"tr",
		 template: _.template(itemTmpStr),
		 events:{
			"click :checkbox[name='selected']":"singleSelect",
			"click .serviceOperationTd a" : "operServiceStatus",
			"click .serverServiceCfgTd a" : "toServerServiceCfgUI",
			"click .serviceCfgMoniTd a" :  "serviceCfgMoni",
			"click .serverServiceRespTd a" :  "toServerServiceRespUI"
		 },
		 singleSelect:function(e){
			 var $tbody = $(e.target).parents("tbody") ;
			 var len1 = $tbody.find("input:checkbox[name='selected']").length  ; 
			 var len2 = $tbody.find("input:checkbox[name='selected']:checked").length  ; 
			 if(len1==len2){
				 $("#allSelected").prop("checked",true) ;
			 }else{
				 $("#allSelected").prop("checked",false) ;
			 }
		 },
		 serviceCfgMoni:function(e){//详情监控
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 var serverId = this.model.get("serverId") ;
			 var serviceId = this.model.get("serviceId") ;
			 var jsParam = {"serverId":serverId,"serviceId":serviceId} ;
			 appRouter.navigate( "serviceMgr/server/monitor/param/" + QueryString.stringify(jsParam),{trigger:true}) ;
		 },
		 toServerServiceCfgUI:function(e){
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 var modelName = sidbarUtil.getModuleName() ;
			 var serverURL = "/"+jcfManager.appName+"/service/toConfigServiceUI.action" ;
			 var serverId = this.model.get('serverId');
			 var serviceId = this.model.get('serviceId');
			 var jsonParam = {"serverId":serverId,"serviceId":serviceId} ;
			 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			 var queryString = {"serverId":serverId,"serviceId":serviceId} ;
			 appRouter.navigate(modelName +"/server/cfg/param/" + QueryString.stringify(queryString)) ;
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
					 model.set("mode",data.serviceParamInfo.mode||"") ;
					 var configView = new ServerServiceCfgView({model:model}) ;
					 jcfManager.contentRegion.show(configView) ;
				 }else{
					 var tipModel = new ListTipModel() ;
					 tipModel.set("errList",[""+errorFlag]) ;
					 var tipView = new ListTipView({model:tipModel}) ;
					 jcfManager.tipInfoRegion.show(tipView) ;
				 }
			 }) ;
		 },
		 toServerServiceRespUI:function(e){//度量数据	
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 var autoFreshFlag = $("#freshPage4ServerServiceFlag").val() ;
			 window.clearInterval(autoFreshFlag) ;
			 var RespOptView = require("./respMoni_view") ;			 
			 this.model.set("checkGroupCategory","1") ;
			 jcfManager.dialogRegion.show(new RespOptView({model:this.model})) ; 
		 	  $('#queryDataModal').modal('show');
		 },
		 operServiceStatus:function(e){//启动,停止服务
			 e.preventDefault() ;
			 var groupOrServer = "server" ;
			 helper = new ServerOperHelper() ;
			 var href = $(e.target).attr("href") ;
			 var autoFreshFlag = $("#freshPage4ServerServiceFlag").val() ;
			 window.clearInterval(autoFreshFlag) ;
			 if("stop"==href){
				 helper.stopService(this.model ,groupOrServer) ;
			 }else if ("forceStop"==href){
				 helper.forceStopService(this.model ,groupOrServer) ;
			 }else if("start"==href){
				 helper.startService(this.model, groupOrServer) ;
			 }
		 },
		 render:function(){
			this.$el.html(this.template(this.model.attributes));
			return this;
		 }
	});
	//列表视图
	var ListView =  Marionette.CompositeView.extend({
		initialize:function(){
		},
	    template: _.template(listTmpStr),
	    events:{
			"click #allSelected" :"allSelected"
		},
		childView: ItemView,
		childViewContainer: "tbody",
		allSelected:function(e){
			var flag = e.target.checked ;
			var $tbody = $(e.target).parents("thead").siblings("tbody") ;
			$tbody.find("input:checkbox[name='selected']").prop("checked",flag)  ;
		}
		
	});
	
	
	var ServerServiceLayout = Marionette.LayoutView.extend({
		  initialize: function(options){
			 this.queryString = options.queryString ;
			 this.on("showPageInfo",this.showPageInfo) ;
			 var authSearch4ServerFlag = authCheck.getSearchService4ServerFlag() ;
			 this.model.set("authSearch4ServerFlag",authSearch4ServerFlag) ;
			 jcfManager.tipInfoRegion = this.tipInfoRegion ;
		  },
		  template: _.template(layoutTmpStr),
		  regions: {
		  	tipInfoRegion:"#tipInfoRegion",
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion"
		  },
		  events:{
			  "click #searchServerServiceBtn" : "searchServerService"
		  },
		  searchServerService:function(){
			  var category = $("#search4ServiceType").val() ;
			  var status = $("#search4RuningStatus").val() ;
			  this.queryString.currentPage = "1" ;
			  if(this.queryString.pageSize==undefined||this.queryString.pageSize==""){
				  this.queryString.pageSize = jcfManager.defaultPageSize ;
			  }
			  var jsParam = {} ;
			  jsParam.currentPage = this.queryString.currentPage;
			  jsParam.pageSize = this.queryString.pageSize ;
			  jsParam.serverId = this.queryString.serverId ;
			  jsParam.category = category ;
			  jsParam.status = status ;
			  var modelName = sidbarUtil.getModuleName() ;
			  appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jsParam)) ;
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
			  jsParam.serverId = this.queryString.serverId ;
			  jsParam.category = this.queryString.category ;
			  jsParam.status = this.queryString.status ;
			  this.showPageInfo2(jsParam) ;
			  
		  },
		  showPageInfo2:function(jsParam){
			  var self = this ;
			  var  refreshSpace = 2000 ;//刷新时间间隔
		      var  refreshNum = util.getFefreshPageNum() ;//刷新次数
		      var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
		      //保存当前url
		      var curHash = window.location.hash ;
		      $("#freshPage4ServerServiceUrl").val(curHash) ;
			  var serverURL  = "/"+jcfManager.appName+"/service/searchServerService.action" ;
			  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			  $.when(ajaxing).done(function(data){
				  var collection = new Backbone.Collection(data.recordList) ;
				  var listView = new ListView({collection:collection}) ;
				  self.listRegion.show(listView) ;
				  var model = new Backbone.Model(data) ;
				  model.set("uriSection","server") ;
				  var pbView = new PagebarView({model:model,queryString:self.queryString}) ;
				  self.pagebarRegion.show(pbView) ;
				  //定时刷新页面服务的状态
				  if(collection.length>0){
					  var ttt= setInterval(self.updatePageServiceStatus,refreshSpace,collection);
					  $("#freshPage4ServerServiceFlag").val(ttt) ;
					  setTimeout("window.clearInterval("+ttt+")",refreshTime); 
				  }
			  }) ;
		  },
		  updatePageServiceStatus:function(collection){
			  var curHash = window.location.hash ;
			  var oldUrl  = $("#freshPage4ServerServiceUrl").val() ;
			  var autoFreshFlag = $("#freshPage4ServerServiceFlag").val() ;
			  if(oldUrl==curHash){
				  var serverURL = "/"+jcfManager.appName+"/service/searchServerServiceStatus.action" ;
				  var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
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
			  }else{
				  window.clearInterval(autoFreshFlag) ;
			  }
		  }
	});
	return ServerServiceLayout ;

});
