/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-3-24
 * Time: 下午03:35:36
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/deploy/rollbackLayout.tpl');
	var util = require("../../util/CommonUtil") ;
	var RollbackView = require("./rollback_view") ;
	var RollbackUploadLayout = require("./rollbackUploadLayout") ;
	var QueryString = require('querystring');
	
	
	var RollbackLayout = Marionette.LayoutView.extend({
		  initialize: function(options) { 
			 this.on("showPageInfo",this.showPageInfo) ;
			 this.queryString = options.queryString ;
			 this.on("refreshBaseInfo",this.refreshBaseInfo) ;
		  },
		  template: _.template(viewTemplateStr),
		  regions: {
			  baseInfoRegion: "#baseInfoRegion" ,
			  uploadAppRegion:"#uploadAppRegion"
		  },
		  events:{
			  "click #rollbackAppBackBtn" : "rollbackAppBack"
		  },
		  rollbackAppBack:function(){
			  var groupId = this.model.get("groupId") ;
			  var status = this.model.get("status") ;
			  var currentPage = this.model.get("currentPage");
			  var pageSize = this.model.get("pageSize") ;
			  var jString = {"groupId":groupId,"status":status,
					        "selectedPageUI":"showAllAppUI",
					        "currentPage":currentPage+"","pageSize":pageSize+""} ;
			  appRouter.navigate("deployMgr/group/param/" + QueryString.stringify(jString),{trigger:true}) ;
		  },
		  refreshBaseInfo:function(){//刷新基本信息
			  var self = this ;
			  var appName = this.queryString.appName ;
			  var appVersion = this.queryString.appVersion ;
			  var prevVersion = this.queryString.prevVersion ;
			  var serverURL = "/"+jcfManager.appName+"/deployMgr/searchAppVersionList.action" ;
			  var queryParam = {"appName":appName} ;
			  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,queryParam) ;
			  $.when(ajaxing).done(function(data){
				  if(data.flag== "true"){
					  var model = new Backbone.Model(data) ;
					  model.set("prevVersion",prevVersion) ;
					  model.set("appName",appName) ;
					  model.set("appVersion",appVersion) ;
					  var rollbackView = new RollbackView({model:model,jsParam:self.queryString}) ;
					  self.baseInfoRegion.show(rollbackView) ;
				  }else{
					  alert("获取上传应用版本出错!") ;
				  }
			  }) ;
		  },
		  showPageInfo:function(){
			  var self = this ;
			  var appName = this.queryString.appName ;
			  var appVersion = this.queryString.appVersion ;
			  var prevVersion = this.queryString.prevVersion ;
			  var serverURL = "/"+jcfManager.appName+"/deployMgr/searchAppVersionList.action" ;
			  var queryParam = {"appName":appName} ;
			  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,queryParam) ;
			  $.when(ajaxing).done(function(data){
				  if(data.flag== "true"){
					  var model = new Backbone.Model(data) ;
					  model.set("prevVersion",prevVersion) ;
					  model.set("appName",appName) ;
					  model.set("appVersion",appVersion) ;
					  var rollbackView = new RollbackView({model:model,jsParam:self.queryString}) ;
					  self.baseInfoRegion.show(rollbackView) ;
					  
					  var uploadLayout = new RollbackUploadLayout({queryString:self.queryString}) ;
					  self.uploadAppRegion.show(uploadLayout) ;
					  uploadLayout.parent = self ;
					  uploadLayout.trigger("showPageInfo") ;
				  }else{
					  alert("获取上传应用版本出错!") ;
				  }
			  }) ;
			  
		  }
	});
	
	return RollbackLayout ;

});
