<script context="module">
  export async function load({ url }) {
    if (url.pathname === '/') {
      return {
        status: 302,
        redirect: '/tienda'
      };
    }
  }
</script>

<script>
  import "../app.css";
</script>

<slot />
