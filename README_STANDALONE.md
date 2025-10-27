# Dashboard QA - Versión Standalone

Dashboard web interactivo para visualizar y analizar indicadores de calidad y resultados de pruebas de software. **Versión standalone que funciona sin servidor web**, simplemente abriendo el archivo HTML en tu navegador.

## Características

- **Sin instalación requerida**: Solo necesitas un navegador web moderno
- **Sin servidor web**: Abre directamente `dashboard.html` en tu navegador
- **21 KPIs** organizados en 5 secciones:
  - Casos de Prueba (6 KPIs)
  - Defectos (9 KPIs)
  - Efectividad (4 KPIs)
  - Desviaciones (2 KPIs)
  - Tendencias Mensuales
- **Filtros globales**: Año, Cartera, Proyecto, Estado
- **Visualizaciones con Chart.js**: Gráficos de línea, barras y área
- **Procesamiento de Excel**: Soporta .xlsx, .xls, .ods
- **100% Frontend**: Todo el procesamiento se hace en el navegador

## Uso Rápido

### Opción 1: Abrir directamente (Recomendado)

1. Descarga los archivos:
   - `dashboard.html`
   - `dashboard.js`

2. Haz doble clic en `dashboard.html` para abrirlo en tu navegador

3. Arrastra y suelta tu archivo Excel o haz clic para seleccionarlo

4. ¡Listo! El dashboard se generará automáticamente

### Opción 2: Usando un servidor web simple

Si tu navegador tiene restricciones con archivos locales:

```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js
npx http-server
```

Luego abre `http://localhost:8000/dashboard.html`

## Tecnologías Utilizadas

Todas las librerías se cargan desde CDN, no necesitas instalar nada:

- **Bootstrap 5.3.0** - Framework CSS
- **Font Awesome 6.4.0** - Iconos
- **SheetJS (xlsx) 0.18.5** - Procesamiento de Excel
- **Chart.js 4.4.0** - Visualizaciones
- **JavaScript Vanilla** - Sin frameworks adicionales

## Estructura del Archivo Excel

El dashboard espera un archivo Excel con 24 columnas. Ver [especificaciones completas](./specs/01_Estructura_Excel.md).

### Columnas principales:

**Identificación:**
- Cartera, Subcartera, Proyecto, Actividad, Estado, Año

**Esfuerzo:**
- Horas, Dias

**Fechas:**
- F.inicio Plan, F.inicio Real, F.Fin Plan, F.Fin Real, % Efectividad

**Casos de Prueba:**
- CP Nuevos, CP Modificados, CP reutilizados, CP Automatizados, CP Ejecutados

**Defectos:**
- Issues Bloqueantes, Issues Críticos, Issues Altos, Issues Menores
- Total de Issues no resueltos

**Métricas:**
- MTTR (Mean Time To Repair en días)

## KPIs Calculados

### 1. Casos de Prueba (6 KPIs)
- CP Diseñados (Nuevos + Modificados)
- CP Nuevos
- CP Modificados
- CP Reutilizados
- CP Automatizados
- CP Ejecutados

### 2. Defectos (9 KPIs)
- Total Issues Shift Left (Análisis + Diseño)
- Total Issues Ejecución (Ciclos QA + UAT + Prod)
- Total Issues
- Issues No Resueltos
- Escape Rate UAT (%)
- Escape Rate Productivo (%)
- MTTR Promedio (días)
- Issues por Severidad - Shift Left (gráfico)
- Issues por Severidad - Ejecución (gráfico)

### 3. Efectividad (4 KPIs)
- % Efectividad Ciclo 1
- % Efectividad Ciclos QA
- % Efectividad UAT
- % Efectividad General (Ejecución)

Con semáforos:
- 🟢 Verde: ≥ 90% (Excelente)
- 🟡 Amarillo: 70-89% (Aceptable)
- 🔴 Rojo: < 70% (Mejorar)

### 4. Desviaciones (2 KPIs)
- Horas Desviación Total
- Top 10 Proyectos con más desviaciones

### 5. Tendencias Mensuales
Evolución mensual de todos los KPIs con 3 pestañas:
- Casos de Prueba
- Defectos (con MTTR)
- Efectividad (con línea de meta al 90%)

## Filtros Disponibles

Los filtros se aplican en tiempo real sin recargar:

- **Año**: Selección única
- **Cartera**: Selección única (Banca Digital, Punto de Venta, etc.)
- **Proyecto**: Selección múltiple
- **Estado**: Checkboxes (Terminado, En curso, Por iniciar)

## Compatibilidad de Navegadores

Funciona en todos los navegadores modernos:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## Ejemplo de Datos

Consulta la carpeta `/specs` para ver:
- Estructura completa del Excel
- Definiciones de KPIs
- Fórmulas detalladas
- Catálogos de actividades

## Ventajas de la Versión Standalone

### ✅ Pros
- No requiere instalación
- No necesita servidor web
- Funciona offline una vez cargado
- Portátil (2 archivos)
- Fácil de compartir
- Sin dependencias de Node.js

### ⚠️ Limitaciones
- No guarda estado entre sesiones
- Procesa en el navegador (puede ser lento con archivos muy grandes > 10MB)
- No tiene características avanzadas como Gantt interactivo

## Archivos del Proyecto

```
dashboard.html        # Archivo principal (abre este)
dashboard.js          # Lógica del dashboard
README_STANDALONE.md  # Este archivo
specs/               # Documentación técnica
```

## Solución de Problemas

### El archivo no se carga
- Verifica que sea un archivo Excel válido (.xlsx, .xls, .ods)
- Asegúrate de que tenga las 24 columnas requeridas
- Revisa que los nombres de columnas sean exactos

### Los gráficos no se muestran
- Verifica tu conexión a internet (necesita CDN para cargar librerías)
- Revisa la consola del navegador (F12) para errores
- Asegúrate de que JavaScript esté habilitado

### Problemas con archivos locales
Algunos navegadores tienen restricciones de seguridad. Soluciones:

**Chrome:**
```bash
# Windows
chrome.exe --allow-file-access-from-files

# Mac
open -a "Google Chrome" --args --allow-file-access-from-files

# Linux
google-chrome --allow-file-access-from-files
```

**O usa un servidor local simple:**
```bash
python -m http.server 8000
```

## Seguridad y Privacidad

- ✅ Todo el procesamiento se hace en tu navegador
- ✅ No se envían datos a ningún servidor
- ✅ Tu archivo Excel nunca sale de tu computadora
- ✅ Funciona completamente offline (excepto para cargar librerías CDN la primera vez)

## Soporte

Para reportar problemas o sugerencias:
- Abre un issue en el repositorio
- Revisa la documentación técnica en `/specs`

## Licencia

MIT License - Uso libre para proyectos personales y comerciales

---

**Versión:** 2.0 Standalone
**Última actualización:** Octubre 2025

Desarrollado con HTML5, JavaScript ES6 y Chart.js
