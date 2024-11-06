<!-- src/views/Panier.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Votre Panier</h1>
    <p class="text-lg text-gray-600 mb-8">Revoyez les articles ajoutés à votre panier et finalisez votre commande.</p>

    <!-- Liste des articles dans le panier -->
    <div v-if="panier.length" class="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
      <ul class="space-y-4">
        <li v-for="(item, index) in panier" :key="index" class="bg-white rounded-lg p-4 shadow border border-gray-200">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-xl font-semibold text-gray-800">{{ item.nom }}</h3>
              <p class="text-gray-600">{{ item.prix }} € par unité</p>
            </div>
            <div class="flex items-center">
              <button @click="decrementerQuantite(item)" class="px-2 py-1 bg-gray-200 rounded-l-lg text-gray-600 hover:bg-gray-300">-</button>
              <span class="px-4">{{ item.quantite }}</span>
              <button @click="incrementerQuantite(item)" class="px-2 py-1 bg-gray-200 rounded-r-lg text-gray-600 hover:bg-gray-300">+</button>
            </div>
            <p class="text-lg font-semibold text-gray-900">{{ item.prix * item.quantite }} €</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Total du panier -->
    <div v-if="panier.length" class="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-bold text-gray-800">Total : </h2>
      <p class="text-2xl font-bold text-emerald-600">{{ totalPanier }} €</p>
    </div>

    <!-- Bouton de confirmation de commande -->
    <div v-if="panier.length" class="text-center">
      <button @click="confirmerCommande" class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
        Passer la commande
      </button>
    </div>

    <!-- Message pour panier vide -->
    <p v-else class="text-center text-gray-500">Votre panier est vide.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Structure d'un article dans le panier
interface ArticlePanier {
  id: number;
  nom: string;
  prix: number;
  quantite: number;
}

// Exemple de panier avec des articles
const panier = ref<ArticlePanier[]>([
  { id: 1, nom: 'Salade César', prix: 10, quantite: 2 },
  { id: 2, nom: 'Pizza Margherita', prix: 12, quantite: 1 },
  { id: 3, nom: 'Pâtes Carbonara', prix: 13, quantite: 1 }
]);

// Calcul du total du panier
const totalPanier = computed(() => {
  return panier.value.reduce((total, item) => total + item.prix * item.quantite, 0);
});

// Fonction pour augmenter la quantité d'un article
function incrementerQuantite(item: ArticlePanier) {
  item.quantite += 1;
}

// Fonction pour diminuer la quantité d'un article
function decrementerQuantite(item: ArticlePanier) {
  if (item.quantite > 1) {
    item.quantite -= 1;
  } else {
    panier.value = panier.value.filter((i) => i.id !== item.id); // Supprime l'article si la quantité atteint 0
  }
}

// Fonction pour confirmer la commande
function confirmerCommande() {
  console.log('Commande confirmée avec les articles :', panier.value);
  panier.value = []; // Vider le panier après confirmation
  alert('Votre commande a été passée avec succès !');
}
</script>

<style scoped>
/* Style personnalisé pour le composant */
</style>
