define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	
	var GroupDataSourceListHeadTemplate = require("../../template/dataSource/groupDataSourceListHead.tpl");
	
	var GroupDataSourceListView = Backbone.View.extend({
		el : '#content-header',
		
		template: _.template(GroupDataSourceListHeadTemplate),
		
		events: {
			
		},
		initialize: function(options){
			this.options = options || {};
			this.groupId = options.queryString.groupId;
			this.dataSourceList = options.collection;
			this.dataSourceList.bind('change:selected', this.addOptions, this);
		},
		render : function(){
			this.$el.html(this.template());
			return this;
		}
	});
	return GroupDataSourceListView;
});