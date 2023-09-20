<script setup lang="ts">
import { ref, watch } from "vue";
import { useBooksStore } from "../../stores/booksStore";
import { storeToRefs } from "pinia";

const bookStore = useBooksStore();
const { errorMessage } = storeToRefs(bookStore);
const isErrorMessageVisible = ref(false);

watch(errorMessage, () => {
  if (errorMessage.value) {
    isErrorMessageVisible.value = true;
    setTimeout(() => {
      isErrorMessageVisible.value = false;
    }, 3000);
  }
});
</script>

<template>
  <div class="flex items-end pt-2" v-if="isErrorMessageVisible">
    <span class="text-error text-lg pr-3">{{ errorMessage }}</span>
    <span class="loading loading-dots loading-xs bg-error"></span>
  </div>
</template>
