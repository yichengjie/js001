/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-3-31
 * Time: 上午09:34:34
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var GroupAppModel = Backbone.Model.extend({
		defaults: {
			"groupName": "",
			"appId": "",
    		"appName": "",
    		"appVersion": "",
    		"appStatus": "",
    		"serverId": "",
    		"updateDate": "",
    		"status": "",
    		"undeployLinkShow": "",
    		"rollbackLinkShow": "",
    		"isDefaultVersion": "",
    		"prevVersion": ""
		},
		parse: function(response){
			return _.extend(response);
		}
	});
	return GroupAppModel;

});
