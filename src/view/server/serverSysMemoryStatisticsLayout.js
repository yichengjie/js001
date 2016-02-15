/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-8
 * Time: 下午04:18:46
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var itemViewTemplateStr = require("../../template/server/serverSysMemoryStatisticsItem.tpl") ;
	var tableViewTemplateStr = require('../../template/server/serverSysMemoryStatisticsList.tpl');
	var viewTemplateStr = require('../../template/server/serverSysMemoryStatisticsLayout.tpl');
	var baseInfoTmpStr = require('../../template/server/serverSysMemoryStatisticsBaseInfo.tpl');
	var util = require("../../util/CommonUtil") ;
	var AlertView = require("../alert_view") ;
	
	var BaseInfoView = Marionette.ItemView.extend({
		  tagName: "table",
		  className:"table",
		  template: _.template(baseInfoTmpStr)
	});
	
	var RowView = Marionette.ItemView.extend({
		  tagName: "tr",
		  template: _.template(itemViewTemplateStr)
	});
	
	var ListView = Marionette.CompositeView.extend({
		  template: _.template(tableViewTemplateStr),
		  childView: RowView,
		  childViewContainer: "tbody"
	});
	
	var ServerSysMemoryStatisticsLayout = Marionette.LayoutView.extend({
		template: _.template(viewTemplateStr),
		initialize:function(options){
		   this.queryString = options.queryString ;
		   this.on("showPageInfo",this.showPageInfo) ;
		},
		regions: {
			baseInfoRegion:"#baseInfoRegion",
			downContentRegion: "#downContentRegion"
		},
		events:{
			"click #backBtn": "toBackPage"
			
		},
		showPageInfo:function(){
		   var serverId = this.queryString.serverId ;
		   var serverURL = "/"+jcfManager.appName+"/server/monitorSystemMemory.action" ;
		   var jsonParam = {"serverId":serverId} ;
		   var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
		   var self = this ;
		   $.when(ajaxing).done(function(data){
			   if(data.flag=="true"){
				   var baseModel = new Backbone.Model(data.baseInfo) ;
				   var baesInfoView = new BaseInfoView({model:baseModel}) ;
				   self.baseInfoRegion.show(baesInfoView) ;
				   var collection = new Backbone.Collection(data.detailInfo) ;
				   self.downContentRegion.show(new ListView({collection:collection})) ;
			   }else{
			   	   var av = new AlertView({msg:data.errInfo}) ;
				   jcfManager.dialogRegion.show(av) ;
				   window.history.back() ;
			   }
		   });
		},
		toBackPage:function(){
			window.history.back() ;
		}
	});
	
	return ServerSysMemoryStatisticsLayout ;
});
