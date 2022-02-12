const { merge } = require('webpack-merge');
const common = require('../../shared-config/compiler');

module.exports = async function (projectDir, { browserVendor, manifestPath }) {
  const defaultConfig = await common(projectDir, { browserVendor, manifestPath })

  return merge(defaultConfig, {
    devtool: 'inline-source-map',
    mode: 'production'
  })
};
