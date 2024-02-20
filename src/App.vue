<template>
  <div>
    <img :src="!showCropper || croppedImage? imgSrc : croppedImage" id="imageToCrop" alt="你的頭像">
    <vue-cropper
      v-if="showCropper"
      ref="cropper"
      :src="imgSrc"
      :option="{
        aspectRatio: 1,
        autoCropWidth: 200,
        autoCropHeight: 200,
        zoomTo: 0.5
      }"
      @crop-end="cropEnd"
      @ready="ready"
    ></vue-cropper>
  
    <button @click="toggleCropper">{{ showCropper ? '完成' : '开始裁剪' }}</button>
    
    
    <div>
      <input v-model="userInput" placeholder="請輸入entity的名字">
      <p>你輸入的是: {{ userInput }}</p>

      <img :src="croppedImage" id="imageToCrop" alt="你的頭像">
      
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';



export default {
  data() {
    return {
      userInput: '',
      imgSrc: '/whitecat4.png',
      croppedImage: null,
      showCropper: false,
    }
  },
  components: {
    vueCropper: VueCropper
  },
  methods: {
    changeAspectRatio() {
        var img = new Image();
        img.onload = () => {
          this.$refs.cropper.cropper.setAspectRatio(img.width / img.height);
        }
        img.src = this.imgSrc;
    },
    toggleCropper() {
      if (this.showCropper) {
        // 使用 getCroppedCanvas 取得裁剪後的圖像
        this.croppedImage = this.$refs.cropper.getCroppedCanvas().toDataURL();
      } else {
        // 在開始裁剪前，將裁剪結果清空
        this.croppedImage = null;
      }
      this.showCropper = !this.showCropper;
    },
    ready() {
      // 現在你可以做你想做的事，例如顯示裁剪後的圖像，或者將它保存到伺服器
      console.log('The cropper is ready');
    }   
  },
  // 在創建組件的時候打印 logs
  created() {
    var img = new Image();
    img.onload = () => {
      this.imgWidth = img.width;
      this.imgHeight = img.height;
    }
    img.src = this.imgSrc;
    console.log("圖片路徑:", this.imgSrc);
  },
  mounted() {
    this.$refs.cropper.cropper.setAspectRatio(this.imgWidth / this.imgHeight);
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.vue-cropper {
  position: absolute;
  z-index: 1;
}
#imageToCrop {
  position: relative;
  z-index: 0;
 
}
</style>
