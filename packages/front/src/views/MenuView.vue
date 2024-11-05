<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="text-4xl font-extrabold mb-6 text-gray-800">Bienvenue au Restaurant</h1>
    <p class="text-lg text-gray-500 italic mb-8">Parcourez notre menu et sélectionnez des plats pour votre commande
      !</p>

    <section class="menu bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-gray-700 mb-6 border-b-2 border-gray-300 pb-2">Menu</h2>
      <ul class="space-y-6">
        <li v-for="plat in plats" :key="plat.id"
            class="menu-item bg-white shadow-lg rounded-lg p-8 border border-gray-100 hover:border-gray-300 transition duration-300 ease-in-out">
          <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ plat.name }}</h3>
          <img :src="plat.image" :alt="plat.name" class="w-full h-48 object-cover mb-4 rounded-lg">
          <p class="text-gray-600 mb-4 italic">{{ plat.description }}</p>
          <p class="text-lg font-bold text-gray-900">{{ plat.price }} €</p>
          <button @click="ajouterAuPanier(plat)"
                  class="mt-4 px-5 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300">
            Ajouter au panier
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Plat } from '@/type/Plat';


const plats = ref<Plat[]>([]);
// Méthode pour récupérer les données depuis la gateway
async function fetchPlats() {
  try {
    const response = await fetch('https://localhost:8080/api/plats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des données');
    }
    plats.value = await response.json(); // Met à jour la liste des plats avec les données récupérées
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

// Appelle la fonction fetchPlats lorsque le composant est monté
onMounted(fetchPlats);


function ajouterAuPanier(plat: Plat): void {
  console.log(`Ajouté au panier: ${plat.name}`);
  // Logique pour ajouter le plat au panier
}
</script>

<style scoped>
/* Style personnalisé pour le composant */

</style>
