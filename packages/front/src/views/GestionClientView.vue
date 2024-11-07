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
        <button @click="createClient" class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          type="submit">Ajouter le
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
            <th class="p-4 border">Prenom</th>
            <th class="p-4 border">Nom</th>
            <th class="p-4 border">Email</th>
            <th class="p-4 border">Role</th>
            <th class="p-4 border">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id" class="text-gray-700">
            <td class="p-4 border">{{ client.fristName }}</td>
            <td class="p-4 border">{{ client.lastName }}</td>
            <td class="p-4 border">{{ client.email }}</td>
            <td class="p-4 border">{{ client.role }}</td>
            <td>
              <button @click="deleteUser(client.id)" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                type="submit">Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  interface Client {
    id: number;
    nom: string;
    email: string;
  }

  // Liste des clients (à remplacer par une requête à l'API pour obtenir les clients)
  const clients = ref<Client[]>([
  ]);

  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:8000/auth/users', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }
      clients.value = await response.json();
      console.log(clients.value)
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }

  async function deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:8000/auth/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }

      await fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }

  async function createClient() {
    try {
      const response = await fetch('http://localhost:8000/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: nouveauClient.value.email,
          fristName: nouveauClient.value.nom,
          lastName: nouveauClient.value.nom,
          username: nouveauClient.value.nom,
          provider: 'local',
          providerId: 'local',
          role: 'user',
        })
      });
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }

      await fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }

  onMounted(async () => await fetchUsers());

  // Nouveau client
  const nouveauClient = ref<Client>({ id: 0, nom: '', email: '', });

  // Fonction pour ajouter un client
  function ajouterClient() {
    if (nouveauClient.value.nom && nouveauClient.value.email) {
      const nouveauId = clients.value.length ? clients.value[clients.value.length - 1].id + 1 : 1;
      clients.value.push({ ...nouveauClient.value, id: nouveauId });
      nouveauClient.value = { id: 0, nom: '', email: '', }; // Réinitialise le formulaire
    }
  }
</script>

<style scoped>
  /* Style personnalisé pour le composant */
</style>
