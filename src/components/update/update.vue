<template>
  <van-field :label="label" required>
    <template #input>
      <van-uploader
        v-model="fileList"
        :max-count="1"
        class="van-uploader"
        :before-read="beforeRead"
        :after-read="afterRead"
        :before-delete="beforeDelete"
        upload-text="请上传JPG或PNG图片"
      />
    </template>
  </van-field>
</template>

<script>
export default {
  name: "update",
  props: {
    file: [File, Object],
    label: String
  },
  data() {
    return {
      fileList: []
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    beforeRead(file) {
      const i = file.type.indexOf("image");
      if (i !== 0) {
        this.$toast.fail("请上传\n图片类型文件");
        return false;
      }
      const M = file.size / 1024 ** 2;
      if (M > 10) {
        this.$toast.fail("请上传\n小于10M图片");
        return false;
      }
      return true;
    },
    afterRead(file) {
      this.$emit("update:file", file.file);
    },
    beforeDelete() {
    
      this.$emit("update:file", {});
    }
  }
};
</script>

<style lang="stylus" scoped>
.van-uploader
  height 80px
  width 100%
</style>
