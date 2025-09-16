let boton = document.getElementById("agregar-e")
let lista = document.getElementById("listae")

var data = []
var cant = 0

boton.addEventListener("click", agregar)

function agregar() {
    let fecha = document.getElementById("fechae").value;
    let cargo = document.getElementById("cargoe").value;
    let monto = parseFloat(document.getElementById("montobe").value);
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
    let id_row = 'row' + cant;

    //let fila ='<tr id='+id_row+'> <td>'+fecha+'</td> <td>'+cargo+'</td> <td>'+monto+'</td>'

    let fila = '<div class="transacion" id='+id_row+'><div class="t-fecha-i" id="tfecha">'+fecha+'</div><div class="t-tiel-i" id="tcargo">'+cargo+'<div class="t-monto-i"><div class="bolivares"><div class="moneda">Bs.</div><div class="monto-b-i" id="tmonto">'+monto+'</div></div><div class="dolares"><div class="moneda">$</div><div class="monto-d-i">0</div></div></div></div><div class="tbtn"><div class="tbtn-editar"><a href="#" onclick="monto('+cant+')">Editar</a></div><div class="tbtn-eliminar"><a href="#" onclick="eliminar('+cant+');">Eliminar</a></div></div></div>'


    $("#listae").append(fila)

    $("#fechae").val("")
    $("#cargoe").val("")
    $("#montobe").val("")
    $("#montodd").val("")
    $("#fechae").focus()
    cant++
    sumar()
}

function sumar() {
    let tot = 0
    for (x of data) {
        tot = tot + x.total
    }
    document.getElementById("cantidade").innerHTML = tot
    cant++
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

function monto(row){
    let ncantidad = parseFloat(prompt("Monto:"))
    data[row].monto = ncantidad

    let filaid = document.getElementById("row"+row)
    celda = filaid.getElementsByTagName("tmonto").innerHTML = ncantidad

    sumar()
}