export interface IStringHelper{
	//判断字符串是不是空
	stringIsEmpty(qStr:string):boolean ;
	//获取GUID32
	getGUID():string;
	//两个url组装
	urlCombination(qUrlA:string,qUrlB:string):string;
	urlJoinParams(qUrl:string,qKeyName:string,qkeyValue:string):string;
}

export class TStringHelper {
    //判断字符串是不是空
    public static stringIsEmpty(qStr:string):boolean {
		if (qStr==undefined || qStr == "undefined" || qStr == null || qStr == "" || qStr.trim()=="") {
			return true;
		} else {
			return false;
		}
	}
    //获取GUID32
    public static getGUID():string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	//两个url组装 判断组装的地方有没有 / \ 
	public static urlCombination(qUrlA:string,qUrlB:string):string {
		qUrlA=qUrlA.trim();
		qUrlB=qUrlB.trim();
		let lAEnd =  qUrlA.charAt(qUrlA.length-1);
		let lBStart= qUrlB.substring(0,1);
		lAEnd=lAEnd.replace("\\","/");
		lBStart=lBStart.replace("\\","/");
		if(lAEnd=="/"){
			qUrlA=qUrlA.substring(0,qUrlA.length-1);
		}
		if(lBStart=="/"){
			qUrlB=qUrlB.substring(1,qUrlB.length);
		}
		let lUrl=qUrlA+"/"+qUrlB;
        return lUrl;
	}
	public static urlJoinParams(qUrl:string,qKeyName:string,qkeyValue:string):string{
		if(qUrl.indexOf("?")>0){
			qUrl=qUrl+"&"+qKeyName+"="+qkeyValue;
		}else{
			qUrl=qUrl+"?"+qKeyName+"="+qkeyValue;
		}
		return qUrl;
	}
}