define(function(require, exports, module) {
    var $ = jQuery = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

	var pagerViewTemplate = require('../template/pager.tpl');
	
	var PagerView = Backbone.View.extend({
        template: _.template(pagerViewTemplate),

        events: {
            'click .pager .previous a': 'goPrevious',
            'click .pager .next a': 'goNext',
            'change .pager .page-jumper': 'goPage'
        },

		initialize: function (options) {
			this.options = options || {};
	    },
	
	    render: function () {
			this.$el.html(this.template(this.model.toJSON()));
	        return this;
	    },

        goPrevious: function(e){
            e.preventDefault();
            if(this.model.hasPrevious()){
                this.options.queryString.currentPage = this.model.get('currentPage') - 1;
                this.refresh(this.options.queryString);
            }
        },

        goNext: function(e){
            e.preventDefault();
            if(this.model.hasNext()){
                this.options.queryString.currentPage = this.model.get('currentPage') + 1;
                this.refresh(this.options.queryString);
            }
        },

        goPage: function(e){
            this.options.queryString.currentPage = this.$('.page-jumper').val();
            this.refresh(this.options.queryString);
        },

        refresh: function(queryString){
            var QueryString = require('querystring');
            window.location.hash = this.model.get('url_prefix') + "/param/" + QueryString.stringify(queryString);
        }
	});

    return PagerView;
})


