define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	
	var util = require("../../util/CommonUtil");
	
	var DataSourceListTemplate = require("../../template/dataSource/dataSourceList.tpl");
	
	var DataSourceItemView = require("./dataSourceItem_view");
	
	var DataSourceListView = Backbone.View.extend({
		el : '#content-body',
		
		template: _.template(DataSourceListTemplate),
		
		events: {
			
		},
		initialize: function(options){
			this.options = options || {};
			var searchGroupDataSourceListURL = "/"+jcfManager.appName+"/dataSource/getAllDataSource.action";
			util.dealAjaxRequestWithoutParam(searchGroupDataSourceListURL);
			this.dataSourceList = options.collection;
            this.dataSourceList.bind('reset', this.addAllDataSources, this);
            this.views =[];
		},
		render : function(){
			$(this.el).html(this.template());
			return this;
		},
		addDataSource: function(dataSource){
			var dataSource_item_view = new DataSourceItemView({model: dataSource});
			this.$el.find("#dataSourceListBody").append(dataSource_item_view.render());
			this.views.push(dataSource_item_view);
        },
        addAllDataSources: function(){
        	var _this = this;
    		//遍历views数组，并对每个view调用Backbone的remove
    		_.each(this.views,function(view){
    			view.remove().off();
    		});
    		//清空views数组，此时旧的view就变成没有任何被引用的不可达对象了
    		//垃圾回收器会回收它们
    		this.views =[];
    		this.dataSourceList.each(function(model){
    			_this.addDataSource(model);
    		});
        },
        refresh: function(data){
        	this.dataSourceList.refresh(data);
        }
	});
	return DataSourceListView;
});