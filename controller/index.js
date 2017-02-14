'use strict';

const Tool = require('./controllerTools.js');

exports.index = function*(){
    yield this.bindDefault();

    /**
     * 请求的接口
     * 如果proxy访问的接口需要验签，则需要用到Tool.getKey()
     */
    // let getKey = Tool.getKey.bind(this);
    yield this.proxy({
        /* dataA: '[需要验签的接口url]/?' + getKey({[参数]}), */
        /* dataB: '[不需要验签的接口url]?[参数]' */
    });

    /**
     * 用请求到的数据渲染模板
     * 如果取得的数据需要自动补齐，则需要用到Tool.correct()
     */
    let correct = Tool.correct.bind(this.backData);
    yield this.render('module/index', {
        pageData: {
            /* title: [页面title], */
            /* A: correct('dataA.[需要自动补齐的参数key，如key1.key2.key3]'), */
            /* B: dataB */
        }
    });
}
