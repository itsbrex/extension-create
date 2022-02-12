// ██████╗ ██╗   ██╗██╗██╗     ██████╗
// ██╔══██╗██║   ██║██║██║     ██╔══██╗
// ██████╔╝██║   ██║██║██║     ██║  ██║
// ██╔══██╗██║   ██║██║██║     ██║  ██║
// ██████╔╝╚██████╔╝██║███████╗██████╔╝
// ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝

const {log} = require('log-md')
const {
  setWorkingDirFromLocal,
  setWorkingDirFromRemote
} = require('../shared-config/steps/setWorkingDirectory')

const resoleManifest = require('../shared-config/resolve/resolveManifest')
const startWebpack = require('./steps/startWebpackServer')

module.exports = async function buildExtension(
  workingDir,
  {customPath, browserVendor}
) {
  let currentworkingDir

  try {
    if (!customPath) {
      // No user arguments, default to cwd
      currentworkingDir = workingDir
    } else if (customPath.startsWith('http')) {
      currentworkingDir = setWorkingDirFromRemote(workingDir, customPath)
    } else {
      currentworkingDir = await setWorkingDirFromLocal(workingDir, customPath)
    }

    const resolvedManifest = await resoleManifest(currentworkingDir)

    await startWebpack(currentworkingDir, {
      manifestPath: resolvedManifest,
      browserVendor
    })
  } catch (error) {
    log(`
      Error while building the extension: ${error}
    `)
    process.exit(1)
  }
}
