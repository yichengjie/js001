define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var ContainerTemplate = require("../template/container.tpl");
	
	var ContainerView = Backbone.View.extend({
		el: "#indexContantRegion",
		
		template: _.template(ContainerTemplate),
		
		initialize: function(){
			this.render();
		},
		render : function(){
			this.$el.html(this.template());
			return this;
		}
	});
	return ContainerView;
});