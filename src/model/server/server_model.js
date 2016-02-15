/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-19
 * Time: 下午02:48:50
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var ServerModel = Backbone.Model.extend({
    	urlRoot:""
	}) ;
	return ServerModel ;
})
