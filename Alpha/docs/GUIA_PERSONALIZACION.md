# Guía de Personalización - Alpha Dashboard

*Creado por José Alexis Correa Valencia - [LinkedIn](https://www.linkedin.com/in/jalexiscv/)*

Esta guía te ayudará a personalizar el tema Alpha Dashboard para adaptarlo a tus necesidades específicas.

## Variables CSS

El tema utiliza variables CSS (Custom Properties) para facilitar la personalización. Puedes encontrar estas variables al inicio del archivo `css/dashboard.css`:

```css
:root {
  --primary-color: #4267B2;    /* Azul principal */
  --secondary-color: #606770;  /* Gris secundario */
  --success-color: #42b72a;    /* Verde */
  --info-color: #4267B2;       /* Azul para información */
  --warning-color: #f5b83d;    /* Amarillo */
  --danger-color: #fa383e;     /* Rojo */
  --light-color: #f0f2f5;      /* Gris claro para fondos */
  --dark-color: #1c1e21;       /* Color oscuro para textos */
  --sidebar-width: 280px;      /* Ancho de barras laterales */
  --header-height: 60px;       /* Altura del encabezado */
  --body-bg: #f0f2f5;          /* Fondo general */
  --card-bg: #fff;             /* Fondo de tarjetas */
  --card-border: #dddfe2;      /* Borde de tarjetas */
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Sombra estándar */
}
```

Para cambiar los colores o dimensiones del tema, simplemente modifica estas variables.

## Personalización de Colores

### Cambiar Esquema de Colores

Para cambiar el esquema de colores principal, modifica estas variables:

```css
:root {
  --primary-color: #3F51B5;    /* Nuevo color principal (Indigo) */
  --secondary-color: #757575;  /* Nuevo color secundario */
  --success-color: #4CAF50;    /* Nuevo color de éxito */
  --danger-color: #F44336;     /* Nuevo color de peligro/error */
  /* ... otras variables ... */
}
```

### Temas Predefinidos

Aquí hay algunos ejemplos de temas que puedes usar:

#### Tema Oscuro
```css
:root {
  --primary-color: #BB86FC;     /* Púrpura claro */
  --secondary-color: #03DAC6;   /* Verde azulado */
  --success-color: #3DDC84;     /* Verde Android */
  --info-color: #BB86FC;        /* Púrpura claro */
  --warning-color: #FFDE03;     /* Amarillo brillante */
  --danger-color: #CF6679;      /* Rojo claro */
  --light-color: #2D2D2D;       /* Gris oscuro */
  --dark-color: #E1E1E1;        /* Gris muy claro */
  --body-bg: #121212;           /* Fondo casi negro */
  --card-bg: #1E1E1E;           /* Gris muy oscuro */
  --card-border: #333333;       /* Borde gris oscuro */
}
```

#### Tema Corporativo
```css
:root {
  --primary-color: #1565C0;     /* Azul corporativo */
  --secondary-color: #546E7A;   /* Gris azulado */
  --success-color: #2E7D32;     /* Verde oscuro */
  --info-color: #0288D1;        /* Azul claro */
  --warning-color: #F9A825;     /* Ámbar */
  --danger-color: #C62828;      /* Rojo oscuro */
  --light-color: #ECEFF1;       /* Gris muy claro */
  --dark-color: #263238;        /* Gris muy oscuro */
  --body-bg: #F5F5F5;           /* Gris claro */
  --card-bg: #FFFFFF;           /* Blanco */
  --card-border: #CFD8DC;       /* Gris muy claro */
}
```

## Personalización de Layout

### Cambiar Dimensiones

Para modificar las dimensiones del layout:

```css
:root {
  --sidebar-width: 250px;       /* Reduce el ancho de la barra lateral */
  --header-height: 50px;        /* Reduce la altura del encabezado */
  /* ... otras variables ... */
}
```

### Personalizar Fuentes

Si deseas cambiar la fuente principal, puedes:

1. Actualizar la importación de Google Fonts en el `<head>` del HTML:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
   ```

2. Modificar la propiedad font-family en el CSS:
   ```css
   body {
     font-family: 'Roboto', sans-serif;
     /* otras propiedades... */
   }
   ```

## Personalización de Componentes

### Cards y Contenedores

Para modificar el estilo de las tarjetas:

```css
.card {
  border-radius: 12px;               /* Bordes más redondeados */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra más pronunciada */
  border: none;                       /* Sin bordes */
}
```

### Botones

Para personalizar los botones:

```css
.btn {
  border-radius: 50px;                /* Botones totalmente redondeados */
  padding: 8px 16px;                  /* Padding personalizado */
  text-transform: uppercase;          /* Texto en mayúsculas */
  font-weight: 500;                   /* Peso de fuente medio */
  letter-spacing: 0.5px;              /* Espaciado entre letras */
}
```

### Menús y Navegación

Para cambiar el estilo de los menús:

```css
.sidebar-menu a {
  padding: 15px 20px;                 /* Más padding */
  margin-bottom: 5px;                 /* Espacio entre elementos */
  border-radius: 5px;                 /* Bordes redondeados */
  transition: all 0.3s ease;          /* Transición más suave */
}

.sidebar-menu a:hover {
  background-color: rgba(var(--primary-color-rgb), 0.1); /* Fondo semitransparente */
  transform: translateX(5px);         /* Efecto de desplazamiento */
}
```

## Modificación de JavaScript

### Personalizar Notificaciones

Para modificar el comportamiento de las notificaciones, edita la función `showNotification` en `js/dashboard.js`:

```javascript
function showNotification(message, type, duration = 5000) {
  // ... código existente ...
  
  // Cambiar duración:
  setTimeout(function() {
    notification.classList.remove('show');
    setTimeout(function() {
      notification.remove();
    }, 150);
  }, duration); // Duración personalizable
}
```

### Personalizar Historial de Consultas

Para cambiar el número máximo de consultas en el historial:

```javascript
function saveToHistory(query) {
  // ... código existente ...
  
  // Cambiar límite (de 10 a 15):
  if (historyList.children.length > 15) {
    historyList.removeChild(historyList.lastChild);
  }
}
```

## Creación de Nuevos Componentes

Para añadir nuevos componentes, puedes seguir estos pasos:

## Autor

Este template ha sido creado por **José Alexis Correa Valencia**.

Para más información sobre el autor, visita su perfil de LinkedIn:
[https://www.linkedin.com/in/jalexiscv/](https://www.linkedin.com/in/jalexiscv/)

&copy; 2025 José Alexis Correa Valencia. Todos los derechos reservados.

1. Crear el HTML para el componente
2. Añadir los estilos CSS en `dashboard.css`
3. Implementar la funcionalidad JavaScript si es necesaria

### Ejemplo: Añadir Nuevo Tipo de Tarjeta

```html
<!-- HTML -->
<div class="card custom-card">
  <div class="card-header">
    <h6 class="mb-0">Mi Nuevo Componente</h6>
  </div>
  <div class="card-body">
    <!-- Contenido -->
  </div>
  <div class="card-footer">
    <!-- Footer -->
  </div>
</div>
```

```css
/* CSS en dashboard.css */
.custom-card {
  border-left: 4px solid var(--primary-color);
  background-color: rgba(var(--primary-color-rgb), 0.05);
}

.custom-card .card-header {
  background-color: transparent;
  border-bottom: 1px dashed var(--card-border);
}
```

## Recomendaciones Finales

1. **Mantén la consistencia**: Asegúrate de que tus cambios sean consistentes en toda la interfaz
2. **Prueba en diferentes dispositivos**: Verifica que tus personalizaciones funcionen bien en móviles, tablets y escritorio
3. **Mantén copias de seguridad**: Antes de hacer cambios importantes, haz una copia de los archivos originales
4. **Utiliza las herramientas de desarrollo**: Los navegadores modernos incluyen herramientas para probar cambios CSS en tiempo real

---

Si necesitas ayuda adicional con la personalización, consulta la [documentación completa](ESTRUCTURA.md) para entender mejor cómo están organizados los componentes.
