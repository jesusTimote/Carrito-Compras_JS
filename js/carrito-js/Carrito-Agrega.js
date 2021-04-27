/* ----------------------------- 
    Agregamos un selector para 
    seleccionar todos los elemtos del 
    carrito 
 ----------------------------- */
let $Agregar = document.querySelectorAll("#Agregar");
let $Listado = document.querySelector("table .Listado");
let $CarritoCantidad = document.querySelector(".cart-icon span");
/* ----------------------------- 
    Ahora recorremos todos los 
    elementos cuando damos click
    a cada uno de ellos 
 ----------------------------- */
$Agregar.forEach((select) =>
  select.addEventListener("click", (e) => {
    e.preventDefault();
  
    const producto =
      e.target.parentElement.parentElement.parentElement.parentElement;
    GuardarStorage(producto);
    
  })
);

function GuardarStorage(producto) {
  const infoProducto = {
    img: producto.querySelector(".prod").dataset.setbg,
    titulo: producto.querySelector(".Titulo h6 a").textContent,
    precio: producto.querySelector(".Titulo h5").textContent,
    id: producto.querySelector("#Agregar").getAttribute("data-id"),
    cantidad: 1,
  };
  let SaveProduct;
  SaveProduct = ValidaStorage();

  SaveProduct.push(infoProducto);
  console.log(SaveProduct);
  localStorage.setItem("carrito", JSON.stringify(SaveProduct));

  Listar();
}

function ValidaStorage() {
  let SaveStorage;
  if (localStorage.getItem("carrito") === null) {
    SaveStorage = [];
    console.log(SaveStorage);
  } else {
    SaveStorage = JSON.parse(localStorage.getItem("carrito"));
    console.log(SaveStorage);
  }
  return SaveStorage;
}

function Listar() {
  let ListaStorage = ValidaStorage();
  $Listado.innerHTML = "";
  for (producto of ListaStorage) {
    //  console.log("Listado :",producto);
    $Listado.innerHTML += `
          <td class="si-pic"><img src="${producto.img}" alt="" width=100></td>
          <td class="si-text">
            <div class="product-selected">
              <p> S/ ${producto.precio}</p>
              <h6>${producto.titulo}</h6>
            </div>
          </td>
          <td class="shoping__cart__item__close">
            <span class="icon_close" id="icon_close" data-id="${producto.id}"></span>
          </td>
    
  `;
  }
  CuentaProductos();
}

function Eliminar() {
  let ListaStorage = ValidaStorage();

  document.addEventListener("click", (e) => {
    let producto, id;
    if (e.target.classList.contains("icon_close")) {
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      id = producto.querySelector("#icon_close").getAttribute("data-id");
      /* ListaStorage.forEach((busca, index) => {
         console.log(busca.id === id);
         if (busca.id === id) {
           ListaStorage.splice(index, 1);
           console.log(ListaStorage);
           localStorage.setItem("carrito", JSON.stringify(ListaStorage));
         }
       })*/
      let Elimina = ListaStorage.findIndex((e) => e.id === id);
      if (Elimina !== -1) {
        ListaStorage.splice(Elimina, 1);
        localStorage.setItem("carrito", JSON.stringify(ListaStorage));
        CuentaProductos()
      
      }
    
    }
  
  });
  
}
function CuentaProductos() {
  $CarritoCantidad.innerHTML = "";
  let cantidad = parseInt(ValidaStorage().length);
  console.log(cantidad);
  $CarritoCantidad.innerHTML += `${cantidad}`;
}

function ProcesarPedido() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-card")) {
      if (ValidaStorage().length === 0) {
        Swal.fire({
          position: 'center',
          icon : 'error',
          title: 'Oops...',
          text :'Agrege un producto al carrito...!',
          showConfirmButton: false,
          timer: 1800
          
        })
        
      } else {
        window.location.href = "shoping-cart.html";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", Eliminar);
document.addEventListener("DOMContentLoaded", Listar);
document.addEventListener("DOMContentLoaded", ProcesarPedido);
