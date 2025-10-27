# 02 - Campos Calculados

**Última actualización:** 26 de octubre, 2025

---

## 📊 Resumen

Este documento detalla los campos que **no vienen directamente del Excel**, sino que se calculan o agregan a partir de otros campos. Estos cálculos son esenciales para los KPIs del dashboard.

---

## 🧮 Campos Calculados Principales

### **1. Total de Issues**

**Descripción:**  
Suma de todos los defectos encontrados, agregando las 4 severidades.

**Fórmula:**
```
Total de Issues = Issues Bloqueantes + Issues Críticos + Issues Altos + Issues Menores
```

**Columnas Fuente:**
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Reglas:**
- Si alguna columna está vacía, se trata como `0`
- El resultado siempre es un número entero ≥ 0

**Ejemplo:**
```
Issues Bloqueantes: 2
Issues Críticos: 5
Issues Altos: 8
Issues Menores: 15
-------------------
Total de Issues: 30
```

**Usado en:**
- KPI 7: Total Issues Shift Left
- KPI 8: Total Issues en Ejecución
- KPI 9: Total de Issues Consolidado
- KPI 10: Escape Rate UAT
- KPI 11: Escape Rate Productivo
- KPI 13: Issues por Severidad (Shift Left)
- KPI 14: Issues por Severidad (Ejecución)

---

### **2. Total Issues Shift Left**

**Descripción:**  
Total de defectos encontrados en fases tempranas (análisis y diseño) antes de ejecución de pruebas.

**Fórmula:**
```
Total Issues Shift Left = Σ (Total de Issues)
WHERE Actividad IN ("Analisis y Dimensionamiento", "Diseño de escenarios")
```

**Columnas Fuente:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtro:**
- Solo filas donde `Actividad` = "Analisis y Dimensionamiento" O "Diseño de escenarios"

**Reglas:**
- Primero se calcula el Total de Issues por fila
- Luego se filtran solo las filas de análisis/diseño
- Finalmente se suman todos los issues

**Ejemplo:**
```
Fila 1: Actividad = "Analisis y Dimensionamiento", Total Issues = 5
Fila 2: Actividad = "Diseño de escenarios", Total Issues = 8
Fila 3: Actividad = "Pruebas QA Ciclo 1", Total Issues = 20 (ignorada)
-------------------
Total Issues Shift Left: 13 (solo fila 1 + fila 2)
```

**Usado en:**
- KPI 7: Total Issues Shift Left
- KPI 9: Total de Issues Consolidado
- KPI 13: Issues por Severidad (Shift Left)

---

### **3. Total Issues en Ejecución**

**Descripción:**  
Total de defectos encontrados durante la ejecución de pruebas.

**Fórmula:**
```
Total Issues en Ejecución = Σ (Total de Issues)
WHERE Actividad IN (
  "Pruebas QA Ciclo 1" ... "Pruebas QA Ciclo 15",
  "Pruebas UAT",
  "Pruebas Preproductivas",
  "Smoke Productivo",
  "Estabilización Productiva"
)
```

**Columnas Fuente:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtro:**
- Solo filas de actividades de ejecución de pruebas

**Reglas:**
- Similar al cálculo de Issues Shift Left pero con diferentes actividades
- Excluye retrasos y actividades de análisis/diseño

**Ejemplo:**
```
Fila 1: Actividad = "Pruebas QA Ciclo 1", Total Issues = 20
Fila 2: Actividad = "Pruebas UAT", Total Issues = 5
Fila 3: Actividad = "Diseño de escenarios", Total Issues = 8 (ignorada)
-------------------
Total Issues en Ejecución: 25
```

**Usado en:**
- KPI 8: Total Issues en Ejecución
- KPI 9: Total de Issues Consolidado
- KPI 10: Escape Rate UAT (denominador)
- KPI 11: Escape Rate Productivo (denominador)
- KPI 14: Issues por Severidad (Ejecución)

---

### **4. Issues en Ciclos QA**

**Descripción:**  
Cantidad de defectos encontrados específicamente en los ciclos de QA (1-15).

**Fórmula:**
```
Issues en Ciclos QA = Σ (Total de Issues)
WHERE Actividad IN ("Pruebas QA Ciclo 1", "Pruebas QA Ciclo 2", ..., "Pruebas QA Ciclo 15")
```

**Columnas Fuente:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtro:**
- Solo filas donde `Actividad` contiene "Pruebas QA Ciclo"

**Ejemplo:**
```
Fila 1: Actividad = "Pruebas QA Ciclo 1", Total Issues = 15
Fila 2: Actividad = "Pruebas QA Ciclo 2", Total Issues = 10
Fila 3: Actividad = "Pruebas UAT", Total Issues = 5 (ignorada)
-------------------
Issues en Ciclos QA: 25
```

**Usado en:**
- KPI 10: Escape Rate UAT (denominador)

---

### **5. Issues en UAT**

**Descripción:**  
Cantidad de defectos encontrados específicamente en la actividad de Pruebas UAT.

**Fórmula:**
```
Issues en UAT = Σ (Total de Issues) WHERE Actividad = "Pruebas UAT"
```

**Columnas Fuente:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtro:**
- Solo filas donde `Actividad` = "Pruebas UAT" (exacto)

**Ejemplo:**
```
Fila 1: Actividad = "Pruebas UAT", Total Issues = 10
Fila 2: Actividad = "Pruebas QA Ciclo 1", Total Issues = 20 (ignorada)
Fila 3: Actividad = "Pruebas UAT", Total Issues = 5
-------------------
Issues en UAT: 15 (solo filas UAT)
```

**Usado en:**
- KPI 10: Escape Rate UAT (numerador)

---

### **6. Issues en Estabilización Productiva**

**Descripción:**  
Cantidad de defectos encontrados en el ambiente productivo durante estabilización.

**Fórmula:**
```
Issues en Estabilización Productiva = Σ (Total de Issues)
WHERE Actividad = "Estabilización Productiva"
```

**Columnas Fuente:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtro:**
- Solo filas donde `Actividad` = "Estabilización Productiva" (exacto)

**Ejemplo:**
```
Fila 1: Actividad = "Estabilización Productiva", Total Issues = 3
Fila 2: Actividad = "Pruebas UAT", Total Issues = 20 (ignorada)
-------------------
Issues en Estabilización Productiva: 3
```

**Usado en:**
- KPI 11: Escape Rate Productivo (numerador)

---

### **7. Horas de Desviación**

**Descripción:**  
Total de horas invertidas en actividades de desviación (retrabajos, cambios, problemas técnicos).

**Fórmula:**
```
Horas de Desviación = Σ (Horas) WHERE Actividad STARTS WITH "Retraso"
```

**Columnas Fuente:**
- `Actividad`
- `Horas`

**Filtro:**
- Solo filas donde `Actividad` comienza con "Retraso"

**Actividades de Desviación:**
- "Retraso por definiciones Incompletas o Ambigüas"
- "Retraso po entrega tardía de desarrollo"
- "Retraso por indisponibilidad de ambientes"
- "Retraso por cambios en el alcance durante ciclo de pruebas"
- "Retraso por ineficiencias con el equipo de Pruebas"

**Reglas:**
- Se usa búsqueda por prefijo "Retraso"
- Si `Horas` está vacío, se trata como `0`

**Ejemplo:**
```
Fila 1: Actividad = "Retraso por problema técnico...", Horas = 40
Fila 2: Actividad = "Pruebas QA Ciclo 1", Horas = 120 (ignorada)
Fila 3: Actividad = "Retraso por Reasignación...", Horas = 20
-------------------
Horas de Desviación: 60 (solo filas de retraso)
```

**Usado en:**
- KPI 20: Horas de Desviación Total
- KPI 21: Horas de Desviación por Proyecto

---

### **8. MTTR Promedio**

**Descripción:**  
Tiempo medio de reparación de defectos, calculado como el promedio de los valores de MTTR.

**Fórmula:**
```
MTTR Promedio = PROMEDIO(MTTR) WHERE MTTR > 0
```

**Columnas Fuente:**
- `MTTR`

**Filtro:**
- Solo actividades de ejecución de pruebas
- Solo valores > 0 (excluir vacíos y ceros)

**Reglas:**
- **IMPORTANTE:** La columna MTTR ya viene pre-calculada en **días hábiles** desde la fuente
- Solo se promedian valores > 0
- El resultado se expresa en días hábiles con 1 decimal

**Ejemplo:**
```
Fila 1: MTTR = 2.5 días (Pruebas QA Ciclo 1)
Fila 2: MTTR = 3.0 días (Pruebas UAT)
Fila 3: MTTR = 0 (vacío, se ignora)
Fila 4: MTTR = 4.5 días (Estabilización Productiva)
-------------------
MTTR Promedio: (2.5 + 3.0 + 4.5) / 3 = 3.3 días
```

**Usado en:**
- KPI 12: MTTR Promedio

---

### **9. Estado del Proyecto (CAMPO CALCULADO MUY IMPORTANTE)**

**Descripción:**  
Determina si un proyecto está concluido o en curso basándose en el estado de TODAS sus actividades.

**Fórmula:**
```javascript
Estado del Proyecto = {
  SI todas las actividades del proyecto tienen Estado = "Terminado"
    ENTONCES → "Concluido"
  SI NO
    ENTONCES → "En Curso"
}
```

**Columnas Fuente:**
- `Proyecto`
- `Estado` (de actividad)

**Reglas:**
- Un proyecto solo está **Concluido** si TODAS sus actividades están "Terminado"
- Si AL MENOS UNA actividad tiene Estado ≠ "Terminado" → Proyecto "En Curso"
- Estados posibles de actividad: "Terminado", "En curso", "Por iniciar"

**Lógica de Implementación:**
```javascript
function calcularEstadoProyecto(proyecto, datos) {
  const actividadesDelProyecto = datos.filter(row => 
    row.Proyecto === proyecto
  );
  
  const todasTerminadas = actividadesDelProyecto.every(
    actividad => actividad.Estado === "Terminado"
  );
  
  return todasTerminadas ? "Concluido" : "En Curso";
}
```

**Ejemplos:**

**Ejemplo 1: Proyecto Concluido**
```
Proyecto: Monedero Bloqueado
  - Analisis y Dimensionamiento → Terminado ✅
  - Diseño de escenarios → Terminado ✅
  - Pruebas QA Ciclo 1 → Terminado ✅
  - Pruebas UAT → Terminado ✅
  
Estado del Proyecto: ✅ CONCLUIDO
```

**Ejemplo 2: Proyecto En Curso**
```
Proyecto: Transferencias
  - Analisis y Dimensionamiento → Terminado ✅
  - Diseño de escenarios → Terminado ✅
  - Pruebas QA Ciclo 1 → Terminado ✅
  - Pruebas UAT → En curso ⏳  ← AL MENOS UNA NO TERMINADA
  
Estado del Proyecto: ⏳ EN CURSO
```

**Ejemplo 3: Proyecto En Curso (con actividad por iniciar)**
```
Proyecto: Pagos móviles
  - Analisis y Dimensionamiento → Terminado ✅
  - Diseño de escenarios → En curso ⏳
  - Pruebas QA Ciclo 1 → Por iniciar 📅  ← AL MENOS UNA NO TERMINADA
  
Estado del Proyecto: ⏳ EN CURSO
```

**Usado en:**
- Filtro Global de Estado (a nivel proyecto)
- Sección Gantt (para colorear proyectos)
- Análisis de proyectos completados

---

### **10. Mes de Finalización**

**Descripción:**  
Extrae el mes y año de la columna `F.Fin Real` para agrupar datos mensualmente.

**Fórmula:**
```
Mes = MONTH(F.Fin Real)
Año = YEAR(F.Fin Real)
Formato: "YYYY-MM" (ej: "2025-01")
```

**Columna Fuente:**
- `F.Fin Real`

**Reglas:**
- Si `F.Fin Real` está vacía, el registro no se incluye en tendencias mensuales
- Se usa para todas las agregaciones de tendencia mensual

**Ejemplo:**
```
F.Fin Real: 16/01/2025
-------------------
Mes: 01
Año: 2025
Formato Dashboard: "Enero 2025" o "2025-01"
```

**Usado en:**
- Todos los KPIs con tendencia mensual (18 KPIs)
- Sección de Tendencias Mensuales

---

## 📊 Tabla Resumen de Campos Calculados

| Campo Calculado | Columnas Fuente | Filtro de Actividad | Usa en # KPIs |
|----------------|-----------------|---------------------|---------------|
| Total de Issues | 4 columnas Issues | - | 7 |
| Total Issues Shift Left | Total Issues + Actividad | Análisis, Diseño | 3 |
| Total Issues Ejecución | Total Issues + Actividad | Ciclos QA, UAT, Preprod, Smoke, Estabilización | 5 |
| Issues en Ciclos QA | Total Issues + Actividad | Pruebas QA Ciclo 1-15 | 1 |
| Issues en UAT | Total Issues + Actividad | = "Pruebas UAT" | 1 |
| Issues en Estabilización | Total Issues + Actividad | = "Estabilización Productiva" | 1 |
| Horas de Desviación | Horas + Actividad | STARTS WITH "Retraso" | 2 |
| MTTR Promedio | MTTR | > 0, solo ejecución | 1 |
| Estado del Proyecto | Estado + Proyecto | - | Filtro |
| Mes de Finalización | F.Fin Real | - | 18 |

---

## ⚠️ Consideraciones Importantes

1. **MTTR viene pre-calculado:** No se calcula en el dashboard, solo se promedia
2. **Estado del Proyecto es calculado:** El Excel solo tiene "Estado" a nivel de actividad
3. **Filtros globales:** Todos los campos calculados respetan los filtros de Cartera, Proyecto, Año, Estado
4. **Valores vacíos:** Siempre se tratan como `0` en sumas, pero se excluyen en promedios
5. **Comparaciones exactas:** Usar `=` en lugar de `CONTIENE` para actividades del catálogo

---

## 🔗 Documentos Relacionados

- **[01_Estructura_Excel.md](./01_Estructura_Excel.md)** - Columnas fuente del Excel
- **[03_KPIs_Definiciones.md](./03_KPIs_Definiciones.md)** - Uso en KPIs específicos
- **[05_Mapeo_Campos_Formulas.md](./05_Mapeo_Campos_Formulas.md)** - Dependencias detalladas
