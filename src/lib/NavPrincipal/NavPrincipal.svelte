<script>
import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    
</script>

<main>
  <nav class="navbar navbar-expand-xl navbar-light bg-success bg-gradient fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand text-white fs-7" href="#!">IEdeOccidente</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav menu-root d-none">
                <li class="nav-item">
                    <a class="nav-link active text-white consultar " aria-current="page" href="#!">Informes</a>
                </li>
                <li class="nav-item"><a class="nav-link text-white descargas" href="#!">Descargas</a></li>
                <li class="nav-item"><a class="nav-link text-white descripciones" href="#!">Descripciones</a>
                </li>
                <li class="nav-item"><a class="nav-link text-white puestos" href="#!">Puestos</a></li>
                <li class="nav-item dropdown inasist">
                    <a class="nav-link dropdown-toggle text-white" href="#!" id="inasistenciasMenuLink" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Inasistencias
                    </a>
                    <ul class="dropdown-menu" id="inasme" aria-labelledby="inasistenciasMenuLink">
                        <li><a class="dropdown-item" href="#!" id="conci">Inasistencias</a></li>
                        <li><a class="dropdown-item" id="controli" href="#!">Control Asistencia</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a class="nav-link text-white estadisticas" href="#!">Estadísticas</a>
                </li>
                <li class="nav-item"><a class="nav-link text-white docentes" href="#!">Docentes</a></li>
                <li class="nav-item"><a class="nav-link text-white notas" href="#!">Notas</a></li>
                <li class="nav-item"><a class="nav-link text-white certificados" href="#!">Certificados</a>
                </li>
                <li class="nav-item"><a class="nav-link text-white convivencia" href="#!">Convivencia</a></li>
                <li class="nav-item"><a class="nav-link text-white notificaciones position-relative" href="#!">
                        Notificaciones
                        <span
                            class="position-absolute top-2 start-sm-10 start-100 translate-middle badge rounded-pill bg-danger d-none">
                            <span id="nofn"></span>
                            <span class="visually-hidden">unread messages</span>
                        </span>
                    </a></li>
            </ul>
            <div class="d-flex justify-content-end w-100 pt-2 pt-xl-0">
                <button class="btn btn-warning ingresarDocente" 
                data-bs-toggle="collapse" 
                data-bs-target=".navbar-collapse.show"
                on:click={()=>dispatch('openLogin')}>Ingresar</button>
            </div>
        </div>
    </div>
</nav>
</main>