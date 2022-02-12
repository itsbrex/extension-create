module.exports = function (manifestPath, browserVendor) {
  return {
    apply: (compiler) => {
    browserVendor !== 'firefox'
      ? new BrowserExtensionPolyfill({manifestPath}).apply(compiler)
      : null
    }
  }
}
