define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var appName = util.getAppName();
	
	var LogAppNameModel = require("../../model/log/log_app_name_model");
	
	var LogAppNameCollection = Backbone.Collection.extend({
		
		model:LogAppNameModel,
		
		url:'/'+appName+'/log/toAddAppLogUI.action',
		
		parse : function(response){
			this.flag = response.flag;
			this.appNameList = response.appNameList;
			return _.extend(response.appNameList);
        },
        refresh: function(params){
        	this.fetch(params);
        }
	});
	return LogAppNameCollection;
});
