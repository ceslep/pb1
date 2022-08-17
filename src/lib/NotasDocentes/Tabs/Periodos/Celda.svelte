<script>
    import { Asignatura } from "./../../../../stores.js";
    import ModalNotasDetallado from "./../../AcademicoEstudiante/ModalNotasDetallado.svelte";
    export let clase;
    export let valoracion;
    export let detallado;
    export let periodo;

    let btnColor = "";

    const notasDetallado = () => {
        mostrarDetallado = true;
    };

    $: btnColor =
        valoracion < 3 && valoracion >= 1 && periodo !== "💀"
            ? "btn-outline-danger"
            : valoracion == "0"
            ? "d-none"
            : periodo!=="💀"?"btn-outline-success":"btn-outline-dark";

    let mostrarDetallado = false;
    let cantidadesNotas = 0;
   
    $: cantidadesNotas = detallado.filter((dato) => {
        if (periodo!=="FINAL")
        return dato.Nota && dato.Periodo === periodo;
        else
        return dato.Nota;
    }).length;
</script>

{#if mostrarDetallado}
    <ModalNotasDetallado
        detallado={detallado.filter((detalle) => {
            if (periodo != "FINAL")
                return detalle.Periodo === periodo && detalle.Nota;
            else return detalle.Nota;
        })}
        nombresEstudiante={detallado[0] ? detallado[0].Nombres : ""}
        {periodo}
        asignatura={$Asignatura}
        on:closeModal={() => (mostrarDetallado = false)}
    />
{/if}


    <td
        class={clase}
        class:perdida={valoracion < 3&&periodo!=="FINAL"&&periodo!=="💀"}
        class:blink_me={valoracion < 3&&periodo!=="FINAL"&&periodo!=="💀"}
    >
        <button
            class="btn {btnColor} btn-sm w-100 {clase}"
            on:click={notasDetallado}
        >
            <slot />
            {#if periodo!=="💀"}
            <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill {periodo!=="FINAL"?"bg-danger":"bg-info"}"
            >
                {cantidadesNotas}
                <span class="visually-hidden">unread messages</span>
            </span>
            {/if}
        </button>
    </td>

<style>
    .perdida {
        color: red;
    }
    .need {
        color: blue;
    }

    .blink_me {
        animation: blinker 1s linear infinite;
    }
    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
</style>
