
let datos = [];

function calcularBonos(){
    
    datos = [];

    let sueldo = document.getElementById('sueldo').value;
    let tiempo = document.getElementById('time').value;

    let salarioDiario = calcularSalarioDiario(sueldo);
    let diasQueTocan = calcularDiasQueTocan(parseInt(tiempo));
    let bonoBruto = bonosBruto(diasQueTocan,salarioDiario);
    let impuesto = impuestos(bonoBruto);
    let bonoNeto = bonosNeto(bonoBruto,impuesto);
    
    datos.push(
        `Sueldo: ${sueldo.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
        `Salario diario: ${salarioDiario.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
        `Años en la empresa: ${tiempo}`,
        `Días que te tocan: ${diasQueTocan}`,
        `Bonificación en bruto: ${bonoBruto.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
        `Impuestos: ${impuesto.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`,
        `Bonificacion Neto: ${bonoNeto.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`    
    
    );
    
    let resultados = document.getElementById('resultados');

    resultados.innerHTML = "";

    datos.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element;
        resultados.appendChild(li);

    });

    
    
}

function calcularSalarioDiario(sueldo){
    return sueldo / 23.83;
};

function calcularDiasQueTocan(anios){
    return anios >= 3 ? 60 : 45;
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