import { ITagItem } from "@/store";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
//如果要获取菜单传进来的参数,继承此类
//在展示控件时，会把 ITagItem信息放到 indexTag参数
export default class BaseForm extends Vue {
    //props写法
    @Prop() indexTag?: ITagItem;
    declare $props: {
        indexTag: ITagItem;
    };
}