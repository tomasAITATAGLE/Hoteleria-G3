

---

# Las Condes Hotel & Golf Club

Sitio web oficial de presentación para el hotel cinco estrellas ubicado en Ascochinga. El objetivo del proyecto es darle visibilidad a la marca, presentar sus instalaciones y optimizar el proceso de reservas.

## Contexto y Problemática

El hotel no contaba con un sitio web oficial, lo cual generaba dos inconvenientes principales:
- Falta de presencia digital para posicionar la marca a nivel nacional e internacional.
- Todas las consultas y reservas se canalizaban únicamente por WhatsApp, lo que provocaba demoras en las respuestas y pérdida de potenciales clientes.

## Solución Desarrollada

Se desea diseñar e implementar una plataforma web para resolver estos puntos:
- Mostrar el hotel, sus habitaciones, la oferta gastronómica y las instalaciones del Golf Club.
- Canalizar la información clave para que el cliente llegue con decisiones tomadas antes de contactar a recepción.
- Simplificar la captación de reservas y reduce la carga operativa en la atención manual.

## Guía de Instalación y Trabajo con Git

Al ser un sitio web estático de presentación, no requiere variables de entorno ni bases de datos.

### Prerrequisitos
- Git

### Pasos de Configuración y Desarrollo

1. **Clonar e instalar:**
   ```bash
   git clone [https://github.com/tomasAITATAGLE/Hoteleria-G3]
   cd Hoteleria-G3
   npm install
2. **Crear una rama**
   git checkout -b mi-rama
3. **correr el proyecto localmente**
   npm run dev
 Abrir http://localhost:3000
4. ## Flujo de Trabajo y Ramas (Branching Strategy)

Para mantener el código organizado y evitar conflictos entre los desarrolladores del equipo, trabajamos bajo un sistema de ramas aisladas y revisiones de código. 

### Estructura del Repositorio
El proyecto se sostiene sobre tres ramas principales:
*   **`produccion`**: Es la versión estable y definitiva. Solo contiene el código final y 100% funcional listo para la entrega.
*   **`testing`**: Entorno de pruebas. Aquí se unen los aportes de los desarrolladores para probar que todo funcione en conjunto y detectar errores antes del lanzamiento.
*   **`main`**: Es la rama base de desarrollo e integración central del equipo.

### Ramas de Desarrollador
Cada desarrollador tiene su propia rama personal de trabajo (o crea una rama específica para una nueva tarea). De esta manera, cada uno puede programar a su ritmo sin afectar el código de sus compañeros.
*   *Ejemplos:* `rama/nombre-dev`, `feature/formulario-login`, etc.

### Integración de Código (Pull Requests)
**Regla de oro:** Está prohibido hacer un push o un merge directo hacia main, testing o produccion desde la terminal local. 

Todo el código nuevo se integra exclusivamente a través de Pull Requests (PR) siguiendo estos pasos:
1. El desarrollador crea su rama local y escribe el código.
2. Sube su rama a GitHub (`git push -u origin nombre-rama`).
3. Desde la página web de GitHub, abre un Pull Request solicitando integrar su rama hacia testing o main.
4. El resto del equipo revisa los cambios propuestos en GitHub.
5. Si no hay conflictos y el código es correcto, se aprueba y se realiza el Merge haciendo clic en el botón de GitHub.
