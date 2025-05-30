# Guía de Instalación - Alpha Dashboard

*Creado por José Alexis Correa Valencia - [LinkedIn](https://www.linkedin.com/in/jalexiscv/)*

Esta guía detalla el proceso para instalar e implementar el tema Alpha Dashboard en tu proyecto.

## Requisitos Previos

- Servidor web o entorno de desarrollo local
- Conocimientos básicos de HTML, CSS y JavaScript
- Editor de código

## Opciones de Instalación

### Opción 1: Descarga Directa

1. Descarga los archivos del tema desde el repositorio
2. Extrae los archivos en tu directorio de proyecto
3. Asegúrate de mantener la estructura de directorios intacta

### Opción 2: Clonar Repositorio

Si utilizas Git, puedes clonar el repositorio directamente:

```bash
git clone https://github.com/alpha/theme-alpha.git
cd theme-alpha
```

## Estructura de Archivos

Después de la instalación, deberías tener la siguiente estructura:

```
proyecto/
└── Alpha/
    ├── assets/            # Recursos estáticos
    ├── css/               # Hojas de estilo
    │   └── dashboard.css  # Estilos personalizados
    ├── js/                # Scripts JavaScript
    │   └── dashboard.js   # Funcionalidad del dashboard
    ├── index.html         # Página principal
    └── ...                # Otras páginas de componentes
```

## Dependencias Externas

El tema utiliza las siguientes dependencias externas a través de CDN:

1. **Bootstrap 5.1.3**
   ```html
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
   ```

2. **Font Awesome 6.0.0**
   ```html
   <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
   ```

3. **Google Fonts (Nunito)**
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
   ```

Si prefieres no usar CDN, puedes descargar estas dependencias y alojarlas localmente.

## Verificación de la Instalación

Para verificar que la instalación fue exitosa:

1. Abre `index.html` en tu navegador
2. Comprueba que todos los estilos se cargan correctamente
3. Verifica que la funcionalidad JavaScript esté operando (barras laterales colapsables, dropdowns, etc.)
4. Asegúrate de que todos los recursos estáticos (imágenes, iconos) se visualicen correctamente

## Solución de Problemas Comunes

### Estilos no se cargan

- Verifica que las rutas a los archivos CSS sean correctas
- Comprueba la conexión a internet si utilizas CDN
- Limpia la caché del navegador

### Funcionalidad JavaScript no funciona

- Revisa la consola del navegador para errores
- Verifica que las referencias a los elementos del DOM sean correctas
- Asegúrate de que jQuery y Bootstrap JS estén cargados correctamente

### Iconos no se muestran

- Verifica que Font Awesome esté correctamente referenciado
- Comprueba que los nombres de los iconos sean correctos

## Próximos Pasos

Una vez instalado el tema, puedes proceder a:

1. [Personalizar el tema](GUIA_PERSONALIZACION.md) según tus necesidades
2. Integrar con tu backend o API para funcionalidad real
3. Añadir contenido específico de tu aplicación

---

## Autor

Este template ha sido creado por **José Alexis Correa Valencia**.

Para más información sobre el autor, visita su perfil de LinkedIn:
[https://www.linkedin.com/in/jalexiscv/](https://www.linkedin.com/in/jalexiscv/)

Si encuentras algún problema durante la instalación, por favor [reporta un issue](https://github.com/alpha/theme-alpha/issues) en el repositorio.

&copy; 2025 José Alexis Correa Valencia. Todos los derechos reservados.
