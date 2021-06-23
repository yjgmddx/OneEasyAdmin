<template>
  <div style="margin-bottom: 50px">
    <div style="color: red; text-align: center; width: 100%">
      <h1>平台开源介绍说明</h1>
    </div>
    <div>
      <h2>平台基于【 vue3+typesciprt+element-plus】</h2>
      <h3>
        平台是个超简易的入手平台,vue-elm-admin
        扩展的一大堆功能统统抛弃，越庞大对新手越不友好，连我这老鸟看着多头痛,从简单做起。然后要什么在从官方DEMOCOPY模块过来！值得你拥有
      </h3>
      <h3>其它主要插件【axios】</h3>
      <h3 style="color: red">
        平台特色:全用TS实现写的，有助于团队合作和维护;平台支持一个页面多开，例如列表打开明细，打开多个明细界面;
      </h3>

      <div style="height: 20px"></div>
      <h2 class="color:red">认识平台:</h2>
      <h2>1.目录 baselib 自已封装的一些库，只开放一些常用的基本的</h2>
      <h3>
        &nbsp; &nbsp; 1.1 HTTPClient.ts
        HTTP交互单元,做了封装，我自认为封装的还不错,当然还有很多细节还没考虑
      </h3>
      <h3>&nbsp; &nbsp; 1.2 BaseApi.ts 与HTTP交互一些事例</h3>
      <h2>2.目录 components 整体主界面布局</h2>
      <h2>3.目录 evenBus 公共事件中心,菜单触发多在此控制</h2>
      <h2>
        4.router
        路由,没什么好说的，这些是搞VUE必备的知识！重点充分利用好路由【前置守卫】,可以很好达到界面权限控制,但本平台采用的是tablePanle当容器放component，
        基本没路由说法，只需要在打开菜单公共事件控件权限即可，如需要路由版的，后面我在开源个版。
      </h2>
      <h2>5.store 存储,没什么好说的，这些是搞VUE必备的知识</h2>
      <h3>&nbsp; &nbsp; 5.1 ITagItem主要说下这个，菜单还有标题基类</h3>
      <h2>6.views 页面</h2>
      <h3>&nbsp; &nbsp; 6.1 zComRegister.ts主界面控件展示的核心注册控件单元</h3>
      <h3>
        &nbsp; &nbsp; 6.2 Home.vue 主界面
        主要是布局的展示，以及页面当控件的展示区域
      </h3>
    </div>
    <div style="height: 20px"></div>
    <h2 style="color: red">支持作者:</h2>
    <el-row>
      <el-col :span="12"><el-image :src="imgWX"></el-image></el-col>
      <el-col :span="12"><el-image :src="imgZFB"></el-image></el-col>
    </el-row>
    <div style="height: 20px"></div>
    <h2 style="color: red">运行安装:</h2>
    <h3>执行命令 npm install 即可</h3>
    <h3>执行命令 npm serve 启动程序</h3>
    <h3>如遇到编译不过去的删除 package-lock.json ，然后在 npm install</h3>
    <div style="color: red; text-align: right; width: 100%">
      <h3>作者:Flm(范联满)</h3>
      <h3>联系QQ:378464060</h3>
      <h3>QQ交流群:437551621</h3>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
//配合着用
@Options({
  data() {
    return {
      imgWX: require("@/assets/img/微信收款码.png"),
      imgZFB: require("@/assets/img/支付宝收款码.png"),
    };
  },
})
export default class Dashboard extends Vue {
  public created() {}
}
</script>
<style scoped>
</style>