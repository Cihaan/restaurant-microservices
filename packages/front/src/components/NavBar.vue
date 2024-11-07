<script setup lang="ts">
  import { isAdmin, isAuthenticated } from '@/services/user-service';
  import { onMounted, ref } from 'vue';

  const isAuthed = ref(false);
  const isAd = ref(false);


  onMounted(async () => {
    if (await isAuthenticated()) {
      isAuthed.value = true;
      if (await isAdmin()) {
        isAd.value = true;
      } else {
        isAd.value = false;
      }
    } else {
      isAuthed.value = false;
    }
  });

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:3333/login/federated/google';
  };
</script>

<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold">Restaurant</router-link>
      <ul class="flex space-x-4">
        <li>
          <router-link to="/" class="hover:underline">Menu</router-link>
        </li>
        <li v-if="isAd">
          <router-link to="/gestion-client" class="hover:underline">Gestion client</router-link>
        </li>
        <li v-if="isAuthed">
          <router-link to="/gestion-commande" class="hover:underline">Gestion commande</router-link>
        </li>
        <li v-if="isAd">
          <router-link to="/gestion-plats" class="hover:underline">Gestion plats</router-link>
        </li>
        <li>
          <router-link to="/panier" class="hover:underline">Panier</router-link>
        </li>
        <li v-if="!isAuthed">
          <button class="hover:underline" @click="loginWithGoogle">Login with Google</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
