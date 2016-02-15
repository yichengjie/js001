define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var util = require("../../util/CommonUtil");
	var appName = util.getAppName();
	
	var ServiceDegradeConfigModel = Backbone.Model.extend({
    	urlRoot: '/' + appName + '/service/serviceDegradeConfig.action',
    	defaults: function(){
			return {
				'degradeServiceName':'',
                'tpsSelected': false,
                'degradeTPU':'',
                'degradeTimeUnit':'1000',
                'queueSelected': false,
                'degradePercent':'',
            };
    	},
    	isTpsSelected: function(){
    		return this.get('tpsSelected');
    	},
    	isQueueSelected: function(){
    		return this.get('queueSelected');
    	},
	});
	return ServiceDegradeConfigModel;
});