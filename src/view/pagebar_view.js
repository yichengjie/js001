/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-4
 * Time: 下午03:11:31
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var pagebarViewTemplate = require('../template/pagebar.tpl');
	var PagebarModel = require("../model/pagebar_model") ;
	var mySelf = null ;
	var myOptions = null ;
    var PagebarView = Backbone.View.extend({
    	template: _.template(pagebarViewTemplate),
    	initialize:function(options){
    		myOptions = options;
    		console.log(myOptions.parentView);
    	},
        render: function () {
            this.$el.html(this.template({page:myOptions.model.toJSON()}));
            return this;
        },
        events: {
	        "click ul.pagination li a.canClick" : "goToPage",
	        "change #pageSize" : "changePageSize" ,
	        "focus #pageSize" : "selectText"
	    },
	    selectText:function(e){
	    	$(e.target).select() ;
	    },
	    changePageSize:function(){
	    	var pageSize = $("#pageSize").val() ;
	    	var jsObj  = {} ;
	    	jsObj.pageSize = pageSize ;
	    	jsObj.currentPage = "1" ;
	    	var parentView = myOptions.parentView ;
	    	parentView.goToPage(jsObj) ;
	    },
        goToPage:function (event){
	    	var $a = $(event.target) ;
	    	var qpData = {} ;
	    	qpData.pageSize = $("#pageSize").val() ;
	    	qpData.currentPage = $a.attr("pageNum") ;
	    	var parentView = myOptions.parentView ;
	    	parentView.goToPage(qpData) ;
        }
    });
    return PagebarView;
});
