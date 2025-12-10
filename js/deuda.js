let boton = document.getElementById("agregar-d")
let lista = document.getElementById("listad")

var data = []
var cant = 0

boton.addEventListener("click", agregar)

function agregar() {
    let fecha = document.getElementById("fechad").value
    let cargo = document.getElementById("cargod").value
    let monto = parseFloat(document.getElementById("montobd").value)
    let total = monto

    //agregar elementos en la lista

    data.push(
        {
            "id": cant,
            "monto": monto,
            "cargo": cargo,
            "fecha": fecha,
            "total": total
        }
    );
    let id_row = "row" + cant;

    //let fila ='<tr id='+id_row+'> <td>'+fecha+'</td> <td>'+cargo+'</td> <td>'+monto+'</td>'

    let fila = '<div class="transacion" id='+id_row+'><div class="t-fecha-i" id="tfecha">'+fecha+'</div><div class="t-tiel-i" id="tcargo">'+cargo+'<div class="t-monto-i"><div class="bolivares"><div class="moneda">Bs.</div><div class="monto-b-i" id="tmonto">'+monto+'</div></div><div class="dolares"><div class="moneda">$</div><div class="monto-d-i">0</div></div></div></div><div class="tbtn"><div class="tbtn-editar"><a href="#" onclick="monto('+cant+')">Editar</a></div><div class="tbtn-eliminar"><a href="#" onclick="eliminar('+cant+');">Eliminar</a></div></div></div>'

    $("#listad").append(fila)

    $("#fechad").val("")
    $("#cargod").val("")
    $("#montobd").val("")
    $("#montodd").val("")
    $("#fechad").focus()
    cant++
    sumar()
}

function eliminar(row) {
    // Eliminar la fila del DOM
    $("#row"+row).remove();
    let i = 0
    let pos = 0 
    // Encontrar la posición en el array data
    for (x of data){
        if(x.id==row){
            pos = i
        }
        i++
    }
    data.splice(pos, 1)

    // Actualizar sumas u otros cálculos
    sumar();
}

function sumar() {
    let tot = 0
    for (x of data) {
        tot = tot + x.total
    }
    document.getElementById("cantidadd").innerHTML = tot
    cant++
}



