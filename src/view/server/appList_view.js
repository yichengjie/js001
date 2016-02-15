/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-29
 * Time: 下午03:48:51
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var itemTemplateStr = require("../../template/server/appItem.tpl") ;
	var listTemplateStr = require('../../template/server/appList.tpl');
	var util = require("../../util/CommonUtil") ;
	
	
	var AppItemView = Backbone.Marionette.ItemView.extend({
		template:_.template(itemTemplateStr) ,
		tagName: "tr"
	});
	
	var AppListView = Backbone.Marionette.CompositeView.extend({
		  initialize:function(){
		  },
		  template: _.template(listTemplateStr) ,
		  childView: AppItemView,
		  childViewContainer: "tbody",
		  events:{
			  "click #addServiceBtn" : "addService"
		  },
		  addService:function(){
			  alert("添加服务被点击") ;
			  var serverURL = "/"+jcfManager.appName+"/server/addService.action" ;
			  var reqing = util.dealAjaxRequestWithoutParam(serverURL) ;
			  $.when(reqing)
			   .done(function(data){
				   //显示服务器列表页面 
				   if(!data.flag){
					 alert("添加服务出错!") ;
				   }
			   });
		  }
		  
	});
	
	return AppListView ;

});
