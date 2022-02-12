// ██████╗ ███████╗██╗   ██╗
// ██╔══██╗██╔════╝██║   ██║
// ██║  ██║█████╗  ██║   ██║
// ██║  ██║██╔══╝  ╚██╗ ██╔╝
// ██████╔╝███████╗ ╚████╔╝
// ╚═════╝ ╚══════╝  ╚═══╝

const {program} = require('commander')

const devExtension = require('./devExtension')
const messages = require('./messages/programHelp')
const packageJson = require('../package.json')

let browserVendor

async function devExtensionCLI(clientProgram = program) {
  clientProgram
    .version(packageJson.version)
    .command('dev')
    .usage('dev [path-to-extension-folder] [options]')
    .action((cmd) => {
      const {browser} = cmd

      browserVendor = browser
    })
    .description('start the development server (dev mode)')
    .option(
      '-b, --browser <browser-vendor>',
      'specify a browser to run your extension in development mode'
    )
    .on('--help', () => messages.programHelp())
    .parse(process.argv)

  const projectDir = process.cwd()
  const commands = clientProgram.commands[0]
  const customPath = commands.args[1] || ''

  await devExtension(projectDir, {customPath, browserVendor})
}

// If the module was called from the cmd line, execute it
if (require.main === module) {
  devExtensionCLI()
}

// Export as a module so it can be reused
module.exports = devExtensionCLI
