// ███████╗████████╗ █████╗ ██████╗ ████████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
// ███████╗   ██║   ███████║██████╔╝   ██║
// ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
// ███████║   ██║   ██║  ██║██║  ██║   ██║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

const {program} = require('commander')

const buildExtension = require('./buildExtension')
const messages = require('./messages/programHelp')
const packageJson = require('../package.json')

let browserVendor

async function buildExtensionCLI(clientProgram = program) {
  clientProgram
    .version(packageJson.version)
    .command('build')
    .usage('build [path-to-extension-folder] [options]')
    .action((cmd) => {
      const {browser} = cmd

      browserVendor = browser
    })
    .description('build the extension (prepare for deploy)')
    .option(
      '-b, --browser <browser-vendor>',
      'specify which browser to target your extension build'
    )
    .on('--help', () => messages.programHelp())
    .parse(process.argv)

  const projectDir = process.cwd()
  const commands = clientProgram.commands[0]
  const customPath = commands.args[1] || ''

  await buildExtension(projectDir, {customPath, browserVendor})
}

// If the module was called from the cmd line, execute it
if (require.main === module) {
  buildExtensionCLI()
}

// Export as a module so it can be reused
module.exports = buildExtensionCLI
