define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var tipViewTemplate = require('../../template/context/tip.tpl');
	
	var flag = "";
	
    var TipView = Backbone.View.extend({
    	tagName: "div",
    	
    	className: "tip",
    	
        template: _.template(tipViewTemplate),
        
        events: {
        	"click .modal-footer .ok": "confirm",
        	"click .modal-footer .cancel": "cancel"
	    },
        initialize: function (options) {
        	this.options = options || {};
        	this.headerMessage = options.headerMessage;
        	this.bodyMessage = options.bodyMessage;
        	this.model = options.model;
        	this.type = options.type;
        },
        render: function () {
            return this.$el.html(this.template({"headerMessage": this.headerMessage,"bodyMessage":this.bodyMessage}));
        },
        show: function(){
        	this.$el.find(".modal").fadeIn();
        },
        remove: function(){
        	this.$el.find(".modal").fadeOut();
        	this.$el.find(".modal").remove();
        	this.$el.find(".modal-backdrop").remove();
        },
        confirm: function(){
        	if (this.type == "restart"){
        		this.model.set("confirmRestart",true);
        	}
        	else{
        		this.model.set("confirmUndeploy",true);
        	}
        },
        cancel: function(){
        	if (this.type == "restart"){
        		this.model.set("confirmRestart",false);
        	}
        	else{
        		this.model.set("confirmUndeploy",false);
        	}
        	this.remove();
        }
    });
    return TipView;
});
