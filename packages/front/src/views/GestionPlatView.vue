<!-- src/views/GestionPlats.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Gestion des Plats</h1>
    <p class="text-lg text-gray-600 mb-8">Ajoutez, modifiez ou supprimez les plats du menu.</p>

    <!-- Formulaire d'ajout/modification de plat -->
    <div class="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        {{ modeEdition ? 'Modifier le Plat' : 'Ajouter un Nouveau Plat' }}</h2>
      <form @submit.prevent="modeEdition ? modifierPlat() : ajouterPlat()">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input v-model="nouveauPlat.name" type="text" placeholder="Nom du plat"
                 class="border border-gray-300 p-2 rounded-lg" required>
          <input v-model="nouveauPlat.image" type="text" placeholder="URL de l'image"
                  class="border border-gray-300 p-2 rounded-lg" required>
          <input v-model="nouveauPlat.price" type="number" placeholder="Prix (€)"
                 class="border border-gray-300 p-2 rounded-lg" required>
          <input v-model="nouveauPlat.description" type="text" placeholder="Description"
                 class="border border-gray-300 p-2 rounded-lg" required>
        </div>
        <button class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600" type="submit">
          {{ modeEdition ? 'Mettre à Jour' : 'Ajouter le Plat' }}
        </button>
        <button v-if="modeEdition" @click="annulerEdition" type="button"
                class="px-4 py-2 bg-red-500 text-white rounded-lg ml-4 hover:bg-red-600">
          Annuler
        </button>
      </form>
    </div>

    <!-- Liste des plats -->
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Liste des Plats</h2>
      <table class="w-full border-collapse">
        <thead>
        <tr class="bg-gray-200 text-gray-600">
          <th class="p-4 border">Nom</th>
          <th class="p-4 border">Image</th>
          <th class="p-4 border">Description</th>
          <th class="p-4 border">Prix (€)</th>
          <th class="p-4 border">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="plat in plats" :key="plat.id" class="text-gray-700">
          <td class="p-4 border">{{ plat.name }}</td>
          <td class="p-4 border">
            <img  :src="plat.image" :alt="plat.name" class="w-24 h-24 object-cover rounded-lg">
          </td>
          <td class="p-4 border">{{ plat.description }}</td>
          <td class="p-4 border">{{ plat?.price }}</td>
          <td class="p-4 border ">
            <button @click="editerPlat(plat)" class="px-3 mb-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Modifier
            </button>
            <button @click="supprimerPlat(plat.id)" class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Supprimer
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Plat } from '@/type/Plat';
import { onMounted, ref } from 'vue';


const plats = ref<Plat[]>([]);

// Plat temporaire pour ajouter ou modifier
const nouveauPlat = ref<Plat>({ name: '', description: '', price: 0 });
const modeEdition = ref(false); // Indique si on est en mode édition

// Fonction pour ajouter un plat
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
    plats.value = await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

// Fonction pour ajouter un plat// Appelle la fonction fetchPlats lorsque le composant est monté
onMounted(fetchPlats);


//create plat

async function createPlat() {
  try {
    const response = await fetch('http://localhost:8000/plats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nouveauPlat.value)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erreur lors de la création du plat: ${errorData.message}`);
    } else {
      console.log('plat created');
      const createdPlat = await response.json();
      plats.value.push(createdPlat);
    }
  } catch (error) {
    console.error('Erreur lors de la création du plat:', error);
  }
}

function ajouterPlat() {
  createPlat().then(() => {
    resetNouveauPlat();
  });
}

// Fonction pour sélectionner un plat pour la modification
function editerPlat(plat: Plat) {
  nouveauPlat.value = { ...plat };
  modeEdition.value = true;
}

// Fonction pour annuler la modification
function annulerEdition() {
  resetNouveauPlat();
}

// Fonction pour réinitialiser le formulaire
function resetNouveauPlat() {
  nouveauPlat.value = { name: '', description: '', price: 0 };
  modeEdition.value = false;
}

// Fonction pour mettre à jour un plat
function modifierPlat() {
  if (nouveauPlat.value.id) {
    fetch(`http://localhost:8000/plats/${nouveauPlat.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nouveauPlat.value)
    }).then(() => {
      const index = plats.value.findIndex(p => p.id === nouveauPlat.value.id);
      if (index !== -1) {
        plats.value[index] = { ...nouveauPlat.value };
      }
      resetNouveauPlat();
    }).catch(error => {
      console.error('Erreur lors de la modification du plat:', error);
    });
  }
}

// Fonction pour supprimer un plat
function supprimerPlat(id: number| undefined) {
  if (id) {
    fetch(`http://localhost:8000/plats/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      plats.value = plats.value.filter(p => p.id !== id);
    }).catch(error => {
      console.error('Erreur lors de la suppression du plat:', error);
    });
  }
}
</script>

<style scoped>
/* Style personnalisé pour le composant */
</style>
