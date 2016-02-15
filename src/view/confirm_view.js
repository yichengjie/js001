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
	var Marionette = require("marionette");
	var viewTemplateStr = require('../template/confirm.tpl');
	var ConfirmModel = require("../model/confirm_model") ;
	require("bs-modal")($) ;
	var ConfirmView = Marionette.ItemView.extend({
		initialize:function(){
			this.model = this.model || new ConfirmModel() ;
			this.listenTo(this.model, 'change', this.render);
		},
	  	template: _.template(viewTemplateStr),
		onShow:function(){
			var alr = $('#ycj-confirm') ;
			alr.modal({backdrop:'static'});
			alr.modal('show') ;
		},
		confirm:function(callback){
			var alr = $('#ycj-confirm') ;
			if (callback && callback instanceof Function) {
	           alr.find('.confirmOK').bind("click",function(){callback(true)});
	           alr.find('.confirmCancel').bind("click",function(){callback(false)});
		    }
		}
	});
	return ConfirmView ;
});

