define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var userAddTpl = require("../../template/auth/userDetail.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var Marionette = require("marionette");
    var UserDetailView = Marionette.ItemView.extend({
        template: _.template(userAddTpl),
        initialize: function (options) {
        },
        events: {
            "click #back": "back"
        },
        back : function (){
        	window.history.back() ;
        	//this.remove() ;
        },
        render: function () {
            this.$el.html(this.template({model:this.model.toJSON()}));
            return this;
        },
        onShow:function(){
        	/*this.$el.dialog({
   			 modal: true,
   			 width: "auto"
   		   });*/
        }
    });
    return UserDetailView;
});