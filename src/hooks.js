import {encrypt, decrypt} from './codec'
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
  window.XMLHttpRequest.prototype.send = function (data) {
    if (!getConfig().enableEncryption || !this.__bibo__ || !this.__bibo__.url.endsWith('/drawImage/upload')) {
      originalSend.call(this, data)
      return
    }
    let file = data.get('file_up')
    if (!file || file.type === 'image/gif') {
      originalSend.call(this, data)
      return
    }
    let oldImgUrl = URL.createObjectURL(file)
    let img = new Image()
    img.onload = () => {
      let blob = encrypt(img)
      URL.revokeObjectURL(oldImgUrl)
      data.delete('file_up')
      data.set('file_up', blob)
      originalSend.call(this, data)
    }
    img.src = oldImgUrl
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
      let url = await decrypt(originImg)
      if (url) {
        originImg.src = url
      }
    }
  })
}
