
# 🏪 El Roble — Minimercado

Este repositorio contiene el prototipo original del sitio y el frontend actual desarrollado con Next.js. En esta etapa estamos trabajando únicamente el frontend; el backend y la API todavía no forman parte del proyecto.

## Aplicación actual: frontend Next.js

La aplicación actual se encuentra en [`el-roble-frontend/`](el-roble-frontend/). Incluye las páginas de inicio, catálogo, información del minimercado, pedido, registro, inicio de sesión, mis pedidos y administración del catálogo.

Consulta la sección [Entrega actual: frontend](#entrega-actual-frontend) para ver los requisitos, la configuración, cómo ejecutar la aplicación y qué funciones dependen de una API.

> El catálogo, el registro, el inicio de sesión, los pedidos y la administración requieren una API para trabajar con datos reales. El repositorio todavía no incluye backend ni credenciales de prueba.

## Entrega actual: frontend

### Despliegues

- **Frontend Next.js:** pendiente de publicar. El enlace de Vercel que aparece en la documentación del prototipo original corresponde al sitio anterior, no confirma un despliegue de esta aplicación Next.js.
- **Backend/API:** pendiente de implementar y desplegar; no existe un enlace todavía.
- **Prototipo original:** [sitio anterior en Vercel](https://tienda-el-roble-desarrollo-web.vercel.app/).

### Ejecutar en local

Requisitos: Node.js compatible con la versión de Next.js del proyecto y npm.

```bash
cd el-roble-frontend
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Para revisar el código con ESLint o generar la compilación de producción:

```bash
npm run lint
npm run build
```

### Variables de entorno

El frontend usa `NEXT_PUBLIC_API_HOST` como URL base de la API. Si no se define, el código utiliza `http://localhost:3001`. Para configurarla en local, crea `el-roble-frontend/.env.local`:

```env
NEXT_PUBLIC_API_HOST=http://localhost:3001
```

Como el backend aún no existe en este proyecto, esa dirección no ofrece actualmente un servicio. Las páginas se pueden abrir, pero las operaciones con datos reales no se pueden completar.

### Flujo de inicio de sesión y rutas protegidas

1. En `/login`, el usuario escribe su correo y contraseña. `LoginForm` envía los datos al servicio de autenticación.
2. `authService` prepara un `POST` a `/api/auth/login`, usando la URL configurada en `NEXT_PUBLIC_API_HOST`.
3. Cuando la API responde correctamente, el frontend espera recibir un token y los datos del usuario. `AuthProvider` los guarda en el estado de sesión y en el almacenamiento local del navegador.
4. `LoginForm` redirige a la ruta solicitada en el parámetro `next` o al inicio.
5. `AuthGuard` comprueba en el frontend si existe un usuario y, para `/admin`, si su rol es `admin`. Si no hay sesión, redirige a `/login`; si el rol no corresponde, redirige a `/mis-pedidos`.
6. En las solicitudes a rutas protegidas de la API, `fetchWithAuth` adjunta `Authorization: Bearer <token>`. Si recibe `401`, limpia la sesión y envía al usuario al inicio de sesión.

**Estado actual:** este flujo está preparado en el frontend, pero no se puede completar de extremo a extremo hasta que exista la API. `AuthGuard` es una protección visual del lado del cliente; el backend deberá validar el token y los permisos en cada endpoint protegido.

### Almacenamiento del token y riesgo

El token se guarda actualmente en `localStorage` junto con los datos del usuario. Esto permite recuperarlo al recargar la página, pero cualquier JavaScript que llegue a ejecutarse con una vulnerabilidad XSS podría leerlo. Para producción se debe valorar una cookie `HttpOnly`, `Secure` y `SameSite`, junto con las medidas de protección CSRF correspondientes.

### Respuestas `401` y `403`

- **`401 Unauthorized`:** falta autenticación o el token es inválido o venció. En el frontend, por ejemplo, una petición protegida a la API de pedidos que responde `401` provoca que `fetchWithAuth` borre la sesión y redirija a `/login`. El servicio de login también interpreta `401` como credenciales incorrectas. No hay API conectada ahora, así que estos casos todavía no se han verificado contra un servidor real.
- **`403 Forbidden`:** el usuario sí está autenticado, pero no tiene permiso para la acción. El ejemplo esperado es un usuario con rol `user` que intenta crear o eliminar un producto en un endpoint de administración. El frontend redirige a usuarios no administradores desde `/admin`, pero la API deberá responder `403` y hacer su propia comprobación cuando se implemente.

En el estado actual, el tratamiento explícito de `403` en respuestas de la API está pendiente; no debe confundirse la redirección del `AuthGuard` con una respuesta `403` del servidor.

### Credenciales de prueba

**Pendientes:** no existe todavía el backend ni un `seed` que cree usuarios de entrega. No hay credenciales admin/user verificadas para publicar. Cuando estén disponibles, completar esta tabla con cuentas exclusivas del ambiente de entrega; nunca incluir credenciales personales o de producción.

| Rol | Correo | Contraseña | Estado |
|---|---|---|---|
| `admin` | Pendiente del seed | Pendiente del seed | No disponible |
| `user` | Pendiente del seed | Pendiente del seed | No disponible |

### Evidencia de Network

**Pendiente de la API:** aún no se puede aportar una captura que muestre una petición protegida exitosa con el header `Authorization`. Cuando haya backend, se agregará aquí una captura de DevTools → Network que muestre método, endpoint, estado y header (con el token oculto). No publicar tokens activos en el README.

### Decisiones técnicas y uso de IA

Organizamos el frontend por funcionalidades (`auth`, `productos` y `pedidos`) para mantener juntas las páginas, sus tipos, reglas, hooks y servicios relacionados. Las rutas de `app/` se mantienen como entradas pequeñas que muestran los componentes de cada página. Centralizamos las solicitudes HTTP para adjuntar el token y tratar la expiración de sesión en un solo lugar.

Usamos Flexbox para alinear elementos de navegación y controles en una dirección, y Grid para distribuir categorías y tarjetas de productos en columnas adaptables. Las validaciones del pedido y del registro dan respuesta inmediata en la interfaz, pero no sustituyen las validaciones del servidor.

Usamos un asistente de IA para revisar la estructura, analizar errores y proponer documentación y ajustes. Contrastamos las propuestas con el repositorio y corregimos las que daban por existente un backend o mantenían estilos oscuros que no correspondían al diseño esperado. Esta explicación describe el trabajo de esta etapa; antes de entregar, el equipo debe revisarla y personalizarla con sus propias palabras.

## Prototipo original

La documentación y capturas siguientes corresponden al sitio original hecho con HTML, CSS y JavaScript. Se conservan como referencia del diseño inicial; no describen necesariamente el estado visual actual de la aplicación Next.js.

## Descripción del prototipo

El roble es una página web para un minimercado ubicado en Medellín que vende productos de la canasta familiar. El sitio permite a los clientes ver el catálogo de productos organizados por categorías (abarrotes, bebidas, aseo, lácteos y snacks), buscar productos específicos por nombre, y realizar pedidos directamente desde la página.

El proyecto resuelve el problema de tener que ir físicamente al mercado para conocer los productos y precios disponibles. Con esta página, cualquier cliente puede revisar el catálogo desde su celular o computador, filtrar por la categoría que necesita, y hacer su pedido sin salir de casa.

##  Link al sitio en Vercel

https://tienda-el-roble-desarrollo-web.vercel.app/

##  Capturas del sitio

### Vista en escritorio

1.Inicio de la pagina (Escritorio)

En esta página se presenta el mercado y se muestran algunas de sus
categorías y productos destacados.

<img width="936" height="446" alt="image" src="https://github.com/user-attachments/assets/fb3fdda1-487c-4eda-b604-13d9fdfcebf4" />

<img width="1873" height="567" alt="image" src="https://github.com/user-attachments/assets/3588c695-d873-49e6-823f-0e0da32ea6b2" />

<img width="938" height="431" alt="image" src="https://github.com/user-attachments/assets/b743aee7-580d-4682-b31a-a2d0ebc951a8" />

<img width="952" height="442" alt="image" src="https://github.com/user-attachments/assets/283ffbc3-628f-4983-8e5b-3d680cd77007" />

2. Catálogo de productos (Escritorio)
En esta sección se pueden consultar los productos del mercado y
organizarlos por diferentes categorías.

<img width="937" height="438" alt="image" src="https://github.com/user-attachments/assets/12e9a04e-248e-450b-8b2d-49dd03b2f2c0" />

<img width="583" height="434" alt="image" src="https://github.com/user-attachments/assets/2d59182f-62b9-437b-9126-be7d86dee578" />

<img width="938" height="262" alt="image" src="https://github.com/user-attachments/assets/b9382d76-3db2-41bb-9d8f-771c94c9aeb9" />

3. Sobre nosotros
Esta página contiene información sobre Mercado La Esquina, los
productos que ofrece y el objetivo del negocio.

<img width="289" height="454" alt="image" src="https://github.com/user-attachments/assets/914e6e3e-1481-4720-a0f8-4de8613cccdb" />

4. Realizar pedido (Escritorio)

Aquí se encuentra el formulario que permite al cliente ingresar
sus datos y la información relacionada con el pedido.


<img width="566" height="433" alt="image" src="https://github.com/user-attachments/assets/6bb7e821-b7a8-41d1-94de-36f9dcd2bfc5" />

<img width="1153" height="747" alt="image" src="https://github.com/user-attachments/assets/59a320f4-0ee4-4610-a7fa-74977cba5dfd" />

<img width="222" height="360" alt="image" src="https://github.com/user-attachments/assets/a4bc4e6e-ec6a-403d-b168-25450c3a5d56" />

4. Vista móvil

1. Menú de navegación apilado
-Muestra el logo y los enlaces en columna
-Incluye el botón de modo oscuro 🌙

<img width="155" height="248" alt="image" src="https://github.com/user-attachments/assets/5e0658e6-421a-46ec-a267-7ef0d49e2467" />


2. Inicio
-El título principal y botón "Ver catálogo"
-texto bien ajustado 

<img width="162" height="353" alt="image" src="https://github.com/user-attachments/assets/2da23755-7eed-41a6-94fc-67191d4213d7" />

3. Categorías en móvil
-Los botones de categorías apilados o en 2 columnas
-Muestra que son fáciles de tocar con el dedo

<img width="162" height="353" alt="image" src="https://github.com/user-attachments/assets/e6d978ce-ee57-4192-a43f-9d26163224b2" />

4. Tarjetas de productos y catalogo 
-Productos en 1 columna
-Botón "Pedir ahora" visible y accesible

<img width="162" height="354" alt="image" src="https://github.com/user-attachments/assets/a854e115-aa49-465b-853a-25655e8042ef" />

5. catalogo y filtros
-Productos en 1 columna
-botones accesibles

<img width="164" height="356" alt="image" src="https://github.com/user-attachments/assets/3eac8bef-3c88-4804-b913-e3e5e5c37dc4" />

<img width="158" height="358" alt="image" src="https://github.com/user-attachments/assets/24655b43-1f12-457c-9b44-b447bc5fc7a4" />

<img width="158" height="359" alt="image" src="https://github.com/user-attachments/assets/99473dc3-30cc-49cb-8d55-8e518e3a0c4a" />

6.Sobre nosotros 

<img width="164" height="353" alt="image" src="https://github.com/user-attachments/assets/a91dea37-9c43-4aef-a466-7ed554d284cb" />

<img width="161" height="358" alt="image" src="https://github.com/user-attachments/assets/ef89f896-c0c2-4656-962a-d01f63c8fa17" />


7. Formulario de pedido
-Campos de texto en ancho completo
-Checkboxes de productos en 1 columna
-campos alineados de formulario de cliente 

<img width="158" height="356" alt="image" src="https://github.com/user-attachments/assets/a4af2fcd-5d32-4b1b-8c66-8b728696bcfe" />

<img width="164" height="365" alt="image" src="https://github.com/user-attachments/assets/07ae210e-9723-433d-a4a8-a93473a482a9" />

<img width="162" height="359" alt="image" src="https://github.com/user-attachments/assets/34567e1b-f86f-4885-b7c9-0b39990a3bbe" />

Decisiones técnicas 

1.¿Dónde usaste Flexbox y dónde Grid, y por qué en cada caso?

Para el diseño de "El roble", se uso Flexbox cuando necesitaba alinear elementos en una sola dirección, y CSS Grid cuando necesitaba organizar elementos en una cuadrícula de filas y columnas.

Uso de Flexbox:
se utilizo en la barra de navegación (.nav), luego se se aplico display: flex con justify-content: space-between para separar el logo de las izquierda y los enlaces a la derecha manteniéndolos centrados
verticalmente 

tambien fue esencial para las tarjetas de producto (.producto-info) Al poner flex-direction: column y usar margin-top: auto en el botón de "Pedir ahora" (.btn-pedir)
se pudo que el botón siempre quedara pegado al fondo de la tarjeta sin importar si el nombre ocupara mas líneas 

Por ultimo se uso Flexbox en el contenedor de los filtros (.filtros-container) con flex-wrap: wrap. Esto permitió que los botones de categorías quedaran centrados y pasaran a la siguiente fila automáticamente si la pantalla era muy pequeña, mejorando la experiencia en móviles.

Uso de CSS Grid:

utilice Grid para las estructuras que requerían un diseño de cuadrícula más estricto, como el catálogo de productos (.grid-productos) y los botones de categorías en el inicio (.categorias-grid).

El motivo principal fue la facilidad para hacer el diseño responsive. En escritorio usé grid-template-columns: repeat(4, 1fr) para el catálogo, y solo tuve que cambiar ese valor a repeat(2, 1fr) en tablet y a 1fr en móvil dentro de los @media queries. Grid se encarga de calcular el ancho de las columnas automáticamente, lo que permite mantener todas las tarjetas del mismo tamaño sin que yo tuviera que calcular porcentajes o márgenes complicados.

¿Qué hace tu JavaScript, explicado sin copiar el código? ¿Cómo funciona tu validación?

1. Generación dinámica del contenido:
En lugar de escribir las 30 tarjetas de productos a mano en el HTML, se creo un arreglo de objetos en JavaScript con toda la información (id, nombre, precio, categoría e imagen). Una función recorre este arreglo y crea los elementos del DOM (la tarjeta, la imagen, el título, el precio y el botón) uno por uno, insertándolos en la página. Esto permite que el código sea mucho más limpio y fácil de mantener si en el futuro se quiere agregar más productos. También tengo una función separada que toma solo los primeros 4 productos para mostrarlos como "destacados" en la página de inicio.

2. Filtros y buscador en tiempo real:

Cuando el usuario presiona en un botón de categoría (como "Bebidas"), JavaScript filtra el arreglo original para quedarse solo con los productos de esa categoría y vuelve a dibujar la cuadrícula. El buscador funciona parecido: toma cada tecla que el usuario escribe (evento input), convierte el texto a minúsculas y filtra los productos que su nombre incluya esas letras, mostrando los resultados de inmediato sin recargar la página.

3. Cálculo del total en el formulario:
La página de pedidos, JavaScript genera dinámicamente un checkbox y un campo de cantidad por cada producto. toma los cambios en los checkboxes: si el usuario marca un producto, habilita su campo de cantidad; si lo desmarca, lo deshabilita y reinicia el valor. Cada vez que esto ocurre o se cambia una cantidad, una función recalcula la suma total del pedido en tiempo real y actualiza el texto en la pantalla.

4. Validación del formulario y generación del pedido:
Esta es la parte más detallada. Cuando el usuario hace clic en "Confirmar pedido", intercepta el envío para que la página no se recargue. Luego, reviso cada campo con reglas específicas:

Productos: Debe haber al menos uno seleccionado.

-Nombre y Dirección: Deben tener una longitud mínima (3 y 5 caracteres, respectivamente).
-Teléfono: Uso una expresión regular para asegurar que solo contenga entre 7 y 10 dígitos numéricos.
-Email: Otra expresión regular verifica que tenga el formato básico de un correo (texto, arroba, texto, punto, texto).
-Método de pago: Debe ser diferente al valor por defecto.

Si algún campo falla, no uso ventanas emergentes porque interrumpen la experiencia. En en este caso, mi código busca el campo específico, le agrega una clase de CSS que lo pone rojo y hace aparecer un mensaje de error descriptivo justo debajo de él.

Si todos los campos son válidos, construyo un objeto de JavaScript con los datos del cliente, la lista de productos seleccionados con sus cantidades, el total y la fecha. Luego, convierto ese objeto a formato JSON usando JSON.stringify y lo muestro en la consola del navegador. Finalmente, muestro un mensaje de éxito verde en la pantalla, limpio el formulario y reinicio los checkboxes para que el usuario pueda hacer otro pedido si lo desea.

5. Modo oscuro:
Se implemento un botón que alterna una clase en el body de la página. Para que la experiencia sea consistente, guardo la preferencia del usuario en el localStorage del navegador. Así, si el usuario elige el modo oscuro y recarga la página o navega a otra sección, el sitio recuerda su elección y se muestra en oscuro automáticamente.

Si usaste IA, ¿para qué la usaste y qué cambiaste tú del resultado?

Sí usé IA, pero como apoyo, no para que me hiciera el trabajo. La consulté cuando no entendía bien algo, como cómo hacer que el botón de "Pedir ahora" se quedara abajo en la tarjeta o cómo guardar la preferencia del modo oscuro para que no se perdiera al recargar. También me ayudó a detectar errores en mi CSS, como cuando tenía estilos duplicados que no dejaban que los cambios se vieran.
Pero nunca copié el código tal cual. Por ejemplo, la IA me sugirió usar botones naranjas para que resaltaran más, y yo lo probé, pero al final lo quité porque no combinaba con el azul de mi página. Los márgenes, las sombras y los colores los fui ajustando yo hasta que se viera bien. El arreglo de los 30 productos lo escribí yo con los datos reales.
la IA me sirvió para entender cosas que me costaban, pero las decisiones del diseño y el código final las tomé yo.


¿Qué fue lo más difícil y cómo lo resolviste?
Lo que más me costó trabajo fue alinear los botones de "Pedir ahora" en las tarjetas de productos. Al principio quedaban descuadrados porque algunos nombres de productos ocupaban dos líneas y otros solo una, lo que movía todo el diseño hacia arriba o hacia abajo. También tuve un lío con el CSS porque tenía reglas duplicadas en el archivo y los estilos nuevos no se aplicaban.

Lo solucione aprendiendo a usar la herramienta de inspección del navegador (F12). Ahí pude ver exactamente qué estilos estaban chocando entre sí y cuáles ignoraba el navegador. Después de borrar el código CSS que sobraba, usé Flexbox en las tarjetas y le puse margin-top: auto al botón. Con eso logré que el botón siempre se quedara pegado al fondo, sin importar qué tan largo fuera el nombre del producto.


Estructura del proyecto
Mercado La Esquina/
│
├── img/
│   └── Imágenes de los productos
│
├── js/
│   └── app.js
│
├── style/
│   └── styles.css
│
├── index.html
├── productos.html
├── pedido.html
├── sobre-nosotros.html
├── README.md
└── .gitignore
