<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="text-4xl font-extrabold mb-6 text-gray-800">Bienvenue au Restaurant</h1>
    <p class="text-lg text-gray-500 italic mb-8">Parcourez notre menu et sélectionnez des plats pour votre commande
      !</p>

    <section class="menu bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-gray-700 mb-6 border-b-2 border-gray-300 pb-2">Menu</h2>
      <ul class="space-y-6">
        <li v-for="plat in plats" :key="plat.id"
            class="menu-item bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1">

          <div class="flex flex-col items-center text-center">
            <h3 class="text-2xl font-semibold text-gray-900 mb-2">{{ plat.name }}</h3>

            <img v-if="plat.image" :src="plat.image" :alt="plat.name"
                 class="h-32 w-32 object-cover mb-4 rounded-xl shadow-md">

            <p class="text-gray-500 mb-4 italic max-w-xs">{{ plat.description }}</p>

            <p class="text-xl font-semibold text-emerald-600 mb-4">{{ plat.price }} €</p>

            <button @click="ajouterAuPanier(plat)"
                    class="mt-4 w-full px-4 py-2 bg-emerald-500 text-white text-lg font-semibold rounded-lg hover:bg-emerald-600 transition duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300">
              Ajouter au panier
            </button>
          </div>
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
    const response = await fetch('http://localhost:8000/plats', {
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
