<script>
  import "animate.css";
  import { onMount } from "svelte";
  import Login from "./lib/Login/Login.svelte";
  import MenuDocentes from "./lib/MenusDocentes/MenuDocentes.svelte";
  import NavPrincipal from "./lib/NavPrincipal/NavPrincipal.svelte";
  import { URL, Periodos, Asignacion, Docentes } from "./stores";
  let login = false;

  const getPeriodos = async () => {
    const response = await fetch(
      `${$URL}getPeriodosNotas.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  };

  const getAsignacion = async () => {
    const response = await fetch(
      `${$URL}getasignacion.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  };

  const getDocentes = async () => {
    const response = await fetch(
      `${$URL}getInfoDocentes.php`,
      {
        method: "POST",
        body: JSON.stringify({ periodo: "-", x: "x" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  };

  onMount(async () => {
    Cargado=false;
    let isProduction = import.meta.env.MODE === "production";
   // if (isProduction) $URL = "../";
   // else 
    $URL = "https://app.iedeoccidente.com/";

    $Periodos = await getPeriodos();
    $Asignacion = await getAsignacion();
    $Docentes = await getDocentes();
    Cargado=true;
  });

  let generaMenus = false;
  let concedido = false;
  let Cargado=false;
  $: console.log(login);
</script>

<main class="">
  {#if login}
    <Login
      on:closeModal={() => {
        login = false;
      }}
      on:concedido={(e) => {
        console.log(e.detail);
        login = false;
        concedido = true;
        generaMenus = true;
      }}
    />
  {/if}

  {#if Cargado}
  <NavPrincipal
    on:openLogin={() => {
      generaMenus = false;
      concedido = false;
      login = true;
    }}
  />
  {:else}
  <div class="text-center">
    <div class="spinner-border text-success pt-2" role="status">
      <span class="sr-only visually-hidden">Loading...</span>
    </div>
  </div>
{/if}

  {#if generaMenus}
    <MenuDocentes />
  {/if}

  {#if !concedido}
    <div class="descudo">
      <img id="escudo" class="escudo" src="./escudo.png" alt="escudo" />
    </div>

    <!--  -->
  {/if}
</main>

<!-- <footer>www.iedeoccidente.com</footer> -->
<style>
  .escudo {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
