# Estructura del Proyecto - Alpha Dashboard

*Creado por José Alexis Correa Valencia - [LinkedIn](https://www.linkedin.com/in/jalexiscv/)*

Este documento detalla la estructura y organización del tema Alpha Dashboard, explicando cada archivo y su propósito.

## Visión General

El proyecto sigue una estructura organizada que separa claramente el HTML, CSS y JavaScript:

```
Themes.local/
└── Alpha/                # Tema Alpha
    ├── assets/            # Recursos estáticos
    │   └── img/           # Imágenes
    ├── css/               # Hojas de estilo
    │   └── dashboard.css  # Estilos personalizados
    ├── js/                # Scripts JavaScript
    │   └── dashboard.js   # Funcionalidad del dashboard
    ├── index.html         # Página principal
    ├── alerts.html        # Página de demostración de alertas
    ├── buttons.html       # Página de demostración de botones
    ├── cards.html         # Página de demostración de tarjetas
    ├── charts.html        # Página de demostración de gráficos
    ├── forms.html         # Página de demostración de formularios
    ├── modals.html        # Página de demostración de modales
    └── tables.html        # Página de demostración de tablas
```

## Archivos Principales

### HTML

#### `index.html`
Página principal del dashboard que incluye:
- Encabezado con logo, barra de búsqueda y menús
- Estructura de tres columnas (barras laterales y contenido principal)
- Editor SQL y área de resultados
- Tarjetas de estadísticas
- Historial de consultas

#### Páginas de Componentes
Cada una de estas páginas muestra ejemplos y variaciones de un componente específico:
- `alerts.html` - Diferentes tipos y estilos de alertas
- `buttons.html` - Variantes de botones (tamaños, colores, estados)
- `cards.html` - Diferentes tipos de tarjetas y contenedores
- `charts.html` - Ejemplos de gráficos y visualizaciones
- `forms.html` - Elementos de formulario (inputs, selects, checkboxes, etc.)
- `modals.html` - Ventanas modales y diálogos
- `tables.html` - Tablas de datos con diferentes estilos y funcionalidades

### CSS

#### `css/dashboard.css`
Archivo principal de estilos que incluye:
- Variables CSS para personalización
- Estilos generales del tema
- Layout principal (encabezado, barras laterales, contenido)
- Estilos para componentes específicos
- Utilidades y helpers
- Media queries para responsividad

### JavaScript

#### `js/dashboard.js`
Script principal que implementa toda la funcionalidad interactiva:
- Gestión de barras laterales (colapsar/expandir)
- Funcionalidad del editor SQL
- Sistema de notificaciones
- Visualización de resultados de consultas
- Historial de consultas
- Inicialización de componentes Bootstrap

## Estructura Detallada del HTML

Todas las páginas HTML comparten una estructura común:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Meta tags, título y enlaces a CSS -->
</head>
<body>
    <!-- Encabezado -->
    <div class="header d-flex">
        <!-- Contenido del encabezado -->
    </div>
    
    <!-- Contenedor principal con 3 columnas -->
    <div class="content-wrapper">
        <!-- Barra lateral izquierda -->
        <div class="left-sidebar" id="leftSidebar">
            <!-- Menú de navegación -->
        </div>
        
        <!-- Contenido central -->
        <div class="main-content" id="mainContent">
            <!-- Contenido específico de la página -->
        </div>
        
        <!-- Barra lateral derecha -->
        <div class="right-sidebar" id="rightSidebar">
            <!-- Contenido de la barra lateral derecha -->
        </div>
    </div>
    
    <!-- Scripts JS -->
</body>
</html>
```

## Estructura Detallada del CSS

El archivo `dashboard.css` está organizado en secciones lógicas:

1. **Variables y Configuración**
   ```css
   :root {
     /* Variables CSS */
   }
   ```

2. **Estilos Generales**
   ```css
   body, a, h1, h2, ... {
     /* Estilos base */
   }
   ```

3. **Layout Principal**
   ```css
   .header, .content-wrapper, .left-sidebar, ... {
     /* Estilos de estructura */
   }
   ```

4. **Componentes**
   ```css
   .card, .btn, .table, .alert, ... {
     /* Estilos de componentes */
   }
   ```

5. **Utilidades**
   ```css
   .text-primary, .bg-light, ... {
     /* Clases utilitarias */
   }
   ```

6. **Media Queries**
   ```css
   @media (max-width: 768px) {
     /* Estilos responsive */
   }
   ```

## Estructura Detallada del JavaScript

El archivo `dashboard.js` está organizado en:

1. **Inicialización y Referencias DOM**
   ```javascript
   document.addEventListener('DOMContentLoaded', function() {
       // Referencias a elementos del DOM
       const sidebarToggle = document.getElementById('sidebarToggle');
       // ...
   });
   ```

2. **Gestión de Barras Laterales**
   ```javascript
   // Toggle para la barra lateral
   sidebarToggle.addEventListener('click', function(e) {
       // Lógica para colapsar/expandir
   });
   ```

3. **Funcionalidad SQL**
   ```javascript
   // Manejar la ejecución de consultas SQL
   runQueryBtn.addEventListener('click', function() {
       // Lógica de ejecución
   });
   ```

4. **Funciones de Utilidad**
   ```javascript
   // Función para mostrar notificaciones
   function showNotification(message, type) {
       // Lógica de notificaciones
   }
   
   // Función para guardar en el historial
   function saveToHistory(query) {
       // Lógica de historial
   }
   ```

5. **Funciones para Visualización de Resultados**
   ```javascript
   // Función para mostrar resultados de SELECT
   function showSelectResults(container) {
       // Lógica para mostrar resultados
   }
   
   // Otras funciones de visualización...
   ```

## Integración de Componentes

### Barras Laterales y Navegación

La navegación principal se implementa en la barra lateral izquierda como una lista de enlaces:

```html
<ul class="sidebar-menu">
    <li>
        <a href="index.html" class="active">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
        </a>
    </li>
    <!-- Más elementos de navegación -->
</ul>
```

El estado activo se indica con la clase `.active` y cada elemento incluye un icono de Font Awesome.

### Editor SQL

El editor SQL es un elemento central que incluye:

```html
<div class="card">
    <div class="card-header">
        <!-- Barra de herramientas del editor -->
    </div>
    <div class="card-body">
        <textarea id="sqlEditor" class="form-control"></textarea>
    </div>
</div>
```

La funcionalidad del editor se implementa en JavaScript, con eventos para los botones de acción.

### Sistema de Notificaciones

Las notificaciones se generan dinámicamente con JavaScript y se insertan en un contenedor:

```html
<div class="notification-area"></div>
```

La función `showNotification()` crea y muestra las notificaciones, con auto-cierre después de un tiempo.

## Dependencias Externas

El tema utiliza estas dependencias externas:

1. **Bootstrap 5.1.3** - Framework CSS para componentes y layout
2. **Font Awesome 6.0.0** - Biblioteca de iconos
3. **Google Fonts (Nunito)** - Tipografía principal

## Consejos para Desarrollo

1. **Modificar Componentes** - Para modificar un componente, localiza su implementación en:
   - HTML: La estructura básica en las páginas de demostración
   - CSS: Los estilos en `dashboard.css`
   - JS: La funcionalidad en `dashboard.js`

2. **Añadir Nuevas Páginas** - Para crear una nueva página:
   - Copia una página existente como plantilla
   - Mantén la estructura principal (header, sidebar, content)
   - Modifica el contenido central según tus necesidades
   - Añade el enlace correspondiente en el menú de navegación

3. **Ampliar Funcionalidad JS** - Para añadir nueva funcionalidad:
   - Mantén el patrón existente de inicialización en DOMContentLoaded
   - Organiza el código en funciones claramente nombradas
   - Utiliza comentarios para documentar el propósito de cada sección

---

Esta documentación proporciona una visión completa de la estructura y organización del tema Higgs Dashboard. Para cualquier pregunta adicional, consulta las otras guías o contacta con el equipo de desarrollo.
