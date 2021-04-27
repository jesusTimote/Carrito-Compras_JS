let $tabla = document.querySelector("table .ListadoProducto")

//let $total=document.querySelector("Total-pedido")
$tabla.innerHTML = ""
function Confirmar() {
    let $ObtenerPedido = JSON.parse(sessionStorage.getItem("DetallePedido"))
    
    for (Lista of $ObtenerPedido) {
        $tabla.innerHTML += `
        <tr>
            <td style="width: 25%">${Lista.titulo}</td>
            <td style="width: 25%; text-align:center">${Lista.cantidad}</td>
            <td style="width: 25%; text-align:center">S/${Lista.precio}</td>
            <td style="width: 25%; text-align:center">S/ ${Lista.preciototal}</td>
        </tr>    
    `
        //console.log(Lista);
       // document.querySelector(".Total-pedido span").innerHTML=`S/ ${Lista.total}`
    }
    
        $tabla.innerHTML  +=`
        <tr >
            <td colspan="3" style="width: 18%;font-weight:800;text-align:center">Sub-Total</td>
            <td  style="width: 5%;font-weight:800;color:red;text-align:center">${Lista.subtotal}</td>
            
        </tr>
        <tr >
            <td colspan="3" style="width: 18%;font-weight:800;text-align:center">IGV 18%</td>
            <td  style="width: 5%;font-weight:800;color:red;text-align:center">${Lista.igv}</td>
        </tr>
        <tr >
            <td colspan="3" style="width: 18%;font-weight:800;text-align:center">Compra Total</td>
            <td  style="width: 5%;font-weight:800;color:red;text-align:center">${Lista.total}</td>
        </tr>    
      `
    
    let random=Math.floor(Math.random() * (2500 - 1000)) + 1000;
    document.querySelector(".numAleatorio").innerHTML=`order details [ id:a-${random} ]`
    console.log(random);

}

document.addEventListener("DOMContentLoaded", Confirmar)