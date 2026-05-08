<template>
  <PageLoader />

  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta?.transition ?? 'page'" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router'
import PageLoader from './components/layout/PageLoader.vue'
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.page-enter-from { opacity: 0; transform: translateY(8px); }
.page-leave-to   { opacity: 0; transform: translateY(-6px); }
</style>