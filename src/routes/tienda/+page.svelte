<!-- src/routes/index.svelte -->
<script>
    import { onMount } from 'svelte';
    import Papa from 'papaparse';
  
    async function getProducto() {
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTlLjf4fDHfmV_IbT957SY6Lq-o4xInxsRelXCI2HxChD19INdmlWGFQWndW77oiwkZL6Cu4WGP4585/pub?gid=0&single=true&output=csv');
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true }).data;
      return parsedData;
    }
  
    let products = [];
  
    onMount(async () => {
      products = await getProducto();
    });
  
    async function getOferta() {
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTlLjf4fDHfmV_IbT957SY6Lq-o4xInxsRelXCI2HxChD19INdmlWGFQWndW77oiwkZL6Cu4WGP4585/pub?gid=1591664686&single=true&output=csv');
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true }).data;
      return parsedData;
    }
  
    let ofertas = [];
  
    onMount(async () => {
      ofertas = await getOferta();
    });
  
    async function getCategory() {
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTlLjf4fDHfmV_IbT957SY6Lq-o4xInxsRelXCI2HxChD19INdmlWGFQWndW77oiwkZL6Cu4WGP4585/pub?gid=861181266&single=true&output=csv');
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true }).data;
      return parsedData;
    }
  
    let categories = [];
  
    onMount(async () => {
      categories = await getCategory();
    });
  </script>
  
  <style>
    /* Agrega tu estilo aquí */
  </style>
  
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
        <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Carro
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {#each categories as category}
          <div class="lg:w-1/3 sm:w-1/2 p-4">
            <a href={`/tienda/${category.CATEGORY}`}>
              <div class="flex relative">
                <img alt="gallery" class="absolute inset-0 w-full h-full object-cover object-center" src="{category.IMG}">
                <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">{category.CATEGORY}</h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Alper Kamu</h1>
                  <p class="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                </div>
              </div>
            </a>
          </div>
          {/each}
        </div>
      </div>
    </section>
  
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {#each ofertas as product}
          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a class="block relative h-48 rounded overflow-hidden">
              <img alt="{product.PRODUCTO}" class="object-cover object-center w-full h-full block" src="{product.IMAGEN}">
            </a>
            <div class="mt-4">
              <h2 class="text-gray-900 title-font text-lg font-medium">{product.PRODUCTO}</h2>
              <p class="mt-1">{product.CATEGORY}</p>
              <p class="mt-1">${product.PRECIO}</p>
              <p class="mt-1">{product.DESCRIPCION}</p>
            </div>
          </div>
          {/each}
        </div>
      </div>
    </section>
  </main>
  