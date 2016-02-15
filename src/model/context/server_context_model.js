define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var ServerContextModel = Backbone.Model.extend({
		urlRoot:"/"+jcfManager.appName+"/context/serverContextConfig.action",
		defaults: {
			"optime": "",
    		"exptime": "",
    		"servers": "",
		},
		parse: function(response){
			this.optime = response.optime;
			this.exptime = response.exptime;
			this.servers = response.servers;
			return _.extend(response);
		}
	});
	return ServerContextModel;
});