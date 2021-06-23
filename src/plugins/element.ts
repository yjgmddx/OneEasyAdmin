import ElementPlus, { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';

type evenCallBack = (isConfirm: boolean) => void; //事件回调
export class TElmMsgHelper {
  public static msgHintAutoClose(qMsg: string) {
    ElMessage({ message: qMsg, showClose: true, duration: 3000, center: true });
  }
  public static msgHintNotClose(qMsg: string) {
    ElMessage({ message: qMsg, showClose: true, duration: 0, center: true });
  }
  public static msgDialog(qMsg: string) {
    ElMessageBox({ title: "消息提示", message: qMsg, center: true, showConfirmButton: true, showCancelButton: false });
  }
  public static msgDialogAutoClose(qMsg: string) {
    ElMessageBox({ title: "消息提示", message: qMsg, center: true, showConfirmButton: true, showCancelButton: true });
    setTimeout(() => {
      ElMessageBox.close();
    }, 3000)
  }
  public static msgDialogConfirm(qMsg: string, evenCallBack: evenCallBack) {
    ElMessageBox({
      title: "消息提示", message: qMsg, center: true, showConfirmButton: true, showCancelButton: true, callback: (action: string) => {
        if (action == "confirm") {
          evenCallBack(true);
        } else {
          evenCallBack(false);
        }
      }
    });
  }
  //遮罩层
  public static loadingInstance: ILoadingInstance;
  public static msgLoading(qMsg: string = "") {
    if (qMsg.length == 0) {
      qMsg = "加载中请稍候";
    }
    TElmMsgHelper.loadingInstance = ElLoading.service({ fullscreen: false, text: qMsg, background: 'rgba(0, 0, 0, 0.7)' });
  }
  public static msgLoadingClose() {
    if (TElmMsgHelper.loadingInstance != undefined) {
      TElmMsgHelper.loadingInstance.close();
    }
  }
}
export default (app: any) => {
  app.use(ElementPlus, { locale: localeZH })
}
