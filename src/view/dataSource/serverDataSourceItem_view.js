define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var DataSourceAuthCheckUtil = require('../../util/DataSourceAuthCheckUtil');
	
	var ServerDataSourceConfigModel = require("../../model/dataSource/server_dataSource_config_model");
	var ServerDataSourceConfigView = require("./serverDataSourceConfig_view");
	
	var ServerDataSourceMonitorModel = require("../../model/dataSource/server_dataSource_monitor_model");
	var ServerDataSourceMonitorView = require("./serverDataSourceMonitor_view");
	
	var ServerDataSourceItemTemplate = require("../../template/dataSource/serverDataSourceItem.tpl");
	
	var TipView = require("./tip_view");
	
	var GlobalView = require("./global_view");
	
	var ServerDataSourceItemView = Backbone.View.extend({
		
        template:_.template(ServerDataSourceItemTemplate),
        
        tagName: "div",
        
        className: "dsList",

        events: {
        	"click .dsconfig a": "serverDataSourceConfig",
        	"click .dsundeploy a": "showServerDataSourceUndeployView",
        	"click .dsrestart a": "showServerDataSourceRestartView",
        	"click .dsdetail a": "serverDataSourceDetail",
        	"click #cancel": "closeConfig",
        	"click .modal-footer .ok": "confirm",
        	"click .modal-footer .cancel": "cancel"
        },

        initialize: function(options){
        	this.model = options.model;
        	this.serverId = options.serverId;
        	this.listenTo(this.model,"change", this.render);
        	this.listenTo(this.model,"change:confirmRestart", this.serverDataSourceRestart);
        	this.listenTo(this.model,"change:confirmUndeploy", this.serverDataSourceUndeploy);
        	this.dataSourceConfigAuth = DataSourceAuthCheckUtil.getServerDataSourceConfigAuth();
        	this.dataSourceUndeployAuth = DataSourceAuthCheckUtil.getServerDataSourceUninstallAuth();
        	this.dataSourceRestartAuth = DataSourceAuthCheckUtil.getServerDataSourceRestartAuth();
        	this.dataSourceDetailViewAuth = DataSourceAuthCheckUtil.getServerDataSourceDetailViewAuth();
        },

        render: function(){
            return this.$el.html(this.template({"model": this.model.toJSON(),"dataSourceConfigAuth": this.dataSourceConfigAuth,
            	"dataSourceUndeployAuth": this.dataSourceUndeployAuth, "dataSourceRestartAuth":this.dataSourceRestartAuth,
            	"dataSourceDetailViewAuth": this.dataSourceDetailViewAuth}));
        },
        serverDataSourceConfig: function(e){
        	e.preventDefault();
        	if (this.model.isShowConfig()){
        		this.model.set("showDataSourceConfig", false);
        	}
        	else{
        		this.model.set("showDataSourceConfig", true);
        		this.model.set("showDataSourceMonitor", false);
        		var dataSourceConfig = new ServerDataSourceConfigModel();
        		dataSourceConfig.parentView = this;
        		var server_dataSource_config_view = new ServerDataSourceConfigView({
        			model: dataSourceConfig,
        			serverId: this.serverId,
        			item: this.model
        		});
        		dataSourceConfig.fetch({data:{serverId: this.serverId, dsName: this.model.get('dataSourceName')}});
        		this.$el.append(server_dataSource_config_view.render());
        	}
        },
        showServerDataSourceUndeployView: function(){
        	var tipView = new TipView({
        		headerMessage: "卸载数据源",
        		bodyMessage: "确定要卸载数据源" + this.model.get("dataSourceName") + "么？",
        		model: this.model,
        		type: "undeploy"
        	});
        	this.$el.append(tipView.render());
        	tipView.show();
        },
        serverDataSourceUndeploy: function(){
        	var self = this;
        	var jsonParam = {serverId:this.serverId,dsName:this.model.get('dataSourceName')};
			var uninstallDSByServerURL = "/"+jcfManager.appName+"/dataSource/uninstallDSByServer.action";
			var ajaxing = util.dealAjaxRequest4SimpleParam(uninstallDSByServerURL,jsonParam);
			$.when(ajaxing).done(function(data){
				if(data.flag){
					self.model.set("uninstall", true);
					data.messageList = ["数据源"+self.model.get("dataSourceName")+"卸载成功"];
				}
				else{
					data.messageList = ["数据源"+self.model.get("dataSourceName")+"卸载失败"];
				}
				var globar = new GlobalView({model: data});
				globar.render();
			});
        },
        showServerDataSourceRestartView: function(e){
        	var tipView = new TipView({
        		headerMessage: "重启数据源",
        		bodyMessage: "确定要重启数据源" + this.model.get("dataSourceName") + "么？",
        		model: this.model,
        		type: "restart"
        	});
        	this.$el.append(tipView.render());
        	tipView.show();
        },
        serverDataSourceRestart: function(){
        	var self = this;
        	var jsonParam = {serverId:this.serverId,dsName:this.model.get('dataSourceName')};
			var restartServerDSURL = "/"+jcfManager.appName+"/dataSource/restartDSByServer.action";
			var ajaxing = util.dealAjaxRequest4SimpleParam(restartServerDSURL,jsonParam);
			$.when(ajaxing).done(function(data){
				if(data.flag){
					self.model.set("restart", true);
					data.messageList = ["数据源"+self.model.get("dataSourceName")+"重启成功"];
				}
				else{
					data.messageList = ["数据源"+self.model.get("dataSourceName")+"重启失败"];
				}
				var globar = new GlobalView({model: data});
				globar.render();
			});
        },
        serverDataSourceDetail: function(){
        	if (this.model.isShowMonitor()){
        		this.model.set("showDataSourceMonitor", false);
        		this.render();
        	}
        	else{
        		this.render();
        		this.model.set("showDataSourceMonitor", true);
        		this.model.set("showDataSourceConfig", false);
        		var dataSourceMonitor = new ServerDataSourceMonitorModel();
        		var server_dataSource_monitor_view = new ServerDataSourceMonitorView({
        			model: dataSourceMonitor,
        			serverId: this.serverId
        		});
        		dataSourceMonitor.fetch({data:{serverId: this.serverId, dsName: this.model.get('dataSourceName')}});
        		this.$el.append(server_dataSource_monitor_view.render());
        	}
        },
    });
	return ServerDataSourceItemView;
});