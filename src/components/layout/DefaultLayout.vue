<template>
  <div>
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />
    <PageLoader />
  </div>
</template>

<script setup>
import Navbar from '../common/Navbar.vue'
import Footer from '../common/Footer.vue'
import PageLoader from './PageLoader.vue'
</script>