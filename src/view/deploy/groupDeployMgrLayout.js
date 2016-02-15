/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-16
 * Time: 下午05:37:52
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/deploy/groupDeployMgrLayout.tpl');
	
	var QueryString = require('querystring');
	var AppMgrTabLayout = require("./groupDeployTabAppMgr") ;
	var CreateNewDeployTabLayout = require("./groupDeployTabCreateNewDeploy") ;
	var ServerDeployInfoTabLayout = require("./groupDeployTabServerDeployInfo") ;
	var util = require("../../util/CommonUtil") ;
	var authCheck = require("./AuthCheck4DeployUtil") ;
	
	
	var GroupDeployMgrLayout =  Marionette.LayoutView.extend({
		initialize:function(options){
			this.queryString = options.queryString ;
			var createNewDeployAuthFlag = authCheck.getCreateNewDeployFlag() ;
			this.model.set("createNewDeployAuthFlag",createNewDeployAuthFlag) ;
			
			this.on("queryAndShowPageInfo",this.queryAndShowPageInfo) ;
		},
		template:_.template(viewTemplateStr),
		regions: {
			downContentRegion: "#downContentRegion"
		},
		events:{
		   "click #groupDeployMgrNav li a" : "clickNavItem"
		},
		clickNavItem:function(e){
			e.stopPropagation() ;
			e.preventDefault() ;
			var valStr = $(e.target).attr("href") ;
			var $curLi = $(e.target).parent() ;
			var $ul = $curLi.parent() ;
			if(!$curLi.hasClass("active")){
				  $ul.find("li").removeClass("active") ;
				  $curLi.addClass("active") ;
				  this.queryString.selectedPageUI = valStr ;
				  this.queryString.currentPage = "1" ;
				  appRouter.navigate("deployMgr/group/param/"+QueryString.stringify(this.queryString)) ;
				  this.queryAndShowPageInfo() ;
			 }
		},
		queryAndShowPageInfo:function(){
			var selectItem = this.queryString.selectedPageUI ;
			var self = this  ;
			if(selectItem==undefined){
				selectItem = "showAllAppUI" ;
				this.queryString.selectedPageUI = selectItem;
			}
			if("showAllAppUI"==selectItem){//应用管理
				var status = this.queryString.status ;
				if(status==undefined||status==null||status==""){
					this.queryString.status = "0" ;
				}
				var groupId = this.queryString.groupId ;
				var model = new Backbone.Model({"status":this.queryString.status,"groupId":groupId}) ;
				var appMgrTabLayout = new AppMgrTabLayout({model:model,queryString:this.queryString}) ;
				this.downContentRegion.show(appMgrTabLayout) ;
				appMgrTabLayout.trigger("searchListInfo") ;
			}else if ("createNewDeployUI"==selectItem){//新建部署
				var serverUrl = "/"+jcfManager.appName+"/deployMgr/toCreateNewDeployUI.action" ;
				var ajaxing = util.dealAjaxRequestWithoutParam(serverUrl) ;
				$.when(ajaxing).done(function(data){
					var model = new Backbone.Model(data) ;
					var createNewDeployTabLayout  = new CreateNewDeployTabLayout ({model:model,queryString:self.queryString}) ;
					self.downContentRegion.show(createNewDeployTabLayout) ;
					createNewDeployTabLayout.trigger("searchListInfo") ;
				}) ;
			}else if ("showServerDeployInfoUI"==selectItem){//服务器部署情况
				var serverDeployInfoTabLayout = new ServerDeployInfoTabLayout({queryString:this.queryString}) ;
				this.downContentRegion.show(serverDeployInfoTabLayout) ;
				serverDeployInfoTabLayout.trigger("searchListInfo") ;
			}
		}
		
	}) ;
	
	return GroupDeployMgrLayout ;
});
