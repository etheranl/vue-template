'use strict';

exports.index = function*() {
    yield this.bindDefault();

    yield this.render('index', {
        siteInfo: this.siteInfo
    });
}

