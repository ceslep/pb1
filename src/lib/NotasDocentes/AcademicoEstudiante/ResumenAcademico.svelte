<script>
    import { URL, Periodo } from "./../../../stores.js";
    import TablaNotasEstudiante from "./TablaNotasEstudiante.svelte";
    import { afterUpdate, onMount } from "svelte";
    import TablaNotasEstudiantePeriodos from "./TablaNotasEstudiantePeriodos.svelte";

    export let estudiante;
    export let nombresEstudiante;
    export let elTab;
    export let mostrarTodoPeriodos;

    let dataNotas = [];
    let dataNotasTodos = [];

    onMount(() => {
        console.log("Montando el componente resumenacademico");
    });

    const consultaNotas = async () => {
        let response = await fetch(`${$URL}/est/php/getNotas.php`, {
            method: "POST",
            body: JSON.stringify({
                estudiante,
                periodo: $Periodo,
            }),
        });
        return await response.json();
    };

    afterUpdate(async () => {
        console.log("actualizando");
        console.log(elTab);
        if (elTab === "academico-tab") {
            dataNotas = await consultaNotas();
            console.clear();
            console.log(dataNotas);
            dataNotas = [
                ...dataNotas.map((nota) => {
                    return {
                        ...nota,
                        valorac: nota.valoracion === null ? 0 : nota.valoracion,
                        valoracion:
                            nota.valoracion !== null
                                ? nota.valoracion
                                : "<img src='./tristea.gif' alt='' width='40'>",
                        countNotas: nota.detallado.filter(n=>n.Periodo===$Periodo&&n.Nota!==null).length,
                    };
                }),
            ];
            console.log(dataNotas);    
            elTab = "";
        }
        if (mostrarTodoPeriodos) {
            let dataNotasP = [];
            console.log("mostrando todos los periodos");
            dataNotas.forEach((dataNota) => {
                let objNota = new Object();
                // @ts-ignore
                objNota.asignatura = dataNota.asignatura;
                // @ts-ignore
                objNota.detallado = dataNota.detallado;

                // @ts-ignore
                objNota.countNotas = dataNota.detallado.filter(
                    (detalle) => detalle.Nota
                ).length;
                // @ts-ignore
                objNota.periodo1 = new Object();
                // @ts-ignore
                objNota.periodo2 = new Object();
                // @ts-ignore
                objNota.periodo3 = new Object();
                // @ts-ignore
                objNota.periodo4 = new Object();

                // @ts-ignore
                objNota.Definitiva = new Object();

                // @ts-ignore
                objNota.periodo1.valoracion = null;
                // @ts-ignore
                objNota.periodo1.countNotas = dataNota.detallado.filter(
                    (detalle) => detalle.Nota && detalle.Periodo === "UNO"
                ).length;
                // @ts-ignore// @ts-ignore

                objNota.periodo2.valoracion = null;
                // @ts-ignore
                objNota.periodo2.countNotas = dataNota.detallado.filter(
                    (detalle) => detalle.Nota && detalle.Periodo === "DOS"
                ).length;
                // @ts-ignore
                objNota.periodo3.valoracion = null;
                // @ts-ignore
                objNota.periodo3.countNotas = dataNota.detallado.filter(
                    (detalle) => detalle.Nota && detalle.Periodo === "TRES"
                ).length;
                // @ts-ignore
                objNota.periodo4.valoracion = null;
                // @ts-ignore
                objNota.periodo4.countNotas = dataNota.detallado.filter(
                    (detalle) => detalle.Nota && detalle.Periodo === "CUATRO"
                ).length;

                // @ts-ignore
                objNota.Definitiva.countNotas = dataNota.detallado.filter(
                    (detalle) => detalle.Nota
                ).length;

                // @ts-ignore
                let per = dataNota.detallado.filter(
                    (dataNota) => dataNota.Periodo === "UNO"
                );
                if (per && per.length > 0)
                    // @ts-ignore
                    objNota.periodo1.valoracion =
                        per[0].valoracion !== null
                            ? per[0].valoracion
                            : "<img src='./tristea.gif' alt='' width='23'>";

                // @ts-ignore
                per = dataNota.detallado.filter(
                    (dataNota) => dataNota.Periodo === "DOS"
                );
                if (per && per.length > 0)
                    // @ts-ignore
                    objNota.periodo2.valoracion =
                        per[0].valoracion !== null
                            ? per[0].valoracion
                            : "<img src='./tristea.gif' alt='' width='23'>";
                per = dataNota.detallado.filter(
                    (dataNota) => dataNota.Periodo === "TRES"
                );
                if (per && per.length > 0)
                    // @ts-ignore
                    objNota.periodo3.valoracion =
                        per[0].valoracion !== null
                            ? per[0].valoracion
                            : "<img src='./tristea.gif' alt='' width='23'>";
                per = dataNota.detallado.filter(
                    (dataNota) => dataNota.Periodo === "CUATRO"
                );
                if (per && per.length > 0)
                    // @ts-ignore
                    objNota.periodo4.valoracion =
                        per[0].valoracion !== null
                            ? per[0].valoracion
                            : "<img src='./tristea.gif' alt='' width='23'>";
                // @ts-ignore
                objNota.periodo1.valoracion =
                    // @ts-ignore
                    objNota.periodo1.valoracion === null
                        ? "<img src='./tristea.gif' alt='' width='23'>"
                        // @ts-ignore
                        : objNota.periodo1.valoracion;
                // @ts-ignore
                objNota.periodo2.valoracion =
                    // @ts-ignore
                    objNota.periodo2.valoracion === null
                        ? "<img src='./tristea.gif' alt='' width='23'>"
                        // @ts-ignore
                        : objNota.periodo2.valoracion;
                // @ts-ignore
                objNota.periodo3.valoracion =
                    // @ts-ignore
                    objNota.periodo3.valoracion === null
                        ? "<img src='./tristea.gif' alt='' width='23'>"
                        // @ts-ignore
                        : objNota.periodo3.valoracion;
                // @ts-ignore
                objNota.periodo4.valoracion =
                    // @ts-ignore
                    objNota.periodo4.valoracion === null
                        ? "<img src='./tristea.gif' alt='' width='23'>"
                        // @ts-ignore
                        : objNota.periodo4.valoracion;

                // @ts-ignore
                let p1 =
                    0.25 *
                    parseFloat(
                        // @ts-ignore
                        !isNaN(objNota.periodo1.valoracion)
                            // @ts-ignore
                            ? objNota.periodo1.valoracion
                            : "0"
                    );
                // @ts-ignore
                let p2 =
                    0.25 *
                    parseFloat(
                        // @ts-ignore
                        !isNaN(objNota.periodo2.valoracion)
                            // @ts-ignore
                            ? objNota.periodo2.valoracion
                            : "0"
                    );
                // @ts-ignore
                let p3 =
                    0.25 *
                    parseFloat(
                        // @ts-ignore
                        !isNaN(objNota.periodo3.valoracion)
                            // @ts-ignore
                            ? objNota.periodo3.valoracion
                            : "0"
                    );
                // @ts-ignore
                let p4 =
                    0.25 *
                    parseFloat(
                        // @ts-ignore
                        !isNaN(objNota.periodo4.valoracion)
                            // @ts-ignore
                            ? objNota.periodo4.valoracion
                            : "0"
                    );
                // @ts-ignore

                objNota.Definitiva.valoracion = (p1 + p2 + p3 + p4).toFixed(1);

                console.log(objNota);
                dataNotasP.push(objNota);
            });

            console.log(dataNotasP);
            dataNotasTodos = [...dataNotasP];
        }
    });
</script>

<main>
    {#if !mostrarTodoPeriodos}
        <TablaNotasEstudiante {dataNotas} {nombresEstudiante} periodo={$Periodo} />
    {:else}
        <TablaNotasEstudiantePeriodos {nombresEstudiante} dataNotas={dataNotasTodos} />
    {/if}
</main>
