<template>
  <van-field :label="label" required>
    <template #input>
      <van-uploader
        v-model="fileList"
        :max-count="9"
        class="van-uploader"
        :before-read="beforeRead"
        :before-delete="beforeDelete"
        upload-text="请上传JPG或PNG图片"
      />
    </template>
  </van-field>
</template>

<script>
import { fileAdd, fileDel } from "../../api";
export default {
  name: "update",
  props: {
    fileIdTmp: Array,
    label: String
  },
  data() {
    return {
      fileList: [],
      fileId: []
    };
  },
  components: {},
  computed: {},
  created() {},
  watch: {
    fileId() {
      this.$emit("update:fileIdTmp", this.fileId);
    }
  },
  methods: {
    async beforeRead(file) {
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
      const show = await fileAdd(file);
      if (show.ret === "200") {
        this.fileId = this.fileId.concat([show.data]);
        return true;
      }
    },
    async beforeDelete(file, detail) {
      const index = detail.index;
      const show = await fileDel(this.fileId[index]);
      if (show.ret === "200") {
        this.fileId = this.fileId.filter((d, i) => index !== i);
        return true;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.van-uploader
  width 100%
</style>
