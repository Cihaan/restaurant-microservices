<!-- src/views/ServiceLivraison.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Service de Livraison</h1>
    <p class="text-lg text-gray-600 mb-8">Gérez les informations des livreurs, les affectations et le suivi des livraisons en temps réel.</p>

    <!-- Section Livreurs -->
    <section class="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Livreurs Disponibles</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li v-for="livreur in livreurs" :key="livreur.id" class="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800">{{ livreur.nom }}</h3>
          <p class="text-gray-600 mb-2">Statut : {{ livreur.statut }}</p>
          <p class="text-gray-600 mb-2">Position : {{ livreur.position.latitude }}, {{ livreur.position.longitude }}</p>
          <button @click="affecterLivraison(livreur)" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Affecter une Livraison
          </button>
        </li>
      </ul>
    </section>

    <!-- Section des Livraisons en Cours -->
    <section class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Livraisons en Cours</h2>
      <ul class="space-y-4">
        <li v-for="livraison in livraisons" :key="livraison.id" class="bg-gray-50 rounded-lg p-4 shadow border border-gray-200">
          <h3 class="text-xl font-bold text-gray-800">Commande #{{ livraison.id }}</h3>
          <p class="text-gray-600">Livreur : {{ livraison.livreur.nom }}</p>
          <p class="text-gray-600">Statut : {{ livraison.statut }}</p>
          <button @click="mettreAJourStatut(livraison)" class="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
            Mettre à jour le statut
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Position {
  latitude: number;
  longitude: number;
}

interface Livreur {
  id: number;
  nom: string;
  statut: string; // Ex: 'Disponible', 'En Livraison'
  position: Position;
}

interface Livraison {
  id: number;
  livreur: Livreur;
  statut: string; // Ex: 'En cours', 'Livré'
}

const livreurs = ref<Livreur[]>([
  { id: 1, nom: 'Jean Martin', statut: 'Disponible', position: { latitude: 48.8566, longitude: 2.3522 } },
  { id: 2, nom: 'Sophie Dubois', statut: 'En Livraison', position: { latitude: 48.864716, longitude: 2.349014 } },
  { id: 3, nom: 'Pierre Durand', statut: 'Disponible', position: { latitude: 48.858844, longitude: 2.294351 } }
]);

const livraisons = ref<Livraison[]>([
  { id: 101, livreur: livreurs.value[1], statut: 'En cours' },
]);

// Fonction pour affecter une livraison à un livreur disponible
function affecterLivraison(livreur: Livreur) {
  if (livreur.statut === 'Disponible') {
    livreur.statut = 'En Livraison';
    const nouvelleLivraison: Livraison = {
      id: Date.now(), // Génère un nouvel ID pour la livraison
      livreur,
      statut: 'En cours',
    };
    livraisons.value.push(nouvelleLivraison);
  } else {
    alert(`${livreur.nom} est déjà en livraison.`);
  }
}

// Fonction pour mettre à jour le statut d'une livraison (simulé)
function mettreAJourStatut(livraison: Livraison) {
  if (livraison.statut === 'En cours') {
    livraison.statut = 'Livré';
    livraison.livreur.statut = 'Disponible'; // Le livreur est à nouveau disponible
  } else {
    alert(`La livraison #${livraison.id} est déjà terminée.`);
  }
}
</script>

<style scoped>
/* Style personnalisé pour le composant */
</style>
