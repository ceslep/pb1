<script>
    import OpenUsuarios from "./OpenUsuarios.svelte";
    import {
        afterUpdate,
        beforeUpdate,
        createEventDispatcher,
        onDestroy,
        onMount,
    } from "svelte";
    // @ts-ignore
    import Swal from "sweetalert2";

    import { Search } from "svelte-bootstrap-icons";
    import {
        URL,
        Periodos,
        Docente,
        Periodo,
        MAESTRO,
        Asignatura,
        CAsignacion,
        Nivel,
        Numero,
        Grado,
        NombresDocente
    } from "./../../stores.js";

    let selectedPeriodo = "TRES";
    let elModal;
    let myModal;
    let elPeriodo;
    let myPeriodo;

    const dispatch = createEventDispatcher();

    onMount(() => {
        console.log("montando");
        abrirUsuarios = false;
        $Asignatura="";
        $Nivel="";
        $Numero="";
        $Periodo="";
        $Docente="";
        $Grado="";
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

    $: if (elPeriodo) {
        let html = "";
        $Periodos.forEach((periodo) => {
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

    let spcid = false;
    let form;

    const ingresoDocentes = async () => {
        spcid = true;

        let data = Object.fromEntries(new FormData(form));

        let response = await fetch(`${$URL}login.php`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let acceso = await response.json();
        console.log(acceso);
        if (acceso.concedido === "Si") {
            $CAsignacion=acceso.datos.asignacion;
            $NombresDocente = acceso.datos.nombres;
            $Periodo=myPeriodo.items[0];
            dispatch("concedido",{docente:$Docente,periodo:$Periodo});
            /* $Docente = ;
        document.getElementById("nodc").innerText = acceso.datos.nombres;
        $CAsignacion = acceso.datos.asignacion;
        $Periodo = document.getElementById("periodonotas").value;
       
        spcid=false;
        if ((acceso.Maestra === "Si") || (acceso.datos.nombres.includes("COORDI"))) {
            if (acceso.Maestra === "Si") $MAESTRO = true;

            document.oncontextmenu = new Function("return true");
            document.querySelector(".menu-root").classList.remove("d-none");
        } else {
            document.querySelector(".crearNotificacion").classList.add("d-none");
            document.oncontextmenu = new Function("return false");
            document.querySelector(".menu-root").classList.remove("d-none");
            if (!acceso.datos.nombres.includes("COORDI")) {
                document.querySelectorAll(".menu-root > li > a").forEach(a => a.classList.add("d-none"));
            }
            document.querySelector(".convivencia").classList.remove("d-none");
            document.querySelector(".notificaciones").classList.remove("d-none");
            document.querySelector(".notas").classList.remove("d-none");
            document.querySelector(".inasist").classList.remove("d-none");
            document.querySelector("#inasistenciasMenuLink").classList.remove("d-none");

            if (acceso.informes === 'S') {
                document.querySelector(".consultar").classList.remove("d-none");
                document.querySelector(".notas").classList.remove("d-none");
                NNIVEL = acceso.nivel;
                NNUMERO = acceso.numero;
                NASIGNACION = acceso.asignacion;
                NPERIODO = PERIODO;
            }
        }
        if (document.getElementById("navbarNavAltMarkup").classList.contains("show"))
            document.getElementById("navbarNavAltMarkup").classList.remove("show");  */
        } else {
            Swal.fire({
                icon: "error",
                title: "Acceso Denegado",
            });
        }
        spcid = false;
    };

    let abrirUsuarios = false;
    const openUsuarios = () => {
        abrirUsuarios = true;
    };

    $:console.log($Docente);
</script>

{#if abrirUsuarios}
    <OpenUsuarios on:closeModal={() => (abrirUsuarios = false)} on:ingDocentes={(e)=>{
        $Docente=e.detail
        abrirUsuarios = false;
    }}/>
{/if}

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
        class="modal-dialog modal-dialog-centered fadeIn animate__animated animate__flipInX
        
        "
    >
        <div class="modal-content">
            <div class="modal-header bg-success bg-gradient bg-opacity-50">
                <h5 class="modal-title text-success" id="exampleModalLabel">
                    Datos para el ingreso
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
                    <div class="form-group">
                        <label for="docente"
                            ><a id="idsm" href="#!" on:click={openUsuarios}
                                >Identificación</a
                            ></label
                        >
                        <div
                            class="spinner-border spinner-border-sm d-none spseldocs"
                            role="status"
                        >
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <input
                            type="text"
                            name="docente"
                            inputmode="numeric"
                            class="form-control"
                            bind:value={$Docente}
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="contrasena"
                            ><a href="#!" id="cambiarContrasena">Contraseña</a
                            ></label
                        >
                        <input
                            type="password"
                            name="contrasena"
                            id="contrasena"
                            inputmode="full-width-latin"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="periodo"
                            >Período
                            <div
                                class="spinner-border spinner-border-sm spperiodo d-none"
                                role="status"
                            >
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </label>
                        <select
                            bind:this={elPeriodo}
                            bind:value={$Periodo}
                            name="periodo"
                            id="periodonotas"
                            class=""
                            tabindex="-1"
                            on:change={(e)=>{
                                // @ts-ignore
                                $Periodo=e.target.value;
                            }}
                        />
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
                    Cerrar</button
                >
                <button
                    type="button"
                    class="btn btn-success rounded-0 ingDocentes"
                    on:click={ingresoDocentes}
                    >Aceptar<Search />
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
