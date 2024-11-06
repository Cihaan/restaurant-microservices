<!-- src/views/GestionClients.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Service de Gestion des Clients</h1>
    <p class="text-lg text-gray-600 mb-8">Gérez les informations des clients, leurs authentifications et leurs
      sessions.</p>

    <!-- Section pour ajouter un client -->
    <div class="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Ajouter un nouveau client</h2>
      <form @submit.prevent="ajouterClient">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <input v-model="nouveauClient.nom" type="text" placeholder="Nom"
                 class="border border-gray-300 p-2 rounded-lg">
          <input v-model="nouveauClient.email" type="email" placeholder="Email"
                 class="border border-gray-300 p-2 rounded-lg">
        </div>
        <button class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600" type="submit">Ajouter le
          client
        </button>
      </form>
    </div>

    <!-- Liste des clients -->
    <div class="bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Liste des clients</h2>
      <table class="w-full border-collapse">
        <thead>
        <tr class="bg-gray-200 text-gray-600">
          <th class="p-4 border">Nom</th>
          <th class="p-4 border">Email</th>
          <th class="p-4 border">Statut</th>
          <th class="p-4 border">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="client in clients" :key="client.id" class="text-gray-700">
          <td class="p-4 border">{{ client.nom }}</td>
          <td class="p-4 border">{{ client.email }}</td>
          <td class="p-4 border">{{ client.authentifie ? 'Connecté' : 'Déconnecté' }}</td>
          <td class="p-4 border">
            <button @click="gererAuthentification(client)"
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2">
              {{ client.authentifie ? 'Déconnecter' : 'Connecter' }}
            </button>
            <button @click="terminerSession(client)"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Terminer Session
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Client {
  id: number;
  nom: string;
  email: string;
  authentifie: boolean;
}

// Liste des clients (à remplacer par une requête à l'API pour obtenir les clients)
const clients = ref<Client[]>([
  { id: 1, nom: 'Alice Dupont', email: 'alice@example.com', authentifie: true },
  { id: 2, nom: 'Bob Martin', email: 'bob@example.com', authentifie: false },
  { id: 3, nom: 'Claire Lefevre', email: 'claire@example.com', authentifie: true }
]);

// Nouveau client
const nouveauClient = ref<Client>({ id: 0, nom: '', email: '', authentifie: false });

// Fonction pour ajouter un client
function ajouterClient() {
  if (nouveauClient.value.nom && nouveauClient.value.email) {
    const nouveauId = clients.value.length ? clients.value[clients.value.length - 1].id + 1 : 1;
    clients.value.push({ ...nouveauClient.value, id: nouveauId });
    nouveauClient.value = { id: 0, nom: '', email: '', authentifie: false }; // Réinitialise le formulaire
  }
}

// Gère l'authentification (connecter/déconnecter)
function gererAuthentification(client: Client) {
  client.authentifie = !client.authentifie;
  console.log(`${client.nom} est maintenant ${client.authentifie ? 'connecté' : 'déconnecté'}`);
}

// Fonction pour terminer une session
function terminerSession(client: Client) {
  console.log(`Session terminée pour ${client.nom}`);
  client.authentifie = false;
}
</script>

<style scoped>
/* Style personnalisé pour le composant */
</style>
