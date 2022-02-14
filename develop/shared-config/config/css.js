module.exports = function (dynamicCss) {
  const cssEntries = {}

  for (const entryName in dynamicCss) {
    // No empty entries
    if (dynamicCss[entryName].length === 0) delete dynamicCss[entryName]

    if (!dynamicCss[entryName]) continue

    cssEntries[entryName] = {
      import: dynamicCss[entryName],
      filename: '[name]/[name].css'
    }
  }
  return cssEntries
}
