<script>
    import { createEventDispatcher, onDestroy } from "svelte";
    import Swal from "sweetalert2";

    const dispatch = createEventDispatcher();

    export let datosOtros;

    const editoOtro = (e) => {
        console.clear();
        // @ts-ignore
        let firstTabDL = document.querySelector(
            ".descripciones-tabs li:first-child a"
        );
        // @ts-ignore
        var firstTab = new bootstrap.Tab(firstTabDL);
        firstTab.show();
        let data = JSON.parse(e.target.dataset.otro);
        console.log(data);
        const { desempeno, descripcion, descripcionEspecial } = data;
        console.log(descripcion);
        // @ts-ignore
        document.getElementById("escalasDesempeno").value = desempeno;
        // @ts-ignore
        document.getElementById("descripcionLogro").value = descripcion;
        // @ts-ignore
        document.getElementById("descripcionEspecialLogro").value =
            descripcionEspecial;
    };

    const eliminarOtro = async (e) => {
        let data = JSON.parse(e.target.dataset.ind);
        console.log(data);
        let response = await Swal.fire({
            title: "¿Estas seguro?",
            text: "Una vez eliminado no podrás recuperarlo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminarlo!",
            cancelButtonText: "Cancelar",
        });
        console.log(response);
        if (response.isConfirmed) {
            let response = await fetch("deleteOtrosLogros.php", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let datos = await response.json();
            if (datos.msj === "ok") {
                Swal.fire({
                    title: "Registro eliminado",
                    icon: "success",
                });
                dispatch("eliminarOtro", data);
            }
        }
    };
</script>

<main class="os">
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th style="vertical-align:middle;">Desempeño</th>
                    <th style="vertical-align:middle;">Descripción</th>
                    <th style="vertical-align:middle;">Descripción H.E.D.</th>
                    <th style="vertical-align:middle;">Periodo</th>
                    <th style="vertical-align:middle;">Actualizado</th>
                    <th style="vertical-align:middle;">Año</th>
                </tr>
            </thead>
            <tbody>
                {#each datosOtros as otro, index}
                    <tr class="fs-7">
                        <td style="vertical-align:middle;">{otro.desempeno}</td>
                        <td class="fs-8">{otro.descripcion}</td>
                        <td class="fs-8">{otro.descripcionEspecial}</td>
                        <td style="vertical-align:middle;">{otro.periodo}</td>
                        <td style="vertical-align:middle;">{otro.updatedat}</td>
                        <td style="vertical-align:middle;">{otro.year}</td>
                        <td style="vertical-align:middle;">
                            <button
                                class="btn btn-success btn-sm edito"
                                data-otro={JSON.stringify(otro)}
                                on:click|preventDefault={editoOtro}
                            >
                                📃
                            </button>
                        </td>
                        <td style="vertical-align:middle;">
                            <button
                                class="btn btn-warning btn-sm deleteo"
                                data-ind={JSON.stringify({ ind: otro.ind })}
                                data-otro={JSON.stringify(otro)}
                                on:click|preventDefault={eliminarOtro}
                            >
                                🧨
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <footer>
        <h2>&nbsp;</h2>
    </footer>
</main>

<style>
    .os {
        overflow-y: visible;
    }
</style>
