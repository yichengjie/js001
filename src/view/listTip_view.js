define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	require("bs-alert")($) ;
	var listTipTpl = require('../template/listTip.tpl');
	
    var ListTipView = Marionette.ItemView.extend({
        template: _.template(listTipTpl)
    });
    return ListTipView;
});
