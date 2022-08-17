<script>
    import { afterUpdate, onMount } from "svelte";
    import {
        URL,
        Asignatura,
        Nivel,
        Numero,
        Docente,
        CAsignacion,
        Periodo,
    } from "./../../../../stores.js";
    import ModalNotasDetallado from "../../AcademicoEstudiante/ModalNotasDetallado.svelte";
    import SelectPeriodos from "./../../../Componentes/SelectPeriodos.svelte";

    export let refresh;

    let Options = {
        Asignacion: $CAsignacion,
        asignatura: $Asignatura,
        nivel: $Nivel,
        numero: $Numero,
        docente: $Docente,
        periodo: $Periodo,
    };

    const consultaConcentrador = async () => {
        let response = await fetch(`${$URL}/getConcentradorSpinner.php`, {
            method: "POST",
            body: JSON.stringify(Options),
        });
        return await response.json();
    };

    const consultaNotas = async () => {
        let response = await fetch(`${$URL}getValoraciones.php`, {
            method: "POST",
            body: JSON.stringify(Options),
        });
        return await response.json();
    };

    let html;
    let valoraciones;
    let concentrador;

    const inicio = async () => {
        if (refresh) {
            refresh = false;
            html = undefined;
            concentrador = undefined;
            valoraciones = undefined;
            console.log("refrescando");
            html = await consultaConcentrador();
            valoraciones = await consultaNotas();
        }
    };

    onMount(() => {
        selectPeriodo=$Periodo;
        inicio();
    });
    afterUpdate(async () => {
        inicio();
    });

    const setValoraciones = async () => {
        await valoraciones.forEach((valor) => {
            let { estudiante, asignat, valoracion } = valor;
            let idest = `estudiante_${estudiante}_${asignat}`;

            //  console.log(idest);
            try {
                let clase = "";
                if (parseFloat(valoracion) < 3) clase = "text-danger";
                //document.getElementById(idest).classList.add("text-danger");
                document.getElementById(
                    idest
                ).innerHTML = `<button class="btn btn-sm" href='#!' style='text-decoration:none;'">
                    <span class="${clase}">
                    ${valoracion ? valoracion : '<img src="./tristea.gif" loading="lazy" width="25">'}
                    </span>
                    </button>`;
            } catch (e) {}
        });
    };

    const mostrarNotasDetallado = async (data) => {
        let response = await fetch(`${$URL}getNotasDetallado.php`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    };

    let mostrarDetallado = false;

    let inner;
    let idinner = "";

    const concentradorClick = async (e) => {
        let button = e.target.closest("button");
        if (button) {
            let data = button.parentElement.parentElement.dataset;
            console.log(data);
            idinner = button.parentElement.id;
            inner = button.parentElement.innerHTML;
            console.log(inner);
            nombresEstudiante = data.nombres;
            button.parentElement.innerHTML = ` <div class="d-flex justify-content-center">
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`;
            console.log(idinner, inner);
            const { periodo, asignatura } = data;
            Per = periodo;
            Asig = asignatura;
            detallado = [...(await mostrarNotasDetallado(data))];
            mostrarDetallado = true;
            document.getElementById(idinner).innerHTML = inner;
        }
    };
    $: if (concentrador && valoraciones) {
        setValoraciones();
    }

    const changePeriodo = async (e) => {
        Options.periodo = e.detail;
        selectPeriodo=e.detail;
        console.log(Options);
        refresh=true;
        await inicio();
    };
    let Per;
    let Asig;
    let detallado;
    let selectPeriodo;
    let nombresEstudiante;
</script>

{#if mostrarDetallado}
    <ModalNotasDetallado
        {detallado}
        {nombresEstudiante}
        periodo={Per}
        asignatura={Asig}
        on:closeModal={() => {
            mostrarDetallado = false;
        }}
    />
{/if}

<main class="os">
    {#if html}
        <SelectPeriodos Periodo={selectPeriodo} on:periodoSelected={changePeriodo} />
        <div
            id="concentrador"
            bind:this={concentrador}
            on:click={concentradorClick}
        >
            {@html html.html}
        </div>
    {:else}
        <div class="d-flex justify-content-center pt-5">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {/if}
</main>

<style>
    .os {
        height: 900px;
        font-size: 0.6rem;
    }
</style>
