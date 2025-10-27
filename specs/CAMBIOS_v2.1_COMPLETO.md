# CAMBIOS VERSIÓN 2.1 - Dashboard QA

**Fecha:** 27 de octubre, 2025

---

## 🎯 RESUMEN DE CAMBIOS

Esta versión 2.1 incluye los siguientes cambios en la documentación:

### 1. ✅ FORMATO DE MESES EN ESPAÑOL
**Archivo afectado:** `04_KPIs_Visualizacion.md`

**Cambio:**
- **Antes:** "Ene 2025", "Feb 2025", etc.
- **Ahora:** "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"

**Especificaciones:**
- Formato: MAYÚSCULAS
- Idioma: Español
- Longitud: 3 letras
- Mostrar: TODOS los 12 meses del año aunque no haya datos
- Si no hay datos: Mostrar valor en 0 o punto vacío

**Aplicación:**
- TODOS los gráficos de tendencia mensual
- Eje X de todos los gráficos de línea
- Eje X de todos los gráficos de área
- Eje X de todos los gráficos de barras con tendencia

**Implementación JavaScript:**
```javascript
const mesesAbreviados = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
                         'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

// Generar datos para todos los meses
const dataMensual = mesesAbreviados.map((mes, index) => ({
  mes: mes,
  valor: datosPorMes[index + 1] || 0 // Si no hay datos, poner 0
}));
```

---

### 2. ✅ FORMATO NÚMEROS CP SIN DECIMALES CON COMA
**Archivo afectado:** `04_KPIs_Visualizacion.md`

**Cambio:**
- **Antes:** `1250 CP` o `1250.0 CP`
- **Ahora:** `1,250 CP` (sin decimales, coma como separador de miles)

**Aplicación:**
- KPI 1: CP Diseñados
- KPI 2: CP Nuevos
- KPI 3: CP Modificados
- KPI 4: CP Reutilizados
- KPI 5: CP Automatizados
- KPI 6: CP Ejecutados

**Implementación JavaScript:**
```javascript
// Para valores totalizados
const valorFormateado = valor.toLocaleString('es-ES'); // "1,250"

// Para tooltips y gráficos
formatter={(value) => value.toLocaleString('es-ES')}
```

**Ejemplos:**
- `350 CP` → `350 CP` (sin coma si es menor a 1000)
- `1250 CP` → `1,250 CP`
- `15000 CP` → `15,000 CP`

---

### 3. ✅ TENDENCIAS MENSUALES PARA TODOS LOS CP
**Archivo afectado:** `04_KPIs_Visualizacion.md`

**Cambio:**
- **Antes:** Solo valor totalizado en los 6 KPIs de CP
- **Ahora:** Valor totalizado + Gráfico de línea con tendencia mensual

**Aplicación:**
Cada uno de los 6 KPIs de Casos de Prueba ahora incluye:

1. **Visualización Principal:** KPI Card con valor totalizado
2. **Visualización Secundaria:** Gráfico de línea con:
   - Eje X: Meses en español (ENE, FEB, MAR...)
   - Eje Y: Cantidad de CP (formato con coma)
   - Puntos solo en meses con datos
   - Todos los 12 meses visibles

**KPIs afectados:**
- KPI 1: CP Diseñados
- KPI 2: CP Nuevos
- KPI 3: CP Modificados
- KPI 4: CP Reutilizados
- KPI 5: CP Automatizados
- KPI 6: CP Ejecutados

---

### 4. ✅ COMPOSICIÓN DE DESVIACIONES (KPI 21)
**Archivos afectados:** `04_KPIs_Visualizacion.md`, `06_Especificaciones_Dashboard.md`

**Cambio:**
- **Antes:** KPI 21: "Horas de Desviación por Proyecto" (Top 10 con Bar Chart horizontal)
- **Ahora:** KPI 21: "Composición de Desviaciones" (Donut Chart + Tabla)

**Nueva Definición:**

**Nombre:** Composición de Desviaciones

**Descripción:**  
Distribución de horas de desviación por tipo de retraso, mostrando la composición de las causas de desviación.

**Visualización Principal:**
- **Tipo:** Donut Chart (gráfico de dona)
- **Datos:** 5 tipos de retraso con sus horas acumuladas:
  1. Retraso por definiciones Incompletas o Ambigüas
  2. Retraso por entrega tardía de desarrollo
  3. Retraso por indisponibilidad de ambientes
  4. Retraso por cambios en el alcance durante ciclo de pruebas
  5. Retraso por ineficiencias con el equipo de Pruebas

- **Colores:** Gradiente de rojos/naranjas
  - `#dc2626` (Rojo oscuro)
  - `#ef4444` (Rojo)
  - `#f59e0b` (Naranja)
  - `#fb923c` (Naranja claro)
  - `#fca5a5` (Rosa claro)

- **Centro del Donut:** Total de horas de desviación
- **Leyenda:** A la derecha con porcentajes

**Tooltip:**
```
{tipo_retraso}
Horas: {valor} hrs
% del Total: {porcentaje}%
```

**Visualización Alternativa (Tabla):**
```
Tipo de Retraso                          │ Horas │  %   │ Barra visual
─────────────────────────────────────────┼───────┼──────┼─────────────
Entrega tardía de desarrollo             │  65   │ 36%  │ ████████████
Definiciones incompletas o ambiguas      │  45   │ 25%  │ ████████
Cambios en el alcance                    │  35   │ 19%  │ ██████
Indisponibilidad de ambientes            │  25   │ 14%  │ ████
Ineficiencias con el equipo              │  10   │  6%  │ ██
─────────────────────────────────────────┼───────┼──────┼─────────────
TOTAL                                    │ 180   │ 100% │
```

**Fórmula:**
```javascript
// Agrupar por tipo de retraso
const desviaciones = datosFiltrados
  .filter(row => row.Actividad.startsWith('Retraso'))
  .reduce((acc, row) => {
    if (!acc[row.Actividad]) {
      acc[row.Actividad] = 0;
    }
    acc[row.Actividad] += row.Horas || 0;
    return acc;
  }, {});

// Convertir a array y calcular porcentajes
const total = Object.values(desviaciones).reduce((a, b) => a + b, 0);
const dataDesviaciones = Object.entries(desviaciones).map(([nombre, horas]) => ({
  nombre: nombre.replace('Retraso por ', ''),
  horas: horas,
  porcentaje: ((horas / total) * 100).toFixed(1)
})).sort((a, b) => b.horas - a.horas);
```

---

### 5. ✅ GANTT CONFIRMADO EN DASHBOARD
**Archivo afectado:** `06_Especificaciones_Dashboard.md`

**Confirmación:**
La Sección 6 del Gantt está completamente documentada y confirmada en el layout del dashboard.

**Ubicación:** Parte inferior del dashboard, después de Tendencias Mensuales

**Estado inicial:** Collapsible, cerrado por defecto

**Botón toggle:** "📊 Ver Cronograma de Proyectos/Actividades"

**Comportamiento dual:**

**Vista 1: General (sin filtro de proyecto específico)**
- Muestra: Proyectos (cada fila = 1 proyecto)
- Fecha Inicio: MIN(F.inicio Real) del proyecto
- Fecha Fin: MAX(F.Fin Real) del proyecto
- Colores: Por estado del proyecto (Concluido/En Curso)

**Vista 2: Detallada (con proyecto específico filtrado)**
- Muestra: Actividades del proyecto (cada fila = 1 actividad)
- Fecha Inicio: F.inicio Real de la actividad
- Fecha Fin: F.Fin Real de la actividad
- Filtro: Solo actividades con al menos una fecha registrada
- Colores: Por estado de actividad (Terminado/En curso/Por iniciar)

**Interactividad:**
- Click en barra (Vista General) → Filtrar proyecto y cambiar a Vista Detallada
- Click en barra (Vista Detallada) → Mostrar panel lateral con detalles
- Hover → Tooltip con métricas
- Zoom y Pan disponibles

---

## 📊 LAYOUT ACTUALIZADO - SECCIÓN 4: DESVIACIONES

**Antes:**
```
┌─────────────────────┬─────────────────────┐
│ Horas Desviación    │                     │
│      Total          │                     │
├─────────────────────┴─────────────────────┤
│ Horas Desviación por Proyecto (Top 10)    │
│         (Bar Chart horizontal)             │
└────────────────────────────────────────────┘
```

**Ahora:**
```
┌─────────────────────┬─────────────────────┐
│ Horas Desviación    │                     │
│      Total          │                     │
├─────────────────────┴─────────────────────┤
│ Composición de Desviaciones (full width)  │
│    (Donut Chart + Tabla)                  │
└────────────────────────────────────────────┘
```

---

## 📊 LAYOUT COMPLETO DEL DASHBOARD v2.1

```
┌────────────────────────────────────────────────────────────┐
│  HEADER: Logo + Título + Filtros Globales                  │
├────────────────────────────────────────────────────────────┤
│  SECCIÓN 1: CASOS DE PRUEBA (6 KPIs)                      │
│  Todos con valor + tendencia mensual (meses en español)   │
├────────────────────────────────────────────────────────────┤
│  SECCIÓN 2: DEFECTOS (9 KPIs)                             │
│  Con gráficos de área usando meses en español             │
├────────────────────────────────────────────────────────────┤
│  SECCIÓN 3: EFECTIVIDAD (4 KPIs)                          │
│  Con tendencias mensuales (meses en español)              │
├────────────────────────────────────────────────────────────┤
│  SECCIÓN 4: DESVIACIONES (2 KPIs)                         │
│  - Horas Desviación Total                                 │
│  - Composición de Desviaciones (Donut Chart)              │
├────────────────────────────────────────────────────────────┤
│  SECCIÓN 5: TENDENCIAS MENSUALES                          │
│  Tabs con gráficos usando meses en español                │
├────────────────────────────────────────────────────────────┤
│  ▼ SECCIÓN 6: GANTT (Collapsible) 📅                     │
│  Vista General o Detallada según filtro                   │
└────────────────────────────────────────────────────────────┘
```

---

## 🎨 ESPECIFICACIONES TÉCNICAS

### Formato de Meses (Implementación)

```javascript
// Constante de meses
const MESES_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
                  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

// Función para generar datos mensuales completos
function generarDatosMensuales(datos, año) {
  const datosPorMes = {};
  
  // Agrupar datos por mes
  datos.forEach(row => {
    if (row['F.Fin Real']) {
      const fecha = new Date(row['F.Fin Real']);
      if (fecha.getFullYear() === año) {
        const mes = fecha.getMonth(); // 0-11
        const mesNombre = MESES_ES[mes];
        datosPorMes[mesNombre] = (datosPorMes[mesNombre] || 0) + row.valor;
      }
    }
  });
  
  // Crear array con todos los 12 meses
  return MESES_ES.map(mes => ({
    mes: mes,
    valor: datosPorMes[mes] || 0
  }));
}
```

### Formato de Números CP

```javascript
// Función para formatear CP
function formatearCP(valor) {
  return `${valor.toLocaleString('es-ES')} CP`;
}

// Ejemplos:
formatearCP(350);    // "350 CP"
formatearCP(1250);   // "1,250 CP"
formatearCP(15000);  // "15,000 CP"
```

### Composición de Desviaciones

```javascript
// Calcular composición
function calcularComposicionDesviaciones(datos) {
  const tiposRetraso = [
    'Retraso por definiciones Incompletas o Ambigüas',
    'Retraso po entrega tardía de desarrollo',
    'Retraso por indisponibilidad de ambientes',
    'Retraso por cambios en el alcance durante ciclo de pruebas',
    'Retraso por ineficiencias con el equipo de Pruebas'
  ];
  
  const desviaciones = {};
  let total = 0;
  
  datos.forEach(row => {
    if (tiposRetraso.includes(row.Actividad)) {
      const horas = row.Horas || 0;
      desviaciones[row.Actividad] = (desviaciones[row.Actividad] || 0) + horas;
      total += horas;
    }
  });
  
  return Object.entries(desviaciones).map(([tipo, horas]) => ({
    tipo: tipo.replace('Retraso por ', '').replace('Retraso po ', ''),
    horas: horas,
    porcentaje: total > 0 ? ((horas / total) * 100).toFixed(1) : 0,
    color: asignarColor(tipo)
  })).sort((a, b) => b.horas - a.horas);
}
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Archivo 04_KPIs_Visualizacion.md
- [ ] Actualizar sección de "Formato de Eje X (Meses)"
- [ ] Actualizar KPIs 1-6 con formato CP y tendencias mensuales
- [ ] Actualizar KPI 21 con composición de desviaciones
- [ ] Actualizar ejemplos de código con meses en español
- [ ] Actualizar layout de Sección 4

### Archivo 06_Especificaciones_Dashboard.md
- [ ] Confirmar Sección 6: Gantt está documentada
- [ ] Actualizar layout de Sección 4 con composición
- [ ] Actualizar Sección 5 con meses en español
- [ ] Verificar que Sección 1 menciona tendencias para todos los CP

### Implementación en Código
- [ ] Crear constante MESES_ES
- [ ] Implementar función generarDatosMensuales()
- [ ] Implementar función formatearCP()
- [ ] Crear componente DonutChart para desviaciones
- [ ] Actualizar todos los gráficos de línea con meses en español
- [ ] Actualizar todos los KPIs de CP con tendencias
- [ ] Implementar Gantt con doble vista

---

## 📝 NOTAS FINALES

Todos estos cambios están orientados a:
1. **Mejorar la legibilidad** con meses en español
2. **Estandarizar formatos** con comas en números
3. **Aumentar insights** con tendencias para todos los CP
4. **Mejor análisis de desviaciones** con composición por tipo
5. **Confirmar funcionalidad completa** del Gantt

La versión 2.1 está lista para implementación.
