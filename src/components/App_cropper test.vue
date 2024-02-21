<template>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="/whitecat4.png"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :fixed="option.fixed"
            :fixed-number="option.fixedNumber"
            :center-box="option.centerBox"
            :info-true="option.infoTrue"
            :fixed-box="option.fixedBox"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
</template>
​
<script>




export default {
    data(){
        return {
            imgFile:''
        }
    }
    components: {
        cropperDlg
    },
    methods: {
        // 接收裁剪照片
        cropperImg(file) {
          this.imgFile = file
        },
        // 裁剪图片弹框 
        openCropper() {
          if (this.$refs.cropperDlg && this.imgFile) {
            const _f = this.imgFile
            const _file = this.dataURLtoFile(_f, 'fileCropp.png')
            // console.log(_file)
            const _fileInfo = {
                url: _f,
                size: _file.size,
                file: _file
            }
            this.$refs.cropperDlg.changeImage(_fileInfo)
          }
        },
        // 文件转base64
        readFile(file, callback) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            callback(e.target.result)
          }
        },
        // base64转文件
        dataURLtoFile(dataurl, filename) {
          var arr = dataurl.split(',')
          var mime = arr[0].match(/:(.*?);/)[1]
          var bstr = atob(arr[1])
          var n = bstr.length
          var u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          return new File([u8arr], filename, { type: mime })
        },
    }
}
