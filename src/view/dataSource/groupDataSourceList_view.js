define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	
	var util = require("../../util/CommonUtil");
	
	var GroupDataSourceListTemplate = require("../../template/dataSource/groupDataSourceList.tpl");
	
	var GroupDataSourceItemView = require("./groupDataSourceItem_view");
	var authCheck = require("../../util/DataSourceAuthCheckUtil") ;
	
	var GroupDataSourceListView = Backbone.View.extend({
		el : '#content-body',
		
		template: _.template(GroupDataSourceListTemplate),
		
		events: {
			"click #allSelected": "toggleSelectAll"
		},
		initialize: function(options){
			this.options = options || {};
			this.groupId = options.queryString.groupId;
			var jsonParam = {groupId:this.groupId};
			var searchGroupDataSourceListURL = "/"+jcfManager.appName+"/dataSource/getGroupDataSource.action";
			util.dealAjaxRequest4SimpleParam(searchGroupDataSourceListURL,jsonParam);
			this.dataSourceList = options.collection;
			this.dataSourceList.bind('change:restart', this.restartDataSource, this);
			this.dataSourceList.bind('change:uninstall', this.uninstallDataSource, this);
            this.dataSourceList.bind('reset', this.addAllGroupDataSources, this);
            this.dataSourceList.bind('remove', this.addAllGroupDataSources, this);
            this.dataSourceList.bind('change:selected', this.isSelectAll, this);
            this.views =[];
		},
		render : function(){
			$(this.el).html(this.template());
			return this;
		},
		addGroupDataSource: function(dataSource){
			var groupUninstallAuthFlag = authCheck.getServerDataSourceUninstallAuth() ;
			var groupRestartAuthFlag = authCheck.getServerDataSourceRestartAuth() ;
			dataSource.set({"groupUninstallAuthFlag":groupUninstallAuthFlag,"groupRestartAuthFlag":groupRestartAuthFlag}) ;
			var group_dataSource_item_view = new GroupDataSourceItemView({model: dataSource, groupId: this.groupId});
			this.$el.find("#dataSourceListBody").append(group_dataSource_item_view.render());
			this.views.push(group_dataSource_item_view);
        },
        addAllGroupDataSources: function(){
        	var _this = this;
    		//遍历views数组，并对每个view调用Backbone的remove
    		_.each(this.views,function(view){
    			view.remove().off();
    		});
    		//清空views数组，此时旧的view就变成没有任何被引用的不可达对象了
    		//垃圾回收器会回收它们
    		this.views =[];
    		this.dataSourceList.each(function(model){
    			_this.addGroupDataSource(model);
    		});
        },
        toggleSelectAll:function(){
        	var self = this;
            if(self.dataSourceList.isAllSelected()){
            	this.dataSourceList.clearSelectAll();
            }
            else{
            	this.dataSourceList.selectAll();
            }
        },
        isSelectAll:function(){
        	var self = this;
        	if(self.dataSourceList.isAllSelected()){
        		this.$el.find("#allSelected").prop("checked", true);
            }
            else{
            	this.$el.find("#allSelected").removeAttr("checked");
            }
        },
        uninstallDataSource: function(model){
        	this.render();
        	this.refresh(QueryString.stringify(this.options.queryString));
        },
        restartDataSource: function(model){
        	this.render();
        	this.refresh(QueryString.stringify(this.options.queryString));
        },
        refresh: function(data){
        	this.dataSourceList.refresh(data);
        }
	});
	return GroupDataSourceListView;
});