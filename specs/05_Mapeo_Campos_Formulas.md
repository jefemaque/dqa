# 05 - Mapeo de Campos y Fórmulas

**Última actualización:** 27 de octubre, 2025

---

## 📋 Resumen

Este documento mapea la **relación entre las 24 columnas del Excel y los 21 KPIs**, mostrando qué columnas utiliza cada KPI en su cálculo.

---

## 📊 Matriz: KPIs × Columnas

| KPI | Columnas Utilizadas | Filtro/Condición |
|-----|---------------------|------------------|
| **1. CP Diseñados** | CP Nuevos, CP Modificados | Actividad = "Diseño de escenarios" |
| **2. CP Nuevos** | CP Nuevos | Actividad = "Diseño de escenarios" |
| **3. CP Modificados** | CP Modificados | Actividad = "Diseño de escenarios" |
| **4. CP Reutilizados** | CP reutilizados | Actividad = "Diseño de escenarios" |
| **5. CP Automatizados** | CP Automatizados | Actividad = "Diseño de escenarios" |
| **6. CP Ejecutados** | CP Ejecutados | Todas las actividades |
| **7. Total Issues SL** | Issues Bloqueantes, Issues Críticos, Issues Altos, Issues Menores | Actividad = "Analisis y Dimensionamiento" o "Diseño de escenarios" |
| **8. Total Issues Ejec** | Issues Bloqueantes, Issues Críticos, Issues Altos, Issues Menores | Actividad = Ciclos QA, UAT, Preproductivas, Smoke, Estabilización |
| **9. Total Issues** | Issues Bloqueantes, Issues Críticos, Issues Altos, Issues Menores | Todas las actividades |
| **10. Escape Rate UAT** | Issues Bloqueantes, Issues Críticos, Issues Altos, Issues Menores | Numerador: UAT / Denominador: Ciclos QA |
| **11. Escape Rate Prod** | Issues Bloqueantes, Issues Críticos, Issues Altos, Issues Menores | Numerador: Estabilización / Denominador: Ejecución |
| **12. MTTR Promedio** | MTTR | Todas donde MTTR > 0 |
| **13. Issues Sev SL** | Issues Bloqueantes, Issues Críticos, Issues Altos, Issues Menores | Actividad = "Analisis y Dimensionamiento" o "Diseño de escenarios" |
| **14. Issues Sev Ejec** | Issues Bloqueantes, Issues Críticos, Issues Altos, Issues Menores | Actividad = Ciclos QA, UAT, Preproductivas, Smoke, Estabilización |
| **15. Issues No Resueltos** | Total de Issues no resueltos | Todas las actividades |
| **16. Efectividad Ciclo 1** | % Efectividad | Actividad = "Pruebas QA Ciclo 1" |
| **17. Efectividad Ciclos QA** | % Efectividad | Actividad contiene "Pruebas QA Ciclo" |
| **18. Efectividad UAT** | % Efectividad | Actividad = "Pruebas UAT" |
| **19. Efectividad Ejecución** | % Efectividad | Actividad = Ciclos QA, UAT, Preproductivas, Smoke, Estabilización |
| **20. Horas Desviación** | Horas | Actividad contiene "Retraso" |
| **21. Composición Desv** | Horas, Actividad | Actividad contiene "Retraso" (desglosado por tipo) |

---

## 📑 Por Columna: ¿Qué KPIs la usan?

### **Columnas de Identificación:**
- **Cartera, Proyecto:** Usadas para filtros globales
- **Actividad:** Usada como filtro en TODOS los KPIs
- **Estado:** Usado para filtros y cálculo de Estado del Proyecto
- **Año:** Usado para filtros globales

### **Columnas de Esfuerzo:**
- **Horas:** KPI 20, KPI 21
- **Dias:** NO usado en KPIs (reservado)

### **Columnas de Fechas:**
- **F.Fin Real:** Usada para agregaciones mensuales en TODOS los KPIs
- **F.inicio Real, F.Fin Plan, F.inicio Plan:** Usadas en Gantt y cálculos de desviación

### **Columnas de CP:**
- **CP Nuevos:** KPI 1, KPI 2
- **CP Modificados:** KPI 1, KPI 3
- **CP reutilizados:** KPI 4
- **CP Automatizados:** KPI 5
- **CP Ejecutados:** KPI 6

### **Columnas de % Efectividad:**
- **% Efectividad:** KPI 16, KPI 17, KPI 18, KPI 19

### **Columnas de Issues:**
- **Issues Bloqueantes:** KPI 7-15
- **Issues Críticos:** KPI 7-15
- **Issues Altos:** KPI 7-15
- **Issues Menores:** KPI 7-15
- **Total de Issues no resueltos:** KPI 15

### **Columnas de MTTR:**
- **MTTR:** KPI 12

---

## 🔗 Documentos Relacionados

- **[01_Estructura_Excel.md](./01_Estructura_Excel.md)** - Definición de columnas
- **[03_KPIs_Definiciones.md](./03_KPIs_Definiciones.md)** - Fórmulas detalladas
