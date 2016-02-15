define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var ContainerTemplate = require("../../template/Container.tpl");
	
	var ContainerView = Backbone.View.extend({
		template: _.template(ContainerTemplate),
		
		initialize: function(){
			
		},
		render : function(){
			this.$el.html(this.template());
			return this;
		}
	});
	return ContainerView;
});