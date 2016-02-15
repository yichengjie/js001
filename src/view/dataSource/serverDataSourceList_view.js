define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	
	var ServerDataSourceCollection = require ("../../collection/dataSource/server_dataSource_collection");
	
	var ServerDataSourceListTemplate = require("../../template/dataSource/serverDataSourceList.tpl");
	
	var ServerDataSourceItemView = require("./serverDataSourceItem_view");
	
	var ServerDataSourceListView = Backbone.View.extend({
		el : '#content-body',
		
		template: _.template(ServerDataSourceListTemplate),
		
		events: {
			
		},
		initialize: function(options){
			this.options = options || {};
			this.serverId = options.queryString.serverId;
			this.dataSourceList = this.getDataSources();
			this.dataSourceList.bind('change:restart', this.restartDataSource, this);
			this.dataSourceList.bind('change:uninstall', this.uninstallDataSource, this);
            this.dataSourceList.bind('reset', this.addAllServerDataSources, this);
            this.dataSourceList.bind('remove', this.addAllServerDataSources, this);
            this.views =[];
		},
		render : function(){
			$(this.el).html(this.template());
			return this;
		},
		addServerDataSource: function(dataSource){
			var server_dataSource_item_view = new ServerDataSourceItemView({model: dataSource, serverId: this.serverId});
			this.$el.find("#dataSourceListBody").append(server_dataSource_item_view.render());
			this.views.push(server_dataSource_item_view);
        },
        addAllServerDataSources: function(){
        	if (this.dataSourceList.flag == '1'){
        		if (this.dataSourceList.length > 0){
        			var _this = this;
            		//遍历views数组，并对每个view调用Backbone的remove
            		_.each(this.views,function(view){
            			view.remove().off();
            		});
            		//清空views数组，此时旧的view就变成没有任何被引用的不可达对象了
            		//垃圾回收器会回收它们
            		this.views =[];
            		this.dataSourceList.each(function(model){
            			_this.addServerDataSource(model);
            		});
        		}
        		else{
        			alert("当前服务器没有部署数据源");
        		}
        	}
        	else if (this.dataSourceList.flag == '0'){
        		alert("数据库查询异常");
        	}
        	else if (this.dataSourceList.flag == '2'){
        		alert("连接异常，请查看服务器状态");
        	}
        },
        getDataSources: function(){
        	var server_dataSource_collection = new ServerDataSourceCollection();
        	server_dataSource_collection.fetch({data : QueryString.stringify(this.options.queryString), reset: true});
        	return server_dataSource_collection;
        },
        uninstallDataSource: function(model){
        	this.render();
        	this.dataSourceList.remove(model);
        },
        restartDataSource: function(model){
        	this.render();
        	this.dataSourceList.fetch({data : QueryString.stringify(this.options.queryString), reset: true});
        }
	});
	return ServerDataSourceListView;
});