define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	var appName = util.getAppName();
	
	var DataSourceModel = require("../../model/dataSource/dataSource_model");
	
	var DataSourceCollection = Backbone.Collection.extend({
		
		model:DataSourceModel,
		
		url:'/'+appName+'/dataSource/getAlldataSourceList.action',
		
		parse : function(response){
			return _.extend(response);
        }
	});
	return DataSourceCollection;
});
