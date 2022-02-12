// ██████╗ ██╗   ██╗██╗██╗     ██████╗
// ██╔══██╗██║   ██║██║██║     ██╔══██╗
// ██████╔╝██║   ██║██║██║     ██║  ██║
// ██╔══██╗██║   ██║██║██║     ██║  ██║
// ██████╔╝╚██████╔╝██║███████╗██████╔╝
// ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝

const {log} = require('log-md')

module.exports = function programHelp() {
  log(`
    # Help center for the \`build\` command

    ## The \`remote\` _<github-url>_ argument

    If you want to get up and running with an existing extension
    available remotely on GitHub, you can specify its path as an
    argument to the \`build\` command.

    The path can be any GitHub URL subdirectory. If a GitHub URL is provided,
    the directory is downloaded to the current working directory.

    For example:

    \`extension-create build https://github.com/user/repo/\`
    will download \`repo\` in the current working directory and
    with a production-ready build.

    Works with subdirectories as well, like https://github.com/user/repo/subdirs

    Feels something is wrong? Help by reporting a bug:
    https://github.com/cezaraugusto/extension-create/issues/new
  `)
}
