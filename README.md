# Las Condes Hotel & Golf Club

Sitio web del hotel. Se está migrando de HTML, CSS y JavaScript plano a React.

## Cómo correrlo

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`.

Para generar la versión final:

```bash
npm run build
```

## Tecnologías

- Vite
- React 18
- react-router-dom 6

## Estructura

- `src/pages/`: una página por ruta.
- `src/components/`: componentes reutilizables.
- `src/context/`: contextos de React (por ejemplo, la sesión del usuario).
- `src/data/`: datos del sitio (habitaciones, etc.).
- `src/styles.css`: estilos de todo el sitio.
- `public/images/`: fotos y logos.
- `legacy/`: el sitio anterior en HTML plano, solo para consultar mientras dura la migración.

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Portada |
| `/lobby` | Lobby |
| `/nosotros` | Sobre nosotros |
| `/reservas` | Reservas |
| `/habitacion/:id` | Detalle de una habitación |
| `/login` | Iniciar sesión |
| `/registro` | Crear cuenta |

Los usuarios y la sesión se guardan en el `localStorage` del navegador (no hay servidor ni base de datos).

Publicado en https://hoteleria-g3.vercel.app/
