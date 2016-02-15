define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	var appName = util.getAppName();
	
	var LogModel = require("../../model/log/log_model");
	
	var logCollection = Backbone.Collection.extend({
		
		model:LogModel,
		
		url:'/'+appName+'/log/getAllAppLogFile.action',
		
		parse : function(response){
			return _.extend(response);
        },
        refresh: function(){
        	this.fetch({reset: true});
        }
	});
	return logCollection;
});
