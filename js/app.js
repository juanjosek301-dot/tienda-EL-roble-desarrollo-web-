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

let catalogo = document.getElementById("catalogo-productos")

function mostrarProductos(listaProductos) {
    catalogo.innerHTML = "";

    listaProductos.forEach(function(producto) {
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
        boton.textContent = "Agregar al carrito";
        boton.classList.add("agregar-carrito");

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


