define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var sidebarViewTemplate = require('../../template/auth/sidebar.tpl');
	
    var SidebarView = Backbone.View.extend({
        template: _.template(sidebarViewTemplate),
        events: {
        	
	    },
        initialize: function () {
            this.groups = this.getGroups();
            this.current = "";
        },
        render: function () {
            this.$el.html(this.template({"groups": this.groups, "current": this.current}));
            return this;
        },
        select: function(current){
        	this.current = current;
        	this.$el.find('li').removeClass('select');
            if(current != ""){
            	this.$el.find('#'+current).addClass('select');
            }
        },
		getGroups: function(){
			return [{"groupId" : "userMgr","groupName" : "用户管理"},
				    {"groupId" : "roleMgr","groupName" : "角色管理"}
				   ];
		}
    });
    return SidebarView;
});
