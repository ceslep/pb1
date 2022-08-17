<script>
     import {
      
        Periodo,
        Asignatura,
        Nivel,
        Numero,
        CAsignacion,
        Docente,
    } from "./../../../stores.js";

    export let estudiante;
  

    let fecha=new Date().toISOString().slice(0,10);
   
</script>

<main>
    <input type="hidden" name="estudiante" bind:value={estudiante} />
        <input type="hidden" name="periodo" bind:value={$Periodo} />
        <input type="hidden" name="asignat" bind:value={$Asignatura} />
        <input type="hidden" name="nivel" bind:value={$Nivel} />
        <input type="hidden" name="numero" bind:value={$Numero} />
        <input type="hidden" name="asignacion" bind:value={$CAsignacion} />
        <input type="hidden" name="docente" bind:value={$Docente} />
        <div class="form-group">
            <div class="row">
                <div class="col-12 col-sm-6">
                    <label for="fechainasistencia"
                    >Fecha</label
                    >
                    <input
                    type="date"
                    name="fecha"
                    id="fechainasistencia"
                    class="form-control"
                    bind:value={fecha}
                    />
                </div>
                <div class="col-12 col-sm-6">
                    <label for="horasi">Horas</label>
                    <select
                    name="horas"
                    id="horasinasistencia"
                    class="form-control"
                   
                    >
                    <option value="" />
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="f">Fuga</option>
                    <option value="r">Retardo</option>
                    <!-- <option value="t">Toda la Jornada (Sólo Primaria)</option>-->
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-6">
                <label for="horasi">Hora Clase</label>
                <select
                name="hora_clase"
                id="hora_clase"
                class="form-control"
               
                >
                <option value="" />
                <option value="Primera Hora"
                >Primera Hora</option
                >
                    <option value="Segunda Hora"
                    >Segunda Hora</option
                    >
                    <option value="Tercera Hora"
                    >Tercera Hora</option
                    >
                    <option value="Cuarta Hora"
                    >Cuarta Hora</option
                    >
                    <option value="Quinta Hora"
                    >Quinta Hora</option
                    >
                    <option value="Sexta Hora"
                    >Sexta Hora</option
                    >
                    <option value="Séptima Hora"
                    >Séptima Hora</option
                    >
                    <option value="Octava Hora"
                    >Octava Hora</option
                    >
                </select>
            </div>
            <div class="col col-sm-6">
                <label for="detalleInasistencia"
                >Detalle</label
                >
                <input
                type="text"
                name="detalle"
                id="detalleInasistencia"
                class="form-control"
                />
            </div>
        </div>
    </div>
</main>