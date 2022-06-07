// Inicio JS para carrito de compras 

let productosEnCarrito = JSON.parse(localStorage.getItem('carritoCompras'));
if (!productosEnCarrito) {
    productosEnCarrito = [];
}
const elementoPadre = document.querySelector('#comprarItems');
const sumaPrecioCarrito = document.querySelector('#sum-prices');
const html = document.querySelector('#productsTemplate');
document.getElementById("productsTemplate").innerHTML = html;
const productos = document.querySelectorAll('.product-under');
const prod = document.querySelector('.productos')
const pds = prod.querySelectorAll('.productContainer');

console.log(productos);
console.log(html)
console.log(pds)
    /* console.log(products); */

const contadorSumaPrecio = function() { // 4
    let suma = 0;
    productosEnCarrito.forEach(item => {
        suma += item.precio;
    });
    return suma;
}

// Función que imprime los productos en el HTML del Carrito

const actualizarCarritoHTML = function() { // 3
    localStorage.setItem('carritoCompras', JSON.stringify(productosEnCarrito));
    if (productosEnCarrito.length > 0) {
        let result = productosEnCarrito.map(producto => {
            return `
            <li class="buyItem">
                <img src="${producto.imagen}">
                <div>
                    <h5>${producto.nombre}</h5>
                    <h6>$${producto.precio}</h6>
                    <div>
                        <button class="button-minus" data-id=${producto.id}>-</button>
                        <span class="countOfProduct">${producto.contador}</span>
                        <button class="button-plus" data-id=${producto.id}>+</button>
                    </div>
                </div>
            </li>`
        });
        elementoPadre.innerHTML = result.join('');
        document.querySelector('.checkout').classList.remove('hidden');
        sumaPrecioCarrito.innerHTML = '$' + contadorSumaPrecio();

    } else {
        document.querySelector('.checkout').classList.add('hidden');
        elementoPadre.innerHTML = `<center><h2 class="empty" style="font-family: SUNN-line-regular;
    src: url('../assets/fonts/menu/SUNN-Line-Regular.woff')"> Tu Carrito está vacío </h2></center>`;
        sumaPrecioCarrito.innerHTML = '';
    }
}

// Función que actualiza el estado de los productos en el Carrito

function actualizarProductosEnCarrito(producto) { // 2
    for (let i = 0; i < productosEnCarrito.length; i++) {
        if (productosEnCarrito[i].id == producto.id) {
            productosEnCarrito[i].contador += 1;
            productosEnCarrito[i].precio = productosEnCarrito[i].precioBase * productosEnCarrito[i].contador;
            return;
        }
    }

    productosEnCarrito.push(producto);
}

// Evento que agrega el producto seleccionado al Carrito
productos.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('addToCart')) {
            const productoID = e.target.dataset.productId;
            const productoNombre = item.querySelector('.productName').innerHTML;
            const productoPrecio = item.querySelector('.priceValue').innerHTML;
            const productoImagen = item.querySelector('img').src;
            let producto = {
                nombre: productoNombre,
                imagen: productoImagen,
                id: productoID,
                contador: 1,
                precio: +productoPrecio,
                precioBase: +productoPrecio,
            }
            actualizarProductosEnCarrito(producto);
            actualizarCarritoHTML();
        }
    });

});


// Evento para controlar cuando se presiona el Adicionar o Disminuir cantidad de producto dentro del carrito

elementoPadre.addEventListener('click', (e) => { // Last
    const esBotonSuma = e.target.classList.contains('button-plus');
    const esBotonResta = e.target.classList.contains('button-minus');
    if (esBotonSuma || esBotonResta) {
        for (let i = 0; i < productosEnCarrito.length; i++) {
            if (productosEnCarrito[i].id == e.target.dataset.id) {
                if (esBotonSuma) {
                    productosEnCarrito[i].contador += 1
                } else if (esBotonResta) {
                    productosEnCarrito[i].contador -= 1
                }
                productosEnCarrito[i].precio = productosEnCarrito[i].precioBase * productosEnCarrito[i].contador;

            }
            if (productosEnCarrito[i].contador <= 0) {
                productosEnCarrito.splice(i, 1);
            }
        }
        actualizarCarritoHTML();
    }
});

actualizarCarritoHTML();

// Función que cierra el HTML del carrito

function cerrarCarrito() {
    const carrito = document.querySelector('.producstOnCart');
    carrito.classList.toggle('hide');
    document.querySelector('body').classList.toggle('stopScrolling')
}


const abrirCarritoCompras = document.querySelector('.botonCarritoCompras');
abrirCarritoCompras.addEventListener('click', () => {
    const carrito = document.querySelector('.producstOnCart');
    carrito.classList.toggle('hide');
    document.querySelector('body').classList.toggle('stopScrolling');
});


const cerrarCarritoCompras = document.querySelector('#closeButton');
const overlay = document.querySelector('.overlay');
cerrarCarritoCompras.addEventListener('click', cerrarCarrito);
overlay.addEventListener('click', cerrarCarrito);

function confirmarCompra() {
    let login = document.getElementById("result").innerText;
    console.log(login);
    if (login != "") {
        cerrarCarrito();
        Swal.fire({
            title: '¿Desea confirmar la compra?',
            showDenyButton: true,
            confirmButtonText: 'Confirmar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('¡Comprado!', '', 'success')
                productosEnCarrito = [];
                actualizarCarritoHTML();
            } else if (result.isDenied) {
                Swal.fire('Compra cancelada', '', 'info')
            }
        })

    } else {

        cerrarCarrito();
        Swal.fire({

            icon: 'error',
            title: 'No te has registrado aún.',
            text: '¡Algo va mal!',
            footer: '<a href="">¿Por qué ocurre ésto?</a>'
        })




    }


}

// Fin JS para carrito de compras

// Función para el snackbar

function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}