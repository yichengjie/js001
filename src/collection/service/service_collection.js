define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var util = require("../../util/CommonUtil");
	var appName = util.getAppName();
	var ServiceModel = require("../../model/service/service_model");
	var ServiceCollection = Backbone.Collection.extend({
		model : ServiceModel,
		url : '/' + appName + '/service/searchAllService.action',
		parse : function(response){
			this.currentPage = response.currentPage;
            this.pageSize = response.pageSize;
            this.pageCount = response.pageCount;
			return _.extend(response.recordList,{'currentPage':response.currentPage});
        }
	});
	return ServiceCollection;
});