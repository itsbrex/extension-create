// ███████╗████████╗ █████╗ ██████╗ ████████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
// ███████╗   ██║   ███████║██████╔╝   ██║
// ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
// ███████║   ██║   ██║  ██║██║  ██║   ██║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

const path = require('path')
const extensionManifestAssets = require('extension-manifest-assets')
// const BrowserExtensionPolyfill = require('webpack-browser-extension-polyfill')
// const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// const browserSwitch = require('./browserSwitch')
// const manifestManagement = require('./assetManagement/manifest')
const jsManagement = require('./assetManagement/javascript')
// const htmlManagement = require('./assetManagement/html')
// const injectPolyfill = require('./assetManagement/polyfill')

process.on('unhandledRejection', (error) => { throw error })

// const distFolderName = (manifestPath) => `${path.dirname(manifestPath)}/dev-package`

module.exports = async (projectDir, {browserVendor, manifestPath}) => {
  // Output path points to a top level folder within the extension bundle
  // const outputPath = path.resolve(projectDir, distFolderName(manifestPath))

  const config = ({dynamicJs, dynamicHTML, dynamicCss}) => {
    console.log(jsManagement(dynamicJs))
    return ({
      mode: 'development',
      // The base directory, an absolute path, for resolving entry points
      // and loaders from the configuration.
      // context: projectDir,
      // catalog: {
      //   import: './catalog.js',
      //   filename: 'pages/catalog.js',
      //   dependOn: 'shared',
      //   chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
      // },
      entry: jsManagement(dynamicJs),
      // entry: {},
      // https://github.com/webpack/webpack/issues/2145
      // devtool: 'inline-cheap-module-source-map',
      // output: {
        // filename: '[name]/[name].js',
        // path: outputPath,
        // chunkFormat: 'array-push',
        // chunkLoading: 'jsonp',
        // clean: true
        // publicPath: '/'
      // },
      // plugins: [
        // Supports generating HTML files at runtime.
        // This allow us access to HTML files w/ the polyfill
        // included without messing with the user space
        // manifestManagement(manifestPath, outputPath),
        // htmlManagement(dynamicHTML, outputPath),
        // cssManagement({projectDir, manifestPath, outputPath}),
        // imageManagement({projectDir, manifestPath, outputPath}),????
        // localeManagement({projectDir, manifestPath, outputPath}),????
        // assetsManagement({projectDir, manifestPath, outputPath}),???? fonts/images/etc
        // Supports Add-On polyfilling where appropriate
        // injectPolyfill(outputPath, browserVendor),
        // Browser lists loaded conditionally based on user choice
        // browserSwitch(projectDir, browserVendor),
      // ],
      // resolve: {
      //   extensions: ['.js', '.json']
      // }
    })
  }
  // console.log('a tonga da mironga', await extensionManifestAssets(manifestPath))
  return extensionManifestAssets(manifestPath)
  .then(({js, html}) => {
    // console.log({js})
      return config({dynamicJs: js, dynamicHTML: html})})
}
