define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var DataSourceModel = Backbone.Model.extend({
    	urlRoot:"",
	});
	return DataSourceModel;
});
