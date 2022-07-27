/* const { post } = require("../routes/processRoutes"); */

const socket = io();
let username;
let productosEnCarrito;


fetch('/profNameDisabled').then(res => res.json()).then(data => {
    username = data.username
    const renderize = () => {
        let html = ""
        html += ` 
        <input class="buttonLogOutStyle" type="submit" value="Logout ${username} " id="logOutButton">
        `
        document.getElementById("logOutForm").innerHTML = html
    }
    renderize();

})

socket.on('productLog', (data) => {
    let products = data.payload;
    let productsTemplate = document.getElementById("productsTemplate");
    fetch('templates/newestProducts.handlebars').then(response => {
        return response.text();
    }).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({ products })
        productsTemplate.innerHTML = html;

        // Shopping Cart 
        // Inicio JS para carrito de compras 

        productosEnCarrito = JSON.parse(localStorage.getItem('carritoCompras'));
        if (!productosEnCarrito) {
            productosEnCarrito = [];
        }
        const elementoPadre = document.querySelector('#comprarItems');
        const sumaPrecioCarrito = document.querySelector('#sum-prices');
        const productos = document.querySelectorAll('.product-under');


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
                elementoPadre.innerHTML = `<center><h2 class="empty" style="font-family: Roboto;
    "> Your Cart is empty </h2></center>`;
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
                    const productPrice = parseInt(productoPrecio.replace('$', ''));
                    const productoImagen = item.querySelector('img').src;
                    let producto = {
                        nombre: productoNombre,
                        imagen: productoImagen,
                        id: productoID,
                        contador: 1,
                        precio: +productPrice,
                        precioBase: +productPrice,
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





    })

})



//Sockets

socket.on('newUser', (data) => {

    Swal.fire({
        icon: "success",
        text: "Usuario nuevo conectado",
        toast: true,
        position: "top-right"
    });
})

let nickname;
socket.on('userLog', (data) => {
    nickname = data;
})

chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) { // Trim saca espacios
            socket.emit('message', { nickname: nickname, message: chatBox.value.trim() })
            chatBox.value = "";
        }
    }
})

socket.on('log', data => {
    console.log(data);
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message => {
        messages = messages + `${username} dice: ${message.message}<br/>`
    })
    log.innerHTML = messages;
});

socket.on('normalizedData', data => {
    let log = document.getElementById('log');
    // denormalization process with normalizr
    const author = new normalizr.schema.Entity('author');
    const mesagges = new normalizr.schema.Entity('mesagges', {
        author: author,
    });
    let denormalizedData = new normalizr.denormalize(data.result, [mesagges], data.entities);
    console.log(`Longitud total de la data normalizada: ${JSON.stringify(data,null,'\t').length}`);
    console.log(`Porcentaje de reducción: ${(JSON.stringify(mesagges,null,'\t').length - JSON.stringify(data,null,'\t').length)/JSON.stringify(mesagges,null,'\t').length*100}%`)

})

function confirmPurchase() {

    purchaseDetail = JSON.parse(localStorage.getItem('carritoCompras'));
    console.log(purchaseDetail);
    console.log(username);
    socket.emit('purchase', purchaseDetail);
    socket.emit('userData', username);

    /* window.location.href = '/purchase'; */

    /* console.log(productosEnCarrito);
    socket.emit('purchase', productosEnCarrito); */
    /*   Swal.fire({
          title: '¿Desea confirmar la compra?',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          denyButtonText: `Cancelar`,
      }).then((result) => {
          if (result.isConfirmed) {
              purchaseDetail = JSON.parse(localStorage.getItem('carritoCompras'));
              console.log(purchaseDetail);
              socket.emit('purchase', purchaseDetail);
              post('/purchase', purchaseDetail);
              productosEnCarrito = [];
              localStorage.clear();
              Swal.fire('¡Comprado!', '', 'success')


          } else if (result.isDenied) {
              productosEnCarrito = [];
              localStorage.clear();
              Swal.fire('Compra cancelada', '', 'info')

          }
      }) */




}