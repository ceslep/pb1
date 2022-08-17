<script>
    import { afterUpdate } from "svelte";
    import Swal from "sweetalert2";
    import ModalNotasDetallado from "./ModalNotasDetallado.svelte";

    export let dataNotas;
    export let nombresEstudiante;

    afterUpdate(() => {
        console.log(dataNotas);
    });

    const abrirDetallado = (Detallado, Asignatura, Periodo) => {
        console.log(Detallado);
        detallado = [
            ...Detallado.filter((detalle) => {
                if (Periodo === "Final") {
                    if (detalle.Nota) return detalle;
                } else if (detalle.Nota && detalle.Periodo === Periodo)
                    return detalle;
            })
                .sort((a, b) => {
                    if (a.FechaNota > b.FechaNota) return -1;
                    else return 1;
                })
                .map((detalle) => {
                    return {
                        ...detalle,
                        Aspecto:
                            detalle.Aspecto !== null
                                ? detalle.Aspecto
                                : "Sin Aspecto",
                        FechaAspecto:
                            detalle.FechaAspecto !== null
                                ? new Intl.DateTimeFormat("es-CO", {
                                      month: "short",
                                      day: "numeric",
                                  }).format(new Date(detalle.FechaAspecto))
                                : "Sin Fecha",
                        FechaNota:
                            detalle.FechaNota !== null
                                ? new Intl.DateTimeFormat("es-CO", {
                                      month: "short",
                                      day: "numeric",
                                  }).format(new Date(detalle.FechaNota))
                                : "Sin Fecha",
                        Porcentaje:
                            detalle.Porcentaje !== null
                                ? detalle.Porcentaje
                                : "N/A",
                    };
                }),
        ];
        console.log(detallado);
        openDetallado = detallado.length > 0;
        if (!openDetallado)
            Swal.fire({
                icon: "warning",
                title: "No hay notas para mostrar",
                html: `No se encontraron notas <br/> para la asignatura ${Asignatura} <br/> en el periodo ${Periodo}`,
            });
        asignatura = Asignatura;
        periodo = Periodo;
    };

    let openDetallado = false;
    let detallado = [];
    let asignatura = "";
    let periodo = "";
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

<main>
    {#if dataNotas.length > 0}
        <main class="fs-7">
            <div class="table-responsive">
                <table
                    class="table table-striped table-inverse table-responsive table-bordered  caption-top"
                >
                    <caption class="fw-bold">
                        <div />
                    </caption>
                    <thead class="bg-warning bg-gradient bg-opacity-50">
                        <tr class="align-middle text-center">
                            <th>#</th>
                            <th>Asignatura</th>
                            <th>I</th>
                            <th>II</th>
                            <th>III</th>
                            <th>IV</th>
                            <th>V</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each dataNotas as nota, index}
                            <tr class="align-middle">
                                <td>{index + 1}</td>
                                <td>{nota.asignatura}</td>
                                <td class="text-center"
                                    ><button
                                        class="btn btn-info btn-sm fw-bold position-relative"
                                        class:perdida={nota.periodo1
                                            .valoracion < 3}
                                        on:click|preventDefault={() => {
                                            abrirDetallado(
                                                nota.detallado,
                                                nota.asignatura,
                                                "UNO"
                                            );
                                        }}
                                        ><span
                                            class:blink_me={nota.periodo1
                                                .valoracion < 3}
                                            >{@html nota.periodo1
                                                .valoracion}</span
                                        >
                                        <span
                                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                        >
                                            {nota.periodo1.countNotas}
                                            <span class="visually-hidden"
                                                >unread messages</span
                                            >
                                        </span>
                                    </button></td
                                >
                                <td class="text-center"
                                    ><button
                                        class="btn btn-info btn-sm  fw-bold position-relative"
                                        class:perdida={nota.periodo2
                                            .valoracion < 3}
                                        on:click|preventDefault={() => {
                                            abrirDetallado(
                                                nota.detallado,
                                                nota.asignatura,
                                                "DOS"
                                            );
                                        }}
                                        ><span
                                            class:blink_me={nota.periodo2
                                                .valoracion < 3}
                                            >{@html nota.periodo2
                                                .valoracion}</span
                                        >
                                        <span
                                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                        >
                                            {nota.periodo2.countNotas}
                                            <span class="visually-hidden"
                                                >unread messages</span
                                            >
                                        </span>
                                    </button></td
                                >
                                <td class="text-center"
                                    ><button
                                        class="btn btn-info btn-sm  fw-bold position-relative"
                                        class:perdida={nota.periodo3
                                            .valoracion < 3}
                                        on:click|preventDefault={() => {
                                            abrirDetallado(
                                                nota.detallado,
                                                nota.asignatura,
                                                "TRES"
                                            );
                                        }}
                                        ><span
                                            class:blink_me={nota.periodo3
                                                .valoracion < 3}
                                            >{@html nota.periodo3
                                                .valoracion}</span
                                        >
                                        <span
                                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                        >
                                            {nota.periodo3.countNotas}
                                            <span class="visually-hidden"
                                                >unread messages</span
                                            >
                                        </span>
                                    </button></td
                                >
                                <td class="text-center"
                                    ><button
                                        class="btn btn-info btn-sm fw-bold position-relative"
                                        class:perdida={nota.periodo4
                                            .valoracion < 3}
                                        on:click|preventDefault={() => {
                                            abrirDetallado(
                                                nota.detallado,
                                                nota.asignatura,
                                                "CUATRO"
                                            );
                                        }}
                                        ><span
                                            class:blink_me={nota.periodo4
                                                .valoracion < 3}
                                            >{@html nota.periodo4
                                                .valoracion}</span
                                        >
                                        <span
                                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                        >
                                            {nota.periodo4.countNotas}
                                            <span class="visually-hidden"
                                                >unread messages</span
                                            >
                                        </span>
                                    </button></td
                                >
                                <td class="text-center">
                                    <button
                                        class="btn bg-gradient bg-success fw-bold position-relative bg-opacity-25"
                                        on:click|preventDefault={() => {
                                            abrirDetallado(
                                                nota.detallado,
                                                nota.asignatura,
                                                "Final"
                                            );
                                        }}
                                    >
                                        <span
                                            class:blink_me={nota.Definitiva
                                                .valoracion < 3}
                                            class:perdida={nota.Definitiva
                                                .valoracion < 3}
                                            >{@html nota.Definitiva
                                                .valoracion}</span
                                        >
                                        <span
                                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                        >
                                            {nota.Definitiva.countNotas}
                                            <span class="visually-hidden"
                                                >unread messages</span
                                            >
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </main>
    {/if}
</main>

<style>
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

    @media (max-width: 768px) {
        .fs-7 {
            font-size: 0.7rem;
        }
    }
</style>
