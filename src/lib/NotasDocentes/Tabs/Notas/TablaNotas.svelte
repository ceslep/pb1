<script>
    import { afterUpdate, onDestroy, onMount } from "svelte";
    import Swal from "sweetalert2";
    import { Save, CloudPlusFill } from "svelte-bootstrap-icons";
    import ModalNap from "../../ModalNAP.svelte";
    import RegistroInasistencia from "../../Inasistencias/RegistroInasistencia.svelte";
    import { URL } from "./../../../../stores.js";

    var elTable;
    var table;
    var datosTabla;

    let dataRR;
    export let tableData;
    export let grado;
    export let asignatura;
    export let docente;
    export let periodo;
    

    let HEIGHT;
    onMount(() => {
        HEIGHT = Math.floor(0.78 * window.innerHeight) + "px";
        console.log(HEIGHT);
    });

    afterUpdate(() => {
       
    });

    onDestroy(() => {
        console.log("destruyendo");
        table.destroy();
        elTable = undefined;
        table = undefined;
    });

    let colT;

    const celledited = async (cell) => {
        let row;

        try {
            console.log(cell);

            colT = cell;

            dataRR = await cell.getRow().getData();

            row = await cell.getRow().getPosition(true);
            console.log(dataRR);

            var Val = 0;
            var n = 0;
            let porcentajes = false;
            Object.entries(dataRR).forEach((entry) => {
                const [key, value] = entry;

                if (key.includes("N") && key != "Nombres") {
                    if (value != " " && value != null && value != "") {
                        let idx = key.slice(
                            key.lastIndexOf("N") + 1,
                            key.length
                        );
                        if (dataRR[`fecha${idx}`] == null)
                            dataRR[`fecha${idx}`] = new Date()
                                .toISOString()
                                .slice(0, 10);

                        let porcentaje = 1;
                        if (
                            dataRR[`porcentaje${idx}`] != null &&
                            dataRR[`porcentaje${idx}`] != ""
                        ) {
                            porcentaje =
                                parseFloat(dataRR[`porcentaje${idx}`]) / 100;
                            porcentajes = true;
                        }
                        Val += parseFloat(value) * porcentaje;
                        if (porcentaje === 1) n++;
                    }
                }
            });

            console.log(n, Val);
            if (n > 0 && !porcentajes) dataRR.Val = (Val / n).toFixed(2);
            else if (porcentajes) dataRR.Val = Val.toFixed(2);
            else dataRR.Val = 0;

            console.log(tableData);
            tableData[row - 1] = dataRR;
            console.log(tableData);
        } catch (error) {
            console.log(error);
        }
    };

    let Aspecto = "";
    let Porcentaje = "";
    let Fecha = "";
    let Title = "";
    let Indice = "";

    var headerMenu = [
        {
            label: "Aspectos &hearts;",
            action: function (e, column) {
                console.log();
                Title = column.getDefinition().title;
                let key = column.getField();
                let idx = key.slice(key.lastIndexOf("N") + 1, key.length);
                console.log(idx);
                Indice = idx;
                let AspectoA = tableData.filter((data) => {
                    return data[`aspecto${idx}`] !== "";
                })[0];
                Aspecto =
                    AspectoA[`aspecto${idx}`] != null
                        ? AspectoA[`aspecto${idx}`]
                        : "";
                Porcentaje =
                    AspectoA[`porcentaje${idx}`] != null
                        ? AspectoA[`porcentaje${idx}`]
                        : "";
                let fecha =
                    AspectoA[`fechaa${idx}`] != null
                        ? AspectoA[`fechaa${idx}`]
                        : "";
                if (fecha === "0000-00-00" || fecha === "")
                    Fecha = new Date().toISOString().slice(0, 10);
                else Fecha = fecha;

                console.log(Aspecto);
                Aspectos = true;
            },
        },
        {
            label: "Tarea &spades;",
        },
    ];

    $: console.log(datosTabla);
    $: if (elTable) {
        console.log(window.innerHeight);
        console.log(elTable.offsetHeight);
    }

    var valid = function (cell, value, parameters) {
        let valido =
            (value >= parameters.min && value <= parameters.max) || value == "";
        if (!valido) value = "";
        else return valido;
    };

    let Inasistencias = false;

    let Nombres = "";
    let estudiante = "";

    const cellClicked = async function (e, cell) {
        try {
            console.log(cell);
            console.log(e);
            console.log(cell.getRow().getData());
            Nombres = cell.getRow().getData()["Nombres"];
            estudiante = cell.getRow().getData()["estudiante"];
            Inasistencias = true;
            notasCargadas = false;
        } catch (e) {}
    };

    $: if (elTable && tableData) {
        notasCargadas = false;
        console.log(tableData);
        // @ts-ignore
        table = new Tabulator(elTable, {
            data: tableData,
            dataLoader: true,
            height: HEIGHT,
            layout: "fitDataTable",
            responsiveLayout: "hide",
            scrollToRowIfVisible: false,

            columns: Object.keys(tableData[0])
                .filter(
                    (c) =>
                        c[0] !== "a" &&
                        c[0] !== "p" &&
                        c[0] !== "f" &&
                        c[0] !== "e"
                )
                .map((key) => {
                    return {
                        headerSort: false,
                        headerMenu:
                            key !== "Nombres" && key !== "Val"
                                ? headerMenu
                                : "",
                        title: key,
                        field: key,
                        resizable: false,
                        cellEdited:
                            key !== "Nombres" && key !== "Val"
                                ? celledited
                                : null,
                        cellClick: key === "Nombres" ? cellClicked : null,
                        hozAlign: key !== "Nombres" ? "right" : "left",
                        formatter: function (cell) {
                            var value = cell.getValue();
                            var rowElement = cell.getRow().getElement();
                            if (parseFloat(value) < 3)
                                return (
                                    "<span style='color:red; font-weight:bold;'>" +
                                    value +
                                    "</span>"
                                );
                            else if (key === "Val") {
                                return (
                                    "<span style='color:green; font-weight:bold;'>" +
                                    value +
                                    "</span>"
                                );
                            } else return value;
                        },
                        editor:
                            key !== "Nombres" && key != "Val" ? "number" : null,

                        editorParams: {
                            verticalNavigation: "table",
                        },

                        validator: [
                            {
                                type: valid,
                                parameters: {
                                    min: 1,
                                    max: 5,
                                },
                            },
                        ],
                    };
                }),
        });

        table.on("tableBuilt", () => {
            console.log(window.innerHeight);
            console.log(elTable.style.height);
            notasCargadas = true;
        });
    }

    let Aspectos = false;
    let notasCargadas = false;
    let salvandoNotas = false;

    const calculaValoracion = (data) => {
        let porcentajes = false;
        let Val = 0;
        let n = 0;
        let Value = "";
        Object.entries(data).forEach((entry) => {
            const [key, value] = entry;
            if (key.includes("N") && key != "Nombres") {
                if (value != " " && value != null && value != "") {
                    let idx = key.slice(key.lastIndexOf("N") + 1, key.length);
                    if (data[`fecha${idx}`] == null)
                        data[`fecha${idx}`] = new Date()
                            .toISOString()
                            .slice(0, 10);
                    let porcentaje = 1;
                    if (
                        data[`porcentaje${idx}`] != null &&
                        data[`porcentaje${idx}`] != ""
                    ) {
                        porcentaje = parseFloat(data[`porcentaje${idx}`]) / 100;
                        porcentajes = true;
                    }
                    Val += parseFloat(value) * porcentaje;
                    if (porcentaje === 1) n++;
                }
            }
        });
        if (n > 0 && !porcentajes) Value = (Val / n).toFixed(2).toString();
        else if (porcentajes) Value = Val.toFixed(2);
        else Value = "0";
        return Value;
    };

    const AsignaAspecto = async (data) => {
        console.log(data);
        const { Aspecto, Porcentaje, Fecha, Indice } = data;
        tableData = [
            ...tableData.map((data) => {
                return {
                    ...data,
                    [`aspecto${Indice}`]: Aspecto,
                    [`porcentaje${Indice}`]: Porcentaje,
                    [`fechaa${Indice}`]: Fecha,
                };
            }),
        ];
        tableData = [
            ...tableData.map((data) => {
                return {
                    ...data,
                    Val: calculaValoracion(data),
                };
            }),
        ];
        await table.replaceData(tableData);
        console.log("actualizado");
        console.log(tableData);
    };

    const guardaNotas = async () => {
        salvandoNotas = true;
        let dataJSON = tableData.map((data) => {
            let Ns = Object.entries(data)
                .filter(
                    (data) => data[0].startsWith("N") && data[0] !== "Nombres"
                )
                .map((data, index) => {
                    data[0] = `nota${index + 1}`;
                    data[1] =
                        data[1] == null ||
                        data[1] == "0" ||
                        data[1] === "0.00" ||
                        data[1] == " "
                            ? null
                            : data[1];
                    return data;
                });
            let As = Object.entries(data)
                .filter((data) => data[0].startsWith("aspecto"))
                .map((data, index) => {
                    data[0] = `aspecto${index + 1}`;
                    return data;
                });

            let Ps = Object.entries(data)
                .filter((data) => data[0].startsWith("porcentaje"))
                .map((data, index) => {
                    data[0] = `porcentaje${index + 1}`;
                    return data;
                });
            let Fas = Object.entries(data)
                .filter((data) => data[0].startsWith("fechaa"))
                .map((data, index) => {
                    data[0] = `fechaa${index + 1}`;
                    return data;
                });
            let Fs = Object.entries(data)
                .filter(
                    (data) => data[0].startsWith("fecha") && data[0][5] !== "a"
                )
                .map((data, index) => {
                    data[0] = `fecha${index + 1}`;
                    return data;
                });
            let Ans = Object.entries(data)
                .filter((data) => data[0].startsWith("anotacion"))
                .map((data, index) => {
                    data[0] = `anotacion${index + 1}`;
                    return data;
                });
            let notas = Object.fromEntries(Ns);
            let aspectos = Object.fromEntries(As);
            let porcentajes = Object.fromEntries(Ps);
            let fechaas = Object.fromEntries(Fas);
            let fechas = Object.fromEntries(Fs);
            let anotas = Object.fromEntries(Ans);
            return {
                estudiante: data.estudiante,
                grado,
                asignatura,
                docente,
                periodo,
                valoracion: data.Val !== "0" ? data.Val : null,
                ...notas,
                ...porcentajes,
                ...aspectos,
                ...fechas,
                ...anotas,
                ...fechaas,
                fechahora: null,
                year: new Date().getFullYear(),
            };
        });
        console.log(dataJSON);
        let response = await fetch(`${$URL}guardar_notas.php`, {
            method: "POST",
            body: JSON.stringify(dataJSON),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await response.json();
        if (data.msg === "Exito") {
            Swal.fire({
                title: "Exito",
                text: "Notas guardadas",
                icon: "success",
                confirmButtonText: "Ok",
            });
        }
        salvandoNotas = false;
    };

    //convert an array of arrays into json object
</script>

{#if Aspectos}
    <ModalNap
        {Aspecto}
        {Porcentaje}
        {Fecha}
        {Title}
        {Indice}
        on:closeModal={() => {
            Aspectos = false;
        }}
        on:asignaAspecto={(event) => {
            AsignaAspecto(event.detail);
            Aspectos = false;
        }}
    />
{/if}

{#if Inasistencias}
    <RegistroInasistencia
        {Nombres}
        {estudiante}
        on:closeModal={() => {
            Inasistencias = false;
            notasCargadas = true;
        }}
    />
{/if}
<main class="container-fluid overflow-y">
    <div bind:this={elTable} class="m-2" />
</main>

{#if notasCargadas}
    <a href="#!" class="float" on:click={guardaNotas}>
        {#if !salvandoNotas}
            <div class="" style="font-size: 2rem; color: white;">
                <CloudPlusFill width={32} height={32} fill="lightyellow" />
            </div>
        {:else}
            <div
                class="mt-float text-center spinner-border text-white bg-gradient-primary"
                role="status"
                style="width: 1.9rem; height: 1.9rem;"
            >
                <span class="visually-hidden">Loading...</span>
            </div>
        {/if}
    </a>
  
{/if}

<style>
    .overflow-y {
        overflow-y: auto;
    }

    .float {
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 40px;
        background-color: #0c9;
        color: #fff;
        border-radius: 50px;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
        z-index: 2500;
        background: radial-gradient(
            circle,
            rgb(65, 209, 20) 0%,
            rgb(23, 228, 105) 15%,
            rgb(18, 101, 5) 100%
        );
    }
    .mt-float {
        position: absolute;
        top: 14px;
        left: 15px;
    }
</style>
