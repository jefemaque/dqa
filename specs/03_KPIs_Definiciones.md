# 03 - KPIs: Definiciones y Fórmulas

**Última actualización:** 26 de octubre, 2025

---

## 📊 Resumen

Este documento define los **21 KPIs** del Dashboard QA con sus fórmulas detalladas, paso a paso. Se organizan en 4 categorías.

**Estado de Documentación:** ✅ **100% Completo**

---

## 📋 CATEGORÍA 1: CASOS DE PRUEBA (6 KPIs)

### **KPI 1: CP Diseñados**

**Definición:**  
Cantidad total de casos de prueba diseñados, sumando únicamente casos nuevos y modificados por proyecto.

**Fórmula:**
```javascript
CP Diseñados = Σ (CP Nuevos + CP Modificados)
WHERE Actividad = "Diseño de escenarios"
GROUP BY Proyecto
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` = "Diseño de escenarios" (exacto)
2. Por cada proyecto:
   - Por cada fila del proyecto: Sumar `CP Nuevos` + `CP Modificados`
   - Valores vacíos = `0`
3. Sumar todos los resultados por proyecto

**Columnas Requeridas:**
- `Proyecto`
- `Actividad`
- `CP Nuevos`
- `CP Modificados`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Proyecto: Monedero Bloqueado
  Fila 1: Diseño de escenarios, Nuevos=30, Modificados=20 → 50
  Fila 2: Pruebas QA Ciclo 1, Nuevos=10, Modificados=5 (IGNORADA)

Proyecto: Transferencias
  Fila 3: Diseño de escenarios, Nuevos=40, Modificados=15 → 55
-----------------------------------------------------------
CP Diseñados Total = 105 (50 + 55)
```

**Casos Especiales:**
- ❌ NO incluir CP Reutilizados (ese es un KPI independiente)
- Solo contar filas con `Actividad` = "Diseño de escenarios" (exacto)
- Si no hay filas de diseño → Resultado = `0`

**Tendencia:** ✅ Mensual (por F.Fin Real)  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Verde (#10b981)  
**Icono:** 📝 o `<FileText />`

---

### **KPI 2: CP Nuevos**

**Definición:**  
Cantidad de casos de prueba completamente nuevos diseñados.

**Fórmula:**
```javascript
CP Nuevos = Σ (CP Nuevos)
WHERE Actividad = "Diseño de escenarios"
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` = "Diseño de escenarios" (exacto)
2. Sumar la columna `CP Nuevos`
3. Valores vacíos = `0`

**Columnas Requeridas:**
- `Actividad`
- `CP Nuevos`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Fila 1: Diseño de escenarios, CP Nuevos=30
Fila 2: Diseño de escenarios, CP Nuevos=50
Fila 3: Pruebas QA Ciclo 1, CP Nuevos=10 (ignorada)
-----------------------------------------------------------
CP Nuevos = 80
```

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Azul (#3b82f6)  
**Icono:** ✨ o `<Plus />`

---

### **KPI 3: CP Modificados**

**Definición:**  
Cantidad de casos de prueba existentes que fueron modificados.

**Fórmula:**
```javascript
CP Modificados = Σ (CP Modificados)
WHERE Actividad = "Diseño de escenarios"
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` = "Diseño de escenarios" (exacto)
2. Sumar la columna `CP Modificados`
3. Valores vacíos = `0`

**Columnas Requeridas:**
- `Actividad`
- `CP Modificados`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Fila 1: Diseño de escenarios, CP Modificados=20
Fila 2: Diseño de escenarios, CP Modificados=10
-----------------------------------------------------------
CP Modificados = 30
```

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Cyan (#06b6d4)  
**Icono:** 🔄 o `<Edit />`

---

### **KPI 4: CP Reutilizados**

**Definición:**  
Cantidad de casos de prueba que fueron reutilizados de otros proyectos sin modificación.

**Fórmula:**
```javascript
CP Reutilizados = Σ (CP reutilizados)
WHERE Actividad = "Diseño de escenarios"
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` = "Diseño de escenarios" (exacto)
2. Sumar la columna `CP reutilizados`
3. Valores vacíos = `0`

**Columnas Requeridas:**
- `Actividad`
- `CP reutilizados`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Fila 1: Diseño de escenarios, CP Reutilizados=70
Fila 2: Diseño de escenarios, CP Reutilizados=40
-----------------------------------------------------------
CP Reutilizados = 110
```

**Nota:** KPI independiente, NO se suma en CP Diseñados

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Gris (#6b7280)  
**Icono:** ♻️ o `<Repeat />`

---

### **KPI 5: CP Automatizados**

**Definición:**  
Cantidad de casos de prueba que fueron automatizados.

**Fórmula:**
```javascript
CP Automatizados = Σ (CP Automatizados)
WHERE Actividad = "Diseño de escenarios"
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` = "Diseño de escenarios" (exacto)
2. Sumar la columna `CP Automatizados`
3. Valores vacíos = `0`

**Columnas Requeridas:**
- `Actividad`
- `CP Automatizados`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Fila 1: Diseño de escenarios, CP Automatizados=50
Fila 2: Diseño de escenarios, CP Automatizados=30
-----------------------------------------------------------
CP Automatizados = 80
```

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Púrpura (#8b5cf6)  
**Icono:** 🤖 o `<Zap />`

---

### **KPI 6: CP Ejecutados**

**Definición:**  
Cantidad total de casos de prueba ejecutados en todas las actividades de pruebas (ciclos QA, UAT, preproductivas y smoke productivo).

**Fórmula:**
```javascript
CP Ejecutados = Σ (CP Ejecutados)
WHERE Actividad IN (
  "Pruebas QA Ciclo 1" ... "Pruebas QA Ciclo 15",
  "Pruebas UAT",
  "Pruebas Preproductivas",
  "Smoke Productivo"
)
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` sea cualquiera de:
   - "Pruebas QA Ciclo 1" hasta "Pruebas QA Ciclo 15"
   - "Pruebas UAT"
   - "Pruebas Preproductivas"
   - "Smoke Productivo"
2. Sumar la columna `CP Ejecutados`
3. Valores vacíos = `0`

**Columnas Requeridas:**
- `Actividad`
- `CP Ejecutados`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Fila 1: Pruebas QA Ciclo 1, CP Ejecutados=120
Fila 2: Pruebas UAT, CP Ejecutados=100
Fila 3: Diseño de escenarios, CP Ejecutados=0 (ignorada)
-----------------------------------------------------------
CP Ejecutados = 220
```

**Nota:** Incluye TODOS los ciclos QA (1-15) + UAT + Preproductivas + Smoke

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Azul oscuro (#1e40af)  
**Icono:** ✅ o `<CheckCircle />`

---

## 🐛 CATEGORÍA 2: DEFECTOS (9 KPIs)

### **KPI 7: Total Issues Shift Left**

**Definición:**  
Cantidad total de defectos encontrados en fases tempranas (análisis y diseño) antes de la ejecución de pruebas.

**Fórmula:**
```javascript
Total Issues Shift Left = Σ (Issues Bloqueantes + Issues Críticos + Issues Altos + Issues Menores)
WHERE Actividad IN ("Analisis y Dimensionamiento", "Diseño de escenarios")
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` = "Analisis y Dimensionamiento" O "Diseño de escenarios"
2. Por cada fila:
   - Sumar: `Issues Bloqueantes` + `Issues Críticos` + `Issues Altos` + `Issues Menores`
   - Si algún valor está vacío, tratarlo como `0`
3. Sumar todos los resultados

**Columnas Requeridas:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Fila 1: Analisis y Dimensionamiento, Issues: 2+3+5+10 → 20
Fila 2: Diseño de escenarios, Issues: 1+2+3+8 → 14
Fila 3: Pruebas QA Ciclo 1, Issues: 5+10+15+20 → 50 (ignorada)
-----------------------------------------------------------
Total Issues Shift Left = 34
```

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Morado (#9333ea)  
**Icono:** 📋 o `<FileSearch />`

---

### **KPI 8: Total Issues en Ejecución**

**Definición:**  
Cantidad total de defectos encontrados durante la ejecución de pruebas.

**Fórmula:**
```javascript
Total Issues en Ejecución = Σ (Issues Bloqueantes + Issues Críticos + Issues Altos + Issues Menores)
WHERE Actividad IN (
  "Pruebas QA Ciclo 1" ... "Pruebas QA Ciclo 15",
  "Pruebas UAT",
  "Pruebas Preproductivas",
  "Smoke Productivo",
  "Estabilización Productiva"
)
```

**Cálculo Paso a Paso:**
1. Filtrar filas de actividades de ejecución
2. Por cada fila: Sumar todas las severidades
3. Sumar todos los resultados

**Columnas Requeridas:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Fila 1: Pruebas QA Ciclo 1, Issues: 5+10+15+20 → 50
Fila 2: Pruebas UAT, Issues: 2+3+5+8 → 18
Fila 3: Diseño de escenarios, Issues: 1+2+3+4 → 10 (ignorada)
-----------------------------------------------------------
Total Issues en Ejecución = 68
```

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Rojo (#ef4444)  
**Icono:** 🐛 o `<Bug />`

---

### **KPI 9: Total de Issues (Consolidado)**

**Definición:**  
Cantidad total de defectos encontrados en TODO el proyecto/periodo (Shift Left + Ejecución).

**Fórmula:**
```javascript
Total de Issues = Total Issues Shift Left + Total Issues en Ejecución
```

**Cálculo Paso a Paso:**
1. Calcular Total Issues Shift Left (KPI 7)
2. Calcular Total Issues en Ejecución (KPI 8)
3. Sumar ambos

**Columnas Requeridas:**
- Todas las columnas de Issues
- `Actividad`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Total Issues Shift Left: 34
Total Issues en Ejecución: 68
-----------------------------------------------------------
Total de Issues = 102
```

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card destacado + Gráfico de área apilada (2 series)  
**Color:** Rojo oscuro (#dc2626)  
**Series:**
- Shift Left: Morado
- Ejecución: Rojo

---

### **KPI 10: Escape Rate UAT**

**Definición:**  
Porcentaje de defectos que escaparon de los ciclos de QA y fueron detectados en UAT.

**Fórmula:**
```javascript
Escape Rate UAT = (Issues en UAT / Issues en Ciclos QA) × 100

Donde:
  Issues en UAT = Σ (Issues) WHERE Actividad = "Pruebas UAT"
  Issues en Ciclos QA = Σ (Issues) WHERE Actividad IN ("Pruebas QA Ciclo 1" ... "Pruebas QA Ciclo 15")
```

**Cálculo Paso a Paso:**
1. **Numerador:** Sumar todos los issues encontrados en "Pruebas UAT"
2. **Denominador:** Sumar todos los issues encontrados en "Pruebas QA Ciclo 1" hasta "Ciclo 15"
3. Dividir y multiplicar por 100

**Columnas Requeridas:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Issues en Ciclos QA:
  Ciclo 1: 15 issues
  Ciclo 2: 10 issues
  Ciclo 3: 8 issues
  Total Ciclos QA: 33 issues

Issues en UAT: 5 issues

-----------------------------------------------------------
Escape Rate UAT = (5 / 33) × 100 = 15.15% (🔴 Rojo)
```

**Semáforo:**
- 🟢 Verde: < 5%
- 🟡 Amarillo: 5% - 10%
- 🔴 Rojo: > 10%

**Casos Especiales:**
- Si Issues en Ciclos QA = 0 → Resultado = `0%`
- Si no hay filas de UAT → Issues en UAT = 0 → Resultado = `0%`

**Tendencia:** ✅ Mensual  
**Visualización:** Gauge (semicírculo) + Gráfico de línea con bandas

---

### **KPI 11: Escape Rate Productivo**

**Definición:**  
Porcentaje de defectos que escaparon de las pruebas previas y fueron detectados en la Estabilización Productiva.

**Fórmula:**
```javascript
Escape Rate Productivo = (Issues en Estabilización Productiva / Total Issues en Ejecución) × 100

Donde:
  Issues en Estabilización Productiva = Σ (Issues) WHERE Actividad = "Estabilización Productiva"
  Total Issues en Ejecución = Σ (Issues) de TODAS las actividades de ejecución (incluye Estabilización)
```

**Cálculo Paso a Paso:**
1. **Numerador:** Sumar todos los issues encontrados en "Estabilización Productiva"
2. **Denominador:** Sumar todos los issues de ejecución (Ciclos QA, UAT, Preprod, Smoke, Estabilización)
3. Dividir y multiplicar por 100

**Columnas Requeridas:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Issues en Ejecución:
  Ciclos QA (1-15): 45 issues
  UAT: 8 issues
  Preproductivas: 3 issues
  Smoke Productivo: 2 issues
  Estabilización Productiva: 2 issues
  Total en Ejecución: 60 issues

Issues en Estabilización Productiva: 2 issues

-----------------------------------------------------------
Escape Rate Productivo = (2 / 60) × 100 = 3.33% (🟡 Amarillo)
```

**Semáforo:**
- 🟢 Verde: < 2%
- 🟡 Amarillo: 2% - 5%
- 🔴 Rojo: > 5%

**Casos Especiales:**
- Si Total Issues en Ejecución = 0 → Resultado = `0%`
- Si no hay filas de Estabilización Productiva → Issues en Estabilización = 0 → Resultado = `0%`

**Nota:** 
- ❌ NO incluye Issues de Shift Left en el denominador
- ✅ SÍ incluye la Estabilización Productiva tanto en numerador como denominador

**Tendencia:** ✅ Mensual  
**Visualización:** Gauge (semicírculo) + Gráfico de línea con bandas

---

### **KPI 12: MTTR Promedio**

**Definición:**  
Tiempo medio de reparación (Mean Time To Repair) de defectos, expresado en días hábiles.

**Fórmula:**
```javascript
MTTR Promedio = PROMEDIO(MTTR) WHERE MTTR > 0
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `MTTR` > 0 (excluir vacíos y ceros)
2. Filtrar solo actividades de ejecución de pruebas
3. Calcular el promedio de los valores de `MTTR`
4. Redondear a 1 decimal

**Columnas Requeridas:**
- `MTTR`
- `Actividad`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Semáforo:**
- 🟢 Verde: < 3 días
- 🟡 Amarillo: 3 - 5 días
- 🔴 Rojo: > 5 días

**Ejemplo:**
```
Fila 1: MTTR = 2.5 días
Fila 2: MTTR = 3.0 días
Fila 3: MTTR = 0 (ignorada)
Fila 4: MTTR = 4.5 días
-----------------------------------------------------------
MTTR Promedio = (2.5 + 3.0 + 4.5) / 3 = 3.3 días (🟡 Amarillo)
```

**Casos Especiales:**
- Si no hay valores > 0 → Resultado = `0`
- ⚠️ **IMPORTANTE:** El campo `MTTR` ya viene pre-calculado en días hábiles desde la fuente

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de barras con línea de meta  
**Color:** Naranja (#f59e0b)  
**Formato:** X.X días

---

### **KPI 13: Issues por Severidad (Shift Left)**

**Definición:**  
Distribución de defectos por nivel de severidad en fases tempranas (Shift Left).

**Fórmula:**
```javascript
Bloqueantes = Σ (Issues Bloqueantes) WHERE Actividad IN ("Analisis y Dimensionamiento", "Diseño de escenarios")
Críticos = Σ (Issues Críticos) WHERE Actividad IN ("Analisis y Dimensionamiento", "Diseño de escenarios")
Altos = Σ (Issues Altos) WHERE Actividad IN ("Analisis y Dimensionamiento", "Diseño de escenarios")
Menores = Σ (Issues Menores) WHERE Actividad IN ("Analisis y Dimensionamiento", "Diseño de escenarios")
```

**Cálculo Paso a Paso:**
1. Filtrar actividades Shift Left
2. Sumar cada columna de severidad independientemente
3. Valores vacíos = `0`

**Columnas Requeridas:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Bloqueantes: 2
Críticos: 5
Altos: 12
Menores: 15
-----------------------------------------------------------
Total: 34 issues distribuidos por severidad
```

**Tendencia:** ✅ Mensual  
**Visualización:** Stacked Area Chart  
**Colores:**
- Menores: #a3e635 (Verde lima)
- Altos: #f59e0b (Naranja)
- Críticos: #ef4444 (Rojo)
- Bloqueantes: #991b1b (Rojo oscuro)

---

### **KPI 14: Issues por Severidad (Ejecución)**

**Definición:**  
Distribución de defectos por nivel de severidad durante ejecución de pruebas.

**Fórmula:**
```javascript
Bloqueantes = Σ (Issues Bloqueantes) WHERE Actividad = actividades de ejecución
Críticos = Σ (Issues Críticos) WHERE Actividad = actividades de ejecución
Altos = Σ (Issues Altos) WHERE Actividad = actividades de ejecución
Menores = Σ (Issues Menores) WHERE Actividad = actividades de ejecución
```

**Cálculo Paso a Paso:**
1. Filtrar actividades de ejecución (Ciclos QA, UAT, Preprod, Smoke, Estabilización)
2. Sumar cada columna de severidad independientemente
3. Valores vacíos = `0`

**Columnas Requeridas:**
- `Actividad`
- `Issues Bloqueantes`
- `Issues Críticos`
- `Issues Altos`
- `Issues Menores`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Bloqueantes: 5
Críticos: 15
Altos: 25
Menores: 23
-----------------------------------------------------------
Total: 68 issues distribuidos por severidad
```

**Tendencia:** ✅ Mensual  
**Visualización:** Stacked Area Chart  
**Colores:** Misma paleta que KPI 13

---

### **KPI 15: Issues No Resueltos**

**Definición:**  
Cantidad total de defectos que no fueron resueltos, independientemente de su severidad.

**Fórmula:**
```javascript
Issues No Resueltos = Σ (Total de Issues no resueltos)
```

**Cálculo Paso a Paso:**
1. Sumar la columna `Total de Issues no resueltos`
2. Valores vacíos = `0`

**Columnas Requeridas:**
- `Total de Issues no resueltos`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Fila 1: Issues no resueltos = 3
Fila 2: Issues no resueltos = 2
Fila 3: Issues no resueltos = 0
-----------------------------------------------------------
Issues No Resueltos = 5
```

**Nota:** Este campo es independiente de la severidad. Un issue no resuelto puede ser de cualquier nivel.

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea + área  
**Color:** Rojo oscuro (#dc2626)  
**Icono:** ⚠️ o `<AlertCircle />`

---

## 💼 CATEGORÍA 3: EFECTIVIDAD (4 KPIs)

### **KPI 16: % Efectividad - Ciclo 1**

**Definición:**  
Porcentaje de efectividad específico del primer ciclo de pruebas QA. Indicador clave de calidad en primera ejecución.

**Fórmula:**
```javascript
% Efectividad Ciclo 1 = PROMEDIO(% Efectividad) WHERE % Efectividad > 0 AND Actividad = "Pruebas QA Ciclo 1"
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` = "Pruebas QA Ciclo 1" (exacto)
2. Filtrar filas donde `% Efectividad` > 0 (excluir vacíos)
3. Calcular el promedio
4. Redondear a 1 decimal

**Columnas Requeridas:**
- `Actividad`
- `% Efectividad`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Semáforo:**
- 🟢 Verde: > 90%
- 🟡 Amarillo: 80% - 90%
- 🔴 Rojo: < 80%

**Ejemplo:**
```
Fila 1: Pruebas QA Ciclo 1, % Efectividad = 92%
Fila 2: Pruebas QA Ciclo 1, % Efectividad = 88%
Fila 3: Pruebas QA Ciclo 2, % Efectividad = 95% (ignorada)
-----------------------------------------------------------
% Efectividad Ciclo 1 = (92 + 88) / 2 = 90.0% (🟢 Verde)
```

**Nota:** Indicador clave de calidad en primera ejecución

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card destacado + Gráfico de línea  
**Color:** Naranja (#f59e0b)  
**Formato:** XX.X%

---

### **KPI 17: % Efectividad Promedio - Ciclos QA**

**Definición:**  
Porcentaje promedio de efectividad en todos los ciclos de pruebas QA (1-15).

**Fórmula:**
```javascript
% Efectividad Ciclos QA = PROMEDIO(% Efectividad) WHERE % Efectividad > 0
AND Actividad IN ("Pruebas QA Ciclo 1" ... "Pruebas QA Ciclo 15")
```

**Cálculo Paso a Paso:**
1. Filtrar filas de ciclos QA (1-15)
2. Filtrar donde `% Efectividad` > 0
3. Calcular el promedio
4. Redondear a 1 decimal

**Columnas Requeridas:**
- `Actividad`
- `% Efectividad`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Semáforo:**
- 🟢 Verde: > 90%
- 🟡 Amarillo: 80% - 90%
- 🔴 Rojo: < 80%

**Ejemplo:**
```
Ciclo 1: 92%
Ciclo 2: 88%
Ciclo 3: 95%
-----------------------------------------------------------
% Efectividad Ciclos QA = (92 + 88 + 95) / 3 = 91.7% (🟢 Verde)
```

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Azul (#3b82f6)  
**Formato:** XX.X%

---

### **KPI 18: % Efectividad Promedio - UAT**

**Definición:**  
Porcentaje promedio de efectividad en las pruebas de aceptación de usuario (UAT).

**Fórmula:**
```javascript
% Efectividad UAT = PROMEDIO(% Efectividad) WHERE % Efectividad > 0
AND Actividad = "Pruebas UAT"
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` = "Pruebas UAT"
2. Filtrar donde `% Efectividad` > 0
3. Calcular el promedio
4. Redondear a 1 decimal

**Columnas Requeridas:**
- `Actividad`
- `% Efectividad`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Semáforo:**
- 🟢 Verde: > 90%
- 🟡 Amarillo: 80% - 90%
- 🔴 Rojo: < 80%

**Ejemplo:**
```
Fila 1: Pruebas UAT, % Efectividad = 85%
Fila 2: Pruebas UAT, % Efectividad = 90%
-----------------------------------------------------------
% Efectividad UAT = (85 + 90) / 2 = 87.5% (🟡 Amarillo)
```

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Púrpura (#8b5cf6)  
**Formato:** XX.X%

---

### **KPI 19: % Efectividad Promedio - Ejecución**

**Definición:**  
Porcentaje promedio de efectividad consolidado de TODAS las actividades de ejecución de pruebas.

**Fórmula:**
```javascript
% Efectividad Ejecución = PROMEDIO(% Efectividad) WHERE % Efectividad > 0
AND Actividad IN (
  "Pruebas QA Ciclo 1" ... "Pruebas QA Ciclo 15",
  "Pruebas UAT",
  "Pruebas Preproductivas",
  "Smoke Productivo",
  "Estabilización Productiva"
)
```

**Cálculo Paso a Paso:**
1. Filtrar todas las actividades de ejecución
2. Filtrar donde `% Efectividad` > 0
3. Calcular el promedio general
4. Redondear a 1 decimal

**Columnas Requeridas:**
- `Actividad`
- `% Efectividad`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Semáforo:**
- 🟢 Verde: > 90%
- 🟡 Amarillo: 80% - 90%
- 🔴 Rojo: < 80%

**Ejemplo:**
```
Ciclos QA (1-15): 91.7%
UAT: 87.5%
Preproductivas: 93%
Smoke: 95%
-----------------------------------------------------------
% Efectividad Ejecución = (91.7 + 87.5 + 93 + 95) / 4 = 91.8% (🟢 Verde)
```

**Nota:** Promedio consolidado de TODAS las actividades de ejecución de pruebas

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de línea  
**Color:** Verde (#10b981)  
**Formato:** XX.X%

---

## 📉 CATEGORÍA 4: DESVIACIONES (2 KPIs)

### **KPI 20: Horas de Desviación Total**

**Definición:**  
Total de horas invertidas en actividades de desviación (retrabajos, cambios, problemas técnicos).

**Fórmula:**
```javascript
Horas de Desviación = Σ (Horas) WHERE Actividad STARTS WITH "Retraso"
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` comienza con "Retraso"
2. Sumar la columna `Horas` de las filas filtradas
3. Valores vacíos = `0`

**Columnas Requeridas:**
- `Actividad`
- `Horas`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Actividades incluidas:**
- "Retraso por definiciones Incompletas o Ambigüas"
- "Retraso po entrega tardía de desarrollo"
- "Retraso por indisponibilidad de ambientes"
- "Retraso por cambios en el alcance durante ciclo de pruebas"
- "Retraso por ineficiencias con el equipo de Pruebas"

**Ejemplo:**
```
Fila 1: Retraso por problema técnico, Horas = 40
Fila 2: Pruebas QA Ciclo 1, Horas = 120 (ignorada)
Fila 3: Retraso por Reasignación, Horas = 20
-----------------------------------------------------------
Horas de Desviación Total = 60 horas
```

**Tendencia:** ✅ Mensual  
**Visualización:** KPI Card + Gráfico de barras  
**Color:** Rojo (#ef4444)  
**Formato:** X,XXX hrs  
**Icono:** 📉 o `<TrendingDown />`

---

### **KPI 21: Horas de Desviación por Proyecto**

**Definición:**  
Distribución de horas de desviación agrupadas por proyecto.

**Fórmula:**
```javascript
Horas de Desviación por Proyecto = Σ (Horas) GROUP BY Proyecto
WHERE Actividad STARTS WITH "Retraso"
```

**Cálculo Paso a Paso:**
1. Filtrar filas donde `Actividad` comienza con "Retraso"
2. Agrupar por `Proyecto`
3. Sumar `Horas` por cada proyecto
4. Ordenar de mayor a menor (top proyectos)

**Columnas Requeridas:**
- `Proyecto`
- `Actividad`
- `Horas`

**Filtros Aplicables:**
- Cartera
- Subcartera
- Proyecto
- Año
- Estado

**Ejemplo:**
```
Proyecto: Monedero Bloqueado → 45 hrs de desviación
Proyecto: Transferencias → 30 hrs de desviación
Proyecto: Pagos móviles → 15 hrs de desviación
-----------------------------------------------------------
Total: 90 hrs distribuidas en proyectos
```

**Nota:** Permite identificar proyectos con más retrasos

**Tendencia:** ❌ No aplica (es distribución)  
**Visualización:** Bar Chart horizontal (top proyectos con más desviación)  
**Color:** Rojo con gradiente  
**Formato:** X,XXX hrs por proyecto

---

## 📊 Resumen de KPIs por Categoría

| Categoría | KPIs | Con Tendencia Mensual |
|-----------|------|----------------------|
| Casos de Prueba | 6 | 6 |
| Defectos | 9 | 7 |
| Efectividad | 4 | 4 |
| Desviaciones | 2 | 1 |
| **TOTAL** | **21** | **18** |

---

## 🔗 Documentos Relacionados

- **[02_Campos_Calculados.md](./02_Campos_Calculados.md)** - Campos derivados usados en KPIs
- **[04_KPIs_Visualizacion.md](./04_KPIs_Visualizacion.md)** - Cómo visualizar cada KPI
- **[05_Mapeo_Campos_Formulas.md](./05_Mapeo_Campos_Formulas.md)** - Dependencias de columnas
