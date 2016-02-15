/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-5-14
 * Time: 下午03:29:16
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../template/alert.tpl');
	require("bs-modal")($) ;
	
	
	var AlertModel = require("../model/alert_model") ;
	var AlertView = Marionette.ItemView.extend({
		initialize:function(options){
			var msg = '' ;
			if(options!=null&&options.msg!=null){
				msg = options.msg ;
			}
			this.model = this.model || new AlertModel() ; 
			if(msg.length>0){
				this.model.set("msg",msg) ;
			}
		},
	  	template: _.template(viewTemplateStr),
		onShow:function(){
			var alr = $('#ycj-alert') ;
			alr.modal({backdrop:'static'});
			alr.modal('show') ;
		}
	});
	return AlertView ;
});
