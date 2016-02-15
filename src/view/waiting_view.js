/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-5-27
 * Time: 上午10:28:01
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	require("bs-modal")($) ;
	var viewTemplateStr = require('../template/waiting.tpl');
	
	var WaitingView = Marionette.ItemView.extend({
		initialize:function(){
			
		},
	  	template: _.template(viewTemplateStr),
		onShow:function(){
			var alr = $('#ycj-waiting') ;
			alr.modal({backdrop:'static'});
			alr.modal('show') ;
		}
	});
	return WaitingView ;	
});

