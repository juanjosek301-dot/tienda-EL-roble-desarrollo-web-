let productos = [
    {
        id: 1,
        nombre: "Arroz Diana 500g",
        precio: 2500,
        categoria: "abarrotes",
        imagen: "img/arroz-diana.jpg"
    },
    {
        id: 2,
        nombre: "Arroz Roa 1kg",
        precio: 5200,
        categoria: "abarrotes",
        imagen: "img/arroz-roa.jpg"
    },
    {
        id: 3,
        nombre: "Lentejas 500g",
        precio: 4500,
        categoria: "abarrotes",
        imagen: "img/lentejas.jpg"
    },
    {
        id: 4,
        nombre: "Frijoles 500g",
        precio: 4800,
        categoria: "abarrotes",
        imagen: "img/frijoles.jpg"
    },
    {
        id: 5,
        nombre: "Aceite vegetal 1L",
        precio: 8500,
        categoria: "abarrotes",
        imagen: "img/aceite.jpg"
    },
    {
        id: 6,
        nombre: "Azucar 1kg",
        precio: 4200,
        categoria: "abarrotes",
        imagen: "img/azucar.jpg"
    },

    {
        id: 7,
        nombre: "Coca-Cola 1.5L",
        precio: 6500,
        categoria: "bebidas",
        imagen: "img/coca-cola.jpg"
    },
    {
        id: 8,
        nombre: "Postobon Manzana 1.5L",
        precio: 5500,
        categoria: "bebidas",
        imagen: "img/postobon-manzana.jpg"
    },
    {
        id: 9,
        nombre: "Agua Cristal 600ml",
        precio: 2500,
        categoria: "bebidas",
        imagen: "img/agua-cristal.jpg"
    },
    {
        id: 10,
        nombre: "Jugo Hit Mora 500ml",
        precio: 3000,
        categoria: "bebidas",
        imagen: "img/jugo-hit.jpg"
    },
    {
        id: 11,
        nombre: "Gatorade 500ml",
        precio: 4500,
        categoria: "bebidas",
        imagen: "img/gatorade.jpg"
    },
    {
        id: 12,
        nombre: "Pony Malta 330ml",
        precio: 3000,
        categoria: "bebidas",
        imagen: "img/pony-malta.jpg"
    },

    {
        id: 13,
        nombre: "Jabon de baño",
        precio: 3500,
        categoria: "aseo",
        imagen: "img/jabon-bano.jpg"
    },
    {
        id: 14,
        nombre: "Jabon liquido para manos",
        precio: 6500,
        categoria: "aseo",
        imagen: "img/jabon-liquido.jpg"
    },
    {
        id: 15,
        nombre: "Detergente 1kg",
        precio: 9000,
        categoria: "aseo",
        imagen: "img/detergente.jpg"
    },
    {
        id: 16,
        nombre: "Suavizante 1L",
        precio: 8500,
        categoria: "aseo",
        imagen: "img/suavizante.jpg"
    },
    {
        id: 17,
        nombre: "Papel higienico x4",
        precio: 7500,
        categoria: "aseo",
        imagen: "img/papel-higienico.jpg"
    },
    {
        id: 18,
        nombre: "Lavaloza 500ml",
        precio: 5500,
        categoria: "aseo",
        imagen: "img/lavaloza.jpg"
    },

    {
        id: 19,
        nombre: "Leche Colanta 1L",
        precio: 4500,
        categoria: "lacteos",
        imagen: "img/leche-colanta.jpg"
    },
    {
        id: 20,
        nombre: "Leche Alpina 1L",
        precio: 4800,
        categoria: "lacteos",
        imagen: "img/leche-alpina.jpg"
    },
    {
        id: 21,
        nombre: "Yogurt de fresa",
        precio: 4500,
        categoria: "lacteos",
        imagen: "img/yogurt-fresa.jpg"
    },
    {
        id: 22,
        nombre: "Yogurt natural",
        precio: 4200,
        categoria: "lacteos",
        imagen: "img/yogurt-natural.jpg"
    },
    {
        id: 23,
        nombre: "Quesito 250g",
        precio: 8500,
        categoria: "lacteos",
        imagen: "img/quesito.jpg"
    },
    {
        id: 24,
        nombre: "Mantequilla 250g",
        precio: 7000,
        categoria: "lacteos",
        imagen: "img/mantequilla.jpg"
    },

    {
        id: 25,
        nombre: "Galletas Festival",
        precio: 3000,
        categoria: "snacks",
        imagen: "img/galletas-festival.jpg"
    },
    {
        id: 26,
        nombre: "Papas Margarita",
        precio: 3500,
        categoria: "snacks",
        imagen: "img/papas-margarita.jpg"
    },
    {
        id: 27,
        nombre: "Chocolatina Jet",
        precio: 2500,
        categoria: "snacks",
        imagen: "img/chocolatina-jet.jpg"
    },
    {
        id: 28,
        nombre: "Chitos",
        precio: 3000,
        categoria: "snacks",
        imagen: "img/chitos.jpg"
    },
    {
        id: 29,
        nombre: "Mani salado",
        precio: 3500,
        categoria: "snacks",
        imagen: "img/mani.jpg"
    },
    {
        id: 30,
        nombre: "Chococrispis",
        precio: 4500,
        categoria: "snacks",
        imagen: "img/chococrispis.jpg"
    }
];

let catalogo = document.getElementById("catalogo-productos");
let buscador = document.getElementById("buscar-producto");

function mostrarProductos(listaProductos) {
    catalogo.innerHTML = "";
    
    listaProductos.forEach(function (producto) {
        let tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-card");

        let imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        let contenido = document.createElement("div");
        contenido.classList.add("producto-info");

        let nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        let categoria = document.createElement("p");
        categoria.textContent = producto.categoria;

        let precio = document.createElement("strong");
        precio.textContent = "$" + producto.precio.toLocaleString("es-CO");

        let boton = document.createElement("button");
        boton.textContent = "Pedir ahora";
        boton.classList.add("btn-pedir");
        boton.addEventListener("click", function() {
            window.location.href = "pedido.html";
        });

        contenido.appendChild(nombre);
        contenido.appendChild(categoria);
        contenido.appendChild(precio);
        contenido.appendChild(boton);

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(contenido);

        catalogo.appendChild(tarjeta);
    });
}

if (catalogo) {
    mostrarProductos(productos);
}

const botonesFiltro = document.querySelectorAll(".filtro-btn");

botonesFiltro.forEach(function(boton) {
    boton.addEventListener("click", function() {
        let categoria = this.getAttribute("data-categoria");

        botonesFiltro.forEach(function(b) {
            b.classList.remove("activo");
        });
        this.classList.add("activo");

        let productosFiltrados = [];

        productos.forEach(function(producto) {
            if (categoria === "todos" || producto.categoria === categoria) {
                productosFiltrados.push(producto);
            }
        });

        mostrarProductos(productosFiltrados);
    });
});


const botonesCategoria = document.querySelectorAll(".categoria-btn");

botonesCategoria.forEach(function(boton) {
    boton.addEventListener("click", function() {
        let categoria = this.getAttribute("data-categoria");
        window.location.href = "productos.html?categoria=" + categoria;
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let params = new URLSearchParams(window.location.search);
    let categoriaURL = params.get("categoria");

    if (categoriaURL) {
        let botonesFiltro = document.querySelectorAll(".filtro-btn");
        
        botonesFiltro.forEach(function(boton) {
            if (boton.getAttribute("data-categoria") === categoriaURL) {
                boton.click();
            }
        });
    }
});

//productos destacados 

function mostrarProductosDestacados() {
    const contenedorDestacados = document.getElementById("productos-destacados-container");
    
    if (!contenedorDestacados) return;

    const productosDestacados = productos.slice(0, 4);

    productosDestacados.forEach(function(producto) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-card");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.categoria}</p>
                <strong>$${producto.precio.toLocaleString("es-CO")}</strong>
            </div>
        `;
        
        contenedorDestacados.appendChild(tarjeta);
    });
}

mostrarProductosDestacados();

if (buscador) {
    buscador.addEventListener("input", function () {
        // 1. Obtener el texto y convertirlo a minúsculas
        const textoBusqueda = this.value.toLowerCase().trim();

        // 2. Filtrar el arreglo de productos
        const productosFiltrados = productos.filter(function (producto) {
            // Comprobamos si el nombre del producto incluye el texto buscado
            return producto.nombre.toLowerCase().includes(textoBusqueda);
        });

        // 3. Mostrar los resultados
        mostrarProductos(productosFiltrados);
    });
}

/* ================================================================
8. FORMULARIO CON SELECCIÓN DE PRODUCTOS Y VALIDACIÓN
----------------------------------------------------------------
Al enviar (submit):
a) Validamos cada campo con JavaScript.
b) Si todo está bien, construimos un OBJETO con los datos.
c) Lo convertimos a JSON y lo mostramos.
================================================================ */

// 8.1 Selección de elementos del DOM
const formulario = document.getElementById("formulario-pedido");
const contenedorForm = document.getElementById("contenedor-productos-form");
const totalFormulario = document.getElementById("total-formulario");
const mensajeExito = document.getElementById("mensaje-exito");

// 8.2 Generar los productos en el formulario al cargar la página
if (contenedorForm) {
    productos.forEach(function (producto) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "producto-form-card";

        tarjeta.innerHTML = `
            <label>
                <input type="checkbox" class="checkbox-producto" data-id="${producto.id}" data-precio="${producto.precio}">
                ${producto.nombre}
            </label>
            <p class="precio-producto">$${producto.precio.toLocaleString("es-CO")}</p>
            <input type="number" class="cantidad-producto" data-id="${producto.id}" min="1" value="1" disabled placeholder="Cantidad">
        `;
        contenedorForm.appendChild(tarjeta);
    });

    // 8.3 Eventos para los checkboxes y cantidades (Grupo C)
    const checkboxes = document.querySelectorAll(".checkbox-producto");
    const cantidades = document.querySelectorAll(".cantidad-producto");

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            const inputCantidad = document.querySelector(`.cantidad-producto[data-id="${this.dataset.id}"]`);
            // Habilitar o deshabilitar el input de cantidad
            inputCantidad.disabled = !this.checked;
            if (!this.checked) inputCantidad.value = 1;

            calcularTotalFormulario();
        });
    });

    cantidades.forEach(function (input) {
        input.addEventListener("input", function () {
            if (this.value < 1) this.value = 1;
            calcularTotalFormulario();
        });
    });

    // Función para calcular el total en tiempo real
    function calcularTotalFormulario() {
        let total = 0;
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                const precio = parseFloat(checkbox.dataset.precio);
                const cantidad = parseInt(document.querySelector(`.cantidad-producto[data-id="${checkbox.dataset.id}"]`).value);
                total += precio * cantidad;
            }
        });
        if (totalFormulario) {
            totalFormulario.textContent = "$" + total.toLocaleString("es-CO");
        }
    }
}

// 8.4 Validación del formulario al enviar (Grupo B)
if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        // Evita que el formulario recargue la página (comportamiento por defecto)
        evento.preventDefault();

        // Leemos los valores actuales de los campos del DOM
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        const metodoPago = document.getElementById("metodo-pago").value;
        const productosSeleccionados = document.querySelectorAll(".checkbox-producto:checked");

        // Empezamos asumiendo que todo es válido
        let esValido = true;

        // --- Validación: productos (al menos uno seleccionado) ---
        if (productosSeleccionados.length === 0) {
            mostrarError("productos", "Debes seleccionar al menos un producto.");
            esValido = false;
        } else {
            limpiarError("productos");
        }

        // --- Validación: nombre (requerido, mínimo 3 caracteres) ---
        if (nombre.length < 3) {
            mostrarError("nombre", "El nombre debe tener al menos 3 caracteres.");
            esValido = false;
        } else {
            limpiarError("nombre");
        }

        // --- Validación: email (requerido y con formato) ---
        const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!patronEmail.test(email)) {
            mostrarError("email", "Escribe un correo válido (ej: nombre@correo.com).");
            esValido = false;
        } else {
            limpiarError("email");
        }

        // --- Validación: teléfono (7 a 10 dígitos) ---
        const patronTelefono = /^[0-9]{7,10}$/;
        if (!patronTelefono.test(telefono)) {
            mostrarError("telefono", "Ingresa un teléfono válido (7 a 10 dígitos).");
            esValido = false;
        } else {
            limpiarError("telefono");
        }

        // --- Validación: dirección (mínimo 5 caracteres) ---
        if (direccion.length < 5) {
            mostrarError("direccion", "La dirección debe tener al menos 5 caracteres.");
            esValido = false;
        } else {
            limpiarError("direccion");
        }

        // --- Validación: método de pago (debe seleccionar uno) ---
        if (metodoPago === "") {
            mostrarError("metodo-pago", "Selecciona un método de pago.");
            esValido = false;
        } else {
            limpiarError("metodo-pago");
        }

        // Si algún campo falló, no seguimos
        if (!esValido) {
            if (mensajeExito) mensajeExito.classList.remove("visible");
            return;
        }

    /* ----------------------------------------------------------------
    CREACIÓN DEL JSON a partir de los datos del formulario
    ----------------------------------------------------------------
    Construimos un OBJETO de JavaScript con los valores.
    Las claves las escribimos nosotros; los valores vienen del form.
    ---------------------------------------------------------------- */
                const datosPedido = {
                        cliente: {
                                nombre: nombre,
                                email: email,
                                telefono: telefono,
                                direccion: direccion
                        },
                        productos: Array.from(productosSeleccionados).map(function (cb) {
                                return {
                                        nombre: cb.parentElement.textContent.trim(),
                                        cantidad: document.querySelector(`.cantidad-producto[data-id="${cb.dataset.id}"]`).value
                                };
                        }),
                        metodoPago: metodoPago,
                        total: totalFormulario ? totalFormulario.textContent : "$0",
                        fecha: new Date().toLocaleString("es-CO"),
        };

                console.log("Objeto de JS del pedido:", datosPedido);
                // JSON.stringify convierte el OBJETO a texto en formato JSON.
                // El segundo y tercer parámetro (null, 2) lo indentan bonito.
                const textoJSON = JSON.stringify(datosPedido, null, 2);
                console.log("JSON generado:\n", textoJSON);

    /* ----------------------------------------------------------------
    Acceso a las propiedades del objeto que acabamos de crear
       ---------------------------------------------------------------- */
    // Dot notation & template literals (la forma más común):
                if (mensajeExito) {
                        mensajeExito.textContent = `¡Gracias, ${datosPedido.cliente.nombre}! Tu pedido por ${datosPedido.total} ha sido recibido. Te contactaremos al correo ${datosPedido.cliente.email}.`;
                        mensajeExito.classList.add("visible");
                }

                formulario.reset();

                const todosCheckboxes = document.querySelectorAll(".checkbox-producto");

                todosCheckboxes.forEach(function(cb) {
                    cb.checked = false;
                    const inputCantidad = document.querySelector(`.cantidad-producto[data-id="${cb.dataset.id}"]`);
                    if (inputCantidad) {
                        inputCantidad.disabled = true;
                        inputCantidad.value = 1;
                    }
                });

                // Recalcular total
                if (totalFormulario) {
                        totalFormulario.textContent = "$0";
                }

                // Ocultar mensaje después de 5 segundos
                setTimeout(function () {
                        if (mensajeExito) mensajeExito.classList.remove("visible");
                }, 5000);
        });
}

/* ================================================================
9. FUNCIONES AUXILIARES para mostrar/limpiar errores en el DOM
----------------------------------------------------------------
Usamos el id del campo para armar el id del <span> de error.
Aquí bracket notation es cómoda para construir ids dinámicos.
================================================================ */
function mostrarError(idCampo, texto) {
        const spanError = document.getElementById("error-" + idCampo);
        const input = document.getElementById(idCampo);

        if (spanError) {
                spanError.textContent = texto;
                spanError.classList.add("visible");
        }
        if (input) {
                input.classList.add("input-error");
        }
}

function limpiarError(idCampo) {
    
        const spanError = document.getElementById("error-" + idCampo);
        const input = document.getElementById(idCampo);

        if (spanError) {
                spanError.textContent = "";
                spanError.classList.remove("visible");
        }
        if (input) {
                input.classList.remove("input-error");
        }
}

