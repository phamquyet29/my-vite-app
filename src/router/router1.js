// router.js
import { createRouter, createWebHistory } from "vue-router";

import ListPr from "../components/ListPr.vue";
import Login from "../components/Login.vue";
import AddPr from "../components/AddPr.vue";
import EditPr from "../components/EditPr.vue";

const routes = [
  { path: "/", component: ListPr },
  { path: "/add", component: AddPr },
  { path: "/:id/edit", component: EditPr },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
