define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var GroupDataSourceConfigModel = Backbone.Model.extend({
    	urlRoot:"/"+jcfManager.appName+"/dataSource/groupDataSourceConfig.action",
    	defaults:{
    		"serverName":"",
    		"dataSourceName": "",
    		"URL": "",
    		"userName": "",
    		"password": "",
    		"driverClassName": "",
    		"maxActive": 0,
    		"maxWait": 0,
    		"maxIdle": 0,
    		"minIdle": 0,
    		"initialSize": 0,
    		"passwordChanged": false,
    	},
    	parse: function(response){
    		this.flag = response.flag;
    		this.configData = response.configData;
    		return _.extend(response.configData);
    	}
	});
	return GroupDataSourceConfigModel;
})