define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var ContextAuthCheckUtil = require('../../util/ContextAuthCheckUtil');
	
	var TipView = require("./tip_view");
	
	var GlobalView = require("./global_view");
	
	var ServerContextInfoTemplate = require("../../template/context/serverContextInfo.tpl");
	
	var ServerContextInfoView = Backbone.View.extend({
		el: "#content-body",
		
        template:_.template(ServerContextInfoTemplate),

        events: {
        	"click #contextRestart": "restartMemcache"
        },

        initialize: function(options){
        	this.options = options || {};
        	this.model = options.model;
        	this.queryString = options.queryString;
        	this.listenTo(this.model,"change", this.render);
        	this.restartContextAuth = ContextAuthCheckUtil.getServerContextRestartAuth();
        },
        render: function(){
        	this.$el.html(this.template({"model":this.model.toJSON(),"restartContextAuth": this.restartContextAuth}));
            return this;
        },
        restartMemcache: function(){
        	var restartContextURL = "/" + jcfManager.appName + "/context/restartServerContext.action";
			var jsObj = {};
			jsObj.serverId = this.queryString.serverId;
			var reqing = util.dealAjaxRequest4SimpleParam(restartContextURL,jsObj);
			$.when(reqing).done(function(data) {
				if (data.flag) {
					data.messageList = ["重启上下文成功"];
				}
				else{
					data.messageList = ["重启上下文失败"];
				}
				var global = new GlobalView({model: data});
				global.render();
			});
		}
    });
	return ServerContextInfoView;
});