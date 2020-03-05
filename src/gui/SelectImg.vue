<template>
  <div>
    <p class="mb">这个功能是用来从B博之外选择图片加解密的</p>
    <el-form label-width="100px">
      <el-form-item label="处理">
        <el-switch v-model="isEncryption" active-text="加密" inactive-text="解密"></el-switch>
      </el-form-item>
      <el-form-item label="粘贴图片">
        <el-input @paste.native.prevent="onPaste" placeholder="也可以在此处粘贴图片"></el-input>
      </el-form-item>
      <el-form-item label="选择图片">
        <el-upload action="" drag multiple list-type="picture" :file-list="fileList"
          :before-upload="onUpload" :on-remove="handleChange" :on-preview="onPreview"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-dialog :title="largeImgTitle" :visible.sync="largeImgVisible" append-to-body @closed="onPreviewClosed">
      <a href="#" @click.prevent="onClickLargeImg">
        <img class="image" :src="largeImgUrl">
      </a>
    </el-dialog>
  </div>
</template>

<script>
import {Notification} from 'element-ui'
import {createCodec, dataUrlToBlob} from '@/codec'

export default {
  data () {
    return {
      isEncryption: true,
      fileList: [],
      largeImgTitle: '',
      largeImgVisible: false,
      largeImgUrl: '',
      largeImgUrlForOpen: ''
    }
  },
  methods: {
    onPaste (event) {
      for (let item of event.clipboardData.items) {
        let file = item.getAsFile()
        if (file) {
          this.handleFile(file)
        }
      }
    },
    onUpload (file) {
      this.handleFile(file)
      return false
    },
    async handleFile (file) {
      if (!file.type.startsWith('image') || file.type === 'image/gif') { // 不支持GIF
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
        return
      }

      let url
      if (this.isEncryption) {
        url = URL.createObjectURL(codec.encryptToBlob())
      } else {
        url = codec.decryptToUrl()
      }
      this.fileList.push({name: file.name, url: url})
    },
    // 添加和删除文件都会调用，可能是element的bug
    handleChange (file, fileList) {
      if (file.status === 'success') {
        // 正在删除
        if (file.url.startsWith('blob:')) {
          URL.revokeObjectURL(file.url)
        }
      }
      // 不改变this.fileList会有无法删除的问题
      this.fileList = fileList
    },
    onPreview (file) {
      this.largeImgTitle = file.name
      this.largeImgUrl = file.url
      this.largeImgUrlForOpen = ''
      this.largeImgVisible = true
    },
    onPreviewClosed () {
      if (this.largeImgUrlForOpen !== '' && this.largeImgUrlForOpen !== this.largeImgUrl) {
        URL.revokeObjectURL(this.largeImgUrlForOpen)
        this.largeImgUrlForOpen = ''
      }
    },
    onClickLargeImg () {
      if (this.largeImgUrlForOpen === '') {
        if (this.largeImgUrl.startsWith('data:')) {
          // 无法直接打开data URL，需要转成blob再创建短URL
          let blob = dataUrlToBlob(this.largeImgUrl)
          this.largeImgUrlForOpen = URL.createObjectURL(blob)
        } else {
          this.largeImgUrlForOpen = this.largeImgUrl
        }
      }
      window.open(this.largeImgUrlForOpen) // Edge还是不允许打开blob URL，没办法了
    }
  }
}
</script>

<style scoped>
.mb {
  margin-bottom: 1em;
}

.image {
  width: 100%;
}
</style>
