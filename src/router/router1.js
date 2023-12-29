// router.js
import { createRouter, createWebHistory } from "vue-router";

import ListPr from "../components/ListPr.vue";
import Login from "../components/Login.vue";
import AddPr from "../components/AddPr.vue";
import EditPr from "../components/EditPr.vue";
import Products from "../components/Products.vue";
import ProductDetail from "../components/ProductDetail.vue";

const routes = [
  { path: "/", component: Products },
  { path: "/admin/products", component: ListPr },
  { path: "/admin/add", component: AddPr },
  { path: "/admin/:id/edit", component: EditPr },
  { path: "/product/:id", component: ProductDetail, name: "ProductDetail" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
