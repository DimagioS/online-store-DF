import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import AboutUs from "../views/AboutUs";
import ProductsPage from "../views/ProductsPage";
import Cart from "../views/Cart";
import InfoProduct from "../views/InfoProduct";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    alias: "/",
  },
  {
    path: "/about",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/products",
    name: "ProductsPage",
    component: ProductsPage,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/product/:id",
    name: "InfoProduct",
    component: InfoProduct,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
