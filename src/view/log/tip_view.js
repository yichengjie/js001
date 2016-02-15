define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var tipViewTemplate = require('../../template/dataSource/tip.tpl');
	
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
        	if (this.type == "delete"){
        		this.model.set("confirmDelete",true);
        	}
        },
        cancel: function(){
        	if (this.type == "delete"){
        		this.model.set("confirmDelete",false);
        	}
        	this.remove();
        }
    });
    return TipView;
});
