define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var LogAppNameModel = Backbone.Model.extend({
    	urlRoot:"",
    	defaults: function(){
    		return {
    			'appName': ""
    		}
    	}
	});
	return LogAppNameModel;
})