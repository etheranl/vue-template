/**
 * gulp配置文件
 */

// 需要操作的文件
exports.src = {
  // copy过程交给webpack来做，gulp不用考虑
  copy: []
}

// 不需要编译的文件
exports.filter = {
  js: []
}