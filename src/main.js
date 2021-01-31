import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import Router from "./router";
import Store from "./store";

const app = createApp(App);

app.use(Router);
app.use(Store);

app.mount("#app");
