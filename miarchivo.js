class ProductoCafe {
    constructor(id, origen, precioKilo, descripcion, region) {
        this.id = id;
        this.origen = origen;
        this.precioKilo = parseFloat(precioKilo);
        this.descripcion = descripcion;
        this.region = region;
    }
}

class carritoProducto {
    constructor(id, origen, precioKilo, cantidad) {
        this.id = id;
        this.origen = origen;
        this.precioKilo = parseFloat(precioKilo);
        this.cantidad = parseInt(cantidad);
    }
}

const productos = [];
const carrito= [];

let carritoEnMemoria = JSON.parse(localStorage.getItem("carritoToStorage"))
if (carritoEnMemoria !== null){
    for (const comparoCarrito of carritoEnMemoria) {
        carrito.push(new carritoProducto(comparoCarrito.id, comparoCarrito.origen, comparoCarrito.precioKilo, comparoCarrito.cantidad))
    }
    presentacioncarrito ()
}

const url = "https://jmamadi.github.io/doncafeterojs/productos.json";

$.get(url, function(respuesta, estado) {
    if( estado == "success") {
        let misDatos = respuesta
        for(const dato of misDatos) {
            productos.push(new ProductoCafe(dato.id, dato.origen, dato.precioKilo, dato.descripcion, dato.region));
        }
        mostrarProductos()
    }
});

function mostrarProductos () {
    for (const producto of productos) {
        $(`#listaPrecios`).append(`
        <div class="selector-for-some-widget mx-auto m-4 p-4 col-lg-6 col-sm-12">
            <div value="${producto.id}" type=hidden class="container-fluid">
                <div class="ordenCafe">
                    <div class="col">
                        <img class=" img-fluid rounded-circle rounded mx-auto d-block bandera" src="media/bandera_${producto.id}.png" loading="lazy" alt="${producto.origen}">
                    </div>
                    <div class="col text-left">
                        <h2>Café de ${producto.origen}</h2>
                        <p>${producto.descripcion}.<span>Región de ${producto.region}</span></p><p>$ ${producto.precioKilo}</p>
                        <div class="container listaProductos">
                            <div class="row">
                                <button id="btn_${producto.id}_menos" class="fila bordeTablaProductos btnProducto">-</button>
                                <div id="btn_${producto.id}_unidades" class="fila bordeTablaProductos">0</div>
                                <button id="btn_${producto.id}_mas" class="fila bordeTablaProductos btnProducto">+</button>
                                <button id="btn_${producto.id}_agregarCarrito" class="fila bordeTablaProductos btnProducto">Agregar Carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `)
        $(`#btn_${producto.id}_menos`).click( () => cambioUnidad (producto.id, -1));
        $(`#btn_${producto.id}_mas`).click( () => cambioUnidad (producto.id, 1));
        $(`#btn_${producto.id}_agregarCarrito`).click( () => incorporarCarrito (producto.id, producto.origen, producto.precioKilo));
    }
}

function cambioUnidad(id, cantidad) {
    let unidadTotal = parseInt(document.getElementById (`btn_${id}_unidades`).innerHTML)
    let unidadNueva = unidadTotal + cantidad
    if (unidadNueva >= 0 && unidadNueva <= 10) {
        document.getElementById (`btn_${id}_unidades`).innerHTML = unidadTotal + cantidad
    }
}

function incorporarCarrito(id, origen, precioKilo) {
    let unidadIncorporada = parseInt(document.getElementById (`btn_${id}_unidades`).innerHTML)
    let unidadExistenteEnCarrito
    if (unidadIncorporada > 0 ) {
        for (const buscadorProducto of carrito) {
            unidadExistenteEnCarrito = carrito.find(producto => producto.id === id)
        }
        if (unidadExistenteEnCarrito){
            if ((unidadExistenteEnCarrito.cantidad + unidadIncorporada ) <= 25) {
            unidadExistenteEnCarrito.cantidad += unidadIncorporada
            }else{
                unidadExistenteEnCarrito.cantidad = 25
            }
        }else{
            carrito.push(new carritoProducto(id, origen, precioKilo, unidadIncorporada));
        }
        document.getElementById (`btn_${id}_unidades`).innerHTML = 0
        localStorage.setItem("carritoToStorage", JSON.stringify(carrito))
        presentacioncarrito ()
    }
}

function presentacioncarrito() {
    let multiplicacionProductoTotal = 0
    let cantidadTotal = 0
    $(`#carrito`).empty();
    $(`#modalCarrito`).empty();
    $(`#modalFinalizar`).empty();
    $(`#carritoTitulo`).empty();
    if (carrito.length > 0 ) {
    $(`#carritoTitulo`).append(`
        <hr class="bordeLista">
        <h1 class="m-4 p-4">Productos Seleccionados</h1>
        `)
    }

    for (const productoMostrado of carrito) {
        let multiplicacionProducto = (productoMostrado.precioKilo * productoMostrado.cantidad)
        multiplicacionProductoTotal += multiplicacionProducto
        cantidadTotal += productoMostrado.cantidad
        $(`#carrito`).append(`
        <div  style="" class="selector-for-some-widget m-2 p-4 col-lg-4 col-sm-12 fila bordeTablaProductos">
            <div class="container-fluid">
                <div class="ordenCafe">
                    <div class="col text-left">
                        <div class="row text-left">
                            <h3 class=" col-lg-9">Café de ${productoMostrado.origen}</h3>
                            <img class=" col-lg-3 img-fluid rounded-circle rounded mx-auto d-block bandera" src="media/bandera_${productoMostrado.id}.png" loading="lazy" alt="${productoMostrado.origen}">
                        </div>
                        <div class="container">
                            <div class="column">
                                <div id="cuadro_${productoMostrado.id}">
                                    <p>Precio Total $ ${multiplicacionProducto}</p>
                                    <p>Precio unitario $ ${productoMostrado.precioKilo}</p>
                                    <p class="">Cantidad: ${productoMostrado.cantidad}</p>
                                </div>
                                <div class="row">
                                <button id= "borrarDeCarrito_${productoMostrado.id}" class="fila bordeTablaProductos">Eliminar</button>
                                <button id= "ocultarEnCarrito_${productoMostrado.id}" class="fila bordeTablaProductos">Ocultar</button>
                                <button id= "mostrarEnCarrito_${productoMostrado.id}" class="fila bordeTablaProductos">Mostrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)

        $(`#borrarDeCarrito_${productoMostrado.id}`).click( () => quitaProducto (productoMostrado.id));

        $(`#ocultarEnCarrito_${productoMostrado.id}`).click(() => {
            $(`#cuadro_${productoMostrado.id}`).slideUp("slow")
        });

        $(`#mostrarEnCarrito_${productoMostrado.id}`).click(() => {
            $(`#cuadro_${productoMostrado.id}`).slideDown("slow")
        });

    }

    if (carrito.length > 0 ) {
        let modalTabla = (`
        <div type="button" class="bordeModal btn-especial" data-toggle="modal" data-target="#ModalCompra">
          Resumen
        </div>
        <div class="modal fade" id="ModalCompra" tabindex="-1" aria-labelledby="ModalCompraLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="ModalCompraLabel">Resumen de compra</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mx-auto m-2 p-2 col-lg-12 col-sm-12 bordeLista">
                            <table class="table table-bordered tablaCentrado" >
                                <thead class="secciones-box">
                                    <tr>
                                        <th>Origen</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Precio total</th>
                                    </tr>
                                </thead>
                                <tbody>
        `)

        for (const productoModal of carrito) {
            let multiplicacionProducto = productoModal.precioKilo * productoModal.cantidad
            modalTabla = modalTabla +
                                    (`<tr>
                                        <td>${productoModal.origen}</td>
                                        <td>${productoModal.cantidad}</td>
                                        <td>${productoModal.precioKilo}</td>
                                        <td>${multiplicacionProducto}</td>
                                    <tr>`)
        }

        modalTabla = modalTabla +
                                (`
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p class="mx-auto">Cantidad Bolsas ${cantidadTotal}u.</p>
                        <p class="mx-auto">Total a pagar $ ${multiplicacionProductoTotal}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        `)

        let modalFinalizar = (`
        <div type="button" class="bordeModal btn-especial" data-toggle="modal" data-target="#ModalFinalizar">
          Finalizar Compra
        </div>

        <div class="modal fade" id="ModalFinalizar" tabindex="-1" aria-labelledby="ModalFinalizarLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="ModalFinalizarLabel">Detalle Compra</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id=formulario class="selector-for-some-widget">
                            <form class="rounded" method="POST" action="recibe.html">
                                <input id="nombreModal" type="text" class="form-control estiloForm" placeholder="Nombre">
                                <input id="apellidoModal" type="text" class="form-control estiloForm" placeholder="Apellido">
                                <input id="emailModal" type="text" class="form-control estiloForm" placeholder="Email">
                                <select id="entregaModal" class="form-check form-check-inline custom-select estiloForm col-4" name="retiro">
                                  <option value="entregaen" selected="" disabled="">Entrega en</option>
                                  <option value="correo">Correo</option>
                                  <option value="domicilio">Domicilio</option>
                                  <option value="local">Local</option>
                                </select>
                            </form>
                        </div>
                        <p class="mx-auto">Cantidad Bolsas ${cantidadTotal}u.</p>
                        <p class="mx-auto">Total a pagar $ ${multiplicacionProductoTotal}</p>
                    </div>
                    <div class="modal-footer">
                        <button id="enviar" type="button" class="btn btn-secondary" data-backdrop="false" data-dismiss="modal">Enviar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        `)

        $(`#modalCarrito`).append(modalTabla)
        $(`#modalFinalizar`).append(modalFinalizar)

        $(`#enviar`).click(function() {
            let controlDatos = true
            if ( $(`#nombreModal`).val() === ""){
                mensajes("Datos ingresados en nombre son incorrectos","red")
                controlDatos = false
            }
            if ( $(`#apellidoModal`).val() === ""){
                mensajes("Datos ingresados en apellido son incorrectos","red")
                controlDatos = false
            }
            if ( $(`#emailModal`).val() === ""){
                mensajes("Datos ingresados en email son incorrectos","red")
                controlDatos = false
            }else{
                if ( $(`#emailModal`).val().indexOf("@") === -1 || $(`#emailModal`).val().indexOf(".") === -1 ){
                mensajes("Faltan caracteres en el email","red")
                controlDatos = false
                }
            }
            if ( $(`#entregaModal`).val() === null){
                mensajes("Seleccione un método de entrega","red")
                controlDatos = false
            }
            if ( controlDatos === true){
                enviarDatos()
            }
        })
    }
}

function enviarDatos() {
    mensajes ("Compra realizada, nos pondremos en contacto","green")
    carrito.splice(0, carrito.length);
    localStorage.setItem("carritoToStorage", JSON.stringify(carrito))
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    presentacioncarrito ()
}

function quitaProducto(id) {
    let index = carrito.findIndex(function(buscarParaEliminar){
        return buscarParaEliminar.id === id
    });
    carrito.splice(index, 1);
    localStorage.setItem("carritoToStorage", JSON.stringify(carrito))
    presentacioncarrito ();
}

function mensajes (texto, color) {
    Toastify({
        text: texto,
        style: {
            background: color,
        },
        duration: 3000,
        offset: {
            y: 100
        },
        }).showToast();
}

$(() => console.log("Hola! ya puedes navegar en el sitio!"));
