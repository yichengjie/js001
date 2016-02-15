define(function(require, exports, module){
    exports.render = function(sidebar){
        if(window.jcfManagement.current_sidebar === sidebar){
            return;
        }
        else{
        	window.jcfManagement.current_sidebar = sidebar;
            sidebar.render();
        }
    }
});