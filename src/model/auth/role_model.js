/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-11-29
 * Time: 下午03:31:47
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var RoleModel = Backbone.Model.extend({
		defaults: function(){
	        return {
	            'id': "",
	            'name': "",
	            'description':""
	        };
    	},
    	urlRoot:""
	}) ;
	return RoleModel ;
});
