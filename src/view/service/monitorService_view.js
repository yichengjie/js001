/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-3-10
 * Time: 下午05:09:58
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {//服务监控页面

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/service/monitoryService_view.tpl');
	var util = require("../../util/CommonUtil") ;
	var QueryString = require('querystring');
	var authCheck = require("./AuthCheck4Service") ;
	var QueryString = require('querystring');
	var MonitorServiceView = Marionette.ItemView.extend({
		 initialize: function(options) {
			this.queryString = options.queryString ;
			var authClearQueueFlag = authCheck.getClearQueueInfoFlag() ;
			this.model.set("authClearQueueFlag",authClearQueueFlag) ;
			this.listenTo(this.model, "change", this.render);
		 },
		 template: _.template(viewTemplateStr) ,
		 events:{
			"click #clearQueueInfoBtn" : "clearQueueInfo" ,
			"click #monitorServiceBackBtn" : "monitorServiceBack",
			"click #monitorServiceRefreshBtn" : "refreshPage"
		 },
		 monitorServiceBack:function(){
		 	var serverId = this.queryString.serverId ;
			var jString = {"serverId":serverId} ;
			appRouter.navigate("serviceMgr/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
			//window.history.back() ;
		 },
		 refreshPage:function(){//刷新页面
		 	  var serverId = this.queryString.serverId ;
			  var serviceId = this.queryString.serviceId ;
			  var t = new Date().getTime() ;
			  var jString = {"serverId":serverId,"serviceId":serviceId,"t":t} ;
			  appRouter.navigate("serviceMgr/server/monitor/param/" + QueryString.stringify(jString),{trigger:true}) ;
		 },
		 clearQueueInfo:function(){
			 var self = this ;
			 var serverURL = "/"+jcfManager.appName+"/service/clearServiceQueue.action" ;
			 var serverName = this.model.get("serverName") ;
			 var serviceName = this.model.get("serviceName");
			 var version = this.model.get("version") ;
			 var jsonParam = {"serverName":serverName,"serviceName":serviceName,"version":version} ;
			 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			 $.when(ajaxing).done(function(data){
				 if(data.flag=="true"){//serviceMgr/server/monitor
				 	 var timstamp = (new Date).valueOf();  
					 self.queryString.t = timstamp ;
					 appRouter.navigate("serviceMgr/server/monitor/param/" + QueryString.stringify(self.queryString),{trigger:true}) ;
					 //self.model.set("requestQueueSize","0") 
				 }else{
					 alert("清除失败!") ;
				 }
			 }) ;
		 },
		 render: function() {
		    this.$el.html(this.template(this.model.attributes));
		    return this;
	  	 }

	});
	
	return MonitorServiceView ;
});
