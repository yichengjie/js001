define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var globalViewTemplate = require('../../template/context/global.tpl');
	
    var GlobalView = Backbone.View.extend({
    	el : "#global",
    	
        template: _.template(globalViewTemplate),
        
        events: {
        	"click .close-btn": "close"
	    },
        initialize: function (options) {
        	this.model = options.model;
        },
        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },
        close: function(){
        	this.$el.find("div").remove();
        }
    });
    return GlobalView;
});
