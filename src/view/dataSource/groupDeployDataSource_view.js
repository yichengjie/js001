define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	var DataSourceUtil = require("../../util/DataSourceUtil");
	
	var GroupDataSourceDeployModel =  require("../../model/dataSource/group_dataSource_deploy_model");
	
	var GroupDataSourceServerCollection = require ("../../collection/dataSource/group_dataSource_server_collection");
	
	var GroupDeployDataSourceTemplate = require("../../template/dataSource/groupDeployDataSource.tpl");
	
	var GroupDataSourceServerListView = require("./groupDataSourceServerList_view");
	
	var GlobalView = require("./global_view");
	
	var GroupDeployDataSourceView = Backbone.View.extend({
		el : '#content-body',
		
		template: _.template(GroupDeployDataSourceTemplate),
		
		events: {
			"blur #dataSourceName": "checkDataSourceName",
			"blur #userName": "checkUserName",
			"blur #password": "checkPassWord",
			"blur #URL": "checkURL",
			"click #save": "deployDataSource"
		},
		initialize: function(options){
			this.options = options || {};
			this.groupId = options.queryString.groupId;
			this.groupDataSourceServerCollection = new GroupDataSourceServerCollection();
		},
		render : function(){
			this.$el.html(this.template());
			return this;
		},
		getServerList: function(){
			var groupDataSourceServerListView = new GroupDataSourceServerListView({
				groupId: this.groupId,
				collection: this.groupDataSourceServerCollection
			});
			this.groupDataSourceServerCollection.fetch({
				reset: true,
				data: QueryString.stringify(this.options.queryString)
			});
			groupDataSourceServerListView.render();
		},
		deployDataSource : function(){
			if (this.checkForm()){
				var allSelectedItems = [];
				if (this.groupDataSourceServerCollection.selectedServer().length > 0){
					this.groupDataSourceServerCollection.each(function(model){
						var serverId = model.get('serverId');
		                var index = allSelectedItems.indexOf(serverId);
		                if (model.isSelected() && index < 0){
		                	allSelectedItems.push(serverId);
		                }
		                if (!model.isSelected() && index >= 0){
		                	allSelectedItems.splice(index, 1);
		                }
					});
					var groupDataSourceDeployModel = new GroupDataSourceDeployModel();
					var dataSourceName = this.$el.find("#dataSourceName").val().trim();
					var userName = this.$el.find("#userName").val().trim();
					var password = this.$el.find("#password").val().trim();
					var URL = this.$el.find("#URL").val().trim();
					var driverClassName = this.$el.find("#driverClassName").val().trim();
					groupDataSourceDeployModel.set("dataSourceName", dataSourceName);
					groupDataSourceDeployModel.set("username", userName);
					groupDataSourceDeployModel.set("password", password);
					groupDataSourceDeployModel.set("URL", URL);
					groupDataSourceDeployModel.set("driverClassName", driverClassName);
					groupDataSourceDeployModel.save({"allSelectedItems": allSelectedItems},{'success':function(model, data){
						if (data.flag == true){
							data.messageList = ["组部署数据源成功"];
						}
						var globar = new GlobalView({model: data});
						globar.render();
					}});
				}
				else{
					var data = {};
					data.flag = false;
					data.messageList = ["请选择需要部署的服务器"];
					var globar = new GlobalView({model: data});
					globar.render();
				}
			}
			else{
        		var data = {"flag":"false","messageList":"页面参数验证失败"};
        		var global = new GlobalView({model: data});
				global.render();
        	}
		},
		checkDataSourceName: function(){
			var flag = DataSourceUtil.checkDataSourceName("dataSourceName");
			return flag;
		},
		checkUserName: function(){
			var flag = DataSourceUtil.checkUserName("userName");
			return flag;
		},
		checkPassWord: function(){
			var flag = DataSourceUtil.checkPassWord("password");
			return flag;
		},
		checkURL: function(){
			var flag = DataSourceUtil.checkURL("URL");
			return flag;
		},
		checkForm: function(){
			if (this.checkDataSourceName() && this.checkUserName() && this.checkPassWord() && this.checkURL()){
				return true;
			}
			return false;
		}
	});
	return GroupDeployDataSourceView;
});