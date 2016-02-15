define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var DataSourceWaitViewTemplate = require('../../template/dataSource/dataSourceWait.tpl');
	
    var DataSourceWaitView = Backbone.View.extend({
    	tagName: "div",
    	
    	className: "tip",
    	
        template: _.template(DataSourceWaitViewTemplate),
        
        events: {
        	
	    },
        initialize: function (options) {
        },
        render: function () {
            return this.$el.html(this.template());
        },
        show: function(){
        	this.$el.find("#modal").modal("show");
        },
        remove: function(){
        	this.$el.find("#modal").modal("hide");
        }
    });
    return DataSourceWaitView;
});
