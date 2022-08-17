<script>
    import {
        Grado,
        Asignatura,
        Docente,
        Periodo,
        Nivel,
        Numero,
    } from "./../../../stores.js";
    import { afterUpdate, onMount } from "svelte";
    import TablaNotas from "./Notas/TablaNotas.svelte";
    import Periodos from "./Periodos/Periodos.svelte";
    import Concentrador from "./Concentrador/Concentrador.svelte";
    import ConcentradorInasistencias from "./Inasistencias/ConcentradorInasistencias.svelte";
    import BarrasGrupales from "./Estadisticas/Grupales/BarrasGrupales.svelte";
    import LineasGrupales from "./Estadisticas/Grupales/LineasGrupales.svelte";
    import LineasAsignatura from "./Estadisticas/Asignatura/LineasAsignatura.svelte";
    import BarrasAsignatura from "./Estadisticas/Asignatura/BarrasAsignatura.svelte";
    import Descripciones from "./Descripciones/Descripciones.svelte";
    export let tableData = [];
    let tableDataR = [];
    let elTabs;
    let tabPanel = "tablaNotas-tab";
    let refreshPeriodos = false;
    let refreshConcentrador = false;
    let refreshConcentradorInasistencias = false;
    let refreshEstadisticas = false;
    let refreshDescripciones = false;
    let grupales = false;
    let refreshData = false;

    afterUpdate(() => {
        tableDataR = [...tableData];
        console.log(tableDataR);
    });

    $: if (elTabs) {
        elTabs.addEventListener("shown.bs.tab", async (event) => {
            tabPanel = event.target.id;
            refreshPeriodos = tabPanel === "periodos-tab";
            refreshConcentrador = tabPanel === "concentrador-tab";
            refreshConcentradorInasistencias = tabPanel === "inasistencias-tab";
            refreshEstadisticas = tabPanel === "estadisticas-tab";
            refreshDescripciones = tabPanel === "descripciones-tab";
            if (tabPanel === "tablaNotas-tab") {
                tableDataR = [...tableData];
            } else tableDataR = [];
        });
    }
</script>

<ul class="nav nav-tabs p-0 m-0" id="myTab" role="tablist" bind:this={elTabs}>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link active"
            id="tablaNotas-tab"
            data-bs-toggle="tab"
            data-bs-target="#tablaNotas-tab-pane"
            type="button"
            role="tab"
            aria-controls="tablaNotas-tab-pane"
            aria-selected="true">Notas</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            id="periodos-tab"
            data-bs-toggle="tab"
            data-bs-target="#periodos-tab-pane"
            type="button"
            role="tab"
            aria-controls="periodos-tab-pane"
            aria-selected="false">Períodos</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            id="concentrador-tab"
            data-bs-toggle="tab"
            data-bs-target="#concentrador-tab-pane"
            type="button"
            role="tab"
            aria-controls="concentrador-tab-pane"
            aria-selected="false">Concentrador</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            id="inasistencias-tab"
            data-bs-toggle="tab"
            data-bs-target="#inasistencias-tab-pane"
            type="button"
            role="tab"
            aria-controls="inasistencias-tab-pane"
            aria-selected="false">Inasistencias</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            id="estadisticas-tab"
            data-bs-toggle="tab"
            data-bs-target="#estadisticas-tab-pane"
            type="button"
            role="tab"
            aria-controls="estadisticas-tab-pane"
            aria-selected="false">Estadísticas</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            id="descripciones-tab"
            data-bs-toggle="tab"
            data-bs-target="#descripciones-tab-pane"
            type="button"
            role="tab"
            aria-controls="descripciones-tab-pane"
            aria-selected="false">Descripciones</button
        >
    </li>
</ul>
<div class="tab-content" id="myTabContent">
    <div
        class="tab-pane fade show active"
        id="tablaNotas-tab-pane"
        role="tabpanel"
        aria-labelledby="tablaNotas-tab"
        tabindex="0"
    >
        {#if tableDataR.length > 0}
            <TablaNotas
                tableData={tableDataR}
                grado={$Grado}
                asignatura={$Asignatura}
                docente={$Docente}
                periodo={$Periodo}
            />
        {:else}
            <!-- bootstrap alert-->
            <div
                class="mt-2 alert alert-success alert-dismissible fade show"
                role="alert"
            >
                <strong>Aviso!</strong> Seleccione el grado y la asignatura.
            </div>
        {/if}
    </div>
    <div
        class="tab-pane fade"
        id="periodos-tab-pane"
        role="tabpanel"
        aria-labelledby="periodos-tab"
        tabindex="0"
    >
        <div class="os">
            {#if $Nivel !== "" && $Numero != "" && $Asignatura != ""}
                <Periodos refresh={refreshPeriodos} />
            {:else}
                <!-- bootstrap alert-->
                <div
                    class="mt-2 alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    <strong>Aviso!</strong> Seleccione el grado y la asignatura.
                </div>
            {/if}
        </div>
    </div>
    <div
        class="tab-pane fade"
        id="concentrador-tab-pane"
        role="tabpanel"
        aria-labelledby="concentrador-tab"
        tabindex="0"
    >
        <div class="os">
            {#if $Nivel !== "" && $Numero != "" && $Asignatura != ""}
                <Concentrador refresh={refreshConcentrador} />
            {:else}
                <!-- bootstrap alert-->
                <div
                    class="mt-2 alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    <strong>Aviso!</strong> Seleccione el grado y la asignatura.
                </div>
            {/if}
        </div>
    </div>
    <div
        class="tab-pane fade"
        id="inasistencias-tab-pane"
        role="tabpanel"
        aria-labelledby="inasistencias-tab"
        tabindex="0"
    >
        <div class="os">
            {#if $Nivel !== "" && $Numero != "" && $Asignatura != ""}
                <ConcentradorInasistencias
                    refresh={refreshConcentradorInasistencias}
                />
            {:else}
                <!-- bootstrap alert-->
                <div
                    class="mt-2 alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    <strong>Aviso!</strong> Seleccione el grado y la asignatura.
                </div>
            {/if}
        </div>
    </div>
    <div
        class="tab-pane fade"
        id="estadisticas-tab-pane"
        role="tabpanel"
        aria-labelledby="estadisticas-tab"
        tabindex="0"
    >
        {#if $Nivel !== "" && $Numero != "" && $Asignatura != ""}
            <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    bind:checked={grupales}
                    on:click={() => {
                        console.log(grupales);
                        grupales = !grupales;
                        refreshEstadisticas = true;
                        refreshData = false;
                    }}
                />
                <label class="form-check-label" for="flexSwitchCheckChecked"
                    >Grupales</label
                >
            </div>
            <div class="os">
                {#if grupales}
                    <div class="os2">
                        <BarrasGrupales refresh={refreshEstadisticas} />
                        <LineasGrupales refresh={refreshEstadisticas} />
                    </div>
                {:else}
                    <div class="os2">
                        <BarrasAsignatura refresh={refreshEstadisticas} />
                        <LineasAsignatura refresh={refreshEstadisticas} />
                    </div>
                {/if}
            </div>
        {:else}
            <!-- bootstrap alert-->
            <div
                class="mt-2 alert alert-success alert-dismissible fade show"
                role="alert"
            >
                <strong>Aviso!</strong> Seleccione el grado y la asignatura.
            </div>
        {/if}
    </div>
    <div
        class="tab-pane fade"
        id="descripciones-tab-pane"
        role="tabpanel"
        aria-labelledby="descripciones-tab"
        tabindex="0"
    >
        {#if $Nivel !== "" && $Numero != "" && $Asignatura != ""}
            <div class="os">
                <Descripciones refresh={refreshDescripciones} />
            </div>
        {:else}
            <!-- bootstrap alert-->
            <div
                class="mt-2 alert alert-success alert-dismissible fade show"
                role="alert"
            >
                <strong>Aviso!</strong> Seleccione el grado y la asignatura.
            </div>
        {/if}
    </div>
</div>

<style>
    .os {
        height: 653px;
        overflow: auto;
    }
    @media (max-width: 578px) {
        .os2 {
            height: 800px;
            font-size: 0.6rem;
        }
    }
    @media (min-width: 579px) {
        .os2 {
            height: 1660px;
            font-size: 0.6rem;
        }
    }
</style>
