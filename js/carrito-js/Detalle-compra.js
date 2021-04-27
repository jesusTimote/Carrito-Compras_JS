let $table = document.querySelector("table #Lista");
let SaveProduct = []
if (SaveProduct === null) {
    SaveProduct = [];
    console.log(SaveProduct);
}

function ListarDetalle() {
    let ListaDetalle = JSON.parse(localStorage.getItem("carrito"));

    $table.innerHTML = "";
    for (Lista of ListaDetalle) {

        $table.innerHTML += `
        <tr>
        <td class="shoping__cart__item imagen">
            <img src="${Lista.img}" alt="" width=100>
            <h5>${Lista.titulo}</h5>
        </td>
        <td class="shoping__cart__price precio">
                ${Lista.precio}
        </td>
        <td class="shoping__cart__quantity">
            <div class="quantity">
                <div class="pro-qty">
               
                    <input type="text" value="${Lista.cantidad}">
                   
                </div>
            </div>
        </td>
        <td class="shoping__cart__total animate__animated animate__fadeIn Total_precio  ">
           ${Lista.precio}
        </td>
        <td class="shoping__cart__item__close">
            <span class="icon_close"  data-id="${Lista.id}"></span>
        </td>
    </tr>`;
    }


}
function QuantityChange() {
    let $actualizaCarrito = JSON.parse(localStorage.getItem("carrito"));
    let Quantity = document.querySelectorAll("tr .pro-qty");
    Quantity.forEach((element) => {
        element.insertAdjacentHTML(
            "afterbegin",
            "<span class='dec qtybtn'>-</span>"
        );
        element.insertAdjacentHTML(
            "beforeend",
            "<span class='inc qtybtn'>+</span>"
        );
        element.addEventListener("click", (e) => {
            let prod = element.parentElement.parentElement.parentElement;
            if (e.target.classList.contains("inc")) {
                let aumento = prod.querySelector(".pro-qty input").value
                aumento = isNaN(aumento) ? 0 : aumento;
                aumento++;
                prod.querySelector(".pro-qty input").value = aumento;


            }
            if (e.target.classList.contains("dec")) {
                let disminuir = prod.querySelector(".pro-qty input").value;
                disminuir = isNaN(disminuir) ? 0 : disminuir;
                //si es menor a 1  decimos a que lo iguale a 1 /
                disminuir < 1 ? (disminuir = 1) : "";
                disminuir--;
                let min = (prod.querySelector(".pro-qty input").value = disminuir);
                return min;
            }
        });
    });
}



function TotalCompra() {
    let $actualizaCarrito = JSON.parse(localStorage.getItem("carrito"));

    document.addEventListener("click", e => {
        let value = e.target.parentElement.parentElement.parentElement.parentElement
        let cantidad = value.querySelector(".pro-qty input").value
        let precioTotal = value.querySelector("tr .precio").textContent
        let precio = parseFloat(cantidad).toFixed(2) * parseFloat(precioTotal).toFixed(2)
        value.querySelector("tr .Total_precio").innerHTML = precio

        //ELiminar producto
        let producto, id;
        if (e.target.classList.contains("icon_close")) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector(".icon_close").getAttribute("data-id");

            let Eliminar = $actualizaCarrito.findIndex(e => e.id === id)
            console.log(Eliminar);
            if (Eliminar !== -1) {
                $actualizaCarrito.splice(Eliminar, 1)
                localStorage.setItem("carrito", JSON.stringify($actualizaCarrito));
            }

        }
        CardTotal()
    })

}

function CardTotal() {

    let calculaTotal = document.querySelectorAll(".Total_precio")
    sumaTotal = 0, igv = 0, base = 0

    //recorremos todo el campo tabla total
    for (let i = 0; i < calculaTotal.length; i++) {
        // firstChild => escogemos el primer elemento
        // del campo y con "Data" el valor que tiene
        sumaTotal += parseFloat(calculaTotal[i].firstChild.data)

    }
    base = parseFloat(sumaTotal / 1.18).toFixed(2)
    igv = parseFloat(base * 0.18).toFixed(2)

    document.querySelector(".subtotal span").innerHTML = base
    document.querySelector(".igv span").innerHTML = igv
    document.querySelector(".total span").innerHTML = sumaTotal

}


function CodeDscto() {

    $dscto = 0, $total = 0
    document.addEventListener("click", e => {
        //  e.preventDefault();
        if (e.target.classList.contains("site-btn")) {
            e.preventDefault();

            let cupon = document.querySelector("#txt-cupon").value
            let code = ["covid-19", "2021", "welcome", "fruits"]
            let desc = code.find(e => e === cupon)
            !cupon
                ? Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Agregue un cupon...!',
                    showConfirmButton: false,
                    timer: 1800

                })
                : desc === undefined
                    ? Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Agrege un cupon valido...!',
                        showConfirmButton: false,
                        timer: 1800

                    })
                    : Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Exito...',
                        text: 'Cupon valido...!',
                        showConfirmButton: false,
                        timer: 1800

                    })

            if (desc) {
                $dscto = parseFloat((5 * sumaTotal) / 100).toFixed(2)
                $total = parseFloat((sumaTotal * 95) / 100).toFixed(2)
                // descuento

                let $aplica = document.querySelector(".list-cart")
                const li = document.createElement("li");
                // agregamos clase a li
                li.classList.add("Dscto");
                // agregamos 
                li.textContent = "Desct 5%";
                const span = document.createElement("span");
                li.appendChild(span)
                $aplica.appendChild(li)

                ///compra total 
                const lis = document.createElement("li");
                lis.classList.add("Total-Final");
                lis.textContent = "Compra-Final S/.";
                const spans = document.createElement("span");
                lis.appendChild(spans)
                $aplica.appendChild(lis)


                //`<li class='dcto'>Desct 5% S/. <span> 00.00</span></li>`
                console.log("Dscto :", (parseFloat(5 * sumaTotal) / 100));
                console.log("total:", (sumaTotal * 95) / 100);
            }
            document.querySelector(".Dscto span").innerHTML = $dscto
            document.querySelector(".Total-Final span").innerHTML = $total
        }
        $dscto = parseFloat((5 * sumaTotal) / 100).toFixed(2)
        $total = parseFloat((sumaTotal * 95) / 100).toFixed(2)
        document.querySelector(".Dscto span").innerHTML = $dscto
        document.querySelector(".Total-Final span").innerHTML = $total

    })

}

function GuardarProceso() {
    document.addEventListener("click", e => {
        if (e.target.classList.contains("procesar-btn")) {
            location.reload();
            let $save = e.target.parentNode.parentNode.parentNode.parentNode;
            let cupon = document.querySelector("#txt-cupon").value
            let code = ["covid-19", "2021", "welcome", "fruits"]
            let desc = code.find(e => e === cupon)
            let $tabla = document.querySelectorAll("table #Lista tr");
            $tabla.forEach(element => {
                if(!desc){
                    arreglo = {

                        titulo: element.querySelector(".imagen  h5").textContent,
                        precio: element.querySelector(".precio").textContent,
                        preciototal: element.querySelector(".Total_precio").textContent,
                        cantidad: element.querySelector(".pro-qty input").value,
                        subtotal: $save.querySelector(".subtotal span").textContent,
                        igv: $save.querySelector(".igv span").textContent,
                        total: $save.querySelector(".total span").textContent,
                       
    
                    }
                }else{
                arreglo = {

                    titulo: element.querySelector(".imagen  h5").textContent,
                    precio: element.querySelector(".precio").textContent,
                    preciototal: element.querySelector(".Total_precio").textContent,
                    cantidad: element.querySelector(".pro-qty input").value,
                    subtotal: $save.querySelector(".subtotal span").textContent,
                    igv: $save.querySelector(".igv span").textContent,
                    total: $save.querySelector(".total span").textContent,
                    descto: $save.querySelector(".Dscto span").textContent,
                    final: $save.querySelector(".Total-Final span").textContent,

                }
            }
                //console.log("a",arreglo);
                //  SaveProduct=ValidaStorage()
                SaveProduct.push(arreglo);
                console.log(SaveProduct);
                sessionStorage.setItem("DetallePedido", JSON.stringify(SaveProduct));
                window.location.href = "shop-confirmation.html"
            })

        }
    })
}



document.addEventListener("DOMContentLoaded", ListarDetalle);
document.addEventListener("DOMContentLoaded", QuantityChange);
document.addEventListener("DOMContentLoaded", TotalCompra);
document.addEventListener("DOMContentLoaded", CardTotal);
document.addEventListener("DOMContentLoaded", CodeDscto);
document.addEventListener("DOMContentLoaded", GuardarProceso);