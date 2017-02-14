/**
 * [修复趣店及来分期首页运营位的重定向问题]
 * @return {[type]} [img-ajax set cookie]
 */
(function(){

    var _load = window.onload;
    window.onload = function(){
        // 合体
        'function' === typeof _load ? _load() : null;

        // 提取标识
        var _from = getValue(window.location.search, 'survey_from');
        var _channel = getValue(window.location.search, 'channel');
        var _id = getId(window.location.pathname);

        // 如果有标识，请求标记
        if (_from) {
            new Image().src = '/v2/aj/ad/redirect?survey_from='+_from;
        }
        if (_channel && _id) {
            new Image().src = '/v2/aj/ad/channel?topic='+_id+'&channel='+_channel;
        }else if (_channel){
             new Image().src = '/v2/aj/ad/channel?channel='+_channel
        }else if (_id) {
            new Image().src = '/v2/aj/ad/channel?topic='+_id
        }


    };

    // 获取key对应value
    function getValue ( str, key ) {
        return (String(str).replace(/[\?\s]/g, '').split('&').filter(function(item) {
            var arr = item.split('=');
            if (arr[0] === key ) {return arr[1] || ''; }
        })[0] || '=').split('=')[1];
    }
    //获取活动页id
    function getId ( str ) {
        // 获取活动页后面的活动页id
        var reg = /activity\/(\d+)/i;
        if ( reg.test(str) ) {
            return reg.exec(str)[1];
        }else {
            return null;
        }
    }

})();
