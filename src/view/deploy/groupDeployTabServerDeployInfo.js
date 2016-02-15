/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-20
 * Time: 下午01:19:08
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var itemTmpStr = require("../../template/deploy/groupDeployServerDeployItem.tpl") ;
	var listTmpStr = require("../../template/deploy/groupDeployServerDeployList.tpl") ;
	var layoutTmpStr = require("../../template/deploy/groupDeployTabServerDeployInfo.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var QueryString = require('querystring');
	var sidbarUtil = require("../../util/SidebarUtil") ;
	
	
	var ItemView = Marionette.ItemView.extend({
		template:_.template(itemTmpStr) ,
		tagName: "tr" ,
		events:{
			"click .serverAppInfoTd a" : "serverAppInfo"
		},
		serverAppInfo:function(e){
			e.preventDefault() ;
			var serverId = this.model.get("serverId") ;
			var jString = {"serverId":serverId} ;
			var modelName = sidbarUtil.getModuleName() ;
			appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
		}
	});
	
	var ListView = Marionette.CompositeView.extend({
		  initialize:function(){
		  },
		  template: _.template(listTmpStr) ,
		  childView: ItemView,
		  childViewContainer: "tbody"
	});
	
	
	//部署管理
	//---群组管理
	//------服务器部署情况	
	var ServerDeployInfoTabLayout = Marionette.LayoutView.extend({
		template: _.template(layoutTmpStr),
		initialize:function(options){
		     this.queryString = options.queryString ;
		     this.on("searchListInfo",this.searchListInfo) ;
		},
		regions: {
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion"
	    },
	    searchListInfo:function(){
	    	var self = this ;
			var serverURL = "/"+jcfManager.appName+"/server/searchGroupPageServer.action" ;
			var jsonParam = {"groupId":this.queryString.groupId,"currentPage":this.queryString.currentPage,"pageSize":this.queryString.pageSize} ;
			var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			$.when(ajaxing).done(function(data){
				var pageBean = data.pageBean ;
				var model = new Backbone.Model(pageBean) ;
				var collection = new Backbone.Collection(pageBean.recordList) ;
				//显示列表区
				var listView = new ListView({collection:collection}) ;
				self.listRegion.show(listView) ;
				//显示分页栏区
				model.set("uriSection","group") ;
				var ttt = model.get("recordCount") ;
				
				var pb = new PagebarView({model:model,queryString:self.queryString}) ;
				self.pagebarRegion.show(pb) ;
			}) ;
	    }
	});
	
	return ServerDeployInfoTabLayout ;

});
