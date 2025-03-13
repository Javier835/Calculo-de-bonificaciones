//Almacena los datos a imprimir en la lista de resultados
let datos = [];
//Almacena el tiempo en la empresa
let tiempo;

function calcularBonos() {
    
    let result = webScrapingDGI('55,550.00');
    console.log(result);

    /*
    //vaciar array con mi lista
    datos = [];

    //obtener el sueldo digitado por el usuario
    let sueldo = document.getElementById('sueldo').value;
    //asignar a mi variable tiempo los meses que tiene el empleado
    tiempo = mesesEnLaEmpresa();

    //validar si el usuario registra su salario o si tiene mas de 3 meses
    if (sueldo == "" || sueldo == 0) {

        document.getElementById('resultados').innerHTML = "Su salario debe ser superior a 0 😢";

    } else if (tiempo < 3 || !document.getElementById('date').value) {

        document.getElementById('resultados').innerHTML = "Debe tener mas de 3 meses en la empresa 😢";

    } else {

        //variables con los calculos necesarios
        let salarioDiario = calcularSalarioDiario(sueldo);
        let diasQueTocan = calcularDiasQueTocan(parseInt(tiempo));
        let bonoBruto = bonosBruto(diasQueTocan, salarioDiario);

        //almacenar en array los datos de mi lista
        datos.push(
            `Sueldo: ${sueldo.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
            `Salario diario: ${salarioDiario.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
            `Años en la empresa: ${ConvertirMeses(tiempo)}`,
            `Días que te tocan: ${diasQueTocan}`,
            `Bonificación en bruto: ${bonoBruto.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
        );

        //referencia a mi lista que muestra los resultados
        let resultados = document.getElementById('resultados');

        //limpiar mi lista antes de usarla
        resultados.innerHTML = "";

        //llenar mi lista con los datos de mi array
        datos.forEach(element => {
            const li = document.createElement('li');
            li.textContent = element;
            resultados.appendChild(li);

        });
    }
    */
};

//convertir los meses laborados en años y meses
function ConvertirMeses(tiempo) {

    let mesesAnios = `${Math.floor(tiempo / 12)} Años y ${tiempo % 12} Meses`;

    return mesesAnios;
}

//calcular el tiempo del colaborador en la empresa
function mesesEnLaEmpresa() {

    //obtener la fecha ingresada por el usuario
    let fechaIngreso = document.getElementById('date').value;

    //obtener el mes seleccionado
    let periodoFiscal = 12;

    // Validar si se ha seleccionado una fecha
    if (!fechaIngreso) {
        document.getElementById('resultados').innerHTML = "Seleccione una fecha de ingreso";
        return;
    };

    // Crear objeto de la fecha seleccionada
    const fecha = new Date(fechaIngreso + 'T00:00:00'); //Mi fecha seleccionada


    // Obtener el año anterior
    const anioAnterior = new Date().getFullYear() - 1;


    // Crear fecha del mes seleccionado en el año actual
    const fechaComparar = new Date(anioAnterior, periodoFiscal - 1, 31); // Los meses en JavaScript son 0-indexados

    // Calcular la diferencia en meses
    const diferenciaMeses = (fechaComparar.getFullYear() - fecha.getFullYear()) * 12 + (fechaComparar.getMonth() - fecha.getMonth()) + 1;


    return diferenciaMeses;

};



//calcular el salario diario del colaborador
function calcularSalarioDiario(sueldo) {

    //comprobar si el colaborador tiene menos de 12 meses
    if (tiempo < 12) {

        return ((sueldo * tiempo) / 12) / 23.83;

    } else {

        return sueldo / 23.83;
    };


};

//calcular dias que le toca al colaborador según el tiempo en la empresa
function calcularDiasQueTocan(anios) {
    return anios < 36 ? 45 : 60;
};

//Calcular la bonificación en bruto
function bonosBruto(dias, salarioDiario) {
    return dias * salarioDiario;
};

//calcular los bonos netos
function bonosNeto(bruto, impuestos) {
    return bruto - impuestos;
};

/*
function webScrapingDGI(bonificacion) { 
    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({ headless: false }); // Modo visual para ver la automatización
        const page = await browser.newPage();

        await page.goto('https://dgii.gov.do/app/WebApps/ConsultasWeb/calculadoras/retenciones.aspx'); // Página a visitar
        await page.type('#ctl00_cphMain_txtIngresosMensuales', bonificacion); // Insertar dato en el campo

        // Seleccionar el último elemento del <select>
        await page.evaluate(() => {
            let selectElement = document.querySelector('#ctl00_cphMain_ddlAnoRetencionIM');
            selectElement.value = selectElement.options[selectElement.options.length - 1].value;
            selectElement.dispatchEvent(new Event('change')); // Disparar el evento para actualizar la selección
        });

        // Hacer clic en el botón después de seleccionar el año
        await page.click('#botonEnviar'); 

        await page.waitForSelector('#ctl00_cphMain_lblValorRetencion'); // Esperar a que aparezca el dato buscado
        const resultado = await page.$eval('#ctl00_cphMain_lblValorRetencion', el => el.innerText); // Extraer dato

        return resultado;
        await browser.close();
    })();
};*/
