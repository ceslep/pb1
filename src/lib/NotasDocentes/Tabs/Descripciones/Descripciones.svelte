<script>
import { afterUpdate } from "svelte";

    import { Save } from "svelte-bootstrap-icons";
    import OtrosLogros from "./Otros/OtrosLogros.svelte";
    export let refresh;
    $: if (refresh) console.log(refresh);

    const guardarDescripcion = async (e) => {
        let data = Object.fromEntries(new FormData(e.target));
        console.log(data);
    };


    afterUpdate(()=>{
        if (refresh){
            console.clear();
            console.log("afterupdate des");
            refresh = false;
            
            let firstTabDL = document.querySelector('.descripciones-tabs li:first-child a')
            // @ts-ignore
            var firstTab = new bootstrap.Tab(firstTabDL)
            firstTab.show()
        }
    });
    let elTabs;
    let tabPanel="descripcion-tab";
    let refreshOtros = false;
    $: if (elTabs) {
        elTabs.addEventListener("shown.bs.tab", async (event) => {
            tabPanel = event.target.id;
            console.log(tabPanel);
            refreshOtros = tabPanel === "otrosLogros-tab";
            console.log(refreshOtros);
        });
    }
</script>

<main class="bg">
    <form
        id="frmDescripcionesLogros"
        on:submit|preventDefault={guardarDescripcion}
    >
        <div class="">
            <div class="">
                <div class="">
                    <h5 class="">Descripciones de Logro</h5>
                </div>
                <div class="">
                    <ul
                        class="nav nav-tabs descripciones-tabs  bg-opacity-25"
                        bind:this={elTabs}
                    >
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                href="#!"
                                aria-current="page"
                                id="descripcion-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#descripcionLogroTab"
                                >Descripción</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#!"
                                aria-current="page"
                                id="especial-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#especialLogro"
                                >Otra Información</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#!"
                                aria-current="page"
                                id="resumenLogros-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#resumenDescripcionLogro"
                                >Resumen</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#!"
                                aria-current="page"
                                id="otrosLogros-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#otrosDescripcionLogro"
                                >Otros Años</a
                            >
                        </li>
                    </ul>
                    <div class="tab-content os" id="myTabContentLogros">
                        <div
                            class="tab-pane fade show active os2"
                            id="descripcionLogroTab"
                            role="tabpanel"
                            aria-labelledby="descripcion-tab"
                        >
                            <div class="row bg">
                                <div class="col-12">
                                    <div class="form-group bg">
                                        <label for="escalasDesempeno"
                                            >Desempeño</label
                                        >
                                        <select
                                            name="desempeno"
                                            id="escalasDesempeno"
                                            class="form-select bg"
                                            required
                                        >
                                            <option />
                                            <option value="SUPERIOR"
                                                >SUPERIOR</option
                                            >
                                            <option value="ALTO">ALTO</option>
                                            <option value="BASICO"
                                                >BASICO</option
                                            >
                                            <option value="BAJO">BAJO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group bg">
                                        <label for="descripcionLogro" class="bg"
                                            >Descripcion de la escala de
                                            Valoración</label
                                        >
                                        <textarea
                                            class="form-control bg"
                                            name="descripcion"
                                            id="descripcionLogro"
                                            cols="30"
                                            rows="3"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group bg">
                                        <label
                                            for="descripcionEspecialLogro"
                                            class="bg">Descripción H.E.D.</label
                                        >
                                        <textarea
                                            class="form-control bg"
                                            name="descripcionEspecial"
                                            id="descripcionEspecialLogro"
                                            cols="30"
                                            rows="3"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="tab-pane fade"
                            id="especialLogro"
                            role="tabpanel"
                            aria-labelledby="especial-tab"
                        />
                        <div
                            class="tab-pane fade"
                            id="resumenDescripcionLogro"
                            role="tabpanel"
                            aria-labelledby="resumenLogros-tab"
                        >
                            ......
                        </div>
                        <div
                            class="tab-pane fade "
                            id="otrosDescripcionLogro"
                            role="tabpanel"
                            aria-labelledby="otrosLogros-tab"
                            style="overflow: auto;"
                        >
                            <OtrosLogros refresh={refreshOtros} />
                        </div>
                    </div>
                </div>
                {#if tabPanel==="descripcion-tab"}
                <div class="float">
                    <button type="submit" class="btn btn-warning">
                        Guardar <Save />
                    </button>
                </div>
                {/if}
            </div>
        </div>
    </form>
</main>

<style>
    .bg {
        color: black;
        background-color: rgb(252, 255, 252);
    }
    .nav-tabs .nav-item .nav-link {
        background-color: #006603;
        color: #fff;
    }

    .nav-tabs .nav-item .nav-link.active {
        color: lightgreen;
        background-color: black;
    }

    .tab-content {
        border: 1px solid #dee2e6;
        border-top: transparent;
        padding: 15px;
    }

    .tab-content .tab-pane {
        background-color: #fff;
        color: #0080ff;
        min-height: 200px;
        height: auto;
    }

    .float {
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 50px;
        color: #fff;
        text-align: center;
        z-index: 2500;
    }

    .os {
        height: 653px;
        overflow: auto;
    }
    @media (max-width: 578px) {
        .os2 {
            height: 400px;
            font-size: 0.6rem;
        }
    }
    @media (min-width: 579px) {
        .os2 {
            height: 660px;
            font-size: 0.8rem;
        }
    }
</style>
