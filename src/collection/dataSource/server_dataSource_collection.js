define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var appName = util.getAppName();
	
	var ServerDataSourceModel = require("../../model/dataSource/server_dataSource_model");
	
	var ServerDataSourceCollection = Backbone.Collection.extend({
		
		model:ServerDataSourceModel,
		
		url:'/'+appName+'/dataSource/serverDataSourceList.action',
		
		parse : function(response){
			this.flag = response.flag;
            this.dataSourceList = response.dataSourceList;
			return _.extend(response.dataSourceList);
        },
	});
	return ServerDataSourceCollection;
});
