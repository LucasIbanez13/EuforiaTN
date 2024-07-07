<script>
    import { writable } from 'svelte/store';
    import Modal from '$lib/components/modal/modalCard.svelte'; // Importa el componente Modal
  
    let showModal = writable(false);
  
    function toggleModal() {
      showModal.update(n => !n);
    }
  </script>
  
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <a href="/" class="text-white text-xl font-bold">Mi Tienda</a>
      <div>
        <button on:click={toggleModal} class="bg-blue-500 text-white px-4 py-2 rounded-md">Carro</button>
      </div>
    </div>
  
    <!-- Usar el componente Modal -->
    <Modal {showModal} {toggleModal} />
  </nav>
  
  <style>
    nav {
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1000;
    }
  </style>
  