define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var DataSourceItemTemplate = require("../../template/dataSource/dataSourceItem.tpl");
	
	var DataSourceItemView = Backbone.View.extend({
		
        template:_.template(DataSourceItemTemplate),
        
        tagName: "div",
        
        className: "dsList",

        events: {
        	
        },

        initialize: function(options){
        	this.model = options.model;
        },

        render: function(){
            return this.$el.html(this.template(this.model.toJSON()));
        },
    });
	return DataSourceItemView;
});