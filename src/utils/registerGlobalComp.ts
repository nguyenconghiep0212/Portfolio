import Smartcity from "/@/views/Projects/Smartcity.vue";
import Avatar from "/@/views/Projects/Avatar.vue";
import Chatbot from "/@/views/Projects/Chatbot.vue";
import Hawkice from "/@/views/Projects/Hawkice.vue";
import Imint from "/@/views/Projects/Imint.vue";
import { Icon } from "/@/uikits/Icon";


export function registerGlobalComp(app: any) {
  app.component("Smartcity", Smartcity);
  app.component("Avatar", Avatar);
  app.component("Chatbot", Chatbot);
  app.component("Hawkice", Hawkice);
  app.component("Imint", Imint);
  app.component("Icon", Icon)

}

