define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var ServerDataSourceModel = Backbone.Model.extend({
    	urlRoot:"",
    	defaults: function(){
			return {
                'showDataSourceConfig': false,
                'showDataSourceMonitor': false,
                'restart': false,
                'connected': false,
                'confirmRestart': false,
                'confirmUndeploy': false
            };
		},
		isShowConfig: function(){
			return this.get('showDataSourceConfig') == true;
		},
		isShowMonitor: function(){
            return this.get('showDataSourceMonitor') == true;
        },
		isConnected: function(){
			return this.get('connected') == true;
		}
	});
	return ServerDataSourceModel;
})
