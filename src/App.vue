<template>
  <router-view />
</template>

<script  lang="ts">
import { Options, Vue } from "vue-class-component";
//配合着用
@Options({
  components: {},
  computed: {},
})
export default class App extends Vue {
  public created() {
    document.title = "One easy admin 平台框架";
  }
}
</script>
<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
