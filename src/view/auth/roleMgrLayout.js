/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-3-25
 * Time: 下午02:00:17
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var util = require("../../util/CommonUtil") ;
	var QueryString = require('querystring');
	var layoutTplStr = require('../../template/auth/userMgrLayout.tpl');
	var itemTplStr = require("../../template/auth/roleItem.tpl") ;
	var listTplStr = require("../../template/auth/roleList.tpl") ;
	var searchTplStr = require("../../template/auth/roleSearchItem.tpl") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	
	var RoleAddView = require("./roleAdd_view") ;
	
	
	var SearchItemView = Marionette.ItemView.extend({
		tagName:"table",
		className:"table",
		template: _.template(searchTplStr),
		events:{
			"click #toAddRoleUIBtn" : "toAddRoleUI",
	    },
	    toAddRoleUI:function(){
	    	var modelName = sidbarUtil.getModuleName() ;
	    	appRouter.navigate(modelName +"/roleMgr/add" ) ;
	    	var roleAddView = new RoleAddView() ;
	    	jcfManager.contentRegion.show(roleAddView) ;
	    	roleAddView.trigger("showPageInfo") ;
	    }
	});
	
	var RoleItemView = Marionette.ItemView.extend({
		  initialize:function(){
			 var queryConditionId = $.trim($("#roleId").val());
			 var queryConditionName = $.trim($("#roleName").val());
			 this.model.set("queryConditionId",queryConditionId) ;
			 this.model.set("queryConditionName",queryConditionName) ;
		  },
		  tagName: "tr",
		  template: _.template(itemTplStr),
		  events: {
		 		"click" : "highlightName",
		 		"click a.view" : "toViewRoleUI",
		 		"click a.update" : "toUpdateRoleUI",
		 		"click a.delete" : "deleteRole",
		  },
		  highlightName: function(e){
			 e.preventDefault();
			 this.$el.toggleClass("warning");
		  },
		  toViewRoleUI:function(e){
			  e.preventDefault();
			  e.stopPropagation() ;
			  var operatorType = "view" ;
			  var roleId = this.model.get("id") ;
			  var queryConditionId = this.model.get("queryConditionId") ;
			  var queryConditionName = this.model.get("queryConditionName") ;
			  var jString = {"operatorType":operatorType,"roleId":roleId,"queryConditionId":queryConditionId,"queryConditionName":queryConditionName} ;
			  appRouter.navigate("authMgr/roleMgr/update/param/" + QueryString.stringify(jString),{trigger:true}) ;
			  
		  },
		  toUpdateRoleUI:function(e){
			  e.preventDefault();
			  e.stopPropagation() ;
			  var operatorType = "update" ;
			  var roleId = this.model.get("id") ;
			  var queryConditionId = this.model.get("queryConditionId") ;
			  var queryConditionName = this.model.get("queryConditionName") ;
			  var jString = {"operatorType":operatorType,"roleId":roleId,"queryConditionId":queryConditionId,"queryConditionName":queryConditionName} ;
			  appRouter.navigate("authMgr/roleMgr/update/param/" + QueryString.stringify(jString),{trigger:true}) ;
		  },
		  deleteRole:function(e){
			  e.preventDefault();
			  e.stopPropagation() ;
			  var roleId = this.model.get("id") ;
			  var flag = this.hasUser(roleId) ;
			  var self = this  ;
			  if(!flag){
				  if(confirm("确定删除?")){
					  var jsonParam = {"roleId":roleId} ;
					  var serverURL = "/"+jcfManager.appName+"/auth/deleteRole.action" ;
					  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
					  $.when(ajaxing).done(function(data){
						  if(data.flag=="true"){
							  util.alertEsg("删除成功!") ;
							  self.remove() ;
						  }else{
						  }
					  }) ;
				  }
			  }
		  },
		  hasUser:function(roleId){
			  var flag = true ;
			  var serverURL = "/"+jcfManager.appName+"/auth/hasUser.action" ;
			  var jsonParam = {"roleId":roleId} ;
			  var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			  $.when(ajaxing).done(function(data){
				  if(data.hasUser=="true"){
					 // alert("该角色下还有用户未删除，不能删除该角色");
					  util.alertEsg("该角色下还有用户未删除，不能删除该角色!") ;
				  }else{
					  flag = false;
				  }
			  }) ;
			  return flag; 
		  }
	});

	var RoleListView = Marionette.CompositeView.extend({
	  childView: RoleItemView,
	  tagName:"table",
	  className:"list table table-bordered",
	  childViewContainer: "tbody",
	  template: _.template(listTplStr)
	});
	
	
	var RoleMgrLayout = Marionette.LayoutView.extend({
		  template: _.template(layoutTplStr),
		  initialize: function(options) { 
			 this.on("showPageInfo",this.showPageInfo) ;
			 this.queryString = options.queryString ;
		  },
		  regions: {
			searchRegion: "#searchRegion",
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion",
		  },
		  events:{
			  "click #searchRoleBtn" : "searchRole"
		  },
		  searchRole:function(){
			  var modelName = sidbarUtil.getModuleName() ;
			  var roleId = $.trim($("#roleId").val()) ;
			  if(isNaN(roleId)){
				 // alert("角色ID必须为数字!") ;
				  util.alertEsg("角色ID必须为数字!") ;
			  }else{
				  var roleName = $.trim($("#roleName").val()) ;
				  var pageSize = $.trim($("#pageSize").val()) ;
				  var jsParam = {} ;
				  jsParam.currentPage = "1";
				  jsParam.pageSize = pageSize ;
				  jsParam.roleId = roleId ;
				  jsParam.roleName = roleName ;
				  var jString = {"roleId":roleId,"roleName":roleName,"currentPage":"1","pageSize":pageSize} ;
				  appRouter.navigate(modelName +"/roleMgr/param/" + QueryString.stringify(jString)) ;
				  this.showPageInfoPrivate(jsParam) ;
			  }
			 
		  },
		  showPageInfo:function(){
			  var roleId = this.queryString.roleId == undefined ? "" : this.queryString.roleId ;
			  var roleName = this.queryString.roleName == undefined ? "" : this.queryString.roleName ;
			  
			  var model = new Backbone.Model({"roleId":roleId,"roleName":roleName}) ;
			  var searchView = new SearchItemView({model:model}) ;
			  this.searchRegion.show(searchView) ;
			  var jsParam = {} ;
			  jsParam.currentPage = this.queryString.currentPage == undefined ?"1":this.queryString.currentPage;
			  jsParam.pageSize = this.queryString.pageSize == undefined ?"":this.queryString.pageSize ;
			  jsParam.roleId = roleId  ;
			  jsParam.roleName = roleName ;
			  this.showPageInfoPrivate(jsParam) ;
		  },
		  showPageInfoPrivate:function(jsParam){
			  var self = this ;
			  var serverURL = "/"+jcfManager.appName+"/auth/searchRole.action" ;
			  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			  $.when(ajaxing).done(function(data){
				  if(data.flag=="true"){
					  var collection = new Backbone.Collection(data.pageBean.recordList) ;
					  var listView = new RoleListView({collection:collection}) ;
					  self.listRegion.show(listView) ;
					  //显示分页栏
					  var model = new Backbone.Model(data.pageBean) ;
					  var pString = {"roleId":jsParam.roleId,"roleName":jsParam.roleName,
							  "currentPage":jsParam.currentPage,"pageSize":jsParam.pageSize} ;
			    	  model.set("uriSection","roleMgr") ;
					  var pbview = new PagebarView({model:model,queryString:pString});
			    	  self.pagebarRegion.show(pbview) ;
				  }else{
				  	  util.alertEsg("查询出错!") ;
					  //alert("查询出错!") ;
				  }
			  }) ;
		  }
		  
    });
	
	
	return RoleMgrLayout ;
	
});
