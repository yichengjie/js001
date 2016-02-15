define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var ServerDataSourceMonitorTemplate = require("../../template/dataSource/serverDataSourceMonitor.tpl");
	
	var ServerDataSourceMonitorView = Backbone.View.extend({
		
        template:_.template(ServerDataSourceMonitorTemplate),
        
        tagName: "div",
        
        className: "dataSourceMonitor",

        events: {
        	
        },

        initialize: function(options){
        	this.options = options || {};
        	this.model = options.model;
        	this.listenTo(this.model,'change',this.render);
        },

        render: function(){
    		return this.$el.html(this.template(this.model.toJSON()));
        }
    });
	return ServerDataSourceMonitorView;
});