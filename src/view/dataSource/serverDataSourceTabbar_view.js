define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var DataSourceAuthCheckUtil = require('../../util/DataSourceAuthCheckUtil');
	
	var serverDataSourceTabbarViewTemplate = require('../../template/dataSource/serverDataSourceTabbar.tpl');
	
    var ServerDataSourceTabbarView = Backbone.View.extend({
    	el : "#tabbar",
    	
        template: _.template(serverDataSourceTabbarViewTemplate),
        
        events: {
        	
	    },
        initialize: function (options) {
        	this.options = options || {};
        	this.queryString = options.queryString;
        	this.serverId = options.queryString.serverId;
        	this.labels = this.getLabels();
            this.current = options.queryString.selectTab || "dataSource";
            this.deployDataSourceAuth = DataSourceAuthCheckUtil.getServerDataSourceDeployAuth();
        },
        render: function () {
            this.$el.html(this.template({"labels": this.labels, "current": this.current, "serverId": this.serverId, "deployDataSourceAuth":this.deployDataSourceAuth}));
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
        	return [{"id" : "dataSource","name" : "数据源列表"},
				    {"id" : "deployDataSource","name" : "新增数据源"},
				    {"id" : "testDataSource","name" : "测试数据源"}
				   ];
        }
    });
    return ServerDataSourceTabbarView;
});
