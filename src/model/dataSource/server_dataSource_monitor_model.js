define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var ServerDataSourceMonitorModel = Backbone.Model.extend({
    	urlRoot:"/"+jcfManager.appName+"/dataSource/detailDSByServer.action",
    	defaults:{
    		"activeNum": 0,
    		"idleNum": 0
    	},
    	parse: function(response){
    		this.activeNum = response.activeNum;
    		this.idleNum = response.idleNum;
    		this.flag = response.flag;
    		return _.extend(response);
    	}
	});
	return ServerDataSourceMonitorModel;
})