const path = require('path')

module.exports = function (dynamicJs) {
  let entryObj = {}

  for (const jsEntries of dynamicJs) {
    entryObj = {
      ...entryObj,
      [path.basename(jsEntries, '.js')]: jsEntries
    }
  }
  return entryObj
}
