define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	require("bs-alert")($) ;
	var globalViewTemplate = require('../template/itemTip.tpl');
	var ItemTipModel = require("../model/itemTip_model") ;	
    var ItemTipView = Marionette.ItemView.extend({
		initialize:function(options){
			var msg = '' ;
			if(options!=null&&options.msg!=null){
				msg = options.msg ;
			}
			this.model = this.model || new ItemTipModel() ;
			if(msg.length>0){
				this.model.set("msg",msg) ;
			}
		},
        template: _.template(globalViewTemplate)
    });
    return ItemTipView;
});
