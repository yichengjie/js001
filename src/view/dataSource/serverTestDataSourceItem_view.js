define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var ServerTestDataSourceItemTemplate = require("../../template/dataSource/serverTestDataSourceItem.tpl");
	
	var GlobalView = require("./global_view");
	
	var ServerTestDataSourceItemView = Backbone.View.extend({
		
        template:_.template(ServerTestDataSourceItemTemplate),
        
        tagName: "div",
        
        className: "dsTestList dsItem",

        events: {
        	"click .dsTest": "serverDataSourceTestConnect",
        },

        initialize: function(options){
        	this.model = options.model;
        	this.serverId = options.serverId;
        	this.listenTo(this.model,"change", this.render);
        },

        render: function(){
            return this.$el.html(this.template(this.model.toJSON()));
        },
        serverDataSourceTestConnect: function(){
        	var self = this;
        	var jsonParam = {serverId:this.serverId,dsName:this.model.get("dataSourceName")};
			var testDSConnectionURL = "/"+jcfManager.appName+"/dataSource/testDSConnection.action";
			var ajaxing = util.dealAjaxRequest4SimpleParam(testDSConnectionURL,jsonParam);
			$.when(ajaxing).done(function(data){
				data.dataSourceName = self.model.get("dataSourceName");
				if(data.flag){
					data.messageList = ["数据源" + data.dataSourceName + "测试连接成功"];
					self.model.set("connected",true);
				}else{
					data.messageList = ["数据源" + data.dataSourceName + "测试连接失败，原因：" + data.message];
					self.model.set("connected",false);
				}
				var globar = new GlobalView({model: data});
				globar.render();
			});
        }
    });
	return ServerTestDataSourceItemView;
});