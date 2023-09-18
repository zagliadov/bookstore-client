<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import SideMenu from "@/components/SideMenu/SideMenu.vue";
import Menu from "./components/SideMenu/Menu.vue";
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <main className="grow relative">
      <div class="flex justify-center">
        <SideMenu />
        <div class="w-10/12">
          <RouterView />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
