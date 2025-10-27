# 03 - KPIs: Definiciones y Fórmulas

**Última actualización:** 27 de octubre, 2025

---

## 📋 Resumen

Este documento define los **21 KPIs del Dashboard QA** con sus fórmulas detalladas paso a paso.

**Estructura de cada KPI:**
- Nombre y descripción
- Fórmula matemática
- Lógica de cálculo (pseudocódigo y JavaScript)
- Filtros y reglas especiales
- Ejemplos numéricos

---

## 📊 CATEGORÍA 1: CASOS DE PRUEBA (6 KPIs)

### **KPI 1: CP Diseñados**

**Definición:**  
Total de casos de prueba diseñados (nuevos + modificados).

**Fórmula:**
```
CP Diseñados = SUMAR(CP Nuevos + CP Modificados)
  DONDE Actividad = "Diseño de escenarios"
```

**Lógica JavaScript:**
```javascript
const cpDiseñados = datosFiltrados
  .filter(row => row.Actividad === "Diseño de escenarios")
  .reduce((sum, row) => {
    return sum + (row['CP Nuevos'] || 0) + (row['CP Modificados'] || 0);
  }, 0);
```

**Agregación Mensual:**
```javascript
const cpPorMes = agruparPorMes(datosFiltrados, 'F.Fin Real')
  .map(grupo => ({
    mes: grupo.mes,
    valor: grupo.datos
      .filter(row => row.Actividad === "Diseño de escenarios")
      .reduce((sum, row) => sum + (row['CP Nuevos'] || 0) + (row['CP Modificados'] || 0), 0)
  }));
```

**Importante:**
- Solo cuenta filas donde Actividad = "Diseño de escenarios"
- CP Reutilizados NO se incluye

---

### **KPI 2: CP Nuevos**

**Definición:**  
Total de casos de prueba nuevos diseñados.

**Fórmula:**
```
CP Nuevos = SUMAR(CP Nuevos)
  DONDE Actividad = "Diseño de escenarios"
```

**Lógica JavaScript:**
```javascript
const cpNuevos = datosFiltrados
  .filter(row => row.Actividad === "Diseño de escenarios")
  .reduce((sum, row) => sum + (row['CP Nuevos'] || 0), 0);
```

---

### **KPI 3: CP Modificados**

**Definición:**  
Total de casos de prueba modificados.

**Fórmula:**
```
CP Modificados = SUMAR(CP Modificados)
  DONDE Actividad = "Diseño de escenarios"
```

**Lógica JavaScript:**
```javascript
const cpModificados = datosFiltrados
  .filter(row => row.Actividad === "Diseño de escenarios")
  .reduce((sum, row) => sum + (row['CP Modificados'] || 0), 0);
```

---

### **KPI 4: CP Reutilizados**

**Definición:**  
Total de casos de prueba reutilizados de otros proyectos.

**Fórmula:**
```
CP Reutilizados = SUMAR(CP reutilizados)
  DONDE Actividad = "Diseño de escenarios"
```

**Lógica JavaScript:**
```javascript
const cpReutilizados = datosFiltrados
  .filter(row => row.Actividad === "Diseño de escenarios")
  .reduce((sum, row) => sum + (row['CP reutilizados'] || 0), 0);
```

**Importante:**
- Es un KPI INDEPENDIENTE
- NO se suma a CP Diseñados

---

### **KPI 5: CP Automatizados**

**Definición:**  
Total de casos de prueba automatizados.

**Fórmula:**
```
CP Automatizados = SUMAR(CP Automatizados)
  DONDE Actividad = "Diseño de escenarios"
```

**Lógica JavaScript:**
```javascript
const cpAutomatizados = datosFiltrados
  .filter(row => row.Actividad === "Diseño de escenarios")
  .reduce((sum, row) => sum + (row['CP Automatizados'] || 0), 0);
```

---

### **KPI 6: CP Ejecutados**

**Definición:**  
Total de casos de prueba ejecutados en todas las fases.

**Fórmula:**
```
CP Ejecutados = SUMAR(CP Ejecutados)
  (de todas las actividades)
```

**Lógica JavaScript:**
```javascript
const cpEjecutados = datosFiltrados
  .reduce((sum, row) => sum + (row['CP Ejecutados'] || 0), 0);
```

**Importante:**
- NO se filtra por actividad
- Incluye ejecuciones de todas las fases (Ciclos QA, UAT, Preproductivas, etc.)

---

## 🐛 CATEGORÍA 2: DEFECTOS (9 KPIs)

### **KPI 7: Total Issues Shift Left**

**Definición:**  
Total de issues encontrados en fases tempranas (Análisis y Diseño).

**Fórmula:**
```
Total Issues Shift Left = SUMAR(Issues Bloqueantes + Issues Críticos + Issues Altos + Issues Menores)
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]
```

**Lógica JavaScript:**
```javascript
const actividadesShiftLeft = [
  'Analisis y Dimensionamiento',
  'Diseño de escenarios'
];

const issuesShiftLeft = datosFiltrados
  .filter(row => actividadesShiftLeft.includes(row.Actividad))
  .reduce((sum, row) => {
    const total = (row['Issues Bloqueantes'] || 0) + 
                  (row['Issues Críticos'] || 0) + 
                  (row['Issues Altos'] || 0) + 
                  (row['Issues Menores'] || 0);
    return sum + total;
  }, 0);
```

**Agregación Mensual:**
```javascript
const issuesShiftLeftPorMes = agruparPorMes(datosFiltrados, 'F.Fin Real')
  .map(grupo => ({
    mes: grupo.mes,
    valor: grupo.datos
      .filter(row => actividadesShiftLeft.includes(row.Actividad))
      .reduce((sum, row) => {
        const total = (row['Issues Bloqueantes'] || 0) + 
                      (row['Issues Críticos'] || 0) + 
                      (row['Issues Altos'] || 0) + 
                      (row['Issues Menores'] || 0);
        return sum + total;
      }, 0)
  }));
```

---

### **KPI 8: Total Issues en Ejecución**

**Definición:**  
Total de issues encontrados durante las fases de ejecución.

**Fórmula:**
```
Total Issues Ejecución = SUMAR(Issues Bloqueantes + Issues Críticos + Issues Altos + Issues Menores)
  DONDE Actividad EN [Ciclos QA 1-15, UAT, Preproductivas, Smoke, Estabilización]
```

**Lógica JavaScript:**
```javascript
const actividadesEjecucion = [
  'Pruebas QA Ciclo 1', 'Pruebas QA Ciclo 2', 'Pruebas QA Ciclo 3',
  'Pruebas QA Ciclo 4', 'Pruebas QA Ciclo 5', 'Pruebas QA Ciclo 6',
  'Pruebas QA Ciclo 7', 'Pruebas QA Ciclo 8', 'Pruebas QA Ciclo 9',
  'Pruebas QA Ciclo 10', 'Pruebas QA Ciclo 11', 'Pruebas QA Ciclo 12',
  'Pruebas QA Ciclo 13', 'Pruebas QA Ciclo 14', 'Pruebas QA Ciclo 15',
  'Pruebas UAT',
  'Pruebas Preproductivas',
  'Smoke Productivo',
  'Estabilización Productiva'
];

const issuesEjecucion = datosFiltrados
  .filter(row => actividadesEjecucion.includes(row.Actividad))
  .reduce((sum, row) => {
    const total = (row['Issues Bloqueantes'] || 0) + 
                  (row['Issues Críticos'] || 0) + 
                  (row['Issues Altos'] || 0) + 
                  (row['Issues Menores'] || 0);
    return sum + total;
  }, 0);
```

---

### **KPI 9: Total de Issues (Consolidado)**

**Definición:**  
Total consolidado de issues (Shift Left + Ejecución).

**Fórmula:**
```
Total de Issues = Total Issues Shift Left + Total Issues Ejecución
```

**Lógica JavaScript:**
```javascript
const totalIssues = issuesShiftLeft + issuesEjecucion;
```

**Agregación Mensual (desglosada):**
```javascript
const issuesPorMes = agruparPorMes(datosFiltrados, 'F.Fin Real')
  .map(grupo => ({
    mes: grupo.mes,
    shiftLeft: grupo.datos
      .filter(row => actividadesShiftLeft.includes(row.Actividad))
      .reduce((sum, row) => sum + calcularTotalIssues(row), 0),
    ejecucion: grupo.datos
      .filter(row => actividadesEjecucion.includes(row.Actividad))
      .reduce((sum, row) => sum + calcularTotalIssues(row), 0)
  }))
  .map(grupo => ({
    ...grupo,
    total: grupo.shiftLeft + grupo.ejecucion
  }));
```

---

### **KPI 10: Escape Rate UAT**

**Definición:**  
Porcentaje de defectos que escaparon de los ciclos QA y fueron encontrados en UAT.

**Fórmula:**
```
Escape Rate UAT = (Issues en UAT / Issues en Ciclos QA) × 100
```

**Lógica JavaScript:**
```javascript
// NUMERADOR: Issues encontrados en UAT
const issuesUAT = datosFiltrados
  .filter(row => row.Actividad === 'Pruebas UAT')
  .reduce((sum, row) => {
    const total = (row['Issues Bloqueantes'] || 0) + 
                  (row['Issues Críticos'] || 0) + 
                  (row['Issues Altos'] || 0) + 
                  (row['Issues Menores'] || 0);
    return sum + total;
  }, 0);

// DENOMINADOR: Issues encontrados en Ciclos QA (1-15)
const issuesCiclosQA = datosFiltrados
  .filter(row => row.Actividad.startsWith('Pruebas QA Ciclo'))
  .reduce((sum, row) => {
    const total = (row['Issues Bloqueantes'] || 0) + 
                  (row['Issues Críticos'] || 0) + 
                  (row['Issues Altos'] || 0) + 
                  (row['Issues Menores'] || 0);
    return sum + total;
  }, 0);

// CÁLCULO
const escapeRateUAT = issuesCiclosQA > 0 
  ? (issuesUAT / issuesCiclosQA) * 100 
  : 0;
```

**Semáforo:**
- 🟢 Verde: < 5%
- 🟡 Amarillo: 5% - 10%
- 🔴 Rojo: > 10%

**Importante:**
- Denominador usa SOLO Ciclos QA (NO incluye UAT, Preproductivas, Smoke, Estabilización)
- Si denominador = 0, el resultado es 0%

**Ejemplo:**
```
Issues en UAT: 15
Issues en Ciclos QA: 200
→ Escape Rate UAT = (15 / 200) × 100 = 7.5%
→ Semáforo: 🟡 Amarillo
```

---

### **KPI 11: Escape Rate Productivo**

**Definición:**  
Porcentaje de defectos que escaparon y fueron encontrados en producción (Estabilización Productiva).

**Fórmula:**
```
Escape Rate Productivo = (Issues en Estabilización Productiva / Total Issues Ejecución) × 100
```

**Lógica JavaScript:**
```javascript
// NUMERADOR: Issues en Estabilización Productiva
const issuesEstabilizacion = datosFiltrados
  .filter(row => row.Actividad === 'Estabilización Productiva')
  .reduce((sum, row) => {
    const total = (row['Issues Bloqueantes'] || 0) + 
                  (row['Issues Críticos'] || 0) + 
                  (row['Issues Altos'] || 0) + 
                  (row['Issues Menores'] || 0);
    return sum + total;
  }, 0);

// DENOMINADOR: Total Issues en Ejecución (ya calculado en KPI 8)

// CÁLCULO
const escapeRateProductivo = issuesEjecucion > 0 
  ? (issuesEstabilizacion / issuesEjecucion) * 100 
  : 0;
```

**Semáforo:**
- 🟢 Verde: < 2%
- 🟡 Amarillo: 2% - 5%
- 🔴 Rojo: > 5%

**Importante:**
- Denominador incluye TODO en ejecución (Ciclos QA + UAT + Preproductivas + Smoke + Estabilización)

---

### **KPI 12: MTTR Promedio**

**Definición:**  
Tiempo promedio de reparación de defectos en días hábiles.

**Fórmula:**
```
MTTR Promedio = PROMEDIO(MTTR)
  DONDE MTTR > 0
```

**Lógica JavaScript:**
```javascript
const datosConMTTR = datosFiltrados.filter(row => 
  row.MTTR && row.MTTR > 0
);

const sumaMTTR = datosConMTTR.reduce((sum, row) => 
  sum + row.MTTR, 0
);

const mttrPromedio = datosConMTTR.length > 0 
  ? sumaMTTR / datosConMTTR.length 
  : 0;
```

**Semáforo:**
- 🟢 Verde: < 3 días
- 🟡 Amarillo: 3 - 5 días
- 🔴 Rojo: > 5 días

**Agregación Mensual:**
```javascript
const mttrPorMes = agruparPorMes(datosFiltrados, 'F.Fin Real')
  .map(grupo => {
    const datosConMTTR = grupo.datos.filter(row => row.MTTR && row.MTTR > 0);
    const suma = datosConMTTR.reduce((sum, row) => sum + row.MTTR, 0);
    return {
      mes: grupo.mes,
      valor: datosConMTTR.length > 0 ? suma / datosConMTTR.length : 0
    };
  });
```

**Importante:**
- MTTR viene pre-calculado en el Excel
- Solo se promedian filas donde MTTR > 0
- Se mide en días hábiles

---

### **KPI 13: Issues por Severidad (Shift Left)**

**Definición:**  
Distribución de issues por severidad en fases tempranas.

**Fórmulas:**
```
Issues Bloqueantes SL = SUMAR(Issues Bloqueantes)
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]

Issues Críticos SL = SUMAR(Issues Críticos)
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]

Issues Altos SL = SUMAR(Issues Altos)
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]

Issues Menores SL = SUMAR(Issues Menores)
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]
```

**Lógica JavaScript:**
```javascript
const issuesPorSeveridadShiftLeft = datosFiltrados
  .filter(row => actividadesShiftLeft.includes(row.Actividad))
  .reduce((acc, row) => ({
    bloqueantes: acc.bloqueantes + (row['Issues Bloqueantes'] || 0),
    criticos: acc.criticos + (row['Issues Críticos'] || 0),
    altos: acc.altos + (row['Issues Altos'] || 0),
    menores: acc.menores + (row['Issues Menores'] || 0)
  }), { bloqueantes: 0, criticos: 0, altos: 0, menores: 0 });
```

**Agregación Mensual:**
```javascript
const issuesSeveridadShiftLeftPorMes = agruparPorMes(datosFiltrados, 'F.Fin Real')
  .map(grupo => ({
    mes: grupo.mes,
    bloqueantes: grupo.datos
      .filter(row => actividadesShiftLeft.includes(row.Actividad))
      .reduce((sum, row) => sum + (row['Issues Bloqueantes'] || 0), 0),
    criticos: grupo.datos
      .filter(row => actividadesShiftLeft.includes(row.Actividad))
      .reduce((sum, row) => sum + (row['Issues Críticos'] || 0), 0),
    altos: grupo.datos
      .filter(row => actividadesShiftLeft.includes(row.Actividad))
      .reduce((sum, row) => sum + (row['Issues Altos'] || 0), 0),
    menores: grupo.datos
      .filter(row => actividadesShiftLeft.includes(row.Actividad))
      .reduce((sum, row) => sum + (row['Issues Menores'] || 0), 0)
  }));
```

---

### **KPI 14: Issues por Severidad (Ejecución)**

**Definición:**  
Distribución de issues por severidad en fases de ejecución.

**Fórmulas:**
```
Issues Bloqueantes Ejec = SUMAR(Issues Bloqueantes)
  DONDE Actividad EN [Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]

Issues Críticos Ejec = SUMAR(Issues Críticos)
  DONDE Actividad EN [Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]

Issues Altos Ejec = SUMAR(Issues Altos)
  DONDE Actividad EN [Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]

Issues Menores Ejec = SUMAR(Issues Menores)
  DONDE Actividad EN [Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]
```

**Lógica JavaScript:**
```javascript
const issuesPorSeveridadEjecucion = datosFiltrados
  .filter(row => actividadesEjecucion.includes(row.Actividad))
  .reduce((acc, row) => ({
    bloqueantes: acc.bloqueantes + (row['Issues Bloqueantes'] || 0),
    criticos: acc.criticos + (row['Issues Críticos'] || 0),
    altos: acc.altos + (row['Issues Altos'] || 0),
    menores: acc.menores + (row['Issues Menores'] || 0)
  }), { bloqueantes: 0, criticos: 0, altos: 0, menores: 0 });
```

---

### **KPI 15: Issues No Resueltos**

**Definición:**  
Total de issues que no fueron resueltos.

**Fórmula:**
```
Issues No Resueltos = SUMAR(Total de Issues no resueltos)
```

**Lógica JavaScript:**
```javascript
const issuesNoResueltos = datosFiltrados
  .reduce((sum, row) => sum + (row['Total de Issues no resueltos'] || 0), 0);
```

**Importante:**
- Usa la columna específica "Total de Issues no resueltos" del Excel
- NO se calcula a partir de otras columnas

---

## 💼 CATEGORÍA 3: EFECTIVIDAD (4 KPIs)

### **KPI 16: % Efectividad - Ciclo 1**

**Definición:**  
Porcentaje promedio de efectividad en el primer ciclo de pruebas QA.

**Fórmula:**
```
% Efectividad Ciclo 1 = PROMEDIO(% Efectividad)
  DONDE Actividad = "Pruebas QA Ciclo 1"
```

**Lógica JavaScript:**
```javascript
const datosCiclo1 = datosFiltrados.filter(row => 
  row.Actividad === 'Pruebas QA Ciclo 1' && 
  row['% Efectividad'] !== null && 
  row['% Efectividad'] !== undefined
);

const sumaEfectividad = datosCiclo1.reduce((sum, row) => 
  sum + row['% Efectividad'], 0
);

const efectividadCiclo1 = datosCiclo1.length > 0 
  ? sumaEfectividad / datosCiclo1.length 
  : 0;
```

**Semáforo:**
- 🟢 Verde: > 90%
- 🟡 Amarillo: 80% - 90%
- 🔴 Rojo: < 80%

---

### **KPI 17: % Efectividad Promedio - Ciclos QA**

**Definición:**  
Porcentaje promedio de efectividad en todos los ciclos de pruebas QA.

**Fórmula:**
```
% Efectividad Ciclos QA = PROMEDIO(% Efectividad)
  DONDE Actividad CONTIENE "Pruebas QA Ciclo"
```

**Lógica JavaScript:**
```javascript
const datosCiclosQA = datosFiltrados.filter(row => 
  row.Actividad.startsWith('Pruebas QA Ciclo') && 
  row['% Efectividad'] !== null && 
  row['% Efectividad'] !== undefined
);

const sumaEfectividad = datosCiclosQA.reduce((sum, row) => 
  sum + row['% Efectividad'], 0
);

const efectividadCiclosQA = datosCiclosQA.length > 0 
  ? sumaEfectividad / datosCiclosQA.length 
  : 0;
```

---

### **KPI 18: % Efectividad Promedio - UAT**

**Definición:**  
Porcentaje promedio de efectividad en pruebas UAT.

**Fórmula:**
```
% Efectividad UAT = PROMEDIO(% Efectividad)
  DONDE Actividad = "Pruebas UAT"
```

**Lógica JavaScript:**
```javascript
const datosUAT = datosFiltrados.filter(row => 
  row.Actividad === 'Pruebas UAT' && 
  row['% Efectividad'] !== null && 
  row['% Efectividad'] !== undefined
);

const sumaEfectividad = datosUAT.reduce((sum, row) => 
  sum + row['% Efectividad'], 0
);

const efectividadUAT = datosUAT.length > 0 
  ? sumaEfectividad / datosUAT.length 
  : 0;
```

---

### **KPI 19: % Efectividad Promedio - Ejecución**

**Definición:**  
Porcentaje promedio de efectividad en todas las actividades de ejecución.

**Fórmula:**
```
% Efectividad Ejecución = PROMEDIO(% Efectividad)
  DONDE Actividad EN [Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]
```

**Lógica JavaScript:**
```javascript
const datosEjecucion = datosFiltrados.filter(row => 
  actividadesEjecucion.includes(row.Actividad) && 
  row['% Efectividad'] !== null && 
  row['% Efectividad'] !== undefined
);

const sumaEfectividad = datosEjecucion.reduce((sum, row) => 
  sum + row['% Efectividad'], 0
);

const efectividadEjecucion = datosEjecucion.length > 0 
  ? sumaEfectividad / datosEjecucion.length 
  : 0;
```

---

## 📉 CATEGORÍA 4: DESVIACIONES (2 KPIs)

### **KPI 20: Horas de Desviación Total**

**Definición:**  
Total de horas de desviación (retrasos).

**Fórmula:**
```
Horas Desviación = SUMAR(Horas)
  DONDE Actividad CONTIENE "Retraso"
```

**Lógica JavaScript:**
```javascript
const horasDesviacion = datosFiltrados
  .filter(row => row.Actividad.startsWith('Retraso'))
  .reduce((sum, row) => sum + (row.Horas || 0), 0);
```

**Agregación Mensual:**
```javascript
const desviacionPorMes = agruparPorMes(datosFiltrados, 'F.Fin Real')
  .map(grupo => ({
    mes: grupo.mes,
    valor: grupo.datos
      .filter(row => row.Actividad.startsWith('Retraso'))
      .reduce((sum, row) => sum + (row.Horas || 0), 0)
  }));
```

---

### **KPI 21: Composición de Desviaciones**

**Definición:**  
Distribución de horas de desviación por tipo de retraso.

**Fórmula:**
```
Para cada tipo de retraso:
  Horas = SUMAR(Horas) DONDE Actividad = tipo_retraso
  % = (Horas del tipo / Total Horas Desviación) × 100
```

**Tipos de Retraso:**
1. Retraso por definiciones Incompletas o Ambigüas
2. Retraso po entrega tardía de desarrollo
3. Retraso por indisponibilidad de ambientes
4. Retraso por cambios en el alcance durante ciclo de pruebas
5. Retraso por ineficiencias con el equipo de Pruebas

**Lógica JavaScript:**
```javascript
const tiposRetraso = [
  'Retraso por definiciones Incompletas o Ambigüas',
  'Retraso po entrega tardía de desarrollo',
  'Retraso por indisponibilidad de ambientes',
  'Retraso por cambios en el alcance durante ciclo de pruebas',
  'Retraso por ineficiencias con el equipo de Pruebas'
];

const desviacionPorTipo = tiposRetraso.map(tipo => {
  const horas = datosFiltrados
    .filter(row => row.Actividad === tipo)
    .reduce((sum, row) => sum + (row.Horas || 0), 0);
  
  return {
    tipo: tipo.replace('Retraso por ', '').replace('Retraso po ', ''),
    horas: horas
  };
});

const totalHoras = desviacionPorTipo.reduce((sum, item) => sum + item.horas, 0);

const composicionDesviaciones = desviacionPorTipo
  .map(item => ({
    ...item,
    porcentaje: totalHoras > 0 ? ((item.horas / totalHoras) * 100).toFixed(1) : 0
  }))
  .sort((a, b) => b.horas - a.horas);
```

**Colores (para Donut Chart):**
```javascript
const coloresDesviaciones = {
  'definiciones Incompletas o Ambigüás': '#dc2626',
  'entrega tardía de desarrollo': '#ef4444',
  'indisponibilidad de ambientes': '#f59e0b',
  'cambios en el alcance': '#fb923c',
  'ineficiencias con el equipo': '#fca5a5'
};
```

---

## 📊 Tabla Resumen de KPIs

| # | KPI | Tipo | Filtro Principal | Agregación |
|---|-----|------|------------------|------------|
| 1 | CP Diseñados | Total | Diseño de escenarios | Suma |
| 2 | CP Nuevos | Total | Diseño de escenarios | Suma |
| 3 | CP Modificados | Total | Diseño de escenarios | Suma |
| 4 | CP Reutilizados | Total | Diseño de escenarios | Suma |
| 5 | CP Automatizados | Total | Diseño de escenarios | Suma |
| 6 | CP Ejecutados | Total | Todas | Suma |
| 7 | Total Issues SL | Total | Análisis/Diseño | Suma |
| 8 | Total Issues Ejec | Total | Ciclos/UAT/Prod | Suma |
| 9 | Total Issues | Total | Todas | Suma |
| 10 | Escape Rate UAT | Ratio | UAT / Ciclos QA | División |
| 11 | Escape Rate Prod | Ratio | Estabilización / Ejecución | División |
| 12 | MTTR Promedio | Promedio | Todas | Promedio |
| 13 | Issues Sev SL | Desglose | Análisis/Diseño | Suma por severidad |
| 14 | Issues Sev Ejec | Desglose | Ciclos/UAT/Prod | Suma por severidad |
| 15 | Issues No Resueltos | Total | Todas | Suma |
| 16 | Efectividad Ciclo 1 | Promedio | Ciclo 1 | Promedio |
| 17 | Efectividad Ciclos QA | Promedio | Ciclos QA | Promedio |
| 18 | Efectividad UAT | Promedio | UAT | Promedio |
| 19 | Efectividad Ejecución | Promedio | Ejecución | Promedio |
| 20 | Horas Desviación | Total | Retrasos | Suma |
| 21 | Composición Desv | Desglose | Retrasos | Suma por tipo |

---

## 🔗 Documentos Relacionados

- **[01_Estructura_Excel.md](./01_Estructura_Excel.md)** - Columnas fuente
- **[02_Campos_Calculados.md](./02_Campos_Calculados.md)** - Campos derivados
- **[04_KPIs_Visualizacion.md](./04_KPIs_Visualizacion.md)** - Cómo visualizar
- **[05_Mapeo_Campos_Formulas.md](./05_Mapeo_Campos_Formulas.md)** - Relaciones
