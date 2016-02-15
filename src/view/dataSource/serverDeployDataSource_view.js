define(function(require, exports, module) {//新增数据源页面
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var DataSourceUtil = require("../../util/DataSourceUtil");
	
	var GlobalView = require("./global_view");
	
	var ServerDataSourceDeployModel =  require("../../model/dataSource/server_dataSource_deploy_model");
	
	var ServerDeployDataSourceTemplate = require("../../template/dataSource/serverDeployDataSource.tpl");
	
	var ServerDeployDataSourceView = Backbone.View.extend({
		el : '#content-body',
		
		template: _.template(ServerDeployDataSourceTemplate),
		
		events: {
			"blur #dataSourceName": "checkDataSourceName",
			"blur #userName": "checkUserName",
			"blur #password": "checkPassWord",
			"blur #URL": "checkURL",
			"click #save": "deployDataSource"
		},
		initialize: function(options){
			this.options = options || {};
			this.serverId = options.queryString.serverId;
		},
		render : function(){
			this.$el.html(this.template());
			return this;
		},
		deployDataSource : function(){
			if (this.checkForm()){
				var serverDataSourceDeployModel = new ServerDataSourceDeployModel();
				var dataSourceName = this.$el.find("#dataSourceName").val().trim();
				var userName = this.$el.find("#userName").val().trim();
				var password = this.$el.find("#password").val().trim();
				var URL = this.$el.find("#URL").val().trim();
				var driverClassName = this.$el.find("#driverClassName").val().trim();
				serverDataSourceDeployModel.set("dataSourceName", dataSourceName);
				serverDataSourceDeployModel.set("username", userName);
				serverDataSourceDeployModel.set("password", password);
				serverDataSourceDeployModel.set("URL", URL);
				serverDataSourceDeployModel.set("driverClassName", driverClassName);
				serverDataSourceDeployModel.save({serverId: this.serverId},{'success':function(model, data){
					if (data.flag == true){
						data.messageList = ["数据源部署成功，请检测连通性"];
					}else{
						data.messageList = [data.message];
					}
					var globar = new GlobalView({model: data});
					globar.render();
				}});
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
	return ServerDeployDataSourceView;
});