define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var GroupDataSourceNameModel = Backbone.Model.extend({
    	urlRoot:"",
    	defaults: function(){
    		return {
    			'dataSourceName': ""
    		}
    	}
	});
	return GroupDataSourceNameModel;
})
