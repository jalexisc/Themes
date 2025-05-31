# Especificación: Theme "Beta" Dashboard - Python Puro

## 1. Objetivo
Crear un theme modular para un dashboard web usando **exclusivamente Python estándar** (sin librerías de terceros).
El theme "Beta" será un generador estático que compile templates, procese CSS/JS y optimice assets usando solo la biblioteca estándar de Python.

## 2. Tecnologías permitidas
- **Python 3.8+** (solo biblioteca estándar)
- **HTML5** estático
- **CSS3** vanilla (sin preprocesadores)
- **JavaScript ES6** vanilla (sin transpiladores)
- **Plantillas**: Sistema custom con Python `string.Template` o regex

### Librerías estándar a usar:
- `http.server` - servidor de desarrollo
- `pathlib` - manejo de rutas
- `json` - configuración
- `re` - procesamiento de templates
- `shutil` - copia de archivos
- `gzip` - compresión de assets
- `base64` - encoding de imágenes inline
- `hashlib` - cache busting

## 3. Estructura de carpetas
```
beta/
├── src/
│   ├── templates/
│   │   ├── layouts/
│   │   │   └── base.html        # plantilla base
│   │   ├── partials/
│   │   │   ├── navbar.html      # componentes reutilizables
│   │   │   ├── card.html
│   │   │   └── sidebar.html
│   │   └── pages/
│   │       ├── dashboard.html   # páginas finales
│   │       └── settings.html
│   │
│   ├── assets/
│   │   ├── css/
│   │   │   ├── base.css         # reset, typography
│   │   │   ├── components.css   # botones, cards, forms
│   │   │   ├── layout.css       # grid, navbar, sidebar
│   │   │   └── theme.css        # variables CSS custom properties
│   │   ├── js/
│   │   │   ├── main.js          # funcionalidad principal
│   │   │   └── components.js    # widgets interactivos
│   │   └── images/
│   │       └── icons/           # iconos SVG
│   │
│   └── config/
│       ├── theme.json           # variables de tema
│       └── pages.json           # configuración de páginas
│
├── build/                       # generador Python
│   ├── __init__.py
│   ├── generator.py             # motor de compilación
│   ├── template_engine.py       # procesador de templates
│   ├── asset_processor.py       # minificador CSS/JS
│   └── dev_server.py           # servidor de desarrollo
│
├── dist/                        # salida compilada
│   ├── css/
│   ├── js/
│   ├── images/
│   └── *.html
│
└── build.py                     # script principal de build
```

## 4. Sistema de templates (Python puro)

### Motor de plantillas custom:
```python
# Sintaxis de variables: {{variable_name}}
# Sintaxis de inclusión: {{include:partial_name}}
# Sintaxis de bloques: {{block:content}} ... {{/block}}
# Sintaxis condicional: {{if:condition}} ... {{/if}}
# Sintaxis de loops: {{for:item in items}} ... {{/for}}
```

### Template base (base.html):
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{page_title}}</title>
    <link rel="stylesheet" href="{{css_bundle}}">
    {{block:head}}{{/block}}
</head>
<body>
    {{include:navbar}}
    <div class="container">
        {{block:content}}{{/block}}
    </div>
    {{include:footer}}
    <script src="{{js_bundle}}"></script>
    {{block:scripts}}{{/block}}
</body>
</html>
```

### Partials parametrizados:
```html
<!-- partials/card.html -->
<div class="card {{extra_classes}}">
    {{if:icon}}<i class="icon-{{icon}}"></i>{{/if}}
    <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <p class="card-text">{{body}}</p>
        {{if:actions}}
            <div class="card-footer">{{actions}}</div>
        {{/if}}
    </div>
</div>
```

## 5. Variables de tema (CSS Custom Properties)

En `assets/css/theme.css`:
```css
:root {
  --brand-primary: #0d6efd;
  --brand-secondary: #6c757d;
  --success: #198754;
  --warning: #ffc107;
  --danger: #dc3545;
  
  --font-family-base: 'Inter', -apple-system, sans-serif;
  --font-size-base: 1rem;
  --font-size-h1: 2.5rem;
  --font-size-h2: 2rem;
  
  --spacer: 1rem;
  --border-radius: 0.375rem;
  --box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
}
```

## 6. Procesamiento de assets (Python puro)

### Minificación CSS:
- Remover comentarios y espacios innecesarios
- Comprimir selectores y propiedades
- Combinar múltiples archivos CSS

### Minificación JS:
- Remover comentarios y espacios
- Comprimir nombres de variables (básico)
- Combinar archivos JavaScript

### Optimización de imágenes:
- Conversión a base64 para iconos pequeños
- Compresión básica de archivos

## 7. Configuración de tema (JSON)

`config/theme.json`:
```json
{
  "name": "Beta Dashboard",
  "version": "1.0.0",
  "colors": {
    "primary": "#0d6efd",
    "secondary": "#6c757d",
    "success": "#198754"
  },
  "fonts": {
    "base": "Inter, sans-serif",
    "sizes": {
      "small": "0.875rem",
      "base": "1rem",
      "large": "1.25rem"
    }
  },
  "components": {
    "navbar_height": "60px",
    "sidebar_width": "250px",
    "border_radius": "0.375rem"
  }
}
```

## 8. Generador Python

### Script principal (`build.py`):
```python
#!/usr/bin/env python3
import sys
from pathlib import Path
from build.generator import ThemeGenerator

def main():
    generator = ThemeGenerator()
    
    if len(sys.argv) > 1 and sys.argv[1] == 'dev':
        generator.dev_mode()
    else:
        generator.build_production()

if __name__ == '__main__':
    main()
```

### Comandos de desarrollo:
```bash
# Build de producción
python build.py

# Servidor de desarrollo con auto-reload
python build.py dev

# Limpiar dist/
python build.py clean
```

## 9. Funcionalidades del generador

### Procesamiento de templates:
- Resolución de includes y extends
- Interpolación de variables
- Renderizado de bloques condicionales
- Sistema de layouts anidados

### Asset pipeline:
- Concatenación y minificación de CSS/JS
- Cache busting con hashes
- Inline de assets críticos
- Compresión gzip opcional

### Servidor de desarrollo:
- Auto-reload en cambios de archivos
- Servir archivos estáticos
- Hot-reload de CSS (sin recargar página)

## 10. Responsividad y accesibilidad

### CSS Grid y Flexbox nativo:
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: var(--spacer);
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
```

### Accesibilidad:
- Atributos ARIA en componentes
- Contraste mínimo WCAG AA
- Navegación por teclado
- Semántica HTML5 correcta

## 11. Entregables

1. **Código fuente** completo en `beta/src/`
2. **Build compilado** en `beta/dist/` listo para producción
3. **Documentación** de componentes y configuración
4. **Demo funcional** servible con `python -m http.server`
5. **Guía de estilos** con ejemplos de cada componente

## 12. Ventajas de esta aproximación

- **Sin dependencias**: Solo Python estándar
- **Ligero**: Sin overhead de frameworks
- **Portable**: Funciona en cualquier entorno Python
- **Personalizable**: Control total sobre el proceso de build
- **Mantenible**: Código simple y directo
- **Rápido**: Compilación instantánea para proyectos pequeños-medianos