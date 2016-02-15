/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-17
 * Time: 上午11:35:30
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var QueryString = require('querystring');
	var util = require("../../util/CommonUtil") ;
	var UserMgrApi = require("../../api/auth/UserMgrApi") ;
	var UserListView = require("./userList_view") ;
	var UserAddView = require("./userAdd_view") ;
	var viewTemplateStr = require('../../template/auth/userMgrLayout.tpl');
	var PagebarView = require("../pagebar_view2") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	
	
	var searchTmpStr = require("../../template/auth/userSearchItem.tpl") ;
	
	var UserSearchItemView = Marionette.ItemView.extend({
	    template : _.template(searchTmpStr)
	});
	
	var UserMgrLayoutView = Marionette.LayoutView.extend({
		template: _.template(viewTemplateStr),
		initialize:function(option){
			this.queryString = option.queryString ;
		},
		events: {
		     "click #selectUser" : "searchUser",
		     "click #toAddUserUI" : "toAddUserUI"
		},
		regions: {
			searchRegion: "#searchRegion",
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion"
		},
		toAddUserUI:function(){
	       var serverURL = "/"+jcfManager.appName+"/user/getAllRoleList.action" ;
	       $.when(util.dealAjaxRequestWithoutParam(serverURL)).done(function(data){
		   	   if (data.flag=="true"){
			   	  appRouter.navigate("authMgr/userMgr/add");
			   	  var roleList = new Backbone.Collection(data.roleList) ;
	    	   	  jcfManager.contentRegion.show(new UserAddView({collection:roleList})) ;
			   }else{
			   	  util.alertEsg("操作出现异常!") ;
			   }
	       });
	    },
	    searchUser:function(){
	    	var modelName = sidbarUtil.getModuleName() ;
	    	var jsObjParam = {} ;
	    	if(this.queryString.currentPage == undefined){
		    	this.queryString.pageSize = jcfManager.defaultPageSize ;
		    }
	    	this.queryString.currentPage =1 ;
	    	jsObjParam.currentPage = this.queryString.currentPage ;
	    	jsObjParam.pageSize = this.queryString.pageSize ;
	    	var inputLoginId = $.trim($("#loginId").val()) ;
	    	var inputRoleId = $.trim($("#roleId").val()) ; 
	    	
	    	jsObjParam.loginId= inputLoginId;
	    	jsObjParam.roleId=inputRoleId ;
	    	this.queryString.loginId = inputLoginId; 
	    	this.queryString.roleId = inputRoleId;
	    	this.showPageInfo(jsObjParam) ;
	    	appRouter.navigate(modelName+"/userMgr/param/" + QueryString.stringify(this.queryString)) ;
	    },
	    onShow:function(){
	    	var jsObjParam = {} ;
	    	if(this.queryString.currentPage == undefined){
	    		this.queryString.currentPage =1 ;
		    	this.queryString.pageSize =jcfManager.defaultPageSize ;
		    }
	    	jsObjParam.currentPage = this.queryString.currentPage ;
	    	jsObjParam.pageSize = this.queryString.pageSize ;
	    	jsObjParam.loginId = this.queryString.loginId==undefined?"":this.queryString.loginId ;
	    	jsObjParam.roleId = this.queryString.roleId==undefined?"":this.queryString.roleId ;
	    	this.showPageInfo(jsObjParam) ;
	    },
	    showPageInfo:function(jsObjParam){
	    	this.model.set("loginId",jsObjParam.loginId) ;
	    	this.model.set("roleId",jsObjParam.roleId) ;
	    	this.searchRegion.show(new UserSearchItemView({model:this.model})) ;
	    	var self = this ;
	     	var serverURL = '/'+jcfManager.appName+'/user/searchPageUser.action' ;
	    	var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsObjParam) ;
	    	var colleciton = new Backbone.Collection() ;
		    var model = new Backbone.Model() ;
	    	$.when(ajaxing).done(function(data){
				 var pageBean = data.pageBean ;
				 if(data.flag=="true"){
				 	 model.set(pageBean) ;
		    		 model.set("uriSection","userMgr") ;
			    	 colleciton.set(pageBean.recordList) ;
			    	 var listView = new UserListView({collection:colleciton}) ; 
		    		 self.listRegion.show(listView) ;
			    	 var pbview = new PagebarView({model:model,queryString:self.queryString});
		    		 self.pagebarRegion.show(pbview) ;
				 }else{
				 	util.showErrPage() ;
				 }
	    	}) ;
	    }
	});
	return UserMgrLayoutView ;
});