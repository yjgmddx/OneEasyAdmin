import axios, { Method } from "axios"
import store from "@/store";
import { TStringHelper } from "./StringHelper";
import md5 from 'js-md5';
//TResult返回的代码，我自已的业务规定 ,你们可以自已修改成自已的代码
const TResultCode = {
    resultInit: "0000",
    resultTrue: "0001",
    resultFail: "0002",
}

//把 TResult转成泛型结果集 IResult<你resultData数据类型> 如 IResult<TUserInfo>
export interface IResult<T> {
    resultSuccess: boolean;
    resultCode: string;
    resultMsg: string;
    resultData: T;
    resultFormat: string;
}

//服务端返回来的结果集,当然你们有自已的格式，自已参才改
export class TResult {
    public resultSuccess: boolean = false;
    public resultCode: string = "";
    public resultMsg: string = "";
    public resultData: any = null;
    public resultFormat: string = "json"; //string(字符串),jsonstring(JSON格式字符串),json(json);
    static createNew(): TResult {
        return new TResult();
    }
}

//
export interface IHTTPRequest {
    createNew(): THTTPRequest;
    createNewNoResult(): THTTPRequest;
    setHeadersUrlencoded(): void;
    initModuleData(): void;
    httpDO(): void;
    get(): void;
    post(): void;
    httpDoAsync(): Promise<TResult>;
    getAsync(): Promise<TResult>;
    postAsync: Promise<TResult>;

}


//定义一个请求其相关类容
export class THTTPRequest {
    public url: string = "";  //请求的URL
    public method: Method = 'post';
    public headers: any = { "Content-Type": "application/json" };
    public data: any = null;    //数据
    public onSuccess = function (response: TResult) { }; //执行成功事件
    public onFailed = function (response: TResult) { };  //执行失败事件
    public onError = function (response: TResult) { };  //执行异常事件
    public isResult = true;  //返回的是个标准接口格式(TResult)
    //创建一个对象
    static createNew(): THTTPRequest {
        let lRequest = new THTTPRequest();
        lRequest.isResult = true; //返回的结果是标准数据
        return lRequest;
    }
    static createNewNoResult(): THTTPRequest {
        let lRequest = new THTTPRequest();
        lRequest.isResult = false; //返回的结果自已解析
        return lRequest;
    }
    //公共方法
    //"Content-Type": "application/x-www-form-urlencoded"
    public setHeadersUrlencoded() {
        this.headers = { "Content-Type": "application/x-www-form-urlencoded" }
    }
    //快捷方法
    public httpDO() {
        THTTPClient.httpDO(this);
    }

    public get() {
        THTTPClient.httpGet(this);
    }

    public post() {
        THTTPClient.httpPost(this);
    }

    public async httpDoAsync(): Promise<TResult> {
        return await THTTPClient.httpDoAsync(this);
    }

    public async getAsync(): Promise<TResult> {
        return await THTTPClient.httpGetAsync(this);
    }

    public async postAsync(): Promise<TResult> {
        return await THTTPClient.httpPostAsync(this);
    }
}

export interface IHTTPClient {
    httpDO(qRequest: THTTPRequest): void;
    httpDoAsync(qRequest: THTTPRequest): Promise<TResult>;
    httpGet(qRequest: THTTPRequest, qUrlencoded?: boolean): void;
    httpPost(qRequest: THTTPRequest): void;
    httpPut(qRequest: THTTPRequest): void;
    httpDelete(qRequest: THTTPRequest): void;
    httpGetAsync(qRequest: THTTPRequest, qUrlencoded?: boolean): Promise<TResult>;
    httpPostAsync(qRequest: THTTPRequest): Promise<TResult>;
    httpPutAsync(qRequest: THTTPRequest): Promise<TResult>;
    httpDeleteAsync(qRequest: THTTPRequest): Promise<TResult>;
}
//HTTP请求客户端
export class THTTPClient {
    //URL签名 加全安全性
    public static urlMakeSign(qUrl: string): string {
        return qUrl;
    }
    //HTTP请求
    public static httpDO(qRequest: THTTPRequest) {
        //URL处理
        qRequest.url = THTTPClient.urlMakeSign(qRequest.url);
        axios({
            method: qRequest.method,
            url: qRequest.url,
            headers: qRequest.headers,
            data: qRequest.data
        }).then(
            //成功执行的事件
            function (response) {
                if (qRequest.onSuccess != null) {
                    if (qRequest.isResult) {
                        let lResult = TResult.createNew();
                        lResult.resultCode = response.data.resultCode;
                        lResult.resultMsg = response.data.resultMsg;
                        lResult.resultFormat = response.data.resultFormat;
                        lResult.resultData = response.data.resultData;
                        if (lResult.resultCode == TResultCode.resultTrue) {
                            lResult.resultSuccess = true;
                            if (qRequest.onSuccess != null) {
                                qRequest.onSuccess(lResult);
                            }
                        } else {
                            if (qRequest.onFailed != null) {
                                qRequest.onFailed(lResult);
                            }
                        }
                    } else {
                        //非标准的Result格式
                        let lResult = TResult.createNew();
                        lResult.resultData = response.data;
                        if (qRequest.onSuccess != null) {
                            qRequest.onSuccess(lResult);
                        }
                    }
                }
            })
            .catch(function (error) {
                if (qRequest.onError != null) {
                    let lResult = TResult.createNew();
                    lResult.resultMsg = JSON.stringify(error);
                    qRequest.onError(lResult)
                }
            });
    }
    //HTTP异步请求
    public static async httpDoAsync(qRequest: THTTPRequest): Promise<TResult> {
        //token签名
        qRequest.url = THTTPClient.urlMakeSign(qRequest.url);
        let lResult = TResult.createNew();
        try {
            var response = await axios.request({
                method: qRequest.method,
                url: qRequest.url,
                headers: qRequest.headers,
                data: qRequest.data
            });
            if (response.status == 200) {
                if (qRequest.isResult) {
                    lResult.resultCode = response.data.resultCode;
                    lResult.resultMsg = response.data.resultMsg;
                    lResult.resultFormat = response.data.resultFormat;
                    lResult.resultData = response.data.resultData;
                    if (lResult.resultCode == TResultCode.resultTrue) {
                        lResult.resultSuccess = true;
                    }
                } else {
                    //非标准的Result格式
                    lResult.resultData = response.data;
                }
            }
        } catch (error) {
            if (error != undefined) {
                lResult.resultMsg = "异常错误【" + JSON.stringify(error) + "】";
            } else {
                lResult.resultMsg = JSON.stringify(error);
            }
        } finally {

        }
        return lResult;
    }
    //常用的一些快捷请求
    public static httpGet(qRequest: THTTPRequest, qUrlencoded: boolean = true) {
        qRequest.method = 'get';
        if (qUrlencoded) {
            qRequest.setHeadersUrlencoded();
        }
        THTTPClient.httpDO(qRequest);
    }
    public static httpPost(qRequest: THTTPRequest) {
        qRequest.method = 'post';
        THTTPClient.httpDO(qRequest);
    }
    public static httpPut(qRequest: THTTPRequest) {
        qRequest.method = 'PUT';
        THTTPClient.httpDO(qRequest);
    }
    public static httpDelete(qRequest: THTTPRequest) {
        qRequest.method = 'delete';
        THTTPClient.httpDO(qRequest);
    }
    // async
    public static async httpGetAsync(qRequest: THTTPRequest, qUrlencoded: boolean = true): Promise<TResult> {
        qRequest.method = 'get';
        if (qUrlencoded) {
            qRequest.setHeadersUrlencoded();
        }
        return await this.httpDoAsync(qRequest);
    }
    public static async httpPostAsync(qRequest: THTTPRequest): Promise<TResult> {
        qRequest.method = 'post';
        return await this.httpDoAsync(qRequest);
    }
    public static async httpPutAsync(qRequest: THTTPRequest): Promise<TResult> {
        qRequest.method = 'PUT';
        return await this.httpDoAsync(qRequest);
    }
    public static async httpDeleteAsync(qRequest: THTTPRequest): Promise<TResult> {
        qRequest.method = 'delete';
        return await this.httpDoAsync(qRequest);
    }
}

export default THTTPClient