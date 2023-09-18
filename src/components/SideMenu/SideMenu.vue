<script setup lang="ts">
import { menuItems } from "../../helpers/sideMenuItems";
</script>

<template>
  <ul class="menu bg-base-100 w-full pt-10">
    <li v-for="(item, index) in menuItems" :key="index">
      <a>{{ item.label }}</a>
      <template v-if="item.children">
        <details :open="item.open">
          <summary>{{ item.label }}</summary>
          <ul>
            <li v-for="(child, childIndex) in item.children" :key="childIndex">
              <a>{{ child.label }}</a>
              <template v-if="child.children">
                <details :open="child.open">
                  <summary>{{ child.label }}</summary>
                  <ul>
                    <li
                      v-for="(grandchild, grandchildIndex) in child.children"
                      :key="grandchildIndex"
                    >
                      <a>{{ grandchild.label }}</a>
                    </li>
                  </ul>
                </details>
              </template>
            </li>
          </ul>
        </details>
      </template>
    </li>
  </ul>
</template>
