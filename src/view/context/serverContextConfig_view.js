define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var ContextUtil = require("../../util/ContextUtil");
	
	var ServerContextConfigTemplate = require("../../template/context/serverContextConfig.tpl");
	
	var TipView = require("./tip_view");
	
	var GlobalView = require("./global_view");
	
	var ServerContextConfigView = Backbone.View.extend({
		el: "#content-body",
		
        template:_.template(ServerContextConfigTemplate),

        events: {
        	"click #contextSave": "saveConfig",
        	"blur #optime" : "checkOptime",
			"blur #exptime" : "checkExptime",
			"blur #servers" : "checkServers"
        },

        initialize: function(options){
        	this.options = options || {};
        	this.model = options.model;
        	this.serverId = options.queryString.serverId;
        	this.listenTo(this.model,"change", this.render);
        },
        render: function(){
        	this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        saveConfig: function(){
        	if (this.checkOptime() && this.checkExptime() && this.checkServers()){
        		var self = this;
            	var optime = self.$el.find("#optime").val();
            	var exptime = self.$el.find("#exptime").val();
            	var servers = self.$el.find("#servers").val();
            	if (self.model.get('optime') != optime){
            		self.model.set('optime',optime);
            	}
            	if (self.model.get('exptime') != exptime){
            		self.model.set('exptime',exptime);
            	}
            	if (self.model.get('servers') != servers){
            		self.model.set('servers',servers);
            	}
            	self.model.save({serverId: self.serverId}, {'success':function(model, data){
            		if (data.flag){
            			data.messageList = ["修改上下文配置成功，请重启"];
            		}
            		else{
            			data.messageList = ["修改上下文配置失败"];
            		}
            		var global = new GlobalView({model: data});
    				global.render();
            	}});
        	}
        	else{
        		var data = {"flag":"false","messageList":"页面参数验证失败"};
        		var global = new GlobalView({model: data});
				global.render();
        	}
        },
        checkOptime: function(){
        	var flag = ContextUtil.checkOptime("optime");
        	return flag;
        },
        checkExptime: function(){
        	var flag = ContextUtil.checkExptime("exptime");
        	return flag;
        },
        checkServers: function(){
        	var flag = ContextUtil.checkServers("servers");
        	return flag;
        }
    });
	return ServerContextConfigView;
});