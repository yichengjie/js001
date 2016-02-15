define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var GroupDataSourceDeployModel = Backbone.Model.extend({
    	urlRoot:"/"+jcfManager.appName+"/dataSource/groupDeployDataSource.action",
    	defaults: {
    		"dataSourceName": "",
    		"URL": "",
    		"userName": "",
    		"password": "",
    		"driverClassName": "",
    	},
    	parse: function(response){
    		this.flag = response.flag;
    		this.message = response.message;
    		return _.extend(response);
    	}
	});
	return GroupDataSourceDeployModel;
})
