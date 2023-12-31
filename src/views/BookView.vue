<script setup lang="ts">
import { useBooksStore } from "@/stores/booksStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import AppSpinner from "@/components/AppSpinner/AppSpinner.vue";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage.vue";

const bookStore = useBooksStore();
const { getUniqueBook, purchaseBook } = bookStore;
onMounted(async () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  await getUniqueBook(bookId);
});
const router = useRoute();
const bookId = Number(router.params.id);
const { book, isLoading } = storeToRefs(bookStore);
const handleBuy = async (id: number) => {
  await purchaseBook(id);
};
</script>

<template>
  <AppSpinner v-if="isLoading" fullscreen />
  <div class="flex p-10 h-full pt-24 justify-start items-start flex-col md:flex-row">
    <div class="relative flex flex-col items-center w-full">
      <img
        src="../assets/book.jpg"
        alt="book"
        class="max-w-full h-auto md:max-w-sm rounded-lg shadow-2xl"
      />
      <p class="pt-2 text-center">ISBN: {{ book?.isbn }}</p>
    </div>

    <div class="pt-4 px-4 flex flex-col items-center">
      <h1 class="text-3xl md:text-5xl font-bold text-gray-700 text-center">
        {{ book?.title }}
      </h1>
      <h2 class="text-1xl md:text-2xl font-medium text-gray-700">
        Author: {{ book?.author }}
      </h2>
      <div class="pt-10">
        <span class="text-gray-700 underline text-xl">
          Available Stock: {{ book?.availableStock }}
        </span>
      </div>
      <p class="py-6 text-gray-700 text-xl">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
        id nisi.
      </p>
      <div class="flex flex-col md:flex-row">
        <span class="p-3 underline underline-offset-2 text-orange-600 text-xl">
          Price: ${{ book?.price }}
        </span>
      </div>
      <button
        class="btn bg-orange-400"
        @click="handleBuy(bookId)"
        :disabled="book?.availableStock === 0"
      >
        <span class="text-xl">Buy a copy</span>
      </button>
      <ErrorMessage />
    </div>
  </div>
</template>
