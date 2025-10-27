# 02 - Campos Calculados

**Última actualización:** 27 de octubre, 2025

---

## 📋 Resumen

Este documento describe los **campos que se calculan dinámicamente** a partir de otros campos del Excel. Estos campos NO existen como columnas en el archivo fuente, sino que se derivan durante el procesamiento de datos.

---

## 🧮 Campos Calculados

### **1. CP Diseñados**

**Definición:**  
Total de casos de prueba diseñados en una actividad. Es la suma de CP Nuevos + CP Modificados.

**Fórmula:**
```
CP Diseñados = CP Nuevos + CP Modificados
```

**Aplicación:**
- Se calcula por cada fila donde `Actividad = "Diseño de escenarios"`
- Se usa en KPI 1: CP Diseñados

**Ejemplo:**
```
CP Nuevos: 150
CP Modificados: 80
→ CP Diseñados = 150 + 80 = 230
```

**Importante:**
- CP Reutilizados NO se incluye en CP Diseñados
- CP Automatizados y CP Ejecutados son métricas independientes

---

### **2. Total de Issues**

**Definición:**  
Suma de todos los issues reportados en una actividad, independientemente de su severidad.

**Fórmula:**
```
Total de Issues = Issues Bloqueantes + Issues Críticos + Issues Altos + Issues Menores
```

**Aplicación:**
- Se calcula por cada fila
- Se usa en KPI 9: Total de Issues

**Ejemplo:**
```
Issues Bloqueantes: 2
Issues Críticos: 5
Issues Altos: 8
Issues Menores: 15
→ Total de Issues = 2 + 5 + 8 + 15 = 30
```

**Importante:**
- "Total de Issues no resueltos" es una columna INDEPENDIENTE en el Excel
- NO se usa para calcular el Total de Issues

---

### **3. Total Issues Shift Left**

**Definición:**  
Suma de todos los issues encontrados durante las fases tempranas del proyecto (Análisis y Diseño).

**Fórmula:**
```
Total Issues Shift Left = SUMAR(Total de Issues) 
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]
```

**Lógica de Filtro:**
```javascript
const issuesShiftLeft = datosFiltrados
  .filter(row => 
    row.Actividad === "Analisis y Dimensionamiento" || 
    row.Actividad === "Diseño de escenarios"
  )
  .reduce((sum, row) => {
    const totalIssues = (row['Issues Bloqueantes'] || 0) + 
                       (row['Issues Críticos'] || 0) + 
                       (row['Issues Altos'] || 0) + 
                       (row['Issues Menores'] || 0);
    return sum + totalIssues;
  }, 0);
```

**Aplicación:**
- Se usa en KPI 7: Total Issues Shift Left

**Actividades incluidas:**
1. Analisis y Dimensionamiento
2. Diseño de escenarios

---

### **4. Total Issues en Ejecución**

**Definición:**  
Suma de todos los issues encontrados durante las fases de ejecución de pruebas.

**Fórmula:**
```
Total Issues en Ejecución = SUMAR(Total de Issues) 
  DONDE Actividad EN [Todos los Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]
```

**Lógica de Filtro:**
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
    const totalIssues = (row['Issues Bloqueantes'] || 0) + 
                       (row['Issues Críticos'] || 0) + 
                       (row['Issues Altos'] || 0) + 
                       (row['Issues Menores'] || 0);
    return sum + totalIssues;
  }, 0);
```

**Aplicación:**
- Se usa en KPI 8: Total Issues en Ejecución

**Actividades incluidas:**
1. Todos los Ciclos QA (1-15)
2. Pruebas UAT
3. Pruebas Preproductivas
4. Smoke Productivo
5. Estabilización Productiva

---

### **5. Estado del Proyecto**

**Definición:**  
Estado consolidado de un proyecto, calculado a partir del estado de todas sus actividades.

**Fórmula:**
```
SI todas las actividades del proyecto tienen Estado = "Terminado"
  ENTONCES Estado del Proyecto = "Concluido"
SINO
  Estado del Proyecto = "En Curso"
```

**Lógica de Cálculo:**
```javascript
function calcularEstadoProyecto(proyecto, datos) {
  const actividadesProyecto = datos.filter(row => row.Proyecto === proyecto);
  
  const todasTerminadas = actividadesProyecto.every(row => 
    row.Estado === "Terminado"
  );
  
  return todasTerminadas ? "Concluido" : "En Curso";
}
```

**Aplicación:**
- Se usa en la Vista General del Gantt
- Se usa para filtros y segmentación de proyectos

**Importante:**
- NO se basa en el estado de actividades individuales
- Si AL MENOS UNA actividad NO está "Terminado", el proyecto está "En Curso"
- NO existe el estado "Por iniciar" para proyectos

**Ejemplo 1: Proyecto Concluido**
```
Proyecto: Monedero Bloqueado
Actividades:
  - Analisis y Dimensionamiento: Terminado
  - Diseño de escenarios: Terminado
  - Pruebas QA Ciclo 1: Terminado
  - Pruebas UAT: Terminado
  
→ Estado del Proyecto = "Concluido"
```

**Ejemplo 2: Proyecto En Curso**
```
Proyecto: Transferencias
Actividades:
  - Analisis y Dimensionamiento: Terminado
  - Diseño de escenarios: Terminado
  - Pruebas QA Ciclo 1: En curso
  - Pruebas UAT: Por iniciar
  
→ Estado del Proyecto = "En Curso" (porque hay actividades que no están "Terminado")
```

---

### **6. Fecha Inicio del Proyecto**

**Definición:**  
Fecha más temprana entre todas las fechas de inicio real de las actividades del proyecto.

**Fórmula:**
```
Fecha Inicio Proyecto = MIN(F.inicio Real) de todas las actividades del proyecto
```

**Lógica de Cálculo:**
```javascript
function calcularFechaInicioProyecto(proyecto, datos) {
  const actividadesProyecto = datos.filter(row => 
    row.Proyecto === proyecto && row['F.inicio Real']
  );
  
  const fechas = actividadesProyecto.map(row => 
    new Date(row['F.inicio Real'])
  );
  
  return new Date(Math.min(...fechas));
}
```

**Aplicación:**
- Se usa en la Vista General del Gantt

---

### **7. Fecha Fin del Proyecto**

**Definición:**  
Fecha más tardía entre todas las fechas de fin real de las actividades del proyecto.

**Fórmula:**
```
Fecha Fin Proyecto = MAX(F.Fin Real) de todas las actividades del proyecto
```

**Lógica de Cálculo:**
```javascript
function calcularFechaFinProyecto(proyecto, datos) {
  const actividadesProyecto = datos.filter(row => 
    row.Proyecto === proyecto && row['F.Fin Real']
  );
  
  const fechas = actividadesProyecto.map(row => 
    new Date(row['F.Fin Real'])
  );
  
  return new Date(Math.max(...fechas));
}
```

**Aplicación:**
- Se usa en la Vista General del Gantt
- Se usa para calcular la duración del proyecto

---

### **8. Duración del Proyecto**

**Definición:**  
Cantidad de días calendario entre la fecha de inicio y la fecha de fin del proyecto.

**Fórmula:**
```
Duración Proyecto = Fecha Fin Proyecto - Fecha Inicio Proyecto (en días)
```

**Lógica de Cálculo:**
```javascript
function calcularDuracionProyecto(proyecto, datos) {
  const fechaInicio = calcularFechaInicioProyecto(proyecto, datos);
  const fechaFin = calcularFechaFinProyecto(proyecto, datos);
  
  const diferenciaMilisegundos = fechaFin - fechaInicio;
  const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
  
  return Math.ceil(diferenciaDias);
}
```

**Aplicación:**
- Se usa en tooltips del Gantt (Vista General)

---

### **9. Mes (para agregaciones mensuales)**

**Definición:**  
Mes extraído de la fecha de fin real de cada actividad, usado para agregaciones mensuales.

**Fórmula:**
```
Mes = EXTRAER_MES(F.Fin Real)
```

**Lógica de Cálculo:**
```javascript
function extraerMes(fechaFinReal) {
  const fecha = new Date(fechaFinReal);
  return fecha.getMonth() + 1; // 1-12
}

// Para formato español v2.1
const MESES_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
                  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

function extraerMesNombre(fechaFinReal) {
  const fecha = new Date(fechaFinReal);
  const mesIndex = fecha.getMonth(); // 0-11
  return MESES_ES[mesIndex];
}
```

**Aplicación:**
- Se usa en TODOS los gráficos de tendencia mensual
- Se usa para agrupar datos por mes en KPIs

**Importante:**
- Se usa **F.Fin Real** (NO F.inicio Real)
- Si F.Fin Real está vacía, esa fila NO se incluye en agregaciones mensuales

---

### **10. Issues por Severidad (Shift Left)**

**Definición:**  
Desglose de issues por severidad encontrados en fases tempranas.

**Fórmulas:**
```
Issues Bloqueantes Shift Left = SUMAR(Issues Bloqueantes) 
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]

Issues Críticos Shift Left = SUMAR(Issues Críticos) 
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]

Issues Altos Shift Left = SUMAR(Issues Altos) 
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]

Issues Menores Shift Left = SUMAR(Issues Menores) 
  DONDE Actividad EN ["Analisis y Dimensionamiento", "Diseño de escenarios"]
```

**Aplicación:**
- Se usa en KPI 13: Issues por Severidad (Shift Left)

---

### **11. Issues por Severidad (Ejecución)**

**Definición:**  
Desglose de issues por severidad encontrados en fases de ejecución.

**Fórmulas:**
```
Issues Bloqueantes Ejecución = SUMAR(Issues Bloqueantes) 
  DONDE Actividad EN [Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]

Issues Críticos Ejecución = SUMAR(Issues Críticos) 
  DONDE Actividad EN [Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]

Issues Altos Ejecución = SUMAR(Issues Altos) 
  DONDE Actividad EN [Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]

Issues Menores Ejecución = SUMAR(Issues Menores) 
  DONDE Actividad EN [Ciclos QA, UAT, Preproductivas, Smoke, Estabilización]
```

**Aplicación:**
- Se usa en KPI 14: Issues por Severidad (Ejecución)

---

### **12. Issues en Ciclos QA (para Escape Rate UAT)**

**Definición:**  
Total de issues encontrados SOLO en los ciclos de pruebas QA.

**Fórmula:**
```
Issues Ciclos QA = SUMAR(Total de Issues) 
  DONDE Actividad CONTIENE "Pruebas QA Ciclo"
```

**Lógica de Cálculo:**
```javascript
const issuesCiclosQA = datosFiltrados
  .filter(row => row.Actividad.startsWith('Pruebas QA Ciclo'))
  .reduce((sum, row) => {
    const totalIssues = (row['Issues Bloqueantes'] || 0) + 
                       (row['Issues Críticos'] || 0) + 
                       (row['Issues Altos'] || 0) + 
                       (row['Issues Menores'] || 0);
    return sum + totalIssues;
  }, 0);
```

**Aplicación:**
- Se usa como DENOMINADOR en KPI 10: Escape Rate UAT

**Importante:**
- Solo incluye ciclos QA (1-15)
- NO incluye UAT, Preproductivas, Smoke, ni Estabilización

---

### **13. Issues en UAT (para Escape Rate UAT)**

**Definición:**  
Total de issues encontrados en la fase de UAT.

**Fórmula:**
```
Issues UAT = SUMAR(Total de Issues) 
  DONDE Actividad = "Pruebas UAT"
```

**Lógica de Cálculo:**
```javascript
const issuesUAT = datosFiltrados
  .filter(row => row.Actividad === 'Pruebas UAT')
  .reduce((sum, row) => {
    const totalIssues = (row['Issues Bloqueantes'] || 0) + 
                       (row['Issues Críticos'] || 0) + 
                       (row['Issues Altos'] || 0) + 
                       (row['Issues Menores'] || 0);
    return sum + totalIssues;
  }, 0);
```

**Aplicación:**
- Se usa como NUMERADOR en KPI 10: Escape Rate UAT

---

### **14. Issues en Estabilización Productiva**

**Definición:**  
Total de issues encontrados durante la estabilización productiva.

**Fórmula:**
```
Issues Estabilización = SUMAR(Total de Issues) 
  DONDE Actividad = "Estabilización Productiva"
```

**Lógica de Cálculo:**
```javascript
const issuesEstabilizacion = datosFiltrados
  .filter(row => row.Actividad === 'Estabilización Productiva')
  .reduce((sum, row) => {
    const totalIssues = (row['Issues Bloqueantes'] || 0) + 
                       (row['Issues Críticos'] || 0) + 
                       (row['Issues Altos'] || 0) + 
                       (row['Issues Menores'] || 0);
    return sum + totalIssues;
  }, 0);
```

**Aplicación:**
- Se usa como NUMERADOR en KPI 11: Escape Rate Productivo

---

## 📊 Resumen de Campos Calculados

| # | Campo Calculado | Fórmula Base | Usado en KPI |
|---|----------------|--------------|--------------|
| 1 | CP Diseñados | CP Nuevos + CP Modificados | KPI 1 |
| 2 | Total de Issues | Bloq + Crít + Altos + Menores | KPI 9 |
| 3 | Total Issues Shift Left | SUMAR Issues donde Act = Análisis/Diseño | KPI 7 |
| 4 | Total Issues Ejecución | SUMAR Issues donde Act = Ciclos/UAT/Prod | KPI 8 |
| 5 | Estado del Proyecto | Derivado de estados de actividades | Gantt |
| 6 | Fecha Inicio Proyecto | MIN(F.inicio Real) | Gantt |
| 7 | Fecha Fin Proyecto | MAX(F.Fin Real) | Gantt |
| 8 | Duración Proyecto | Fecha Fin - Fecha Inicio | Gantt |
| 9 | Mes | EXTRAER_MES(F.Fin Real) | Todos los gráficos mensuales |
| 10 | Issues por Severidad SL | Desglose Shift Left | KPI 13 |
| 11 | Issues por Severidad Ejec | Desglose Ejecución | KPI 14 |
| 12 | Issues Ciclos QA | SUMAR donde Act = Ciclos QA | KPI 10 (denominador) |
| 13 | Issues UAT | SUMAR donde Act = UAT | KPI 10 (numerador) |
| 14 | Issues Estabilización | SUMAR donde Act = Estabilización | KPI 11 (numerador) |

---

## 🔗 Documentos Relacionados

- **[01_Estructura_Excel.md](./01_Estructura_Excel.md)** - Columnas fuente
- **[03_KPIs_Definiciones.md](./03_KPIs_Definiciones.md)** - Uso en KPIs
- **[05_Mapeo_Campos_Formulas.md](./05_Mapeo_Campos_Formulas.md)** - Relaciones completas
