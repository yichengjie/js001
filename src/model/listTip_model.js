/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-29
 * Time: 下午03:53:20
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var ListTipModel = Backbone.Model.extend({
		defaults: function(){
	        return {
	            'succList': [],
	            'errList':[]
	        };
    	},
    	urlRoot:""
	}) ;
	return ListTipModel ;
});