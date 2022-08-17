<script>
    import { createEventDispatcher } from "svelte";

    import { Asignatura, Grado, Nivel, Numero } from "../../stores.js";
    export let data;

    const dispatch = createEventDispatcher();

    $: if (main) {
        /////// Prevent closing from click inside dropdown
        document.querySelectorAll(".dropdown-menu").forEach(function (element) {
            element.addEventListener("click", function (e) {
                e.stopPropagation();
            });
        });

        // make it as accordion for smaller screens
        if (window.innerWidth < 92) {
            // close all inner dropdowns when parent is closed
            document
                .querySelectorAll(".navbar .dropdown")
                .forEach(function (everydropdown) {
                    everydropdown.addEventListener(
                        "hidden.bs.dropdown",
                        function () {
                            // after dropdown is hidden, then find all submenus
                            this.querySelectorAll(".submenu").forEach(function (
                                everysubmenu
                            ) {
                                // hide every submenu as well
                                everysubmenu.style.display = "none";
                            });
                        }
                    );
                });

            document
                .querySelectorAll(".dropdown-menu a")
                .forEach(function (element) {
                    element.addEventListener("click", function (e) {
                        let nextEl = this.nextElementSibling;
                        if (nextEl && nextEl.classList.contains("submenu")) {
                            // prevent opening link if link needs to open dropdown
                            e.preventDefault();
                            console.log(nextEl);
                            if (nextEl.style.display == "block") {
                                nextEl.style.display = "none";
                            } else {
                                nextEl.style.display = "block";
                            }
                        }
                    });
                });
        }
        // end if innerWidth
    }
    // DOMContentLoaded  end
    let main;

    $: console.log($Asignatura);
    $: console.log($Grado);
    $: console.log($Numero);
    $: console.log($Nivel);
</script>

<main bind:this={main}>
    <!-- section-header.// -->

    <!-- ============= COMPONENT ============== -->
    <nav class="navbar navbar-expand navbar-light bg-white text-dark">
        <div class="container-fluid">
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#main_nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-iconn" />
            </button>
            <div class="collapse navbar-collapse" id="main_nav">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#!"
                            data-bs-toggle="dropdown"
                            on:click={() => {
                                dispatch("consultando");
                            }}
                        >
                            <span class="fw-bold text-success">Grados</span>
                        </a>
                        <ul class="dropdown-menu">
                            {#each data as dato}
                                <li>
                                    <a class="dropdown-item" href="#!">
                                        <span class="fw-bold">Grado</span>
                                        <span class="fs-bold text-success"
                                            >{dato.grado}</span
                                        > &rtrif;</a
                                    >
                                    <ul class="submenu dropdown-menu">
                                        {#each dato.asignaturas as asignatura}
                                            <li>
                                                <a
                                                    class="dropdown-item"
                                                    href="#!"
                                                    on:click|preventDefault={(
                                                        e
                                                    ) => {
                                                        // @ts-ignore
                                                        console.log(
                                                            e.target
                                                                // @ts-ignore
                                                                .parentElement
                                                                .parentElement
                                                                .parentElement
                                                                .parentElement
                                                                .parentElement
                                                        );
                                                        // @ts-ignore
                                                        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
                                                            "show"
                                                        );
                                                        $Asignatura =
                                                            asignatura.asignatura;
                                                        $Grado = dato.grado;
                                                        $Nivel = dato.nivel;
                                                        $Numero = dato.numero;
                                                        dispatch(
                                                            "consultaNotas"
                                                        );
                                                    }}
                                                    ><span
                                                        class="fw-bold text-success"
                                                        >{asignatura.asignatura}</span
                                                    >
                                                    del grado
                                                    <span
                                                        class="fw-semibold fst-italic text-success"
                                                        >{dato.grado}</span
                                                    ></a
                                                >
                                            </li>
                                        {/each}
                                    </ul>
                                </li>
                            {/each}
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- navbar-collapse.// -->
        </div>
        <!-- container-fluid.// -->
    </nav>

    <!-- ============= COMPONENT END// ============== -->
</main>

<style>
    /* ============ desktop view ============ */
    @media all and (min-width: 92px) {
        .dropdown-menu li {
            position: relative;
        }
        .dropdown-menu .submenu {
            display: none;
            position: absolute;
            left: 100%;
            top: -7px;
        }
        /* .dropdown-menu .submenu-left{ 
                right:100%; left:auto;
            } */

        .dropdown-menu > li:hover {
            background-color: #f1f1f1;
        }
        .dropdown-menu > li:hover > .submenu {
            display: block;
        }
    }
    /* ============ desktop view .end// ============ */

    /* ============ small devices ============ */
    @media (max-width: 91px) {
        .dropdown-menu .dropdown-menu {
            margin-left: 0.7rem;
            margin-right: 0.7rem;
            margin-bottom: 0.5rem;
        }
    }
    /* ============ small devices .end// ============ */
</style>
