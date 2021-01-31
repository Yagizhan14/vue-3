import { createRouter, createWebHistory } from "vue-router";
import Calculator from "./pages/Calculator";
import Calendar from "./pages/Calendar";
import Chat from "./pages/Chat";
import Heros from "./pages/Heros";
import Home from "./pages/Home";
import Markdown from "./pages/Markdown";
import ProtectedRoute from "./pages/ProtectedRoute";
import ReusableModal from "./pages/ReusableModal";
import Slider from "./pages/Slider";
import store from "./store";

export const routes = [
  {
    path: "/",
    component: Home,
    label: "Home",
  },
  {
    path: "/heros",
    component: Heros,
    label: "Heros",
  },
  {
    path: "/calendar",
    component: Calendar,
    label: "Calendar",
  },
  {
    path: "/markdown",
    component: Markdown,
    label: "Markdown",
  },
  {
    path: "/slider",
    component: Slider,
    label: "Slider",
  },
  {
    path: "/calculator",
    component: Calculator,
    label: "Calculator",
  },
  {
    path: "/reusablemodal",
    component: ReusableModal,
    label: "Reusable Modal",
  },
  {
    path: "/chat",
    component: Chat,
    label: "Chat",
  },
  {
    path: "/protectedroute",
    component: ProtectedRoute,
    label: "Protected Route",
    meta: { middleware: "auth" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = require(`./middlewares/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(to, from, next, store);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
