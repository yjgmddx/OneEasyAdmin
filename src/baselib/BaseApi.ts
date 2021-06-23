//一些基本API事例写法参考着用
import { IResult, THTTPRequest, TResult } from "./helper/HTTPClient"
import { TGlobal } from "./helper/GlobalHelper"
export class TUser{
    userID:string="";
    userName:string="";
}
//HTTP用法试例
export default class TBaseAPI {
    //刷新服务端模板
    public static async initModule(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/fastService/FastAPI/InitModule");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        return lResult;
    }
    //用户角色登陆 把结果 lResult.ResultData主动转成 TUser
    public static async userLogin(qLoginCode: string, qLoginPass: string, verCode: string = ""): Promise<IResult<TUser>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/BaseUser/UserLogin");
        lRequest.data = { "loginCode": qLoginCode, "loginPass": qLoginPass, "verCode": verCode }
        lResult = await lRequest.postAsync();
        return lResult;
    }
    //把结果 lResult.ResultData主动转成 TUser[]
    public static async getUserList(): Promise<IResult<TUser[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/BaseUser/UserLogin");
        lRequest.data = {}
        lResult = await lRequest.postAsync();
        return lResult;
    }
}