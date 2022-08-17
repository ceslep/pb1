<script>
    import { afterUpdate, onMount } from "svelte";
    import { Eye } from "svelte-bootstrap-icons";
    import ModalNotasDetallado from "./ModalNotasDetallado.svelte";
    import { Periodo } from "./../../../stores.js";
    import Swal from "sweetalert2";

    export let dataNotas;
    export let periodo;
    export let nombresEstudiante;

    afterUpdate(() => {
        console.log(dataNotas);
    });

    let openDetallado = false;
    let detallado = [];
    let asignatura = "";

    const abrirDetalladoNotas = (Detallado, Asignatura) => {
        console.log(Detallado);
        detallado = [
            ...Detallado.filter(
                (detalle) => detalle.Nota && detalle.Periodo == $Periodo
            ).map((detalle) => {
                return {
                    ...detalle,
                    Porcentaje:
                        detalle.Porcentaje != null ? detalle.Porcentaje : "N/A",
                };
            }),
        ];
        console.log(detallado);
        asignatura = Asignatura;
        periodo = $Periodo;
        openDetallado = detallado.length>0;
        if(!openDetallado) Swal.fire({
            icon: "warning",
            title: "No hay notas para mostrar",
            html: `No se encontraron notas <br/> para la asignatura ${Asignatura} <br/> en el periodo ${$Periodo}`,
        });
    };

  
</script>

{#if openDetallado}
    <ModalNotasDetallado
        {detallado}
        {nombresEstudiante}
        {asignatura}
        {periodo}
        on:closeModal={() => {
            openDetallado = false;
        }}
    />
{/if}

{#if dataNotas.length > 0}
    <main>
        <div class="table-responsive">
            <table
                class="table table-striped table-inverse table-responsive table-bordered  caption-top"
            >
                <caption class="fw-bold">
                    Período {periodo}
                </caption>
                <thead class="bg-warning bg-gradient bg-opacity-50">
                    <tr class="align-middle text-center fs-">
                        <th>#</th>
                        <th>Asignatura</th>
                        <th>Valoracion</th>
                        <th>Desempeño</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
                    {#each dataNotas as nota, index}
                        <tr class="align-middle">
                            <td class="text-center">{index + 1}</td>
                            <td>{nota.asignatura}</td>
                            <td
                                class="text-center img-thumbnail img-fluid"
                                class:perdida={nota.valoracion < 3}
                                >{@html nota.valoracion}</td
                            >
                            <td class="text-center"
                                ><span class:perdida={nota.valorac < 3}
                                    >{nota.desempeno}</span
                                ></td
                            >
                            <td class="text-center">
                                <button
                                    class="btn btn-danger bg-gradient bg-opacity-25 rounded-0 position-relative"
                                    on:click|preventDefault={() => {
                                        abrirDetalladoNotas(
                                            nota.detallado,
                                            nota.asignatura
                                        );
                                    }}
                                >
                                    <Eye />
                                    <span
                                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                                    >
                                        {nota.countNotas}
                                        <span class="visually-hidden"
                                            >unread messages</span
                                        >
                                    </span></button
                                ></td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </main>
{/if}

<style>
    .perdida {
        color: red;
    }
</style>
