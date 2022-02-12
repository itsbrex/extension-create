// List of words you can't use as a name for your project
// because they conflict with either current or future program commands
const reservedKeywords = [
  'build',
  'start',
  'test',
  'open',
  'deploy',
  'dev',
  'lint',
  'export',
  'info'
]

module.exports = function () {
  const commands = process.argv

  return reservedKeywords
    .some((word, index) => {
      return word === commands[2]
    })
}
