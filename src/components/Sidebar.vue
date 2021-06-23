<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
    >
      <template v-for="item in items">
        <template v-if="item.children.length > 0">
          <el-submenu :index="item.indexName" :key="item.indexName">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu
                v-if="subItem.children.length > 0"
                :index="subItem.indexName"
                :key="subItem.indexName"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="threeItem in subItem.children"
                  :key="threeItem.indexName"
                  :index="threeItem.indexName"
                  @click="DoOpenMeun(threeItem)"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.indexName"
                :key="subItem.indexName"
                @click="DoOpenMeun(subItem)"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.indexName"
            :key="item.indexName"
            @click="DoOpenMeun(item)"
          >
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { ITagItem } from "@/store";
//配合着用
@Options({})
export default class Sidebar extends Vue {
  //左边侧边菜单,当然你也可以放在公用的地方，动态生成这个数
  private items: ITagItem[] = store.state.menuList;
  public created() {}
  private get collapse(): boolean {
    return store.state.collapse;
  }
  public DoOpenMeun(item: ITagItem) {
    //点击菜单发生什么事
    this.$myEvenBus.addTag(item);
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
