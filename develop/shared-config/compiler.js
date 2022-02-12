// ██████╗ ██╗   ██╗██╗██╗     ██████╗
// ██╔══██╗██║   ██║██║██║     ██╔══██╗
// ██████╔╝██║   ██║██║██║     ██║  ██║
// ██╔══██╗██║   ██║██║██║     ██║  ██║
// ██████╔╝╚██████╔╝██║███████╗██████╔╝
// ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝

const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");
const extensionManifestAssets = require('extension-manifest-assets')
// const manifestManagement = require('../shared-config/assetManagement/manifest')
const jsManagement = require('../shared-config/assetManagement/javascript')
// const cssManagement = require('../shared-config/assetManagement/css')
const htmlManagement = require('../shared-config/assetManagement/html')
// const cleanup = require('./cleanup')

process.on('unhandledRejection', (error) => { throw error })

const distFolderName = (manifestPath) => `${path.dirname(manifestPath)}/dev-package`

module.exports = async (projectDir, {browserVendor, manifestPath}) => {
  // Output path points to a top level folder within the extension bundle
  const outputPath = path.resolve(projectDir, distFolderName(manifestPath))
// console.log({outputPath})
  const config = ({dynamicJs, dynamicHtml, dynamicCss}) => {
    return ({
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
      entry: jsManagement(dynamicJs),
      output: {
        filename: '[name]/[name].js',
        path: outputPath,
        clean: true,
        publicPath: '/'
      },
      plugins: [
        // Supports generating HTML files at runtime.
        // This allow us access to HTML files w/ the polyfill
        // included without messing with the user space
        // manifestManagement(manifestPath, outputPath),
        htmlManagement(dynamicHtml, outputPath),
        // cssManagement(dynamicCss, outputPath),
        // imageManagement({projectDir, manifestPath, outputPath}),????
        // localeManagement({projectDir, manifestPath, outputPath}),????
        // assetsManagement({projectDir, manifestPath, outputPath}),???? fonts/images/etc
        // Supports Add-On polyfilling where appropriate
        // injectPolyfill(outputPath, browserVendor),
        // Browser lists loaded conditionally based on user choice
        // browserSwitch(projectDir, browserVendor),
        // cleanup(projectDir),
      ],
      resolve: {
        extensions: ['.js', '.json']
      }
    })
  }

  return extensionManifestAssets(manifestPath)
  .then(({js, html, css}) => {
    return config({
      dynamicJs: js,
      dynamicHtml: html,
      dynamicCss: css
    })
  })
}
