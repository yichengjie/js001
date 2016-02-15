/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-2-11
 * Time: 下午01:27:00
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var layoutTmpStr = require('../../template/service/serviceDetailLayout.tpl');
	var baseInfoTmpStr = require("../../template/service/serviceDetailBaseInfo.tpl") ;
	var itemTmpStr = require("../../template/service/serviceDetailItem.tpl") ;
	var listTmpStr = require("../../template/service/serviceDetailList.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var QueryString = require('querystring');
	var authCheck = require("./AuthCheck4Service") ;
	var ServerOperHelper = require("./ServiceOperHelper") ;
	
	
	var BaseInfoView = Marionette.ItemView.extend({
		  template: _.template(baseInfoTmpStr) ,
		  tagName:"table",
		  className:"table table-bordered"
	});
	
	
	
	var ItemView = Marionette.ItemView.extend({
		  initialize:function(){
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
			this.listenTo(this.model, "change", this.render);
	      },
		  template: _.template(itemTmpStr),
		  tagName:"tr",
		  events:{
	    	  "click .serviceStatusOperTd a" :"operServiceStatus",
	    	  "click .serviceCfgTd a" : "toServerServiceCfgUI",
	    	  "click .showCompensate div" : "toggleCompensate" ,
	    	  "click .serviceMonitorTd a" : "serviceMonitor" 
	      },
	      toggleCompensate:function(e){
	    	 var $t = $(e.target) ;
	    	 var serverName = this.model.get("serverName") ;
	    	 var $curTr = $t.parent("td").parent("tr") ;
	    	 if($t.hasClass("arrow_down")){//当前是展开状态
	    		 $t.removeClass("arrow_down") ;
	    		 $t.addClass("arrow_right") ;
	    		 //移除显示的补偿服务
	    		 $curTr.siblings("."+serverName).remove() ; ;
	    	 }else{//当前是关闭状态
	    		 $t.removeClass("arrow_right") ;
	    		 $t.addClass("arrow_down") ; 
	    		 $curTr.siblings("."+serverName).remove() ; ;
	    		 this.dealCompensateDataOnPage($curTr,serverName) ;
	    	 }
	      },
	      dealCompensateDataOnPage:function($curTr,serverName){//处理页面
	    	 var compensatePrefix = "~compensate~";
	    	 var cServiceName = compensatePrefix + this.model.get("serviceName");
	    	 var serverURL = "/"+jcfManager.appName+"/service/getServerCompansateService.action" ;
	    	 
	    	 var serverId = this.model.get("serverId") ;
	    	 var serviceName = cServiceName ;
	    	 var version = this.model.get("appVersion") ;
	    	 
	    	 var jsonParam = {"serverId":serverId,"serviceName":serviceName,"version":version} ;
	    	 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
	    	 var self = this ;
	    	 $.when(ajaxing)
	    	 .done(function(data){
	    		 if(data!=null){
	    			 var status = self.convertServiceStatus(data.serviceStatus) ;
	    			 var showLine = "<tr class = '"+serverName+"'>" +
						"<td>补偿服务</td>" +
						"<td>"+data.serverName+"</td>" +
						"<td>"+data.serviceName+"</td>" +
						"<td>"+data.serviceCategory+"</td>" +
						"<td>"+status+"</td>" +
						"<td>----</td>" +
						"<td>----</td>" +
						"<td>----</td>" +
					 "</tr>" ;
		    		 $curTr.after(showLine) ;
	    		 }
	    	 }) ;
	    	  
	      },
	      serviceMonitor:function(e){
	    	  e.preventDefault() ;
			  var autoFreshFlag = $("#freshPage4DetailServiceFlag").val() ;
			  window.clearInterval(autoFreshFlag)  
	    	  var MonitorServiceView = require("./monitorService_view") ;
	    	  var serverURL = "/"+jcfManager.appName+"/service/monitorService.action" ;
	    	  var serverId = this.model.get("serverId") ;
	    	  var serviceId = this.model.get("serviceId") ;
	    	  var jsonParam = {"serverId":serverId,"serviceId":serviceId} ;
	    	  appRouter.navigate("serviceMgr/server/monitor/param/" + QueryString.stringify(jsonParam)) ;
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
	    			  var jString = {"serverId":serverId,"serviceId":serviceId} ;
		    		  var monitorView = new MonitorServiceView({model:model,queryString:jString}) ;
		    		  jcfManager.contentRegion.show(monitorView) ;
	    		  }
	    	  }) ;
	      },
	      convertServiceStatus:function(serviceStatus){
	    	  var retStr = serviceStatus ;
	    	  if (serviceStatus === "1"){
	    		    retStr = "启动" ;
			  }else if (serviceStatus === "2"){
					retStr = "停止" ;
			  }else if (serviceStatus === "3"){
					retStr = "启动中" ;
			  }else if (serviceStatus === "4"){
					retStr = "停止中" ;
			  }else if (serviceStatus === "5"){
					retStr = "挂起" ;
			  }else if (serviceStatus === "6"){
					retStr = "挂起中" ;
			  }else if (serviceStatus === "7"){
					retStr = "未知" ;
			  }else if(serviceStatus === "8"){
			  		retStr = "" ;
			  }
			  return retStr ;
	      },
	      toServerServiceCfgUI:function(e){
	    	  e.preventDefault() ;
			  var autoFreshFlag = $("#freshPage4DetailServiceFlag").val() ;
			  window.clearInterval(autoFreshFlag)  
	    	  var modelName = sidbarUtil.getModuleName() ;
	    	  var serverId = this.model.get("serverId") ;
	    	  var serviceId = this.model.get("serviceId") ;
	    	  var queryString = {"serverId":serverId,"serviceId":serviceId} ;
	    	  appRouter.navigate(modelName +"/server/cfg/param/" + QueryString.stringify(queryString),{trigger:true}) ;
	      },
	      operServiceStatus:function(e){
	    	  e.preventDefault() ;
			  var groupOrServer = "server" ; 
			  var helper = new ServerOperHelper() ;
			  var autoFreshFlag = $("#freshPage4DetailServiceFlag").val() ;
			  window.clearInterval(autoFreshFlag)  
	    	  var serverName = this.model.get("serverName") ;
	    	  var $curTr = $(e.target).parent("td").parent("tr") ;
	    	  var $t = $curTr.find("td.showCompensate div") ;
	    	  if($t.hasClass("arrow_down")){//当前是展开状态
		    	  $t.removeClass("arrow_down") ;
		    	  $t.addClass("arrow_right") ;
		    	  $curTr.siblings("."+serverName).remove() ;//移除显示的补偿服务
		      }
	    	  var href = $(e.target).attr("href") ;
			  var autoFreshFlag = $("#freshPage4ServerServiceFlag").val() ;
			  window.clearInterval(autoFreshFlag) ;
			  if("stop"==href){
				 helper.stopService(this.model ,groupOrServer) ;
			  }else if ("forceStop"==href){
				 helper.forceStopService(this.model ,groupOrServer) ;
			  }else if("start"==href){
				 helper.startService(this.model ,groupOrServer) ;
			  }
	      },
		  render:function(){
	    	  this.$el.html(this.template(this.model.attributes));
	    	  return this;
	      }
	});
	
	var ListView =  Marionette.CompositeView.extend({
		initialize:function(){
		   
		},
	    template: _.template(listTmpStr),
	    tagName:"table",
	    className:"table table-bordered",
		childView: ItemView,
		childViewContainer: "tbody",
	});
	
	
	var ServiceDetailLayout = Marionette.LayoutView.extend({
	    template: _.template(layoutTmpStr),
	    initialize:function(options){
		    this.queryString = options.queryString ;
			this.on("showPageInfo",this.showPageInfo) ;
			jcfManager.tipInfoRegion = this.tipInfoRegion ;
		},
	    regions: {
		  baseRegion: "#baseRegion",
		  tipInfoRegion:"#tipInfoRegion",
		  listRegion: "#listRegion",
		  pagebarRegion: "#pagebarRegion"
	    },
	    events:{
			  "click #bacBtn" : "bac"
		},
	    bac:function(){
			  window.history.back() ;
		},
	    showPageInfo:function(){
	    	var self = this ;
	    	var serverURL = "/"+jcfManager.appName+"/service/findServiceById4Group.action" ;
	    	var serviceId = this.queryString.serviceId ;
	    	var groupId = this.queryString.groupId ;
	    	var currentPage = this.queryString.currentPage ;
	    	if(currentPage==undefined){
	    		this.queryString.currentPage = "1" ;
	    		this.queryString.pageSize = jcfManager.defaultPageSize ;
	    	}
	    	var jsParam = {} ;
	    	jsParam.serviceId = serviceId ;
	    	jsParam.groupId = groupId ;
	    	jsParam.currentPage = this.queryString.currentPage ;
	    	jsParam.pageSize = this.queryString.pageSize ;
	    	var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
	    	//保存当前url
		    var curHash = window.location.hash ;
		    $("#freshPage4DetailServiceUrl").val(curHash) ;
		    var  refreshSpace = 2000 ;
		    var  refreshNum = util.getFefreshPageNum() ;//刷新次数
		    var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
	    	
	    	$.when(ajaxing).done(function(data){
	    		var baseModel = new Backbone.Model(data.baseInfo) ;
	    		var baseView = new BaseInfoView({model:baseModel}) ;
	    		self.baseRegion.show(baseView) ;
	    		var collection = new Backbone.Collection(data.pageBean.recordList) ;
	    		var listView = new ListView({collection:collection}) ;
	    		self.listRegion.show(listView) ;
	    		//显示分页栏
	    		var pageModel = new Backbone.Model(data.pageBean) ;
	    		pageModel.set("uriSection","group/detail") ;
				var pbView = new PagebarView({model:pageModel,queryString:self.queryString}) ;
				self.pagebarRegion.show(pbView) ;
	    		if(collection.length>0){
	    			//定时刷新页面服务的状态
					var ttt= setInterval(self.updatePageServiceStatus,refreshSpace,collection);
					$("#freshPage4DetailServiceFlag").val(ttt) ;
					setTimeout("window.clearInterval("+ttt+")",refreshTime);
	    		}
	    	}) ;
	    },
	    updatePageServiceStatus:function(collection){
	        var curHash = window.location.hash ;
			var oldUrl  = $("#freshPage4DetailServiceUrl").val() ;
			var autoFreshFlag = $("#freshPage4DetailServiceFlag").val() ;
			if(oldUrl==curHash){//刷新页面
			   var serverURL = "/"+jcfManager.appName+"/service/updateStatus4Group.action" ;
			   var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
			   $.when(ajaxing).done(function(data){
				   var model = new Backbone.Model(data) ;//serviceId_serverId <--> status
				   collection.each(function(m){
					  var serverId = m.get("serverId") ;
					  var cStatus = model.get(serverId+"") ;
					  if(cStatus!=undefined){
						 m.set("serviceStatus",cStatus) ;
					  }
				   }) ;
			    }) ;
			}else{//结束自动刷新
			    window.clearInterval(autoFreshFlag)  
			}
	    }
	});
	
	return ServiceDetailLayout;
});
