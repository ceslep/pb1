<script>
    import {
        URL,
        CAsignacion,
        Periodo,
        Nivel,
        Numero,
        Docente,
    } from "./../../../../../stores.js";
    import { Chart, registerables } from "chart.js";
    import {
        afterUpdate,
        onDestroy,
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

    let myCanvas0;
    let dataGraph0;
    

    /* onMount(async () => {
        console.log(refresh);
        dataGraph0 = await data0("est/php/GetPromediosGrupo.php");
              
    }); */

    afterUpdate(async ()=>{
       
                if (refresh){
                    refresh=false;
                dataGraph0 = await data0("est/php/GetPromediosGrupo.php");
                }
          
    });

    
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
        console.log("destruyendo barras");
        if (myChart0) myChart0.destroy();
      
    });

    $: if (myCanvas0 && dataGraph0) {
        if (myChart0) myChart0.destroy();
        myChart0 = graphics(
            "bar",
            myCanvas0,
            dataGraph0.filter((data) => data.valoracion)
        );
    }
    
</script>

<main class="os">
    <div class="m-md-1 p-md-1 m-lg-2 p-lg-2 m-xl-3 p-xl-3 m-xxl-5 p-xxl-5">
        <canvas bind:this={myCanvas0} />
    </div>
</main>

<!-- <style>
    @media (max-width: 578px) {
        .os {
            height: 600px;
            font-size: 0.6rem;
        }
    }
    @media (min-width: 579px) {
        .os {
            height: 660px;
            font-size: 0.6rem;
        }
    }
</style> -->
