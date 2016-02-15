define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var LogItemTemplate = require("../../template/log/logItem.tpl");
	
	var GlobalView = require("./global_view");
	
	var TipView = require("./tip_view");
	
	var LogItemView = Backbone.View.extend({
		
        template:_.template(LogItemTemplate),
        
        tagName: "div",
        
        className: "logList",

        events: {
        	"click .fileDelete a":"showDeleteFileView"
        },

        initialize: function(options){
        	this.model = options.model;
        	this.listenTo(this.model,"change:confirmDelete", this.deleteFile);
        },

        render: function(){
            return this.$el.html(this.template(this.model.toJSON()));
        },
        showDeleteFileView: function(){
        	var tipView = new TipView({
        		headerMessage: "删除应用配置文件",
        		bodyMessage: "确定要删除应用配置文件" + this.model.get("fileName") + "么？",
        		model: this.model,
        		type: "delete"
        	});
        	this.$el.append(tipView.render());
        	tipView.show();
        },
        deleteFile: function(){
        	var self = this;
        	var jsonData = {"groupId":this.model.get("groupId"),"appName":this.model.get("appName"),"filePath":this.model.get("filePath")};
        	var deleteAppLogConfigFile = "/" + jcfManager.appName + "/log/deleteAppLogConfigFile.action";
        	var reqing = util.dealAjaxRequest4SimpleParam(deleteAppLogConfigFile, jsonData);
        	$.when(reqing).done(function(data) {
				if(data.flag){
					self.model.set("delete", true);
					data.messageList = ["应用配置文件删除成功"];
				}
				var globar = new GlobalView({model: data});
				globar.render();
        	});
        }
    });
	return LogItemView;
});