define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var GroupDataSourceServerCollection = require ("../../collection/dataSource/group_dataSource_server_collection");
	
	var GroupDeployDataSourceTemplate = require("../../template/dataSource/groupDataSourceServerList.tpl");
	
	var GroupDataSourceServerItemView = require("./groupDataSourceServerItem_view");
	
	var GroupDeployDataSourceView = Backbone.View.extend({
		el : '#groupDataSourceServerList',
		
		template: _.template(GroupDeployDataSourceTemplate),
		
		events: {
			"click #allSelected": "toggleSelectAll"
		},
		initialize: function(options){
			this.options = options || {};
			this.groupId = options.groupId;
			this.serverList = options.collection;
			this.serverList.bind('reset', this.addAllGroupServers, this);
			this.serverList.bind('change:selected', this.isSelectAll, this);
		},
		render : function(){
			this.$el.html(this.template());
			return this;
		},
		addGroupServer: function(server){
			var group_dataSource_server_item_view = new GroupDataSourceServerItemView({model: server, groupId: this.groupId});
			this.$el.find("tbody").append(group_dataSource_server_item_view.render());
			this.views.push(group_dataSource_server_item_view);
		},
		addAllGroupServers: function(){
			var _this = this;
    		//遍历views数组，并对每个view调用Backbone的remove
    		_.each(this.views,function(view){
    			view.remove().off();
    		});
    		//清空views数组，此时旧的view就变成没有任何被引用的不可达对象了
    		//垃圾回收器会回收它们
    		this.views =[];
    		this.serverList.each(function(model){
    			_this.addGroupServer(model);
    		});
		},
		toggleSelectAll:function(){
        	var self = this;
            if(self.serverList.isAllSelected()){
            	this.serverList.clearSelectAll();
            }
            else{
            	this.serverList.selectAll();
            }
        },
        isSelectAll:function(){
        	var self = this;
        	if(self.serverList.isAllSelected()){
        		this.$el.find("#allSelected").prop("checked", true);
            }
            else{
            	this.$el.find("#allSelected").removeAttr("checked");
            }
        }
	});
	return GroupDeployDataSourceView;
});