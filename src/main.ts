import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupI18n } from "/@/locales/setupI18n";
import { createPinia } from "pinia";
import "./assets/css/app.scss";
import {
  // create naive ui
  create,
  // component
  NButton,
  NDropdown,
  NInput,
} from "naive-ui";

async function bootstrap() {
  const naive = create({
    components: [NButton, NDropdown, NInput],
  });
  const app = createApp(App)
    .use(router)
    .use(createPinia())
    .use(naive)
    .mount("#app");

  await setupI18n(app);
}
bootstrap();
