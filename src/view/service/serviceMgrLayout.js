define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var layoutTmpStr = require('../../template/service/serviceMgrLayout.tpl');
	var QueryString = require('querystring');
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var Tab4ListLayout = require("./serviceTab4ListLayout") ;
	var Tab4ConfigLayout =require("./serviceTab4ConfigLayout") ;
	var util = require("../../util/CommonUtil") ;
	var authCheck = require("./AuthCheck4Service") ;
	
	var ServiceMgrLayout = Marionette.LayoutView.extend({
		initialize:function(options){
			this.queryString = options.queryString ;
			var authGroupCfgFlag = authCheck.getGroupServiceCfgFlag() ;
			this.model.set("authGroupCfgFlag",authGroupCfgFlag) ;
			this.on("showPageInfo",this.showPageInfo) ;
		},
		events:{
			"click #serviceMgrNav" :"clickNavItem"
		},
		template: _.template(layoutTmpStr),
		regions: {
		   downContentRegion: "#downContentRegion"
		},
		clickNavItem:function(e){
		   e.stopPropagation() ;
		   e.preventDefault() ;
		   var valStr = $(e.target).attr("href") ;
		   var $curLi = $(e.target).parent() ;
		   var $ul = $curLi.parent() ;
		   var modelName = sidbarUtil.getModuleName() ;
		   if(!$curLi.hasClass("active")){
			  $ul.find("li").removeClass("active") ;
			  $curLi.addClass("active") ;
			  this.queryString.selectedPageUI = valStr ;
			  appRouter.navigate(modelName +"/param/" + QueryString.stringify(this.queryString)) ;
			  this.showPageInfo() ;
		   }
		},
		showPageInfo:function(){
			var self = this ;
			var modelName = sidbarUtil.getModuleName() ;
			var selectedPageUI = this.queryString.selectedPageUI ;
			appRouter.navigate(modelName +"/param/" + QueryString.stringify(this.queryString)) ;
			if("serviceListUI"==selectedPageUI){
				var tab4ListLayout = new Tab4ListLayout({queryString:this.queryString}) ;
				this.downContentRegion.show(tab4ListLayout) ;
				tab4ListLayout.trigger("showPageInfo") ;
			}else if ("groupServiceCfgUI"==selectedPageUI){
				//alert("显示组服务配置页面") ;
				var serverURL = "/"+jcfManager.appName+"/service/getGroupNameList.action" ;
				var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
				$.when(ajaxing).done(function(data){
					var model = new Backbone.Model(data) ;
					var tab4ConfigLayout = new Tab4ConfigLayout({model:model}) ;
					self.downContentRegion.show(tab4ConfigLayout) ;
				}) ;
			}
		}
	});
	
	return ServiceMgrLayout ;

});
