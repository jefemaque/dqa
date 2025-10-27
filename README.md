# Dashboard QA - Métricas de Calidad de Testing

Dashboard web interactivo para visualizar y analizar indicadores de calidad y resultados de pruebas de software. Permite cargar archivos Excel con datos de testing y genera automáticamente 21 KPIs con gráficos y métricas clave.

## Características

- **Carga de archivos Excel**: Soporta formatos .xlsx, .xls y .ods
- **21 KPIs** distribuidos en 6 secciones:
  - Casos de Prueba (6 KPIs)
  - Defectos (9 KPIs)
  - Efectividad (4 KPIs)
  - Desviaciones (2 KPIs)
  - Tendencias Mensuales
  - Diagrama de Gantt interactivo
- **Filtros globales**: Año, Cartera, Subcartera, Proyecto, Estado
- **Visualizaciones avanzadas**: Gráficos de línea, área, gauges, barras
- **Gantt con doble comportamiento**: Vista general de proyectos y vista detallada de actividades
- **Diseño responsive**: Se adapta a diferentes tamaños de pantalla

## Tecnologías Utilizadas

- **React 19** con Vite
- **Bootstrap 5** y React-Bootstrap
- **Recharts** para visualizaciones
- **SheetJS (xlsx)** para procesamiento de archivos Excel
- **date-fns** para manejo de fechas
- **Font Awesome** para iconos

## Instalación

### Prerrequisitos

- Node.js 16+ instalado
- npm o yarn

### Pasos de instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd dqa
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## Estructura del Archivo Excel

El dashboard espera un archivo Excel con las siguientes 24 columnas:

### Identificación y Clasificación
- **Cartera**: Agrupación principal (Banca Digital, Punto de Venta, E-commerce, COE Retail)
- **Subcartera**: Subagrupación opcional
- **Proyecto**: Nombre del proyecto
- **Actividad**: Tipo de actividad (ver catálogo completo en specs/01_Estructura_Excel.md)
- **Estado**: Terminado, En curso, Por iniciar
- **Año**: Año de ejecución

### Esfuerzo y Tiempo
- **Horas**: Horas invertidas
- **Dias**: Días hábiles de duración

### Fechas
- **F.inicio Plan**: Fecha de inicio planificada
- **F.inicio Real**: Fecha de inicio real
- **F.Fin Plan**: Fecha de fin planificada
- **F.Fin Real**: Fecha de fin real
- **% Efectividad**: Porcentaje de efectividad (0-100)

### Casos de Prueba
- **CP Nuevos**: Casos de prueba nuevos
- **CP Modificados**: Casos de prueba modificados
- **CP reutilizados**: Casos de prueba reutilizados
- **CP Automatizados**: Casos de prueba automatizados
- **CP Ejecutados**: Casos de prueba ejecutados

### Defectos (Issues)
- **Issues Bloqueantes**: Defectos bloqueantes
- **Issues Críticos**: Defectos críticos
- **Issues Altos**: Defectos de prioridad alta
- **Issues Menores**: Defectos menores
- **Total de Issues no resueltos**: Issues pendientes

### Métricas de Corrección
- **MTTR**: Mean Time To Repair en días hábiles

## KPIs del Dashboard

### 1. Casos de Prueba (6 KPIs)
- CP Diseñados
- CP Nuevos
- CP Modificados
- CP Reutilizados
- CP Automatizados
- CP Ejecutados

### 2. Defectos (9 KPIs)
- Total Issues Shift Left
- Total Issues Ejecución
- Total Issues
- Issues No Resueltos
- Issues por Severidad - Shift Left
- Issues por Severidad - Ejecución
- Escape Rate UAT
- Escape Rate Productivo
- MTTR Promedio

### 3. Efectividad (4 KPIs)
- % Efectividad Ciclo 1
- % Efectividad Ciclos QA
- % Efectividad UAT
- % Efectividad Ejecución

### 4. Desviaciones (2 KPIs)
- Horas Desviación Total
- Horas Desviación por Proyecto

## Uso

1. **Cargar datos**:
   - Haz clic en el área de carga o arrastra tu archivo Excel
   - El sistema procesará automáticamente el archivo

2. **Aplicar filtros**:
   - Selecciona Año, Cartera, Subcartera, Proyecto o Estado
   - Los filtros se aplican en tiempo real

3. **Ver métricas**:
   - Las tarjetas muestran los totales acumulados
   - Los gauges muestran porcentajes con semáforos
   - Los gráficos muestran tendencias mensuales

4. **Analizar tendencias**:
   - Usa las pestañas para ver evolución de Casos de Prueba, Defectos o Efectividad

5. **Visualizar cronograma**:
   - Expande la sección Gantt
   - Vista general muestra todos los proyectos
   - Haz clic en un proyecto para ver sus actividades en detalle

## Secciones del Dashboard

### SECCIÓN 1: Casos de Prueba
Grid de 6 KPIs mostrando métricas de diseño, ejecución y automatización.

### SECCIÓN 2: Defectos
- 3 KPIs principales (Shift Left, Ejecución, Total)
- 2 Gauges (Escape Rates)
- MTTR con semáforo
- Issues no resueltos
- 2 gráficos de área apilada por severidad

### SECCIÓN 3: Efectividad
4 KPIs con semáforos (🟢🟡🔴) y gráfico de tendencias con línea de meta al 90%.

### SECCIÓN 4: Desviaciones
Total de horas y gráfico de barras horizontal por proyecto (Top 10).

### SECCIÓN 5: Tendencias Mensuales
3 pestañas con gráficos de evolución mensual:
- Casos de Prueba: 6 líneas
- Defectos: Área apilada + MTTR
- Efectividad: 4 líneas + meta

### SECCIÓN 6: Gantt (Collapsible)
**Vista General** (sin proyecto seleccionado):
- Cada fila = 1 proyecto
- Fechas: MIN/MAX de todas sus actividades
- Click en proyecto → cambia a Vista Detallada

**Vista Detallada** (proyecto seleccionado):
- Cada fila = 1 actividad
- Fechas: F.inicio Real / F.Fin Real
- Muestra CP ejecutados, Issues y Horas

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Lint
npm run lint
```

## Estructura del Proyecto

```
dqa/
├── specs/                          # Especificaciones técnicas
│   ├── 00_README.md
│   ├── 01_Estructura_Excel.md
│   ├── 02_Campos_Calculados.md
│   ├── 03_KPIs_Definiciones.md
│   ├── 04_KPIs_Visualizacion.md
│   ├── 05_Mapeo_Campos_Formulas.md
│   └── 06_Especificaciones_Dashboard.md
├── src/
│   ├── components/
│   │   └── qa-dashboard/
│   │       ├── QADashboard.jsx           # Componente principal
│   │       ├── ExcelUploaderQA.jsx       # Cargador de Excel
│   │       ├── QAFilters.jsx             # Filtros globales
│   │       ├── KPICard.jsx               # Tarjeta de KPI
│   │       ├── GaugeChart.jsx            # Gráfico gauge
│   │       ├── CasosPruebaSection.jsx    # Sección 1
│   │       ├── DefectosSection.jsx       # Sección 2
│   │       ├── EfectividadSection.jsx    # Sección 3
│   │       ├── DesviacionesSection.jsx   # Sección 4
│   │       ├── TendenciasSection.jsx     # Sección 5
│   │       └── GanttSection.jsx          # Sección 6
│   ├── utils/
│   │   └── qaExcelProcessor.js           # Procesamiento y cálculo de KPIs
│   ├── styles/
│   │   ├── dashboard.css
│   │   └── qa-dashboard.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Reglas de Negocio Importantes

### Issues Shift Left vs Ejecución
- **Shift Left**: Issues encontrados en "Analisis y Dimensionamiento" y "Diseño de escenarios"
- **Ejecución**: Issues encontrados en todos los ciclos QA, UAT, Preproductivas, Smoke y Estabilización

### Estado del Proyecto
- **Concluido**: TODAS las actividades del proyecto tienen Estado = "Terminado"
- **En Curso**: AL MENOS UNA actividad del proyecto tiene Estado ≠ "Terminado"

### Escape Rates
- **Escape Rate UAT**: Numerador = Issues en UAT, Denominador = Issues en Ciclos QA solamente
- **Escape Rate Productivo**: Filtro = "Estabilización Productiva", Denominador = Total Issues en Ejecución

### Semáforos de Efectividad
- 🟢 Verde: ≥ 90%
- 🟡 Amarillo: 70% - 89%
- 🔴 Rojo: < 70%

## Documentación Técnica

Para más detalles sobre la implementación, consulta la carpeta `/specs`:

- **01_Estructura_Excel.md**: Definición de las 24 columnas
- **02_Campos_Calculados.md**: Campos derivados
- **03_KPIs_Definiciones.md**: Fórmulas detalladas de los 21 KPIs
- **04_KPIs_Visualizacion.md**: Especificaciones de visualización
- **05_Mapeo_Campos_Formulas.md**: Relación columnas → KPIs
- **06_Especificaciones_Dashboard.md**: Layout y UX completo

## Solución de Problemas

### El archivo no se carga
- Verifica que sea un archivo Excel válido (.xlsx, .xls, .ods)
- Asegúrate de que tenga las 24 columnas requeridas
- Revisa que los nombres de columnas sean exactos

### Los KPIs muestran 0
- Verifica que la columna "Actividad" tenga valores exactos del catálogo
- Revisa que las fechas estén en formato válido
- Asegúrate de que los filtros no estén excluyendo todos los datos

### Error al instalar dependencias
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---

**Última actualización:** Octubre 2025
**Versión:** 2.0
Desarrollado con React + Vite + Recharts
