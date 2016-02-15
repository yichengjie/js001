/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-5-13
 * Time: 下午02:59:55
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var GlobalModel = Backbone.Model.extend({
		defaults: {
			"flag":"true",
	    	"msg":  "提示内容"
	  	}
	}) ;
	return GlobalModel ;
});