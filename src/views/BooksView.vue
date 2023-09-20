<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useBooksStore } from "@/stores/booksStore";
import { storeToRefs } from "pinia";
import AppSpinner from "@/components/AppSpinner/AppSpinner.vue";
import Carousel from "@/components/Carousel/Carousel.vue";
import Rating from "@/components/Rating/Rating.vue";

const booksStore = useBooksStore();
const { books, isLoading } = storeToRefs(booksStore);
</script>

<template>
  <div class="flex justify-center flex-wrap p-4 relative pt-20">
    <Carousel />
    <AppSpinner v-if="isLoading" fullscreen />

    <div
      v-for="{ id, title, author, price, availableStock } in books"
      :key="id"
      class="card w-80 bg-base-100 shadow-xl m-3 border pt-5"
    >
      <div>
        <div
          class="h-[200px] w-full bg-no-repeat bg-center bg-contain bg-[url('../assets/book.jpg')]"
        ></div>
        <Rating />
      </div>

      <div class="card-body flex justify-between pb-4 overflow-hidden">
        <div>
          <div className="flex items-center justify-between">
            <h2 class="card-title text-gray-700">{{ title }}</h2>
          </div>
          <h3 class="text-gray-700 text-lg">Author: {{ author }}</h3>
          <span className="text-orange-600 text-2xl">${{ price }}</span>
          <div class="flex items-center justify-between card-actions">
            <span class="text-gray-700 text-lg"
              >Available stock: {{ availableStock }}</span
            >
          </div>
        </div>
        <RouterLink :to="`/book/${id}`" class="btn bg-orange-400">
          <span>Buy Now</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
