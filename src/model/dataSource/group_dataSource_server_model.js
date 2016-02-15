define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var GroupDataSourceServerModel = Backbone.Model.extend({
    	urlRoot:"",
    	defaults: function(){
			return {
                'selected': false,
            };
		},
    	isSelected: function(){
            return this.get('selected') == true;
        }
	});
	return GroupDataSourceServerModel;
});
