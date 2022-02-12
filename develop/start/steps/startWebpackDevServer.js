// ███████╗████████╗ █████╗ ██████╗ ████████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
// ███████╗   ██║   ███████║██████╔╝   ██║
// ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
// ███████║   ██║   ██║  ██║██║  ██║   ██║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

const webpack = require('webpack')
const {log} = require('log-md')
const WebpackDevServer = require('webpack-dev-server')

const compilerConfig = require('../config/compiler')
const server = require('../config/server')

function closeAll(devServer) {
  devServer.close()
  process.exit()
}

module.exports = async function startWebpack(
  projectDir,
  {manifestPath, browserVendor}
) {
  const webpackConfig = await compilerConfig(projectDir, {
    manifestPath,
    browserVendor
  })

  const compiler = webpack(webpackConfig)

  const devServer = new WebpackDevServer(server, compiler)

  devServer.startCallback((error) => {
    if (error) return log(`Error in the extension runner: ${error}`)
  })

  process.on('SIGINT', () => closeAll(devServer))
  process.on('SIGTERM', () => closeAll(devServer))
}
