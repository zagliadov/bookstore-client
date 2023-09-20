import { createRouter, createWebHistory } from "vue-router";
import BooksView from "../views/BooksView.vue";
import BookView from "../views/BookView.vue";
import { getAllBooksMiddleware, getUniqueBookMiddleware } from "./middleware/middleware";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Books",
      component: BooksView,
      beforeEnter: getAllBooksMiddleware,
    },
    {
      path: "/book/:id",
      name: "Book",
      component: BookView,
      beforeEnter: getUniqueBookMiddleware,
    },
  ],
});

export default router;
