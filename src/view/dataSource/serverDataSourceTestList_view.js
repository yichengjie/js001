/**
 * @author sml
 * 
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var util = require("../../util/CommonUtil") ;
	var rowViewTeplateStr = require("../../template/dataSource/serverDataSourceTestItem.tpl") ;
	var tableViewTeplateStr = require("../../template/dataSource/serverDataSourceTestList.tpl") ;
	
	var ServerDataSourceTestItemView = Marionette.ItemView.extend({
		  template: _.template(rowViewTeplateStr),
		  tagName: "tr",
		  events: {
			"click td.TestDSTd a" : "testDSConnection"
		  },
		  testDSConnection:function(e){
			  var $curA = $(e.target);
			  var serverId = $("#hiddenServerId").val();
			  var dsName = $curA.attr("name");
			  var jsonParam = {serverId:serverId,dsName:dsName};
			  var testDSConnectionURL = "/"+jcfManager.appName+"/dataSource/testDSConnection.action" ;
			  var ajaxing = util.dealAjaxRequest4SimpleParam(testDSConnectionURL,jsonParam) ;
			  var self = this ;
			  $.when(ajaxing)
			  .done(function(data){
				  if(data.flag){
					  alert("连接成功");
					  $curA.parent().prev().prev().prev().text("已连接")
				  }else{
					  alert("数据源测试连接失败");
				  }
			  }) ;
}
	});
	
	var ServerDataSourceTestListView = Marionette.CompositeView.extend({
		 tagName:"table",
		 className:"table table-bordered" ,
		 template: _.template(tableViewTeplateStr),
		 childView: ServerDataSourceTestItemView,
		 childViewContainer: "tbody"
	});
	
	return ServerDataSourceTestListView ;

});