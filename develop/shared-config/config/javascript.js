module.exports = function (dynamicJs) {
  const jsEntries = {}

  for (const entryName in dynamicJs) {
    // No empty entries
    if (dynamicJs[entryName].length === 0) delete dynamicJs[entryName]

    if (!dynamicJs[entryName]) continue

    // TODO: add cross-browser bundle + reload strategy bundle
    jsEntries[entryName] = {
      import: dynamicJs[entryName],
      filename: '[name]/[name].js'
    }
  }
  return jsEntries
}
