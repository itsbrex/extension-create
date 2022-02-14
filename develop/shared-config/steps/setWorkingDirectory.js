const path = require('path')
const fs = require('fs-extra')
const {log} = require('log-md')
const goGitIt = require('go-git-it')

function setWorkingDirFromRemote(workingDir, customPath) {
  if (new URL(customPath).hostname !== 'github.com') {
    log(`
      The remote extension URL must be stored on GitHub.
    `)
    process.exit(1)
  }

  goGitIt(customPath)

  return path.join(workingDir, path.basename(customPath))
}

async function setWorkingDirFromLocal(workingDir, customPath) {
  const currentPath = path.resolve(workingDir, customPath)
  const extensionPath = await fs.stat(currentPath)

  if (!extensionPath.isDirectory()) {
    log(`
      The local extension path must be a directory.
    `)
    process.exit(1)
  }

  return currentPath
}

module.exports = {
  setWorkingDirFromRemote,
  setWorkingDirFromLocal
}
