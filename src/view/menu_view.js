define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var menuViewTemplate = require('../template/menu.tpl');
	
    var MenuView = Marionette.ItemView.extend({
        template: _.template(menuViewTemplate),
	    initialize: function () {
			this.listenTo(this.model, 'change', this.render);
        },
        select : function(current){
			this.model.set("current",current) ;
        }
    });
    return MenuView;
});
