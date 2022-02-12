/* global describe, it */
const path = require('path')

const fs = require('fs-extra')

const boringManifestFile = {
  manifest_version: 2,
  name: 'Your browser extension',
  version: '1.0',
  background: {
    scripts: ['./background.js']
  }
}

/* eslint-disable no-unused-vars */
async function createTmpExtension() {
  // Write a fake bg script
  await fs.writeFile(
    path.join(process.cwd(), 'background.js'),
    'console.log("hello")'
  )
  // Write a fake manifest file
  await fs.writeFile(
    path.join(process.cwd(), 'manifest.json'),
    JSON.stringify(boringManifestFile)
  )
}

describe('`build` command line interface', () => {
  it.todo('builds extension from local path with arguments')
  it.todo('builds extension from local path without arguments')
  it.todo('builds extension from local path - manifest in src/')
  it.todo('builds extension from local path - manifest in public/')
  it.todo('builds extension from remote (URL) path')
  it.todo('builds extension from remote (URL) path - manifest in src/')
  it.todo('builds extension from remote (URL) path - manifest in public/')
  describe('--browser flag', () => {
    it.todo('accepts and builds `chrome` as flag')
    it.todo('accepts and builds `edge` as flag')
    it.todo('accepts and `all` browsers as flag')
    it.todo('accepts and builds chrome as default')
  })
})
