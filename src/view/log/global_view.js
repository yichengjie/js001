define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var globalViewTemplate = require('../../template/log/global.tpl');
	
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
        	$("#groupAppName").parent().addClass("move");
            this.$el.html(this.template(this.model));
            return this;
        },
        close: function(){
        	$("#groupAppName").parent().removeClass("move");
        	this.$el.find("div").remove();
        }
    });
    return GlobalView;
});
