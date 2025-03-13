
let datos = [];
let tiempo;

function calcularBonos(){
    
    tiempo = mesesEnLaEmpresa();
    alert (tiempo);
    // datos = [];

    // let sueldo = document.getElementById('sueldo').value;
    // tiempo = mesesEnLaEmpresa();
    
    // let salarioDiario = calcularSalarioDiario(sueldo);
    // let diasQueTocan = calcularDiasQueTocan(parseInt(tiempo));
    // let bonoBruto = bonosBruto(diasQueTocan,salarioDiario);
    // let impuesto = impuestos(bonoBruto);
    // let bonoNeto = bonosNeto(bonoBruto,impuesto);
    
    // datos.push(
    //     `Sueldo: ${sueldo.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
    //     `Salario diario: ${salarioDiario.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
    //     `Meses en la empresa: ${tiempo}`,
    //     `Días que te tocan: ${diasQueTocan}`,
    //     `Bonificación en bruto: ${bonoBruto.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
    //     `Impuestos: ${impuesto.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
    //     `Bonificacion Neto: ${bonoNeto.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`    
    
    // );
    
    // let resultados = document.getElementById('resultados');

    // resultados.innerHTML = "";

    // datos.forEach(element => {
    //     const li = document.createElement('li');
    //     li.textContent = element;
    //     resultados.appendChild(li);

    // });
    

};

//calcular el tiempo del colaborador en la empresa
function mesesEnLaEmpresa(){

    //obtener la fecha ingresada por el usuario
    let fechaIngreso = document.getElementById('date').value;

    //obtener el mes seleccionado
    let periodoFiscal = document.getElementById('cierreFiscal').value;

    // Validar si se ha seleccionado una fecha
    if (!fechaIngreso) {
        document.getElementById('resultados').innerHTML="Seleccione una fecha de ingreso";
        return;
    };

    // Crear objeto de la fecha seleccionada
    const fecha = new Date(fechaIngreso+ 'T00:00:00');

    // Obtener el año actual
    const anioAcutal = new Date().getFullYear();

    // Crear fecha del mes seleccionado en el año actual
    const fechaComparar = new Date(anioAcutal, periodoFiscal - 1, 1); // Los meses en JavaScript son 0-indexados

    // Calcular la diferencia en meses
    const diferenciaMeses = (fechaComparar.getFullYear() - fecha.getFullYear()) * 12 + (fechaComparar.getMonth() - fecha.getMonth());


    return diferenciaMeses;

};




function calcularSalarioDiario(sueldo){
    
    if(tiempo < 12){

        return (sueldo * tiempo) / 12;

    }else{

        return sueldo / 23.83;
    };
    
    
};

function calcularDiasQueTocan(anios){
    return anios < 36 ? 45 : 60;
};

function bonosBruto(dias,salarioDiario){
    return dias*salarioDiario;
};

function impuestos(bonos){
    return bonos * 0.18;
};

function bonosNeto(bruto,impuestos){
    return bruto-impuestos;
};