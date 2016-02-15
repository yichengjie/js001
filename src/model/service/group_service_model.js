define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var util = require("../../util/CommonUtil");
	var appName = util.getAppName();
	
	var GroupServiceModel = Backbone.Model.extend({
    	urlRoot: '/' + appName + '/service/getServiceStatus.action',
    	defaults: function(){
			return {
                'selected': false,
                'hasCompensateService': 0
            };
		},
		hasCompensate: function(){
			return this.get('hasCompensateService') == 1;
		},
		isSelected: function(){
            return this.get('selected') == true;
        }
	});
	return GroupServiceModel;
});