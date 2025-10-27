# 06 - Especificaciones del Dashboard QA

**Última actualización:** 26 de octubre, 2025

---

## 📊 Resumen

Este documento define las especificaciones completas del Dashboard QA, incluyendo:
- Estructura y layout
- Filtros globales
- Secciones y organización
- Sección Gantt (collapsible)
- Interactividad y UX

---

## 🎯 Objetivo del Dashboard

Proporcionar una vista consolidada y en tiempo real de las métricas de QA, permitiendo:
- Monitoreo de casos de prueba
- Seguimiento de defectos (Issues)
- Análisis de efectividad
- Identificación de desviaciones
- Visualización temporal de proyectos y actividades

---

## 🔍 Filtros Globales

### **5 Filtros Principales:**

#### **1. Año**
- **Tipo:** Dropdown (single select)
- **Valores:** Lista única de años presentes en los datos
- **Por defecto:** Año actual
- **Comportamiento:** Filtra todos los KPIs y visualizaciones

#### **2. Cartera**
- **Tipo:** Dropdown (single select)
- **Valores:** Lista única de carteras
  - Banca Digital
  - Punto de Venta
  - E-commerce
  - COE Retail
- **Por defecto:** "Todas"
- **Comportamiento:** 
  - Filtra todos los datos
  - Actualiza opciones de Subcartera

#### **3. Subcartera**
- **Tipo:** Multi-select con checkboxes
- **Valores:** Lista única de subcarteras (dependiente de Cartera)
- **Por defecto:** Todas seleccionadas
- **Comportamiento:** 
  - Habilitado solo si hay datos de Subcartera
  - Actualiza opciones de Proyecto

#### **4. Proyecto**
- **Tipo:** Multi-select con checkboxes
- **Valores:** Lista única de proyectos (dependiente de Cartera y Subcartera)
- **Por defecto:** Todos seleccionados
- **Comportamiento:** 
  - Permite selección múltiple
  - Afecta el comportamiento del Gantt (vista general vs detallada)

#### **5. Estado**
- **Tipo:** Checkboxes múltiples
- **Valores:**
  - ☑️ Terminado
  - ☑️ En curso
  - ☑️ Por iniciar
- **Por defecto:** Todos seleccionados
- **Comportamiento:** 
  - Filtra por estado de actividad
  - Calcula Estado del Proyecto dinámicamente

---

### **Comportamiento de Filtros (Cascada)**

```
Año
  ↓
Cartera → Subcartera → Proyecto
              ↓           ↓
            Estado ← ← ← ← ←
```

**Reglas:**
1. Al cambiar **Cartera**, se actualizan las opciones de **Subcartera** y **Proyecto**
2. Al cambiar **Subcartera**, se actualizan las opciones de **Proyecto**
3. **Estado** es independiente pero afecta el cálculo de Estado del Proyecto
4. Los filtros se aplican en **tiempo real** (sin botón "Aplicar")
5. Los filtros persisten en **localStorage**

---

### **UI de Filtros**

```jsx
<div className="bg-white p-6 rounded-xl shadow-md mb-6">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
    
    {/* Filtro Año */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Año
      </label>
      <Select value={año} onChange={handleAñoChange}>
        <option value="">Todos</option>
        {años.map(a => <option key={a} value={a}>{a}</option>)}
      </Select>
    </div>

    {/* Filtro Cartera */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Cartera
      </label>
      <Select value={cartera} onChange={handleCarteraChange}>
        <option value="">Todas</option>
        {carteras.map(c => <option key={c} value={c}>{c}</option>)}
      </Select>
    </div>

    {/* Filtro Subcartera */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Subcartera
      </label>
      <MultiSelect
        options={subcarteras}
        selected={subcarterasSeleccionadas}
        onChange={handleSubcarteraChange}
        placeholder="Seleccionar..."
      />
    </div>

    {/* Filtro Proyecto */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Proyecto
      </label>
      <MultiSelect
        options={proyectos}
        selected={proyectosSeleccionados}
        onChange={handleProyectoChange}
        placeholder="Seleccionar..."
      />
    </div>

    {/* Filtro Estado */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Estado
      </label>
      <div className="space-y-2">
        <Checkbox 
          checked={estados.terminado}
          onChange={() => toggleEstado('terminado')}
          label="Terminado"
        />
        <Checkbox 
          checked={estados.enCurso}
          onChange={() => toggleEstado('enCurso')}
          label="En curso"
        />
        <Checkbox 
          checked={estados.porIniciar}
          onChange={() => toggleEstado('porIniciar')}
          label="Por iniciar"
        />
      </div>
    </div>

  </div>
</div>
```

---

## 📐 Layout del Dashboard

### **Estructura General**

```
┌────────────────────────────────────────────────────────────┐
│  HEADER: Logo + Título + Filtros Globales                  │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  SECCIÓN 1: CASOS DE PRUEBA (6 KPIs)                      │
│  Grid 3 columnas × 2 filas                                 │
│  ┌──────────┬──────────┬──────────┐                       │
│  │ Diseñados│  Nuevos  │Modificados│                       │
│  ├──────────┼──────────┼──────────┤                       │
│  │Reutiliz. │Automatiz.│Ejecutados│                       │
│  └──────────┴──────────┴──────────┘                       │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  SECCIÓN 2: DEFECTOS (9 KPIs)                             │
│  Grid mixto + Gráficos apilados                            │
│  ┌──────────┬──────────┬────────────────┐                 │
│  │  Shift   │ Ejecución│ Total Issues   │                 │
│  │   Left   │          │  (destacado)   │                 │
│  ├──────────┼──────────┼────────────────┤                 │
│  │ Escape   │  Escape  │     MTTR       │                 │
│  │   UAT    │Productivo│                │                 │
│  │ (gauge)  │ (gauge)  │                │                 │
│  ├──────────┴──────────┴────────────────┤                 │
│  │ Issues No Resueltos                  │                 │
│  ├──────────────────────────────────────┤                 │
│  │ Issues por Severidad - Shift Left    │                 │
│  │ (Stacked Area Chart - Full Width)    │                 │
│  ├──────────────────────────────────────┤                 │
│  │ Issues por Severidad - Ejecución     │                 │
│  │ (Stacked Area Chart - Full Width)    │                 │
│  └──────────────────────────────────────┘                 │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  SECCIÓN 3: EFECTIVIDAD (4 KPIs)                          │
│  Grid 2 columnas × 2 filas (destacadas)                   │
│  ┌─────────────────────┬─────────────────────┐            │
│  │ Efectividad Ciclo 1 │ Efectividad Ciclos  │            │
│  │    (destacado)      │        QA           │            │
│  ├─────────────────────┼─────────────────────┤            │
│  │  Efectividad UAT    │ Efectividad General │            │
│  │                     │                     │            │
│  └─────────────────────┴─────────────────────┘            │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  SECCIÓN 4: DESVIACIONES (2 KPIs)                         │
│  ┌─────────────────────┬─────────────────────┐            │
│  │ Horas Desviación    │                     │            │
│  │      Total          │                     │            │
│  ├─────────────────────┴─────────────────────┤            │
│  │ Horas Desviación por Proyecto             │            │
│  │       (Bar Chart horizontal)              │            │
│  └───────────────────────────────────────────┘            │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  SECCIÓN 5: TENDENCIAS MENSUALES                          │
│  Tabs: CP | Defectos | Efectividad                        │
│  ┌────────────────────────────────────────────┐           │
│  │ [Casos de Prueba] [Defectos] [Efectividad]│           │
│  ├────────────────────────────────────────────┤           │
│  │                                             │           │
│  │  Gráficos de línea con múltiples series    │           │
│  │  (según tab seleccionado)                  │           │
│  │                                             │           │
│  └────────────────────────────────────────────┘           │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ▼ SECCIÓN 6: GANTT (Collapsible) 📅                     │
│  [Vista General: Proyectos | Vista Detallada: Actividades]│
│  ┌────────────────────────────────────────────┐           │
│  │                                             │           │
│  │  Diagrama de Gantt interactivo             │           │
│  │  (comportamiento según filtro de proyecto) │           │
│  │                                             │           │
│  └────────────────────────────────────────────┘           │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 📋 Desglose por Sección

### **HEADER**

**Contenido:**
- Logo de la organización (izquierda)
- Título: "Dashboard QA - Métricas de Calidad"
- Fecha de última actualización
- Botón de refresh (opcional)

**Altura:** ~80px  
**Fondo:** Blanco con sombra sutil

---

### **SECCIÓN 1: CASOS DE PRUEBA**

**Grid:** 3 columnas × 2 filas  
**Gap:** 16px  
**Responsive:** 
- Desktop: 3 columnas
- Tablet: 2 columnas
- Mobile: 1 columna

**KPIs:**
1. CP Diseñados (Verde)
2. CP Nuevos (Azul)
3. CP Modificados (Cyan)
4. CP Reutilizados (Gris)
5. CP Automatizados (Púrpura)
6. CP Ejecutados (Azul oscuro)

**Cada Card:**
- Valor totalizado grande
- Gráfico de línea pequeño (tendencia últimos 6 meses)
- Icono representativo

---

### **SECCIÓN 2: DEFECTOS**

**Layout Especial:**

**Fila 1:** 3 columnas
- Issues Shift Left (Card estándar)
- Issues Ejecución (Card estándar)
- **Total Issues (Card destacada - 1.5x tamaño)**

**Fila 2:** 3 columnas
- Escape Rate UAT (Gauge)
- Escape Rate Productivo (Gauge)
- MTTR Promedio (Card con semáforo)

**Fila 3:** 1 columna
- Issues No Resueltos (Card ancho completo)

**Fila 4:** 1 columna
- Issues por Severidad Shift Left (Stacked Area - Full Width)

**Fila 5:** 1 columna
- Issues por Severidad Ejecución (Stacked Area - Full Width)

---

### **SECCIÓN 3: EFECTIVIDAD**

**Grid:** 2 columnas × 2 filas  
**Gap:** 20px

**KPIs:**
1. % Efectividad Ciclo 1 (Destacado - naranja)
2. % Efectividad Ciclos QA (Azul)
3. % Efectividad UAT (Púrpura)
4. % Efectividad Ejecución (Verde)

**Cada Card:**
- Badge de semáforo (🟢🟡🔴)
- Valor porcentual grande
- Gráfico de línea con meta de 90%

---

### **SECCIÓN 4: DESVIACIONES**

**Layout:**

**Fila 1:** 2 columnas
- Horas Desviación Total (Card)
- (Espacio para KPI futuro)

**Fila 2:** Full width
- Horas Desviación por Proyecto (Bar Chart horizontal)
  - Top 10 proyectos
  - Ordenado descendente
  - Color: Rojo con gradiente

---

### **SECCIÓN 5: TENDENCIAS MENSUALES**

**Estructura:**
- **Tabs:** 3 pestañas
  1. Casos de Prueba
  2. Defectos
  3. Efectividad

**Tab 1: Casos de Prueba**
- Gráfico de línea múltiple con 6 series:
  - CP Diseñados
  - CP Nuevos
  - CP Modificados
  - CP Reutilizados
  - CP Automatizados
  - CP Ejecutados

**Tab 2: Defectos**
- Gráfico de área apilada con series:
  - Issues Shift Left
  - Issues Ejecución
  - MTTR (eje secundario)

**Tab 3: Efectividad**
- Gráfico de línea múltiple con 4 series:
  - Efectividad Ciclo 1
  - Efectividad Ciclos QA
  - Efectividad UAT
  - Efectividad General
  - Línea de meta al 90%

**Eje X:** Últimos 12 meses  
**Interactividad:** 
- Hover para tooltip detallado
- Click en leyenda para ocultar/mostrar serie

---

## 📅 SECCIÓN 6: GANTT (Collapsible)

### **Ubicación y Comportamiento**

**Posición:** Parte inferior del dashboard  
**Estado inicial:** Colapsado (cerrado)  
**Botón toggle:** "📊 Ver Cronograma de Proyectos/Actividades"

---

### **VISTA 1: GENERAL (Sin filtro de proyecto específico)**

**Cuándo se muestra:**
- NO hay un proyecto específico seleccionado en los filtros
- O hay múltiples proyectos seleccionados

**Datos a mostrar:**
- Cada **fila del Gantt = 1 Proyecto**
- **Fecha Inicio del Proyecto:** Fecha más antigua de todas las actividades
  - `MIN(F.inicio Real)` del proyecto
- **Fecha Fin del Proyecto:** Fecha más tardía de todas las actividades
  - `MAX(F.Fin Real)` del proyecto

**Lógica:**
```javascript
// Agrupar por proyecto
const proyectos = datosFiltrados.reduce((acc, row) => {
  if (!acc[row.Proyecto]) {
    acc[row.Proyecto] = {
      nombre: row.Proyecto,
      cartera: row.Cartera,
      estado: calcularEstadoProyecto(row.Proyecto, datosFiltrados),
      fechas: []
    };
  }
  
  // Solo considerar fechas válidas
  if (row['F.inicio Real']) acc[row.Proyecto].fechas.push(new Date(row['F.inicio Real']));
  if (row['F.Fin Real']) acc[row.Proyecto].fechas.push(new Date(row['F.Fin Real']));
  
  return acc;
}, {});

// Calcular fechas min/max por proyecto
const ganttData = Object.values(proyectos).map(proyecto => {
  if (proyecto.fechas.length === 0) return null;
  
  return {
    nombre: proyecto.nombre,
    cartera: proyecto.cartera,
    estado: proyecto.estado,
    inicio: new Date(Math.min(...proyecto.fechas)),
    fin: new Date(Math.max(...proyecto.fechas)),
    duracion: calcularDuracion(inicio, fin)
  };
}).filter(p => p !== null);
```

**Ejemplo Visual:**
```
Proyecto                    │ Inicio      │ Fin         │ Duración
──────────────────────────────────────────────────────────────────
Monedero Bloqueado          │ 01/01/2025  │ 30/03/2025  │ [████████]
Transferencias              │ 15/01/2025  │ 15/04/2025  │ [  ██████████]
Pagos móviles               │ 01/02/2025  │ 31/05/2025  │ [    ████████████]
Portal de Cliente           │ 10/03/2025  │ 20/06/2025  │ [      ████████████]
```

**Colores de Barras (por Estado del Proyecto):**
- 🟢 Concluido: `#10b981` (Verde)
- 🔵 En Curso: `#3b82f6` (Azul)

**Tooltip:**
```
Proyecto: Monedero Bloqueado
Cartera: Banca Digital
Estado: Concluido
Inicio: 01/01/2025
Fin: 30/03/2025
Duración: 90 días
```

**Interactividad:**
- **Click en barra:** Aplicar filtro del proyecto → Cambiar a Vista Detallada

---

### **VISTA 2: DETALLADA (Con proyecto específico filtrado)**

**Cuándo se muestra:**
- Hay **exactamente 1 proyecto** seleccionado en los filtros
- O se hizo click en una barra de la Vista General

**Datos a mostrar:**
- Cada **fila del Gantt = 1 Actividad del proyecto**
- **Fecha Inicio:** `F.inicio Real` de la actividad
- **Fecha Fin:** `F.Fin Real` de la actividad
- **Filtro:** Solo actividades con al menos una fecha registrada

**Lógica:**
```javascript
// Filtrar actividades del proyecto seleccionado
const actividadesProyecto = datosFiltrados.filter(row => 
  row.Proyecto === proyectoSeleccionado &&
  (row['F.inicio Real'] || row['F.Fin Real']) // Al menos una fecha
);

const ganttData = actividadesProyecto.map(row => {
  // Si falta una fecha, usar la otra
  const inicio = row['F.inicio Real'] || row['F.Fin Real'];
  const fin = row['F.Fin Real'] || row['F.inicio Real'];
  
  return {
    actividad: row.Actividad,
    estado: row.Estado,
    inicio: new Date(inicio),
    fin: new Date(fin),
    duracion: calcularDuracion(inicio, fin),
    fechaInicioReal: row['F.inicio Real'],
    fechaFinReal: row['F.Fin Real'],
    // Metadatos adicionales
    cpEjecutados: row['CP Ejecutados'] || 0,
    totalIssues: (row['Issues Bloqueantes'] || 0) + (row['Issues Críticos'] || 0) + 
                 (row['Issues Altos'] || 0) + (row['Issues Menores'] || 0),
    horas: row.Horas || 0
  };
});
```

**Ejemplo Visual:**
```
Proyecto: Monedero Bloqueado

Actividad                              │ Inicio      │ Fin         │ Duración
────────────────────────────────────────────────────────────────────────────
Analisis y Dimensionamiento            │ 01/01/2025  │ 10/01/2025  │ [██]
Diseño de escenarios                   │ 11/01/2025  │ 25/01/2025  │ [  ████]
Datos, Insumos y Ambientes             │ 20/01/2025  │ 30/01/2025  │ [    ███]
Pruebas QA Ciclo 1                     │ 01/02/2025  │ 15/02/2025  │ [      ████]
Pruebas QA Ciclo 2                     │ 16/02/2025  │ 28/02/2025  │ [        ███]
Pruebas UAT                            │ 01/03/2025  │ 15/03/2025  │ [          ████]
Pruebas Preproductivas                 │ 16/03/2025  │ 25/03/2025  │ [            ███]
Smoke Productivo                       │ 26/03/2025  │ 30/03/2025  │ [              █]
```

**Colores de Barras (por Estado de Actividad):**
- 🟢 Terminado: `#10b981` (Verde)
- 🔵 En curso: `#3b82f6` (Azul)
- 🔘 Por iniciar: `#6b7280` (Gris)

**Colores Alternativos (por Tipo de Actividad):**
```javascript
const coloresPorTipo = {
  'Analisis y Dimensionamiento': '#8b5cf6', // Morado
  'Diseño de escenarios': '#8b5cf6',
  'Datos, Insumos y Ambientes': '#8b5cf6',
  'Pruebas QA Ciclo': '#3b82f6', // Azul (todos los ciclos)
  'Pruebas UAT': '#10b981', // Verde
  'Pruebas Preproductivas': '#10b981',
  'Smoke Productivo': '#06b6d4', // Cyan
  'Estabilización Productiva': '#06b6d4',
  'Retraso': '#ef4444' // Rojo
};
```

**Tooltip Detallado:**
```
Actividad: Pruebas QA Ciclo 1
Estado: Terminado
Inicio Real: 01/02/2025
Fin Real: 15/02/2025
Duración: 15 días

Métricas:
├─ CP Ejecutados: 120
├─ Total Issues: 25
│  ├─ Bloqueantes: 2
│  ├─ Críticos: 5
│  ├─ Altos: 8
│  └─ Menores: 10
└─ Horas: 120 hrs
```

**Interactividad:**
- **Click en barra:** Mostrar panel lateral con detalles completos de la actividad
- **Hover:** Mostrar tooltip con métricas clave

---

### **Reglas de Visualización de Fechas**

#### **Caso 1: Ambas fechas presentes**
```javascript
if (row['F.inicio Real'] && row['F.Fin Real']) {
  inicio = row['F.inicio Real'];
  fin = row['F.Fin Real'];
}
```

#### **Caso 2: Solo fecha de inicio**
```javascript
if (row['F.inicio Real'] && !row['F.Fin Real']) {
  inicio = row['F.inicio Real'];
  fin = row['F.inicio Real']; // Mostrar como barra de 1 día
}
```

#### **Caso 3: Solo fecha de fin**
```javascript
if (!row['F.inicio Real'] && row['F.Fin Real']) {
  inicio = row['F.Fin Real'];
  fin = row['F.Fin Real']; // Mostrar como barra de 1 día
}
```

#### **Caso 4: Sin fechas**
```javascript
if (!row['F.inicio Real'] && !row['F.Fin Real']) {
  // NO mostrar la actividad en el Gantt
  return null;
}
```

---

### **Componente de Gantt**

```jsx
<Section 
  title={proyectoFiltrado ? 
    `Cronograma: ${proyectoFiltrado}` : 
    "Cronograma de Proyectos"
  }
  icon={<Calendar />}
  collapsible={true}
  defaultCollapsed={true}
  className="mt-8"
>
  {proyectoFiltrado ? (
    // Vista Detallada: Actividades del proyecto
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Actividades de {proyectoFiltrado}
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={limpiarFiltroProyecto}
        >
          ← Volver a vista general
        </Button>
      </div>
      
      <GanttChart
        data={actividadesPorProyecto}
        viewMode="actividad"
        colorBy="estado" // o "tipo"
        showTooltip={true}
        onBarClick={handleActividadClick}
      />
    </div>
  ) : (
    // Vista General: Proyectos
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        Todos los Proyectos
      </h3>
      
      <GanttChart
        data={proyectosConsolidados}
        viewMode="proyecto"
        colorBy="estado"
        showTooltip={true}
        onBarClick={handleProyectoClick}
      />
    </div>
  )}
</Section>
```

---

### **Características del Gantt**

#### **Zoom y Pan**
- **Niveles de Zoom:**
  - Día
  - Semana
  - Mes
  - Trimestre
- **Pan horizontal:** Scroll para navegar el timeline
- **Botones de zoom:** +/- en la esquina superior derecha

#### **Línea de Hoy**
- Línea vertical roja punteada indicando la fecha actual
- Solo visible si está dentro del rango del Gantt

#### **Leyenda**
- Mostrar leyenda de colores según el modo:
  - Vista General: Estados del Proyecto
  - Vista Detallada: Estados de Actividad (o Tipos)

#### **Milestones (Opcional)**
- Mostrar hitos importantes como diamantes:
  - Fin de Ciclo 1
  - Inicio de UAT
  - Go-Live (Smoke Productivo)

---

### **Librerías Recomendadas**

**Opción 1: frappe-gantt** (Recomendada)
```bash
npm install frappe-gantt
```
- Simple y ligero
- Buena interactividad
- Fácil personalización

**Opción 2: react-gantt-timeline**
```bash
npm install react-gantt-timeline
```
- Componente React nativo
- Más control sobre UI

**Opción 3: dhtmlx-gantt**
```bash
npm install dhtmlx-gantt
```
- Más robusto y features
- Ideal para proyectos enterprise
- Licencia comercial para uso avanzado

**Opción 4: Recharts custom**
- Usar Recharts con configuración personalizada
- Mantiene consistencia con el resto del dashboard
- Mayor trabajo de desarrollo

---

## 🎨 Diseño Visual

### **Paleta de Colores**

Ver detalles completos en `04_KPIs_Visualizacion.md`

**Principales:**
- Azul: `#3b82f6`
- Verde: `#10b981`
- Rojo: `#ef4444`
- Naranja: `#f59e0b`
- Púrpura: `#8b5cf6`

### **Tipografía**

```css
/* Headers */
h1: font-size: 32px, font-weight: 700
h2: font-size: 24px, font-weight: 600
h3: font-size: 20px, font-weight: 600

/* Body */
body: font-size: 16px, font-weight: 400
small: font-size: 14px

/* KPI Values */
kpi-value: font-size: 36px, font-weight: 700
```

### **Espaciado**

```css
/* Secciones */
section-margin: 32px
section-padding: 24px

/* Cards */
card-padding: 24px
card-gap: 16px

/* Responsive */
@media (max-width: 768px) {
  section-margin: 16px;
  card-padding: 16px;
}
```

### **Sombras**

```css
/* Card */
box-shadow: 0 1px 3px rgba(0,0,0,0.1)

/* Card Hover */
box-shadow: 0 4px 6px rgba(0,0,0,0.1)

/* Modal */
box-shadow: 0 10px 25px rgba(0,0,0,0.15)
```

---

## 🔄 Interactividad

### **Filtros**
- Aplicación en tiempo real (sin botón "Aplicar")
- Feedback visual al filtrar (loading spinner)
- Persistencia en localStorage

### **KPI Cards**
- Hover: Elevación de sombra
- Click: Expandir para ver tendencia completa (modal o slide-out)

### **Gráficos**
- Hover: Tooltip detallado
- Click en leyenda: Ocultar/mostrar serie
- Click en punto: Drill-down a datos específicos

### **Gantt**
- Hover en barra: Tooltip
- Click en barra: 
  - Vista General → Filtrar proyecto (cambiar a Vista Detallada)
  - Vista Detallada → Abrir panel lateral con detalles
- Zoom: Botones +/- o scroll con Ctrl
- Pan: Arrastrar horizontalmente

---

## 📱 Responsividad

### **Breakpoints**

```css
/* Mobile */
@media (max-width: 640px) {
  - Grid 1 columna
  - Ocultar gráficos secundarios
  - Simplificar tooltips
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  - Grid 2 columnas
  - Mostrar gráficos simplificados
}

/* Desktop */
@media (min-width: 1025px) {
  - Grid 3 columnas (Casos de Prueba)
  - Grid 2 columnas (Efectividad)
  - Todos los gráficos visibles
}

/* Large Desktop */
@media (min-width: 1440px) {
  - Grid 4 columnas posible para algunas secciones
  - Gantt con mayor resolución
}
```

---

## ⚡ Performance

### **Optimizaciones**

1. **Carga Diferida:**
   - Sección Gantt: Solo renderizar cuando se expande
   - Gráficos: Virtualización para grandes datasets

2. **Memoización:**
   - Usar `useMemo` para cálculos de KPIs
   - Usar `React.memo` para componentes de cards

3. **Filtros:**
   - Debounce en filtros de texto (300ms)
   - Throttle en scroll del Gantt (100ms)

4. **Datos:**
   - Procesar Excel en Web Worker
   - Caché de cálculos en IndexedDB

---

## 🔗 Stack Tecnológico Recomendado

### **Frontend Framework**
- **React 18** con TypeScript
- **Next.js 14** (opcional, para SSR)

### **Gráficos y Visualización**
- **Recharts** (principal)
- **frappe-gantt** (Gantt)
- **react-gauge-chart** (Gauges)

### **UI Components**
- **shadcn/ui** (componentes base)
- **Tailwind CSS** (estilos)
- **Lucide React** (iconos)

### **Estado y Datos**
- **Zustand** (estado global)
- **React Query** (caché de datos)
- **date-fns** (manejo de fechas)

### **Excel Processing**
- **xlsx** o **exceljs** (lectura de Excel)
- **papaparse** (alternativa para CSV)

---

## 📊 Flujo de Datos

```
Excel File
    ↓
[File Upload]
    ↓
[Parse Excel] → Web Worker
    ↓
[Validate Data]
    ↓
[Store in State] → Zustand
    ↓
[Apply Filters] ← User Input
    ↓
[Calculate KPIs] → useMemo
    ↓
[Render Dashboard]
    ↓
┌─────────────────┐
│  21 KPIs Cards  │
│  + Gráficos     │
│  + Gantt        │
└─────────────────┘
```

---

## 🚀 Roadmap de Implementación

### **Fase 1: Base (2-3 semanas)**
- ✅ Setup proyecto
- ✅ Componentes UI base
- ✅ Procesamiento de Excel
- ✅ Filtros globales
- ✅ Sección 1: Casos de Prueba

### **Fase 2: KPIs Core (2-3 semanas)**
- ✅ Sección 2: Defectos
- ✅ Sección 3: Efectividad
- ✅ Sección 4: Desviaciones
- ✅ Validación de fórmulas

### **Fase 3: Visualizaciones Avanzadas (2 semanas)**
- ✅ Sección 5: Tendencias Mensuales
- ✅ Gráficos apilados
- ✅ Gauges con semáforos
- ✅ Tooltips enriquecidos

### **Fase 4: Gantt (1-2 semanas)**
- ✅ Vista General (proyectos)
- ✅ Vista Detallada (actividades)
- ✅ Interactividad y zoom
- ✅ Integración con filtros

### **Fase 5: Polish y Testing (1 semana)**
- ✅ Responsividad
- ✅ Performance optimization
- ✅ Testing con datos reales
- ✅ Documentación de usuario

**Total estimado: 8-11 semanas**

---

## 📝 Notas Finales

### **Consideraciones Importantes**

1. **Estado del Proyecto es calculado:** No viene del Excel, se deriva del estado de todas las actividades

2. **MTTR viene pre-calculado:** No se calcula en el dashboard, solo se promedia

3. **Gantt tiene doble comportamiento:** Vista general vs detallada según filtro de proyecto

4. **Fechas faltantes en Gantt:** Las actividades sin fechas NO se muestran

5. **Escape Rates tienen denominadores específicos:** 
   - UAT: Solo Ciclos QA
   - Productivo: Todo en Ejecución

6. **Columna "Dias" NO se usa:** Reservada para futuras métricas

---

## 🔗 Documentos Relacionados

- **[01_Estructura_Excel.md](./01_Estructura_Excel.md)** - Datos fuente
- **[02_Campos_Calculados.md](./02_Campos_Calculados.md)** - Lógica de cálculos
- **[03_KPIs_Definiciones.md](./03_KPIs_Definiciones.md)** - Fórmulas de KPIs
- **[04_KPIs_Visualizacion.md](./04_KPIs_Visualizacion.md)** - Specs de visualización
- **[05_Mapeo_Campos_Formulas.md](./05_Mapeo_Campos_Formulas.md)** - Dependencias
