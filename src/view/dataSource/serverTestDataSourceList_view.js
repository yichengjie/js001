define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	
	var ServerDataSourceCollection = require ("../../collection/dataSource/server_dataSource_collection");
	
	var ServerTestDataSourceListTemplate = require("../../template/dataSource/serverTestDataSourceList.tpl");
	
	var ServerTestDataSourceItemView = require("./serverTestDataSourceItem_view");
	
	var ServerTestDataSourceListView = Backbone.View.extend({
		el : '#content-body',
		
		tagName: "div",
        
        className: "dsTestList",
        
		template: _.template(ServerTestDataSourceListTemplate),
		
		events: {
			
		},
		initialize: function(options){
			this.options = options || {};
			this.serverId = options.queryString.serverId;
			this.dataSourceTestList = this.getDataSources();
			this.dataSourceTestList.bind("reset", this.addAllServerDataSources, this);
		},
		render : function(){
			this.$el.html(this.template());
			return this;
		},
		addServerDataSource: function(dataSource){
			var server_test_dataSource_item_view = new ServerTestDataSourceItemView({model: dataSource, serverId: this.serverId});
			this.$el.find("#dataSourceTestListBody").append(server_test_dataSource_item_view.render());
        },
        addAllServerDataSources: function(){
        	if (this.dataSourceTestList.flag == '1'){
        		this.dataSourceTestList.each(this.addServerDataSource, this);
        	}
        	else if (this.dataSourceTestList.flag == '0'){
        		alert("数据库查询异常");
        	}
        	else if (this.dataSourceTestList.flag == '2'){
        		alert("连接异常，请查看服务器状态");
        	}
        },
		getDataSources: function(){
        	var server_dataSource_collection = new ServerDataSourceCollection();
        	server_dataSource_collection.fetch({data : QueryString.stringify(this.options.queryString), reset: true});
        	return server_dataSource_collection;
        },
	});
	return ServerTestDataSourceListView;
});