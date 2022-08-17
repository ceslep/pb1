<script>
    import Celda from "./Celda.svelte";
    import {
        URL,
        Asignatura,
        Nivel,
        Numero,
        Docente,
        Periodo
    } from "./../../../../stores.js";
    import { afterUpdate, onMount } from "svelte";


    export let refresh;
   
    let datosAsignatura = [];

    const consultaNotas = async () => {
        let response = await fetch(`${$URL}/est/php/getNotasAsignatura.php`, {
            method: "POST",
            body: JSON.stringify({
                asignatura: $Asignatura,
                nivel: $Nivel,
                numero: $Numero,
                docente: $Docente,
            }),
        });
        return await response.json();
    };

    onMount(async () => {
        datosAsignatura = [...(await consultaNotas())];
        console.log(datosAsignatura);
    });

    afterUpdate(async () => {
        if (refresh) {
            refresh = false;
            datosAsignatura = [...(await consultaNotas())];
            console.log(datosAsignatura);
        }
    });

    let encabezados = {
        "N°": "N°",
        Nombres: "Nombres",
        periodo1: "I",
        periodo2: "II",
        periodo3: "III",
        periodo4: "IV",
        periodo5: "Final",
        periodo6:"💀",
    };

    $: console.log(encabezados);

    const calculaPromedio = () => {
        let data = datosAsignatura
            .map((dato) => {
                let val = new Object();
                // @ts-ignore
                val.detallado=dato.detallado;
                // @ts-ignore
                val.estudiante = dato.detallado[0].estudiante;
                // @ts-ignore
                val.nombres = dato.detallado[0].Nombres;
                // @ts-ignore
                if (
                    dato.detallado.filter(
                        (detalle) => detalle.Periodo === "UNO"
                    ).length > 0
                )
                    // @ts-ignore
                    val.periodo1 = parseFloat(
                        dato.detallado.filter(
                            (detalle) => detalle.Periodo === "UNO"
                        )[0].valoracion
                    );
                // @ts-ignore
                else val.periodo1 = 0;
                // @ts-ignore
                if (
                    dato.detallado.filter(
                        (detalle) => detalle.Periodo === "DOS"
                    ).length > 0
                )
                    // @ts-ignore
                    val.periodo2 = parseFloat(
                        dato.detallado.filter(
                            (detalle) => detalle.Periodo === "DOS"
                        )[0].valoracion
                    );
                // @ts-ignore
                else val.periodo2 = 0;
                // @ts-ignore
                if (
                    dato.detallado.filter(
                        (detalle) => detalle.Periodo === "TRES"
                    ).length > 0
                )
                    // @ts-ignore
                    val.periodo3 = parseFloat(
                        dato.detallado.filter(
                            (detalle) => detalle.Periodo === "TRES"
                        )[0].valoracion
                    );
                // @ts-ignore
                else val.periodo3 = 0;
                // @ts-ignore
                if (
                    dato.detallado.filter(
                        (detalle) => detalle.Periodo === "CUATRO"
                    ).length > 0
                )
                    // @ts-ignore
                    val.periodo4 = parseFloat(
                        dato.detallado.filter(
                            (detalle) => detalle.Periodo === "CUATRO"
                        )[0].valoracion
                    );
                // @ts-ignore
                else val.periodo4 = 0;

                // @ts-ignore
                val.periodo5 = // @ts-ignore
                (
                    // @ts-ignore
                    0.25 * val.periodo1 +
                    // @ts-ignore
                    0.25 * val.periodo2 +
                    // @ts-ignore
                    0.25 * val.periodo3 +
                    // @ts-ignore
                    0.25 * val.periodo4
                ).toFixed(1);
                // @ts-ignore
                val.periodo5=!isNaN(val.periodo5)?val.periodo5:0;
                // @ts-ignore
                val.periodo4=!isNaN(val.periodo4)?val.periodo4:0;
                // @ts-ignore
                val.periodo3=!isNaN(val.periodo3)?val.periodo3:0;
                // @ts-ignore
                val.periodo2=!isNaN(val.periodo2)?val.periodo2:0;
                // @ts-ignore
                val.periodo1=!isNaN(val.periodo1)?val.periodo1:0;
                // @ts-ignore
                switch($Periodo){
                    case "UNO":
                        // @ts-ignore
                        val.periodo6=(12-val.periodo1).toFixed(2);
                        break;
                    case "DOS":
                          // @ts-ignore
                        val.periodo6=(12-val.periodo1-val.periodo2).toFixed(2);
                        break;
                    case "TRES":
                          // @ts-ignore
                        val.periodo6=(12-val.periodo1-val.periodo2-val.periodo3).toFixed(2);
                        break;
                    case "CUATRO":
                          // @ts-ignore
                        val.periodo6=(12-val.periodo1-val.periodo2-val.periodo3-val.periodo4).toFixed(2);
                        break;
                }
                
                return val;
            })
            .sort((a, b) => {
                // @ts-ignore
                if (a.nombres < b.nombres) return -1;
                else return 1;
            });
        return data;
    };

    let data = [];

    $: if (refresh) {
        console.clear();
        data = calculaPromedio();
        console.log(data);
    }

    const nombrePeriodo = (indice)=>{
        switch(indice){
            case 1:return "UNO";
            case 2:return "DOS";
            case 3:return "TRES";
            case 4:return "CUATRO";
            case 5:return "FINAL";
            case 6:return "💀";
        }
    }

//let Indices=$Periodo==="TRES"?[1,2,3,4,5,6]:[1,2,3,4,5];
    
</script>

<main class="os">
    <div class="table-responsive">
        <table class="table table-bordered table-sm">
            <thead
                class="bg-secondary bg-gradient bg-opacity-50 text-dark position-sticky"
            >
                <tr>
                    {#each Object.values(encabezados) as encabezado}
                        <th class="text-center">{encabezado}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each data as { nombres,  detallado }, index}
                    <tr class="">
                        <td class="text-center align-midle">{index + 1}</td>
                        <td class="text-left align-midle">{nombres}</td>
                        {#each [1,2,3,4,5,6] as indice}
                        <Celda clase="text-center fw-bold align-middle position-relative" {detallado} periodo={nombrePeriodo(indice)} valoracion={data[index][`periodo${indice}`]}>
                           {data[index][`periodo${indice}`]?data[index][`periodo${indice}`]:""}
                        </Celda>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>

<style>
    .os {
        height: 900px;
    }
</style>
