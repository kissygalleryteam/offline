KISSY.add("gallery/offline/1.0/localstorage",function(c){var g={},d,e;c.mix(g,{init:function(){var a=(new Date).getTime();d=localStorage;e=c.JSON.parse(d.getItem("DEADLINE-KEY"))||{};for(var b in e)e.hasOwnProperty(b)&&(dateKey=parseInt(e[b],10),dateBet=dateKey-a,0>=dateBet?(this.removeItem(b),delete e[b],this._saveDeadLine()):this._deadlineKey(b,dateBet));return this},setItem:function(a,b,c){if(c){var c=parseInt(c,10),h=(new Date).getTime();e[a]=c+h;this._deadlineKey(a,c);this._saveDeadLine()}d.setItem(a,
b);return!0},getItem:function(a){return d.getItem(a)},removeItem:function(a){d.removeItem(a);delete e[a];this._saveDeadLine();return!this.getItem(a)},clear:function(){d.clear();return 0===this.size()},size:function(){var a=d.length;return d["DEADLINE-KEY"]?a-1:a},getAll:function(a){var b=d.length,f={},h;for(i=0;i<b;i++)h=d.key(i),f[h]=d.getItem(h),"DEADLINE-KEY"===h&&delete f[h];return a?f:c.JSON.stringify(f)},timeRemain:function(a){return!d[a]?0:a in e?e[a]-(new Date).getTime():-1},usedByte:function(){var a=
this.getAll().length;d["DEADLINE-KEY"]&&(a+=c.JSON.stringify(e).length,a+=12);return a},_deadlineKey:function(a,b){var f=this;c.later(function(){d.removeItem(a);delete e[a];f._saveDeadLine()},b)},_saveDeadLine:function(){d.setItem("DEADLINE-KEY",c.JSON.stringify(e))}});return g});
KISSY.add("gallery/offline/1.0/ie-offline",function(c){var g={},d=document,e=(new Date).getTime(),a,b,f;c.mix(g,{init:function(){a=d.createElement("link");a.addBehavior&&(a.style.behavior="url(#default#userData)",d.getElementsByTagName("head")[0].appendChild(a));a.load("IE-OFFLINE");b=c.JSON.parse(a.getAttribute("IE-SINGLE-KEY"))||{};f=c.JSON.parse(a.getAttribute("TIME-DEADLINE"))||{};this._initDeadline();return this},_initDeadline:function(){var a,b;for(b in f)f.hasOwnProperty(b)&&(a=parseInt(f[b],
10),a-=e,0>=a?this.removeItem(b):this._deadlineKey(b,a))},setItem:function(a,c,d){b[a]=c;d&&(c=parseInt(d,10),d=(new Date).getTime(),f[a]=c+d,this._deadlineKey(a,c));return this._saveToBrowser()},getItem:function(a){return b[a]},removeItem:function(a){delete b[a];delete f[a];return this._saveToBrowser()},clear:function(){b={};f={};return this._saveToBrowser()},size:function(){var a=0,c;for(c in b)b.hasOwnProperty(c)&&a++;return a},timeRemain:function(a){return!(a in b)?0:a in f?f[a]-(new Date).getTime():
-1},usedByte:function(){var a=0,d=c.JSON.stringify(f);""!==f&&(a+=d.length+13);return a+=c.JSON.stringify(b).length},getAll:function(a){return a?b:c.JSON.stringify(b)},_deadlineKey:function(a,b){var d=this;c.later(function(){d.removeItem(a)},b)},_saveToBrowser:function(){var d=!0;try{a.setAttribute("TIME-DEADLINE",c.JSON.stringify(f)),a.setAttribute("IE-SINGLE-KEY",c.JSON.stringify(b)),a.save("IE-OFFLINE")}catch(e){d=!1}return d}});return g});
KISSY.add("gallery/offline/1.0/index",function(c,g,d){function e(){e.superclass.constructor.call(this)}var a="undefined"!==typeof window.localStorage?g:8>c.UA.ie?d:null;a.init();c.extend(e,c.Base,{setItem:function(b,d,e){var g=parseInt(e,10);if(!c.isString(b)||!c.isString(d)||""===c.trim(b))return c.error("Format error"),!1;c.Offline.fire("setItem",{key:b,value:d,deadline:e});return a.setItem(b,d,g)},getItem:function(b){return!c.isString(b)?(c.error("Need String"),null):a.getItem(b)},removeItem:function(b){if(!c.isString(b))return c.error("Need String"),
!1;c.Offline.fire("removeItem",{key:b});return a.removeItem(b)},clear:function(){c.Offline.fire("clear");return a.clear()},getAll:function(b){return a.getAll(b)},size:function(){return a.size()},timeRemain:function(b){return!c.isString(b)?(c.error("Need String"),!1):a.timeRemain(b)},usedByte:function(){return a.usedByte()}});c.Offline=new e;return e},{requires:["./localstorage","./ie-offline"]});