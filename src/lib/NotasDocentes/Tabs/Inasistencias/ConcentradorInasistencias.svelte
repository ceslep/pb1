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

    import SelectPeriodos from "./../../../Componentes/SelectPeriodos.svelte";
    import ModalInasistenciasDetallado from "./ModalInasistenciasDetallado.svelte";

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
        let response = await fetch(`${$URL}/getConcentradorInasistencias.php`, {
            method: "POST",
            body: JSON.stringify(Options),
        });
        return await response.json();
    };

    const consultaInasistencias = async () => {
        let response = await fetch(`${$URL}getInasistencias.php`, {
            method: "POST",
            body: JSON.stringify(Options),
        });
        return await response.json();
    };

    let html;
    let inasistencias;
    let concentrador;

    const inicio = async () => {
        if (refresh) {
            refresh = false;
            html = undefined;
            concentrador = undefined;
            inasistencias = undefined;
            console.log("refrescando");
            html = await consultaConcentrador();
            inasistencias = await consultaInasistencias();
        }
    };

    onMount(() => {
        selectPeriodo = $Periodo;
        inicio();
    });
    afterUpdate(async () => {
        inicio();
    });

    const setInasistencias = async () => {
        await inasistencias.forEach((valor) => {
            let { estudiante, asignatura, cantidadInasistencias } = valor;
            let idest = `iestudiante_${estudiante}_${asignatura}`;
            console.log(idest);
            try {
                let clase = "";

                document.getElementById(
                    idest
                ).innerHTML = `<button class="btn btn-sm" href='#!' style='text-decoration:none;'">
                    <span class="${clase}">
                    ${cantidadInasistencias}
                    </span>
                    </button>`;
            } catch (e) {}
        });
    };

    const imgSRC = (texto) => {
        var imagensrc = "./inasistencia.png";
        if (texto.toLowerCase().includes("enfer")) imagensrc = "./enfermo.png";
        else if (texto.toLowerCase().includes("medic"))
            imagensrc = "./medico.png";
        else if (texto.toLowerCase().includes("otros"))
            imagensrc = "./otros.png";
            else if (texto.toLowerCase().includes("fuga"))
            imagensrc = "./fuga.png";
        return imagensrc;
    };

    const mostrarInasistenciasDetallado = async (data) => {
        console.log(data);
        let response = await fetch(`${$URL}inasistenciasDetallado.php`, {
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

    let estudiant;
    let asignatur;
    let period;
    let nombress;

    const concentradorClick = async (e) => {
        let button = e.target.closest("button");
        if (button) {
            let data = button.parentElement.parentElement.dataset;
            console.log(data);
            idinner = button.parentElement.id;
            inner = button.parentElement.innerHTML;
            nombresEstudiante = data.nombres;
            button.parentElement.innerHTML = ` <div class="d-flex justify-content-center">
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`;
            console.log(idinner, inner);
            const { periodo, asignatura, estudiante,nombres } = data;
            data = { ...data, asignat: asignatura };
            estudiant = estudiante;
            asignatur = asignatura;
            period = periodo;
            nombress=nombres;
            Per = periodo;
            Asig = asignatura;
            detallado = [
                ...(await mostrarInasistenciasDetallado(data)).map(
                    (inasistencia) => {
                        return {
                            fecha: inasistencia.fecha,
                            excusa: inasistencia.excusa,
                            horas: inasistencia.horas.includes("f")? "Fuga":inasistencia.horas,
                            hora_clase:
                                inasistencia.hora_clase != ""
                                    ? inasistencia.hora_clase
                                    : "Sin registro de la hora",
                            detalle:
                                inasistencia.detalle !== ""
                                    ? inasistencia.detalle !==
                                      inasistencia.excusa
                                        ? `${inasistencia.detalle}-${inasistencia.excusa}`
                                        : inasistencia.excusa
                                    : inasistencia.excusa,
                            imagensrc: imgSRC(`${inasistencia.excusa} ${inasistencia.detalle}`),
                        };
                    }
                ),
            ];
            console.log(detallado);
            mostrarDetallado = true;
            document.getElementById(idinner).innerHTML = inner;
        }
    };
    $: if (concentrador && inasistencias) {
        setInasistencias();
    }

    const changePeriodo = async (e) => {
        Options.periodo = e.detail;
        selectPeriodo = e.detail;
        console.log(Options);
        refresh = true;
        await inicio();
    };
    let Per;
    let Asig;
    let detallado;
    let selectPeriodo;
    let nombresEstudiante;
</script>

{#if mostrarDetallado}
    <ModalInasistenciasDetallado
        dataInasistencias={detallado}
        asignatura={asignatur}
        periodo={period}
        nombres={nombress}
        on:closeModal={() => {
            mostrarDetallado = false;
        }}
    />
{/if}
<main class="os">
    {#if html}
        <SelectPeriodos
            Periodo={selectPeriodo}
            on:periodoSelected={changePeriodo}
        />
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
