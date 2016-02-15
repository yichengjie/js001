define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var LogModel = Backbone.Model.extend({
    	urlRoot:"",
    	defaults:{
    		confirmDelete: false
    	}
	});
	return LogModel;
});
