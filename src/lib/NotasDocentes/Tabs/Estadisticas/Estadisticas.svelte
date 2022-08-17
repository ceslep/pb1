<script>
    import {
        URL,
        CAsignacion,
        Periodo,
        Nivel,
        Numero,
        Docente,
    } from "./../../../../stores.js";
    import { Chart, registerables } from "chart.js";
    import {
        afterUpdate,
        createEventDispatcher,
        onDestroy,
        onMount,
    } from "svelte";

    Chart.register(...registerables);

    const data0 = async (url) => {
        let response = await fetch(`${$URL}${url}`, {
            method: "POST",
            body: JSON.stringify({
                asignacion: $CAsignacion,
                docente: $Docente,
                periodo: $Periodo,
                nivel: $Nivel,
                numero: $Numero,
            }),
        });
        return await response.json();
    };

    export let refresh = false;
    export let grupales;
     let refreshData = false;

    let myCanvas0;
    let myCanvas1;
    let dataGraph0;
    let dataGraph1;

    onMount(async () => {
        console.log(refresh);
        dataGraph0 = await data0("est/php/GetPromediosGrupo.php");
                dataGraph1 = [...dataGraph0];
    });

    afterUpdate(async ()=>{
        console.log("refresh",refresh);
        console.log("grupales",grupales);
        if (grupales && !refreshData) {
                
                dataGraph0 = await data0("est/php/GetPromediosGrupo.php");
                dataGraph1 = [...dataGraph0];
            }else {
                console.log("no grupales");
                refreshData = true;
                dataGraph0 = await data0("est/php/GetPromedios.php");
                dataGraph1 = [...dataGraph0];
            }
    });

    /* afterUpdate(async () => {
        if (refresh || grupales) {
            console.log("grupales");
            refresh = false;
            if (grupales && !refreshData) {
                refreshData = true;
                dataGraph0 = await data0("est/php/GetPromediosGrupo.php");
                dataGraph1 = [...dataGraph0];
            }else if(!refreshData){
                console.log("no grupales");
                refreshData = true;
                dataGraph0 = await data0("est/php/GetPromedios.php");
                dataGraph1 = [...dataGraph0];
            }
        }
    }); */

    const BGcolors = (dataCl) => {
        return dataCl.map((_) => {
            return `rgba( ${Math.floor(
                100 + 155 * Math.random()
            ).toString()}, ${Math.floor(
                100 + 155 * Math.random()
            )}, ${Math.floor(100 + 155 * Math.random())},0.7)`;
        });
    };

    const BorderColors = (dataCl) => {
        return dataCl.map((_) => {
            return `rgb( ${Math.floor(
                50 + 155 * Math.random()
            ).toString()}, ${Math.floor(
                50 + 155 * Math.random()
            )}, ${Math.floor(50 + 155 * Math.random())})`;
        });
    };

    let myChart0;
    let myChart1;

    const graphics = (type, canvas, dataGraph) => {
        console.log(dataGraph);
        let options = {
            type,
            data: {
                labels: dataGraph.map((data) => data.asignatura),
                datasets: [
                    {
                        label: `Grado ${$Nivel}-${$Numero}`,
                        data: dataGraph.map((data) => data.valoracion),
                        backgroundColor: BGcolors(dataGraph),
                        borderColor: BorderColors(dataGraph),
                        borderWidth: 1,
                    },
                ],
            },
        };
        // @ts-ignore
        return new Chart(canvas, options);
    };

    onDestroy(() => {
        console.log("destruyendo estadsisticas");
        if (myChart0) myChart0.destroy();
        if (myChart1) myChart1.destroy();
    });

    $: if (myCanvas0 && dataGraph0) {
        if (myChart0) myChart0.destroy();
        myChart0 = graphics(
            "bar",
            myCanvas0,
            dataGraph0.filter((data) => data.valoracion)
        );
    }
    $: if (myCanvas1 && dataGraph1) {
        if (myChart1) myChart1.destroy();
        myChart1 = graphics(
            "line",
            myCanvas1,
            dataGraph1.filter((data) => data.valoracion)
        );
    }
</script>

<main class="os">
    <div class="m-md-1 p-md-1 m-lg-2 p-lg-2 m-xl-3 p-xl-3 m-xxl-5 p-xxl-5">
        <canvas bind:this={myCanvas0} />
        <canvas bind:this={myCanvas1} />
    </div>
</main>

<style>
    @media (max-width: 578px) {
        .os {
            height: 900px;
            font-size: 0.6rem;
        }
    }
    @media (min-width: 579px) {
        .os {
            height: 1660px;
            font-size: 0.6rem;
        }
    }
</style>
