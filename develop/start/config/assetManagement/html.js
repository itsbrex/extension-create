const fs = require('fs-extra')
const path = require('path')
const {parse} = require('node-html-parser')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function removeEmptyEntries (dynamicHTML) {
  for (let entryName in dynamicHTML) {
    if (dynamicHTML[entryName].length === 0) delete dynamicHTML[entryName]
  }
  return dynamicHTML
}

function getTemplateHtmlFilename (htmlPageOutput) {
  const tempOutput = htmlPageOutput.replace('.html', '.template.html')
  return tempOutput
}

function removeAllJavaScriptFromFile (htmlEntry, htmlPageOutput) {
  fs.readFile(htmlEntry.toString(), 'utf8', (err, html) => {
    if (err) throw new Error(err)

    const root = parse(html, {comment: true})
    const allScripts = root.querySelectorAll('script')

    // Nothing to do if user added zero scripts
    if (!allScripts) return

    let index = Object.values(allScripts).length

    // Actually remove all script entries
    while (index--) {
      allScripts[index].parentNode.removeChild(allScripts[index])
    }

    // Create a temp dir so HtmlWebpackPlugin can grab it's contents
    // as template and apply the right entries.
    const tempOutput = getTemplateHtmlFilename(htmlPageOutput)

    // Ensure file exists before editing. This is a temp dir.
    fs.ensureFileSync(tempOutput)

    // Override user's file. Has to be sync otherwise it will eat
    // injected scripts from the HTML plugin
    fs.writeFileSync(tempOutput, root.toString(), 'utf8', (error) => {
      if (error) return console.log(error)
    })
  })
}

module.exports = function (dynamicHTML, outputPath) {
  return {
    apply: (compiler) => {
      const htmlEntries = removeEmptyEntries(dynamicHTML)
      for (const htmlEntry in htmlEntries) {
        const htmlEntryPath = htmlEntries[htmlEntry]
        const htmlPageOutput = path.resolve(outputPath, path.basename(htmlEntryPath))

        // Ensure we remove all default scripts added by the user
        // from the output file. They are bundled now se we don't need it.
        removeAllJavaScriptFromFile(htmlEntryPath, htmlPageOutput)

        // We want filenames to be in format [htmlPageName]/[htmlPageName]
        const filename = path.resolve(
          path.dirname(htmlPageOutput),
          path.basename(htmlPageOutput, '.html'),
          path.basename(htmlPageOutput)
        )

        // Keep the HTML file as-is without the JavaScript files,
        // and add the bundled script instead.
        const template = path.resolve(htmlPageOutput, getTemplateHtmlFilename(htmlPageOutput))

        new HtmlWebpackPlugin({
          template,
          filename,
          inject: 'head',
          chunks: [htmlEntry],
          // Public path is always at the root of each feature folder
          publicPath: path.dirname(htmlEntry)
        }).apply(compiler)
      }
    }
  }
}
