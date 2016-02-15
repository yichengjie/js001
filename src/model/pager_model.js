define(function(require, exports, module) {
    var $ = jQuery = require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');

	var PageModel = Backbone.Model.extend({
        defaults: {
        	currentPage: 1,
        	pageSize: jcfManager.defaultPageSize,
        	pageCount: 0,
            url_prefix: ""
        },

        hasNext: function(){
            return this.get('pageCount') > this.get('currentPage');
        },

        hasPrevious: function(){
            return this.get('currentPage') > 1;
        }
	});
    return PageModel;
})