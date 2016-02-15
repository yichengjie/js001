define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var GroupDeployDataSourceServerItemTemplate = require("../../template/dataSource/groupDataSourceServerItem.tpl");
	
	var allSelectedItems = [];
	
	var GroupDeployDataSourceServerItemView = Backbone.View.extend({
		
		template: _.template(GroupDeployDataSourceServerItemTemplate),
		
		tagName: "tr",
		
		events: {
			"click .select": "toggleSelect",
		},
		initialize: function(options){
			this.options = options || {};
			this.model = options.model;
			this.model.bind('change:selected', this.modelChange, this);
		},
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));;
		},
		toggleSelect: function(e){
            var self = this;
            self.model.set('selected', !self.model.get('selected'));
        },
        modelChange: function(){
            var self = this;
            if (self.model.hasChanged('selected')){
                self.$el.toggleClass('active', self.model.isSelected());
                if (self.model.isSelected()){
                	self.$('.select').prop('checked', self.model.isSelected());
                }
                else{
                	self.$('.select').removeAttr('checked');
                }
                var serverId = self.model.get('serverId');
                var index = allSelectedItems.indexOf(serverId);
                if (self.model.isSelected() && index < 0){
                	allSelectedItems.push(serverId);
                }
                if (!self.model.isSelected() && index >= 0){
                	allSelectedItems.splice(index, 1);
                }
            }
        }
	});
	return GroupDeployDataSourceServerItemView;
});