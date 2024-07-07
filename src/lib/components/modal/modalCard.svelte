<script>
  import { onDestroy, onMount } from 'svelte';
  import { cart } from '$lib/stores/cartStore';

  export let showModal;
  export let toggleModal;

  const handleEsc = (event) => {
    if (event.key === 'Escape') {
      toggleModal();
    }
  };

  const removeItem = (id) => {
    cart.update(items => items.filter(item => item.ID !== id));
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        cart.set(JSON.parse(storedCart));
      }

      if ($showModal) {
        window.addEventListener('keydown', handleEsc);
      }

      const unsubscribe = showModal.subscribe((value) => {
        if (value) {
          window.addEventListener('keydown', handleEsc);
        } else {
          window.removeEventListener('keydown', handleEsc);
        }
      });

      onDestroy(() => {
        window.removeEventListener('keydown', handleEsc);
        unsubscribe();
      });
    }
  });
</script>

<style>
  .modal {
    z-index: 50; /* Ajusta este valor según sea necesario */
  }
</style>

{#if $showModal}
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full modal" id="my-modal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Carro</h3>
        <div class="mt-2 px-7 py-3">
          {#if $cart.length > 0}
            <ul>
              {#each $cart as item}
                <li class="mb-4 flex justify-between items-center">
                  <p class="text-sm text-gray-500">{item.PRODUCTO} - {item.quantity} x ${item.PRECIO}</p>
                  <button on:click={() => removeItem(item.ID)} class="text-red-500">Eliminar</button>
                </li>
              {/each}
            </ul>
          {:else}
            <p class="text-sm text-gray-500">Tu carrito está vacío.</p>
          {/if}
        </div>
        <div class="items-center px-4 py-3">
          <button on:click={toggleModal} class="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
