<script>
    import { onMount } from "svelte";
import TabPrincipal from "../NotasDocentes/Tabs/TabPrincipal.svelte";

    import {
        URL,
        CAsignacion,
        Asignatura,
        Docente,
        Nivel,
        Numero,
        Grado,
        Periodo,
        NombresDocente,
    } from "./../../stores.js";
    import Menu from "./Menu.svelte";

    let DatosDocente = [];

    let tableData;

    onMount(async () => {
        let response = await fetch(`${$URL}generarMenu.php`, {
            method: "POST",
            body: JSON.stringify({
                docente: $Docente,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        DatosDocente = await response.json();
    });

    let consulta = false;
    let spnconsulta = false;

    const getTableData = async () => {
        let response = await fetch(`${$URL}getNotas.php`, {
            method: "POST",
            body: JSON.stringify({
                asignacion: $CAsignacion,
                asignatura: $Asignatura,
                docente: $Docente,
                nivel: $Nivel,
                numero: $Numero,
                periodo: $Periodo,
            }),
        });
        return await response.json();
    };
</script>

<main class="mt-6 mx-6">
    <h6 class="pt-3">{$NombresDocente} - PERIODO {$Periodo}</h6>
    <div class="d-flex justify-content-between">
        {#if DatosDocente.length > 0}
            <Menu
                data={DatosDocente}
                on:consultaNotas={async () => {
                    consulta = true;
                    spnconsulta = true;
                    tableData = [...(await getTableData())]
                        .sort((dataA, dataB) =>
                            dataA.Nombres > dataB.Nombres ? 1 : -1
                        )
                        .map((data) => {
                            return {
                                ...data,
                                Val: data.Val !== null ? data.Val : "",
                            };
                        });
                    spnconsulta = false;
                }}
                on:consultando={() => {
                    consulta = false;
                }}
            />
        {:else}
            <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        {/if}
        {#if spnconsulta}
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        {/if}
        <span class="pt-2 fs-bold text-primary fs-6">
            {$Asignatura} <span class="fs-bold text-black">&rarr;</span>
            {$Grado}
        </span>
    </div>
</main>

<main class="m-2">
<TabPrincipal {tableData}/>
</main>

<style>
    .mt-6 {
        margin-top: 3rem;
    }

    .mx-6 {
        margin-left: 1rem;
        margin-right: 1rem;
    }
</style>
