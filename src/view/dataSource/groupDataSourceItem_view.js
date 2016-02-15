define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var GroupDataSourceItemTemplate = require("../../template/dataSource/groupDataSourceItem.tpl");
	
	var DataSourceWaitView = require("./dataSourceWait_view");
	
	var TipView = require("./tip_view");
	
	var GlobalView = require("./global_view");
	
	
	var GroupDataSourceItemView = Backbone.View.extend({
		
        template:_.template(GroupDataSourceItemTemplate),
        
        tagName: "div",
        
        className: "dsList",

        events: {
        	"click .groupdsundeploy a": "showGroupDataSourceUndeployView",
        	"click .groupdsrestart a": "showGroupDataSourceRestartView",
        	"click #cancel": "closeConfig",
        	"click .select": "toggleSelect",
        },

        initialize: function(options){
        	this.model = options.model;
        	this.groupId = options.groupId;
        	this.model.bind('change:selected', this.modelChange, this);
        	this.listenTo(this.model,"change", this.render);
        	this.listenTo(this.model,"change:confirmRestart", this.groupDataSourceRestart);
        	this.listenTo(this.model,"change:confirmUndeploy", this.groupDataSourceUndeploy);
        },

        render: function(){
            return this.$el.html(this.template(this.model.toJSON()));
        },
        showGroupDataSourceUndeployView: function(){
        	var tipView = new TipView({
        		headerMessage: "卸载组数据源",
        		bodyMessage: "确定要卸载组数据源" + this.model.get("dataSourceName") + "么？",
        		model: this.model,
        		type: "undeploy"
        	});
        	this.$el.append(tipView.render());
        	tipView.show();
        },
        groupDataSourceUndeploy: function(){
        	var self = this;
        	var dataSourceWaitView = new DataSourceWaitView();
        	$("#tip").append(dataSourceWaitView.render());
        	dataSourceWaitView.show();
        	var jsonParam = {groupId:this.groupId,dsName:this.model.get('dataSourceName')};
			var uninstallDSByServerURL = "/"+jcfManager.appName+"/dataSource/groupDataSourceUninstall.action";
			var ajaxing = util.dealAjaxRequest4SimpleParam(uninstallDSByServerURL,jsonParam);
			$.when(ajaxing).done(function(data){
				dataSourceWaitView.remove();//删除当前记录的视图
				self.model.set("uninstall", true);
				if(data.flag){
					data.messageList = ["组数据源卸载成功"];
				}
				var globar = new GlobalView({model: data});
				globar.render();
			});
        },
        showGroupDataSourceRestartView: function(e){
        	var tipView = new TipView({
        		headerMessage: "重启组数据源",
        		bodyMessage: "确定要重启组数据源" + this.model.get("dataSourceName") + "么？",
        		model: this.model,
        		type: "restart"
        	});
        	this.$el.append(tipView.render());
        	tipView.show();
        },
        groupDataSourceRestart: function(){
        	var self = this;
        	var jsonParam = {groupId:this.groupId,dsName:this.model.get('dataSourceName')};
			var restartServerDSURL = "/"+jcfManager.appName+"/dataSource/groupDataSourceRestart.action";
			var ajaxing = util.dealAjaxRequest4SimpleParam(restartServerDSURL,jsonParam);
			$.when(ajaxing).done(function(data){
				self.model.set("restart", true);
				if(data.flag=="true"){
					var t =  new Date().getTime()
					appRouter.navigate("dataSrcMgr/group/param/groupId="+self.groupId+"&t="+t,{trigger:true}) ;
				}else{
					data.messageList = ["组数据源重启失败"];
					var globar = new GlobalView({model: data});
					globar.render();
				
				}
			});
			
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
            }
        }
    });
	return GroupDataSourceItemView;
});