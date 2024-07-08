<script>
  import { writable } from 'svelte/store';
  import Modal from '$lib/components/modal/modalCard.svelte'; // Importa el componente Modal

  let showModal = writable(false);

  function toggleModal() {
    showModal.update(n => !n);
  }
</script>

<nav>
  <div class="container mx-auto flex items-center justify-between h-16">
    <a href="/tienda" class="flex items-center text-white text-xl font-bold">
      <img src="/logoEuf.jpeg" alt="Logo de la tienda" class="h-16 mr-4 ml-4">
    </a>
    <div>
      <button on:click={toggleModal} class="text-black px-4 py-2 rounded-md">
        <i class="fa-solid fa-bag-shopping fa-2x"></i>
      </button>
    </div>
  </div>

  <!-- Usar el componente Modal -->
  <Modal {showModal} {toggleModal} />
</nav>

<style>
  /* Si quieres agregar otros estilos al nav puedes hacerlo aquí */
  nav {
    width: 100%;
  }
</style>
