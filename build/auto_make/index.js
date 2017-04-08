'use strict';

const prompt = require('./prompt.js');
const tools = require('./tools.js');
let isExist = false,
  project = '',
  step2Text = '请给新建的业务页面命名：';

function _step1() {
  prompt.readLine('输入项目名称:', function(data) {
    if (tools.illegal(data)) {
      step2Text = '项目名只能包含小写字母、数字和下划线，并不能以数字开头，请重新输入新建的业务页面名：'
      return false
    }
    project = data + '/';
    return true;
  });
}

function _step2() {
  prompt.readLine(step2Text, function(data) {
    if (tools.illegal(data)) {
      step2Text = '业务页面名只能包含小写字母、数字和下划线，并不能以数字开头，请重新输入新建的业务页面名：'
    } else if (tools.exist(data)) {
      step2Text = data + '已存在，请重新输入新建的业务页面名：'
      isExist = true;
      return false;
    } else {
      step2Text = '';
      tools.autoMake(project, data);
      return true;
    }
  })
}

prompt.startStepByStep({step1: _step1, step2: _step2})
