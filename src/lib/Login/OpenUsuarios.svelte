<script>
    import {
        afterUpdate,
        beforeUpdate,
        createEventDispatcher,
        onDestroy,
        onMount,
    } from "svelte";

    import {Docentes,Docente} from "./../../stores.js";
    // @ts-ignore

    let elModal;
    let myModal;
    let options=[];

    const dispatch = createEventDispatcher();

    onMount(() => {
        console.log("montando openUsuarios.svelte");
    });

    afterUpdate(() => {});

    onDestroy(() => {
        myModal && myModal.dispose();
        console.log("destruyendo modal openUsuarios.svelte");
        elModal = undefined;
    });

    // @ts-ignore
    $: if (elModal)
        if (!myModal) {
            // @ts-ignore
            myModal = new bootstrap.Modal(elModal);
            myModal.show();
        }

        let elDocentes;
        let myDocentes;
        let selDocente;

        

        $:if (elDocentes){
            
                console.log(myDocentes);
                
           
            
        /* let html="<option value=''>Seleccione un docente</option>";
        $Docentes.forEach(docente => {
           html+=`
                <option value="${docente.identificacion}">${docente.nombres}</option>
           `;
        });
        elDocentes.innerHTML=html; */
      }  

    $: if (elDocentes) {
       
        if (!myDocentes) {
           
            // @ts-ignore
            myDocentes = new TomSelect(elDocentes, {
                maxItems: 1,
                valueField: 'identificacion',
                labelField: 'title',
                searchField: ['title','identificacion'],
               options:$Docentes.map((docente,i)=>{
                return{
                        id:i,
                        title:docente.nombres,
                        identificacion:docente.identificacion,
                        value:docente.identificacion
                }}),
               render:{
                option:function(item,escape){
                    return `<div>
                                <div>${escape(item.title)}</div>
                                <span>${escape(item.identificacion)}</span>
                            </div>`;
                }
               },
               create: true
            });
        }

      
    }

    $:console.log(selDocente);
</script>

<div
    bind:this={elModal}
    class="modal"
    id="modalSelDocentes"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
>
    <div
        class="modal-dialog modal-dialog-centered  fadeIn animate__animated animate__flipInX"
    >
        <div class="modal-content">
            <div class="modal-header bg-warning">
                <h5 class="modal-title text-white" id="exampleModalLabel">
                    Docentes
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
                <select
                    id="docentesNotas"
                    bind:this={elDocentes}
                    on:change={(e)=>{
                        // @ts-ignore
                        selDocente=e.target.value;
                    }}
                />
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-info rounded-0"
                    data-bs-dismiss="modal">Cerrar</button
                >
                <button type="button" class="btn btn-dark rounded-0 ingDocentes"
                on:click={
                    ()=>{
                        dispatch("ingDocentes",selDocente);
                    }
                }    
                >Aceptar<i class="bi bi-search ms-2" />
                    
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .modal {
        z-index: 10000;
    }
</style>
