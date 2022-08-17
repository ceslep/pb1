<script>
    import {
        afterUpdate,
        beforeUpdate,
        createEventDispatcher,
        onDestroy,
        onMount,
    } from "svelte";
    // @ts-ignore

    import {
        URL,
       
       
    } from "./../../../../stores.js";
    import TablaInasistencias from "../../Inasistencias/TablaInasistencias.svelte";

   
    let elModal;
    let myModal;
    
    

    export let dataInasistencias=[];
    export let asignatura;
    export let periodo;
    export let nombres;

    const dispatch = createEventDispatcher();

    onMount(async () => {
       
    });

   

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

    

    let abrirUsuarios = false;
    const openUsuarios = () => {
        abrirUsuarios = true;
    };

   
</script>

<div
    bind:this={elModal}
    class="modal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
>
    <div
        id="idmu1"
        class="modal-dialog modal-dialog-centered fadeIn animate__animated animate__flipInX
        
        "
    >
        <div class="modal-content">
            <div class="modal-header bg-success bg-gradient bg-opacity-50">
                <h5 class="modal-title text-success" id="exampleModalLabel">
                   Inasistencias {asignatura} período {periodo}
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
                Estudiante {nombres}
                <TablaInasistencias {dataInasistencias} />
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
    .modal-body {
        max-height: calc(100vh - 210px);
        overflow-y: auto;
    }
</style>