import smartcity from "/@/views/Projects/Smartcity.vue";
import { Icon } from "/@/uikits/Icon";


export function registerGlobalComp(app: any) {
  app.component("smartcity", smartcity);
  app.component("Icon", Icon)

}

