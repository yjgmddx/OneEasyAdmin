import mitt from 'mitt'
import store, { ITagItem, defaultTag } from "@/store";

export default class EvenBus {
    public static _instance = mitt();
    public static addTag(qTagItem: ITagItem) {
        if (qTagItem.component.length <= 0) {
            //菜单展开不处理事件
            return;
        }
        store.state.tagsList.itemTags.find
        let temp = store.state.tagsList.itemTags.find((vale) => {
            return vale.indexName == qTagItem.indexName;
        });
        if (!temp) {
            //增加
            store.state.tagsList.itemTags.push(qTagItem);
        }
        EvenBus._instance.emit("changeTag", qTagItem);
    }
    public static chageTag(qTagItem: ITagItem) {
        EvenBus._instance.emit("changeTag", qTagItem);
        store.state.indexTag = qTagItem;
    }
    public static defalutTag() {
        EvenBus.chageTag(defaultTag);
    }
    public static closeTag(qTagItem: ITagItem) {
        store.state.tagsList.itemTags.find
        let temp = store.state.tagsList.itemTags.findIndex((vale) => {
            return vale.indexName == qTagItem.indexName;
        });
        if (temp >= 0) {
            store.state.tagsList.itemTags.splice(temp, 1);
            if (store.state.tagsList.itemTags.length == 0) {
                //为空就推个空的,当然也可以推主页
                EvenBus.defalutTag();
                return;
            }
            if (store.state.tagsList.itemTags.length <= temp) {
                temp = temp - 1;
            }
            let tempItem = store.state.tagsList.itemTags.find((vale, index) => {
                return index == temp;
            });
            if (tempItem != undefined) {
                EvenBus.chageTag(tempItem);
            }
        }
        //设定当前页
    }
    public static closeTagAll() {
        if (store.state.tagsList.itemTags.length > 0) {
            store.state.tagsList.itemTags = [];
            EvenBus.defalutTag();
            return;
        }
    }
    public static closeOtherTag(qTagItem: ITagItem) {
        if (store.state.tagsList.itemTags.length <= 1) {
            return;
        }
        //关闭其它,除了自已
        const curItem = store.state.tagsList.itemTags.filter(item => {
            return item.indexName == qTagItem.indexName;
        });
        store.state.tagsList.itemTags = curItem;
        EvenBus.chageTag(qTagItem);
    }
}