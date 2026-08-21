

---

## Las condes Hotel & Golf club (pagina web) 

## Contexto y Problemática

El hotel no contaba con un sitio web oficial[cite: 1], lo cual generaba dos inconvenientes principales:
- Falta de presencia digital para posicionar la marca a nivel nacional e internacional.
- Todas las consultas y reservas se canalizaban únicamente por WhatsApp[cite: 1], lo que provocaba demoras en las respuestas y pérdida de potenciales clientes.

## Solución Desarrollada

Se diseñó e implementó una plataforma web para resolver estos puntos:
- Muestra el hotel, sus habitaciones, la oferta gastronómica y las instalaciones del Golf Club[cite: 1].
- Canaliza la información clave para que el cliente llegue con decisiones tomadas antes de contactar a recepción.
- Simplifica la captación de reservas y reduce la carga operativa en la atención manual[cite: 1].

## Guía de Instalación para Desarrollo

Pasos para clonar el repositorio y correr el proyecto localmente.

### Prerrequisitos

- Node.js (versión 18 o superior)
- Git
- Gestor de paquetes (npm, yarn o pnpm)

### Pasos de Configuración

1. Clonar el repositorio:
   git clone https://github.com/usuario/las-condes-hotel.git
   cd las-condes-hotel

2. Instalar dependencias:
   npm install

3. Configurar variables de entorno:
   Copiar el archivo `.env.example` a `.env.local` y completar las credenciales necesarias (APIs de reserva, mapas, etc.).
   cp .env.example .env.local

4. Iniciar el servidor de desarrollo:
   npm run dev

5. Abrir la aplicación en el navegador en `http://localhost:3000`.

## Guía Paso a Paso para Trabajar en el Proyecto (Para Principiantes)

Si es tu primera vez trabajando en este proyecto o colaborando con Git en equipo, sigue este flujo de trabajo para evitar conflictos de código y mantener todo ordenado.

### Paso 1: Actualizar la rama principal
Antes de empezar cualquier tarea nueva, asegúrate de tener la última versión del código que está en el repositorio.

1. Posiciónate en la rama `main` (o `master`):
   git checkout main

2. Descarga los últimos cambios del equipo:
   git pull origin main

### Paso 2: Crear tu propia rama de trabajo
Nunca trabajes ni hagas cambios directos sobre la rama `main`. Crea siempre una rama secundaria con un nombre descriptivo de lo que vas a hacer.

- Para una nueva función:
  git checkout -b feature/nombre-de-tu-tarea

- Para corregir un error:
  git checkout -b fix/nombre-del-error

*(Ejemplo: `git checkout -b feature/seccion-contacto`)*

### Paso 3: Realizar los cambios y probarlos
1. Escribe tu código o haz las modificaciones requeridas.
2. Levanta el servidor local con `npm run dev` y verifica en tu navegador que todo funcione correctamente y sin errores en la consola.

### Paso 4: Guardar tus cambios (Commits)
Una vez que probaste que todo funciona, guarda tus avances por bloques de trabajo.

1. Revisa qué archivos modificaste:
   git status

2. Agrega los archivos que quieres guardar al staging:
   git add .

3. Crea el commit con un mensaje claro que explique qué hiciste:
   git commit -m "Agrega formulario de contacto para el Golf Club"

### Paso 5: Subir tu rama al repositorio remoto
Envía tu rama local al servidor remoto en GitHub para que el resto del equipo pueda verla.

git push origin feature/nombre-de-tu-tarea

### Paso 6: Crear un Pull Request (PR)
1. Ve al repositorio en GitHub desde tu navegador.
2. Verás una notificación sugiriendo crear un **Pull Request** de la rama que acabas de subir. Haz clic en "Compare & pull request".
3. Escribe un título y una breve descripción explicativa de los cambios que realizaste.
4. Asigna a algún compañero o encargado del proyecto para que revise tu código (Reviewer).
5. Una vez aprobado y revisado, el encargado se asegurará de unir (mergear) tus cambios a la rama principal.

## Scripts Útiles

- `npm run dev`: Inicia el entorno de desarrollo.
- `npm run build`: Genera el build optimizado para producción.
- `npm run start`: Inicia el servidor en modo producción.
- `npm run lint`: Corre las validaciones de código.
