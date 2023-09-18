import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { Book } from "./interface";
import { API_URL } from "@/helpers/constants";

export const useBooksStore = defineStore("books", () => {
  const books = ref<Book[]>([]);
  const book = ref<Book>();
  const isLoading = ref<boolean>(false);

  const getAllBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      books.value = response?.data?.books;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching books");
    }
  };
  const getUniqueBook = async (id: number) => {
    isLoading.value = true;
    try {
      const response = await axios.get(`${API_URL}/books/${id}`);
      book.value = response?.data?.book;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching book");
    } finally {
      isLoading.value = false;
    }
  };

  const purchaseBook = async (id: number) => {
    try {
      const response = await axios.post(`${API_URL}/books/${id}/purchase`);
      if (response.status === 200) {
        console.log("Purchase successful:", response.data.book);
        book.value = response.data.book;
      } else {
        console.error("Unexpected status code:", response.status);
        throw new Error("Error in purchasing a book");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        throw new Error("Network error");
      } else if (error instanceof Error) {
        console.error("Custom error:", error.message);
        throw error;
      } else {
        console.error("Unknown error:", error);
        throw new Error("Unknown error");
      }
    }
  };

  return {
    books,
    book,
    isLoading,
    getAllBooks,
    getUniqueBook,
    purchaseBook,
  };
});