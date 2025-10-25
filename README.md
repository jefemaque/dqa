# Dashboard de Indicadores de Fábrica de Testing

Dashboard web interactivo para visualizar y analizar indicadores de calidad y resultados de pruebas de software. Permite cargar archivos Excel con datos de testing y genera automáticamente gráficos y métricas clave.

## Características

- **Carga de archivos Excel**: Soporta formatos .xlsx, .xls y .ods
- **Visualización de métricas**: Tarjetas informativas con indicadores clave
- **Gráficos interactivos**:
  - Tendencias de pruebas en el tiempo (gráfico de líneas)
  - Distribución de resultados (gráfico de dona)
- **Tabla de datos detallada**: Vista completa de todos los registros
- **Diseño tipo AdminLTE**: Interfaz moderna y profesional
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## Tecnologías Utilizadas

- **React 18** con Vite
- **Bootstrap 5** y React-Bootstrap
- **Chart.js** para visualizaciones
- **SheetJS (xlsx)** para procesamiento de archivos Excel
- **Font Awesome** para iconos

## Instalación

### Prerrequisitos

- Node.js 16+ instalado
- npm o yarn

### Pasos de instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd TablerosQA
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

El dashboard espera un archivo Excel con la siguiente estructura de columnas:

| Fecha      | Total Pruebas | Aprobadas | Fallidas | Pendientes | Tiempo Promedio (min) |
|------------|---------------|-----------|----------|------------|-----------------------|
| 2025-01-01 | 150          | 135       | 10       | 5          | 12.5                  |
| 2025-01-02 | 180          | 165       | 12       | 3          | 11.8                  |

### Columnas

- **Fecha**: Fecha de ejecución de las pruebas (formato: YYYY-MM-DD)
- **Total Pruebas**: Número total de pruebas ejecutadas
- **Aprobadas**: Número de pruebas que pasaron exitosamente
- **Fallidas**: Número de pruebas que fallaron
- **Pendientes**: Número de pruebas pendientes de ejecución
- **Tiempo Promedio (min)**: Tiempo promedio de ejecución en minutos (opcional)

> **Nota**: El sistema también acepta nombres de columnas en inglés: Date, Passed, Failed, Pending.

## Uso

1. **Cargar datos**:
   - Haz clic en el área de carga o arrastra tu archivo Excel
   - El sistema procesará automáticamente el archivo

2. **Ver métricas**:
   - Las tarjetas superiores muestran totales acumulados
   - La tasa de éxito se calcula automáticamente

3. **Analizar gráficos**:
   - Gráfico de líneas: Muestra tendencias a lo largo del tiempo
   - Gráfico de dona: Visualiza la distribución porcentual de resultados

4. **Revisar detalles**:
   - La tabla inferior muestra todos los registros con su estado

## Indicadores del Dashboard

### Métricas Principales

- **Total de Pruebas**: Suma de todas las pruebas ejecutadas
- **Pruebas Aprobadas**: Total de pruebas exitosas
- **Pruebas Fallidas**: Total de pruebas con fallos
- **Tasa de Éxito**: Porcentaje de pruebas aprobadas

### Métricas Secundarias

- **Pruebas Pendientes**: Total de pruebas sin completar
- **Tiempo Promedio**: Tiempo promedio de ejecución por prueba
- **Días Analizados**: Cantidad de días con datos
- **Promedio Diario**: Cantidad promedio de pruebas por día

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
TablerosQA/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Componente principal
│   │   ├── ExcelUploader.jsx      # Componente de carga
│   │   ├── MetricCard.jsx         # Tarjetas de métricas
│   │   ├── TestTrendsChart.jsx    # Gráfico de tendencias
│   │   └── TestDistributionChart.jsx  # Gráfico de distribución
│   ├── utils/
│   │   └── excelProcessor.js      # Procesamiento de Excel
│   ├── styles/
│   │   └── dashboard.css          # Estilos personalizados
│   ├── data/
│   │   └── ejemplo-datos-testing.json  # Datos de ejemplo
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## Personalización

### Cambiar colores

Edita las variables CSS en `src/styles/dashboard.css`:

```css
:root {
  --primary-color: #007bff;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
}
```

### Agregar nuevos indicadores

1. Actualiza `calculateTestingMetrics()` en `src/utils/excelProcessor.js`
2. Agrega nuevas `MetricCard` en `src/components/Dashboard.jsx`

### Crear nuevos gráficos

1. Crea un nuevo componente en `src/components/`
2. Importa y usa en `Dashboard.jsx`

## Solución de Problemas

### El archivo no se carga

- Verifica que sea un archivo Excel válido (.xlsx, .xls)
- Asegúrate de que tenga al menos las columnas básicas

### Los datos no se muestran correctamente

- Revisa que los nombres de las columnas coincidan con los esperados
- Verifica que los valores numéricos no tengan formato de texto

### Error al instalar dependencias

```bash
# Limpia node_modules e instala de nuevo
rm -rf node_modules package-lock.json
npm install
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

Desarrollado con React + Vite
