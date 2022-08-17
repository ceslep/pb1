<script>
	
    import {
        Docente,
        Nivel,
        Numero,
        CAsignacion,
        Asignatura,
        Periodo,
        URL
    } from "./../../stores.js";

    import Swal from 'sweetalert2';
    let tableNotas;
    var dataRR;
    let poraspx;
    let faspx;
    let aspx;
    var colT;
    var datosTabla;
    var COLUMNA;
    var porc;
    var table;
    var datosTablai;
    var rr;
    var row;

    function ky(event) {
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(
            !event.charCode ? event.which : event.charCode
        );
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }

    function aspectosFrm(e) {
        console.log(e);
        if (e.classList.contains("pct")) poraspx = e.value;
        else if (e.classList.contains("aspx")) aspx = e.value;
        else if (e.classList.contains("faspx")) {
            faspx = e.value;
        }

        console.log(poraspx, aspx, faspx);
    }

    function oin(e) {
        const el = e.target || e;

        if (el.type == "number" && el.max && el.min) {
            let value = parseInt(el.value);
            el.value = value; // for 000 like input cleanup to 0
            let max = parseInt(el.max);
            let min = parseInt(el.min);
            if (value > max) el.value = el.max;
            if (value < min) el.value = el.min;
        }
    }

    function initAspectos() {}

    // @ts-ignore
    Date.prototype.toDateInputValue = function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    };

    var headerMenu = [
        {
            label: "Aspectos",
            action: function (e, column) {
                document.querySelector(".float").classList.add("d-none");
                /*   let modalNAPelement = document.getElementById("modalNAP");
                if (!modalNAP) modalNAP = new bootstrap.Modal(modalNAPelement);
                modalNAPelement.addEventListener("hidden.bs.modal", () => {
                    document.querySelector(".float").classList.remove("d-none");
                });
                modalNAPelement.querySelector("input[name='fecha']").value =
                    new Date().toDateInputValue(); */
                colT = column;
                let key = column.getField();
                let idx = key.slice(key.lastIndexOf("N") + 1, key.length);
                console.log(column._column.definition.title);
                let colA = column._column.definition.title.slice(1);
                let aspecto = datosTabla.filter((data) => {
                    return data[`aspecto${idx}`] !== "";
                })[0];
                console.log(aspecto);
                let asp;
                COLUMNA = idx;
                if (aspecto != undefined)
                    asp =
                        aspecto[`aspecto${idx}`] != null
                            ? aspecto[`aspecto${colA}`]
                            : "";
                /* let porcentaje = datosTabla.filter(data => {
                 return data[`porcentaje${idx}`] !== "";
             });*/
                aspx = asp;
                let porcentaje = datosTabla.filter((data) => {
                    return data[`porcentaje${idx}`] !== "";
                })[0];
                let porc = "";
                if (porcentaje != undefined)
                    porc =
                        porcentaje[`porcentaje${idx}`] != null
                            ? porcentaje[`porcentaje${idx}`]
                            : "";
                console.log(porc);
                porc = parseInt(porc).toFixed(2);
                // @ts-ignore
                poraspx = !isNaN(porc) ? porc : "";
                let fechas = datosTabla
                    .filter((data) => {
                        return data[`fechaa${idx}`] !== "";
                    })
                    .map((data) => data[`fechaa${idx}`])[0];
                console.log(fechas);
                faspx = fechas != null ? fechas : "";

                if (faspx === "0000-00-00" || faspx === "")
                    // @ts-ignore
                    faspx = new Date().toDateInputValue();
                console.log(faspx);

                /*  modalNAPelement.querySelector("input[name='fecha']").value =
                    faspx;
                modalNAPelement.querySelector(
                    "input[name='porcentaje']"
                ).value = poraspx;
                modalNAPelement.querySelector(
                    "textarea[name='aspecto']"
                ).value = aspx;
                modalNAP.show(); */
            },
        },
        /*{
    label: "",
    action: async function (e, column) {
       
        console.log(datosTabla);
        colT = column;
        let key = column.getField();
        let idx = key.slice(key.lastIndexOf("N") + 1, key.length);
        console.log(column._column.definition.title);
        let colA = column._column.definition.title.slice(1);
        let aspecto = datosTabla.filter(data => {
            return data[`aspecto${idx}`] !== "";
        })[0];
        console.log(aspecto);
        let asp;
        if (aspecto != undefined)
            asp = aspecto[`aspecto${idx}`] != null ? aspecto[`aspecto${colA}`] : "";
        
        aspx = asp;
        let porcentaje = datosTabla.filter(data => {
            return data[`porcentaje${idx}`] !== "";
        })[0];
        let porc = "";
        if (porcentaje != undefined)
            porc = porcentaje[`porcentaje${idx}`] != null ? porcentaje[`porcentaje${idx}`] : "";
        console.log(porc);
        porc = parseInt(porc);
        poraspx = porc;
        let fechas = datosTabla.filter(data => {
            return data[`fechaa${idx}`] !== "";
        }).map(data => data[`fechaa${idx}`])[0];
        console.log(fechas);
        faspx = fechas != null ? fechas : "";

        if ((faspx === "0000-00-00") || (faspx === ""))
            faspx = (new Date()).toDateInputValue();
        console.log(faspx);
        let html = `
                <form id="frmAspectos">
                <div class="form-group"> 
                    <label for="Fecha">Porcentaje</label>
                    <input type="number" class="form-control pct" name="porcentaje" inputmode="numeric" value='${porc}' onblur=aspectosFrm(this) onkeypress=ky(event) min="1" max="100" oninput=oin(event)>
                </div>
                    <div class="form-group">
                        <label for="Aspecto">Aspecto</label>
                        <textarea type="text" class="form-control text-primary aspx" name="aspecto"  value='${aspx}' onblur=aspectosFrm(this)>${asp}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="Fecha">Fecha</label>
                        <input type="date" class="form-control faspx" name="fecha"  value='${faspx}' onblur=aspectosFrm(this)>
                    </div>
                  
                </form>
                ${spnG2}
            `;
       
        let response = await swal.fire({
            title: column._column.definition.title,
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            html: html,
            confirmButtonText: `Guardar Aspecto`,
            willOpen: () => {
                let frmAspectos = document.getElementById("frmAspectos");
                frmAspectos.querySelector("input[name=fecha]").value = faspx;
                frmAspectos.querySelector("input[name=porcentaje]").value = poraspx;
                frmAspectos.querySelector("textarea[name=aspecto]").value = aspx;

            },
            willClose: () => {
                let htmlc = Swal.getHtmlContainer();
                console.log(htmlc);
                htmlc.querySelector('.spng2').classList.remove("d-none");
                Swal.update();
                console.log(aspx);
                console.log(faspx);
                isNaN(poraspx) ? poraspx = undefined : poraspx = poraspx;
                console.log(poraspx, aspx, faspx);

            }
        });
        console.log(response);
        if (response.isConfirmed) {
            Swal.fire({
                title: "Aspectos Asignados y porcentajes",
                toast: true,

            });

            let key = column.getField();
            let idx = key.slice(key.lastIndexOf("N") + 1, key.length);
            console.log(idx);
            let datosTablaT = datosTabla.map(dato => {
                let datoT = new Object();
                datoT = { ...dato };
                datoT[`aspecto${idx}`] = aspx;
                datoT[`porcentaje${idx}`] = poraspx;
               
                datoT[`fechaa${idx}`] = faspx;
              
                console.log(datoT);
                return datoT;
            });
            console.log(datosTablaT);
            datosTabla = [];
            datosTabla = undefined;
            datosTabla = [...datosTablaT];
            table.setData(datosTabla);


            console.log(datosTablaT);
         
            poraspx = undefined;
            aspx = undefined;
            faspx = undefined;
            console.log(datosTabla);
            await calcTotal(datosTabla.length);
            drawAllCells(datosTabla.length);
          
        }

    }
}*/
        {
            label: "Tareas",
            action: function (e, column) {
                Swal.fire("Hola Tarea");
            },
        },
        {
            label: "Exámen",
            action: function (e, column) {
                Swal.fire("Hola Exámen");
            },
        },
    ];

    const drawCells = (row, dataRRT) => {
        if (dataRRT != undefined) {
            console.log(dataRRT);
            if (parseFloat(dataRRT.Val) >= 3) {
                //row._row.cells[2].element.style = "color:white;text-align:center;background:green;border:1px solid black;width:40px;";
                row._row.cells[2].element.style.backgroundColor = "green";
                row._row.cells[2].element.style.color = "white";
                for (let i = 3; i <= 15; i++) {
                    if (parseFloat(row._row.cells[i].getValue()) < 3)
                        row._row.cells[i].element.style.color = "red";
                }
            } else {
                row._row.cells[2].element.style =
                    "color:white;text-align:center;background:red;border:1px solid black;width:40px;";
                for (let i = 3; i <= 15; i++) {
                    if (parseFloat(row._row.cells[i].getValue()) < 3)
                        row._row.cells[i].element.style.color = "red";
                }
            }
        }
    };

    const drawAllCells = (cant) => {
        for (let i = 0; i < cant; i++) {
            if (
                parseFloat(datosTabla[i].Val) < 3 &&
                datosTabla[i].Val != null
            ) {
                table.rowManager.rows[
                    i
                ].cells[2].element.style.backgroundColor = "red";
                table.rowManager.rows[i].cells[2].element.style.color = "white";
            } else if (datosTabla[i].Val != null) {
                table.rowManager.rows[
                    i
                ].cells[2].element.style.backgroundColor = "green";
                table.rowManager.rows[i].cells[2].element.style.color = "white";
            }
            Object.keys(datosTabla[i]).forEach((key) => {
                if (key.substring(0, 1) === "N" && key != "Nombres") {
                    if (parseFloat(datosTabla[i][key]) < 3) {
                        table.rowManager.rows[i].cells[
                            parseInt(key.substring(1)) + 2
                        ].element.style.color = "red";
                    }
                }
            });
            /*for (let j = 3; j <= 15; j++) {
            
            if (parseFloat(datos) < 3)
                table.rowManager.rows[i].cells[j].element.style.color = "red";
        }*/
        }
    };

    const calcTotal = async (cant) => {
        for (let i = 0; i < cant; i++) {
            try {
                dataRR = await table.rowManager.rows[i].getData();

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
                                dataRR[`fecha${idx}`] =
                                    // @ts-ignore
                                    new Date().toDateInputValue();
                            let porcentaje = 1;
                            if (
                                dataRR[`porcentaje${idx}`] != null &&
                                dataRR[`porcentaje${idx}`] != ""
                            ) {
                                porcentaje =
                                    parseFloat(dataRR[`porcentaje${idx}`]) /
                                    100;
                                porcentajes = true;
                            }
                            Val += parseFloat(value) * porcentaje;
                            if (porcentaje === 1) n++;
                        }
                    }
                });
                //   console.log(n);
                //   console.log((Val / (n)).toFixed(2));
                //   console.log(n, Val);
                if (n > 0 && !porcentajes) dataRR.Val = (Val / n).toFixed(2);
                else if (porcentajes) dataRR.Val = Val.toFixed(2);
                else dataRR.Val = 0;
                var rowElement = table.rowManager.rows[i].getElement();
                rowElement.children[2].innerText = dataRR.Val;
                datosTabla[i] = dataRR;
            } catch (error) {
                console.log(error);
            }
        }
    };

    var valid = function (cell, value, parameters) {
    //cell - the cell component for the edited cell
    //value - the new input value of the cell
    //parameters - the parameters passed in with the validator

    let valido = (value >= parameters.min && value <= parameters.max) || (value == "");
    if (!valido)
        value = "";
    else
        return valido;
}


    $: if ((tableNotas)&&($Nivel!=="")&&($Asignatura!="")&&($Numero!="")) TableNotas();

    const TableNotas = async () => {
        // @ts-ignore
        let table = await new Tabulator(tableNotas, {
            height: "1320px",
            layout: "fitDataTable",
            placeholder: "No hay datos",
            autoColumns: true,
            // @ts-ignore
            layout: "fitDataTable",
            responsiveLayout: "true",
            ajaxURL: `${$URL}getNotas.php`,
            headerSort: false,
            ajaxResponse: function (url, params, response) {
                //url - the URL of the request
                //params - the parameters passed with the request
                //response - the JSON object returned in the body of the response.
                console.log(response);
                response = response.sort((a, b) => {
                    if (a.Nombres > b.Nombres) return 1;
                    if (a.Nombres < b.Nombres) return -1;
                    return 0;
                });
                return response; //return the response data to tabulator
            },
            ajaxParams: {
                docente: $Docente,
                nivel: $Nivel,
                numero: $Numero,
                asignatura: $Asignatura,
                periodo: $Periodo,
                asignacion: $CAsignacion,
            },
            ajaxContentType: "json",
            ajaxConfig: {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=utf-8", //set specific content type
                },
            },
            rowFormatter: function (row) {
                // console.log(dataRR);

                row._row.cells[2].element.style.backgroundColor = "gray";
                row._row.cells[2].element.style.border = "1px solid black";
                if (dataRR != undefined) {
                    // console.log(dataRR);
                    if (parseFloat(dataRR.Val) >= 3) {
                        //row._row.cells[2].element.style = "color:white;text-align:center;background:green;border:1px solid black;width:40px;";
                        row._row.cells[2].element.style.backgroundColor =
                            "green";
                        row._row.cells[2].element.style.color = "white";
                        for (let i = 3; i <= 15; i++) {
                            if (parseFloat(row._row.cells[i].getValue()) < 3)
                                row._row.cells[i].element.style.color = "red";
                        }
                    } else {
                        row._row.cells[2].element.style =
                            "color:white;text-align:center;background:red;border:1px solid black;width:40px;";
                        for (let i = 3; i <= 15; i++) {
                            if (parseFloat(row._row.cells[i].getValue()) < 3)
                                row._row.cells[i].element.style.color = "red";
                        }
                    }
                }
            },
            renderComplete: function () {
                try {
                    for (let i = 1; i <= 12; i++) {
                        table.hideColumn("aspecto" + i);
                        table.hideColumn("porcentaje" + i);
                        table.hideColumn("fechaa" + i);
                        table.hideColumn("fecha" + i);
                    }

                    table.hideColumn("estudiante");
                } catch (error) {}
                datosTabla = table.getData();
                datosTablai = [...datosTabla];

                document
                    .querySelector(".spnasignatura")
                    .classList.add("d-none");
                document
                    .querySelector(".savingNotas")
                    .classList.remove("d-none");
                document.querySelector(".float").classList.remove("d-none");
                drawAllCells(datosTabla.length);
                /*          var ik = 0;
                      interval = setInterval(() => {
                          if (ik == 0) console.time();
                          if (!MAESTRO)
                                console.log(`interval ${ik}`);
                              ik++;
                          if ((ik > 800) && (!MAESTRO)) location.reload();
                      }, 1000);*/
               // reiniciarInterval();
            },
            validationFailed: async function (cell, value, validators) {
                try {
                    await Swal.fire({
                        icon: "error",
                        title: `Ha escrito un valor erróneo`,
                        html: ` <h3 class="text-danger">${value}</h3> no está permitido`,
                    });
                } catch (error) {}
            },
            autoColumnsDefinitions: function (definitions) {
                definitions.forEach((column, index) => {
                    //column.frozen=true;
                    column.responsive = 0;
                    column.resizable = false;
                    if (index === 1) {
                        column.headerFilter = true;
                        column.headerFilterPlaceholder = "Buscar Estudiante...";
                        column.cellClick = async function (e, cell) {
                          //  Inasistencias(cell.getRow().getData());
                        };
                    } else if (index === 2) {
                        column.hozAlign = "center";
                        column.maxWidth = 40;
                        // column.formatter="color";
                    } else if (index > 2 && index < 15) {
                        column.cellClick = async function (e, cell) {
                            colT = cell;
                            rr = await cell.getRow();
                            // cc = cell.getPosition().column;
                            row = await rr.getPosition(true);

                            //  console.log(cell.getValue());
                        };
                        column.cellEdited = async (e) => {
                            try {
                                console.log(e);

                                colT = e;
                                //dataRR = rr.getData();
                                dataRR = await e.getRow().getData();
                                //row = await rr.getPosition(true);
                                row = await e.getRow().getPosition(true);
                                //   console.log(dataRR);
                                var Val = 0;
                                var n = 0;
                                let porcentajes = false;
                                Object.entries(dataRR).forEach((entry) => {
                                    const [key, value] = entry;

                                    if (key.includes("N") && key != "Nombres") {
                                        if (
                                            value != " " &&
                                            value != null &&
                                            value != ""
                                        ) {
                                            let idx = key.slice(
                                                key.lastIndexOf("N") + 1,
                                                key.length
                                            );
                                            if (dataRR[`fecha${idx}`] == null)
                                                dataRR[`fecha${idx}`] =
                                                    // @ts-ignore
                                                    new Date().toDateInputValue();
                                            let porcentaje = 1;
                                            if (
                                                dataRR[`porcentaje${idx}`] !=
                                                    null &&
                                                dataRR[`porcentaje${idx}`] != ""
                                            ) {
                                                porcentaje =
                                                    parseFloat(
                                                        dataRR[
                                                            `porcentaje${idx}`
                                                        ]
                                                    ) / 100;
                                                porcentajes = true;
                                            }
                                            Val +=
                                                parseFloat(value) * porcentaje;
                                            if (porcentaje === 1) n++;
                                        }
                                    }
                                });
                                //   console.log(n);
                                //   console.log((Val / (n)).toFixed(2));
                                console.log(n, Val);
                                if (n > 0 && !porcentajes)
                                    dataRR.Val = (Val / n).toFixed(2);
                                else if (porcentajes)
                                    dataRR.Val = Val.toFixed(2);
                                else dataRR.Val = 0;
                                var rowElement = e.getRow().getElement();
                                rowElement.children[2].innerText = dataRR.Val;
                                datosTabla[row] = dataRR;
                                e.getRow().reformat();
                            } catch (error) {
                                console.log(error);
                            }
                        };
                        column.headerMenu = headerMenu;
                        column.editor = "number";
                        column.editorParams = {
                            verticalNavigation: "table",
                        };
                        column.hozAlign = "right";
                        column.validator = [
                            {
                                type: valid,
                                parameters: {
                                    min: 1,
                                    max: 5,
                                },
                            },
                        ];
                    }
                });

                return definitions;
            },
        });
    };
</script>

<div bind:this={tableNotas} id="tableNotas" class="w-100" />
