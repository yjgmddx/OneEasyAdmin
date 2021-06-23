import { createStore } from 'vuex'

export interface ITagItem {
    indexName: string;  //索引值一般是唯一的，同个控件indexName不同就可以多开
    component: string;  //挂载的组件
    title: string;  //标题
    icon: string; //图标
    params: any; //参数
    children: ITagItem[]; //子菜单
}
//菜单
export const defaultMenu: ITagItem[] = [
    {
        indexName: "TDashboard",
        component: "TDashboard",
        title: "主页",
        icon: "el-icon-s-home",
        params: {},
        children: [],
    },
    {
        indexName: "TDashboard2",
        component: "TDashboard",
        title: "主页2-多开测试",
        icon: "el-icon-s-home",
        params: {},
        children: [],
    },
    {
        indexName: "TAbout",
        component: "TAbout",
        title: "关于",
        icon: "el-icon-s-home",
        params: { "参数1": "值1" },
        children: [],
    },
];

export const defaultTag: ITagItem = {
    indexName: "-1", //索引值一般是唯一的
    component: '',  //挂载的组件
    title: '',  //标题
    icon: '',//图标
    params: {},//参数
    children: []
};

export class TTagList {
    itemTags: ITagItem[] = [];
}
export default createStore({
    state: {
        tagsList: new TTagList(),
        menuList: defaultMenu,
        indexTag: defaultTag,
        collapse: false,
    },
    mutations: {
        hadndleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
})