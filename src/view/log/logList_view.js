define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	
	var LogListTemplate = require("../../template/log/logList.tpl");
	var LogAuthCheckUtil = require('../../util/LogAuthCheckUtil');
	
	var LogListItemView = require("./logItem_view");
	
	var LogListView = Backbone.View.extend({
		el : '#content-body',
		
		template: _.template(LogListTemplate),
		
		events: {
			
		},
		initialize: function(options){
			this.options = options || {};
			this.logList = options.collection;
			
			this.logDeleteAuth = LogAuthCheckUtil.getLogDeleteAuth() ;//点击应用按钮的权限
			
            this.logList.bind('reset', this.addAllLogs, this);
            this.views =[];
            this.logList.bind('change:delete', this.deleteFile, this);
		},
		render : function(){
			$(this.el).html(this.template());
			return this;
		},
		addLog: function(log){
			var logDeleteAuth = LogAuthCheckUtil.getLogDeleteAuth() ;
			log.set("logDeleteAuth",logDeleteAuth) ;
			var log_list_item_view = new LogListItemView({model: log});
			this.$el.find("#logListBody").append(log_list_item_view.render());
			this.views.push(log_list_item_view);
        },
        addAllLogs: function(){
        	var _this = this;
    		//遍历views数组，并对每个view调用Backbone的remove
    		_.each(this.views,function(view){
    			view.remove().off();
    		});
    		//清空views数组，此时旧的view就变成没有任何被引用的不可达对象了
    		//垃圾回收器会回收它们
    		this.views =[];
    		this.logList.each(function(model){
    			_this.addLog(model);
    		});
        },
        refresh: function(){
        	this.logList.refresh();
        },
        deleteFile: function(){
        	this.render();
        	this.refresh();
        }
	});
	return LogListView;
});