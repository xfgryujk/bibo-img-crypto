const DEFAULT_SEED = '114514'

export function getConfig () {
  return {
    enableEncryption: true,
    enableDecryption: true,
    codecName: 'ShuffleBlockCodec',
    randomSeed: DEFAULT_SEED,
    ...JSON.parse(window.localStorage.biboImgCryptoConfig || '{}')
  }
}

export function setConfig (config) {
  window.localStorage.biboImgCryptoConfig = JSON.stringify(config)
}
