<script>
	import TableOtrosLogros from './TableOtrosLogros.svelte';
  import {
    URL,
    Periodo,
    Asignatura,
    Docente,
    Nivel,
    Numero,
  } from "./../../../../../stores.js";
  import { afterUpdate } from "svelte";

  export let refresh;
  let datosOtros = [];
  let consultando = false;

  const getOtrosLogros = async () => {
    let data = {
      PERIODO: $Periodo,
      asignatura: $Asignatura,
      docente: $Docente,
      nivel: $Nivel,
      numero: $Numero,
    };

    let response = await fetch(`${$URL}getOtrosLogros.php`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  };

  afterUpdate(async () => {
    if (refresh) {
      datosOtros=[];
      refresh = false;
      consultando = !consultando;
      datosOtros = await getOtrosLogros();
      consultando = !consultando;
    }
  });

  $:datosOtrosFilter=[...datosOtros];

  const busquedaOtros=(e)=>{
      let criterio=e.target.value;
      let filtro=[];
      if(criterio.length>3)
      filtro=datosOtros.filter(d=>d.descripcion.toLowerCase().includes(criterio.toLowerCase())||
      d.descripcionEspecial.toLowerCase().includes(criterio.toLowerCase()));
      else filtro=[...datosOtros];
      datosOtrosFilter=[...filtro];
  }
</script>

<main>
  <input on:input={busquedaOtros} type="search" name="busqueda" id="otrosBusqueda" class="form-control">
  <TableOtrosLogros datosOtros={datosOtrosFilter} />
  {#if consultando}
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only visually-hidden">Loading...</span>
      </div>
    </div>
  {/if}
</main>
