// ██████╗ ███████╗██╗   ██╗
// ██╔══██╗██╔════╝██║   ██║
// ██║  ██║█████╗  ██║   ██║
// ██║  ██║██╔══╝  ╚██╗ ██╔╝
// ██████╔╝███████╗ ╚████╔╝
// ╚═════╝ ╚══════╝  ╚═══╝

const webpack = require('webpack')
const {log} = require('log-md')

const compilerConfig = require('../config/compiler')

module.exports = async function startWebpack(
  projectDir,
  {manifestPath, browserVendor}
) {
  const webpackConfig = await compilerConfig(projectDir, {
    manifestPath,
    browserVendor
  })

  webpack(webpackConfig).run((err) => {
    if (err) {
      log(err)
      process.exit(1)
    }
    process.exit(0)
  })
}
