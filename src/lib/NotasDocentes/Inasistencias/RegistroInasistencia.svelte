<script>
    import { URL } from "./../../../stores.js";
    import {
        afterUpdate,
        beforeUpdate,
        createEventDispatcher,
        onDestroy,
        onMount,
    } from "svelte";
    // @ts-ignore
    import Swal from "sweetalert2";

    import { TelephoneForwardFill } from "svelte-bootstrap-icons";
    import TablaInasistencias from "./TablaInasistencias.svelte";
    import FormularioInasistencias from "./FormularioInasistencias.svelte";
    import ResumenAcademico from "../AcademicoEstudiante/ResumenAcademico.svelte";

    export let estudiante;
    export let Nombres;

    let elModal;
    let myModal;
    let tabPanel = "datos-tab";

    let elTabs;
    let elid;

    let dataInasistencias = [];

    const dispatch = createEventDispatcher();

    onMount(() => {
        console.log("montando");
        fecha = new Date().toISOString().slice(0, 10);
    });

    afterUpdate(() => {});

    onDestroy(() => {
        myModal && myModal.dispose();
        console.log("destruyendo modal");
        elModal = undefined;
    });

    const imgSRC = (texto) => {
        var imagensrc = "";
        if (texto.toLowerCase().includes("enfer")) imagensrc = "./enfermo.png";
        else if (texto.toLowerCase().includes("medic"))
            imagensrc = "./medico.png";
        else if (texto.toLowerCase().includes("otros"))
            imagensrc = "./otros.png";
        return imagensrc;
    };

 const consultarInasistencias = async (periodo = true) => {
        let datos = Object.fromEntries(new FormData(form));
        if (!periodo) datos.periodo = "TODOS";
        let response = await fetch(`${$URL}inasistenciasDetallado.php`, {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return (await response.json()).map((inasistencia) => {
            return {
                fecha: inasistencia.fecha,
                excusa: inasistencia.excusa,
                horas: inasistencia.horas,
                hora_clase:
                    inasistencia.hora_clase != ""
                        ? inasistencia.hora_clase
                        : "Sin registro de la hora",
                detalle:
                    inasistencia.detalle !== ""
                        ? inasistencia.detalle !== inasistencia.excusa
                            ? `${inasistencia.detalle}-${inasistencia.excusa}`
                            : inasistencia.excusa
                        : inasistencia.excusa,
                imagensrc: imgSRC(inasistencia.excusa),
            };
        });
    };

    // @ts-ignore
    $: if (elModal)
        if (!myModal) {
            // @ts-ignore
            myModal = new bootstrap.Modal(elModal);
            myModal.show();
        }

    $: if (elTabs) {
        elTabs.addEventListener("shown.bs.tab", async (event) => {
          
            elid = event.target.id;
            tabPanel = event.target.id;
            let estudTemp;
            mostrarTodoPeriodos = false;
            if (elid == "resumen-tab") {
                mostrarTodo = false;
                cargandoInasistencias = true;
                dataInasistencias = [...(await consultarInasistencias())];
                console.log(dataInasistencias);
                cargandoInasistencias = false;
            } else if (elid === "academico-tab") {
                estudTemp = estudiante;
                estudiante = "";
                estudiante = estudTemp;
            }
        });
    }

    let spcid = false;
    let form;

    let fecha = new Date().toISOString().slice(0, 10);

    const guardarInasistencia = async () => {
        Guardando = true;
        let datos = Object.fromEntries(new FormData(form));
        console.log(datos);
        await fetch("guardarInasistencia.php", {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json",
            },
        });

        await Swal.fire({
            title: "Registro de Inasistencia",
            text: "Se registró la inasistencia correctamente",
            confirmButtonText: "Aceptar",
        });
        Guardando = false;
        dispatch("closeModal");
    };

    let Guardando = false;
    let cargandoInasistencias = false;
    let mostrarTodo = false;
    let mostrarTodoPeriodos = false;

    const mostrarTodasInasistencias = async () => {
        if (mostrarTodo) {
            cargandoInasistencias = true;
            dataInasistencias = [...(await consultarInasistencias(false))];
            console.log(dataInasistencias);
            cargandoInasistencias = false;
        } else {
            dataInasistencias = [...(await consultarInasistencias())];
            console.log(dataInasistencias);
            cargandoInasistencias = false;
        }
    };
</script>

<div
    bind:this={elModal}
    class="modal fs-7"
    id="modalInasistencias"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="titlemodal"
    style="display: none;"
    aria-hidden="true"
>
    <form bind:this={form} on:submit|preventDefault={guardarInasistencia}>
        <div
            class="modal-dialog  modal-xl modal-dialog-scrollable modal-fullscreen-md-down animate__animated animate__bounceIn"
        >
            <div class="modal-content">
                <div class="modal-header bg-danger bg-gradient bg-opacity-75">
                    <h5 class="modal-title text-white" id="titlemodal">
                       Inasistencias y Convivencia
                    </h5>
                    <button
                        type="button"
                        class="ms-1 btn btn-outline-white float-start text-yellow "
                    >
                        <TelephoneForwardFill />
                    </button>
                    <button
                        type="button"
                        class="btn-close text-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        on:click={() => dispatch("closeModal")}
                    />
                </div>
                <div class="modal-body">
                    <div
                        class="alert alert-danger bg-gradient text-danger fs-7"
                        role="alert"
                    >
                        {Nombres}
                    </div>

                    <ul class="nav nav-tabs inastabs" bind:this={elTabs}>
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                aria-current="page"
                                id="datos-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#datos"
                                href="#!">Datos</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                id="resumen-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#resumenInasistenciasEstudiante"
                                href="#!">Resumen</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                id="convivencia-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#convivencia"
                                href="#!">Convivencia</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                id="academico-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#academico"
                                href="#!">Académico</a
                            >
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div
                            class="tab-pane fade show active"
                            id="datos"
                            role="tabpanel"
                            aria-labelledby="datos-tab"
                        >
                            <FormularioInasistencias {estudiante} />
                        </div>
                        <div
                            class="tab-pane fade resumenInasistenciasEstudiante"
                            id="resumenInasistenciasEstudiante"
                            role="tabpanel"
                            aria-labelledby="resumen-tab"
                        >
                            {#if dataInasistencias.length > 0}
                                <div class="form-check form-switch pt-2">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckDefault"
                                        bind:checked={mostrarTodo}
                                        on:change={mostrarTodasInasistencias}
                                    />
                                    <label
                                        class="form-check-label pt-1"
                                        for="flexSwitchCheckDefault"
                                        >Mostrar Todas las Inasistencias</label
                                    >
                                </div>
                                <TablaInasistencias {dataInasistencias} />
                            {:else if cargandoInasistencias}
                                <div class="text-center pt-2">
                                    <div
                                        class="spinner-border text-danger"
                                        role="status"
                                    >
                                        <span class="sr-only visually-hidden"
                                            >Loading...</span
                                        >
                                    </div>
                                </div>
                            {:else}
                                <div class="text-center pt-2">
                                    <h5>No hay Inasistencias</h5>
                                </div>
                            {/if}
                        </div>
                        <div
                            class="tab-pane fade"
                            id="convivencia"
                            role="tabpanel"
                            aria-labelledby="convivencia-tab"
                        >
                            <iframe
                                title=""
                                src=""
                                id="frameConvivencia"
                                frameborder="0"
                            />
                        </div>
                        <div
                            class="tab-pane fade"
                            id="academico"
                            role="tabpanel"
                            aria-labelledby="academico-tab"
                        >
                            <div class="form-check form-switch pt-2">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    bind:checked={mostrarTodoPeriodos}
                                    on:change={()=>{
                                        console.log(mostrarTodoPeriodos);
                                        elid="academico-tab";
                                     
                                    }}
                                   
                                />
                                <label
                                    class="form-check-label pt-1"
                                    for="flexSwitchCheckDefault"
                                    >Mostrar Todos los períodos</label
                                >
                            </div>
                            <ResumenAcademico elTab={elid} nombresEstudiante={Nombres} {estudiante} {mostrarTodoPeriodos}/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    {#if tabPanel === "datos-tab"}
                        <button
                            type="button"
                            class="btn btn-dark rounded-0"
                            data-bs-dismiss="modal"
                            on:click={() => dispatch("closeModal")}
                            >Cerrar</button
                        >
                        <button
                            type="submit"
                            class="btn btn-danger bg-gradient rounded-0 setInas"
                            >Guardar
                            {#if Guardando}
                                <div
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                >
                                    <span class="visually-hidden"
                                        >Loading...</span
                                    >
                                </div>
                            {/if}
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    </form>
</div>

<style>
    .modal-body {
        max-height: calc(100vh - 210px);
        overflow-y: auto;
    }

    @media (max-width: 768px) {
        .fs-7 {
            font-size: 0.7rem;
        }
    }
</style>
