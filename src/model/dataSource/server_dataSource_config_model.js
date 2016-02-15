define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var ServerDataSourceConfigModel = Backbone.Model.extend({
    	urlRoot:"/"+jcfManager.appName+"/dataSource/serverDataSourceConfig.action",
    	defaults:{
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
	return ServerDataSourceConfigModel;
})