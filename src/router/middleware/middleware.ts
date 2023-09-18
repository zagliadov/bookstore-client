import { useBooksStore } from "@/stores/booksStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const getAllBooks = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const booksStore = useBooksStore();
  const { getAllBooks } = booksStore;

  try {
    await getAllBooks();
    next();
  } catch (error) {
    console.error("Error fetching books data:", error);
  }
};

export const getUniqueBook = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const booksStore = useBooksStore();
  const { getUniqueBook } = booksStore;

  try {
    const id = Number(to.params.id);
    await getUniqueBook(id);
    next();
  } catch (error) {
    console.error("Error fetching books data:", error);
  }
};
