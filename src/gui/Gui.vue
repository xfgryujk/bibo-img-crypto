<template>
  <div>
    <el-tooltip class="item" content="发色图救救北极熊">
      <a href="#" @click.prevent="openGui" class="gui-button">
        <img src="https://i1.hdslb.com/bfs/face/3c5dc62088ea59eec7282f163d5fe1c59353ddc1.jpg_64x64.jpg" width="64px" height="64px">
      </a>
    </el-tooltip>

    <el-dialog title="bibo-img-crypto v0.1.0" :visible.sync="dialogVisible">
      <el-tabs>
        <el-tab-pane label="常规">
          <el-form label-width="100px">
            <el-form-item label="加密">
              <el-switch v-model="form.enableEncryption"></el-switch>
            </el-form-item>
            <el-form-item label="解密">
              <el-switch v-model="form.enableDecryption"></el-switch>
            </el-form-item>
            <el-form-item label="算法">
              <el-select v-model="form.codecName" placeholder="无">
                <el-option label="反色" value="InvertCodec"></el-option>
                <el-option label="RGB随机置乱" value="ShuffleRgbCodec"></el-option>
                <el-option label="块随机置乱" value="ShuffleBlockCodec"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="随机种子">
              <el-input v-model="form.randomSeed"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="选择图片">
          <select-img></select-img>
        </el-tab-pane>

        <el-tab-pane label="帮助和关于">
          <div class="child-mb">
            <p>
              使用方法：上传图片时自动加密，在图片上点击鼠标右键自动解密。加密解密时的算法、随机种子必须一致
            </p>
            <p>
              作者：xfgryujk，B站 <a href="https://space.bilibili.com/300474" target="_blank">@xfgryujk</a>。本项目以 MIT 协议开源，<a href="https://github.com/xfgryujk/bibo-img-crypto" target="_blank">上 GitHub 获取源码</a>
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getConfig, setConfig} from '@/config'
import SelectImg from './SelectImg'

export default {
  components: {
    SelectImg
  },
  data () {
    return {
      dialogVisible: false,
      form: getConfig()
    }
  },
  methods: {
    openGui () {
      this.dialogVisible = true
      this.form = getConfig()
    },
    onOk () {
      this.dialogVisible = false
      setConfig(this.form)
    }
  }
}
</script>

<style scoped>
.gui-button {
  position: fixed;
  left: 0;
  bottom: 0;
}

.child-mb * {
  margin-bottom: 1em;
}
</style>
