/*!build time : 2015-03-18 11:24:40 AM*/
KISSY.add("kg/offline/3.0.1/localstorage",function(a,b){var c,d,e={},f="DEADLINE-KEY";return a.mix(e,{init:function(){var a=(new Date).getTime();c=localStorage,d=b.parse(c.getItem(f))||{};for(var e in d)d.hasOwnProperty(e)&&(dateKey=parseInt(d[e],10),dateBet=dateKey-a,dateBet<=0?(this.removeItem(e),delete d[e],this._saveDeadLine()):this._deadlineKey(e,dateBet));return this},setItem:function(a,b,e){if(e){var f=parseInt(e,10),g=(new Date).getTime();d[a]=f+g,this._deadlineKey(a,f),this._saveDeadLine()}return c.setItem(a,b),!0},getItem:function(a){return c.getItem(a)},removeItem:function(a){return c.removeItem(a),delete d[a],this._saveDeadLine(),!this.getItem(a)},clear:function(){return c.clear(),0===this.size()},size:function(){var a=c.length;return c[f]?a-1:a},getAll:function(a){var d,e=c.length,g={};for(i=0;i<e;i++)d=c.key(i),g[d]=c.getItem(d),d===f&&delete g[d];return a?g:b.stringify(g)},timeRemain:function(a){return c[a]?a in d?d[a]-(new Date).getTime():-1:0},usedByte:function(){var a=this.getAll().length;return c[f]&&(a+=b.stringify(d).length,a+=f.length),a},_deadlineKey:function(b,e){var f=this;a.later(function(){c.removeItem(b),delete d[b],f._saveDeadLine()},e)},_saveDeadLine:function(){c.setItem(f,b.stringify(d))}}),e},{requires:["json"]});