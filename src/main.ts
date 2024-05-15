import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupI18n } from "/@/locales/setupI18n";
import { createPinia } from "pinia";
import "./assets/css/app.scss";
import { registerGlobalComp } from "./utils/registerGlobalComp";

import {
  // create naive ui
  create,
  // component
  NConfigProvider,
  NButton,
  NButtonGroup,
  NDropdown,
  NInput,
  NSelect,
  NSwitch,
  NDivider,
  NTooltip,
  NSlider,
  NIconWrapper,
  NSkeleton,
  NTag,
  NPopover,
} from "naive-ui";

async function bootstrap() {
  const naive = create({
    components: [
      NConfigProvider,
      NButton,
      NButtonGroup,
      NDropdown,
      NInput,
      NSelect,
      NSwitch,
      NDivider,
      NTooltip,
      NPopover,
      NSlider,
      NIconWrapper,
      NSkeleton,
      NTag,
    ],
  });
  const app = createApp(App)
    .use(router)
    .use(createPinia())
    .use(naive)
    

     registerGlobalComp(app)

  await setupI18n(app);

  app.mount("#app");
}
bootstrap();
