const fs = require('fs-extra')
// const resolveExtensionMaifestFields = require('resolve-extension-manifest-fields')

module.exports = function (manifestPath, outputPath) {
  const manifest = require.resolve(manifestPath)
  console.log(manifest)
  // const customPath = {
  //   backgroundPage: 'background/background.html',
  //   bookmarksPage: 'bookmarks/bookmarks.html',
  //   devtoolsPage: 'devtools/devtools.html',
  //   historyPage: 'history/history.html',
  //   newtabPage: 'newtab/newtab.html',
  //   optionsPage: 'options/options.html',
  //   popupPage: 'popup/popup.html',
  //   // Image fields from manifest
  //   browserActionIcons: '',
  //   pageActionIcons: '',
  //   icons: '',
  //   // Scripts fields from manifest
  //   backgroundScript: '',
  //   contentScript: '',
  //   contentCss: '',
  //   // Web resources
  //   webAccessibleResources: ''
  //   // TODO: locales
  // }

  // const manifestContent = resolveExtensionMaifestFields(manifestPath, customPath)
  // console.log(manifestContent)
  // const outputManifestPath = path.join(outputPath, 'manifest.json')
  // fs.writeFileSync(outputManifestPath, manifestContent, 'utf8', (error) => {
  //   if (error) return console.log(error)
  // })
}
