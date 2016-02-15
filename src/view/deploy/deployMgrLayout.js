/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-13
 * Time: 下午05:21:10
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var layoutTmpStr = require('../../template/deploy/deployMgrLayout.tpl');
	var DeployListView = require("./deployList_view") ;
	var util = require("../../util/CommonUtil") ;
	
	var authUtil = require("./AuthCheck4DeployUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	
	
	var DeployMgrLayout = Marionette.LayoutView.extend({
		initialize:function(option){
			this.queryString = option.queryString ;
			var uploadAppAuthFlag = authUtil.getUploadAppFlag() ;
			this.model.set("uploadAppAuthFlag",uploadAppAuthFlag) ;
			this.on("showAllAppUI",this.to_showAllAppUI) ;
			this.on("updateAppUI",this.to_updateAppUI) ;
		},
		template:_.template(layoutTmpStr),
		tagName:"div",
		regions: {
			downContentRegion: "#downContentRegion",
			pagebarRegion: "#pagebarRegion"
		},
		events:{
			"click #deployMgrNav li a" :"clickNavItem"
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
				if("showAllAppUI"==valStr){//查看应用部署页面
					this.queryString.selectedPageUI="showAllAppUI" ;
					this.queryString.currentPage = "1" ;
					this.queryString.changePageFlag = "" ;
					appRouter.navigate("deployMgr/param/selectedPageUI=showAllAppUI") ;
					this.to_showAllAppUI() ;
				}else if("updateAppUI"==valStr){//上传应用页面
					this.queryString.selectedPageUI="updateAppUI" ;
					this.queryString.currentPage = "1" ;
					this.queryString.changePageFlag = "" ;
					appRouter.navigate("deployMgr/param/selectedPageUI=updateAppUI") ;
					this.to_updateAppUI() ;
				}
			}
		},
	    onShow:function(){//初始化页面
			var selectedUI = this.queryString.selectedPageUI ;
	    	this.trigger(""+selectedUI) ;
	    },
	    to_updateAppUI:function(){
	    	var DeployUploadLayout = require("./deployUploadLayout") ;
	    	var deployUploadLayout = new DeployUploadLayout({queryString:this.queryString})
			this.pagebarRegion.empty() ;
			this.downContentRegion.show(deployUploadLayout) ;
	    	deployUploadLayout.trigger("showPageInfo") ;
	    },
	    to_showAllAppUI:function(){
			var currentPage = this.queryString.currentPage ;
			var pageSize = this.queryString.pageSize ;
			if(currentPage==undefined){
				this.queryString.currentPage = "1" ;
				currentPage = 1 ;
				this.queryString.pageSize = jcfManager.defaultPageSize ;
				pageSize = jcfManager.defaultPageSize ;
			}
	    	var collection = new Backbone.Collection();
	    	var listView = new DeployListView({collection:collection}) ;
	    	this.downContentRegion.show(listView) ;
			var jsonParam = {"currentPage":currentPage,"pageSize":pageSize} ;
	    	var serverURL = "/"+jcfManager.appName+"/deployMgr/searchAllAppInfo.action" ;
	    	var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			var self = this ;
	    	$.when(ajaxing).done(function(data){
				if(data.flag=="true"){
					collection.set(data.pageBean.recordList) ;
					var pbModel = new Backbone.Model(data.pageBean) ;
					var pbview = new PagebarView({model:pbModel,queryString:self.queryString}) ;
	    			self.pagebarRegion.show(pbview) ;	
				}else{
					alert("查询出错!") ;
				}
	    	}) ;
	    }
	});
	
	return DeployMgrLayout ;

});
