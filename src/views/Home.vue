<template>
  <div class="about">
    <!-- 左侧菜单导航栏 -->
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-header />
      <v-tags ref="menuTags"></v-tags>
      <div class="content">
        <el-tabs id="homTable" v-model="FIndexName">
          <el-tab-pane
            v-for="item in tagsList"
            :key="item.indexName"
            :name="item.indexName"
            :label="item.title"
          >
            <component :is="item.component" :indexTag="item"></component>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { defaultTag, ITagItem } from "@/store";
import vHeader from "../components/Header";
import vSidebar from "../components/Sidebar";
import vTags from "../components/Tags.vue";
import EvenBus from "@/evenBus";

//配合着用
@Options({
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  computed: {},
})
export default class Home extends Vue {
  public FIndexName: string = "";
  private get tagsList(): ITagItem[] {
    return store.state.tagsList.itemTags;
  }
  public created() {
    this.$myEvenBus._instance.on("changeTag", (qItem) => {
      this.FIndexName = (qItem as ITagItem).indexName;
    });
  }
  private changeIndexName(qTagItem: ITagItem) {}
  private get collapse(): boolean {
    return store.state.collapse;
  }
  public mounted() {
    //打开默认菜单测试
    let tempTag: ITagItem = {
      indexName: "TDashboard",
      component: "TDashboard",
      title: "主页",
      icon: "el-icon-s-home",
      params: {},
      children: [],
    };
    EvenBus.addTag(tempTag);
  }
}
</script>
<style scope>
/* 设定homeTale不显示标签 */
#homTable > .el-tabs__header {
  visibility: hidden;
  height: 0;
  margin: 0;
}
</style>