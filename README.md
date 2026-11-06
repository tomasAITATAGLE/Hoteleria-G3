# Las Condes Hotel & Golf Club

Sitio web del hotel "Las Condes Hotel & Golf Club" (Ascochinga, Córdoba), hecho con **React 18** y **Vite**. Es la migración del sitio original en HTML, CSS y JavaScript plano.

Publicado en https://hoteleria-g3.vercel.app/

## Tecnologías

- Vite
- React 18
- react-router-dom 6

## Cómo correrlo

Hace falta tener Node.js instalado.

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`.

Para generar la versión final (queda en `dist/`) y probarla:

```bash
npm run build
npm run preview
```

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Portada animada (pasa sola al lobby) |
| `/lobby` | Lobby con el reloj en hora de Córdoba |
| `/nosotros` | Sobre nosotros |
| `/reservas` | Selector de fechas y lista de habitaciones |
| `/habitacion/:id` | Detalle de una habitación con carrusel de fotos |
| `/login` | Iniciar sesión |
| `/registro` | Crear cuenta |

El botón "Reservar" pide iniciar sesión; después de loguearse vuelve a la página que se había pedido.

## Estructura de carpetas

```
src/
  main.jsx            punto de entrada
  App.jsx             rutas de la aplicación
  styles.css          estilos de todo el sitio
  pages/              una página por ruta
  components/         Layout, Navbar, Footer, Carrusel, TarjetaHabitacion, RutaProtegida
  context/            AuthContext (usuarios y sesión)
  data/               datos de las habitaciones y de la reserva
public/
  images/             fotos y logos
```

## Usuarios y sesión

No hay servidor ni base de datos: los usuarios, la sesión y las fechas de la reserva se guardan en el `localStorage` del navegador.

## Deploy

El sitio se publica en Vercel. El archivo `vercel.json` redirige todas las rutas a `index.html`, para que se pueda entrar directo a cualquier página (por ejemplo `/lobby`).
