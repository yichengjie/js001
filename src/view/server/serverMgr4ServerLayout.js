/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-29
 * Time: 下午05:59:33
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/server/serverMgr4ServerLayout.tpl');
	var serverDetailTemplateStr = require("../../template/server/serverDetail.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var QueryString = require('querystring');
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var ServerUpdateView = require("./serverUpdate_view") ;
	var authUtil = require("./AuthCheck4ServerUtil") ;
	var ErrorPageView = require("../errorPage_view") ;
	
	
	//显示服务器详细信息
	var ServerDetailView = Marionette.ItemView.extend({
		  template: _.template(serverDetailTemplateStr)
	});
	
	
	var ServerMgr4ServerLayout = Marionette.LayoutView.extend({
		 initialize:function(options){
			this.queryString = options.queryString ;
			//jcf
			var jcfCfgFlag = authUtil.getJcfCfg4Single() ;
			var jcfUpdateFlag = authUtil.getJcfUpdate4Single() ;
			//registry
			var registryCfgFlag = authUtil.getRegistryCfg4Single() ;
			var registryUpdateFlag = authUtil.getRegistryUpdate4Single() ;
			//context
			var contextUpdateFlag = authUtil.getContextUpdate4Single() ;
			this.model.set("jcfCfgFlag",jcfCfgFlag) ;
			this.model.set("jcfUpdateFlag",jcfUpdateFlag) ;
			this.model.set("registryCfgFlag",registryCfgFlag) ;
			this.model.set("registryUpdateFlag",registryUpdateFlag) ;
			this.model.set("contextUpdateFlag",contextUpdateFlag) ;
			
			this.on("showDownContentRegion",this.showDownContentRegion) ;
		 },
		 template: _.template(viewTemplateStr),
		 regions: {
			downContentRegion: "#downContentRegion"
		 },
		 events:{
			 "click #serverMgrNav" :"changeNavItem"
		 },
		 changeNavItem:function(e){
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 var modelName = sidbarUtil.getModuleName() ;
			 var curHref = $(e.target).attr("href") ;//[detailInfo],[paramCfg],[serverUpdate]
			 var $curA = $(e.target) ;
			 var $curLi = $curA.parent() ;
			 if(!$curLi.hasClass("active")){
				 this.queryString.selectedPageUI = curHref ;
				 appRouter.navigate(modelName+"/server/param/" + QueryString.stringify(this.queryString)) ;
				 $curLi.siblings().removeClass("active") ;
				 $curLi.addClass("active") ;
				 this.model.set("selectNavItem",curHref) ;
				 this.showDownContentRegion() ;
			 }
		 },
		 showDownContentRegion:function(){
			var btnTipInfo = "" ;
			var serverId = this.model.get("serverId") ;
			if("paramCfg"==this.model.get("selectNavItem")){
				 btnTipInfo = "保存" ;
			}else if ("serverUpdate"==this.model.get("selectNavItem")){
				 btnTipInfo = "下一步" ;
			}
			var selectNavItem = this.model.get("selectNavItem") ;
			var self  = this ;
		  	var serverURL = "/"+jcfManager.appName+"/server/searchSingleServer.action" ;
	    	var jsParam = {"serverId":serverId} ;	
	    	var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsParam) ;
			
	    	$.when(ajaxing)
	    	 .done(function(data){
			 	if(data.flag =='true'){
					var model = new Backbone.Model(data) ;//data.configInfo
		    		if("detailInfo"==selectNavItem){//详细信息
						self.downContentRegion.show(new ServerDetailView({model:model})) ;
					}else {//服务器更新
				    	model.set("submitBtnInfo",btnTipInfo) ;
			    		self.downContentRegion.show(new ServerUpdateView({model:model})) ;
					}
				}else{
					var ev = new ErrorPageView() ;
					jcfManager.contentRegion.show(ev) ;
				}
	    	 }) ;
		 }
	}) ;
	
	return ServerMgr4ServerLayout ;
});
