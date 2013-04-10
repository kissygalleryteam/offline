/*
 Combined processedModules by KISSY Module Compiler: 

 gallery/offline/1.0/localstorage
 gallery/offline/1.0/ie-offline
 gallery/offline/1.0/index
*/

KISSY.add("gallery/offline/1.0/localstorage", function(S) {
  var re = {}, DEADLINE_KEY = "DEADLINE-KEY", ls, oDeadline;
  S.mix(re, {init:function() {
    var initDate = (new Date).getTime();
    ls = localStorage;
    oDeadline = S.JSON.parse(ls.getItem(DEADLINE_KEY)) || {};
    for(var i in oDeadline) {
      if(oDeadline.hasOwnProperty(i)) {
        dateKey = parseInt(oDeadline[i], 10);
        dateBet = dateKey - initDate;
        if(dateBet <= 0) {
          this.removeItem(i);
          delete oDeadline[i];
          this._saveDeadLine()
        }else {
          this._deadlineKey(i, dateBet)
        }
      }
    }
    return this
  }, setItem:function(key, value, deadline) {
    if(deadline) {
      var numDeadline = parseInt(deadline, 10), nowDate = (new Date).getTime();
      oDeadline[key] = numDeadline + nowDate;
      this._deadlineKey(key, numDeadline);
      this._saveDeadLine()
    }
    ls.setItem(key, value);
    return true
  }, getItem:function(key) {
    return ls.getItem(key)
  }, removeItem:function(key) {
    ls.removeItem(key);
    delete oDeadline[key];
    this._saveDeadLine();
    return!this.getItem(key)
  }, clear:function() {
    ls.clear();
    return this.size() === 0
  }, size:function() {
    var len = ls.length;
    return ls[DEADLINE_KEY] ? len - 1 : len
  }, getAll:function(isObject) {
    var len = ls.length, oTemp = {}, key;
    for(i = 0;i < len;i++) {
      key = ls.key(i);
      oTemp[key] = ls.getItem(key);
      if(key === DEADLINE_KEY) {
        delete oTemp[key]
      }
    }
    if(isObject) {
      return oTemp
    }
    return S.JSON.stringify(oTemp)
  }, timeRemain:function(key) {
    if(!ls[key]) {
      return 0
    }
    if(key in oDeadline) {
      return oDeadline[key] - (new Date).getTime()
    }else {
      return-1
    }
  }, usedByte:function() {
    var tempLen = this.getAll().length;
    if(ls[DEADLINE_KEY]) {
      tempLen += S.JSON.stringify(oDeadline).length;
      tempLen += DEADLINE_KEY.length
    }
    return tempLen
  }, _deadlineKey:function(key, deadline) {
    var self = this;
    S.later(function() {
      ls.removeItem(key);
      delete oDeadline[key];
      self._saveDeadLine()
    }, deadline)
  }, _saveDeadLine:function() {
    ls.setItem(DEADLINE_KEY, S.JSON.stringify(oDeadline))
  }});
  return re
});
KISSY.add("gallery/offline/1.0/ie-offline", function(S) {
  var re = {}, doc = document, initDate = (new Date).getTime();
  var IE_OFFLINE = "IE-OFFLINE", SINGLE_KEY = "IE-SINGLE-KEY", TIME_DEADLINE = "TIME-DEADLINE";
  var oIeOffline, oGlobal, oDeadline;
  S.mix(re, {init:function() {
    oIeOffline = doc.createElement("link");
    if(oIeOffline.addBehavior) {
      oIeOffline.style.behavior = "url(#default#userData)";
      doc.getElementsByTagName("head")[0].appendChild(oIeOffline)
    }
    oIeOffline.load(IE_OFFLINE);
    oGlobal = S.JSON.parse(oIeOffline.getAttribute(SINGLE_KEY)) || {};
    oDeadline = S.JSON.parse(oIeOffline.getAttribute(TIME_DEADLINE)) || {};
    this._initDeadline();
    return this
  }, _initDeadline:function() {
    var dateKey, dateBet;
    for(var i in oDeadline) {
      if(oDeadline.hasOwnProperty(i)) {
        dateKey = parseInt(oDeadline[i], 10);
        dateBet = dateKey - initDate;
        if(dateBet <= 0) {
          this.removeItem(i)
        }else {
          this._deadlineKey(i, dateBet)
        }
      }
    }
  }, setItem:function(key, value, deadline) {
    oGlobal[key] = value;
    if(deadline) {
      var numDeadline = parseInt(deadline, 10), nowDate = (new Date).getTime();
      oDeadline[key] = numDeadline + nowDate;
      this._deadlineKey(key, numDeadline)
    }
    return this._saveToBrowser()
  }, getItem:function(key) {
    return oGlobal[key]
  }, removeItem:function(key) {
    delete oGlobal[key];
    delete oDeadline[key];
    return this._saveToBrowser()
  }, clear:function() {
    oGlobal = {};
    oDeadline = {};
    return this._saveToBrowser()
  }, size:function() {
    var numLen = 0;
    for(var i in oGlobal) {
      if(oGlobal.hasOwnProperty(i)) {
        numLen++
      }
    }
    return numLen
  }, timeRemain:function(key) {
    if(!(key in oGlobal)) {
      return 0
    }
    if(key in oDeadline) {
      return oDeadline[key] - (new Date).getTime()
    }else {
      return-1
    }
  }, usedByte:function() {
    var tempLen = 0, strDeadLine = S.JSON.stringify(oDeadline);
    if(oDeadline !== "") {
      tempLen += strDeadLine.length + TIME_DEADLINE.length
    }
    tempLen += S.JSON.stringify(oGlobal).length;
    return tempLen
  }, getAll:function(isObject) {
    if(isObject) {
      return oGlobal
    }
    return S.JSON.stringify(oGlobal)
  }, _deadlineKey:function(key, deadline) {
    var self = this;
    S.later(function() {
      self.removeItem(key)
    }, deadline)
  }, _saveToBrowser:function() {
    var flag = true;
    try {
      oIeOffline.setAttribute(TIME_DEADLINE, S.JSON.stringify(oDeadline));
      oIeOffline.setAttribute(SINGLE_KEY, S.JSON.stringify(oGlobal));
      oIeOffline.save(IE_OFFLINE)
    }catch(e) {
      flag = false
    }
    return flag
  }});
  return re
});
/**
 * @fileoverview 离线存储存储
 * @author 伯方<bofang.zxj@taobao.com>
 **/
KISSY.add('gallery/offline/1.0/index',function(S, LocalStorage, IeOffline) {
	var DomBase = typeof window.localStorage !== 'undefined' ? LocalStorage : S.UA.ie < 8 ? IeOffline : null;
	DomBase.init();
	/**
	 * @name Offline
	 * @class 离线存储
	 * @constructor
	 * @extends Base
	 * @example
	 * var offline = new Offline();
	 * offline.setItem('key','value',20000);
	 */
	function Offline() {
		//调用父类构造函数
		Offline.superclass.constructor.call(this);
	}
	// 方法
	S.extend(Offline, S.Base, /** @lends Offline.prototype*/ {
		/**
		 * 设置本地存储
		 * @param {String} key      字段
		 * @param {String} value    值
		 * @param {Number} deadline 过期时间（单位毫秒）
		 * @return {Boolean} 成功就则返回true，失败返回false
		 */
		setItem: function(key, value, deadline) {
			var numDeadline = parseInt(deadline, 10);
			if(!S.isString(key) || !S.isString(value) || S.trim(key) === '') {
				S.error('Format error');
				return false;
			}
			S.Offline.fire('setItem', {
				key: key,
				value: value,
				deadline: deadline
			});
			return DomBase.setItem(key, value, numDeadline);
		},
		/**
		 * 根据字段获取本地存储的值
		 * @param  {String} key 字段名
		 * @return {String}     值
		 */
		getItem: function(key) {
			if(!S.isString(key)) {
				S.error('Need String');
				return null;
			}
			return DomBase.getItem(key);
		},
		/**
		 * 删除本地存储的字段
		 * @param  {String} key 需要删除的字段名
		 * @return {Boolean}    成功则返回true，失败返回false
		 */
		removeItem: function(key) {
			if(!S.isString(key)) {
				S.error('Need String');
				return false;
			}
			S.Offline.fire('removeItem', {
				key: key
			});
			return DomBase.removeItem(key);
		},
		/**
		 * 清空本地存储的字段
		 * @return {Boolean}  成功则返回true，失败返回false
		 */
		clear: function() {
			S.Offline.fire('clear');
			return DomBase.clear();
		},
		/**
		 * 获取全部存储的字段（默认是String）
		 * @param  {Boolean} isObject 是否需要返回对象
		 * @return {String | Object}  全部字段，字符串或者是对象
		 */
		getAll: function(isObject) {
			return DomBase.getAll(isObject);
		},
		/**
		 * 获取本地存储里面字段的个数
		 * @return {Number} 个数
		 */
		size: function() {
			return DomBase.size();
		},
		/**
		 * 获取单个字段的剩余保存时间
		 * @param  {String} key 字段名
		 * @return {Number}     毫秒数 返回-1表示永久存储
		 */
		timeRemain: function(key) {
			if(!S.isString(key)) {
				S.error('Need String');
				return false;
			}
			return DomBase.timeRemain(key);
		},
		/**
		 * 浏览器中总共使用的字节数
		 * @return {Number} 字节数
		 */
		usedByte: function() {
			return DomBase.usedByte();
		}
	});
	//绑定属性在KISSY上，方便调用
	S.Offline = new Offline();
	return Offline;

}, {
	requires: ['./localstorage', './ie-offline']
});

