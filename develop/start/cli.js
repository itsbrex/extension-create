// ███████╗████████╗ █████╗ ██████╗ ████████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
// ███████╗   ██║   ███████║██████╔╝   ██║
// ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
// ███████║   ██║   ██║  ██║██║  ██║   ██║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

const {program} = require('commander')

const startExtension = require('./startExtension')
const messages = require('./messages/programHelp')
const packageJson = require('../package.json')

let browserVendor

async function startExtensionCLI(clientProgram = program) {
  clientProgram
    .version(packageJson.version)
    .command('start')
    .usage('start [path-to-extension-folder] [options]')
    .action((cmd) => {
      const {browser} = cmd

      browserVendor = browser
    })
    .description('start the development server')
    .option(
      '-b, --browser <browser-vendor>',
      'specify a browser to run your extension in production mode'
    )
    .on('--help', () => messages.programHelp())
    .parse(process.argv)

  const projectDir = process.cwd()
  const commands = clientProgram.commands[0]
  const customPath = commands.args[1] || ''

  await startExtension(projectDir, {customPath, browserVendor})
}

// If the module was called from the cmd line, execute it
if (require.main === module) {
  startExtensionCLI()
}

// Export as a module so it can be reused
module.exports = startExtensionCLI
