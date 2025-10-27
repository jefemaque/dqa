# 01 - Estructura del Archivo Excel

**Última actualización:** 26 de octubre, 2025

---

## 📋 Resumen

El archivo Excel contiene **24 columnas** que registran información de proyectos QA, incluyendo:
- Datos de identificación (Cartera, Proyecto, Actividad)
- Fechas de planificación y ejecución
- Métricas de casos de prueba
- Métricas de defectos
- Esfuerzo y desviaciones

---

## 📊 Columnas del Excel

### **Sección 1: Identificación y Clasificación**

| # | Columna | Tipo | Requerida | Descripción |
|---|---------|------|-----------|-------------|
| 1 | **Cartera** | Texto | ✅ Sí | Agrupación principal de proyectos (ej: "Banca Digital", "Punto de Venta", "E-commerce") |
| 2 | **Subcartera** | Texto | ⚠️ Opcional | Subagrupación dentro de una cartera (actualmente sin datos) |
| 3 | **Proyecto** | Texto | ✅ Sí | Nombre específico del proyecto |
| 4 | **Actividad** | Texto (catálogo) | ✅ Sí | Tipo de actividad realizada (ver catálogo completo abajo) |
| 5 | **Estado** | Texto (catálogo) | ✅ Sí | Estado de la actividad: "Terminado", "En curso" o "Por iniciar" |
| 6 | **Año** | Número | ✅ Sí | Año de ejecución (ej: 2025) |

---

### **Sección 2: Esfuerzo y Tiempo**

| # | Columna | Tipo | Requerida | Descripción |
|---|---------|------|-----------|-------------|
| 7 | **Horas** | Número | ✅ Sí | Horas de esfuerzo invertidas en la actividad |
| 8 | **Dias** | Número | ⚠️ Opcional | Días hábiles de duración de la actividad (NO está relacionado con MTTR) |

---

### **Sección 3: Fechas de Planificación y Ejecución**

| # | Columna | Tipo | Requerida | Descripción |
|---|---------|------|-----------|-------------|
| 9 | **F.inicio Plan** | Fecha | ✅ Sí | Fecha de inicio planificada |
| 10 | **F.inicio Real** | Fecha | ✅ Sí | Fecha de inicio real |
| 11 | **F.Fin Plan** | Fecha | ✅ Sí | Fecha de fin planificada |
| 12 | **F.Fin Real** | Fecha | ✅ Sí | Fecha de fin real (usada para agregación mensual y Gantt) |
| 13 | **% Efectividad** | Número | ⚠️ Opcional | Porcentaje de efectividad de la actividad (0-100) |

---

### **Sección 4: Casos de Prueba (CP)**

| # | Columna | Tipo | Requerida | Descripción |
|---|---------|------|-----------|-------------|
| 14 | **CP Nuevos** | Número | ⚠️ Opcional | Cantidad de casos de prueba nuevos diseñados |
| 15 | **CP Modificados** | Número | ⚠️ Opcional | Cantidad de casos de prueba modificados |
| 16 | **CP reutilizados** | Número | ⚠️ Opcional | Cantidad de casos de prueba reutilizados de otros proyectos |
| 17 | **CP Automatizados** | Número | ⚠️ Opcional | Cantidad de casos de prueba automatizados |
| 18 | **CP Ejecutados** | Número | ⚠️ Opcional | Cantidad de casos de prueba ejecutados |

---

### **Sección 5: Defectos (Issues)**

| # | Columna | Tipo | Requerida | Descripción |
|---|---------|------|-----------|-------------|
| 19 | **Issues Bloqueantes** | Número | ⚠️ Opcional | Defectos de severidad bloqueante |
| 20 | **Issues Críticos** | Número | ⚠️ Opcional | Defectos de severidad crítica |
| 21 | **Issues Altos** | Número | ⚠️ Opcional | Defectos de severidad alta |
| 22 | **Issues Menores** | Número | ⚠️ Opcional | Defectos de severidad menor |
| 23 | **Total de Issues no resueltos** | Número | ⚠️ Opcional | Cantidad de issues que no fueron resueltos (independiente de severidad) |

---

### **Sección 6: Métricas de Corrección**

| # | Columna | Tipo | Requerida | Descripción |
|---|---------|------|-----------|-------------|
| 24 | **MTTR** | Número | ⚠️ Opcional | Mean Time To Repair - Tiempo medio de reparación en **días hábiles** (pre-calculado, independiente de columna "Dias") |

---

## 📚 Catálogo COMPLETO de Actividades

⚠️ **IMPORTANTE:** El campo "Actividad" es un **catálogo cerrado** con exactamente 24 opciones. No es texto libre.

### **Análisis y Diseño (3 actividades):**
1. `Analisis y Dimensionamiento`
2. `Diseño de escenarios`
3. `Datos, Insumos y Ambientes`

### **Ciclos de Pruebas QA (15 actividades):**
4. `Pruebas QA Ciclo 1`
5. `Pruebas QA Ciclo 2`
6. `Pruebas QA Ciclo 3`
7. `Pruebas QA Ciclo 4`
8. `Pruebas QA Ciclo 5`
9. `Pruebas QA Ciclo 6`
10. `Pruebas QA Ciclo 7`
11. `Pruebas QA Ciclo 8`
12. `Pruebas QA Ciclo 9`
13. `Pruebas QA Ciclo 10`
14. `Pruebas QA Ciclo 11`
15. `Pruebas QA Ciclo 12`
16. `Pruebas QA Ciclo 13`
17. `Pruebas QA Ciclo 14`
18. `Pruebas QA Ciclo 15`

### **Pruebas Adicionales (4 actividades):**
19. `Pruebas UAT`
20. `Pruebas Preproductivas`
21. `Smoke Productivo`
22. `Estabilización Productiva`

### **Retrasos/Desviaciones (5 actividades):**
23. `Retraso por definiciones Incompletas o Ambigüas`
24. `Retraso po entrega tardía de desarrollo`
25. `Retraso por indisponibilidad de ambientes`
26. `Retraso por cambios en el alcance durante ciclo de pruebas`
27. `Retraso por ineficiencias con el equipo de Pruebas`

---

## 📊 Catálogo de Estados

⚠️ **IMPORTANTE:** El campo "Estado" es un **catálogo cerrado** con exactamente 3 opciones.

Estados posibles:
1. `Terminado`
2. `En curso`
3. `Por iniciar`

**Nota:** El "Estado del Proyecto" es un campo CALCULADO (ver `02_Campos_Calculados.md`)

---

## 📊 Catálogo de Carteras

Carteras identificadas en los datos:
- `Banca Digital`
- `Punto de Venta`
- `E-commerce`
- `COE Retail`

---

## ⚠️ Reglas de Datos

### **Valores Vacíos:**
- **Columnas numéricas:** Si están vacías, se tratan como `0` en los cálculos
- **Columnas de texto:** Si están vacías, se tratan como cadena vacía `""`

### **Formato de Fechas:**
- Formato recomendado: `DD/MM/YYYY` o formato Excel estándar
- La columna **F.Fin Real** es clave para:
  - Agregaciones mensuales
  - Vista de Gantt
  - Determinación de estado del proyecto

### **Rangos de Valores:**
- **% Efectividad:** Entre 0 y 100
- **Horas:** Valores positivos
- **Dias:** Valores positivos (días hábiles)
- **CP (todas las columnas):** Valores enteros positivos o 0
- **Issues (todas las columnas):** Valores enteros positivos o 0
- **MTTR:** Valores positivos (días hábiles)

---

## 🔍 Notas Importantes

1. **Subcartera** actualmente está vacía pero se reserva para futuras agrupaciones
2. **Dias** representa días hábiles de duración de cada actividad (NO confundir con MTTR)
3. **MTTR** viene pre-calculado en días hábiles desde la fuente de datos y es independiente de la columna "Dias"
4. Las columnas de **CP** solo tienen valores en filas donde `Actividad` = "Diseño de escenarios"
5. Las columnas de **Issues** pueden tener valores en cualquier actividad, pero se segmentan en:
   - **Issues Shift Left:** "Analisis y Dimensionamiento" y "Diseño de escenarios"
   - **Issues Ejecución:** Todos los ciclos QA, UAT, Preproductivas, Smoke, Estabilización
6. La columna **Horas** se usa tanto para esfuerzo normal como para desviaciones
7. **Actividad** y **Estado** son campos de catálogo cerrado (no texto libre)

---

## 📝 Ejemplo de Registro

```
Cartera: Banca Digital
Subcartera: (vacío)
Proyecto: Monedero Bloqueado
Actividad: Pruebas QA Ciclo 1
Estado: Terminado
Año: 2025
Horas: 120
Dias: 10
F.inicio Plan: 01/01/2025
F.inicio Real: 02/01/2025
F.Fin Plan: 15/01/2025
F.Fin Real: 16/01/2025
% Efectividad: 95
CP Nuevos: 0
CP Modificados: 0
CP reutilizados: 0
CP Automatizados: 0
CP Ejecutados: 120
Issues Bloqueantes: 2
Issues Críticos: 5
Issues Altos: 8
Issues Menores: 15
Total de Issues no resueltos: 3
MTTR: 2.5
```

---

## 🔗 Documentos Relacionados

- **[02_Campos_Calculados.md](./02_Campos_Calculados.md)** - Cómo se calculan campos derivados
- **[03_KPIs_Definiciones.md](./03_KPIs_Definiciones.md)** - Uso de estas columnas en KPIs
- **[05_Mapeo_Campos_Formulas.md](./05_Mapeo_Campos_Formulas.md)** - Relación columnas → KPIs
