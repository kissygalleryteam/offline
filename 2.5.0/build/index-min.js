define('kg/offline/2.5.0/index',["util","ua","./localstorage","./ie-offline","base"],function(require, exports, module) {function e(){e.superclass.constructor.call(this)}var r=require("util"),t=require("ua"),n=require("./localstorage"),i=require("./ie-offline"),o=require("base"),u="undefined"!=typeof window.localStorage?n:t.ie<8?i:null;u.init(),r.extend(e,o,{setItem:function(e,t,n){var i=parseInt(n,10);return r.isString(e)&&r.isString(t)&&""!==r.trim(e)?u.setItem(e,t,i):(console.error("Format error"),!1)},getItem:function(e){return r.isString(e)?u.getItem(e):(console.error("Need String"),null)},removeItem:function(e){return r.isString(e)?u.removeItem(e):(console.error("Need String"),!1)},clear:function(){return u.clear()},getAll:function(e){return u.getAll(e)},size:function(){return u.size()},timeRemain:function(e){return r.isString(e)?u.timeRemain(e):(console.error("Need String"),!1)},usedByte:function(){return u.usedByte()}}),module.exports=e;});