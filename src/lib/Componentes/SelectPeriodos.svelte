<script>
    import { onDestroy, createEventDispatcher } from "svelte";
    import { Periodos } from "./../../stores.js";


    let elPeriodo;
    let myPeriodo;
    let selectedPeriodo;
    let losPeriodos;
    
    const dispatch = createEventDispatcher();
    
    export let Periodo;
    

    onDestroy(() => {
        console.log("destruyendo select");
        elPeriodo = undefined;
    });

    $: if (elPeriodo) {
        let html = "";
        losPeriodos.forEach((periodo) => {
            html += `
                <option value="${periodo.nombre}" ${periodo.selected}>${periodo.nombre}</option>
           `;
        });
        elPeriodo.innerHTML = html;
    }

    $: if (elPeriodo) {
        if (!myPeriodo) {
            // @ts-ignore
            myPeriodo = new TomSelect(elPeriodo, {
                create: true,
            });
        }
    }

    $:losPeriodos=[...$Periodos.map(periodo=>{
        return{
            ...periodo,
            selected:periodo.nombre===Periodo?"selected":""
        }
    })];
</script>

<div class="form-group">
    <label for="periodo">Período </label>
    <select
        bind:this={elPeriodo}
        bind:value={selectedPeriodo}
        name="periodo"
        id="periodonotas"
        class=""
        tabindex="-1"
        on:change={(e) => {
            // @ts-ignore
            dispatch("periodoSelected", e.target.value);
        }}
    />
</div>

<style>
</style>
