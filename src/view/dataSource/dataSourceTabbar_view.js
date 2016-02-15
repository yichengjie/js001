define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var serverDataSourceTabbarViewTemplate = require('../../template/dataSource/dataSourceTabbar.tpl');
	
    var ServerDataSourceTabbarView = Backbone.View.extend({
    	el : "#tabbar",
    	
        template: _.template(serverDataSourceTabbarViewTemplate),
        
        events: {
        	
	    },
        initialize: function (options) {
        	this.options = options || {};
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return ServerDataSourceTabbarView;
});
