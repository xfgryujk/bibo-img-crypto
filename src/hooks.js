import {Notification} from 'element-ui'
import {createCodec} from './codec'
import {getConfig} from './config'

export function init () {
  hookUpload()
  hookContextMenu()
}

// Hook上传图片函数
async function hookUpload () {
  // Hook XHR open，记录URL
  let originalOpen = window.XMLHttpRequest.prototype.open
  window.XMLHttpRequest.prototype.open = function (method, url, ...args) {
    this.__bibo__ = {url: url}
    return originalOpen.call(this, method, url, ...args)
  }

  // Hook XHR send，加密
  let originalSend = window.XMLHttpRequest.prototype.send
  window.XMLHttpRequest.prototype.send = async function (data) {
    if (!getConfig().enableEncryption || !this.__bibo__ || !this.__bibo__.url.endsWith('/drawImage/upload')) {
      originalSend.call(this, data)
      return
    }
    let file = data.get('file_up')
    if (!file || file.type === 'image/gif') {
      originalSend.call(this, data)
      return
    }

    let codec = createCodec()
    try {
      await codec.initFromBlob(file)
    } catch (e) {
      Notification.error({
        title: 'bibo',
        message: '载入图片失败：' + e,
        position: 'bottom-left',
        duration: 3000
      })
      this.onerror(e)
      return
    }

    let blob = codec.encryptToBlob()
    data.delete('file_up')
    data.set('file_up', blob)
    originalSend.call(this, data)
  }
}

// 监听右键菜单
function hookContextMenu () {
  document.addEventListener('contextmenu', async event => {
    let originImg = event.target
    if (getConfig().enableDecryption && originImg instanceof Image) {
      if (originImg.src.startsWith('data:') || originImg.src.startsWith('blob:')) {
        // 已经解密过了
        return
      }
      event.preventDefault() // 解密时屏蔽右键菜单

      let codec = createCodec()
      try {
        await codec.initFromUrl(originImg.src)
      } catch (e) {
        Notification.error({
          title: 'bibo',
          message: '载入图片失败：' + e,
          position: 'bottom-left',
          duration: 3000
        })
        return
      }

      originImg.src = codec.decryptToUrl()
    }
  })
}
