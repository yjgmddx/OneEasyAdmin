<template>
  <div class="tags">
    <ul>
      <li
        class="tags-li"
        v-for="item in tagsList"
        :class="{ active: isActive(item) }"
        :key="item.indexName"
        @click="changeTag(item)"
      >
        <span class="tags-li-title">{{ item.title }}</span>
        <span class="tags-li-icon" @click="closeTag(item)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown trigger="click">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item @click="closeOtherTag">关闭其他</el-dropdown-item>
            <el-dropdown-item @click="closeTagAll">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { ITagItem } from "@/store";
//配合着用
@Options({
  computed: {},
  methods: {},
})
export default class Tags extends Vue {
  private FIndexTagItem: ITagItem | undefined;
  private tagsList: ITagItem[] = [];
  public created() {
    this.$myEvenBus._instance.on("changeTag", (qItem) => {
      this.FIndexTagItem = qItem as ITagItem;
      this.tagsList = store.state.tagsList.itemTags;
    });
  }
  private isActive(qItem: ITagItem): boolean {
    if (this.FIndexTagItem == undefined) {
      return false;
    }
    return this.FIndexTagItem.indexName == qItem.indexName;
  }
  private changeTag(qItem: ITagItem) {
    this.$myEvenBus.chageTag(qItem);
  }
  private closeTag(qItem: ITagItem) {
    this.$myEvenBus.closeTag(qItem);
    //阻断上层控件click事件
    this.cancelBubble(window.event);
  }
  private closeOtherTag() {
    if (this.FIndexTagItem != undefined) {
      this.$myEvenBus.closeOtherTag(this.FIndexTagItem);
    }
  }
  private closeTagAll() {
    this.$myEvenBus.closeTagAll();
  }
  private cancelBubble(e: any) {
    var evt = e ? e : window.event;
    if (evt.stopPropagation) {
      //W3C
      evt.stopPropagation();
    } else {
      //IE
      evt.cancelBubble = true;
    }
  }
}
</script>

<style>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
