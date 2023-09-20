import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { Book } from "./interface";
import { API_URL } from "@/helpers/constants";

export const useBooksStore = defineStore("books", () => {
  const books = ref<Book[]>([]);
  const book = ref<Book>();
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  const getAllBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      books.value = response?.data?.books;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching books");
    }
  };
  const getUniqueBook = async (id: number) => {
    isLoading.value = true;
    try {
      const response = await axios.get(`${API_URL}/books/${id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
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
      const response = await axios.post(`${API_URL}/books/${id}/purchase`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
  
      if (response.status === 200) {
        console.log("Purchase successful:", response.data.book);
        book.value = response.data.book;
        errorMessage.value = null;
      } else {
        console.error("Unexpected status code:", response.status);
        throw new Error("Error in purchasing a book");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        errorMessage.value = "Network error";
      } else if (error instanceof Error) {
        console.error("Custom error:", error.message);
        errorMessage.value = error.message;
        throw error;
      } else {
        console.error("Unknown error:", error);
        errorMessage.value = "Unknown error";
      }
    }
  };
  
  

  return {
    books,
    book,
    isLoading,
    errorMessage,
    getAllBooks,
    getUniqueBook,
    purchaseBook,
  };
});
