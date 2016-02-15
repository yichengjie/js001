/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-6-18
 * Time: 下午05:04:19
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../template/errorPage.tpl');
	
	var ErrorPageView = Marionette.ItemView.extend({
		  tagName:'div',
		  className:'row' ,
		  template: _.template(viewTemplateStr) 
	});
	return ErrorPageView;
});
