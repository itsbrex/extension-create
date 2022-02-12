module.exports = function (manifestPath, browserVendor) {
  return {
    apply: (compiler) => {
    browserVendor !== 'firefox'
      // Iterate overr each appropriate field in manifest
      // and apply the polyfill
      ? new BrowserExtensionPolyfill({manifestPath}).apply(compiler)
      : null
    }
  }
}
