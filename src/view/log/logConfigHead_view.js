define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var LogAppConfigHeadTemplate = require("../../template/log/logConfigHead.tpl");
	
	var GroupDataSourceConfigHeadView = Backbone.View.extend({
		el: "#content-header",
		
        template:_.template(LogAppConfigHeadTemplate),
        
        events: {
        	"change #appName": "getConfig"
        },

        initialize: function(options){
        	this.current = "";
        	this.options = options || {};
        	this.model = options.model;
        	this.queryString = options.queryString;
        	this.groupId = options.queryString.groupId;
        	this.logAppNameList = this.collection;
        	this.logAppNameList.bind('reset', this.render, this);
        },
        render: function(){
        	this.$el.html(this.template({"appNameList": this.logAppNameList.toJSON(), "current": this.current}));
    		return this;
        },
        getConfig: function(){
        	$("#groupAppName").attr("value",$("#appName").val());
        	if ($("#appName").val() != ""){
        		this.model.fetch({data:{groupId: this.groupId, appName: $("#appName").val()}, reset: true});
        	}
        	else{
        		this.model.setDefault();
        	}
        }
    });
	return GroupDataSourceConfigHeadView;
});