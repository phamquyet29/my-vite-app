// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import ListPr from '../components/ListPr.vue';
import Login from '../components/Login.vue';
import AddPr from '../components/AddPr.vue';
import SignUp from '../components/SignUp.vue';

const routes = [
  { path: '/', component: ListPr },
  { path: '/add', component: AddPr },
  { name:"Login",path: '/login', component: Login },
  { name:"SignUp", path: '/signup', component: SignUp },
  { name:"Home", path: '/', component: Home }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
