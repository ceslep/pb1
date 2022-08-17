<script>
    import {
        afterUpdate,
        beforeUpdate,
        createEventDispatcher,
        onDestroy,
        onMount,
    } from "svelte";
    // @ts-ignore

    export let detallado = [];
    export let asignatura = "";
    export let periodo = "";
    export let nombresEstudiante;

    let elModal;
    let myModal;

    const dispatch = createEventDispatcher();

    onMount(() => {
        console.clear();
        console.log("........");
        detallado = [
            ...detallado
                .sort((a, b) => {
                    if (a.FechaNota < b.FechaNota) return 1;
                    else return -1;
                })
                .filter((detalle) => detalle.Nota)
                .map((detalle) => {
                    return {
                        ...detalle,
                        FechaAspecto: detalle.FechaAspecto&&detalle.FechaAspecto.includes("-")
                            ? new Intl.DateTimeFormat("es-CO", {
                                  month: "short",
                                  day: "numeric",
                              }).format(new Date(detalle.FechaAspecto))
                            : detalle.FechaAspecto&&detalle.FechaAspecto.length > 3
                            ? detalle.FechaAspecto
                            : "Sin Fecha",
                        FechaNota: detalle.FechaNota.includes("-")
                            ? new Intl.DateTimeFormat("es-CO", {
                                  month: "short",
                                  day: "numeric",
                              }).format(new Date(detalle.FechaNota))
                            : detalle.FechaNota.length > 3
                            ? detalle.FechaNota
                            : "Sin Fecha",
                        Porcentaje: detalle.Porcentaje
                            ? detalle.Porcentaje
                            : "N/A",
                        Aspecto: detalle.Aspecto
                            ? detalle.Aspecto
                            : "No hay aspecto registrado",
                    };
                }),
        ];
        console.clear();
        console.log(detallado);
    });

    afterUpdate(() => {});

    onDestroy(() => {
        myModal && myModal.dispose();
        console.log("destruyendo modal");
        elModal = undefined;
    });

    // @ts-ignore
    $: if (elModal)
        if (!myModal) {
            // @ts-ignore
            myModal = new bootstrap.Modal(elModal);
            myModal.show();
        }
</script>

<div
    bind:this={elModal}
    class="modal"
    id="modalIngresoDocentes"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
>
    <div
        id="idmu1"
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable fadeIn animate__animated animate__flipInX
        
        "
    >
        <div class="modal-content">
            <div class="modal-header bg-success bg-gradient bg-opacity-50">
                <h5 class="modal-title text-success" id="exampleModalLabel">
                    {asignatura} Período {periodo}
                </h5>
                <button
                    type="button"
                    class="btn-close text-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    on:click={() => dispatch("closeModal")}
                />
            </div>
            <div class="modal-body">
                <span class="text-success">Estudiante {nombresEstudiante}</span>
                <div class="table-responsive">
                    <table
                        class="table table-striped table-inverse table-responsive table-bordered  caption-top"
                    >
                        <caption class="fw-bold">
                            Profesor {detallado[0]
                                ? detallado[0].profesor
                                    ? detallado[0].profesor
                                    : detallado[0].Docente
                                : ""}
                        </caption>
                        <thead class="bg-warning bg-gradient bg-opacity-50">
                            <tr class="align-middle text-center fs-">
                                <th>#</th>
                                <th>Aspecto</th>
                                <th>Fecha</th>
                                <th>Nota</th>
                                <th>Fecha Nota</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each detallado as detallado, index}
                                <tr class="align-middle text-center fs-7">
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {detallado.Aspecto}
                                    </td>
                                    <td>
                                        {detallado.FechaAspecto}
                                    </td>
                                    <td>
                                        <span
                                            class:perdida={detallado.Nota < 3}
                                            class:blink_me={detallado.Nota < 3}
                                            >{detallado.Nota}</span
                                        >
                                    </td>
                                    <td>
                                        {detallado.FechaNota}
                                    </td>
                                    <td>
                                        {detallado.Porcentaje}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary rounded-0"
                    data-bs-dismiss="modal"
                    on:click={() => dispatch("closeModal")}
                >
                    Cerrar</button
                >
            </div>
        </div>
    </div>
</div>

<style>
    .fs-7 {
        font-size: 0.7rem;
    }
    .perdida {
        color: red;
    }

    .blink_me {
        animation: blinker 1s linear infinite;
    }
    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }

    .modal-body {
        max-height: calc(100vh - 210px);
        overflow-y: auto;
    }
</style>
