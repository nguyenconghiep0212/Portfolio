import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupI18n } from '/@/locales/setupI18n';
import { createPinia } from "pinia";
import "./assets/css/app.scss";

async function bootstrap() {
  const app = createApp(App).use(router).use(createPinia()).mount("#app");

  await setupI18n(app);
}
bootstrap();
