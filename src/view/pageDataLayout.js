/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-23
 * Time: 下午03:35:38
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var util = require("../util/CommonUtil") ;
	var viewTemplateStr = require("../template/pageDataLayout.tpl") ;
	var PagebarView = require("./pagebar_view") ;
  	var PagebarModel = require("../model/pagebar_model") ;
  	var PageListView = null ;
	
	var ServerListLayout = Marionette.LayoutView.extend({
		  template: _.template(viewTemplateStr),
		  tagName:"div",
		  className:"row",
		  initialize: function(options) {
			this.serverURL = options.serverURL ;
			this.jsObjParam = options.jsObjParam ;
			this.isSimpleParam4Server = options.isSimpleParam4Server ;
			PageListView = options.PageListView ;
		  },
		  regions: {
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion"
		  },
		  showListInfo:function(){//第一显示数据，之后翻页自动条用goToPage函数
			  this.goToPage2(this.jsObjParam) ;
		  },
		  goToPage2:function(jsObjParam){
			 var serverURL = this.serverURL ;
			 var self = this ;
			 var reqServer = null ;
			 if(this.isSimpleParam4Server){
				 var simpleJsonParam = JSON.parse(JSON.stringify(this.jsObjParam)) ;
				 reqServer = util.dealAjaxRequest4SimpleParam(serverURL,simpleJsonParam) ;
			 }else{
				 reqServer = util.dealAjaxRequest4JSObj(serverURL,jsObjParam) ;
			 }
	    	 $.when(reqServer).done(function(data){
	    		var collection = new Backbone.Collection();
	    		collection.set(data.recordList) ;
	    		self.listRegion.show(new PageListView({collection:collection})) ;
	    		var pagebarModel = new PagebarModel(data);
	    		pagebarModel.unset("recordList");
	    		self.pagebarRegion.show(new PagebarView({model:pagebarModel,parentView:self})) ;
	    	 });
		  },
		  goToPage:function(qpData){
		      $.extend(this.jsObjParam,qpData);
		      this.goToPage2(this.jsObjParam) ;
		  },
		  render:function(){
			  this.$el.html(this.template);
			  return this;
		  },
		  onShow:function(){
			  this.showListInfo();
		  }
	});
	return ServerListLayout ;

});
