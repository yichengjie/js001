/**
 * Created with PyCharm.
 * User: zou
 * Date: 12-9-6
 * Time: 下午6:53
 * To change this template use File | Settings | File Templates.
 */
//define("#querystring/1.0.2/querystring",[],function(a,b){function h(a){return a&&d.call(a)==="[object Object]"&&"isPrototypeOf"in a}function i(a){return a!==Object(a)}var c=b;c.escape=encodeURIComponent,c.unescape=function(a){return decodeURIComponent(a.replace(/\+/g," "))},c.stringify=function(a,b,d,g){if(!h(a))return"";b=b||"&",d=d||"=",g=g||!1;var j=[],k,l,m=c.escape;for(k in a){if(!e.call(a,k))continue;l=a[k],k=c.escape(k);if(i(l))j.push(k,d,m(l+""),b);else if(f(l)&&l.length)for(var n=0;n<l.length;n++)i(l[n])&&j.push(k,(g?m("[]"):"")+d,m(l[n]+""),b);else j.push(k,d,b)}return j.pop(),j.join("")},c.parse=function(a,b,d){var h={};if(typeof a!="string"||g(a).length===0)return h;var i=a.split(b||"&");d=d||"=";var j=c.unescape;for(var k=0;k<i.length;k++){var l=i[k].split(d),m=j(g(l[0])),n=j(g(l.slice(1).join(d))),o=m.match(/^(\w+)\[\]$/);o&&o[1]&&(m=o[1]),e.call(h,m)?(f(h[m])||(h[m]=[h[m]]),h[m].push(n)):h[m]=o?[n]:n}return h};var d=Object.prototype.toString,e=Object.prototype.hasOwnProperty,f=Array.isArray||function(a){return d.call(a)==="[object Array]"},g=String.prototype.trim?function(a){return a==null?"":String.prototype.trim.call(a)}:function(a){return a==null?"":a.toString().replace(/^\s+/,"").replace(/\s+$/,"")}});
/*
Copyright 2011, SeaJS v0.9.1
MIT Licensed
build time: May 22 23:10
*/

define("querystring",[],function(){function k(a){var c=typeof a;return a==null||c!=="object"&&c!=="function"}var e={},l=Object.prototype.toString,m=String.prototype.trim,n=Object.prototype.hasOwnProperty,o=Array.isArray?Array.isArray:function(a){return l.call(a)==="[object Array]"},j=m?function(a){return a==null?"":m.call(a)}:function(a){return a==null?"":a.toString().replace(/^\s+/,"").replace(/\s+$/,"")};e.escape=encodeURIComponent;e.unescape=function(a){return decodeURIComponent(a.replace(/\+/g,
" "))};e.stringify=function(a,c,h,f){if(!a||!(l.call(a)==="[object Object]"&&"isPrototypeOf"in a))return"";var c=c||"&",h=h||"=",f=f||!1,g=[],b,d;for(b in a)if(n.call(a,b))if(d=a[b],b=e.escape(b),k(d))g.push(b,h,e.escape(d+""),c);else if(o(d)&&d.length)for(var i=0;i<d.length;i++)k(d[i])&&g.push(b,(f?e.escape("[]"):"")+h,e.escape(d[i]+""),c);else g.push(b,h,c);g.pop();return g.join("")};e.parse=function(a,c,h){var f={};if(typeof a!=="string"||j(a).length===0)return f;a=a.split(c||"&");h=h||"=";for(c=
0;c<a.length;c++){var g=a[c].split(h),b=e.unescape(j(g[0])),g=e.unescape(j(g.slice(1).join(h))),d=b.match(/^(\w+)\[\]$/);d&&d[1]&&(b=d[1]);n.call(f,b)?(o(f[b])||(f[b]=[f[b]]),f[b].push(g)):f[b]=d?[g]:g}return f};e.version="1.0.0";return e});
