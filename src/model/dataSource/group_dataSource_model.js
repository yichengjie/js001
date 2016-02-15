define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var GroupDataSourceModel = Backbone.Model.extend({
    	urlRoot:"",
    	defaults: function(){
			return {
				'showDataSourceConfig': false,
                'showDataSourceMonitor': false,
                'restart': false,
                'connected': false,
                'confirmRestart': false,
                'confirmUndeploy': false,
				'selected': false
            };
		},
    	isSelected: function(){
            return this.get('selected') == true;
        }
	});
	return GroupDataSourceModel;
});
