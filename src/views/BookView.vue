<script setup lang="ts">
import { useBooksStore } from "@/stores/booksStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AppSpinner from "@/components/AppSpinner/AppSpinner.vue";

const bookStore = useBooksStore();
const { getUniqueBook, purchaseBook } = bookStore;
onMounted(async () => {
  await getUniqueBook(bookId);
});
const router = useRoute();
const bookId = Number(router.params.id);
const { book, isLoading } = storeToRefs(bookStore);
const isDisabled = ref<boolean>(book.value.availableStock === 0 && true);
const handleBuy = async (id: number) => {
  await purchaseBook(id);
};
</script>

<template>
  <AppSpinner v-if="isLoading" fullscreen />
  <div
    class="flex p-10 h-screen justify-center items-center flex-col md:flex-row"
  >
    <div class="relative flex flex-col items-center">
      <img
        src="../assets/book.jpg"
        alt="book"
        class="max-w-sm rounded-lg shadow-2xl"
      />
      <p class="pt-2 text-center">ISBN: {{ book.isbn }}</p>
    </div>

    <div class="p-10 flex flex-col items-center">
      <h1 class="text-5xl font-bold text-gray-700 text-center">
        {{ book.title }}
      </h1>
      <h2 class="text-2xl font-medium text-gray-700">
        Author: {{ book.author }}
      </h2>
      <div class="pt-10">
        <span class="text-gray-700 underline"
          >Available Stock: {{ book.availableStock }}</span
        >
      </div>
      <p class="py-6 text-gray-700">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
        id nisi.
      </p>
      <div class="flex flex-col md:flex-row">
        <span class="p-3 underline underline-offset-2 text-orange-600 text-xl"
          >Price: ${{ book.price }}</span
        >
        <button
          class="btn bg-orange-400"
          @click="handleBuy(book.id)"
          :disabled="isDisabled"
        >
          Buy a copy
        </button>
      </div>
    </div>
  </div>
</template>
