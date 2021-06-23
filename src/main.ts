import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入网络请求库
import axios from 'axios'
//HTTP请求封装
import { THTTPRequest, IHTTPRequest, IHTTPClient, THTTPClient } from "../src/baselib/helper/HTTPClient"
//基本的API
import TBaseAPI from "../src/baselib/BaseApi"
//字符串相关的函数扩展
import { IStringHelper, TStringHelper } from "../src/baselib/helper/StringHelper"
//公共变量
import { TGlobal, IGlobal } from "../src/baselib/helper/GlobalHelper"
//
import EvenBus from '@/evenBus/index'
//引入ElementUI库
import installElementPlus, { TElmMsgHelper } from './plugins/element'
import './assets/css/icon.css'
import comRegister from "@/views/zComRegister";


//*********************axios拦截***************/

axios.interceptors.request.use(
    config => {
        // 改变vuex中的isLoading状态数据，当为true，loading显示
        TElmMsgHelper.msgLoading();
        return config;
    }
);
// 响应拦截器
axios.interceptors.response.use(
    response => {
        TElmMsgHelper.msgLoadingClose();
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            //loading隐藏
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        TElmMsgHelper.msgLoadingClose();
        return Promise.reject(error);
    }
);


//*********************注入this.$全局提醒**************************************
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $myBaseAPI: typeof TBaseAPI;
        $myHTTPRequest: typeof THTTPRequest;
        $myHTTPCleint: typeof THTTPClient;
        $myGlobal: typeof TGlobal;
        $myStrHelper: typeof TStringHelper;
        $myEvenBus: typeof EvenBus;
        $myMsgHelp: typeof TElmMsgHelper;
    }
}


//获取myConfig.json配置
async function getMyConfig(): Promise<boolean> {
    let timestamp = Date.now();
    let lConfigUrl = "./myConfig.json?timestamp=" + timestamp;
    let lHTTPRequest = new THTTPRequest();
    lHTTPRequest.url = lConfigUrl;
    lHTTPRequest.isResult = false;
    let lResult = await lHTTPRequest.getAsync();
    if (TStringHelper.stringIsEmpty(lResult.resultData.apiBaseUrl)) {
        alert(
            "参数【apiBaseUrl】，不存在,请求结果【" +
            JSON.stringify(lResult.resultData) +
            "】"
        );
        return false;
    }
    TGlobal.apiBaseUrl = lResult.resultData.apiBaseUrl;
    TGlobal.appTitle = lResult.resultData.appTitle;
    return true;
}
if (getMyConfig()) {
    const app = createApp(App)
    installElementPlus(app)
    app.use(store)
    app.use(router)
    app.config.globalProperties.$myHTTPRequest = THTTPRequest;
    app.config.globalProperties.$myHTTPCleint = THTTPClient;
    app.config.globalProperties.$myGlobal = TGlobal;
    app.config.globalProperties.$myStrHelper = TStringHelper;
    app.config.globalProperties.$myBaseAPI = TBaseAPI;
    app.config.globalProperties.$myEvenBus = EvenBus;
    app.config.globalProperties.$myMsgHelp = TElmMsgHelper;
    comRegister(app);
    app.mount('#app')
}
