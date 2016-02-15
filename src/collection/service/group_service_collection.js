define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var util = require("../../util/CommonUtil");
	var appName = util.getAppName();
	var GroupServiceModel = require("../../model/service/group_service_model");
	var GroupServiceCollection = Backbone.Collection.extend({
		model : GroupServiceModel,
		url : '/' + appName + '/service/searchGroupService.action',
		parse : function(response){
			this.currentPage = response.currentPage;
            this.pageSize = response.pageSize;
            this.pageCount = response.pageCount;
			return _.extend(response.recordList,{'currentPage':response.currentPage});
        },
        selectAll: function(){
            this.each(function(service){
            	service.set('selected', true);
            });
        },
        clearSelectAll: function(){
            this.each(function(service){
            	service.set('selected', false);
            });
        },
        selectedService: function(){
            return this.filter(function(service){
                return service.isSelected();
            });
        },
        isAllSelected: function(){
            if (this.selectedService().length == 0 ){
                return false;
            }
            return this.selectedService().length == this.length;
        },
	}) ;
	return GroupServiceCollection;
});