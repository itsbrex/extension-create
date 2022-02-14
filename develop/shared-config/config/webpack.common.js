// ██████╗ ██╗   ██╗██╗██╗     ██████╗
// ██╔══██╗██║   ██║██║██║     ██╔══██╗
// ██████╔╝██║   ██║██║██║     ██║  ██║
// ██╔══██╗██║   ██║██║██║     ██║  ██║
// ██████╔╝╚██████╔╝██║███████╗██████╔╝
// ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const extensionManifestAssets = require('extension-manifest-assets')
// const manifestManagement = require('./loadManifest')
const jsManagement = require('./javascript')
// const cssManagement = require('./css')
const htmlManagement = require('./html')

process.on('unhandledRejection', (error) => {
  throw error
})

const distFolderName = (manifestPath) =>
  `${path.dirname(manifestPath)}/_package`

module.exports = (projectDir, {/* browserVendor, */ manifestPath}) => {
  // Output path points to a top level folder within the extension bundle
  const outputPath = path.resolve(projectDir, distFolderName(manifestPath))

  const config = ({dynamicJs, dynamicHtml /* dynamicCss, features */}) => {
    return {
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
      },
      entry: jsManagement(dynamicJs),
      output: {
        filename: '[name]/[name].js',
        path: outputPath,
        clean: true,
        publicPath: '/'
      },
      plugins: [htmlManagement(dynamicHtml, outputPath)],
      // TODO: Support TypeScript/React
      // TODO: Support Babel
      resolve: {
        extensions: [
          '.mjs',
          '.js',
          // ...(useTypeScript ? ['.tsx', '.ts'] : []),
          // '.jsx',
          '.json',
          '.wasm'
        ]
      }
    }
  }

  return extensionManifestAssets(manifestPath).then(
    ({js, html, css, features}) => {
      return config({
        dynamicJs: js,
        dynamicHtml: html,
        dynamicCss: css,
        features
      })
    }
  )
}
