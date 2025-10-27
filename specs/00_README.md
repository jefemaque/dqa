# 📊 Dashboard QA - Documentación Técnica

**Última actualización:** 27 de octubre, 2025  
**Versión:** 2.1

---

## 📑 Índice de Documentación

### 📋 Estructura de Datos
- **[01_Estructura_Excel.md](./01_Estructura_Excel.md)**  
  Definición completa de las 24 columnas del archivo Excel, tipos de datos, valores permitidos y catálogos.

### 🧮 Campos Calculados
- **[02_Campos_Calculados.md](./02_Campos_Calculados.md)**  
  Documentación de campos que se calculan a partir de otros (Total Issues, Estado del Proyecto, agregaciones).

### 📈 Indicadores (KPIs)
- **[03_KPIs_Definiciones.md](./03_KPIs_Definiciones.md)**  
  Definiciones completas de los 21 KPIs con fórmulas paso a paso y reglas de cálculo.

### 📊 Visualización de KPIs
- **[04_KPIs_Visualizacion.md](./04_KPIs_Visualizacion.md)**  
  Especificaciones de cómo mostrar cada KPI: totalizados, mensuales, gráficas, colores, semáforos.  
  **✨ v2.1:** Meses en español (ENE, FEB, MAR...), CP sin decimales con coma, composición de desviaciones.

### 🔗 Mapeo de Campos
- **[05_Mapeo_Campos_Formulas.md](./05_Mapeo_Campos_Formulas.md)**  
  Relación entre columnas del Excel y los KPIs que las utilizan.

### 🎨 Especificaciones del Dashboard
- **[06_Especificaciones_Dashboard.md](./06_Especificaciones_Dashboard.md)**  
  Layout, filtros globales, secciones, diseño visual, Gantt y experiencia de usuario.  
  **✨ v2.1:** Gantt confirmado, composición de desviaciones.

---

## 🎯 Resumen Ejecutivo

### KPIs Totales: 21
- **Casos de Prueba:** 6 KPIs (TODOS con tendencia mensual)
- **Defectos:** 9 KPIs (incluyendo separación Shift Left vs Ejecución)
- **Efectividad:** 4 KPIs (Ciclo 1, Ciclos QA, UAT, Ejecución)
- **Desviaciones:** 2 KPIs (Total + Composición por tipo)

### Columnas Excel: 24
- 6 columnas de identificación y clasificación
- 2 columnas de esfuerzo y tiempo
- 5 columnas de fechas
- 6 columnas de casos de prueba
- 5 columnas de defectos (issues)
- 1 columna de MTTR

### Filtros Globales: 5
- Año
- Cartera
- Subcartera
- Proyecto
- Estado

### Secciones del Dashboard: 6
1. Casos de Prueba (con tendencias mensuales)
2. Defectos (con separación Shift Left/Ejecución)
3. Efectividad
4. Desviaciones (con composición por tipo)
5. Tendencias Mensuales (con meses en español)
6. **Gantt (collapsible)** - Vista general y detallada

---

## 🚀 Guía Rápida de Uso

1. **Para entender la estructura de datos:** Lee `01_Estructura_Excel.md`
2. **Para implementar cálculos:** Consulta `02_Campos_Calculados.md` y `03_KPIs_Definiciones.md`
3. **Para diseñar visualizaciones:** Revisa `04_KPIs_Visualizacion.md`
4. **Para desarrollo del dashboard:** Usa `06_Especificaciones_Dashboard.md`

---

## 📝 Reglas de Negocio Clave

### **Issues Shift Left vs Ejecución**
- **Shift Left:** Issues encontrados en "Analisis y Dimensionamiento" y "Diseño de escenarios"
- **Ejecución:** Issues encontrados en todos los ciclos QA, UAT, Preproductivas, Smoke y Estabilización

### **Estado del Proyecto (Campo Calculado)**
- **Concluido:** TODAS las actividades del proyecto tienen Estado = "Terminado"
- **En Curso:** AL MENOS UNA actividad del proyecto tiene Estado ≠ "Terminado"

### **Escape Rates**
- **Escape Rate UAT:** Numerador = Issues en UAT, Denominador = Issues en Ciclos QA solamente
- **Escape Rate Productivo:** Filtro = "Estabilización Productiva", Denominador = Total Issues en Ejecución

### **Diferencia Dias vs MTTR**
- **Columna "Dias":** Días hábiles de duración de cada actividad (NO relacionado con MTTR)
- **Columna "MTTR":** Tiempo medio de reparación de defectos, pre-calculado en días hábiles

### **Formato de Meses (v2.1)**
- **Formato:** ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC
- **Mostrar:** TODOS los 12 meses aunque no haya datos
- **Aplicación:** Todos los gráficos de tendencia mensual

### **Formato de Números CP (v2.1)**
- **Formato:** `1,250 CP` (sin decimales, coma como separador de miles)
- **Aplicación:** Los 6 KPIs de Casos de Prueba

---

## 📊 Catálogos Definidos

### **Actividades (24 opciones):**
- Analisis y Dimensionamiento
- Diseño de escenarios
- Datos, Insumos y Ambientes
- Pruebas QA Ciclo 1 a 15
- Pruebas UAT
- Pruebas Preproductivas
- Smoke Productivo
- Estabilización Productiva
- 5 tipos de Retraso

### **Estados (3 opciones):**
- Terminado
- En curso
- Por iniciar

### **Carteras:**
- Banca Digital
- Punto de Venta
- E-commerce
- COE Retail

---

## 🔄 Control de Versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 2.1 | 2025-10-27 | Meses en español (ENE, FEB, MAR...), CP sin decimales con coma, tendencias mensuales para TODOS los CP, composición de desviaciones, confirmación Gantt |
| 2.0 | 2025-10-26 | Refinamiento completo: separación Issues Shift Left/Ejecución, ajuste Escape Rates, eliminación KPIs de esfuerzo, adición sección Gantt |
| 1.0 | 2025-10-25 | Documentación inicial completa |

---

## 🎯 Próximos Pasos

1. ✅ Validar fórmulas con datos reales del Excel
2. ✅ Prototipar componentes clave (Gantt, Gauges, Donut Chart de desviaciones)
3. ✅ Implementar lógica de filtros y estado del proyecto
4. ✅ Desarrollar vista de Gantt con doble comportamiento
5. ✅ Implementar formato de meses en español
6. ✅ Generar mockups visuales del dashboard
