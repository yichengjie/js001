/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-22
 * Time: 下午03:55:13
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../template/sysIndex.tpl');
	
	var SysIndexView = Marionette.ItemView.extend({
		  template: _.template(viewTemplateStr)
	});
	
	return SysIndexView ;

});