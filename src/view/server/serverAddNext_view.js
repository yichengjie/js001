/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-26
 * Time: 上午11:24:14
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/server/serverAddNext.tpl');
	var util = require("../../util/CommonUtil") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	
	var AlertView = require("../alert_view") ;
	
	var ServerAddNextView = Marionette.ItemView.extend({
		template: _.template(viewTemplateStr),
		initialize:function(options){
			this.inputObj = options.inputObj ;
		},
		events: {
		    "click #addServerAndStart" : "addServerAndStart",
		    "click #addServerNotStart" : "addServerNotStart"
		},
		addServerAndStart:function(){
			var modelName = sidbarUtil.getModuleName() ;
			$("#showWaitInfo").removeClass("hide") ;
			$("#addServerAndStart").addClass("hide") ;
			$("#addServerNotStart").addClass("hide") ;
			$("#addserverCloseBtn").addClass("hide") ;
			var serverURL = "/"+jcfManager.appName+"/server/addOrUpdateServer.action" ;
			this.inputObj.ynStart = "start" ;
			var ajaxDeferred = util.dealAjaxRequest4JSObj(serverURL,this.inputObj) ;
			var self = this ;
			$.when(ajaxDeferred).done(function(data){
				if(data.flag=="true"){
					self.remove() ;
					jcfManagement.view.server_sidebar.refresh();
					//这里直接跳转到服务器列表显示页面//下面的代码需要修改
					appRouter.navigate(modelName,{trigger:true}) ;
				}else{
					self.remove() ;
					var av = new AlertView() ;
					av.model.set("msg","添加服务器失败") ;
					jcfManager.dialogRegion.show(av) ;
					//alert("添加服务器失败") ;
				}
			}).fail(function(){
				self.remove() ;
				var av = new AlertView() ;
				av.model.set("msg","添加服务器失败") ;
				jcfManager.dialogRegion.show(av) ;
				//alert("添加服务器失败") ;
			}) ;
		},
		addServerNotStart:function(){
			var self = this ;
			var modelName = sidbarUtil.getModuleName() ;
			this.inputObj.ynStart = "no" ;
			var serverURL = "/"+jcfManager.appName+"/server/addOrUpdateServer.action" ;
			var ajaxDeferred = util.dealAjaxRequest4JSObj(serverURL,this.inputObj) ;
			$("#showWaitInfo").removeClass("hide") ;
			$("#addServerAndStart").addClass("hide") ;
			$("#addServerNotStart").addClass("hide") ;
			$("#addserverCloseBtn").addClass("hide") ;			
			$.when(ajaxDeferred).done(function(data){
				if(data.flag=="true"){
					self.remove() ;
					jcfManagement.view.server_sidebar.refresh();
					appRouter.navigate(modelName,{trigger:true}) ;
				}else{
					self.remove() ;
					var av = new AlertView() ;
					av.model.set("msg","添加服务器失败") ;
					jcfManager.dialogRegion.show(av) ;
					//alert("添加服务器失败") ;
				}
			}).fail(function(){
				self.remove() ;
				var av = new AlertView() ;
				av.model.set("msg","添加服务器失败") ;
				jcfManager.dialogRegion.show(av) ;
				//alert("添加服务器失败") ;
			}) ; 
		},
		/*onShow:function(){
			//this. $el.dialog({modal: true,width: "auto"});
		},*/
		render:function(){
			this.$el.html(this.template(this.model.attributes));
		    return this;
		}
		  
	});
	
	return ServerAddNextView ;

});
