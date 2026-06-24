<template>
  <div>
    <template v-if="!route.meta.bare">
      <Navbar />
    </template>
    <main>
      <RouterView />
    </main>
    <template v-if="!route.meta.bare">
      <Footer />
    </template>
    <PageLoader />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from '../common/Navbar.vue'
import Footer from '../common/Footer.vue'
import PageLoader from './PageLoader.vue'

const route = useRoute()
</script>