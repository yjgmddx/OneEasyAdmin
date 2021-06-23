<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>参数信息获取{{ tagInfo }}</h1>
  </div>
</template>
<script  lang="ts">
import { defaultTag, ITagItem } from "@/store";
import { Options, Vue } from "vue-class-component";
import BaseForm from "./BaseForm";
//配合着用
@Options({
  components: {},
  computed: {},
})
export default class About extends BaseForm {
  private tagInfo: string = "";
  public created() {
    this.tagInfo = JSON.stringify(this.$props.indexTag);
  }
}
</script>