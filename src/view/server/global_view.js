define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	require("bs-alert")($) ;
	var globalViewTemplate = require('../../template/server/global.tpl');
	
    var GlobalView = Marionette.ItemView.extend({
        template: _.template(globalViewTemplate)
    });
    return GlobalView;
});
