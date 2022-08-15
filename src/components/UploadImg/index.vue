<template>
  <div>
    <el-upload
      action="#"
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :file-list="fileList"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :before-upload="beforeUpload"
      list-type="picture-card"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="showImg">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDrkX7TaS6VfaKrFYiiW8g3C6lBMIzQcZG',
  SecretKey: 'WmnZnxvfDWcXFk7vYx72iGclgNtFOK2W'
})
console.log(cos)

// id:
// password:
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      showImg: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      //   console.log('2395876')
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hrhm-31-1313341536' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: 'file.name' /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          if (err || data.statusCode !== 200) {
            return this.$message.error('亲，上传失败')
          }
          this.$emit('onSuccess', {
            url: 'http://' + data.Location
          })
          this.loading = false
          console.log(err || data)
        }
      )
    },
    onChange(file, fileList) {
      //   console.log('348965', fileList)
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      //   console.log('348965', fileList)
      this.fileList = fileList
    },
    onPreview(file) {
      //   console.log(file)
      this.showImg = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // 限制图片的格式
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过2Mb')
        return false
      }
      //   console.log('上传前的检查', file)
    }
  }
}
</script>

<style lang="scss">
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>
