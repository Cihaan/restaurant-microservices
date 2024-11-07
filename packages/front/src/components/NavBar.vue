<script setup lang="ts">
  import { checkTokenValidity } from '@/services/user-service';
  import { onMounted, ref } from 'vue';

  const isTokenValid = ref(false);

  onMounted(async () => {
    const cookies = document.cookie.split(';');
    const sidCookie = cookies.find(cookie => cookie.trim().startsWith('connection.sid='));
    console.log(cookies);

    if (sidCookie) {
      const sid = sidCookie.split('=')[1];
      if (await checkTokenValidity(sid)) {
        isTokenValid.value = true;
      } else {
        isTokenValid.value = false;
      }
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
        <li v-if="isTokenValid">
          <router-link to="/gestion-client" class="hover:underline">Gestion client</router-link>
        </li>
        <li v-if="isTokenValid">
          <router-link to="/gestion-commande" class="hover:underline">Gestion commande</router-link>
        </li>
        <li v-if="isTokenValid">
          <router-link to="/gestion-plats" class="hover:underline">Gestion plats</router-link>
        </li>
        <li>
          <router-link to="/panier" class="hover:underline">Panier</router-link>
        </li>
        <li v-if="!isTokenValid">
          <button class="hover:underline" @click="loginWithGoogle">Login with Google</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
