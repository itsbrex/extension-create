const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function removeEmptyEntries(dynamicHTML) {
  for (const entryName in dynamicHTML) {
    if (dynamicHTML[entryName].length === 0) delete dynamicHTML[entryName]
  }
  return dynamicHTML
}

module.exports = function (dynamicHTML, outputPath) {
  return {
    apply: (compiler) => {
      const htmlEntries = removeEmptyEntries(dynamicHTML)
      for (const htmlEntry in htmlEntries) {
        const htmlEntryPath = htmlEntries[htmlEntry]
        const htmlPageOutput = path.resolve(
          outputPath,
          path.basename(htmlEntryPath)
        )

        // We want filenames to be in format [htmlPageName]/[htmlPageName]
        const filename = path.resolve(
          path.dirname(htmlPageOutput),
          path.basename(htmlPageOutput, '.html'),
          path.basename(htmlPageOutput)
        )

        new HtmlWebpackPlugin({
          template: htmlEntryPath,
          filename,
          inject: 'head',
          chunks: [htmlEntry],
          // Public path is always at the root of each feature folder
          publicPath: path.dirname(htmlEntry)
        }).apply(compiler)

        // TODO: remove inline scripts
        // new HtmlInlineScriptPlugin().apply(compiler)
      }
    }
  }
}
