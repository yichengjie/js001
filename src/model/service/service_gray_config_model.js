define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var util = require("../../util/CommonUtil");
	var appName = util.getAppName();
	
	var ServiceGrayConfigModel = Backbone.Model.extend({
    	urlRoot: '/' + appName + '/service/serviceGrayConfig.action',
    	defaults: function(){
			return {
                'serviceTrafficSelected': false,
                'serviceHeaderSelected': false,
                'serviceTraffic':'traffic',
                'serviceHeader':'header'
            };
		},
		isServiceTrafficSelected: function(){
            return this.get('serviceTrafficSelected');
        },
        isServiceHeaderSelected: function(){
            return this.get('serviceHeaderSelected');
        }
	});
	return ServiceGrayConfigModel;
});