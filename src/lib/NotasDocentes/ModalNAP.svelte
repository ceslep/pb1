<script>
    import {
        afterUpdate,
        beforeUpdate,
        createEventDispatcher,
        onDestroy,
        onMount,
    } from "svelte";
    // @ts-ignore
    import Swal from "sweetalert2";

    

    import { Search, BookmarkCheck,DoorClosed } from "svelte-bootstrap-icons";

    export let Aspecto;
    export let Porcentaje;
    export let Fecha;
    export let Title;
    export let Indice;

    let selectedPeriodo = "TRES";
    let elModal;
    let myModal;
    let elPeriodo;
    let myPeriodo;

    const dispatch = createEventDispatcher();

    onMount(() => {
        console.log("montando");
    });

    afterUpdate(() => {});

    onDestroy(() => {
        myModal && myModal.dispose();
        console.log("destruyendo modal");
        elModal = undefined;
        elPeriodo = undefined;
    });

    // @ts-ignore
    $: if (elModal)
        if (!myModal) {
            // @ts-ignore
            myModal = new bootstrap.Modal(elModal);
            myModal.show();
        }

    let spcid = false;
    let form;
</script>

<div
    bind:this={elModal}
    class="modal"
    id="modalNAP"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
>
    <div
        id="idmu1"
        class="modal-dialog modal-dialog-centered fadeIn animate__animated animate__bounceInDown
        
        "
    >
        <div class="modal-content">
            <div class="modal-header bg-success bg-gradient bg-opacity-75">
                <h5 class="modal-title text-white" id="exampleModalLabel">
                    Aspectos de la nota {Indice}
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
                <form id="frmIngresoDocentes" bind:this={form}>
                    <div class="mb-3">
                        <label for="Aspecto" class="form-label fw-bold fst-italic text-success">
                            Aspecto para la nota {Title}</label
                        >
                        <textarea
                            bind:value={Aspecto}
                            class="form-control bg-light"
                            id="Aspecto"
                            rows="2"
                        />
                    </div>
                    <div class="row">
                        <div class="mb-3 col-8">
                            <label for="Porcentaje" class="form-label fw-bold fst-italic text-success"
                                >Porcentaje</label
                            >
                            <input
                                type="text"
                                bind:value={Porcentaje}
                                class="form-control d-block w-100 bg-light"
                                id="Porcentaje"
                                inputmode="numeric"
                            />
                        </div>
                        <div class="mb-3 col-4">
                            <label for="Porcentaje" class="form-label fw-bold fst-italic text-success"
                                >Fecha</label
                            >
                            <input
                                type="date"
                                bind:value={Fecha}
                                class="form-control d-block w-100 bg-light"
                                id="Fecha"
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary rounded-0"
                    data-bs-dismiss="modal"
                    on:click={() => dispatch("closeModal")}
                >
                    Cerrar <DoorClosed/></button
                >
                <button
                    type="button"
                    class="btn btn-success rounded-0 bg-gradient bg-opacity-25"
                    on:click={() =>
                        dispatch("asignaAspecto", {
                            Aspecto,
                            Porcentaje,
                            Fecha,
                            Nota:Title,
                            Indice
                        })}
                    >Aceptar<BookmarkCheck />
                    {#if spcid}
                        <div
                            class="spinner-border spinner-border-sm"
                            role="status"
                        >
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    {/if}
                </button>
            </div>
        </div>
    </div>
</div>
