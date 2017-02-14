'use strict';

const crypto = require('crypto');
let url = require('url');

function _sort (params) {
	let keyArr = [];
	let ret = {};
	for (let paramsKey in params) {
		keyArr.push(paramsKey);
	}
	keyArr.sort();
	keyArr.forEach(item => {
		ret[item] = params[item];
	});
	return ret;
}

function _getTime () {
	let now = new Date(),
		y = now.getFullYear(),
		m = parseInt(now.getMonth()) + 1,
		d = now.getDate(),
		h = now.getHours(),
		mi = now.getMinutes(),
		s = now.getSeconds();
	m = m > 9 ? m : '0' + m;
	d = d > 9 ? d : '0' + d;
	h = h > 9 ? h : '0' + h;
	mi = mi > 9 ? mi : '0' + mi;
	s = s > 9 ? s : '0' + s;
	return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
}

/**
 * [getKey 验签]
 * @param  {[Object]} params [要传递的业务参数，除了no__check表示是否需要验签]
 * @param  {[String]} method [保留参数，暂不用传]
 * @return {[String]}        [get参数串]
 */
function getKey (params, method) {
	params = params || {};
	params.partner = 'front';

	if (this.query) {
		for (let key in this.query) {
			params[key] = this.query[key];
		}
	}
	if (this.request && this.request.body) {
		for (let key in this.request.body) {
			params[key] = this.request.body[key];
		}
	}

	let no__check = params.no__check === 'true';
	delete params.no__check;
	if (!no__check) {
		params.date_time = _getTime()
		params = _sort(params);
	}

	let getRet = '';
	for (let paramsKey in params) {
		getRet += paramsKey + '=' + params[paramsKey] + '&';
	}

	let sign;
	if (!no__check) {
		let key = 'VRJ5zh4o3oxnFbTy3CY4RQjEJ4nWUbOo';

		let signPars = key+getRet+key;
		let md5 = crypto.createHash('md5');
		md5.update(signPars);
		sign = md5.digest('hex');
		sign = sign.toLowerCase();
	}

	if (method != 'post') {
		if (no__check) {
			return getRet.slice(0, -1);
		} else {
			getRet = getRet.replace(params.date_time, encodeURIComponent(params.date_time))
			return getRet + 'sign=' + sign;
		}
	} else {
		if (no__check) {
			params.date_time = encodeURIComponent(params.date_time);
			params.sign = sign;
		}
		return params
	}
}



/**
 * 检验url的主域名是否为qufenqi.com
 * 是的话原路返回，不是的话讲域名改为qufenqi.com
 */
function checkURLQufenqi(_url){

    /* 原url可能为http/s://www.xx.xx.qufenqi.com/xx/xx/xx  */
    if (_url){
    	let urlArr = _url.replace(/^https?\:\/\//, '').split('/');
    	if (url.parse(_url).hostname.match(/\.qufenqi\.com$/)){
    		return _url;
    	} else {
    	urlArr.splice(0, 1, '');
   	 		return urlArr.join('/');
    	}
    }else {
    	return '/v2/home';
    }
}


/**
 * [correct 自动补全a.b.c.d式的对象]
 * @param  {[String]} 	name       		[要取的当前对象的值的key，如要取a.b.c.d的值，先correct.bind(a)，然后name就是‘b.c.d’]
 * @param  {[-]}		defaultValue	[如果没有a.b.c.d，则要以什么值来补齐]
 * @return {[-]}              			[a.b.c.d或补齐的值]
 */
function correct(name, defaultValue) {
	let data = this;
	name = name.split('.');
	let undef = false;
	name.forEach(item => {
		if (data === undefined) {
			undef = true;
			return;
		} else {
			data = data[item]
		}
	});
	return undef || data === undefined ? defaultValue : data;
}

/**
 * 转义字符串，防止xss攻击
 * @param  {String} str 要转义的字符
 * @return {String}     转义后的字符
 */
function escapeHTML(str) {
  return String(str)
    .replace(/#/g, "&#35;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\$/g, "&#36;")
    .replace(/\(/g, "&#40;")
    .replace(/\)/g, "&#41;");
}

exports.getKey = getKey;
exports.correct = correct;
exports.escape = escapeHTML;
exports.checkURLQufenqi=checkURLQufenqi;
module.exports.__controller__ = false;
