# 05 - Mapeo: Campos Excel → Fórmulas KPIs

**Última actualización:** 26 de octubre, 2025

---

## 📊 Resumen

Este documento mapea la relación entre las **columnas del Excel** y los **21 KPIs**, mostrando qué campos se utilizan en cada indicador y cómo se relacionan.

---

## 🗺️ Matriz de Dependencias Completa

### **Tabla: Columnas → KPIs**

| # | Columna Excel | KPIs que la utilizan | Tipo de Uso |
|---|---------------|----------------------|-------------|
| 1 | Cartera | Todos (21) | Filtro |
| 2 | Subcartera | Todos (21) | Filtro |
| 3 | Proyecto | Todos (21) | Filtro / Agrupación |
| 4 | **Actividad** | Todos (21) | **Filtro principal (CRÍTICO)** |
| 5 | Estado | Todos (21) | Filtro + Estado Proyecto |
| 6 | Año | Todos (21) | Filtro |
| 7 | **Horas** | 20, 21 | Cálculo directo |
| 8 | Dias | (sin uso actual) | - |
| 9 | F.inicio Plan | Gantt | Fecha inicio proyecto |
| 10 | F.inicio Real | Gantt | Fecha inicio actividad |
| 11 | F.Fin Plan | Gantt | Fecha fin proyecto |
| 12 | **F.Fin Real** | Todos con tendencia (18) | **Agrupación mensual + Gantt** |
| 13 | **% Efectividad** | 16, 17, 18, 19 | Cálculo directo |
| 14 | **CP Nuevos** | 1, 2 | Cálculo directo |
| 15 | **CP Modificados** | 1, 3 | Cálculo directo |
| 16 | **CP reutilizados** | 4 | Cálculo directo |
| 17 | **CP Automatizados** | 5 | Cálculo directo |
| 18 | **CP Ejecutados** | 6 | Cálculo directo |
| 19 | **Issues Bloqueantes** | 7, 8, 9, 10, 11, 13, 14 | Cálculo directo |
| 20 | **Issues Críticos** | 7, 8, 9, 10, 11, 13, 14 | Cálculo directo |
| 21 | **Issues Altos** | 7, 8, 9, 10, 11, 13, 14 | Cálculo directo |
| 22 | **Issues Menores** | 7, 8, 9, 10, 11, 13, 14 | Cálculo directo |
| 23 | **Total de Issues no resueltos** | 15 | Cálculo directo |
| 24 | **MTTR** | 12 | Cálculo directo |

---

## 📋 Mapeo Detallado por KPI

### **CATEGORÍA 1: CASOS DE PRUEBA**

#### **KPI 1: CP Diseñados**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar filas | = "Diseño de escenarios" |
| Proyecto | Agrupar | GROUP BY |
| CP Nuevos | Sumar | Σ |
| CP Modificados | Sumar | Σ |
| F.Fin Real | Agrupar temporal | Mes/Año para tendencia |
| Cartera, Subcartera, Año, Estado | Filtrar | WHERE |

**Fórmula SQL Simplificada:**
```sql
SELECT Proyecto, SUM(CP_Nuevos + CP_Modificados) as CP_Disenados
FROM datos
WHERE Actividad = 'Diseño de escenarios'
  AND [filtros globales]
GROUP BY Proyecto, MONTH(F_Fin_Real)
```

---

#### **KPI 2: CP Nuevos**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar filas | = "Diseño de escenarios" |
| CP Nuevos | Sumar | Σ |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 3: CP Modificados**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar filas | = "Diseño de escenarios" |
| CP Modificados | Sumar | Σ |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 4: CP Reutilizados**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar filas | = "Diseño de escenarios" |
| CP reutilizados | Sumar | Σ |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 5: CP Automatizados**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar filas | = "Diseño de escenarios" |
| CP Automatizados | Sumar | Σ |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 6: CP Ejecutados**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar filas | IN ("Pruebas QA Ciclo 1-15", "Pruebas UAT", "Pruebas Preproductivas", "Smoke Productivo") |
| CP Ejecutados | Sumar | Σ |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

### **CATEGORÍA 2: DEFECTOS**

#### **KPI 7: Total Issues Shift Left**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar filas | IN ("Analisis y Dimensionamiento", "Diseño de escenarios") |
| Issues Bloqueantes | Sumar por fila | + |
| Issues Críticos | Sumar por fila | + |
| Issues Altos | Sumar por fila | + |
| Issues Menores | Sumar por fila | + |
| F.Fin Real | Agrupar temporal | Mes/Año |

**Fórmula SQL Simplificada:**
```sql
SELECT SUM(Issues_Bloqueantes + Issues_Criticos + Issues_Altos + Issues_Menores) as Total_Shift_Left
FROM datos
WHERE Actividad IN ('Analisis y Dimensionamiento', 'Diseño de escenarios')
  AND [filtros globales]
GROUP BY MONTH(F_Fin_Real)
```

---

#### **KPI 8: Total Issues en Ejecución**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar filas | IN (Ciclos QA 1-15, UAT, Preproductivas, Smoke, Estabilización) |
| Issues [todas] | Sumar por fila | Σ (Bloq + Crít + Altos + Menores) |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 9: Total de Issues (Consolidado)**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| [Derivado] | KPI 7 + KPI 8 | Suma de ambos campos calculados |

---

#### **KPI 10: Escape Rate UAT**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar UAT | = "Pruebas UAT" (numerador) |
| Actividad | Filtrar Ciclos QA | IN ("Pruebas QA Ciclo 1-15") (denominador) |
| Issues [todas] | Sumar | Σ en cada grupo |
| F.Fin Real | Agrupar temporal | Mes/Año |

**Fórmula SQL Simplificada:**
```sql
Numerador = SUM(Issues) WHERE Actividad = 'Pruebas UAT'
Denominador = SUM(Issues) WHERE Actividad LIKE 'Pruebas QA Ciclo%'
Escape_Rate_UAT = (Numerador / Denominador) * 100
```

---

#### **KPI 11: Escape Rate Productivo**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar Estabilización | = "Estabilización Productiva" (numerador) |
| Actividad | Filtrar Ejecución | IN (todas actividades ejecución) (denominador) |
| Issues [todas] | Sumar | Σ en cada grupo |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 12: MTTR Promedio**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| MTTR | Promediar | AVG WHERE > 0 |
| Actividad | Filtrar | Solo actividades de ejecución |
| F.Fin Real | Agrupar temporal | Mes/Año |

**Fórmula SQL Simplificada:**
```sql
SELECT AVG(MTTR) as MTTR_Promedio
FROM datos
WHERE MTTR > 0
  AND Actividad IN (actividades_ejecucion)
  AND [filtros globales]
GROUP BY MONTH(F_Fin_Real)
```

---

#### **KPI 13: Issues por Severidad (Shift Left)**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar | IN ("Analisis y Dimensionamiento", "Diseño de escenarios") |
| Issues Bloqueantes | Sumar | Σ (serie 1) |
| Issues Críticos | Sumar | Σ (serie 2) |
| Issues Altos | Sumar | Σ (serie 3) |
| Issues Menores | Sumar | Σ (serie 4) |
| F.Fin Real | Agrupar temporal | Mes/Año |

**Nota:** Este KPI genera 4 series de datos independientes

---

#### **KPI 14: Issues por Severidad (Ejecución)**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar | IN (Ciclos QA, UAT, Preprod, Smoke, Estabilización) |
| Issues [cada severidad] | Sumar | Σ por cada nivel |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 15: Issues No Resueltos**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Total de Issues no resueltos | Sumar | Σ |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

### **CATEGORÍA 3: EFECTIVIDAD**

#### **KPI 16: % Efectividad - Ciclo 1**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar | = "Pruebas QA Ciclo 1" |
| % Efectividad | Promediar | AVG WHERE > 0 |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 17: % Efectividad Promedio - Ciclos QA**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar | IN ("Pruebas QA Ciclo 1-15") |
| % Efectividad | Promediar | AVG WHERE > 0 |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 18: % Efectividad Promedio - UAT**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar | = "Pruebas UAT" |
| % Efectividad | Promediar | AVG WHERE > 0 |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

#### **KPI 19: % Efectividad Promedio - Ejecución**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar | IN (Ciclos QA, UAT, Preprod, Smoke, Estabilización) |
| % Efectividad | Promediar | AVG WHERE > 0 |
| F.Fin Real | Agrupar temporal | Mes/Año |

---

### **CATEGORÍA 4: DESVIACIONES**

#### **KPI 20: Horas de Desviación Total**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar | STARTS WITH "Retraso" |
| Horas | Sumar | Σ |
| F.Fin Real | Agrupar temporal | Mes/Año |

**Fórmula SQL Simplificada:**
```sql
SELECT SUM(Horas) as Horas_Desviacion
FROM datos
WHERE Actividad LIKE 'Retraso%'
  AND [filtros globales]
GROUP BY MONTH(F_Fin_Real)
```

---

#### **KPI 21: Horas de Desviación por Proyecto**
| Columna | Propósito | Operación |
|---------|-----------|-----------|
| Actividad | Filtrar | STARTS WITH "Retraso" |
| Proyecto | Agrupar | GROUP BY |
| Horas | Sumar | Σ por proyecto |

---

## 📊 Resumen de Uso por Columna

### **Columnas MÁS Utilizadas:**

| Columna | # KPIs | Criticidad | Observaciones |
|---------|--------|------------|---------------|
| **Actividad** | 21 | 🔴 CRÍTICA | Usada en TODOS los KPIs para filtrar |
| **F.Fin Real** | 18 | 🔴 CRÍTICA | Agrupación mensual + Gantt |
| **Issues [4 columnas]** | 9 | 🔴 CRÍTICA | Base de categoría Defectos |
| **Horas** | 2 | 🟡 Alta | Desviaciones |
| **% Efectividad** | 4 | 🟡 Alta | Categoría Efectividad |
| **CP [5 columnas]** | 6 | 🟡 Alta | Categoría Casos de Prueba |
| **MTTR** | 1 | 🟢 Media | KPI 12 |
| **Estado** | 21 | 🟢 Media | Filtro + Estado Proyecto |

### **Columnas SIN Uso en KPIs (pero usadas en otras partes):**

| Columna | Estado | Uso |
|---------|--------|-----|
| Dias | ❌ Sin uso en KPIs | Reservada para futuras métricas |
| F.inicio Plan | ✅ Usado en Gantt | Vista general de proyectos |
| F.inicio Real | ✅ Usado en Gantt | Vista detallada de actividades |
| F.Fin Plan | ✅ Usado en Gantt | Comparación plan vs real |

---

## 🔄 Dependencias entre Campos Calculados

### **Campo Calculado → KPIs Dependientes**

| Campo Calculado | Fórmula | KPIs que lo usan |
|----------------|---------|------------------|
| **Total de Issues** | Σ (4 severidades) | 7, 8, 9, 10, 11, 13, 14 |
| **Total Issues Shift Left** | Total Issues + Filtro Actividad | 7, 9, 13 |
| **Total Issues Ejecución** | Total Issues + Filtro Actividad | 8, 9, 10, 11, 14 |
| **Issues en Ciclos QA** | Total Issues WHERE Ciclos | 10 |
| **Issues en UAT** | Total Issues WHERE UAT | 10 |
| **Issues en Estabilización** | Total Issues WHERE Estabilización | 11 |
| **Horas de Desviación** | Σ Horas WHERE Retraso | 20, 21 |
| **Mes de Finalización** | MONTH(F.Fin Real) | 18 KPIs |
| **Estado del Proyecto** | ALL(Estado="Terminado") | Filtro Gantt |

---

## 🎯 Filtros Globales Aplicables

**Todos los KPIs respetan estos 5 filtros:**

1. **Año** → Filtro dropdown
2. **Cartera** → Filtro dropdown
3. **Subcartera** → Filtro multi-select
4. **Proyecto** → Filtro multi-select
5. **Estado** → Filtro checkbox (Terminado / En curso / Por iniciar)

**Aplicación en JavaScript:**
```javascript
let datosFiltrados = datos.filter(row => {
  return (
    (!filtroAño || row.Año === filtroAño) &&
    (!filtroCartera || row.Cartera === filtroCartera) &&
    (!filtroSubcartera.length || filtroSubcartera.includes(row.Subcartera)) &&
    (!filtroProyecto.length || filtroProyecto.includes(row.Proyecto)) &&
    (!filtroEstado.length || filtroEstado.includes(row.Estado))
  );
});
```

---

## ⚠️ Consideraciones de Implementación

### **1. Manejo de Valores Vacíos**
```javascript
// ✅ Correcto
const valor = parseInt(row.CP_Nuevos) || 0;
const porcentaje = parseFloat(row.Efectividad) || 0;

// ❌ Incorrecto
const valor = parseInt(row.CP_Nuevos); // Puede ser NaN
```

### **2. Filtros Exactos (NO usar "CONTIENE")**
```javascript
// ✅ Correcto - Comparación exacta
row.Actividad === "Diseño de escenarios"

// ❌ Incorrecto - Búsqueda parcial
row.Actividad.includes("Diseño") // Puede dar falsos positivos
```

### **3. Filtros con Lista (IN)**
```javascript
// ✅ Correcto
const ciclosQA = ["Pruebas QA Ciclo 1", "Pruebas QA Ciclo 2", /* ... */ "Pruebas QA Ciclo 15"];
const esCicloQA = ciclosQA.includes(row.Actividad);

// O generar dinámicamente:
const esCicloQA = row.Actividad.startsWith("Pruebas QA Ciclo");
```

### **4. Agrupación Mensual**
```javascript
// ✅ Correcto
const mes = new Date(row.F_Fin_Real).toISOString().slice(0, 7); // "2025-01"

// Para mostrar formato amigable:
const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const fecha = new Date(row.F_Fin_Real);
const mesTexto = `${meses[fecha.getMonth()]} ${fecha.getFullYear()}`; // "Ene 2025"
```

### **5. Cálculo de Escape Rates (IMPORTANTE)**
```javascript
// ✅ Correcto - Denominador es TODO el scope relevante
const totalCiclosQA = calcularTotalIssues(filasConCiclosQA);
const issuesUAT = calcularTotalIssues(filasUAT);
const escapeRateUAT = (issuesUAT / totalCiclosQA) * 100;

// ❌ Incorrecto - Denominador solo de filas filtradas
const denominador = calcularTotalIssues(filasFiltradas); // MAL
```

### **6. Promedios (excluir ceros)**
```javascript
// ✅ Correcto
const efectividades = datos
  .filter(row => row.Efectividad > 0) // Excluir ceros
  .map(row => row.Efectividad);
const promedio = efectividades.reduce((a, b) => a + b, 0) / efectividades.length;

// ❌ Incorrecto - Incluye ceros en promedio
const promedio = datos.reduce((sum, row) => sum + (row.Efectividad || 0), 0) / datos.length;
```

---

## 🔗 Documentos Relacionados

- **[01_Estructura_Excel.md](./01_Estructura_Excel.md)** - Definición de columnas
- **[02_Campos_Calculados.md](./02_Campos_Calculados.md)** - Campos derivados
- **[03_KPIs_Definiciones.md](./03_KPIs_Definiciones.md)** - Fórmulas completas de KPIs
- **[06_Especificaciones_Dashboard.md](./06_Especificaciones_Dashboard.md)** - Implementación de filtros
