/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-28
 * Time: 下午07:28:38
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var layoutTmpStr = require('../../template/pageDataLayout.tpl');
	
	var itemTmpStr = require("../../template/service/serviceItem.tpl") ;
	var listTmpStr = require("../../template/service/serviceList.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	
	
	//列表每一项视图
	var ItemView = Marionette.ItemView.extend({
		 tagName:"tr",
		 template: _.template(itemTmpStr)
	});
	//列表视图
	var ListView =  Marionette.CompositeView.extend({
		initialize:function(){
		},
		tagName:"table",
		className:"table table-bordered list",
	    template: _.template(listTmpStr),
		childView: ItemView,
		childViewContainer: "tbody"
	});
	
	
	var ServiceTab4ListLayout = Marionette.LayoutView.extend({
		initialize:function(options){
			this.queryString = options.queryString ;
			this.on("showPageInfo",this.showPageInfo) ;
		},
		template: _.template(layoutTmpStr),
		regions: {
			listRegion: "#listRegion",
			pagebarRegion:"#pagebarRegion"
		},
		showPageInfo:function(){
			var self = this;
			//查询数据显示列表
			var serverURL = "/"+jcfManager.appName+"/service/searchAllService.action" ;
			var jsonParam = {"currentPage":this.queryString.currentPage ,"pageSize":this.queryString.pageSize} ;
			var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			$.when(ajaxing).done(function(data){
				var collection = new Backbone.Collection(data.recordList) ;
				var listView = new ListView({collection:collection}) ;
				self.listRegion.show(listView) ;
				var model = new Backbone.Model(data) ;
				var pbView = new PagebarView({model:model,queryString:self.queryString}) ;
				self.pagebarRegion.show(pbView) ;
			}) ;
			
		}
		
	}) ;
	
	return ServiceTab4ListLayout ;
	
});
