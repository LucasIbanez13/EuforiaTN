<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get, writable } from 'svelte/store'; // Asegúrate de importar 'writable'
  import Papa from 'papaparse';
  import { goto } from '$app/navigation'; // Importa la función goto para la navegación
  import { cart } from '$lib/stores/cartStore'; // Importa la tienda del carrito

  let idProducts = [];
  let id = '';
  let loading = true; // Variable para controlar el estado de carga

  onMount(async () => {
    id = get(page).params.id; // Obtén el parámetro 'id' de la ruta actual

    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTlLjf4fDHfmV_IbT957SY6Lq-o4xInxsRelXCI2HxChD19INdmlWGFQWndW77oiwkZL6Cu4WGP4585/pub?gid=0&single=true&output=csv');
    const data = await response.text();
    const products = Papa.parse(data, { header: true }).data;

    // Filtrar productos por ID
    idProducts = products.filter(product => product.ID === id);
    loading = false; // Cambiar el estado de carga cuando se hayan cargado los productos
  });

  // Función para manejar el clic en un producto
  function handleProductClick(productId) {
    goto(`/tienda/${id}/${productId}`); // Redirige a la vista del producto con su ID y el ID del producto
  }

  // Función para agregar productos al carrito
  function addToCart(product) {
    cart.update(items => {
      const itemIndex = items.findIndex(item => item.ID === product.ID);
      if (itemIndex === -1) {
        return [...items, { ...product, quantity: 1 }];
      } else {
        const updatedItems = [...items];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      }
    });
  }

</script>


<main class="p-8 bg-gray-100 text-center">
  <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <nav class="flex lg:w-2/5 items-center text-base md:ml-auto">
        <div class="relative w-64">
          <input type="text" class="w-full p-2 pl-8 pr-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Buscar..." />
        </div>
      </nav>
      <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">Tailblocks</span>
      </a>
      
    </div>
  </header>
  {#if loading}
    <p>Cargando productos...</p> <!-- Mensaje de carga -->
  {:else}
    {#if idProducts.length > 0}
      <div class="flex justify-center">
        {#each idProducts as product}
          <section class="text-gray-600 body-font w-full md:w-3/4 lg:w-2/3 xl:w-1/2 my-8">
            <div class="container mx-auto flex flex-col md:flex-row items-center">
              <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                <img class="object-cover object-center rounded" alt="hero" src="{product.IMAGEN}">
              </div>
              <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{product.PRODUCTO}</h1>
                <p class="mb-8 leading-relaxed">{product.DESCRIPCION}</p>
                <div class="flex w-full md:justify-start justify-center items-end">
                  <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
                    <p class="mb-8 leading-relaxed">{product.PRECIO}</p>
                  </div>
                  <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" on:click={() => addToCart(product)}>Comprar</button>
                </div>
              </div>
            </div>
          </section>
        {/each}
      </div>
    {:else}
      <p class="text-gray-600">No se encontraron productos para este ID: {id}</p> <!-- Mensaje cuando no hay productos -->
    {/if}
  {/if}
</main>

