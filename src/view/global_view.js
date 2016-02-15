define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	require("bs-alert")($) ;
	var globalViewTemplate = require('../template/global.tpl');
	var GolbalModel = require("../model/global_model") ;	
    var GlobalView = Marionette.ItemView.extend({
		initialize:function(){
			this.model = this.model || new GolbalModel() ;
		},
        template: _.template(globalViewTemplate)
    });
    return GlobalView;
});
