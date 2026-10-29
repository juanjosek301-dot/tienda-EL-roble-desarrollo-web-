# El Roble — Frontend

Frontend del minimercado El Roble, desarrollado con Next.js App Router, TypeScript y Tailwind CSS. Permite consultar el catálogo, crear una cuenta e iniciar sesión, realizar pedidos y acceder a las vistas de pedidos y administración según el rol.

El backend se trabaja en un repositorio independiente: [el-roble-backend](https://github.com/juanjosek301-dot/el-roble-backend).

## Despliegues

- **Frontend:** pendiente de despliegue de esta versión en Vercel.
- **API:** desplegada en [Render](https://el-roble-api.onrender.com); comprobación de salud: [`/api/health`](https://el-roble-api.onrender.com/api/health).
- El [sitio anterior en Vercel](https://tienda-el-roble-desarrollo-web.vercel.app/) corresponde al prototipo original; no es el despliegue de esta aplicación Next.js.

### Preparación de Vercel

Al importar este repositorio en Vercel, configura **Root Directory** como `el-roble-frontend`; allí está la aplicación Next.js. En las variables de entorno de producción agrega `NEXT_PUBLIC_API_HOST` con el valor `https://el-roble-api.onrender.com`. Después de cambiar esta variable, crea un nuevo despliegue para que Next.js la incorpore.

## Ejecutar en local

Requisitos: Node.js 22 o superior y npm.

1. Clona este repositorio y el repositorio independiente del backend.
2. En cada repositorio, instala dependencias con `npm install`.
3. Configura las variables de entorno del backend según su `.env.example`; aplica las migraciones y ejecuta el seed.
4. En `el-roble-frontend/`, crea `.env.local`:

   ```env
   NEXT_PUBLIC_API_HOST=http://localhost:3001
   ```

5. Inicia el backend con `npm run dev` en su carpeta y el frontend con `npm run dev` dentro de `el-roble-frontend/`. Los comandos `dev` y `build` ya usan Webpack para evitar el fallo de Turbopack observado al procesar CSS en este equipo.
6. Abre [http://localhost:3000](http://localhost:3000). La API local escucha en `http://localhost:3001`.

## Cuentas de prueba

El seed del backend crea estas cuentas para el ambiente local/de entrega:

| Rol | Correo | Contraseña |
|---|---|---|
| `admin` | `admin@elroble.local` | `Admin1234!` |
| `user` | `cliente@elroble.local` | `Cliente1234!` |

Son credenciales de demostración; no deben usarse en producción.

## Decisiones técnicas

### Flujo de inicio de sesión y rutas protegidas

En `/login`, `LoginForm` envía correo y contraseña al endpoint `POST /api/auth/login`. La API valida la contraseña contra el hash almacenado y devuelve un JWT junto con los datos del usuario. `AuthProvider` conserva usuario y token en el estado de sesión y en `localStorage`; luego el formulario redirige a la ruta solicitada o al inicio. Para las solicitudes protegidas, `fetchWithAuth` agrega `Authorization: Bearer <token>`. El backend valida el JWT en cada petición protegida y comprueba el rol cuando la operación es administrativa. `AuthGuard` controla la navegación visual del frontend; la autorización real siempre la aplica la API.

### Dónde guardamos el token y qué riesgo tiene

El frontend guarda el JWT en `localStorage` para recuperar la sesión después de recargar la página. Si una vulnerabilidad XSS permite ejecutar JavaScript malicioso en el sitio, ese código podría leer el token. Para una versión de producción se debe evaluar el uso de una cookie `HttpOnly`, `Secure` y `SameSite` junto con las protecciones CSRF correspondientes.

### Respuestas `401` y `403`

- **`401 Unauthorized`:** la solicitud no incluye un token válido, o este venció. Por ejemplo, `GET /api/pedidos/mias` sin iniciar sesión responde `401`; el cliente limpia la sesión expirada y lleva al usuario al acceso.
- **`403 Forbidden`:** el usuario sí inició sesión, pero no tiene el rol requerido. Por ejemplo, una cuenta `user` que solicita `GET /api/pedidos` (listado de todos los pedidos, reservado para `admin`) recibe `403`.

### Uso de IA y correcciones

Usamos IA como apoyo para revisar la organización por funcionalidades, entender errores y preparar documentación. Contrastamos sus sugerencias con el código: corregimos documentación que todavía describía la API como inexistente y, al ejecutar la aplicación, usamos Webpack porque Turbopack fallaba al iniciar un proceso auxiliar durante el procesamiento de CSS. Las decisiones y los cambios se verificaron en los repositorios.

## Evidencia de Network

**Pendiente de agregar:** captura de DevTools → Network mostrando una solicitud protegida del frontend, su respuesta y el encabezado `Authorization: Bearer …`. Antes de agregarla, se debe ocultar el valor completo del token. La evidencia debe guardarse en este repositorio y enlazarse aquí.
