// ███████╗████████╗ █████╗ ██████╗ ████████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
// ███████╗   ██║   ███████║██████╔╝   ██║
// ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
// ███████║   ██║   ██║  ██║██║  ██║   ██║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

const webpack = require('webpack')

const compilerConfig = require('../config/compiler')

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

  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(stats.hasErrors())
    }
    // console.table(stats.compilation.missingDependencies._set)
    console.table(stats.compilation.assetsInfo)
  })

  process.on('SIGINT', () => closeAll(devServer))
  process.on('SIGTERM', () => closeAll(devServer))
}
