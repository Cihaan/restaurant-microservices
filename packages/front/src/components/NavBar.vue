<script setup lang="ts">

</script>

<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold">Restaurant</router-link>
      <ul class="flex space-x-4">
        <li>
          <router-link to="/" class="hover:underline">Menu</router-link>
        </li>
        <li>
          <router-link to="/panier" class="hover:underline">Panier</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>
