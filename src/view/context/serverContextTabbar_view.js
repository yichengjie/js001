define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var ContextAuthCheckUtil = require('../../util/ContextAuthCheckUtil');
	
	var serverContextTabbarViewTemplate = require('../../template/context/serverContextTabbar.tpl');
	
    var ServerContextTabbarView = Backbone.View.extend({
    	el : "#tabbar",
    	
        template: _.template(serverContextTabbarViewTemplate),
        
        events: {
        	
	    },
        initialize: function (options) {
        	this.options = options || {};
        	this.queryString = options.queryString;
        	this.serverId = options.queryString.serverId;
        	this.labels = this.getLabels();
            this.current = options.queryString.selectTab || "contextInfo";
            this.contextConfigAuth = ContextAuthCheckUtil.getServerContextConfigAuth();
        },
        render: function () {
            this.$el.html(this.template({"labels": this.labels, "current": this.current, "serverId": this.serverId, "contextConfigAuth": this.contextConfigAuth}));
            return this;
        },
        select: function(current){
        	this.current = current;
            this.$el.find('li').removeClass('active');
            if(current != ""){
            	this.$el.find('#'+current).addClass('active');
            }
        },
        getLabels: function(){
        	return [{"id" : "contextInfo","name" : "上下文信息"},
				    {"id" : "contextConfig","name" : "上下文配置"}
				   ];
        }
    });
    return ServerContextTabbarView;
});
