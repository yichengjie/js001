/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-5-14
 * Time: 下午03:34:47
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var AlertModel = Backbone.Model.extend({
	  defaults: {
	  	"flag":'false',
	    "msg":  "提示内容"
	  }
	});
	return AlertModel ;
});
